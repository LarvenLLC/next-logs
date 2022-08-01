import format from './format'

var fs = require('fs')

export default class Logger {
  constructor(dir, logFiles) {
    this.dir = dir
    this.logFiles = logFiles
  }

  logFile() {
    if (!fs || !('createWriteStream' in fs) || !this.dir) {
      return {}
    }
    // create logs directory if it doesn't exist
    if (!fs.existsSync(this.dir)) {
      fs.mkdirSync(this.dir)
    }
    return {
      console: new console.Console(
        fs.createWriteStream(this.logFiles.console, {
          flags: 'a' // 'a' means appending (old data will be preserved)
        })
      ),
      info: new console.Console(
        fs.createWriteStream(this.logFiles.info, {
          flags: 'a' // 'a' means appending (old data will be preserved)
        })
      ),
      debug: new console.Console(
        fs.createWriteStream(this.logFiles.debug, {
          flags: 'a' // 'a' means appending (old data will be preserved)
        })
      ),
      warn: new console.Console(
        fs.createWriteStream(this.logFiles.warn, {
          flags: 'a' // 'a' means appending (old data will be preserved)
        })
      ),
      error: new console.Console(
        fs.createWriteStream(this.logFiles.error, {
          flags: 'a' // 'a' means appending (old data will be preserved)
        })
      )
    }
  }

  // logs in .log file for simplicity
  log(message = '', attributes = {}, type = 'info') {
    const msg = format(message, type)
    if (!this.dir) {
      return
    }
    this.logFile().console.log(msg, attributes)
    this.logFile()[type].log(msg, attributes)
  }

  logger = {
    log: this.log,
    info: (message = '', attributes = {}) =>
      this.log(message, attributes, 'info'),
    debug: (message = '', attributes = {}) =>
      this.log(message, attributes, 'debug'),
    warn: (message = '', attributes = {}) =>
      this.log(message, attributes, 'warn'),
    error: (message = '', attributes = {}) =>
      this.log(message, attributes, 'error')
  }
}

// logs in .log file for simplicity
// function log(message = '', attributes = {}, type = 'info') {
//   const msg = format(message, type)
//   Logger().console.log(msg, attributes)
//   Logger()[type].log(msg, attributes)
// }

// const logger = {
//   log,
//   info: (message = '', attributes = {}) => log(message, attributes, 'info'),
//   debug: (message = '', attributes = {}) => log(message, attributes, 'debug'),
//   warn: (message = '', attributes = {}) => log(message, attributes, 'warn'),
//   error: (message = '', attributes = {}) => log(message, attributes, 'error')
// }
// export default logger
