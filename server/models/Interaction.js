import mongoose from "mongoose";

const interactionSchema = new mongoose.Schema({
  contentType: { type: String, enum: ["article", "player", "match"], required: true },
  contentId: { type: String, required: true },
  action: { type: String, enum: ["view", "like", "comment"], required: true },
  timestamp: { type: Date, default: Date.now },
});

export default interactionSchema;
