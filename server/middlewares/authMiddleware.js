// middlewares/authMiddleware.js
import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  // console.log("Authorization Header:", req.headers.authorization); // Log the header to verify the token format
  
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Not authorized, no token" });
  // console.log("Token received:", token);

  try {
    // console.log("Attempting to verify token...");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("Token decoded successfully:", decoded); // Log decoded token if successful
    req.user = decoded;
    next();
  } catch (err) {
    // console.error("Token verification failed:", err); // Log the exact error
    res.status(401).json({ message: "Invalid token", error: err.message });
  }
};




// Admin-Only Middleware
// export const adminOnly = (req, res, next) => {
//   if (req.user.role !== "admin") {
//     return res.status(403).json({ message: "Admin access only" });
//   }
//   next();
// };

