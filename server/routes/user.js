import express from "express";
import { forgotPassword, loginUser, myprofile, register, resetPassword, verifyUser } from "../controllers/user.js";
import { isAuth } from "../middlewares/isAuth.js";
import { addProgress, getYourProgress } from "../controllers/course.js";
import { blockUser } from "../controllers/admin.js"; // <-- added

const router = express.Router();

router.post("/user/register", register);

router.post("/user/verify", verifyUser);

router.post("/user/login", loginUser);

router.get("/user/me", isAuth, myprofile);

router.post("/user/forgot", forgotPassword);

router.post("/user/reset", resetPassword);

router.post("/user/progress", isAuth, addProgress);

router.get("/user/progress", isAuth, getYourProgress);

// Block/Unblock user (added)
router.put("/user/block/:id", isAuth, blockUser);

export default router;
