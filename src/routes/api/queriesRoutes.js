import express from "express";
import { ArticleController } from "../../controllers/articleController";
import { QueryController } from "../../controllers/querieController";

const route = express.Router();

route.get("/", (req, res, next) => {
  //   res
  //     .status(200)
  //     .json({ status: 200, message: "this will return all queries", data: "" });
  new QueryController().getAllQueries(req, res, next);
});
route.post("/", (req, res, next) => {
  new QueryController().createQuery(req, res, next);
});

route.delete("/:id", (req, res, next) => {
  new QueryController().deleteQuery(req, res, next);
});
export default route;
