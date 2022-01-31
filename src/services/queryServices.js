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
    return query;
  }
  static async deleteQuery(id) {
    return await Query.deleteOne({ _id: id });
  }
}
