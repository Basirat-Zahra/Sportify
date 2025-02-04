import express from "express";
import { loginAdmin, getAdminDashboard } from "../controllers/adminController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/login", loginAdmin);
router.get("/dashboard", protect, getAdminDashboard);

export default router;
