import mongoose from "mongoose";

const articleSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, default: "Eli Hirwa" },
  image: String,
  created_on: { type: Date, default: Date.now },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
});
const Article = mongoose.model("Article", articleSchema);
export default Article;
