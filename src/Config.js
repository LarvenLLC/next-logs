export default class Config {
  constructor(settings = {}) {
    const { dir = '' } = settings

    this.dir = dir
    this.logFiles = {
      console: `${dir}/console.log`,
      info: `${dir}/info.log`,
      debug: `${dir}/debug.log`,
      warn: `${dir}/warn.log`,
      error: `${dir}/error.log`
    }
  }

  setDir(dir) {
    this.dir = dir
    this.updateLogFiles()
  }

  updateLogFiles() {
    const dir = this.dir
    this.logFiles = {
      console: `${dir}/console.log`,
      info: `${dir}/info.log`,
      debug: `${dir}/debug.log`,
      warn: `${dir}/warn.log`,
      error: `${dir}/error.log`
    }
  }
}
