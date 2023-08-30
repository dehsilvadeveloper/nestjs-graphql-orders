<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

# NestJS Graphql Orders  🔥 🚀

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
* Seed initial data on the database
* Use modular approach to organize logic
* Use Data Transfer Objects (DTOs) to transport groups of data between the application layers and to validate input data
* Reuse DTO for create order on the DTO for update order using PartialType and OmitType
* Use **transform** decorator to format dates of entity classes only when they are serialized to JSON
* Use **interceptors** to convert errors to exceptions
* Use concepts of service pattern, with short service classes
* Throw custom errors based on the Prisma exceptions types
* Create tests for the application using JEST

## Docs

* [Getting Started](./docs/getting_started.md)
* [CORS](./docs/cors.md)
* [Prisma](./docs/prisma.md)
* [GraphQL](./docs/graphql.md)
* [Available NPM Scripts](./docs/available_npm_scripts.md)
