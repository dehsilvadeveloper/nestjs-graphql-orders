# Prisma

## Using Prisma for development

### Install the CLI

To install the Prisma CLI on your development environment use the following script:

```shell
npm install prisma -D
```

To check the version of the installed Prisma use the following script:

```shell
npx prisma version
```

### Install the Client

To install the Prisma Client on your development environment use the following script:

```shell
npm install @prisma/client -D
```

### Defining the Prisma Data Model

Now we can initialize Prisma models for the project with the script:

```shell
npx prisma init --datasource-provider SQLite
```

The flag *datasource-provider* indicates the type of database that will be used in the project.

The script will create:

- A *prisma* folder containing the *schema.prisma* file. In this file we can implement the models of the application.
- A *.env* file, if does not already exists. This file is required to contain configurations to connect to the database.
  
After this edit the *prisma/schema.prisma* file to guarantee that it has the correct environment variables to connect to the database.

### Creating the models

To define the models of the application, edit the *prisma/schema.prisma* file. Next is a example of a model:

```js
model Post {
  id         Int        @id @default(autoincrement())
  createdAt  DateTime   @default(now())
  updatedAt  DateTime   @updatedAt
  title      String
  published  Boolean    @default(false)
  author     User       @relation(fields: [authorId], references: [id])
  authorId   Int
  categories Category[]
}
```

All the models have to be defined on the *prisma/schema.prisma* file.

### Creating the migrations

Database **migrations** are a controlled set of changes that modify and evolve the structure of your database schema. Migrations help you transition your database schema from one state to another. For example, within a migration you can create or remove tables and columns, split fields in a table, or add types and constraints to your database.

To create a new migration use:

```shell
npm run prisma:migrate:dev:create
```

To run the migrations and apply the changes use:

```shell
npm run prisma:migrate:dev
```
