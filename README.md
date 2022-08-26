
## Description

A simple reservation check in and check out API with guest overdue calculate.

## Live API URL
[https://booka-vet9b.ondigitalocean.app/](https://booka-vet9b.ondigitalocean.app/)

## Tech Stack
Nodejs\
TypeScript\
MySQL\
TypeORM

## Installation

Clone the repo:

```bash
git clone https://github.com/evidenze/booka.git
cd booka
```

```bash
$ npm install
```

Set the environment variables:

```bash
cp .env.example .env

# open .env and modify the environment variables (if needed)
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

### API Endpoints

List of available routes:

**Auth routes**:\
`POST /customers` - create new customer\
`POST /check-in` - create new reservation (Check in)\
`POST /check-out` - Check out reservation and return overdue amount