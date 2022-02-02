import Query from "../models/query";
import { QueryServices } from "../services/queryServices";

export class QueryController {
  async createQuery(req, res, next) {
    try {
      const data = new Query({
        senderName: req.body.senderName,
        email: req.body.email,
        message: req.body.message,
      });
      const query = await QueryServices.createQuery(data);
      res.send(query);
    } catch (error) {
      res.status(500);
      res.send({ error: "Something Went Wrong!" });
    }
  }
  async getAllQueries(req, res, next) {
    try {
      const queries = await QueryServices.getAllQueries();
      res.send(queries);
    } catch (error) {
      res.status(404);
      res.send({ error: "No Queries Found!" });
    }
  }
  async deleteQuery(req, res, next) {
    try {
      await QueryServices.deleteQuery(req.params.id);
      res.status(200).json({ message: "Query Deleted Successfully!" });
    } catch (error) {
      res.status(404).json({ error: "Query Does Not Exist!" });
    }
  }
}
