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

![Logs Screenshot](/Screenshot.png)

## Usage

### 1. Add API
```jsx
// /pages/api/logger/[log].js
import {NextLogs} from "next-logs";

export default NextLogs;
```

### 1. Client Side
```jsx
// /pages/*.js
import log from "next-logs";

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

### 1. Server Side
```jsx
// /pages/api/auth.js || /middleware.js
import {logger} from "next-logs";

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

## logger (server) and log (client) API

| Methods            |                  Explanation                                                                          |
| ------------------ | :---------------------------------------------------------------------------------------------------: |
| info               |                     logs the information your program is working as expected.                         |
| debug              | used to find the reason in case your program is not working as expected or an exception has occurred. |
| warn               |                   situations that are unexpected, but the code can continue the work                  |
| error              |                                           Error/failure logs                                          |

## License

MIT © [BossBele](https://github.com/BossBele)
