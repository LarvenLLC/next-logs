# next-logs

> lightning fast, local server and client side logger for NextJS, NodeJS and JS Applications and Servers.

[![NPM](https://img.shields.io/npm/v/next-logs.svg)](https://www.npmjs.com/package/next-logs) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save next-logs
```

Or

```bash
yarn add next-logs
```

### Logs are written under `/tmp/` in the project directory:

![Logs Screenshot](/Screenshot.png)

## Usage - Logging

### 1. Add API in `/pages/api/logger/[log].js`
```jsx
// /pages/api/logger/[log].js
import NextLogs from "next-logs";

export default NextLogs();
```

### 2. Client Side
The client side API uses API routes hence it works in both: client and server side.

```jsx
// /pages/*.js
import log from "next-logs/react";

export default Page() {
  useEffect(() => {
    log.info("Created our super logger!", {
      name: "next-logs"
    });
    log.debug("Created our super logger!", {
      name: "next-logs"
    });
    log.warn("Created our super logger!", {
      name: "next-logs"
    });
    log.error("Created our super logger!", {
      name: "next-logs"
    });
  },[]);

  return (
    <div />
  )
};
```

### 3. Server Side
Next logs ships with a server side API that makes logging more efficient.

```jsx
// /pages/api/auth.js || /middleware.js
import logger from "next-logs/node";

async function handler(req, res) {
  const { method } = req;

  logger.info("Deleting user with attributes:", {
    id: '1'
  });

  logger.debug("Deleting user with attributes:", {
    id: '1'
  });

  logger.warn("Deleting user with attributes:", {
    id: '1'
  });

  logger.error("Deleting user with attributes:", {
    id: '1'
  });

  try {
    switch (method) {
      case 'DELETE':
        // delete user
        break;
      default:
        res.setHeader('Allow', ['DELETE']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
    // send result
    return res.status(200).json({});
  } catch (error) {
    return res.status(500).json(error);
  }
}
```

## Monitoring & Debugging
You can view logs by type through your `domain/api/logger/{type}`. Type of logs include `info`, `debug`, `warn` and `error`.
You can also build your own log viewers through the same API that returns log text. A next-logs logs dashboard is currently in development.

## Logs directory/location
By default, logs are saved in the `/tmp` directory. Because Vercel and most systems allow saving files under `/tmp` directory; hence prevents conflicts that may lead to failures.

This configuration can be edited using the `LOGGER_DIR` environment variable:
##### logs will be saved in the `./logs` directory
```
LOGGER_DIR=logs
```
When self-hosting a NextJS project, it is advised to change the logs location from the default `'tmp'` for better control of logs.

## NextJS Middleware
While using nextJS middleware in API routes, make sure that your middleware does not block requests at `/api/logger/` routes. This may lead to errors and malfunctioning while using `next-logs`.

## logger (server) and log (client) API

| Methods            |                  Explanation                                                                          |
| ------------------ | :---------------------------------------------------------------------------------------------------: |
| info               |                     logs the information your program is working as expected.                         |
| debug              | used to find the reason in case your program is not working as expected or an exception has occurred. |
| warn               |                   situations that are unexpected, but the code can continue the work                  |
| error              |                                           Error/failure logs                                          |

## License

MIT © [BossBele](https://github.com/BossBele)
