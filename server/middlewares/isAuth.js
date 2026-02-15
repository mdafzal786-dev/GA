import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

export const isAuth = async (req, res, next) => {
  try {
    const token = req.headers["token"] || req.headers["authorization"];

    if (!token) {
      return res.status(401).json({ message: "Please login first" });
    }

    const realToken = token.startsWith("Bearer ")
      ? token.split(" ")[1]
      : token;

    let decoded;
    try {
      decoded = jwt.verify(realToken, process.env.JWT_SECRET || process.env.Jwt_Sec);
    } catch (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    const user = await User.findById(decoded._id || decoded.id);
    if (!user) return res.status(401).json({ message: "User not found" });

    if (user.status === "blocked") {
      return res.status(403).json({
        message: "Your account is blocked. Contact Admin.",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("❗ isAuth error:", error);
    return res.status(500).json({ message: "Server error in authentication" });
  }
};


export const isAdmin = (req, res, next) => {
  try {
    if (!req.user)
      return res.status(401).json({ message: "Unauthorized - no user" });

    if (req.user.role !== "admin")
      return res.status(403).json({ message: "You are not an admin" });

    next();
  } catch (error) {
    console.error("❗ isAdmin error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
