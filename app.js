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
