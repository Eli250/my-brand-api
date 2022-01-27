import Article from "../models/article";
import { ArticleServices } from "../services/articleServices";

export class ArticleController {
  // TODO Don't access database from this file you only needs
  async createArticle(req, res, next) {
    try {
      const data = new Article({
        title: req.body.title,
        description: req.body.description,
        content: req.body.content,
        image: req.body.image,
      });
      const article = await ArticleServices.createArticle(data);
      res.send(article);
    } catch (error) {
      console.log(error);
      res.status(404);
      res.send({ error: "There was an error creating article!" });
    }
  }
  async getAllArticles(req, res, next) {
    try {
      const articles = await ArticleServices.getAllArticles();
      res.send(articles);
    } catch (error) {
      res.status(404);
      res.send({ error: "We are having trouble fetching articles!" });
    }
  }
  async getArticle(req, res, next) {
    try {
      const article = await ArticleServices.getArticle(req.parms.id);
      res.send(article);
    } catch (error) {
      res.status(404);
      res.send({ error: "Article not found!" });
    }
  }
  async updateArticle(req, res, next) {
    try {
      const data = {};
      if (req.body.title) {
        data["title"] = req.body.title;
      }
      if (req.body.description) {
        data["description"] = req.body.description;
      }
      if (req.body.content) {
        data["content"] = req.body.content;
      }
      if (req.body.image) {
        data["image"] = req.body.image;
      }
      if (data.body.comments) {
        data["comments"] = req.body.comments;
      }
      const article = await ArticleServices.updateArticle(req.parms.id, data);
      res.send(article);
    } catch (error) {
      res.status(404);
      res.send({ error: "We could not find the article to update!" });
    }
  }
  async deleteArticle(req, res, next) {
    try {
      await ArticleServices.deleteArticle(req.parms.id);
      res.status(204).send();
    } catch (error) {
      res.status(404);
      res.send({ error: "Article does not exist!" });
    }
  }
}
