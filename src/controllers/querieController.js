import Query from "../models/query";
import { QueryServices } from "../services/queryServices";

export class QueryController {
  async createQuery(req, res, next) {
    try {
      const data = new Query({
        senderName: req.body.senderName,
        subject: req.body.subject,
        email: req.body.email,
        message: req.body.message,
        location: req.body.location,
      });
      const query = await QueryServices.createQuery(data);
      res.status(200).json({ message: "Query Created!:", data: query });
    } catch (error) {
      res.status(500).json({ error: "Something Went Wrong!" });
    }
  }
  async getAllQueries(req, res, next) {
    try {
      const queries = await QueryServices.getAllQueries();
      res.status(200).json({ message: "list of Queries:", data: queries });
    } catch (error) {
      res.status(500).json({ error: "Something Went Wrong!!" });
    }
  }
  async getOneQuery(req, res, next) {
    try {
      const query = await QueryServices.getOneQuery(req.params.id);

      if (typeof query !== "string")
        res.status(200).json({ message: "Query Found!", data: query });
      else res.status(404).json({ message: query });
    } catch (error) {
      res.status(500).json({ error: "Something Went Wrong!" });
    }
  }
  async updateQuery(req, res, next) {
    try {
      const data = {};
      if (req.body.message) {
        data["message"] = req.body.message;
      }
      const query = await QueryServices.updateQuery(req.params.id, data);
      if (typeof query !== "string")
        res.status(200).json({ message: "Query Updated!", data: query });
      else res.status(404).json({ message: query });
    } catch (error) {
      console.log(error);
      res.status(404).json({ error: "Something went wrong!" });
    }
  }
  async deleteQuery(req, res, next) {
    try {
      const query = await QueryServices.deleteQuery(req.params.id);
      if (typeof query !== "string")
        res.status(200).json({ message: "Query Deleted Successfully!" });
      else res.status(404).json({ message: query });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Something Went Wrong!" });
    }
  }
}
