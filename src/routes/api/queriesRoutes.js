import express from "express";

import { validateQuery } from "../../validations/queryValidation/query.validation";

import { QueryController } from "../../controllers/querieController";
import { authenticate } from "../../middlewares/authenticate";

const route = express.Router();

route.get("/", new QueryController().getAllQueries);

route.post("/", authenticate, validateQuery, new QueryController().createQuery);

route.delete("/:id", authenticate, new QueryController().deleteQuery);
export default route;
