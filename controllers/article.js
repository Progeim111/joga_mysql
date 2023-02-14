const con = require('../utils/db');
const getAllArticles = (req, res) => {
    let query = "SELECT * FROM articles";
    let articles = []
    con.query(query, (err, result) => {
        if (err) throw err;
        articles = result;
        res.render('index', {
            articles: articles
        });
    });
};

const getArticleBySlug = (req, res) => {
    let query = `
    SELECT article.name, article.published, article.body, article.image, author.name as author_name, author.id as author_id
    FROM article
    JOIN author ON article.author_id = author.id
    WHERE article.slug="${req.params.slug}"`;
    let article
    con.query(query, (err, result) => {
        if (err) throw err;
        article = result[0];
        res.render('article', {
            article: article
        });
    });
};

module.exports = {
    getAllArticles: getAllArticles,
    getArticleBySlug
};