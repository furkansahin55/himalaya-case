# Himalaya App
Creator: Furkan Sahin
## Instructions
### Installation

requires [Node.js](https://nodejs.org/) v16+ to run.

Install the dependencies and devDependencies and start the server.

```sh
cd himalaya-case
yarn install
```

Create a .env file and set the project configs
```sh
touch .env
nano .env
```

Sample .env
```sh
NODE_ENV=development
```

### Run application

to run app in production mode NODE_ENV should set to 'production'
for development mode it with extended logs and error stacks it should be 'development'

To start application
```sh
yarn start
```

To run test cases
```sh
yarn test
```

### Endpoints

GET /balances:
example query
http://localhost:3000/balances?addresses=0x39a582bE8039a526Bdf4730e4D1E3E0fE1Bc811b,0xBcFE52fEF72A70AD09245e40AEAcCE4B1e851320
