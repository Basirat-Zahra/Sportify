// controllers/fanUserController.js
import FanUser from "../models/FanUser.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const registerFanUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await FanUser.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new FanUser({ username, email, password: hashedPassword });

    await newUser.save();
    res.status(201).json({ message: "Fan user registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const loginFanUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await FanUser.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};



export { registerFanUser, loginFanUser };
