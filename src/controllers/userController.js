import { uploadFile } from "../helpers/fileUpload.js";
import { generateToken } from "../helpers/jwtFunctions.js";
import { comparePassword, hashPassword } from "../helpers/passwordSecurity";
import { userExist, createUser } from "../services/userServices.js";

export class UserControllers {
  async register(req, res, next) {
    try {
      const exist = await userExist(req.body.email);
      if (exist) {
        res.status(409).json({
          status: 409,
          message: "User Exists!. Please Use Another Email or Log In!",
        });
      } else {
        if (req.file) {
          req.body.picture = await uploadFile(req);
        } else {
          req.body.picture =
            "https://www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png";
        }
        const user = {
          username: req.body.username,
          email: req.body.email,
          password: hashPassword(req.body.password),
          picture: req.body.picture,
        };
        const createdUser = await createUser(user);
        res.status(201).json({
          status: 201,
          message: "User Registered!",
          user: createdUser,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
  async login(req, res, next) {
    try {
      const exist = await userExist(req.body.email);
      if (exist) {
        const valid = await comparePassword(req.body.password, exist.password);
        if (!valid) {
          res.status(401).json({ status: 401, message: "Invalid credentials" });
        }
        const token = generateToken({ id: exist._id });
        res.status(200).json({
          status: 200,
          message: "Successfully Logged In!",
          accessToken: token,
        });
      } else {
        res.status(401).json({ status: 401, message: "Invalid Credentials!" });
      }
    } catch (error) {
      console.log(error);
    }
  }
}
