# Project EPOT Backend

> Backend for Project EPOT

## Development

### Prerequirements

Node.js for server app, Docker for running ArangoDB in a container.

- Node `^8.9.0`
- Docker `^18.06.0-ce`
- Docker Compose `1.22.0`

> ### Make sure to follow the [database setup instructions](#database) if you're running the app for the first time.

### Scripts

```bash
# Start webpack in development mode with nodemon.
yarn run dev

# Build production ready code.
yarn run build

# Remove `/dist/` directory.
yarn run clean

# Starts the arangodb docker container
yarn run start:db

# `preinstall` script makes sure that the user installs dependencies using yarn.
```

## Database

### Enviroment file

Make an enviroment file called `.env` and fill out the fields as is shown in the `.env.example` file.

```
DB_URL=http://127.0.0.1:8529
DB_NAME=epot
DB_USER=root
DB_PASS=root
```

You'll obviously need to use different credentials in a production enviroment.

### Starting ArangoDB

Before the server app works, you need to start the arangodb docker container.

```bash
# docker-compose up -d
$ yarn run start:db

$ docker ps | grep epot-arangodb
```

If all went well, you should see a message that looks something like this.

```
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                    NAMES
f451fd549c97        arangodb/arangodb   "/entrypoint.sh aran…"   5 minutes ago       Up 5 minutes        0.0.0.0:8529->8529/tcp   epot-arangodb
```

### Creating a databse and collections

#### Quickstart

Next, we need to create a database and `operations`, `connection` collections.

You can create database with collections and populate needed data with one command if you have made the environment file and configured it properly.

```bash
$ yarn run bootstrap quickstart
```

#### Manual database population

For those that prefer doing everything manually.

```bash
$ yarn run bootstrap database \
--username root \
--password root \
--database epot \
--collection operations

$ yarn run bootstrap database \
--username root \
--password root \
--database epot \
--collection connections
```

We'll also populate the collections we just created.

```bash
$ yarn run bootstrap operations ./__mock__/operations.json \
--username root \
--password root \
--database epot \
--collection operations

$ yarn run bootstrap operations ./__mock__/connections.json \
--username root \
--password root \
--database epot \
--collection connections
```

#### Validating documents

If you wish to validate your files.

```bash
$ yarn run bootstrap validate
```

That's it! Now just run `yarn run dev` to start the server.

## GraphQL

In addition to the good ol' REST API, the backend also has a [GraphQL](https://graphql.org/) endpoint.

You can query operations through a [GraphQL Playground](https://www.apollographql.com/docs/apollo-server/features/graphql-playground.html) to familiarize yourself with this awesome query language. Just start the development server and navigate to <http://localhost:8080/graphql>

Here's a simple query to get you started:

```graphql
query {
  operation(id: "unamid") {
    name
    area
    headers(index: 1) {
      title
      index
      subheaders(index: 1) {
        index
        content
      }
    }
  }
}
```
