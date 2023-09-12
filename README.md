[![NestJs][nestjs-shield]][ref-nestjs]
[![NodeJs][nodejs-shield]][ref-nodejs]
[![Typescript][typescript-shield]][ref-typescript]
[![SQLite][sqlite-shield]][ref-sqlite]
[![Prisma][prisma-shield]][ref-prisma]
[![JWT][jwt-shield]][ref-jwt]
[![Jest][jest-shield]][ref-jest]
[![Npm][npm-shield]][ref-npm]
[![Git][git-shield]][ref-git]

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

# NestJS Graphql Orders

This is a NestJS v9.x application built to interact with data of orders of an e-commerce with full CRUD functionality.

The project was created for refinement of NestJS and GraphQL knowledge. It also work as a skills showcase.

**THIS IS A WORK IN PROGRESS**

## Build with

| Name       | Version  |
| ---------- | -------- |
| NestJs | v9.x |
| NodeJs | v19.8.x + |
| Typescript | v4.9.x + |
| NPM | v9.5.x + |
| Prisma | v5.x + |
| GraphQL | v12.0.x |

## Objectives

* Use separeted config files to define options of some parts of the application, avoiding direct access to environment variables
* Use GraphQL with **code-first** approach using decorators
* Enable or disable **GraphQL Playground** based on option of config file
* Use SQLite for database type
* Use Prisma for database modelling and migration
* Seed initial data on the database after migration
* Use modular approach to organize logic
* Use Data Transfer Objects (DTOs) to transport groups of data between the application layers and to validate input data
* Reuse DTO for create order on the DTO for update order using PartialType and/or OmitType
* Use **transform** decorator to format dates of entity classes only when they are serialized to JSON
* Use **interceptors** to convert errors to exceptions
* Use concepts of service pattern, with short service classes
* Throw custom errors based on the Prisma exceptions types
* Only allow cancel action on pending orders
* Only allow refund action on paid orders
* Only allow remove action on pending orders
* Use soft delete approach on the remove actions
* Create a module for health check (using GraphQL and **Terminus**)
* Create tests for the application using JEST
* Use fixture classes as mocked data for tests

## Docs

* [Getting Started](./docs/getting_started.md)
* [Database Structure](./docs/database_structure.md)
* [CORS](./docs/cors.md)
* [Prisma](./docs/prisma.md)
* [Prisma Studio](./docs/prisma_studio.md)
* [GraphQL](./docs/graphql.md)
* [Running Tests](./docs/running_tests.md)
* [Available NPM Scripts](./docs/available_npm_scripts.md)

<!-- Badge Shields -->
[nestjs-shield]: https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white
[nodejs-shield]: https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white
[typescript-shield]: https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white
[sqlite-shield]: https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white
[prisma-shield]: https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white
[jwt-shield]: https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens
[jest-shield]: https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white
[npm-shield]: https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white
[git-shield]: https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white

<!-- References -->
[ref-nestjs]: http://nestjs.com
[ref-nodejs]: https://nodejs.org
[ref-typescript]: https://www.typescriptlang.org
[ref-sqlite]: https://www.sqlite.org/index.html
[ref-prisma]: https://www.prisma.io/
[ref-npm]: https://yarnpkg.com
[ref-jwt]: https://jwt.io
[ref-jest]: https://jestjs.io/docs/getting-started
[ref-git]: https://git-scm.com