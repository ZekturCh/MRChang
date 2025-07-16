import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js";

export function createRenderer(canvas) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.outputEncoding = THREE.sRGBEncoding;
  return renderer;
}

export function createScene() {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);
  return scene;
}

export function createCamera() {
  const cam = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
  cam.position.set(0, 1.6, 5);
  return cam;
}

export function addLights(scene) {
  const hemi = new THREE.HemisphereLight(0xffffff, 0x444444, 0.6);
  hemi.position.set(0, 20, 0);
  scene.add(hemi);

  const dir = new THREE.DirectionalLight(0xffffff, 0.8);
  dir.position.set(5, 10, 7);
  scene.add(dir);
}

export function createCorridor(scene, textureLoader) {
  // Simple box corridor built from planes
  const length = 25;
  const height = 3;
  const width = 4;

  const mat = new THREE.MeshBasicMaterial({
    map: textureLoader.load("assets/textures/grid.png"),
    side: THREE.BackSide
  });

  const geom = new THREE.BoxGeometry(width, height, length);
  const mesh = new THREE.Mesh(geom, mat);
  mesh.position.set(0, height/2 - 0.9, -length/2); // shift so camera starts outside front
  scene.add(mesh);

  return mesh;
}

/**
 * Create a flat plane that will become "floor portal" before drop.
 */
export function createFloorPortal(scene) {
  const geom = new THREE.PlaneGeometry(4, 4);
  const mat = new THREE.MeshBasicMaterial({ color: 0xff0077, transparent: true, opacity: 0.15, side: THREE.DoubleSide });
  const plane = new THREE.Mesh(geom, mat);
  plane.rotation.x = -Math.PI/2;
  plane.position.set(0, 0, -20); // end of corridor
  scene.add(plane);
  return plane;
}

/**
 * A utility to create a panel with texture + title (basic).
 */
export function createPanel({ texture, width=1.6, height=0.9 }) {
  const geom = new THREE.PlaneGeometry(width, height);
  const mat = new THREE.MeshBasicMaterial({ map: texture });
  const mesh = new THREE.Mesh(geom, mat);
  return mesh;
}

