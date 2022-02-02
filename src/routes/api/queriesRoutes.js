import express from "express";

import { validateQuery } from "../../validations/queryValidation/query.validation";

import { QueryController } from "../../controllers/querieController";

const route = express.Router();

route.get("/", new QueryController().getAllQueries);

route.post("/", validateQuery, new QueryController().createQuery);
=======

route.delete("/:id", new QueryController().deleteQuery);
export default route;
