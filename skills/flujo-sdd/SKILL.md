---
name: flujo-sdd
description: Flujo Spec-Driven Development con subagentes y aprobaciones humanas (coordinador → planner → reviewer → aprobación → plan y tareas → aprobación → implementer por tarea → reviewer). Úsala cuando haya que construir una funcionalidad nueva con lógica o datos, cuando Fernando pida una spec, especificar, planificar antes de programar o «hacerlo con SDD».
---

# Flujo SDD (Spec-Driven Development)

Primero se escribe **qué** debe hacer el sistema (requisitos en EARS), después **cómo** (plan), después **en qué orden** (tareas) y solo entonces el código. La spec sigue viva: si algo cambia, se cambia primero la spec (*spec-anchored*).

## Cuándo se usa

| Con spec | Sin spec |
|---|---|
| Funcionalidad nueva con lógica o datos (un estado nuevo, un aviso, una integración) | Ajustes de texto o de estilos |
| Cambios que tocan varias capas o el esquema de la base de datos | Arreglos obvios de una línea |
| Algo que Fernando quiere poder revisar antes de que se programe | Refactorizaciones sin cambio de comportamiento (skill `refactorizar` de fernando-stack) |

## El flujo

Tú, el Claude principal, eres el **coordinador**: no escribes código ni specs, repartes el trabajo y **nunca te saltas un punto de aprobación**.

1. **Spec** → agente `planner`: redacta `specs/NNN-nombre/spec.md` ([plantilla](plantillas/spec.md)). Si la petición es ambigua, devuelve preguntas: pásaselas a Fernando y vuelve con las respuestas.
2. **Clarificación** → agente `reviewer`, en modo spec: enumera ambigüedades, contradicciones y casos límite. Si hay algo, de vuelta al `planner`. Como mucho 2 vueltas; después se pregunta a Fernando.
3. **✋ Aprobación de Fernando de la spec.** Se enseña el resumen y los RF. Sin un «sí» expreso no se sigue. Al aprobarla: «Estado: aprobada».
4. **Plan y tareas** → `planner`: `plan.md` y `tasks.md` ([plantillas](plantillas/)).
5. **✋ Aprobación de Fernando del plan y las tareas.**
6. **Implementación** → `implementer`, **una tarea cada vez**. Después de cada una: el resultado de las pruebas a Fernando, y siguiente tarea.
7. **Validación** → `reviewer`, en modo implementación: RF por RF, con `VEREDICTO`. Si son CAMBIOS NECESARIOS, al `implementer` (como mucho 2 vueltas; después, a Fernando).
8. **Cierre:** spec en «Estado: implementada», `MEMORY.md` y el plan del proyecto al día y los comandos de commit para Fernando (el comando `/guardrails:cierre` lo hace).

**Al empezar cada fase, dilo en una línea** («Fase 2: el reviewer revisa la spec»), para que Fernando sepa dónde está.

## Cómo pasar el trabajo a un subagente

Los subagentes **no ven la conversación**. A cada uno se le pasa:
- la fase («redacta la spec», «revisa la spec», «implementa la tarea 3»);
- la petición original de Fernando, entera y con sus palabras;
- las rutas de los archivos (`specs/NNN-nombre/…`, `AGENTS.md`, la constitución);
- el resultado anterior (las preguntas respondidas, la lista del reviewer…).

## Revisión en paralelo

Los revisores solo leen, así que se pueden lanzar a la vez con focos distintos (por ejemplo: RF y pruebas · reglas de contenido · interfaz en el navegador · norma de estilo). Después se unen en un solo informe, sin repetidos.

## Requisitos EARS

| Patrón | Forma | Ejemplo |
|---|---|---|
| Siempre | EL SISTEMA [hace] | EL SISTEMA guardará cada pedido con un número único. |
| Evento | CUANDO [ocurre] EL SISTEMA [hace] | CUANDO llegue un pedido nuevo, EL SISTEMA avisará en el panel en 15 s como máximo. |
| No deseado | SI [falla] ENTONCES EL SISTEMA [hace] | SI la base de datos no responde, ENTONCES EL SISTEMA guardará la solicitud en la cola y la reintentará. |
| Estado | MIENTRAS [estado] EL SISTEMA [hace] | MIENTRAS un pedido esté cogido, EL SISTEMA no permitirá que otro empleado lo coja. |
| Opcional | DONDE [haya algo] EL SISTEMA [hace] | DONDE el cliente sea un taller, EL SISTEMA pedirá el nombre del taller. |

Cada requisito lleva su identificador (`RF-01`), se puede comprobar con una prueba y dice qué, no cómo.

## Constitución

Los principios que ninguna spec puede saltarse (seguridad, datos personales, reglas de contenido, «Git es de Fernando»…) van en `specs/CONSTITUCION.md` ([plantilla](plantillas/CONSTITUCION.md)). El `planner` y el `reviewer` la leen siempre. Si el proyecto usa Spec Kit, la suya está en `.specify/memory/constitution.md` y vale igual.
