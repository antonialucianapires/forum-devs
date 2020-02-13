const Sequelize = require('sequelize');

const connection = new Sequelize('devforum', 'root', '******', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;
