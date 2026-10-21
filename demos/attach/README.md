# Attach Group · Demos touch de IA para ejecutivos

Sitio: https://paralelvr-demos.web.app/

- Memoria IA: `/attach/memoria/`. Adaptación del motor de `ZekturCh/MEMORYGAME/orica-opt.html`, ocho pares / dieciséis tarjetas. Se conservan barajado, selección, +200 por par, penalización de 10 por error, reinicio y resultado. Máximo sin errores: 1600 puntos.
- Elige la IA: `/attach/oportunidades/`. Cinco casos al azar de un banco de diez, con diez segundos por caso. Tres herramientas para un encargo concreto: ajuste ideal +100, ajuste parcial +50, respuesta errónea −5; tiempo agotado 0. El marcador admite negativos y el máximo es 500. Tres esferas del mismo color y tamaño, sin pistas visuales antes de responder; posiciones mezcladas, explicación y avance manual. Pausa, pausa al ocultar la pestaña y reinicio.
- Decide con IA: `/attach/decide/`. Cinco preguntas distintas al azar de un banco de doce, con tres respuestas barajadas y una decisión recomendada. Sin límite de tiempo. Bloqueo tras responder, explicación breve, avance manual y resultado sobre cinco; nuevo sorteo al volver a jugar.

Demos para validar contenido y experiencia; no implican contratación conjunta de los tres juegos.

## Dirección visual

Degradado azul #1840E2 a violeta #5E2F84 en el catálogo y las tres experiencias, siguiendo la referencia suministrada. `brand-theme.css` centraliza el tema compartido. Logo y fuentes Graphik de los recursos oficiales públicos de Attach.group.

`round-games.css` y `ranking.css` adaptan las vistas a la estación touch vertical. Menú, inicio, registro, preguntas, explicaciones y resultado ocupan una sola pantalla. Usa la altura disponible y unidades de contenedor para escalar texto, opciones y controles, con espacio reservado para la explicación y el siguiente paso. No desplaza las respuestas al mostrar el resultado. Las opciones del menú tienen fondos blanco, azul claro y lila para distinguir las experiencias. El tiempo de Elige la IA se representa con un reloj circular y un pulso durante los tres últimos segundos, respetando movimiento reducido.

Memoria: tarjetas rectangulares verticales de proporción 5:7, con esquinas redondeadas; reverso con la referencia rectangular completa entregada por el cliente, degradado azul/violeta y borde interior blanco fino. Frentes con marco y marcas Attach blancos en las esquinas. Las cinco IA externas conservan sus isotipos y placas originales sobre el degradado azul/violeta. Attach Group, AthenaAds y Galileo IA usan las tres imágenes JPEG entregadas por el cliente el 21/10, con símbolos blancos y fondos originales sin recolorear, incrustadas completas en SVG y encuadradas con recorte centrado. Se conserva la ausencia de nombres de producto en el centro. Distribución 4x4 o 8x2 según el espacio disponible. Las imágenes se incrustan en los SVG para evitar dependencias externas en ejecución.

Isotipos: ChatGPT, Claude, Copilot, Attach Group, AthenaAds, Galileo IA, Grok y Gemini. Los nombres solo se usan en etiquetas accesibles y en la interfaz de mensajes; no se imprimen junto al símbolo en la tarjeta.

Fuentes de recursos:

- Attach Group, logo y sub-marcas: https://attach.group/ · recursos publicados bajo `/images/menu/`. Isotipos de AthenaAds y Galileo IA aislados mediante ventanas SVG de sus logos completos, conservando geometría.
- ProspectIA: https://prospectia.ai/favicon.png · favicon oficial completo con su degradado original.
- Copilot: https://copilot.microsoft.com/static/cmc/favicon.svg · trazados y degradados del logo oficial.
- Gemini: https://gemini.google.com/ · recurso oficial de icono servido por gstatic.com, conservando sus colores.
- ChatGPT y Claude: trazados de Simple Icons v13, https://github.com/simple-icons/simple-icons/tree/13.0.0/icons · identificadores `openai.svg` y `claude.svg`; Simple Icons distribuye sus trazados bajo CC0. Marcas pertenecientes a sus respectivos titulares.
- Grok y reverso Attach: imágenes facilitadas por el cliente en esta conversación.

Animación decorativa Canvas 2D limitada a 25 cuadros por segundo y densidad de píxel limitada; suspensión al ocultar la pestaña. Se respeta la preferencia de movimiento reducido. Aciertos con ondas, partículas y un pulso de luz. Sonido opcional desactivado al iniciar en Elige la IA y trivia.

## Contenido de los juegos 2 y 3

`public/assets/game-content.js` separa el banco de preguntas de la mecánica. No requiere servicios de IA en ejecución.

- Mapa de IAs: https://mapadeias.netlify.app/. Los casos toman sus herramientas como referencia, con requisitos concretos de entregable e integración. Cada caso conserva un enlace a documentación oficial que respalda el ajuste ideal. Los puntajes son criterios editoriales para estos encargos; no son un ranking general de capacidades. Se evitan versiones, precios y benchmarks.
- Test Ejecutivo de Attach: https://programaia.attach.group/test-de-ia/. El original es una autoevaluación. Se adaptaron doce situaciones a decisiones con una respuesta recomendada y explicación, sin reproducir sus formularios ni su clasificación de participantes. Referencias originales: E12, E13, E14, G3, G12, G7, E6, E7, E2, E8, E10 y E11; guardadas como `sourceId`. Temas: contraste de evidencia, evaluación de agentes, datos, prioridades, autonomía, adopción, supervisión, experimentación, hoja de ruta, resistencia, resultados y escalamiento.

Las preguntas se mezclan sin reemplazo dentro de cada partida, igual que las tres posiciones de respuesta. Puede repetirse una pregunta entre partidas independientes. No se incorporan formularios, CRM o seguimiento del sitio de referencia. El registro opcional del ranking es propio de esta aplicación y solo solicita nombre o alias.

## Ranking y funcionamiento sin internet

- Registro antes de cada partida con teclado touch local. Se informa que el nombre y puntaje aparecerán en el ranking; también se puede jugar sin ranking. Reiniciar una partida conserva el alias, mientras que volver a jugar abre un registro nuevo para el siguiente participante.
- Un Top 5 por juego, accesible desde el inicio y desde el resultado. `/ranking/?game=memoria`, `?game=elige` y `?game=decide`. El botón de imagen genera un PNG local de 1080×1500: abre la función de compartir cuando existe y, en otros navegadores, descarga el archivo.
- Se ordena por puntaje descendente, luego movimientos de Memoria y tiempo activo de respuesta ascendente. Elige la IA y Decide con IA excluyen del desempate el tiempo empleado en leer las explicaciones; Elige también excluye las pausas. Los últimos desempates usan fecha e identificador. Cada resultado es una partida independiente.
- IndexedDB `paralelvr-attach-ranking-v1` conserva todos los resultados del equipo, con estado pendiente/sincronizado. Se confirma el guardado local antes de intentar subir. Cada partida tiene un UUID; Firestore solo admite creación, y la reconciliación de un envío repetido comprueba que el resultado existente coincida. No se borran pendientes ante errores de red.
- Sincroniza al abrir, reconectar, volver a la pestaña y mediante reintentos. Background Sync añade recuperación con la pestaña cerrada en navegadores que lo admiten; en los demás, basta reabrir la web con internet. El ranking de otro dispositivo se actualiza después de que el equipo de juego sincronice.
- Service worker y Cache Storage conservan todas las pantallas, preguntas, logos, tipografías y scripts. Una versión completa del sitio se sirve de forma coherente; al actualizar, se sustituyen solo las cachés de esta aplicación. IndexedDB queda intacto. Una actualización en espera se activa en el menú, evitando interrumpir una partida.

Preparación del evento: abrir el menú una vez con internet y esperar el punto verde de estado. Después se puede navegar a cualquiera de los juegos y al ranking sin red, incluso tras cerrar y abrir el navegador. Usar el mismo perfil, fuera de incógnito. Antes de borrar datos del navegador o cambiar de equipo, reconectar y comprobar el punto verde (preparado, conectado y sin pendientes). El indicador nunca confirma que todo esté preparado si falta algún archivo del paquete offline.

Firestore usa la base existente `(default)` de `dbdosparax`, exclusivamente en:

```text
paralelvr_attach_events/attach-ia-ejecutivos-v1/games/{memoria|elige|decide}/paralelvr_attach_scores/{uuid}
```

Campos: versión del esquema, juego, alias, puntaje, movimientos, tiempo activo, fecha local y fecha de recepción del servidor. Sin teléfono, correo, documento ni analítica de participantes. Las reglas permiten listar hasta cinco resultados y crear registros con formato y rangos válidos; no permiten editarlos ni borrarlos desde el cliente. La lógica de partida permanece en el dispositivo. El identificador de evento separa estos resultados de otras experiencias y futuras ediciones.

`scripts/deploy-rankings.cjs` incorpora únicamente el bloque de `infra/attach-ranking.rules` a las reglas activas, conservando las reglas previas. Compila antes de publicar, guarda un respaldo fuera del repositorio y vuelve a comprobar la versión activa. Crea solo el índice específico de `paralelvr_attach_scores`; no sustituye índices existentes. No habilita facturación ni altera otras colecciones o sitios. `ranking-config.js` contiene la configuración web pública de Firebase, sin credenciales privadas.

## Hosting

Proyecto Firebase existente: `dbdosparax`. Sitio separado: `paralelvr-demos`. El despliegue habitual publica únicamente Hosting; la configuración aislada del ranking se realiza con el script anterior.

Desde esta carpeta:

```sh
node scripts/build-offline.cjs
firebase deploy --only hosting --project dbdosparax
```

Ejecutar `build-offline.cjs` después de cualquier cambio en `public/`: calcula la versión de la caché a partir del contenido completo. `public/` contiene únicamente archivos de aplicación, sin credenciales privadas, capturas, pruebas, audios ni manuales. Los juegos no requieren servicios de IA; Firebase recibe únicamente los resultados que el participante decide guardar.

Validación: memoria conserva ocho pares completos y 1600 puntos, victoria, mezcla, reinicio y errores. Para Elige la IA se verifican +100/+50/−5, marcador negativo, caducidad a diez segundos, bloqueo de doble respuesta, pausa/reanudación, pausa al ocultar pestaña, reinicio y resultado de cinco casos. Para Decide con IA se verifican doce preguntas válidas, cinco distintas por ronda, mezcla de respuestas, bloqueo de doble respuesta y resultados 5/5 y 0/5. Revisión visual en escritorio y móvil de 390 y 320 px, sin desplazamiento horizontal ni errores de JavaScript o recursos.

Revisión de la vista vertical: todas las preguntas y sus explicaciones en 1080×1920, 768×1366, 540×960, 390×844 y 360×640; también escritorio 1440×900 y 1280×720. Se comprueban límites de pantalla, ausencia de scroll y de superposición entre pregunta, opciones y explicación. Se revisan inicio y resultado, y se completa Memoria con sus ocho pares en cuatro tamaños verticales. Validación por navegador, pendiente de probar en el hardware físico del evento.

Validación offline y de ranking: las tres partidas completas se ejecutan sin internet; los pendientes sobreviven a cerrar y reabrir Chrome desconectado. Nueve resultados se sincronizan al reconectar y un navegador independiente recupera el Top 5 desde Firestore, con desempates y separación entre juegos. Se genera el PNG sin red. Se comprueban creación válida, rechazo de edición, rechazo de puntaje fuera de rango, límite de cinco lecturas, reconciliación de envíos duplicados y conservación exacta de las reglas preexistentes. Los registros y perfiles de prueba se eliminan antes de publicar.

Caché HTTP: todas las rutas, incluidas las URLs limpias sin `.html`, usan `Cache-Control: no-cache, max-age=0, must-revalidate`. La caché offline es independiente y se administra por el service worker con una versión derivada del contenido.

## Ajustes de operación touch · 21/10/2026

Las opciones tienen superficies blancas y texto azul oscuro. Al responder, la recomendada es azul sólida con texto blanco; una selección distinta usa lila con texto morado y el rótulo «Tu elección». Las tres opciones comparten el mismo estilo antes de responder. Memoria usa únicamente un pulso de escala por par, sin aviso emergente ni partículas.

`/kiosk/` mantiene un único documento exterior mientras los juegos y rankings navegan en un iframe del mismo origen. Todas las entradas directas se abren en este contenedor; no hay controles fullscreen dentro de los juegos. El único control ocupa 44×44 px en la esquina inferior izquierda, invisible en uso normal y accesible por teclado. Tocar esa zona activa o desactiva la pantalla completa; Esc también permite salir. La navegación interna conserva fullscreen sin volver a solicitarlo ni impedir la salida del usuario. El contenedor y sus scripts forman parte del paquete offline.

Enlace único final: https://pllvr.web.app. Hosting publica tanto este sitio como paralelvr-demos dentro del mismo proyecto y con los mismos recursos y ranking. El contenedor mantiene la dirección visible en la raíz, sin parámetros. Cada dominio prepara su propio caché: abrir el enlace definitivo online en el equipo del evento y esperar el punto verde. Los resultados pendientes del dominio anterior deben sincronizarse desde ese dominio antes de cambiar de equipo o borrar su almacenamiento.

## Menú compacto y estado discreto · 21/10/2026

Las tres tarjetas del menú comparten altura de rótulos, descripción y botones; los rótulos de los juegos 2 y 3 se abrevian para mantener una línea. Se usan tonos fríos claros próximos a la paleta Attach, con texto azul oscuro. Se verifican botones alineados y ausencia de scroll en 1080×1920, 768×1366, 390×844, 360×640 y 1440×900.

El estado global es un punto fijo de 8 px, sin texto visible, parpadeo ni región de anuncios en vivo. Verde: paquete offline completo, conexión disponible y sin pendientes; gris: paquete preparado sin conexión; ámbar: preparación, pendientes o error de sincronización; rosado: guardado local no disponible. Los detalles siguen disponibles como título y etiqueta accesible. Se conserva data-ready para comprobar la preparación completa; no cambia el guardado ni la sincronización.

## Referencias finales de las tres marcas propias · 21/10/2026

Los dos audios suministrados aclaran que ProspectIA se incluyó por confusión y debe reemplazarse por la marca Attach Group, manteniendo ocho pares. Las referencias son: Attach (símbolo blanco sobre azul/cian), AthenaAds (casco blanco sobre verde/cian) y Galileo IA (nodos y estrella blancos sobre coral/naranja). Los JPEG originales se incorporan sin recolorear ni regenerar sus símbolos. Los ocho frentes llevan marco blanco y marcas Attach blancas; los cinco isotipos externos conservan sus recursos originales. Se retira el SVG de ProspectIA que ya no se usa en memoria. Partida completa offline verificada: ocho pares, dieciséis cartas y 1600 puntos sin errores; sin cambios en ranking, preguntas o mecánicas.

## Color de borde a borde en todos los frentes · 21/10/2026

Se quitan las placas cuadradas interiores de las cinco IA externas. ChatGPT ocupa todo el frente en verde #10a37f con símbolo blanco; Claude en naranja #d97757 con símbolo blanco; Gemini en gris oscuro #43464b con su símbolo multicolor; Grok en negro con símbolo blanco (filtro SVG sobre la referencia existente); Copilot en azul oscuro #182b44 conservando el isotipo multicolor. Todos mantienen marco y marcas Attach blancos. Las tres imágenes propias de Attach, AthenaAds y Galileo IA permanecen intactas.

## Navegación touch dentro de una sola sesión · 21/10/2026

Los enlaces internos se interceptan antes de la navegación del navegador y se pasan al contenedor mediante mensajes de mismo origen. El contenedor valida origen, ventana emisora y ruta, y reemplaza únicamente el documento del iframe existente. No abre ventanas ni pestañas y bloquea transiciones duplicadas durante la carga. Las descargas conservan su comportamiento. La URL de inicio del manifiesto se normaliza a la raíz. Validación con Chrome y entrada touch emulada: 48 cambios entre los tres juegos, menú y ranking, online y offline; una sola pestaña, cero ventanas emergentes, cero errores y fullscreen conservado. Pendiente confirmar en el equipo físico reportado por el cliente.
