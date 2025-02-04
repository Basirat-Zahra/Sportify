import FanUser from "../models/FanUser.js";
import Player from "../models/Player.js"; // Assuming a Player model exists
import { fetchPlayerInfo } from "../services/playersData.js";
import bcrypt from "bcrypt";
import multer from "multer";
import path from "path";



export 
const getFanUserProfile = async (req, res) => {
  try {
    const user = await FanUser.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Follow a player
export const followPlayer = async (req, res) => {
    const userId = req.user.id;
    const { playerId } = req.body;
    
    try {
      console.log(`Attempting to follow player with ID: ${playerId}`);
      
      const user = await FanUser.findById(userId);
      if (!user) {
        console.log("User not found");
        return res.status(404).json({ message: "User not found" });
      }
      
      const alreadyFollowing = user.followingPlayers.some((p) => p.playerId === playerId);
      if (alreadyFollowing) {
        console.log("Player already followed");
        return res.status(400).json({ message: "Player already followed" });
      }
  
      // Fetch player info from CricData
      let player = await Player.findOne({ playerId });
      if (!player) {
        console.log("Player not found in DB, fetching from API...");
        const playerData = await fetchPlayerInfo(playerId);
        player = await Player.create({
          playerId: playerData.id,
          name: playerData.name,
          country: playerData.country,
          role: playerData.role,
          image: playerData.playerImg,
        });
        console.log("Player created:", player);
      }
  
      user.followingPlayers.push({ playerId: player.playerId });
      await user.save();
      
      console.log("Player followed successfully");
      res.json({ message: "Player followed successfully", followingPlayers: user.followingPlayers });
    } catch (error) {
      console.error("Error following player:", error);
      res.status(500).json({ error: "Error following player" });
    }
  };
  

// Get followed players
export const getFollowedPlayers = async (req, res) => {
  try {
    const userId = req.user.id;

    // Log the userId to check if it's being passed correctly
    console.log("User ID from request:", userId);

    // Fetch the user
    const user = await FanUser.findById(userId);

    // Log the fetched user object
    console.log("Fetched user:", user);

    if (!user) {
      console.log("User not found");
      return res.status(404).json({ message: "User not found" });
    }

    // Log the user's followingPlayers to ensure the field exists and has player IDs
    console.log("User's following players:", user.followingPlayers);

    if (!user.followingPlayers || user.followingPlayers.length === 0) {
      console.log("No followed players found");
      return res.status(404).json({ message: "No followed players found" });
    }

    // Log the details of each followed player (Just fetching CricData API IDs)
    const playerDetails = user.followingPlayers.map((fp) => {
      console.log("Following player ID:", fp.playerId);
      return {
        playerId: fp.playerId,  // Just return the playerId (CricData API ID)
      };
    });

    // Log the player details to check the structure
    console.log("Player details:", playerDetails);

    res.json(playerDetails);
  } catch (error) {
    console.error("Error fetching followed players:", error);
    res.status(500).json({ error: "Failed to fetch followed players" });
  }
};


  

// Unfollow a player
export const unfollowPlayer = async (req, res) => {
    try {
      const userId = req.user.id;
      const { playerId } = req.body;
  
      const user = await FanUser.findById(userId);
      if (!user) return res.status(404).json({ message: "User not found" });
  
      const isFollowing = user.followingPlayers.some((p) => p.playerId === playerId);
      if (!isFollowing) return res.status(400).json({ message: "Player is not in the following list" });
  
      // Remove player from following list
      user.followingPlayers = user.followingPlayers.filter((p) => p.playerId !== playerId);
      await user.save();
  
      res.json({
        message: "Player unfollowed successfully",
        followingPlayers: user.followingPlayers,
      });
    } catch (error) {
      console.error("Error unfollowing player:", error);
      res.status(500).json({ error: "Failed to unfollow player" });
    }
  };
  
  // Updating the profile
export const updateProfile = async (req, res) => {
  const userId = req.user.id;
  const { username, email, password, profileImage } = req.body;

  try {
    const user = await FanUser.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Update fields conditionally
    if (username) user.username = username;
    if (email) user.email = email;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }
    if (profileImage) user.profileImage = profileImage;

    await user.save();

    res.json({ message: "Profile updated successfully", user });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ error: "Error updating profile" });
  }
};


//Upload Media

// Configure storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Directory for file storage
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Max 5 MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "video/mp4"];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error("Invalid file type. Only JPEG, PNG, and MP4 are allowed."));
    }
    cb(null, true);
  },
});

export { upload };

export const uploadMedia = async (req, res) => {
  const userId = req.user.id;

  try {
    const { matchId, type } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const file = req.file;
    const { path: url, size } = file;

    if (!["image", "video"].includes(type)) {
      return res.status(400).json({ message: "Invalid media type" });
    }

    const duration = type === "video" ? req.body.duration || 0 : undefined;

    const user = await FanUser.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const newMedia = {
      type,
      matchId,
      url,
      size,
      ...(duration && { duration }),
    };

    user.uploadedMedia.push(newMedia);
    await user.save();

    res.json({ message: "Media uploaded successfully", media: newMedia });
  } catch (error) {
    console.error("Error uploading media:", error);
    res.status(500).json({ error: "Failed to upload media" });
  }
};


export const getUserUploadedMedia = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await FanUser.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const uploadedMedia = user.uploadedMedia.map(media => ({
      type: media.type,
      url: `http://localhost:3000/uploads/${path.basename(media.url)}`,
      matchId: media.matchId,
      uploadedAt: media.uploadedAt,
    }));

    res.json({ message: "Uploaded media retrieved successfully", media: uploadedMedia });
  } catch (error) {
    console.error("Error fetching media:", error);
    res.status(500).json({ error: "Failed to fetch uploaded media" });
  }
};
