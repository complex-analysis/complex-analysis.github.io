import * as THREE from 'three';

const canvas = document.querySelector('canvas.webgl');
const scene = new THREE.Scene();
const geometry = new THREE.PlaneGeometry(2, 2);

const uniforms = {
    iTime: { value: 0 },
    iResolution: { value: new THREE.Vector3() },
    uMode: { value: 0 },       // 0: Elliptic, 1: Hyperbolic, 2: Loxodromic, 3: Parabolic
    uShowSphere: { value: 1.0 }, // 1.0: On, 0.0: Off
    // Camera uniforms
    uCameraPos: { value: new THREE.Vector3() },
    uCameraTarget: { value: new THREE.Vector3() },
    uCameraForward: { value: new THREE.Vector3() },
    uCameraRight: { value: new THREE.Vector3() },
    uCameraUp: { value: new THREE.Vector3() }
};

const fragmentShader = `
uniform float iTime;
uniform vec3 iResolution;
uniform int uMode; 
uniform float uShowSphere;
uniform vec3 uCameraPos;
uniform vec3 uCameraTarget;
uniform vec3 uCameraForward;
uniform vec3 uCameraRight;
uniform vec3 uCameraUp;

#define PI 3.14159265359

// --- Complex Math ---
vec2 cmul(vec2 z, vec2 w) { return vec2(z.x * w.x - z.y * w.y, z.x * w.y + z.y * w.x); }
vec2 cdiv(vec2 z, vec2 w) { return vec2(z.x * w.x + z.y * w.y, -z.x * w.y + z.y * w.x) / dot(w, w); }

// The fixed Mobius base warp
vec2 applyMobius(vec2 z) {
    vec2 A = vec2(-1, 0), B = vec2(1, 0), C = vec2(-1, 0), D = vec2(-1, 0);
    return cdiv(cmul(A, z) + B, cmul(C, z) + D);
}

float map(vec3 p) {
    float d = p.y; 
    if (uShowSphere > 0.5) d = min(d, length(p - vec3(0, 1, 0)) - 1.0);
    return d;
}

void main() {
    vec2 uv = (gl_FragCoord.xy - iResolution.xy * 0.5) / iResolution.y;
    
    // Use uniforms for camera instead of hardcoded values
    vec3 ro = uCameraPos;
    vec3 look = uCameraTarget;
    vec3 f = uCameraForward;
    vec3 r = uCameraRight;
    vec3 u = uCameraUp;
    
    vec3 rd = normalize(uv.x * r + uv.y * u + 2.0 * f);

    float t = 0.0;
    for(int i = 0; i < 120; i++) {
        float d = map(ro + rd * t);
        if(d < 0.001 || t > 40.0) break;
        t += d;
    }

    vec3 col = vec3(0.05, 0.05, 0.08);

    if(t < 50.0) {
        vec3 pos = ro + rd * t;
        bool isSphere = (uShowSphere > 0.5 && length(pos - vec3(0, 1, 0)) < 1.1);
        
        // 1. Map to Complex Plane
        vec2 z = isSphere ? vec2(pos.x, pos.z) / (2.001 - pos.y) : pos.xz * 0.5;

        // Apply Mobius base
        z = applyMobius(z);

        vec2 gridUV;

        // 2. Apply Mode (State Machine)
        float speed = 0.07;
        if (uMode == 0) { // Elliptic: Pure Rotation
            gridUV = vec2(log(length(z) + 0.0001), atan(z.y, z.x) * (2.0 / PI) + iTime * speed * 2.2);
        } 
        else if (uMode == 1) { // Hyperbolic: Pure Scaling
            gridUV = vec2(log(length(z) + 0.0001) - iTime * speed * 2.4, atan(z.y, z.x) * (2.0 / PI));
        }
        else if (uMode == 2) { // Loxodromic: Seamless & Large Tiles
            float logR = log(length(z) + 0.0001) - iTime * speed;
            float theta = atan(z.y, z.x) * (2.0 / PI) + iTime * speed; // Period is 4.0
    
            // slope = 0.5 means for every full rotation (4 units), 
            // we shift log-radius by 2 units. 
            // Since 2 is an even integer, the checkerboard color stays the same 
            // across the jump, hiding the branch cut.
            float slope = 0.5; 
    
            gridUV.x = logR + slope * theta;
            gridUV.y = logR - (1.0 / slope) * theta; 
    
            // Smaller density: 1.0 makes tiles large. 
            // Use integers (1.0, 2.0, etc.) to maintain the seamless branch cut.
            gridUV *= 0.75; 
        }
        else if (uMode == 3) { // Parabolic: Pure Translation
            gridUV = (z + vec2(iTime * speed * 2.2, 0.0)) * 1.0;
        }

        // 3. Render Checkerboard
        vec2 check = floor(mod(gridUV * 4.0, 2.0));
        float mask = abs(check.x - check.y);

        // Define light position/direction here
        vec3 lightPos = vec3(-1.0, 1.0, -0.5); 
        vec3 lightDir = normalize(lightPos); // Or just use a fixed direction like normalize(vec3(1, 2, 3))
        
        vec3 nor = isSphere ? normalize(pos - vec3(0, 1, 0)) : vec3(0, 1, 0);
        // Diffuse lighting
        float diff = clamp(dot(nor, lightDir), 0.2, 1.0);
        col = mix(vec3(0.01), vec3(0.9), mask) * diff;
        
        if(isSphere) col += pow(clamp(dot(reflect(rd, nor), lightDir), 0.0, 1.0), 32.0) * 0.4;
    }

    gl_FragColor = vec4(pow(col, vec3(0.4545)), 1.0);
}
`;

const material = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: `void main() { gl_Position = vec4(position, 1.0); }`,
    fragmentShader: fragmentShader
});

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Initial uniform set with pixel ratio
const canvasWidth = window.innerWidth * renderer.getPixelRatio();
const canvasHeight = window.innerHeight * renderer.getPixelRatio();
uniforms.iResolution.value.set(canvasWidth, canvasHeight, 1);

const modeText = document.getElementById('mode-text');
const modes = {
    '1': 'Elliptic',
    '2': 'Hyperbolic',
    '3': 'Loxodromic',
    '4': 'Parabolic'
};

// ========== VIEW CONTROLS - MODIFY THESE VALUES TO CHANGE THE VIEW ==========

// 1. CHANGE WHERE THE CAMERA LOOKS AT
// Modify this vector to change the point the camera is looking at
// Format: new THREE.Vector3(x, y, z)
const cameraTarget = new THREE.Vector3(0.0, 0.6, 0);
// Examples:
// const cameraTarget = new THREE.Vector3(0, 0, 0);     // Look at origin
// const cameraTarget = new THREE.Vector3(2, 1, 0);    // Look at (2,1,0)
// const cameraTarget = new THREE.Vector3(0, 1.5, 0);  // Look higher up

// 2. CHANGE THE CAMERA DISTANCE FROM THE TARGET
// Modify this value to zoom in/out (smaller = closer, larger = farther)
const cameraDistance = 8.0;
// Examples:
// const cameraDistance = 5.0;   // Closer view
// const cameraDistance = 12.0;  // Farther view

// 3. CHANGE THE VERTICAL OFFSET OF THE CAMERA ORBIT
// Modify the yOffset value in the camera calculation below
const yOffset = 1.5;
// Examples:
// const yOffset = 0.0;   // Camera orbits at same height as target
// const yOffset = 3.0;   // Camera orbits higher up

// 4. CHANGE MOUSE SENSITIVITY
// Modify these values for faster/slower mouse response
const mouseSensitivityX = 0.01;   // Horizontal sensitivity
const mouseSensitivityY = 0.007;  // Vertical sensitivity

// 5. CHANGE ROTATION LIMITS
// Modify these to allow more/less vertical tilt
const maxVerticalTilt = 1.5;   // Max up/down angle (radians)
const minVerticalTilt = 0.3;  // Min up/down angle (radians)

// 6. CHANGE SMOOTHING SPEED
// Modify this for faster/slower camera following (0-1, lower = smoother)
const smoothingSpeed = 0.1;

// ========== END OF VIEW CONTROLS ==========

// Mouse interaction variables
let mouseX = 0;
let mouseY = 0;
let targetRotationX = 0.3;     // Initial vertical tilt (radians)
let targetRotationY = -0.5;     // Initial horizontal rotation (radians)
let currentRotationX = 0.3;    // Match the target
let currentRotationY = -0.5;    // Match the target
let isMouseDown = false;
let lastMouseX = 0;
let lastMouseY = 0;

// Mouse event handlers
canvas.addEventListener('mousedown', (e) => {
    isMouseDown = true;
    lastMouseX = e.clientX;
    lastMouseY = e.clientY;
    canvas.style.cursor = 'grabbing';
});

window.addEventListener('mousemove', (e) => {
    if (isMouseDown) {
        const deltaX = e.clientX - lastMouseX;
        const deltaY = e.clientY - lastMouseY;
        
        // Apply sensitivity settings
        targetRotationY += deltaX * mouseSensitivityX;
        targetRotationX += deltaY * mouseSensitivityY;
        
        // Apply rotation limits
        targetRotationX = Math.max(minVerticalTilt, Math.min(maxVerticalTilt, targetRotationX));
        
        lastMouseX = e.clientX;
        lastMouseY = e.clientY;
    }
});

window.addEventListener('mouseup', () => {
    isMouseDown = false;
    canvas.style.cursor = 'grab';
});

// Initial cursor style
canvas.style.cursor = 'grab';

// Smooth rotation and camera update
function updateCamera() {
    // Smooth interpolation - change smoothingSpeed to adjust
    currentRotationX += (targetRotationX - currentRotationX) * smoothingSpeed;
    currentRotationY += (targetRotationY - currentRotationY) * smoothingSpeed;
    
    // Calculate camera position based on spherical coordinates
    const radius = cameraDistance;
    const theta = currentRotationY;
    const phi = currentRotationX;
    
    // Calculate camera position relative to target
    const x = radius * Math.sin(theta) * Math.cos(phi);
    const y = radius * Math.sin(phi) + yOffset;
    const z = radius * Math.cos(theta) * Math.cos(phi);
    
    const cameraPos = new THREE.Vector3(x, y, z);
    const lookAt = cameraTarget;
    
    // Calculate the direction vectors for the shader
    const forward = lookAt.clone().sub(cameraPos).normalize();
    const right = new THREE.Vector3(0, 1, 0).cross(forward).normalize();
    const up = forward.clone().cross(right).normalize();
    
    // Update shader uniforms with camera parameters
    uniforms.uCameraPos.value = cameraPos;
    uniforms.uCameraTarget.value = lookAt;
    uniforms.uCameraForward.value = forward;
    uniforms.uCameraRight.value = right;
    uniforms.uCameraUp.value = up;

    //console.log(cameraTarget)
    //console.log(cameraPos)
}

// Keyboard controls for mode switching
window.addEventListener('keydown', (e) => {
    // Handle Mode Switching (1-4)
    if (modes[e.key]) {
        uniforms.uMode.value = parseInt(e.key) - 1;
        
        if (modeText) {
            modeText.innerText = modes[e.key];
        }
    }

    // Handle Sphere Toggle (5)
    if (e.key === '5') {
        uniforms.uShowSphere.value = uniforms.uShowSphere.value === 1.0 ? 0.0 : 1.0;
        console.log("Sphere toggled to:", uniforms.uShowSphere.value);
    }
});

window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    renderer.setSize(width, height);
    
    const pixelRatio = Math.min(window.devicePixelRatio, 2);
    renderer.setPixelRatio(pixelRatio);

    uniforms.iResolution.value.set(width * pixelRatio, height * pixelRatio, 1);
});

// Initialize camera uniforms
updateCamera();

const tick = () => {
    uniforms.iTime.value = performance.now() / 1000;
    updateCamera(); // Update camera position based on mouse input
    renderer.render(scene, new THREE.Camera());
    window.requestAnimationFrame(tick);
};

tick();
