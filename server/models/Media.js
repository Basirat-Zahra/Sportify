import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema({
  type: { type: String, enum: ["image", "video"], required: true },
  matchId: { type: String, required: true },
  url: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now },
  size: { type: Number, required: true }, // File size in bytes
  duration: { type: Number, required: false }, // Duration in seconds (for videos)
});

// Virtuals for media constraints
mediaSchema.path("size").validate(function (value) {
  return value <= 5 * 1024 * 1024; // Max 5 MB for both image/video
}, "Media file size should not exceed 5 MB");

mediaSchema.path("duration").validate(function (value) {
  return value === undefined || value <= 300; // Max duration 5 minutes for videos
}, "Video duration should not exceed 5 minutes");

export default mediaSchema;
