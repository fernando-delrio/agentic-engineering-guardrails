# Plan — SPEC-NNN Nombre

Parte de la spec aprobada el DD/MM/AAAA.

## Qué cambia

| Capa | Archivo | Cambio | RF |
|---|---|---|---|
| Base de datos | `migrations/00X_….sql` | … | RF-01 |
| Backend | `services/….py` | … | RF-02 |
| Frontend | `modules/…/hooks/use….ts` | … | RF-03 |

## Decisiones

| Decisión | Alternativa descartada | Por qué |
|---|---|---|
| … | … | … |

## Pruebas

- Backend: … (camino feliz y de error de cada RF).
- Frontend: el hook `use…` con Vitest y MSW.
- Manual: … (si hay algo que solo se ve en el navegador o con un servicio real).

## Migración y vuelta atrás

Si cambia el esquema: migración nueva (nunca se edita una aplicada) y cómo se vuelve atrás.

## Riesgos

- …
