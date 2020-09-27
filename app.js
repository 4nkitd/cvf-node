'use strict';
/**
 * third party libraries
 */
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const express = require('express');
const helmet = require('helmet');
const http = require('http');
const mapRoutes = require('express-routes-mapper');
const cors = require('cors');

// in house imports
const logger = require('./utils/logger');
const routes = require('./routes');
const watchdog = require('./middleware/watchdog');

// setting up env vars
if (dotenv.error) {
    logger.log('error', dotenv.error, 'main.js');
    return false;
}
dotenv.config();
const env = process.env;


const app = express();
const server = http.Server(app);
const mappedOpenRoutes = mapRoutes(routes.public, 'controllers/');

// allow cross origin requests
// configure to only allow requests from certain origins
app.use(cors());

// secure express app
app.use(helmet({
    dnsPrefetchControl: false,
    frameguard: false,
    ieNoOpen: false,
}));

// parsing the request body
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

// fill routes for express application
app.use('/', (req, res, next) => watchdog(req, res, next), mappedOpenRoutes);

server.listen(env.PORT, (err) => {

    console.log('server running.');

});