# AGENTS.md — <Nombre del proyecto>

<!-- Plantilla del plugin guardrails. Entre 40 y 80 líneas: es la entrada que lee cualquier
agente (Claude Code vía CLAUDE.md, Codex, OpenCode, Cursor…). El detalle va en docs/ y aquí
solo se dice cuándo leerlo. Si algo se vuelve regla fija en MEMORY.md, se sube aquí. -->

## Qué es
<Una o dos frases: qué hace el proyecto y para quién.>

## Stack y estructura
- Backend: <…> en `backend/` (rutas → servicios → modelos; `intentar.py` recoge los errores).
- Frontend: <…> en `frontend/src/modules/<funcionalidad>/` (components, hooks, services, lib).
- Base de datos: <…>; migraciones en `<ruta>`, una nueva por cambio y nunca se edita una aplicada.

## Comandos
- Arrancar todo: `<npm run dev>`
- Pruebas: `<comando>`
- Lint y formato: `<comando>`
- Norma de estilo: `<comando>`

## Fundamentos (se aplican a todo el código)
- Norma de Fernando: plugin `fernando-stack`, skill `estilo-codigo` (arrow functions, `const`, sin `else`/`switch`/`match`, errores solo en `intentar`, 20 líneas, 3 parámetros).
- Ousterhout: módulos profundos con interfaz simple; nombres que se explican solos.
- SOLID + SOC: un módulo, una razón para cambiar.
- DRY · KISS · YAGNI · LOD.
- Coplien: «¿lo pondría delante del cliente ahora mismo, sin avisar de nada?».

## Reglas del dominio y trampas
- <La regla de negocio que más daño hace si se rompe, y qué prueba la vigila.>
- <Lo que ya se rompió una vez (del registro de errores) y cómo evitarlo.>

## Forma de trabajar
- Plan: `<docs/…/PLAN.md>`; cada cosa hecha o comprobada se marca con `[x]` y la fecha.
- Decisiones y su porqué: `<docs/…/BITACORA.md>`. Estado y siguiente paso: `MEMORY.md`.
- Funcionalidad nueva con lógica o datos: flujo SDD (skill `flujo-sdd`), con spec aprobada antes de programar.
- Ramas `feature/`, `fix/`, `docs/`, `refactor/` en castellano; nunca `claude/` ni `codex/`.

## Límites
- ✅ Sin preguntar: leer, buscar, pasar pruebas y lint, editar código dentro de la tarea pedida.
- ⚠️ Preguntar antes: añadir dependencias, cambiar el esquema, tocar la CI, borrar archivos, tocar servicios externos (cuentas, webhooks, datos reales).
- 🚫 Nunca: `git add`, `commit` ni `push` (Git es de Fernando y un hook lo bloquea); secretos o datos personales en el repositorio; editar una migración aplicada.

## Verificación
- Nada se da por hecho sin pasar pruebas, lint y formato, y enseñar su salida real.
- Cambios visuales: abrir la página con el MCP del navegador, revisar la consola y la vista de 375 px.

## Lee esto cuando toques…
- <Textos visibles> → `<docs/…/REGLAS_CONTENIDO.md>`
- <El webhook / la integración X> → `<docs/…>`
- <Producción> → `<docs/…>`
