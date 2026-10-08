// Hook PreToolUse del plugin guardrails: Git es de Fernando.
// Por qué un hook y no una frase en CLAUDE.md: una frase se puede olvidar o saltar; esto se
// ejecuta antes de cada comando de Bash o PowerShell, lo lance Claude o cualquier subagente,
// y bloquea git add, git commit y git push. El agente prepara los cambios y da los comandos.

// git, opciones globales opcionales (-C ruta, -c clave=valor, --no-pager…) y la orden.
const ORDEN_DE_GIT_RESERVADA =
  /\bgit\b(?:\s+-[Cc]\s+\S+|\s+--?[\w-]+(?:=\S+)?)*\s+(add|commit|push)\b/

// Código de salida con el que Claude Code no ejecuta el comando y le enseña el motivo al agente.
const NO_EJECUTAR = 2

// Único sitio de este archivo que recoge errores (regla 17 de la norma de Fernando).
const intentarSinEsperar = (funcion) => {
  try {
    return { valor: funcion(), error: null }
  } catch (fallo) {
    return { valor: null, error: fallo }
  }
}

const leerEntrada = async () =>
  Buffer.concat(await Array.fromAsync(process.stdin)).toString('utf8')

const comandoDe = (entrada) => entrada?.tool_input?.command ?? ''

const explicacion = (orden) =>
  [
    `Bloqueado por el plugin guardrails: \`git ${orden}\` lo ejecuta solo Fernando.`,
    'Deja los cambios preparados y dale los comandos (git add, git commit -m "…", git push)',
    'para que los lance él. No intentes saltarte este bloqueo con otra forma de llamar a git.',
  ].join('\n')

const revisarComando = async () => {
  const texto = await leerEntrada()
  // Si la entrada no es JSON no hay comando que revisar: no se bloquea nada.
  const { valor: entrada, error } = intentarSinEsperar(() => JSON.parse(texto))
  if (error) return
  const coincidencia = comandoDe(entrada).match(ORDEN_DE_GIT_RESERVADA)
  if (!coincidencia) return
  process.stderr.write(explicacion(coincidencia[1]) + '\n')
  process.exitCode = NO_EJECUTAR
}

revisarComando()
