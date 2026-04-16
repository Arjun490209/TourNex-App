import express from "express";
import {
  getAdminDashboard,
  getAllUsers,
} from "../controller/admin.controller.js";
import { protect } from "../middleware/auth.js";
import { adminOnly } from "../middleware/auth.js";

const router = express.Router();

router.get("/dashboard", protect, getAdminDashboard);
router.get("/users", protect, getAllUsers);

export default router;
