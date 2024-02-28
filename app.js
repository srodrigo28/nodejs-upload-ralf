const express = require('express')
const mysql = require('mysql2');
const { engine } = require('express-handlebars')
const fileupload = require('express-fileupload');

const port = 8080;
const app = express();

/** Habilitando upload de arquivos */
app.use(fileupload());

/** Config json serialização */
app.use(express.json());
app.use(express.urlencoded({extended: false}));

/** Config frontend */
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', 'views');

/** Config frontend Bootstrap e CSS*/
app.use('/bootstrap', express.static('./node_modules/bootstrap/dist'))
app.use('/css', express.static('./views/css'));

/** Mysql config */
const conexao = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: '',
    database: 'projeto'
})

/** Mysql conect */
conexao.connect(function (error){
    if(error){
        console.log('Erro :( ' + error.message);
    }else{
        console.log('Conectado com sucesso!');
    }
})

app.get('/', function (req, res){
    res.render('produto')
});

/** Rota cadastrar produtos */
app.post('/cadastrar', function(req, res){
    // res.setHeader('Content-Type', 'text/plain')
    console.log(req.files['imagem']);
    // console.log(req.body['valor']);
    // console.log(req.files['imagem'].name);
    req.files.imagem.mv(__dirname+'/image/'+req.files['imagem'].name);
    /** Revisar tempo 6:38min
     * link https://www.youtube.com/watch?v=MlLlYbFN7iM&list=PLWXw8Gu52TRI5NJmexwA9qco33goFxbHK&index=14
    console.log(req.files.imagem.name);
     */
    res.end();
});

app.get('/pedido', function (req, res){
    res.render('pedido')
});

app.listen(port, function(){
    console.log('Server is running on port: ' + port)
});