import Article from "../models/article";

// import the model you need to access
export class ArticleServices {
  static async createArticle(data) {
    return await data.save();
  }
  static async getAllArticles() {
    const articles = await Article.find();
    return articles;
  }
  static async getArticle(id) {
    const article = await Article.findOne({ _id: id });
    return article;
  }
  static async updateArticle(id, data) {
    const article = await Article.findOne({ _id: id });
    if (!article) {
      return `Article with id: ${id} doesn't exist`;
    } else {
      article.title = data.title ? data.title : article.title;
      article.content = data.content ? data.content : article.content;
      article.image = data.image ? data.image : article.image;
      const updatedArticle = await article.save();
      return updatedArticle;
    }
  }
  static async deleteArticle(id) {
    try {
      const result = await Article.findByIdAndDelete(id);
      if (!result) {
        return "The article you are trying to delete does not exist";
      } else {
        return "Article deleted successfully";
      }
    } catch (error) {
      return "the article you are trying to delete does not exist";
    }
  }
}
