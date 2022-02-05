import { query } from "express";
import Query from "../models/query";

export class QueryServices {
  static async createQuery(data) {
    return await data.save();
  }
  static async getAllQueries() {
    const queries = await Query.find();
    return queries;
  }
  static async getOneQuery(id) {
    const query = await Query.findOne({ _id: id });
    if (!query) return "Query Not Found";
    else return query;
  }
  static async updateQuery(id, data) {
    const query = await Query.findOne({ _id: id });
    if (!query) {
      return `Query With ID: ${id} Does Not Exist!`;
    } else {
      query.message = data.message ? data.message : query.message;
      const updatedArticle = await query.save();
      return updatedArticle;
    }
  }
  static async deleteQuery(id) {
    const query = await Query.findByIdAndDelete(id);
    if (!query) return "Query Not Found!";
    else return "Query Deleted!";
  }
}
