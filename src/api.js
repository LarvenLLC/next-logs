import logger from './logger'

export default async function handler(req, res) {
  const {
    method,
    body: { message = '', attributes = {} },
    query: { log = 'info' }
  } = req

  try {
    switch (method) {
      case 'POST':
        // log
        logger.log(message, attributes, log)
        break
      default:
        res.setHeader('Allow', ['POST'])
        res.status(405).end(`Method ${method} Not Allowed`)
    }
    // send result
    return res.status(200).json({ message: 'Success' })
  } catch (error) {
    return res.status(500).json(error)
  }
}
