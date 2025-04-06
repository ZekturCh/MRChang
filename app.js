// Crear la escena, cámara y renderizador
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Crear un cubo 3D
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Colocar la cámara
camera.position.z = 5;

// Variables para manejar la rotación con el ratón
let mouseX = 0;
let mouseY = 0;

// Event listener para mover la cámara con el ratón
document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = - (event.clientY / window.innerHeight) * 2 + 1;
});

// Función de animación
function animate() {
    requestAnimationFrame(animate);

    // Rotar el cubo de acuerdo al movimiento del ratón
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    // Mover la cámara para crear el efecto de que sigue al ratón
    camera.position.x = mouseX * 5;
    camera.position.y = -mouseY * 5;

    camera.lookAt(scene.position);

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
