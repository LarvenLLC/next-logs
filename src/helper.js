export function format(message, type) {
  const date = new Date()
  const timestamp = `[${
    date.toISOString().split('T')[0]
  } ${date.toLocaleTimeString()}]`
  const msg = `${timestamp} LOGGER.${type.toUpperCase()}: ${message}`

  return msg
}

const defaultSettings = {
  dir: process?.env?.LOGGER_DIR ?? '/tmp'
}

export { defaultSettings }
