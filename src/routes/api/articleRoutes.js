import express from "express";
import { ArticleController } from "../../controllers/articleController";
import multer from "multer";
import { fileFilter } from "../../helpers/fileFilter";

import { articleValidation } from "../../validations/articleValidation/article.validation";


const fileStored = multer.diskStorage({});
const upload = multer({ storage: fileStored, file: fileFilter });

const route = express.Router();

route.get("/", new ArticleController().getAllArticles);

route.post(
  "/",
  upload.single("image"),
  articleValidation,
  new ArticleController().createArticle
);


route.get("/:id", new ArticleController().getArticle);

route.patch("/:id", new ArticleController().updateArticle);

route.delete("/:id", new ArticleController().deleteArticle);

export default route;
