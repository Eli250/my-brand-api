import { queryData } from "./query.data";

export const validateQuery = async (req, res, next) => {
  const value = await queryData.validate(req.body);
  if (value.error) {
    res.status(406).json({
      status: 406,
      message: `Please check your input: ${value.error.details[0].message}`,
    });
  } else {
    next();
  }
};
