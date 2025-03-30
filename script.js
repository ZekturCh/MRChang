//java
let seccionActual = 0;
const totalSecciones = document.querySelectorAll(".section").length;

function cambiarSeccion(direccion) {
    seccionActual += direccion;
    
    // Evitar salir de los límites
    if (seccionActual < 0) seccionActual = 0;
    if (seccionActual >= totalSecciones) seccionActual = totalSecciones - 1;

    // Mueve la pantalla con GSAP
    gsap.to(".container", { x: -seccionActual * window.innerWidth, duration: 1, ease: "power2.inOut" });
}
