// models/StoreManager.js
const StoreManagerSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    storeName: { type: String },
    createdAt: { type: Date, default: Date.now }
  });
  
  export default mongoose.model("StoreManager", StoreManagerSchema);
  