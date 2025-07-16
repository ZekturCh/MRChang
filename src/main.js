import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js";
import { createScene, createCamera, createRenderer, addLights, createCorridor, createFloorPortal } from './scene.js';
import { loadGamePanels } from "./panels.js";
import { initScroll } from './scroll.js';
import { initUI, buildPricingTable } from "./ui.js";

const canvas = document.getElementById("three-canvas");
const renderer = createRenderer(canvas);
const scene = createScene();
const camera = createCamera();
addLights(scene);

const textureLoader = new THREE.TextureLoader();
createCorridor(scene, textureLoader);
createFloorPortal(scene);

loadGamePanels(scene, textureLoader);
buildPricingTable();

// Ajuste de cámara en resize
function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener("resize", onResize);

// UI y Scroll
const uiProgress = initUI();

let targetZ = 0;
let targetY = 1.5; // altura inicial
const corridorLength = 25;
const fallStart = 0.8;

initScroll();

function render() {
  requestAnimationFrame(render);
  updateScroll(); // importante para animación suave
  renderer.render(scene, camera);
}
render();

// Animación con interpolación suave
function animate() {
  requestAnimationFrame(animate);

  // Interpolación (lerp)
  camera.position.z += (targetZ - camera.position.z) * 0.05;
  camera.position.y += (targetY - camera.position.y) * 0.05;

  renderer.render(scene, camera);
}
animate();

