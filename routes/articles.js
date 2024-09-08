const express = require('express')
const ArticleController = require('../controllers/articleController')
const router = express.Router()

router.get('/', ArticleController.getAllArticles)
router.post('/', ArticleController.addArticle)
router.get('/:id', ArticleController.detailsArticle)
router.delete('/:id', ArticleController.deleteArticle)
router.put('/:id', ArticleController.editArticle)

module.exports = router