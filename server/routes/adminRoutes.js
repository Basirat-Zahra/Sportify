import express from "express";
import { loginAdmin, getAdminDashboard } from "../controllers/adminController.js";
import { getAllUsers, getUserById, updateUser, deleteUser } from "../controllers/adminController.js";

import { protect } from "../middlewares/adminAuthMiddleware.js";

const router = express.Router();

router.post("/login", loginAdmin);
router.get("/dashboard", protect, getAdminDashboard);

// Admin User Management Routes
router.get("/users", protect, getAllUsers);
router.get("/users/:id", protect, getUserById);
router.put("/users/:id", protect, updateUser);
router.delete("/users/:id", protect, deleteUser);

export default router;
 