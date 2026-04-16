import express from "express";
import {
  getMe,
  login,
  logout,
  register,
} from "../controller/auth.controller.js";
import { protect } from "../middleware/protect.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/logout", logout);
router.get("/me", protect, getMe);

export default router;
