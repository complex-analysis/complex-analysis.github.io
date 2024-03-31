/**
 * Source: https://github.com/bobbyroe
 * by Bobby Roe
 * Adaptated by Juan Carlos Ponce Campuzano
 * 14/Mar/2024
 */

import * as THREE from "three";
import { OrbitControls } from 'jsm/controls/OrbitControls.js';
import spline from "./spline.js";
import { EffectComposer } from "jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "jsm/postprocessing/UnrealBloomPass.js";

const w = window.innerWidth;
const h = window.innerHeight;
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x000000, 0.4);
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
camera.position.z = 5;
const renderer = new THREE.WebGLRenderer();
renderer.setSize(w, h);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.outputColorSpace = THREE.SRGBColorSpace;
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.03;

// post-processing
const renderScene = new RenderPass(scene, camera);
const bloomPass = new UnrealBloomPass(new THREE.Vector2(w, h), 1.5, 0.4, 100);
bloomPass.threshold = 0.002;
bloomPass.strength = 1.8;
bloomPass.radius = 0.1;
const composer = new EffectComposer(renderer);
composer.addPass(renderScene);
composer.addPass(bloomPass);

// create a line geometry from the spline
const points = spline.getPoints(100);
const geometry = new THREE.BufferGeometry().setFromPoints(points);
const material = new THREE.LineBasicMaterial({ color: 0xff0000 });
const line = new THREE.Line(geometry, material);
// scene.add(line);

// create a tube geometry from the spline
const tubeGeo = new THREE.TubeGeometry(spline, 222, 0.65, 16, true);

// create edges geometry from the spline
const edges = new THREE.EdgesGeometry(tubeGeo, 0.2);
const lineMat = new THREE.LineBasicMaterial({ color: "#cce6ff" });
const tubeLines = new THREE.LineSegments(edges, lineMat);
scene.add(tubeLines);

// one single function to create geometries
function createObjects(numObjects, size, geometry, material, colorFunc, scene, tubeGeo) {
  const objects = [];
  const edgesThickness = 0.2;

  for (let i = 0; i < numObjects; i++) {
      const objectMat = new THREE.MeshBasicMaterial({
          color: 0xfffff,
          wireframe: true
      });
      const object = new THREE.Mesh(geometry, material || objectMat);
      const p = (i / numObjects + Math.random() * 0.1) % 1;
      const pos = tubeGeo.parameters.path.getPointAt(p);
      pos.x += Math.random() - 0.4;
      pos.z += Math.random() - 0.4;
      object.position.copy(pos);
      const rote = new THREE.Vector3(
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI
      );
      object.rotation.set(rote.x, rote.y, rote.z);

      const edgesGeo = new THREE.EdgesGeometry(geometry, edgesThickness);
      const color = new THREE.Color().setHSL(colorFunc(p), 1, 0.2);
      const lineMat = new THREE.LineBasicMaterial({ color });
      const objectLines = new THREE.LineSegments(edgesGeo, lineMat);
      objectLines.position.copy(pos);
      objectLines.rotation.set(rote.x, rote.y, rote.z);

      objects.push(object);
      scene.add(objectLines);
  }

  return objects;
}

// Usage
const numBoxes = 30;
const sizeBoxes = 0.075;
const boxGeo = new THREE.BoxGeometry(sizeBoxes, sizeBoxes, sizeBoxes);
const boxes = createObjects(numBoxes, sizeBoxes, boxGeo, null, p => 0.9 - p, scene, tubeGeo);

const numTorii = 20;
const sizeTorii = 0.075;
const torusGeo = new THREE.TorusGeometry(0.075, 0.025, 12, 24);
const torii = createObjects(numTorii, sizeTorii, torusGeo, null, p => 0.7 - p, scene, tubeGeo);

const numSpheres = 30;
const sizeSpheres = 0.075;
const sphereGeo = new THREE.SphereGeometry(0.075, 12, 12);
const spheres = createObjects(numSpheres, sizeSpheres, sphereGeo, null, p => 0.5 - p, scene, tubeGeo);

const numIcosas = 20;
const sizeIcosas = 0.075;
const icosaGeo = new THREE.IcosahedronGeometry(0.075);
const icosas = createObjects(numIcosas, sizeIcosas, icosaGeo, null, p => 0.3 - p, scene, tubeGeo);


function updateCamera(t) {
  const time = t * 0.07;
  const looptime = 10 * 1000;
  const p = (time % looptime) / looptime;
  const pos = tubeGeo.parameters.path.getPointAt(p);
  const lookAt = tubeGeo.parameters.path.getPointAt((p + 0.03) % 1);
  camera.position.copy(pos);
  camera.lookAt(lookAt);
}

function animate(t = 0) {
  requestAnimationFrame(animate);
  updateCamera(t);
  composer.render(scene, camera);
  controls.update();
}
animate();

function handleWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', handleWindowResize, false);