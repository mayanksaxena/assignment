## ORDERS API PROJECT

By Using this app one can create, list and update orders.

### Installation 
``` 
npm install
npm start
```
## How to Install & Run with docker

1.  Clone the repo
2.  Set Google Distance API key in docker-compose file line no. 25 i.e. MAP_KEY
3.  Run `./start.sh` to start the containers and run test cases
    You may need to grant executable permission to 'start.sh' file
    On Ubuntu: sudo chmod +x start.sh
    after installation it will start two containers:
    - the MySQL database container
    - the Node.js app container
4.  After starting container , testcases will run automatically

## Manually Starting the docker and test Cases

1. You can run `docker-compose up` from terminal
2. Server is accessible at `http://localhost:8080`
3. Run manual testcase suite by `npm run test` and it will run unit tests and integration tests

## How to Run Tests (Explicity from cli)

 You should be able to run `npm install` followed by `npm run test` to run unit and integration tests (assuming you have the 10.x version of Node installed on your machine).

## App Structure

**./test**

- this folder contains both unit and integration tests [Mocha]

**./**

- `controllers` are route handlers that have `request` and `h` parameters.
- `helpers` are raw JS " utility functions for use across the app
- `models` are [MySql schema] definitions and associated models
- `routes` are RESTful route declarations using [hapi server module]
- `migrations` are [knex] files for creating or updating database tables.
- `config` is the environment specific config that you will want to customize for your app
- `app.js` is the entrypoint that actually starts the Hapi server

**./config**

- config contains database configuration and google maps api configuration.

## Google API configuration ##

- add google apk key in Env variables or fallback/default config/default.js

## Code style ##
- Using eslint for code style
- Using prettier for code formatting https://prettier.io/
## Swagger ##
- Using "hapi-swagger" for api documentation , can be reached at "http://localhost:8080/documentation" once docker is up
## Assumptions ##
- Authentication is not needed
- List API's response is a bit different as results are in items Object.
- Docker is installed on the system.
- I havent used pm2 or forver in docker setup to run it because docker will restart the container itself so i am using node command to run the application.
- I havent put much comments in the code as its readable itself.