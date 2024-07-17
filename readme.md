# Products Platform API

## Installation

### Requirements

- nodejs installed
- npm installed
- Docker installed

### Steps

#### Project Setup

- `npm i -g @nestjs/cli`
- `nest new products-platform-api`

#### Database setup
base on the `docker-compose.yml` file
- run `docker compose up -d`

#### Run The App

- `npm install`
- `npm run start:dev`


### Environment Variables

```
APP=products-api
PORT=3000
NODE_ENV=dev
PG_HOST=localhost
PG_PORT=5432
PG_USER=user
PG_PASS=password
PG_NAME=products-platform

```