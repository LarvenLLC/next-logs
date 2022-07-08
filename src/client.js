async function log(message, attributes, type) {
  const response = await fetch(`/api/logger/${type}`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({message, attributes})
  });
  return await response.json();
}

const client = {
  log,
  info: (message = '', attributes = {}) => log(message, attributes, 'info'),
  debug: (message = '', attributes = {}) => log(message, attributes, 'debug'),
  warn: (message = '', attributes = {}) => log(message, attributes, 'warn'),
  error: (message = '', attributes = {}) => log(message, attributes, 'error'),
};
export default client;
