# Attach Group · Demos touch de IA para ejecutivos

Sitio: https://paralelvr-demos.web.app/

- Memoria IA: `/attach/memoria/`. Adaptación del motor de `ZekturCh/MEMORYGAME/orica-opt.html`, ocho pares / dieciséis tarjetas. Se conservan barajado, selección, +200 por par, penalización de 10 por error, reinicio y resultado. Máximo sin errores: 1600 puntos.
- Elige la IA: `/attach/oportunidades/`. Cinco casos al azar de un banco de diez, con diez segundos por caso. Tres herramientas para un encargo concreto: ajuste ideal +100, ajuste parcial +50, respuesta errónea −5; tiempo agotado 0. El marcador admite negativos y el máximo es 500. Tres esferas del mismo color y tamaño, sin pistas visuales antes de responder; posiciones mezcladas, explicación y avance manual. Pausa, pausa al ocultar la pestaña y reinicio.
- Decide con IA: `/attach/decide/`. Cinco preguntas distintas al azar de un banco de doce, con tres respuestas barajadas y una decisión recomendada. Sin límite de tiempo. Bloqueo tras responder, explicación breve, avance manual y resultado sobre cinco; nuevo sorteo al volver a jugar.

Demos para validar contenido y experiencia; no implican contratación conjunta de los tres juegos.

## Dirección visual

Degradado azul #1840E2 a violeta #5E2F84 en el catálogo y las tres experiencias, siguiendo la referencia suministrada. `brand-theme.css` centraliza el tema compartido. Logo y fuentes Graphik de los recursos oficiales públicos de Attach.group.

`round-games.css` adapta las vistas a la estación touch vertical. Menú, inicio, preguntas, explicaciones y resultado ocupan una sola pantalla. Usa la altura disponible y unidades de contenedor para escalar texto, opciones y controles, con espacio reservado para la explicación y el siguiente paso. No desplaza las respuestas al mostrar el resultado. Sin paneles decorativos anidados ni enlaces externos en la partida; fuentes conservadas en este documento y en el banco de contenido. En Memoria simplifica la entrada y la cabecera sin alterar el motor ni las tarjetas.

Memoria: tarjetas rectangulares verticales de proporción 5:7, con esquinas redondeadas; reverso con la referencia rectangular completa entregada por el cliente, degradado azul/violeta y borde interior blanco fino. Frente blanco con borde interior degradado azul/violeta e isotipo negro grande centrado, sin nombre de producto ni letras en el centro. Marca Attach azul en la esquina superior izquierda y en la esquina inferior derecha del frente, ambas en posición de lectura normal. El reverso conserva únicamente el logo central de la referencia. Distribución 4x4 o 8x2 según el espacio disponible. Las imágenes se incrustan en los SVG para evitar dependencias externas en ejecución.

Isotipos: ChatGPT, Claude, Copilot, ProspectIA, AthenaAds, Galileo IA, Grok y Gemini. Los nombres solo se usan en etiquetas accesibles y en la interfaz de mensajes; no se imprimen junto al símbolo en la tarjeta.

Fuentes de recursos:

- Attach Group, logo y sub-marcas: https://attach.group/ · recursos publicados bajo `/images/menu/`. Isotipos de AthenaAds y Galileo IA aislados mediante ventanas SVG de sus logos completos, conservando geometría.
- ProspectIA: https://prospectia.ai/favicon.png · símbolo del favicon oficial, aislado del fondo mediante filtro SVG y presentado en negro.
- Copilot: https://copilot.microsoft.com/static/cmc/favicon.svg · trazados del logo oficial con tratamiento monocromático.
- Gemini: https://gemini.google.com/ · recurso oficial de icono servido por gstatic.com, presentado en negro mediante filtro SVG.
- ChatGPT y Claude: trazados de Simple Icons v13, https://github.com/simple-icons/simple-icons/tree/13.0.0/icons · identificadores `openai.svg` y `claude.svg`; Simple Icons distribuye sus trazados bajo CC0. Marcas pertenecientes a sus respectivos titulares.
- Grok y reverso Attach: imágenes facilitadas por el cliente en esta conversación.

Animación decorativa Canvas 2D limitada a 25 cuadros por segundo y densidad de píxel limitada; suspensión al ocultar la pestaña. Se respeta la preferencia de movimiento reducido. Aciertos con ondas, partículas y un pulso de luz. Sonido opcional desactivado al iniciar en Elige la IA y trivia.

## Contenido de los juegos 2 y 3

`public/assets/game-content.js` separa el banco de preguntas de la mecánica. No requiere servicios de IA en ejecución.

- Mapa de IAs: https://mapadeias.netlify.app/. Los casos toman sus herramientas como referencia, con requisitos concretos de entregable e integración. Cada caso conserva un enlace a documentación oficial que respalda el ajuste ideal. Los puntajes son criterios editoriales para estos encargos; no son un ranking general de capacidades. Se evitan versiones, precios y benchmarks.
- Test Ejecutivo de Attach: https://programaia.attach.group/test-de-ia/. El original es una autoevaluación. Se adaptaron doce situaciones a decisiones con una respuesta recomendada y explicación, sin reproducir sus formularios ni su clasificación de participantes. Referencias originales: E12, E13, E14, G3, G12, G7, E6, E7, E2, E8, E10 y E11; guardadas como `sourceId`. Temas: contraste de evidencia, evaluación de agentes, datos, prioridades, autonomía, adopción, supervisión, experimentación, hoja de ruta, resistencia, resultados y escalamiento.

Las preguntas se mezclan sin reemplazo dentro de cada partida, igual que las tres posiciones de respuesta. Puede repetirse una pregunta entre partidas independientes. No se solicitan datos personales ni se incorporan formularios, CRM o seguimiento del sitio de referencia.

## Hosting

Proyecto Firebase existente: `dbdosparax`. Sitio separado: `paralelvr-demos`. Solo se despliega Hosting; no modifica Firestore, reglas, datos ni otros sitios.

Desde esta carpeta:

```sh
firebase deploy --only hosting --project dbdosparax
```

`public/` contiene únicamente archivos de la aplicación. Sin credenciales, capturas, pruebas ni manuales. No requiere base de datos ni servicios de IA; no registra participantes ni resultados en la nube.

Validación: memoria conserva ocho pares completos y 1600 puntos, victoria, mezcla, reinicio y errores. Para Elige la IA se verifican +100/+50/−5, marcador negativo, caducidad a diez segundos, bloqueo de doble respuesta, pausa/reanudación, pausa al ocultar pestaña, reinicio y resultado de cinco casos. Para Decide con IA se verifican doce preguntas válidas, cinco distintas por ronda, mezcla de respuestas, bloqueo de doble respuesta y resultados 5/5 y 0/5. Revisión visual en escritorio y móvil de 390 y 320 px, sin desplazamiento horizontal ni errores de JavaScript o recursos.

Revisión de la vista vertical: todas las preguntas y sus explicaciones en 1080×1920, 768×1366, 540×960, 390×844 y 360×640; también escritorio 1440×900 y 1280×720. Se comprueban límites de pantalla, ausencia de scroll y de superposición entre pregunta, opciones y explicación. Se revisan inicio y resultado, y se completa Memoria con sus ocho pares en cuatro tamaños verticales. Validación por navegador, pendiente de probar en el hardware físico del evento.

Caché: todas las rutas, incluidas las URLs limpias sin `.html`, usan `Cache-Control: no-cache, max-age=0, must-revalidate`. El navegador puede reutilizar recursos tras validar su ETag, pero debe comprobar la versión del servidor.
