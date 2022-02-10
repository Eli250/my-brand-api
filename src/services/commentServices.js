/*import Comment from "../models/comment.js";

export const createComment = async (data) => {
  const comment = await Comment(data);
  comment.save();
  return comment;
};

export const getArticleComments = async (id) => {
  const comments = Comment.find({ articleId: id });
  return comments;
};
*/

import Comment from "../models/comment";

export class CommentServices {
  static async createComment(data) {
    return await data.save();
  }
  static async getAllComment() {
    const articles = await Comment.find();
    return articles;
  }
  static async getComment(id) {
    const article = await Comment.findOne({ _id: id });
    return article;
  }
}
