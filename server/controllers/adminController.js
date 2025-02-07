import Admin from "../models/Admin.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import FanUser from "../models/FanUser.js";


// Admin Login
export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    console.log("sdfghjhcg");
    
    console.log(admin);
    
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: "24h" });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}; 


// Admin Dashboard Logic
export const getAdminDashboard = async (req, res) => {
  try {
    console.log("dhfhsdfshdfbksdj");
    
    console.log(req.admin);
    
    // Fetch admin information based on the authenticated admin
    const admin = await Admin.findById(req.admin.id).select("-password");

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Prepare admin dashboard data
    const adminInfo = {
      id: admin._id,
      username: admin.username,
      email: admin.email,
      createdAt: admin.createdAt,
    };

    res.status(200).json({ message: "Welcome to the Admin Dashboard", adminInfo });
  } catch (error) {
    console.error("Error fetching admin dashboard:", error);
    res.status(500).json({ message: "Server error" });
  }
};



// Fetch all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await FanUser.find({}, "username email followingPlayers followingMatches");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Unable to fetch users" });
  }
};

// Fetch user by ID
export const getUserById = async (req, res) => {
  try {
    const user = await FanUser.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update user details
export const updateUser = async (req, res) => {
  try {
    const { email, followingPlayers, followingMatches } = req.body;
    const updatedUser = await FanUser.findByIdAndUpdate(
      req.params.id,
      { email, followingPlayers, followingMatches },
      { new: true }
    );
    if (!updatedUser) return res.status(404).json({ message: "User not found" });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Unable to update user" });
  }
};

// Delete or deactivate user
export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await FanUser.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Unable to delete user" });
  }
};
