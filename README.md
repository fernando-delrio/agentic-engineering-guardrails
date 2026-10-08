# agentic-engineering-guardrails

Guardarraíles para trabajar con agentes de IA (Claude Code, Codex…) sin perder el control del proyecto. Es un **plugin de Claude Code** (`guardrails`) más plantillas para montar el arnés en cada repositorio.

Sale del *Curso de Desarrollo con IA* de BIG school (harness engineering, Spec-Driven Development, multiagentes) y de lo que se probó en `tools_equip` y `primer-equipo-ai`. La regla de oro del curso, que es también la de Fernando: **la IA ejecuta, pero el responsable del proyecto eres tú.**

Va junto a [fernando-stack](https://github.com/fernando-delrio/fernando-stack): ese plugin dice **cómo se escribe el código**; este, **cómo se trabaja con los agentes**.

## Qué trae

| Pieza | Qué hace |
|---|---|
| **Hook `bloquear-git`** | Antes de cada comando de Bash o PowerShell, bloquea `git add`, `git commit` y `git push`, los lance Claude o un subagente, y le pide que dé los comandos a Fernando. Es la regla «Git es de Fernando» hecha código, en todos los proyectos |
| **Comando `/guardrails:arranque`** | Al llegar a un ordenador: rama, si hay que hacer `git pull`, lo último que se hizo y el siguiente paso (de `MEMORY.md`, el plan y la spec activa). No cambia nada |
| **Comando `/guardrails:cierre`** | Antes de irse: pasa las pruebas, actualiza `MEMORY.md` y el plan, resume la sesión y da los comandos de commit y push |
| **Skill `flujo-sdd`** | El flujo Spec-Driven Development con subagentes y dos aprobaciones de Fernando: spec en EARS → revisión → ✋ → plan y tareas → ✋ → una tarea cada vez → validación RF por RF |
| **Agentes `planner`, `implementer` y `reviewer`** | Los subagentes de ese flujo. El planner solo escribe en `specs/`, el implementer hace una tarea y para, y el reviewer solo lee y da un VEREDICTO |
| **Skill `montar-guardarrailes`** | Monta el arnés en un proyecto: `AGENTS.md` corto como única fuente de reglas, `CLAUDE.md` que lo importa, `MEMORY.md` versionado, permisos, hook `pre-push`, pruebas de reglas de contenido y CI |

Plantillas, para copiar en cada proyecto:

| Carpeta | Archivos |
|---|---|
| [skills/montar-guardarrailes/plantillas/](skills/montar-guardarrailes/plantillas/) | `AGENTS.md`, `CLAUDE.md`, `MEMORY.md`, `settings.json` (para `.claude/`), `pre-push` (para `.githooks/`), `test_reglas_de_contenido.py` |
| [skills/flujo-sdd/plantillas/](skills/flujo-sdd/plantillas/) | `spec.md` (EARS), `plan.md`, `tasks.md`, `CONSTITUCION.md` |

## Instalar

El repositorio es privado: el ordenador tiene que poder clonarlo con Git.

```bash
claude plugin marketplace add fernando-delrio/agentic-engineering-guardrails
claude plugin install guardrails@agentic-engineering-guardrails
```

O desde Claude Code: `/plugin marketplace add fernando-delrio/agentic-engineering-guardrails` y `/plugin install guardrails@agentic-engineering-guardrails`. Reinicia Claude Code después.

El hook usa **Node** (`node` en el PATH, versión 22 o posterior).

**Para montarlo en un proyecto:** abre Claude Code en ese repositorio y pide «monta los guardarraíles». La skill revisa lo que ya hay antes de crear nada y no borra reglas sin moverlas antes a `docs/`.

## Actualizar

1. Sube `version` en [.claude-plugin/plugin.json](.claude-plugin/plugin.json).
2. En cada ordenador:
   ```bash
   claude plugin marketplace update agentic-engineering-guardrails
   claude plugin update guardrails@agentic-engineering-guardrails
   ```

Antes de subir, valida y prueba el hook:

```bash
claude plugin validate .
claude plugin validate skills
claude plugin validate agents
printf '%s' '{"tool_input":{"command":"git commit -m x"}}' | node hooks/bloquear-git.js; echo "salida $?"   # tiene que dar 2
printf '%s' '{"tool_input":{"command":"git status"}}' | node hooks/bloquear-git.js; echo "salida $?"       # tiene que dar 0
```

## Estructura

```text
.claude-plugin/        plugin.json y marketplace.json
hooks/                 hooks.json y bloquear-git.js
commands/              arranque.md y cierre.md
agents/                planner.md, implementer.md y reviewer.md
skills/
├── flujo-sdd/             SKILL.md + plantillas/
└── montar-guardarrailes/  SKILL.md + plantillas/
```

## Historia

El repositorio se empezó en septiembre de 2026 y se perdió sin llegar a subirse. Se rehízo el 08/10/2026 a partir del plan de `tools_equip` (`doc/mejora-proyecto-contexto-agentes.md`), de sus agentes SDD y de los guardarraíles de `primer-equipo-ai`. **Si aparece la versión original** (quizá en `F:\dev` del ordenador de casa), compararla con esta antes de tirarla: puede tener piezas que aquí faltan.
