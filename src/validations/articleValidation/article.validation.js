import { articleSchema } from "./article.schema.js";

export const articleValidation = async (req, res, next) => {
  const value = articleSchema.validate(req.body);
  if (value.error) {
    res.status(400).json({
      status: 400,
      message: `Wrong input: ${value.error.details[0].message.replaceAll(
        '"',
        ""
      )}`,
    });
  } else {
    next();
  }
};
