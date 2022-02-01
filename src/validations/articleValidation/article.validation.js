import { articleSchema } from "./article.schema.js";

export const articleValidation = async (req, res, next) => {
  const value = await articleSchema.validate(req.body);
  if (value.error) {
    res.status(406).json({
      status: 406,
      message: `Wrong input: ${value.error.details[0].message}`,
    });
  } else {
    next();
  }
};
