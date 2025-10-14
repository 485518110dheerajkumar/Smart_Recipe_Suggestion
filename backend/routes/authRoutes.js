import express from "express";
import { signup, login } from "../controllers/authController.js";
import User from "../models/User.js";


const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/me", async (req, res) => {
  try {
    // Example: If you store logged-in userId in a session or JWT
    const userId = req.user?._id || req.session?.userId || req.query.userId;
    if (!userId) return res.status(401).json({ message: "Not logged in" });

    const user = await User.findById(userId).select("_id name email");
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
