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
    try {
      const article = await Article.findOne({ _id: id });
      if (!article) return "Article Not Found!";
      else return article;
    } catch (error) {
      return "Something Went Wrong!";
    }
  }
  static async updateArticle(id, data) {
    const article = await Article.findOne({ _id: id });
    if (!article) {
      return `Article With ID: ${id} Does Not Exist!`;
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
        return "The article You Are Trying To Delete Does Not Exist!";
      } else {
        return "Article Deleted Successfully";
      }
    } catch (error) {
      return "Something Went Wrong!";
    }
  }
}
