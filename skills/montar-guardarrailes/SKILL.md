---
name: montar-guardarrailes
description: Monta en un proyecto el arnés para trabajar con agentes (harness engineering) - AGENTS.md corto como única fuente de reglas, CLAUDE.md que lo importa, MEMORY.md versionado, permisos que impiden git al agente, hook pre-push, pruebas de reglas de contenido y lugar para las specs. Úsala al empezar un proyecto nuevo, cuando Fernando pida «montar los guardarraíles», «preparar el proyecto para agentes», ordenar CLAUDE.md/AGENTS.md o revisar si un proyecto cumple el arnés.
---

# Montar los guardarraíles en un proyecto

Cuatro ideas del curso de desarrollo con IA, convertidas en archivos:

| Idea | Qué significa | Archivo |
|---|---|---|
| **Ingeniería de contexto** | Al agente se le da lo relevante en cada momento, no todo siempre. Si recibe de más, olvida requisitos o se inventa cosas | `AGENTS.md` corto y «lee esto cuando toques…» |
| **Una sola fuente de reglas** | Claude, Codex y cualquier otro agente leen lo mismo | `AGENTS.md`; `CLAUDE.md` solo lo importa |
| **Memoria en el repositorio** | Casa y oficina ven el mismo estado | `MEMORY.md` (50 líneas como máximo) |
| **Guardarraíles que se ejecutan** | Permisos, hooks y pruebas, no solo frases | `.claude/settings.json`, hook `pre-push`, pruebas de reglas y CI |

Git ya lo protege siempre el hook de este plugin (`hooks/bloquear-git.js`). Los permisos de `.claude/settings.json` lo repiten en el proyecto, para quien trabaje sin el plugin instalado.

## Pasos

**Antes de tocar nada, mira qué hay** y pregunta a Fernando si algo choca:
- `AGENTS.md`, `CLAUDE.md`, `MEMORY.md`, `HANDOFF.md`, `.claude/`, `.githooks/`, `.github/workflows/` y `docs/`;
- si ya hay reglas largas, **no se borra nada sin moverlo antes**: primero se copia a su documento de `docs/` y después se quita del archivo largo;
- si `CLAUDE.md` y `AGENTS.md` dicen cosas distintas, se enseñan las diferencias y decide Fernando.

1. **`AGENTS.md`** ([plantilla](plantillas/AGENTS.md)):
   - entre 40 y 80 líneas con las secciones de la plantilla;
   - los módulos, comandos y rutas **reales** del proyecto (compruébalos: nada de restos de una plantilla);
   - las explicaciones largas, a `docs/` con su línea en «Lee esto cuando toques…».
2. **`CLAUDE.md`** ([plantilla](plantillas/CLAUDE.md)): `@AGENTS.md` y solo lo que aplica a Claude.
3. **`MEMORY.md`** ([plantilla](plantillas/MEMORY.md)): estado, decisiones recientes, siguiente paso y bloqueos. Si había memoria fuera del repositorio (en `~/.claude/projects/…/memory/`) o un `HANDOFF.md` largo, se resume aquí lo vigente.
4. **`.claude/settings.json`** ([plantilla](plantillas/settings.json)): `deny` para `git add`, `commit` y `push`, y para leer `.env`. Si el `.gitignore` excluye `.claude/`, añadir `!.claude/settings.json`, `!.claude/agents/` y `!.claude/commands/`, para que se versionen y casa y oficina tengan lo mismo.
5. **Hook `pre-push`** ([plantilla](plantillas/pre-push)): en `.githooks/pre-push`, con las comprobaciones del proyecto. Fernando lo activa una vez en cada ordenador con `git config core.hooksPath .githooks` (dáselo como comando).
6. **Pruebas de las reglas que más daño hacen** ([plantilla](plantillas/test_reglas_de_contenido.py)): palabras prohibidas en los textos visibles, frases obligatorias en el prompt de un asistente… Y la prueba de la norma de estilo de `fernando-stack` (skill `estilo-codigo`, carpeta `plantillas/`).
7. **CI:** que ejecute las pruebas, el lint, el formato y las pruebas de reglas en cada PR.
8. **Specs:** carpeta `specs/` con `CONSTITUCION.md` (plantilla en la skill `flujo-sdd`), si el proyecto va a usar el flujo SDD.
9. **MCP del proyecto** (opcional): `.mcp.json` con los servidores que deben ser iguales en casa y en la oficina (por ejemplo, Chrome DevTools). Sin claves: van en variables de entorno.

## Comprobar que funciona

En una **sesión nueva** de Claude Code, preguntar sin dar pistas:
1. «¿Qué módulos tiene el proyecto?»;
2. «¿Qué no puedes hacer nunca?»;
3. «Haz un commit de esto» (tiene que negarse y dar los comandos; si lo intenta, el hook lo bloquea);
4. «¿Qué principios aplicas al escribir código?»;
5. «¿Cuál es el siguiente paso?» (tiene que salir de `MEMORY.md`).

Las cinco respuestas deben salir de los archivos nuevos, sin inventar nada. Anota el resultado en el plan del proyecto.

## Al terminar

Lista de lo creado y lo movido, lo que Fernando tiene que hacer a mano (activar el hook y comprobar la sesión nueva) y los comandos de commit para que los ejecute él.
