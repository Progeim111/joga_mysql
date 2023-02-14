const express = require('express')
const router = express.Router()
const artivlecontroller = require('../controllers/article')

router.get('/', artivlecontroller.getAllArticles)
router.get('/article/:slug', artivlecontroller.getArticleBySlug)

module.exports = router;