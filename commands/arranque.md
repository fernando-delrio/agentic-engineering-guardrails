---
description: Al llegar a un ordenador, dice dónde está el proyecto y cuál es el siguiente paso (git, MEMORY.md, plan y spec activa). No cambia nada.
disable-model-invocation: true
allowed-tools: Read, Grep, Glob, Bash(git status:*), Bash(git branch:*), Bash(git log:*), Bash(git fetch:*), Bash(git worktree list:*), Bash(git stash list:*)
---

# /arranque — ponerse al día al llegar

Fernando acaba de sentarse en un ordenador (casa u oficina) y quiere saber dónde está y qué toca. **Solo lees: no editas nada ni ejecutas nada que cambie el repositorio.**

## Qué hacer

1. **Git:**
   - `git fetch` y `git status -sb`: rama actual, si va por delante o por detrás del remoto y si hay cambios sin subir;
   - `git worktree list` y `git stash list`: si hay trabajo en otras carpetas o guardado aparte;
   - `git log --oneline -5`.
2. **Memoria del proyecto:** `MEMORY.md` en la raíz. Si no existe, el relevo o el plan del proyecto (`docs/**/RELEVO.md`, `docs/**/PLAN.md`, `HANDOFF.md`).
3. **Plan:** la primera tarea sin marcar del plan, o la que `MEMORY.md` diga como siguiente paso.
4. **Spec activa:** en `specs/`, la carpeta más reciente cuyo `tasks.md` tenga tareas sin marcar (y en qué estado está la spec).

## Qué responder

En este orden, breve y en castellano:

1. **Dónde estás:** rama y estado respecto al remoto. Si va **por detrás**, avisa de que hay que hacer `git pull` antes de tocar nada y dale el comando. Si hay cambios sin subir de otro día, dilo primero.
2. **Lo último que se hizo,** según `MEMORY.md` y los commits.
3. **Lo siguiente,** con el archivo y el paso concreto (por ejemplo: «tarea 3 de `specs/004-avisos/tasks.md`»).
4. **Lo que está bloqueado** y de quién depende, si lo hay.

Termina con una pregunta corta: «¿Seguimos con eso?».
