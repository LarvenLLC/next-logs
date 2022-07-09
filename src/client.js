// Client-side logging API
async function log(message, attributes, type = 'info') {
  const response = await fetch(`/api/logger/${type}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ message, attributes })
  })
  return await response.json()
}

const clientLog = {
  log,
  info: (message = '', attributes = {}) => log(message, attributes, 'info'),
  debug: (message = '', attributes = {}) => log(message, attributes, 'debug'),
  warn: (message = '', attributes = {}) => log(message, attributes, 'warn'),
  error: (message = '', attributes = {}) => log(message, attributes, 'error')
}
export default clientLog

// Client-side log reading API
async function read(type = 'console') {
  const response = await fetch(`/api/logger/${type}`, {
    method: 'GET'
  })
  return await response.text()
}

const clientRead = {
  read,
  info: () => read('info'),
  debug: () => read('debug'),
  warn: () => read('warn'),
  error: () => read('error')
}
export { clientRead }
