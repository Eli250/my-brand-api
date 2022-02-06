import express from "express";

import { validateQuery } from "../../validations/queryValidation/query.validation";

import { QueryController } from "../../controllers/querieController";
import { authenticate } from "../../middlewares/authenticate";

const route = express.Router();

route.get("/", authenticate, new QueryController().getAllQueries);
route.get("/:id", authenticate, new QueryController().getOneQuery);
route.post("/", validateQuery, new QueryController().createQuery);
route.patch("/:id", new QueryController().updateQuery);
route.delete("/:id", authenticate, new QueryController().deleteQuery);
export default route;
