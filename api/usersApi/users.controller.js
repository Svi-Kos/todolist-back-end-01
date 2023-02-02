import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../../models/user.js";

export default class UsersCtrl {
  static async apiReg(req, res, next) {
    try {
      const { SECRET_KEY } = process.env;
      const { userName, password } = req.body;
      const user = await User.findOne({ userName });

      if (user) {
        const hash = user.password;
        const compare = bcrypt.compareSync(password, hash);
        if (!compare) {
          res.status(401).json({ error: "Name or password is wrong" });
          return;
        }

        const token = jwt.sign(
          {
            id: user._id,
          },
          SECRET_KEY
        );

        await User.findByIdAndUpdate(user._id, { token });

        res.json({
          status: "success",
          code: 200,
          result: {
            userName: user.userName,
            token,
          },
        });
        return;
      }

      const hash = bcrypt.hashSync(password, 10);
      const newUser = await User.create({
        userName,
        password: hash,
      });

      const token = jwt.sign(
        {
          id: newUser._id,
        },
        SECRET_KEY
      );
      await User.findByIdAndUpdate(newUser._id, { token });

      res.status(201).json({
        status: "success",
        code: 201,
        result: {
          userName: newUser.userName,
          token,
        },
      });
    } catch (e) {
      next(e);
    }
  }

  static async apiLogOut(req, res, next) {
    try {
      await User.findByIdAndUpdate(req.user._id, { token: null });
      res.status(204).json({
        status: "success",
        code: 204,
      });
    } catch (e) {
      next(e);
    }
  }

  static async apiCurrent(req, res, next) {
    try {
      const { token } = req.user;
      const currentUser = await User.findOne({ token });
      res.json({
        status: "success",
        code: 200,
        result: {
          userName: currentUser.userName,
          token,
        },
      });
    } catch (e) {
      next(e);
    }
  }
}
