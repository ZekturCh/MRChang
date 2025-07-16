import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.158.0/build/three.module.js';
import { FontLoader } from 'https://cdn.jsdelivr.net/npm/three@0.158.0/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'https://cdn.jsdelivr.net/npm/three@0.158.0/examples/jsm/geometries/TextGeometry.js';


// Crear la escena, cámara y renderizador
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000); // Fondo negro

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// ==========================
// CUADRÍCULA EN EL PISO Y TECHO
// ==========================

// Crear cuadrícula blanca para el piso
const floorGrid = new THREE.GridHelper(100, 100, 0xffffff, 0xffffff);
floorGrid.rotation.x = Math.PI / 2; // Rotar para que esté en plano XZ
scene.add(floorGrid);

// Crear cuadrícula blanca para el techo
const ceilingGrid = new THREE.GridHelper(100, 100, 0xffffff, 0xffffff);
ceilingGrid.rotation.x = Math.PI / 2; // Igual que el piso
ceilingGrid.position.y = 10; // Elevar para simular el techo
scene.add(ceilingGrid);

// ==========================
// TEXTO 3D
// ==========================

const loader = new FontLoader();
loader.load('Impact_Regular.json', (font) => {
  const textGeometry = new TextGeometry('PARALEL VR', {
    font: font,
    size: 5,
    height: 1,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0.1,
    bevelSize: 0.1,
    bevelOffset: 0,
    bevelSegments: 5,
  });

  // Material blanco sin iluminación, para que se vea como líneas en modo Link
  const textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });

  const textMesh = new THREE.Mesh(textGeometry, textMaterial);
  textMesh.position.set(-15, 5, 0);
  scene.add(textMesh);
});

// ==========================
// OBJETOS 3D CON MATERIALES BLANCOS
// ==========================

const whiteMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff }); // Material blanco

// Cubo
const cubeGeometry = new THREE.BoxGeometry();
const cube = new THREE.Mesh(cubeGeometry, whiteMaterial);
cube.position.set(-3, 2, 0);
scene.add(cube);

// Cono
const coneGeometry = new THREE.ConeGeometry(1, 2, 32);
const cone = new THREE.Mesh(coneGeometry, whiteMaterial);
cone.position.set(3, 0, 0);
scene.add(cone);

// Esfera
const sphereGeometry = new THREE.SphereGeometry(1);
const sphere = new THREE.Mesh(sphereGeometry, whiteMaterial);
sphere.position.set(0, -2, 0);
scene.add(sphere);

// ==========================
// POSICIÓN INICIAL DE LA CÁMARA
// ==========================
camera.position.set(0, 5, 10); // Cámara un poco elevada y atrás
camera.lookAt(0, 0, 0); // Mira hacia el centro de la escena

// ==========================
// CONTROL DE CÁMARA CON MOUSE
// ==========================

let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = - (event.clientY / window.innerHeight) * 2 + 1;

    // Actualiza la posición de la cámara en base al mouse
    camera.position.x = mouseX * 5;
    camera.position.y = -mouseY * 5;

    // La cámara siempre mira al centro de la escena
    camera.lookAt(scene.position);
});

// ==========================
// ZOOM DE CÁMARA CON SCROLL
// ==========================

let cameraZoom = camera.position.z;

document.addEventListener('wheel', (event) => {
    if (event.deltaY > 0) {
        cameraZoom += 0.2;
    } else {
        cameraZoom -= 0.2;
    }

    cameraZoom = Math.max(2, Math.min(10, cameraZoom));
    camera.position.z = cameraZoom;
});

// ==========================
// FUNCIÓN DE ANIMACIÓN
// ==========================

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();

// ==========================
// AJUSTE RESPONSIVO EN VENTANA
// ==========================

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

