# Attach Group · Demos touch de IA para ejecutivos

Sitio: https://paralelvr-demos.web.app/

- Memoria IA: `/attach/memoria/`. Adaptación del motor de `ZekturCh/MEMORYGAME/orica-opt.html`, ocho pares / dieciséis tarjetas. Se conservan barajado, selección, +200 por par, penalización de 10 por error, reinicio y resultado. Máximo sin errores: 1600 puntos.
- Activa las oportunidades: `/attach/oportunidades/`. Ronda de 35 segundos, objetivos con aparición/caducidad, +100 por oportunidad, riesgos sin puntos, pausa y reinicio.
- Decide con IA: `/attach/decide/`. Cinco microcasos, tres alternativas, explicación y resultado.

Demos para validar contenido y experiencia; no implican contratación conjunta de los tres juegos.

## Dirección visual

Degradado azul #1840E2 a violeta #5E2F84 en el catálogo y las tres experiencias, siguiendo la referencia suministrada. `brand-theme.css` centraliza el tema compartido. Logo y fuentes Graphik de los recursos oficiales públicos de Attach.group.

Memoria: tarjetas rectangulares verticales de proporción 5:7, con esquinas redondeadas; reverso con la referencia rectangular completa entregada por el cliente, degradado azul/violeta y borde interior blanco fino. Frente blanco con borde interior degradado azul/violeta e isotipo negro grande centrado, sin nombre de producto ni letras en el centro. Marca Attach azul en la esquina superior izquierda y en la esquina inferior derecha del frente, ambas en posición de lectura normal. El reverso conserva únicamente el logo central de la referencia. Distribución 4x4 o 8x2 según el espacio disponible. Las imágenes se incrustan en los SVG para evitar dependencias externas en ejecución.

Isotipos: ChatGPT, Claude, Copilot, ProspectIA, AthenaAds, Galileo IA, Grok y Gemini. Los nombres solo se usan en etiquetas accesibles y en la interfaz de mensajes; no se imprimen junto al símbolo en la tarjeta.

Fuentes de recursos:

- Attach Group, logo y sub-marcas: https://attach.group/ · recursos publicados bajo `/images/menu/`. Isotipos de AthenaAds y Galileo IA aislados mediante ventanas SVG de sus logos completos, conservando geometría.
- ProspectIA: https://prospectia.ai/favicon.png · símbolo del favicon oficial, aislado del fondo mediante filtro SVG y presentado en negro.
- Copilot: https://copilot.microsoft.com/static/cmc/favicon.svg · trazados del logo oficial con tratamiento monocromático.
- Gemini: https://gemini.google.com/ · recurso oficial de icono servido por gstatic.com, presentado en negro mediante filtro SVG.
- ChatGPT y Claude: trazados de Simple Icons v13, https://github.com/simple-icons/simple-icons/tree/13.0.0/icons · identificadores `openai.svg` y `claude.svg`; Simple Icons distribuye sus trazados bajo CC0. Marcas pertenecientes a sus respectivos titulares.
- Grok y reverso Attach: imágenes facilitadas por el cliente en esta conversación.

Animación decorativa Canvas 2D limitada a 25 cuadros por segundo y densidad de píxel limitada; suspensión al ocultar la pestaña. Se respeta la preferencia de movimiento reducido. Aciertos con ondas y partículas, y luz/+100 en oportunidades. Sonido opcional desactivado al iniciar en oportunidades y trivia.

## Hosting

Proyecto Firebase existente: `dbdosparax`. Sitio separado: `paralelvr-demos`. Solo se despliega Hosting; no modifica Firestore, reglas, datos ni otros sitios.

Desde esta carpeta:

```sh
firebase deploy --only hosting --project dbdosparax
```

`public/` contiene únicamente archivos de la aplicación. Sin credenciales, capturas, pruebas ni manuales. No requiere base de datos ni servicios de IA; no registra participantes ni resultados en la nube.

Validación: ocho pares completos y 1600 puntos, victoria, mezcla, reinicio y errores; cinco microcasos y bloqueo de respuesta; puntuación oportunidad/riesgo, pausa, fin de ronda y reinicio. Se comprueba que las 16 tarjetas caben en escritorio, tótem vertical y móvil, con objetivos táctiles de al menos 44 px.

Caché: todas las rutas, incluidas las URLs limpias sin `.html`, usan `Cache-Control: no-cache, max-age=0, must-revalidate`. El navegador puede reutilizar recursos tras validar su ETag, pero debe comprobar la versión del servidor.
