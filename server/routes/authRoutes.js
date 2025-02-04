// routes/authRoutes.js
import express from "express";
import { registerFanUser, loginFanUser } from "../controllers/authController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", registerFanUser);
router.post("/login", loginFanUser);

export default router;
