import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
  getFanUserProfile,
  followPlayer,
  getFollowedPlayers,
  unfollowPlayer,
  updateProfile,
  uploadMedia,
  upload,
  getUserUploadedMedia,
} from "../controllers/fanUserController.js";


const router = express.Router();

// Routes
router.get("/profile", protect, getFanUserProfile);
router.post("/follow", protect, followPlayer);
router.get("/followed-players", protect, getFollowedPlayers);
router.delete("/unfollow", protect, unfollowPlayer);

router.put("/update-profile", protect, updateProfile);
router.get("/get-uploaded-media", protect, getUserUploadedMedia);
router.post("/upload-media", protect, upload.single("mediaFile"), uploadMedia);


export default router;
