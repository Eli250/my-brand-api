import mongoose from "mongoose";

const querySchema = mongoose.Schema({
  senderName: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  date_sent: { type: Date, default: Date.now() },
});
const Query = mongoose.model("Query", querySchema);
export default Query;
