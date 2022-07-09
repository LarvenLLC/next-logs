var fs = require('fs')

export default class Reader {
  constructor(dir, logFiles) {
    this.dir = dir
    this.logFiles = logFiles
  }

  readFile() {
    if (!fs || !('createReadStream' in fs)) {
      return {}
    }
    // create logs directory if it doesn't exist
    if (!fs.existsSync(this.dir)) {
      fs.mkdirSync(this.dir)
    }
    const object = {}
    Object.entries(this.logFiles).forEach(
      // This line opens the file as a readable stream
      ([key, value]) => (object[key] = fs.createReadStream(value))
    )
    return object
  }

  // reads logs in .log files
  read(type = 'console') {
    // This line opens the file as a readable stream
    return this.readFile()[type]
  }

  reader = {
    read: this.read,
    console: () => this.read('console'),
    info: () => this.read('info'),
    debug: () => this.read('debug'),
    warn: () => this.read('warn'),
    error: () => this.read('error')
  }
}
