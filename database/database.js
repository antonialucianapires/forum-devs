const Sequelize = require('sequelize');

const connection = new Sequelize('devforum', 'root', 'bola123', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;