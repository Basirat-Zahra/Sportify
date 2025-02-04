import mongoose from "mongoose";

const PlayerSchema = new mongoose.Schema({
  playerId: { type: String, unique: true, required: true },
  name: String,
  country: String,
  role: String,
  image: String,
});

export default mongoose.model("Player", PlayerSchema);
