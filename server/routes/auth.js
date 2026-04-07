import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Category from "../models/Category.js";

const router = express.Router();

const DEFAULT_CATEGORIES = [
  { name: "Продукти", icon: "shopping_cart" },
  { name: "Транспорт", icon: "directions_car" },
  { name: "Розваги", icon: "movie" },
  { name: "Здоров'я", icon: "favorite" },
  { name: "Комунальні", icon: "home" },
  { name: "Одяг", icon: "checkroom" },
  { name: "Інше", icon: "category" }
];

// Реєстрація
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "User exists" });

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashed });
    await user.save();

    // Створюємо базові категорії
    const categories = DEFAULT_CATEGORIES.map(cat => ({
      userId: user._id,
      ...cat
    }));
    await Category.insertMany(categories);

    res.json({ message: "Registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Логін
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.json({ token, userId: user._id, email: user.email });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
