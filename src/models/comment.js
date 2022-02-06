/*import mongoose from "mongoose";

const opts = {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
};
const schema = mongoose.Schema(
  {
    articleId: String,
    name: String,
    comment: String,
  },
  opts
);

export default mongoose.model("Comment", schema);
*/
import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
  article: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Article",
  },
  sender: { type: String, required: true },
  comment: { type: String, required: true },
});
const Comment = mongoose.model("Comment", commentSchema);
export default Comment;
