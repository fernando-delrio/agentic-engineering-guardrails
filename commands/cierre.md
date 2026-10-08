---
description: Antes de irse de un ordenador, actualiza MEMORY.md y el plan, resume la sesión y da a Fernando los comandos de commit y push (no los ejecuta).
disable-model-invocation: true
argument-hint: "[nota opcional sobre cómo se queda]"
---

# /cierre — dejarlo todo listo para seguir en otro sitio

Fernando se va de este ordenador. **Lo que no esté en GitHub no estará en el otro.** Nota que añade: $ARGUMENTS

## Qué hacer

1. **Revisa qué ha cambiado:** `git status --short`, `git diff --stat` y, si la rama no existe en el remoto, dilo.
2. **Comprueba que no se sube nada roto:** pasa las pruebas, el lint y el formato que afecten a lo cambiado (los comandos están en `AGENTS.md`). Si algo falla, dilo claramente y pregunta si se sube igual a una rama de trabajo o se arregla antes.
3. **Actualiza `MEMORY.md`** (50 líneas como máximo; si no existe, créalo con la plantilla de la skill `montar-guardarrailes`):
   - estado actual en 3–5 líneas;
   - decisiones de hoy, con su porqué (las importantes van también a la bitácora si el proyecto tiene una);
   - el **siguiente paso concreto**, con el archivo;
   - lo que queda bloqueado y de quién depende.

   Lo que se haya convertido en regla fija se mueve a `AGENTS.md` y se quita de `MEMORY.md`.
4. **Marca en el plan** lo hecho y lo comprobado hoy, con `[x]` y la fecha (DD/MM/AAAA). Si solo está programado y no probado, dilo en la línea.
5. **Revisa que no se suba nada que no debe:** ni `.env`, ni credenciales, ni datos personales, ni archivos grandes generados.

## Qué responder

1. **Resumen de la sesión:** qué se hizo, qué se comprobó y qué queda.
2. **Los comandos para que los ejecute Fernando** (nunca los ejecutas tú), con los archivos concretos o `-A` si todo debe ir:
   ```bash
   git add …
   git commit -m "tipo: mensaje en castellano"
   git push -u origin <rama>
   ```
   Si hace falta abrir un PR, dilo y di hacia qué rama.
3. Recordatorio final: «Comprueba en GitHub que el último commit está subido antes de irte».
