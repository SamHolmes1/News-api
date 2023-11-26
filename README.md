# News-APi

A news api that uses express and postgresql. It serves articles, users and comments from a psql database.

A live version can be accessed here: https://news-api-ej82.onrender.com/

## Setup

This api has been tested on: \
Ubuntu 20.04 \
Postgresql 12.16 \
Node 18.18

1. First clone down the repo

```bash
git clone https://github.com/SamHolmes1/News-api
```

2. Install dependencies to your new local repo

```bash
cd News-api/

npm install
```

3. Setup the local databases

```bash
npm run setup-dbs

npm run seed #Populate the production database
```

4. Run tests

```bash
npm run test # This will populate the test database, see app.test.js
```

### .ENV files

After setup, you'll want to create three files;

```bash
touch .env.development .env.test .env.production
```

Inside of each you want to set the environment variable PGDATABASE to your development, test and production databases respectivley

## Endpoints

A list of all endpoints can be found in endpoints.json.Or alternatively, you can make a GET request to /api to localhost:PORT to recieve an object containing all endpoints.
