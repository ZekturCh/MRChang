import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.158.0/build/three.module.js';


// Crear la escena, cámara y renderizador
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000); // Fondo negro

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 5, 10); // Cámara elevada y atrás
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// ==========================
// MALLAS CUADRICULADAS: PISO Y TECHO
// ==========================

const floorGrid = new THREE.GridHelper(500, 200, 0xffffff, 0xffffff);
floorGrid.rotation.x = Math.PI / 2;
floorGrid.position.y = 0;
scene.add(floorGrid);

const ceilingGrid = new THREE.GridHelper(500, 200, 0xffffff, 0xffffff);
ceilingGrid.rotation.x = Math.PI / 2;
ceilingGrid.position.y = 10;
scene.add(ceilingGrid);

// ==========================
// FIGURAS GEOMÉTRICAS
// ==========================

const whiteMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });

// Cubo
const cube = new THREE.Mesh(new THREE.BoxGeometry(2, 2, 2), whiteMaterial);
cube.position.set(-4, 1, 0);
scene.add(cube);

// Cono
const cone = new THREE.Mesh(new THREE.ConeGeometry(1, 2, 32), whiteMaterial);
cone.position.set(0, 1, 0);
scene.add(cone);

// Esfera
const sphere = new THREE.Mesh(new THREE.SphereGeometry(1), whiteMaterial);
sphere.position.set(4, 1, 0);
scene.add(sphere);

// ==========================
// ANIMACIÓN
// ==========================

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();

// ==========================
// AJUSTE RESPONSIVO
// ==========================

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
