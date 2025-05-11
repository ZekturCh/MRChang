
import { FontLoader } from 'three';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

// Crear la escena, cámara y renderizador
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const textureLoader = new THREE.TextureLoader();
const floorTexture = textureLoader.load('piso.jpg'); // Reemplaza con la ruta de tu textura

// Cargar la fuente
const loader = new FontLoader();
loader.load('ruta/a/tu/fuente.json', (font) => {
  const textGeometry = new TextGeometry('CAMBIO', {
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

  const textMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff, // Blanco
    emissive: 0xaaaaaa,
    roughness: 0.5,
    metalness: 0.2,
  });

  const textMesh = new THREE.Mesh(textGeometry, textMaterial);
  textMesh.position.set(-15, 5, 0);
  scene.add(textMesh);
});


// Crear el material con la textura cargada
const floorMaterial = new THREE.MeshStandardMaterial({
  map: floorTexture,
  roughness: 0.5,
  metalness: 0.2,
  color: new THREE.Color(0x1e3a5f), // Azul oscuro
});
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(0, 10, 0); // Posicionar arriba
scene.add(directionalLight);

// Crear la geometría del suelo
const floorGeometry = new THREE.PlaneGeometry(100, 100);
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2; // Rotar para que quede horizontal
scene.add(floor);

// Crear un cubo 3D
const cubeGeometry = new THREE.BoxGeometry();
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 }); // Material verde
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.position.set(-3, 2, 0); // Colocamos el cubo arriba a la izquierda
scene.add(cube);

// Crear un cono 3D
const coneGeometry = new THREE.ConeGeometry(1, 2, 32);
const coneMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 }); // Material rojo
const cone = new THREE.Mesh(coneGeometry, coneMaterial);
cone.position.set(3, 0, 0); // Colocamos el cono al centro a la derecha
scene.add(cone);

// Crear una esfera 3D
const sphereGeometry = new THREE.SphereGeometry(1);
const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff }); // Material azul
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.set(0, -2, 0); // Colocamos la esfera en el centro abajo
scene.add(sphere);

// Colocar la cámara
camera.position.z = 5;

// Variables para manejar la posición de la cámara con el ratón
let mouseX = 0;
let mouseY = 0;

// Event listener para mover la cámara con el ratón
document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = - (event.clientY / window.innerHeight) * 2 + 1;

    // Mover la cámara para crear el efecto de que sigue al ratón
    camera.position.x = mouseX * 5;
    camera.position.y = -mouseY * 5;

    // Hacer que la cámara siempre mire al centro de la escena (el cubo)
    camera.lookAt(scene.position);
});

// Variable para controlar el zoom de la cámara con el scroll
let cameraZoom = camera.position.z;

// Event listener para el scroll
document.addEventListener('wheel', (event) => {
    // Cambiar la posición de la cámara según el desplazamiento de la rueda
    if (event.deltaY > 0) {
        // Scroll hacia abajo (alejar la cámara)
        cameraZoom += 0.2;
    } else {
        // Scroll hacia arriba (acercar la cámara)
        cameraZoom -= 0.2;
    }

    // Limitar el rango de zoom (puedes ajustar los valores según lo necesites)
    cameraZoom = Math.max(2, Math.min(10, cameraZoom)); // Rango entre 2 y 10

    // Aplicar el zoom a la cámara
    camera.position.z = cameraZoom;
});

// Función de animación
function animate() {
    requestAnimationFrame(animate);

    // Renderizar la escena y la cámara
    renderer.render(scene, camera);
}

// Iniciar la animación
animate();

// Ajustar el tamaño del canvas si se redimensiona la ventana
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

