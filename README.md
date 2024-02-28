### Projeto playList Ralf

#### Projeto Dependências
    * mysql
        npm i mysql2
    * cors
        npm i cors
    * express,
        npm i express
    * bootstrap,
        npm i bootstrap
    * express-handlebars
        npm i express-handlebars
    * nodemon
        npm i nodemon
    * express-fileupload
        https://www.npmjs.com/package/express-fileupload
        npm i express-fileupload


#### End point
* http://localhost:8080/

#### express-handlebars

* 1. config "express-handlebars": "^7.1.2"
    /** Config frontend */
    app.engine('handlebars', engine());
    app.set('view engine', 'handlebars');
    app.set('views', 'views');

    /** Config frontend Bootstrap e CSS*/
    app.use('/bootstrap', express.static('./node_modules/bootstrap/dist'))
    app.use('/css', express.static('./views/css'));

* 2. use passando uma rota
    app.get('/pedido', function (req, res){
        res.render('pedido')
    });


#### Deu canceira
    * "express-fileupload": "^1.4.1",
    * "express-handlebars": "^7.1.2",

#### Referências
* Ralf playlist
``` 
https://www.youtube.com/watch?v=_iAqsbbCW_c&list=PLWXw8Gu52TRI5NJmexwA9qco33goFxbHK&index=21
```