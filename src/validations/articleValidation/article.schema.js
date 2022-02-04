import joi from "joi";

export const articleSchema = joi.object({
  title: joi.string().max(1000).required(),
  content: joi.string().required(),
  //Other fields are prevalidated since they are automatically generated from database, no need to validate them.
});
