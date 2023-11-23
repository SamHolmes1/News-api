# News-APi

A news api that uses express and postgresql.

## Setup

Make sure to run `npm install` to download all dependencies. A list of dependendencies can be found in package.json

### .ENV files

After setup, you'll want to create three files;

```bash
touch .env.development .env.test .env.production
```

Inside of each you want to set the environment variable PGDATABASE to your development, test and production databases respectivley

### Log files

It's important that you create a logfiles folder for the express middleware to write to. This feature can be disabled by simply commenting out the middleware from the top of app.js

## Endpoints

A list of all endpoints can be found in endpoints.json.Or alternatively, you can make a GET request to /api to localhost:PORT to recieve an object containing all endpoints.
