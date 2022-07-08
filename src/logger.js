import format from './format'
var fs = require('fs')

const logFiles = {
  console: 'logs/console.log',
  info: 'logs/info.log',
  debug: 'logs/debug.log',
  warn: 'logs/warn.log',
  error: 'logs/error.log'
}

const Logger = {
  console: new console.Console(
    fs.createWriteStream(logFiles.console, {
      flags: 'a' // 'a' means appending (old data will be preserved)
    })
  ),
  info: new console.Console(
    fs.createWriteStream(logFiles.info, {
      flags: 'a' // 'a' means appending (old data will be preserved)
    })
  ),
  debug: new console.Console(
    fs.createWriteStream(logFiles.debug, {
      flags: 'a' // 'a' means appending (old data will be preserved)
    })
  ),
  warn: new console.Console(
    fs.createWriteStream(logFiles.warn, {
      flags: 'a' // 'a' means appending (old data will be preserved)
    })
  ),
  error: new console.Console(
    fs.createWriteStream(logFiles.error, {
      flags: 'a' // 'a' means appending (old data will be preserved)
    })
  )
}

// logs in .log file for simplicity
function log(message = '', attributes = {}, type = 'info') {
  const msg = format(message, type)
  Logger.console.log(msg, attributes)
  Logger[type].log(msg, attributes)
}

const logger = {
  log,
  info: (message = '', attributes = {}) => log(message, attributes, 'info'),
  debug: (message = '', attributes = {}) => log(message, attributes, 'debug'),
  warn: (message = '', attributes = {}) => log(message, attributes, 'warn'),
  error: (message = '', attributes = {}) => log(message, attributes, 'error')
}
export default logger
