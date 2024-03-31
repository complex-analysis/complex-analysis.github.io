/*

Zoomin in Mandelbrot set

Author: Juan Carlos Ponce Campuzano
Website: https://jcponce.github.io
Date:18/Jun/2024

*/


// These are necessary definitions that let you graphics card know how to render the shader
#ifdef GL_ES
precision highp float;
#endif


// These are our passed in information from the sketch.js
uniform vec2 iResolution;
uniform vec2 iMouse;
uniform float iTime;
//uniform sampler2D iTexture01;

varying vec2 vTexCoord;

const float E = exp(1.0);
const float PI = radians(180.0);
const int depth = 1000;
const float logDepth = log(float(depth));
const float limitNorm = 100.0;
const float squaredLimitNorm = limitNorm * limitNorm;
const vec2 zoomCenter = vec2(-0.77568377, 0.13646737);
const float timeConstant = 2.0;
const float baseWidth = 1.0;
const float baseWidthInverse = 1.0 / baseWidth;

const vec2 redMap = vec2(0.2, 1.0);
const vec2 greenMap = vec2(0.7*PI/3.0, 1.0);
const vec2 blueMap = vec2(1.0*PI/3.0, 1.0);
const vec3 colorMin = vec3(0.0, 0.0, 0.0);
const vec3 colorMax = vec3(1.0, 1.0, 1.0);
const float colorChangeFiddleFactor = 0.5;

vec2 complexProd( in vec2 p1, in vec2 p2) {
    float imaginaryPart = dot(p1.xy, p2.yx);
    p1.y = -p1.y;
    float realPart = dot(p1.xy, p2.xy);
    return vec2(realPart, imaginaryPart);
}

float invLerp( in float a, in float b, in float c) {
    return (b - a) / (c - a);
}

float iterationsBeforeLimit( in vec2 c) {
    int iterations = 1;
    vec2 currentPoint = vec2(0.0,0.0);
    float lastContainedSquaredNorm = 0.0;
    float currentPointSquaredNorm = 0.0;
    for (int i = 0; i < depth; i++) {
        currentPoint = complexProd(currentPoint, currentPoint);
        currentPoint += c;
        currentPointSquaredNorm = dot(currentPoint, currentPoint);
        iterations += (currentPointSquaredNorm < squaredLimitNorm) ? 1 : 0;
        lastContainedSquaredNorm = (currentPointSquaredNorm < squaredLimitNorm)
                                 ? currentPointSquaredNorm
                                 : lastContainedSquaredNorm;
    }
    float fractionalPart = invLerp(limitNorm, lastContainedSquaredNorm, squaredLimitNorm);
    return float(iterations) - fractionalPart;
}

vec3 color( in float iterations )
{
    float a = 4.0*PI * log(iterations) / logDepth;
    float adjTime = iTime*0.6*colorChangeFiddleFactor;
    vec3 b = sin(a + vec3(redMap.x + adjTime*redMap.y, greenMap.x + adjTime*greenMap.y, blueMap.x + adjTime*blueMap.y));
    b *= b;
    return b;
}

vec2 complexCoord( in vec2 NDC ) {
    vec2 coord = vec2(0.5 - NDC.x, NDC.y - 0.5);
    coord /= (baseWidthInverse * exp((13.0*(sin(-iTime*0.1 - 1.71)+1.0) + 2.0)/timeConstant));
    coord.y *= iResolution.y / iResolution.x;
    coord += zoomCenter;
    return coord;
}


//https://iquilezles.org/articles/palettes/
vec3 palette( float t ) {
    vec3 a = vec3(0.198, 0.438, 0.698);
    vec3 b = vec3(-0.262, 0.208, 0.238);
    vec3 c = vec3(2.238, 2.168, 1.000);
    vec3 d = vec3(-0.052, 0.333, 0.667);

    return a + b * cos( 6.28318*(c * t + d) );
}



void main() {
    // copy the vTexCoord
    // vTexCoord is a value that goes from 0.0 - 1.0 depending on the pixels location
    // we can use it to access every pixel on the screen
  
    vec2 coord = vTexCoord;
    //vec2 fragCoord = vTexCoord;

    float u = coord.x * 2.0 - 1.0;
    float v = coord.y * 2.0 - 1.0;
    const float scale = 0.1;

    // Make sure pixels are square
    u = u / scale * iResolution.x / iResolution.y;
    v = v / scale;
  
    //t = iTime/3.5;

    vec2 uv = vec2(u, v);
  
   //vec3 col = vec3(0.0);
  
   // Normalized pixel coordinates (from 0 to 1)
    //vec2 uv = fragCoord/iResolution.xy;
    vec2 complexCoord = complexCoord(uv);

    // Time varying pixel color
    vec3 col = color(iterationsBeforeLimit(complexCoord));

    
      
  // gl_FragColor is a built in shader variable, and your .frag file must contain it
  // We are setting the vec3 color into a new vec4, with a transparency of 1 (no opacity)
	gl_FragColor =  vec4(col, 1.0);
}