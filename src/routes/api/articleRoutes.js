import express from "express";
import { ArticleController } from "../../controllers/articleController";
import multer from "multer";
import { fileFilter } from "../../helpers/fileFilter";

const fileStorrd = multer.diskStorage({});
const upload = multer({ storage: fileStorrd, file: fileFilter });

const route = express.Router();

route.get("/", new ArticleController().getAllArticles);

route.post("/", upload.single("image"), new ArticleController().createArticle);

route.get("/:id", new ArticleController().getArticle);

route.patch("/:id", new ArticleController().updateArticle);

route.delete("/:id", new ArticleController().deleteArticle);

export default route;
