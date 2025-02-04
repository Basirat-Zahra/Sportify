import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path"; // Import path for static serving
import matchesRoutes from "./routes/matchesRoutes.js";
import seriesRoutes from "./routes/seriesRoutes.js";
import playersRoutes from "./routes/playersRoutes.js";
import connectDB from "./config/dbConfig.js"; // Import DB config
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import fanUserRoutes from "./routes/fanUserRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Serve media files from the `uploads` directory
app.use("/uploads", express.static(path.resolve("uploads")));

// Database Connection
connectDB();

// Routes
app.use("/api/matches", matchesRoutes);
app.use("/api/series", seriesRoutes);
app.use("/api/players", playersRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/fanuser", fanUserRoutes);

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
