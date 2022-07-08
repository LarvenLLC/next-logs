import logger from './logger';

export default async function handler(req, res) {
  const {
    method,
    body: {
      message,
      attributes,
    },
    query: { type }
  } = req;

  try {
    switch (method) {
      case 'POST':
        // log
        logger.log(message, attributes, type);
        break;
      default:
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
    // send result
    return res.status(200).send('Success');
  } catch (error) {
    return res.status(500).json(error);
  }
}
