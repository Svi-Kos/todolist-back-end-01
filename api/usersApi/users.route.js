import express from "express";
import UsersCtrl from "./users.controller.js";

const router = express.Router();

router.route("/signin").post(UsersCtrl.apiReg);
router.route("/logout").get(UsersCtrl.apiLogOut);
router.route("/current").get(UsersCtrl.apiCurrent);

export default router;
