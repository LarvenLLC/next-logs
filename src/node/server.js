import Config from '../Config'
import Logger from '../Logger'
import { defaultSettings } from '../helper'

function loggerAPI() {
  const { dir } = defaultSettings

  const config = new Config()
  config.setDir(dir)

  const logger = new Logger(config.dir, config.logFiles)

  return logger.logger
}

export default loggerAPI()
