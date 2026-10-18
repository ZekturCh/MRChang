# Attach Group · Demos touch de IA para ejecutivos

Sitio: https://paralelvr-demos.web.app/

- Memoria IA: `/attach/memoria/`. Adaptación del motor de `ZekturCh/MEMORYGAME/orica-opt.html`, cinco pares y mensajes propios. Se conservan barajado, selección, puntaje y resultado.
- Activa las oportunidades: `/attach/oportunidades/`. Ronda de 35 segundos, objetivos con aparición/caducidad, +100 por oportunidad, riesgos sin puntos, pausa y reinicio.
- Decide con IA: `/attach/decide/`. Cinco microcasos, tres alternativas, explicación y resultado.

Marca: manual Attach Group 2025 enviado por el cliente, azul #1840E2, violeta #5E2F84 y lavanda #BAC4F0. Logo y fuentes Graphik de los recursos oficiales públicos de Attach.group. El manual completo no forma parte del despliegue.

Contenido educativo basado en el curso IA para ejecutivos proporcionado por Attach. Demos para validar contenido y experiencia; no implican contratación conjunta de los tres juegos.

## Dirección visual

Escenas oscuras con azul/violeta y tipografía Graphik, tarjetas SVG con composición corporativa y fotografía, esferas con volumen y una red tridimensional dibujada en Canvas 2D. Animación limitada a 25 cuadros por segundo, densidad de píxel limitada y suspensión al ocultar la pestaña. Se respeta la preferencia de movimiento reducido.

Memoria: reverso tipográfico y cinco frentes con fotografías tomadas de las páginas 18 y 23 del manual suministrado. Azul principal, degradado azul/violeta, bloque de fotografía con esquina redondeada y signo +, siguiendo las composiciones de las páginas 21 y 22. Logo oficial sin alterar y textos Graphik convertidos a trazados para conservar la tipografía dentro de las imágenes SVG. Fotografías optimizadas e incrustadas; no se publica el manual.

Los aciertos generan ondas y partículas; en oportunidades también iluminan la escena y muestran +100. Los microcasos presentan el tema y la decisión en dos paneles. Sonido sintetizado opcional, desactivado al iniciar, en oportunidades y trivia. Sin bibliotecas gráficas ni dependencias externas en ejecución.

## Hosting

Proyecto Firebase existente: `dbdosparax`. Sitio separado: `paralelvr-demos`. Solo se despliega Hosting; no modifica Firestore, reglas, datos ni otros sitios.

Desde esta carpeta:

```sh
firebase deploy --only hosting --project dbdosparax
```

`public/` contiene únicamente archivos de la aplicación. Sin datos personales, credenciales, capturas, pruebas ni manuales. No requiere base de datos ni servicios de IA; no registra participantes ni resultados en la nube.

Validado: victoria de los cinco pares, cinco microcasos y bloqueo de respuesta, puntuación oportunidad/riesgo, pausa, fin de ronda, reinicio y carga en escritorio/móvil.
