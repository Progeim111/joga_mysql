const express = require('express')
const app = express()

const path = require('path')

const hbs = require('express-handlebars');
app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'hbs');
app.engine('hbs', hbs.engine({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir:__dirname+ '/views/layouts/',
}))
app.use(express.static('public'));

const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended:true}))

const articleRoutes = require('./routes/article');

app.use('/', articleRoutes);
app.use('/article', articleRoutes)


app.get("/", (req, res) => {
    let query = 'SELECT * FROM article';
    let articles = []
    con.query(query, (err, result)=>{
        if (err) throw err
        articles = result
        res.render('index', {
            articles: articles
        })
    })

});




app.get('/article/:slug', (req, res) => {
    let query = `
        SELECT article.name, article.published, article.body, article.image, author.name as author_name, author.id as author_id
        FROM article
                 JOIN author ON article.author_id = author.id
        WHERE article.slug="${req.params.slug}"`;
    let article
    con.query(query, (err, result) => {
        if (err) throw err;
        console.log(result);
        article = result[0];
        res.render('article', {
            article: article
        });
    });
});

app.get('/author/:id', (req, res) => {
    let query = `SELECT article.name as article_name, article.image, article.slug ,author.name, article.body
                 from article JOIN author ON article.author_id = author.id where author.id = ${req.params.id}`;
    let articles = [];

    con.query(query, (err, result) => {
        if (err) throw err;
        articles = result;
        res.render('author', {
            articles: articles
        });
    });
});

process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception: ', err);
});

app.listen(3000, () =>{
    console.log('app us started at http://localhost:3000');
})