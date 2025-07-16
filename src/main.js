import { createRenderer, createScene, createCamera, addLights, createCorridor, createFloorPortal } from "./scene.js";
import { loadGamePanels } from "./panels.js";
import { initScroll, updateCameraFromProgress } from "./scroll.js";
import { initUI, buildPricingTable } from "./ui.js";
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js";

const canvas = document.getElementById("three-canvas");
const renderer = createRenderer(canvas);
const scene = createScene();
const camera = createCamera();
addLights(scene);

const textureLoader = new THREE.TextureLoader();
createCorridor(scene, textureLoader);
createFloorPortal(scene);

loadGamePanels(scene, textureLoader); // async but we don't wait; they add when loaded
buildPricingTable();

// Resize handling
function onResize(){
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener("resize", onResize);

// UI progress
const uiProgress = initUI();

// Scroll
initScroll(camera, {
  onProgress: (p) => {
    updateCameraFromProgress(p, camera);
    uiProgress(p);
  }
});

// Render loop
function render(){
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}
render();
