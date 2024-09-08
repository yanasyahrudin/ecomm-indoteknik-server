const { Article } = require("../models");

class ArticleController {
  static async getAllArticles(req, res, next) {
    try {
      const articles = await Article.findAll();
      res.status(200).json(articles);
    } catch (error) {
      next(error);
    }
  }

  static async addArticle(req, res, next) {
    try {
      const newArticle = await Article.create({
        title: req.body.title,
        image: req.body.image,
        description: req.body.description,
        author: req.body.author,
      });
      res.status(201).json(newArticle);
    } catch (error) {
      next(error);
    }
  }

  static async detailsArticle(req, res, next) {
    try {
      const article = await Article.findOne({
        where: {
          id: req.params.id,
        },
      });
      if (article) {
        res.status(200).json(article);
      } else {
        throw { name: "NotFoundError" };
      }
    } catch (error) {
      next(error);
    }
  }

  static async deleteArticle(req, res, next) {
    try {
      const article = await Article.findOne({
        where: {
          id: req.params.id,
        },
      });
      if (article) {
        await Article.destroy({ where: { id: req.params.id } });
        res.status(200).json({ message: "Article successfully deleted" });
      } else {
        throw { name: "NotFoundError" };
      }
    } catch (error) {
      next(error);
    }
  }

  static async editArticle(req, res, next) {
    try {
      const articleId = req.params.id;
      const { title, image, description, author } = req.body;

      await Article.update(
        {
          title,
          image,
          description,
          author,
        },
        {
          where: {
            id: articleId,
          },
        }
      );
      res.status(201).json({ message: "Article successfully updated" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ArticleController;
