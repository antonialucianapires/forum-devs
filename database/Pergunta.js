const Sequelize = require('sequelize');
const connection = require('./database');

//model
const Pergunta = connection.define('pergunta', {
    titulo: {
    type: Sequelize.STRING, //campos e tipos
    allowNull: false
    },
    descricao:{
        type: Sequelize.TEXT,
        allowNull: false
    }
});

//cria a tabela
Pergunta.sync({force: false}).then(() => {}); //sincroniza isso com o banco de dados e o force.false evita que a tabela seja criada mais de uma vez

module.exports = Pergunta;