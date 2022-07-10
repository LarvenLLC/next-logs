import config from './Config'
import Logger from './Logger'
import Reader from './Reader'

const defaultSettings = {
  dir: '/tmp'
}

export { config }

export default function API(settings = defaultSettings) {
  const { dir } = settings

  config.setDir(dir)
  const logger = new Logger(config.dir, config.logFiles)
  const reader = new Reader(config.dir, config.logFiles)
  return async function handler(req, res) {
    const {
      method,
      body: { message = '', attributes = {} },
      query: { log = 'info' }
    } = req

    try {
      switch (method) {
        case 'GET': {
          // get logs
          // This line opens the file as a readable stream
          const readStream = reader.read(log)

          // This will wait until we know the readable stream is actually valid before piping
          readStream.on('open', function () {
            // This just pipes the read stream to the response object (which goes to the client)
            readStream.pipe(res)
          })

          // This catches any errors that happen while creating the readable stream (usually invalid names)
          readStream.on('error', function (err) {
            res.end(err)
          })
          return
        }
        case 'POST':
          // log
          logger.log(message, attributes, log)
          break
        default:
          res.setHeader('Allow', ['GET', 'POST'])
          res.status(405).end(`Method ${method} Not Allowed`)
      }
      // send result
      return res.status(200).json({ message: 'Success' })
    } catch (error) {
      return res.status(500).json(error)
    }
  }
}
