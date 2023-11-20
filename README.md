# News-APi

A news api that uses express and postgresql.

## Setup

Make sure to run `npm install` to download all dependencies. A list of dependendencies can be found in package.json

### .ENV files

After setup, you'll want to create two files;

```bash
touch .env.development .env.test
```

Inside of each you want to set the environment variable PGDATABASE to your development and test databases respectivley

### Log files

It's important that you create a logfiles folder for the express middleware to write to. This feature can be disabled by simply commenting out the middleware from the top of app.js