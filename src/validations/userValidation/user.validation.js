import { userSchema } from "./user.schema";

export const userValidation = async (req, res, next) => {
  const value = userSchema.validate(req.body);
  if (value.error) {
    res.status(400).json({
      message: value.error.details[0].message.replaceAll('"', ""),
    });
  } else {
    next();
  }
};
