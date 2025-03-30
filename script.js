import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Configuración de la escena
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 1.6, 5);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Control de órbita
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.screenSpacePanning = false;
controls.maxPolarAngle = Math.PI / 2;

// Crear habitaciones
const roomGeometry = new THREE.BoxGeometry(5, 3, 5);
const roomMaterial1 = new THREE.MeshBasicMaterial({ color: 0x8b0000, side: THREE.BackSide });
const roomMaterial2 = new THREE.MeshBasicMaterial({ color: 0x004488, side: THREE.BackSide });
const roomMaterial3 = new THREE.MeshBasicMaterial({ color: 0x228B22, side: THREE.BackSide });

const room1 = new THREE.Mesh(roomGeometry, roomMaterial1);
const room2 = new THREE.Mesh(roomGeometry, roomMaterial2);
const room3 = new THREE.Mesh(roomGeometry, roomMaterial3);

room1.position.set(0, 1.5, 0);
room2.position.set(0, 1.5, -6);
room3.position.set(0, 1.5, -12);

scene.add(room1, room2, room3);

// Control de scroll
let scrollY = 0;
window.addEventListener('scroll', () => {
    scrollY = window.scrollY / window.innerHeight;
    camera.position.z = 5 - scrollY * 6; // Se mueve en el eje Z
});

// Loop de renderizado
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();

// Ajustar tamaño de la pantalla
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
