// Casos adaptados del material de Attach. Sin versiones, precios ni rankings de modelos.
window.AttachGameContent = Object.freeze({
  "activeCases": [
    {
      "id": "audio-fuentes",
      "title": "De documentos a audio",
      "question": "Quieres convertir varios PDF de trabajo en un pódcast de síntesis, y luego consultar las citas de esos documentos.",
      "options": [
        {
          "label": "NotebookLM",
          "score": 100,
          "why": "Su Audio Overview convierte tus fuentes en una conversación de audio y el cuaderno permite consultar sus citas."
        },
        {
          "label": "Claude · chat",
          "score": 50,
          "why": "Ayuda a analizar los PDF y preparar una síntesis escrita; el entregable pedido es un pódcast generado desde las fuentes."
        },
        {
          "label": "Midjourney",
          "score": -5,
          "why": "Está orientado a contenido visual; aquí necesitas audio y consulta de documentos."
        }
      ],
      "sources": [
        "https://blog.google/innovation-and-ai/products/notebooklm-audio-overviews/"
      ]
    },
    {
      "id": "teams",
      "title": "Dentro de Microsoft 365",
      "question": "Necesitas resumir una reunión de Teams desde su transcripción usando el asistente integrado en Microsoft 365.",
      "options": [
        {
          "label": "Microsoft 365 Copilot",
          "score": 100,
          "why": "Copilot está integrado en Teams y puede resumir la reunión y sus acciones cuando dispone de la transcripción."
        },
        {
          "label": "ChatGPT · chat",
          "score": 50,
          "why": "Puede ayudarte con una transcripción que le proporciones; no es el asistente nativo de Teams que pide este caso."
        },
        {
          "label": "Gamma",
          "score": -5,
          "why": "Su foco es crear presentaciones; no es el asistente integrado para consultar la reunión de Teams."
        }
      ],
      "sources": [
        "https://support.microsoft.com/en-us/teams/copilot/catch-up-on-meetings-with-microsoft-365-copilot-in-teams"
      ]
    },
    {
      "id": "workspace",
      "title": "Dentro de Google Workspace",
      "question": "Tu equipo usa Gmail y Docs. Quiere resumir un hilo y redactar el documento usando sus paneles de IA nativos.",
      "options": [
        {
          "label": "Gemini Workspace",
          "score": 100,
          "why": "Gemini dispone de paneles dentro de Gmail y Docs para resumir correos y trabajar el documento en contexto."
        },
        {
          "label": "Claude · chat",
          "score": 50,
          "why": "Puede trabajar el contenido que le compartas; este caso prioriza los paneles nativos de Gmail y Docs."
        },
        {
          "label": "ElevenLabs · voz",
          "score": -5,
          "why": "Genera voz a partir de texto; no es el asistente nativo de correo y documentos solicitado."
        }
      ],
      "sources": [
        "https://support.google.com/mail/answer/13952129"
      ]
    },
    {
      "id": "doblaje-video",
      "title": "Localización de un video",
      "question": "Debes traducir un video del portavoz a otro idioma, manteniendo la imagen del presentador y sincronizando sus labios.",
      "options": [
        {
          "label": "HeyGen",
          "score": 100,
          "why": "Su traducción de video incluye sincronización labial, que es el requisito que diferencia este encargo."
        },
        {
          "label": "ElevenLabs · doblaje",
          "score": 50,
          "why": "Resuelve la traducción y el doblaje del audio; falta la sincronización labial del video pedida en el caso."
        },
        {
          "label": "Suno",
          "score": -5,
          "why": "Genera música; el encargo es localizar un video existente del portavoz."
        }
      ],
      "sources": [
        "https://help.heygen.com/en/articles/11391941-video-translation-languages-we-support"
      ]
    },
    {
      "id": "locucion",
      "title": "Un guion ya aprobado",
      "question": "Necesitas una locución descargable que siga el guion aprobado, con elección de voz y control de pronunciación. No quieres un pódcast.",
      "options": [
        {
          "label": "ElevenLabs · voz",
          "score": 100,
          "why": "Texto a voz permite producir la locución del guion y ajustar voz y pronunciación antes de descargarla."
        },
        {
          "label": "NotebookLM",
          "score": 50,
          "why": "Produce síntesis en audio de tus fuentes; ese formato reinterpreta el material y no equivale a locutar un guion aprobado."
        },
        {
          "label": "Suno",
          "score": -5,
          "why": "El resultado buscado es voz hablada siguiendo un guion, no una pieza musical."
        }
      ],
      "sources": [
        "https://elevenlabs.io/docs/creative-platform/playground/text-to-speech"
      ]
    },
    {
      "id": "presentacion",
      "title": "Del esquema a la presentación",
      "question": "Tienes un esquema de seis secciones y necesitas convertirlo en una presentación editable, con diseño y varias diapositivas.",
      "options": [
        {
          "label": "Gamma",
          "score": 100,
          "why": "Está orientado a transformar un esquema o documento en una presentación diseñada que después puedes editar."
        },
        {
          "label": "Napkin AI",
          "score": 50,
          "why": "Ayuda a crear diagramas y visuales para esas diapositivas; cubre una parte, no la presentación completa solicitada."
        },
        {
          "label": "Wispr Flow",
          "score": -5,
          "why": "Su foco es el dictado de texto; no realiza el diseño de la presentación."
        }
      ],
      "sources": [
        "https://gamma.app/"
      ]
    },
    {
      "id": "editor",
      "title": "Trabajar sobre el proyecto",
      "question": "Tu equipo necesita que su editor de código modifique archivos del proyecto y ejecute pruebas con el contexto de ese repositorio.",
      "options": [
        {
          "label": "Cursor",
          "score": 100,
          "why": "Su agente trabaja dentro del editor sobre archivos del proyecto y puede ejecutar comandos y pruebas."
        },
        {
          "label": "Claude · chat",
          "score": 50,
          "why": "Puede explicar o proponer código en conversación; aquí se pide operar directamente en el editor sobre el repositorio."
        },
        {
          "label": "Gamma",
          "score": -5,
          "why": "Crea presentaciones y documentos visuales; no es un editor de código para ejecutar pruebas del proyecto."
        }
      ],
      "sources": [
        "https://docs.cursor.com/agent/overview"
      ]
    },
    {
      "id": "modelo-bi",
      "title": "Analítica en el entorno existente",
      "question": "Quieres preguntar por las ventas dentro de Power BI, usando el modelo de datos existente, sin exportarlo a otra herramienta.",
      "options": [
        {
          "label": "Power BI Copilot",
          "score": 100,
          "why": "Puede consultar informes y modelos semánticos dentro de Power BI; coincide con el entorno y el requisito de no exportar."
        },
        {
          "label": "ChatGPT · análisis",
          "score": 50,
          "why": "Puede analizar un archivo que le compartas; exportar datos sería un paso adicional que este encargo excluye."
        },
        {
          "label": "Gamma",
          "score": -5,
          "why": "Puede presentar conclusiones, pero no consulta el modelo existente dentro de Power BI."
        }
      ],
      "sources": [
        "https://learn.microsoft.com/en-us/power-bi/create-reports/copilot-reports-overview"
      ]
    },
    {
      "id": "dictado",
      "title": "Hablar donde escribes",
      "question": "Quieres dictar un correo y después un documento, insertando texto donde está el cursor en distintas aplicaciones. No estás grabando una reunión.",
      "options": [
        {
          "label": "Wispr Flow",
          "score": 100,
          "why": "Está diseñado para dictar y dar formato al texto en distintas aplicaciones, justo donde estás escribiendo."
        },
        {
          "label": "Granola",
          "score": 50,
          "why": "Ayuda a registrar y organizar notas de reuniones; después tendrías que trasladar ese texto al correo o documento."
        },
        {
          "label": "ElevenLabs · voz",
          "score": -5,
          "why": "Convierte texto en voz; aquí necesitas convertir tu voz en texto dentro de otras aplicaciones."
        }
      ],
      "sources": [
        "https://wisprflow.ai/"
      ]
    },
    {
      "id": "diagrama",
      "title": "Visualizar una explicación",
      "question": "Quieres convertir un párrafo que explica un proceso en un diagrama editable, sin preparar una presentación de diapositivas.",
      "options": [
        {
          "label": "Napkin AI",
          "score": 100,
          "why": "Su flujo está centrado en transformar texto en diagramas y visuales editables, sin tener que construir una presentación."
        },
        {
          "label": "Gamma",
          "score": 50,
          "why": "Puede ayudarte a visualizar el contenido dentro de una presentación; añade un formato que este encargo no necesita."
        },
        {
          "label": "ElevenLabs · voz",
          "score": -5,
          "why": "Produce audio a partir de texto; no entrega el diagrama editable solicitado."
        }
      ],
      "sources": [
        "https://www.napkin.ai/"
      ]
    }
  ],
  "triviaCases": [
    {
      "id": "contrastar",
      "title": "Criterio ejecutivo",
      "question": "La IA alerta de un cliente riesgoso; el gerente discrepa. ¿Cómo resuelves la decisión?",
      "answers": [
        {
          "text": "Contrastar datos y supuestos; decidir con un responsable claro.",
          "correct": true
        },
        {
          "text": "Seguir al gerente por su experiencia.",
          "correct": false
        },
        {
          "text": "Seguir al modelo por usar datos.",
          "correct": false
        }
      ],
      "why": "La experiencia y el modelo aportan información. El líder contrasta ambas y conserva la responsabilidad de decidir.",
      "sourceId": "E12",
      "icon": "eye"
    },
    {
      "id": "reembolsos",
      "title": "Evaluar un agente",
      "question": "Un agente promete ahorrar en reembolsos. ¿Qué necesitas antes de aprobar su piloto?",
      "answers": [
        {
          "text": "Una línea base, métricas y supervisión de errores.",
          "correct": true
        },
        {
          "text": "Solo la aprobación técnica de TI.",
          "correct": false
        },
        {
          "text": "Empezar y medir únicamente el ahorro.",
          "correct": false
        }
      ],
      "why": "La evaluación debe cubrir cómo se medirá el beneficio y cómo se detectarán y gestionarán los errores.",
      "sourceId": "E13",
      "icon": "target"
    },
    {
      "id": "datos-clientes",
      "title": "Uso responsable",
      "question": "El equipo carga datos de clientes en una IA no autorizada. ¿Qué acción tomas?",
      "answers": [
        {
          "text": "Detener esa carga, fijar reglas y habilitar alternativas aprobadas.",
          "correct": true
        },
        {
          "text": "Permitirlo mientras mejore la productividad.",
          "correct": false
        },
        {
          "text": "Esperar una política sin cambiar el uso actual.",
          "correct": false
        }
      ],
      "why": "Hay que reducir la exposición de datos y ofrecer una forma autorizada de continuar trabajando.",
      "sourceId": "E14",
      "icon": "shield"
    },
    {
      "id": "competidor",
      "title": "Visión de negocio",
      "question": "Un competidor anuncia una nueva IA. ¿Qué revisas primero?",
      "answers": [
        {
          "text": "Qué problema resuelve y si es prioritario para tu negocio.",
          "correct": true
        },
        {
          "text": "Cómo copiarla lo antes posible.",
          "correct": false
        },
        {
          "text": "Cuándo comprar la misma tecnología.",
          "correct": false
        }
      ],
      "why": "La decisión parte de una necesidad relevante del negocio, no del anuncio del competidor.",
      "sourceId": "G3",
      "icon": "target"
    },
    {
      "id": "autonomia",
      "title": "Gobernanza",
      "question": "Un agente ejecutará un proceso importante. ¿Qué debe definir su autonomía?",
      "answers": [
        {
          "text": "El riesgo de sus decisiones y los controles necesarios.",
          "correct": true
        },
        {
          "text": "Solo el porcentaje de precisión.",
          "correct": false
        },
        {
          "text": "Solo el ahorro que promete.",
          "correct": false
        }
      ],
      "why": "La autonomía debe ajustarse al impacto de los errores y a los mecanismos de supervisión y escalamiento.",
      "sourceId": "G12",
      "icon": "shield"
    },
    {
      "id": "adopcion",
      "title": "Personas y procesos",
      "question": "El piloto funciona, pero casi nadie lo usa. ¿Qué investigas primero?",
      "answers": [
        {
          "text": "Cómo encaja en el trabajo real de sus usuarios.",
          "correct": true
        },
        {
          "text": "Si conviene obligar a todos a usarlo.",
          "correct": false
        },
        {
          "text": "Si basta con mejorar su precisión.",
          "correct": false
        }
      ],
      "why": "Una solución puede funcionar técnicamente y aun así no resolver el trabajo cotidiano de quien debe adoptarla.",
      "sourceId": "G7",
      "icon": "flow"
    },
    {
      "id": "revision",
      "title": "Aprobación responsable",
      "question": "Además del retorno esperado, ¿qué debe revisar el líder antes de aprobar IA?",
      "answers": [
        {
          "text": "Datos, seguridad, impactos y quién supervisa.",
          "correct": true
        },
        {
          "text": "Únicamente el costo de las licencias.",
          "correct": false
        },
        {
          "text": "La popularidad de la herramienta.",
          "correct": false
        }
      ],
      "why": "La evaluación incluye privacidad, seguridad, cumplimiento, sesgos, efectos en las personas y responsabilidad de supervisión.",
      "sourceId": "E6",
      "icon": "shield"
    },
    {
      "id": "experimentacion",
      "title": "Aprender con pilotos",
      "question": "Quieres aprender con IA sin comprometer toda la operación. ¿Cómo empiezas?",
      "answers": [
        {
          "text": "Con un piloto acotado, recursos y criterios de aprendizaje.",
          "correct": true
        },
        {
          "text": "Desplegando en todas las áreas a la vez.",
          "correct": false
        },
        {
          "text": "Esperando indefinidamente a los competidores.",
          "correct": false
        }
      ],
      "why": "Experimentar con alcance y criterios claros permite aprender de los resultados sin escalar un riesgo innecesario.",
      "sourceId": "E7",
      "icon": "bolt"
    },
    {
      "id": "priorizar",
      "title": "Hoja de ruta",
      "question": "Tienes varias ideas de IA sin ordenar. ¿Qué paso convierte la lista en una hoja de ruta?",
      "answers": [
        {
          "text": "Priorizar valor esperado y definir indicadores.",
          "correct": true
        },
        {
          "text": "Elegir las herramientas más conocidas.",
          "correct": false
        },
        {
          "text": "Asignar el mismo presupuesto a todas.",
          "correct": false
        }
      ],
      "why": "Una hoja de ruta conecta prioridades e impacto esperado con indicadores que permitan revisar el avance.",
      "sourceId": "E2",
      "icon": "target"
    },
    {
      "id": "resistencia",
      "title": "Liderar el cambio",
      "question": "Una persona se resiste a la IA. ¿Qué respuesta favorece una adopción útil?",
      "answers": [
        {
          "text": "Entender sus motivos e involucrarla en rediseñar el trabajo.",
          "correct": true
        },
        {
          "text": "Exigir uso sin escuchar sus dificultades.",
          "correct": false
        },
        {
          "text": "Dejar que resuelva sola la adaptación.",
          "correct": false
        }
      ],
      "why": "Involucrar a las personas ayuda a descubrir barreras reales y a diseñar una forma de uso que tenga sentido para ellas.",
      "sourceId": "E8",
      "icon": "brain"
    },
    {
      "id": "resultados",
      "title": "Demostrar valor",
      "question": "¿Qué evidencia muestra mejor el aporte de una iniciativa de IA?",
      "answers": [
        {
          "text": "Cambios medidos frente a una base en tiempo, calidad o negocio.",
          "correct": true
        },
        {
          "text": "La cantidad de licencias compradas.",
          "correct": false
        },
        {
          "text": "Que la demostración haya impresionado al comité.",
          "correct": false
        }
      ],
      "why": "El valor se demuestra con resultados medidos y comparables; comprar o demostrar una herramienta no basta.",
      "sourceId": "E10",
      "icon": "data"
    },
    {
      "id": "escalar",
      "title": "Del piloto a la operación",
      "question": "Después de varios pilotos, ¿qué decisión corresponde?",
      "answers": [
        {
          "text": "Escalar los que cumplieron metas y detener o revisar los demás.",
          "correct": true
        },
        {
          "text": "Escalarlos todos porque incorporan IA.",
          "correct": false
        },
        {
          "text": "Mantenerlos todos como pilotos permanentes.",
          "correct": false
        }
      ],
      "why": "Las metas y los riesgos revisados permiten decidir qué iniciativas merecen continuar y cuáles deben cambiar o detenerse.",
      "sourceId": "E11",
      "icon": "flow"
    }
  ],
  "sources": {
    "map": "https://mapadeias.netlify.app/",
    "trivia": "https://programaia.attach.group/test-de-ia/"
  }
});
