## Getting Started

### Install

#### Dependencies

For start, clone the repository to your local/development environment. After that, run the following script:

`npm install`

This script will install the dependencies.

#### Prisma Client

**Prisma Client JS** is a type-safe database client auto-generated based on the data model. You have to generate the Prisma Client JS using the following script:

`npm run prisma:generate`

**Note:** Every time that you update the **schema.prisma** is required to re-generate the Prisma Client JS.

#### Creating database structure

To create the database structure, you have to use the following script:

```shell
npm run prisma:migrate:dev
```

#### Seeding data

To seed data to your database, you have to use the following script:

`npm run prisma:seed`

### Starting the application

If you want to start the application on a development environment, use the following script:

`npm run start:dev`

This script will start the application server. After that, the application is ready to use on the following url:

```shell
http://localhost:3000/api/v1
```

**Note:** The port, the global prefix and the default version used on the application can be changed using the following environment variables:

```
APP_PORT
API_GLOBAL_PREFIX
API_DEFAULT_VERSION
```

### Shutting down the application

If you want to stop the application, use the following key combination on the terminal:

`ctrl + c`

This will stop the application server.