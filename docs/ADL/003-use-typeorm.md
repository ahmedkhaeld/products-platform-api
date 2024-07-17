# 3. Use TypeORM as the Access Layer to the Database

Date: 17/07/2024

## Status
Accepted

## Context
We need a robust and efficient way to manage database operations and entity relationships within our application. An ORM (Object-Relational Mapping) tool can help abstract database interactions and simplify development. TypeORM is a popular choice in the Node.js ecosystem, especially with frameworks like NestJS.

## Decision
Use TypeORM as the access layer to the database for the following reasons:
- It provides ORM capabilities, allowing us to define and manage entity relationships easily.
- It supports database migrations, which are essential for maintaining schema consistency across different environments and deployments.
- It integrates well with NestJS, our chosen framework, providing decorators and other utilities that fit seamlessly into our application's structure.

## Consequences
- **Easier Database Management**: TypeORM simplifies database operations through high-level abstractions, reducing the need for direct SQL queries.
- **Consistent Schema Changes**: Migrations ensure that database schema changes are applied consistently, preventing issues related to versioning and discrepancies across environments.
- **Developer Productivity**: By reducing boilerplate code and providing a structured way to define and interact with the database, TypeORM can improve developer productivity and reduce the likelihood of errors.
- **Learning Curve**: Team members unfamiliar with TypeORM or ORMs in general may need time to learn and adapt to its usage.
- **Dependency Management**: Adding TypeORM introduces a dependency that needs to be managed and kept up-to-date.

All decisions will be kept in the /docs/ADL directory.
