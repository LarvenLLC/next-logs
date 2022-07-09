import Logger from './Logger'
import NextLogs, { config } from './api'
import log from './client'

module.exports = log
module.exports.logger = new Logger(config.dir, config.logFiles).logger
module.exports.NextLogs = NextLogs
// export { logger, NextLogs, log }
