import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import matchesRoutes from "./routes/matchesRoutes.js";
import seriesRoutes from "./routes/seriesRoutes.js";
import playersRoutes from "./routes/playersRoutes.js";
import connectDB from './config/dbConfig.js'; // Import DB config

// Import Routes
// import authRoutes from "./routes/auth.js";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Database Connection
connectDB();

// Routes
// app.use("/api/auth", authRoutes);

// Matches Routes
app.use("/api/matches", matchesRoutes);
app.use("/api/series", seriesRoutes);
app.use("/api/players", playersRoutes);


// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
