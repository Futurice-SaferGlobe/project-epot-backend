# Project EPOT Backend

> Backend for Project EPOT

## Development

### Prerequirements

Node.js for server app, Docker for running ArangoDB in a container.

- Node `^8.9.0`
- Docker `^18.06.0-ce`

> ## Make sure to follow the [database setup instructions](#database) if you're running the app for the first time.

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

Next, we need to create a database and an `operations` collection.

```bash
$ yarn run bootstrap database \
--username root \
--password root \
--database epot \
--collection operations
```

We'll also populate the collection we just created.

```bash
$ yarn run bootstrap operations ./operations.json \
--username root \
--password root \
--database epot \
--collection operations
```

That's it! Now just run `yarn run dev` to start the server.
