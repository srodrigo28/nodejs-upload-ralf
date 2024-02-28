const express = require('express')
const mysql = require('mysql2');
const fs = require('fs');
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
app.use('/image', express.static('./image'));

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
    
    // SQL
    let sql = `SELECT * FROM produtos`;
    conexao.query(sql, function(error, retorno){
        if(error) console.log(error.message);
        res.render('produto', {produtos:retorno})
        // console.log(retorno)
    });
    // res.render('produto')
});

/** Rota cadastrar produtos indices: produto, valor, qtd, imagem */
app.post('/cadastrar', function(req, res){
    // Obter os dados
    let produto = req.body['produto'];
    let valor = req.body['valor'];
    let qtd = req.body['qtd'];
    let imagem = req.files['imagem'].name;

    // Comando SQL
    let sql = `INSERT INTO produtos (nome, valor, qtd, imagem) 
        VALUES('${produto}', '${valor}', '${qtd}', '${imagem}' )`;
    
        /**  Executar o comando SQL 1 */
        conexao.query(sql, function(error){
            if(error){
                console.log("se lascou :(" + error.message);
            }else{
                console.log("Inserido com sucesso :)");
                req.files['imagem'].mv(__dirname+'/image/'+req.files['imagem'].name)
                return false;
            }
        });

        /** Executar o comando SQL 2
        conexao.query(sql, function(error, retorno){
            if(error) throw error;
            req.files['imagem'].mv(__dirname+'/image/'+req.files['imagem'].name)
            console.log(retorno)
        });
        */

        res.redirect('/')
        /*** Testes realizados
        res.setHeader('Content-Type', 'text/plain')
        console.log(req.body);
        console.log(req.body['valor']);
        console.log(req.files['imagem']);
        console.log(req.files['imagem'].name);
        req.files.imagem.mv(__dirname+'/image/'+req.files['imagem'].name);
    */
    
});

app.get('/remover/:codigo&:imagem', function(req, res){
    /*** 1. testa se recebe os dados
    console.log(req.params.codigo);
    console.log(req.params.imagem);
    res.end(); */
    // 2. passo 
    let sql = `DELETE FROM produtos WHERE codigo = ${req.params.codigo}`;

    // 3. passo 
    conexao.query(sql, function(error, retorno){
        if(error) throw error; // caso falhe
        console.log(retorno)
        fs.unlink(__dirname+'/image/'+req.params.imagem, (error) =>{
            if(error) throw error; // caso falhe
            console.log(retorno)
        });
    });

    res.redirect('/');
})

app.get('/pedido', function (req, res){
    res.render('pedido')
});

app.listen(port, function(){
    console.log('Server is running on port: ' + port)
});