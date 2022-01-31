import express from "express";

import { QueryController } from "../../controllers/querieController";

const route = express.Router();

route.get("/", new QueryController().getAllQueries);
route.post("/", new QueryController().createQuery);
route.delete("/:id", new QueryController().deleteQuery);
export default route;
