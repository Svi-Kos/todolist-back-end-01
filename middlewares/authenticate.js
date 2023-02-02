import jwt from "jsonwebtoken";
import User from "../models/user.js";

const authenticate = async (req, res, next) => {
  try {
    const { SECRET_KEY } = process.env;

    const [bearer, token] = req.headers.authorization.split(" ");
    if (bearer !== "Bearer") {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    jwt.verify(token, SECRET_KEY);
    const user = await User.findOne({ token });

    if (!user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    req.user = user;
    next();
  } catch (e) {
    res.status(401).json({ error: "Unauthorized" });
  }
};

export default authenticate;
