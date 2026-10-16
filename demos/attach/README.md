# Attach Group · Demos touch de IA para ejecutivos

Sitio: https://paralelvr-demos.web.app/

- Memoria IA: `/attach/memoria/`. Adaptación del motor de `ZekturCh/MEMORYGAME/orica-opt.html`, cinco pares y mensajes propios. Se conservan barajado, selección, puntaje y resultado.
- Activa las oportunidades: `/attach/oportunidades/`. Ronda de 35 segundos, objetivos con aparición/caducidad, +100 por oportunidad, riesgos sin puntos, pausa y reinicio.
- Decide con IA: `/attach/decide/`. Cinco microcasos, tres alternativas, explicación y resultado.

Marca: manual Attach Group 2025 enviado por el cliente, azul #1840E2, violeta #5E2F84 y lavanda #BAC4F0. Logo y fuentes Graphik de los recursos oficiales públicos de Attach.group. El manual completo no forma parte del despliegue.

Contenido educativo basado en el curso IA para ejecutivos proporcionado por Attach. Demos para validar contenido y experiencia; no implican contratación conjunta de los tres juegos.

## Hosting

Proyecto Firebase existente: `dbdosparax`. Sitio separado: `paralelvr-demos`. Solo se despliega Hosting; no modifica Firestore, reglas, datos ni otros sitios.

Desde esta carpeta:

```sh
firebase deploy --only hosting --project dbdosparax
```

`public/` contiene únicamente archivos de la aplicación. Sin datos personales, credenciales, capturas, pruebas ni manuales. No requiere base de datos ni servicios de IA; no registra participantes ni resultados en la nube.

Validado: victoria de los cinco pares, cinco microcasos y bloqueo de respuesta, puntuación oportunidad/riesgo, pausa, fin de ronda, reinicio y carga en escritorio/móvil.
