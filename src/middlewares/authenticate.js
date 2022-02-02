import "dotenv/config";
import jwt from "jsonwebtoken";

export const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRETE);
    next();
  } catch (error) {
    return res.status(401).json({
      error: "Please Login To Access This Resource!",
    });
  }
};
