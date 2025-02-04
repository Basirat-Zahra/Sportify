import mongoose from "mongoose";
import mediaSchema from "./Media.js";
import interactionSchema from "./Interaction.js";

const FanUserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profileImage: { type: String },
  followingPlayers: [{       
    playerId: { type: String }, // Change ObjectId to String if using UUIDs
  }],
  uploadedMedia: [mediaSchema],  // Use the imported schema
  interactions: [interactionSchema],  // Use the imported schema
});

export default mongoose.model("FanUser", FanUserSchema);
