const mysql = require('mysql');

const db = mysql.createConnection({
    hhost: 'localhost',
    user: 'root',
    password: 'qwerty',
    database: 'joga_mysql'
});

module.exports = db;