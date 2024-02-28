const express = require('express')
const mysql = require('mysql2');
const { engine } = require('express-handlebars')

const port = 8080;
const app = express();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', 'views');

const conexao = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: '',
    database: 'projeto'
})

conexao.connect(function (error){
    if(error){
        console.log('Erro :( ' + error.message);
    }else{
        console.log('Conectado com sucesso!');
    }
})

app.get('/', function (req, res){
    res.render('formulario')
});

app.listen(port, function(){
    console.log('Server is running on port: ' + port)
});