
const Sequelize = require('sequelize');
const databaseConfig = require('../config/database');
const Reserva = require("../app/models/Reserva");

const models = [Reserva];

class Database{
    constructor(){
        this.init();
    }
    init(){
        this.connection = new Sequelize(databaseConfig);
        models
        .map(model => model.init(this.connection))
        .map(model => model.associate && model.associate(this.connection.models));
    }
}

module.exports = new Database();