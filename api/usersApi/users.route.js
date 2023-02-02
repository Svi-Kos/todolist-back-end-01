import express from "express";
import UsersCtrl from "./users.controller.js";
import authenticate from "../../middlewares/authenticate.js";

const router = express.Router();

router.route("/signin").post(UsersCtrl.apiReg);
router.route("/logout").get(authenticate, UsersCtrl.apiLogOut);
router.route("/current").get(authenticate, UsersCtrl.apiCurrent);

export default router;
