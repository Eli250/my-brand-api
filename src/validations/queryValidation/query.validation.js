import { queryData } from "./query.data";

export const validateQuery = async (req, res, next) => {
  const value = queryData.validate(req.body);
  if (value.error) {
    //Status for wrong input
    res.status(400).json({
      message: `Please check your input: ${value.error.details[0].message.replaceAll(
        '"',
        ""
      )}`,
    });
  } else {
    next();
  }
};
