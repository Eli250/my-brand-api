import { string } from "joi";
import { uploadFile } from "../helpers/fileUpload";
import Article from "../models/article";
import { ArticleServices } from "../services/articleServices";
import Comment from "../models/comment";
import { CommentServices } from "../services/commentServices";
export class ArticleController {
  // TODO Don't access database from this file you only needs
  async createArticle(req, res, next) {
    try {
      req.body.image = await uploadFile(req);
      const data = new Article({
        title: req.body.title,
        description: req.body.description,
        content: req.body.content,
        image: req.body.image,
        date_created: new Date(),
      });
      const article = await ArticleServices.createArticle(data);
      res.status(200).json({ message: "Article Created!", data: article });
    } catch (error) {
      res.status(404).json({ error: "There was an error creating article!" });
    }
  }
  async getAllArticles(req, res, next) {
    try {
      const articles = await ArticleServices.getAllArticles();
      res.status(200).json({ message: "List of Articles", data: articles });
    } catch (error) {
      res
        .status(404)
        .json({ error: "We are having trouble fetching articles!" });
    }
  }
  async getArticle(req, res, next) {
    try {
      const article = await ArticleServices.getArticle(req.params.id);
      if (typeof article !== "string")
        res.status(200).json({ message: "Article", data: article });
      else res.status(404).json({ message: article });
    } catch (error) {
      res.status(404).json({ error: "Something Went Wrong!" });
    }
  }
  async updateArticle(req, res, next) {
    try {
      const data = {};
      req.body.image = await uploadFile(req);
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
      if (req.file) {
        req.body.image = await uploadFile(req);
      }
      const article = await ArticleServices.updateArticle(req.params.id, data);
      if (typeof article !== "string")
        res.status(200).json({ message: "Article Created!", data: article });
      else res.status(404).json({ message: article });
    } catch (error) {
      console.log(error);
      res.status(404).json({ error: "Something went wrong!" });
    }
  }
  async createComment(req, res, next) {
    try {
      const article = await ArticleServices.getArticle(req.params.id);
      if (article) {
        console.log("---CREATING----");
        const comment = new Comment({
          sender: req.body.sender,
          comment: req.body.comment,
          article: req.params.id,
        });
        console.log("---CREATED DONE----");
        const savedComment = await CommentServices.createComment(comment);
        console.log("---COMMENT DONE----");
        article.comments.push(savedComment);
        const articleSaved = await ArticleServices.createArticle(article);
        return res.status(201).send(articleSaved);
      }
    } catch (error) {
      console.log(error);
    }
  }
  async commentsOnArticle(req, res, next) {
    try {
      const { id } = req.params;
      const article = await ArticleServices.commentsOnArticle(id);
      res.send(article.comments);
    } catch (error) {
      console.error(error);
      res.status(404).send({ error: "Article doesn't exist!" });
    }
  }
  async deleteArticle(req, res, next) {
    try {
      const result = await ArticleServices.deleteArticle(req.params.id);
      if (typeof result !== "string") res.status(200).json({ message: result });
      else res.status(404).json({ message: result });
    } catch (error) {
      res.status(404).json({ error: "Article does not exist!" });
    }
  }
}
