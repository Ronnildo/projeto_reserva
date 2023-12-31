const express = require('express');
const cors = require('cors')

const routes = require('./routes');

require('./database');

class App{
    constructor(){
        this.server = express();
        this.middlewares();
        this.routes();
    }
    middlewares(){
        this.server.use(express.json());
        this.server.use(cors())
    }

    routes(){
        this.server.use(routes);
        this.server.use(cors())
    }
}

module.exports = new App().server;