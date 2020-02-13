const express = require('express');
const app = express();
const bodyParser = require('body-parser') //responsável por traduzir os dados enviados por formulário em uma estrutura JS para utulizar no back-end
const connection = require('./database/database');
const Pergunta = require('./database/Pergunta');
const Resposta = require('./database/Resposta')

//database
//estrutura promise
connection
    .authenticate()
    .then(() => {
        console.log('conexão feita com sucesso!')
    })
    .catch((msgErro) => {
        console.log("msgErro")
    })

//express
app.set('view engine', 'ejs');// redenriza o html
app.use(express.static('public')); //aceita arquivos estáticos como css, js

//bodyparser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//rotas
app.get("/", (req, res) => {
     //SELECT * ALL Perguntas;
     Pergunta.findAll({raw: true, order: [
         ['id', 'DESC'] //DESC - decrescente , ASC - Ascendente
     ]}).then(perguntas => {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
        res.render("index", {
            perguntas: perguntas
        });
     })
    
});

app.get("/perguntar", (req, res) => {
    res.render("perguntar");
});

app.post("/salvarpergunta", (req, res) => {
    //recebo os dados do formulario e salvo nas seguintes variáveis;
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    //INSERT na tabela Perguntas
    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => { //se estiver ok, o usuário, ao enviar a pergunta, será direcionado para a página principal
        res.redirect("/")
    });
    
});

app.get("/pergunta/:id", (req, res) => {
    var id = req.params.id;
    Pergunta.findOne({
        where: {id:id}
    }).then(pergunta => {
        if(pergunta != undefined) {
            Resposta.findAll({
                where: {perguntaId: pergunta.id},
                order: [['id', 'DESC']]
            }).then(respostas => {
            //pergunta encontrada
            res.render("pergunta", {
                pergunta: pergunta,
                respostas: respostas
            })
            });
        } else { //pergunta não encontrada
            res.redirect("/");
        }
    })
});

app.post("/responder", (req, res) => {
    var corpo = req.body.corpo;
    var perguntaId = req.body.pergunta;
    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(() => {
        res.redirect("/pergunta/" + perguntaId);
    });
})

app.listen(3030, ()=>{
    console.log("Rodando")
})