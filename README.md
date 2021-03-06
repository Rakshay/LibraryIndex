# LibraryIndex

Allows you to search for Books based on the title. It uses the GoodReads DB listing (via APIs exposed by GoodReads)

### Version
3.6.4

### Tech

 * A Node.js, Express.js and ReactJS based web application
 * Written in ES6, it uses babel to transform ES6 to ES5
 * Webpack for the building the assets
 * Mocha based testing framework

### Prerequisites

 * NodeJS 4.4.x
 * NPM ^2.3.x

### Configuration

1. Get GoodReads Developer Keys from https://www.goodreads.com/api/keys

2. Update the configuration file (./configuration.json) with the key and secret

### Installation

1. Install dependencies ```$ npm install```

2. Build the UI assets ```$ npm run build```

3. Start the application ```$ npm run startApp```

4. Access the application at http://localhost:3000

### Development

```sh
$ npm install
$ npm run build
$ npm run startApp
```
For Stopping the app

```sh
$ npm run stopApp
```

For testing

```sh
$ npm run test
```
