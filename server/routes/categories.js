import express from "express";
import Category from "../models/Category.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", auth, async (req, res) => {
  const categories = await Category.find({ userId: req.user.id });
  res.json(categories);
});

router.post("/", auth, async (req, res) => {
  const category = new Category({ userId: req.user.id, ...req.body });
  await category.save();
  res.json(category);
});

router.put("/:id", auth, async (req, res) => {
  const updated = await Category.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.id },
    req.body,
    { new: true }
  );
  res.json(updated);
});

router.delete("/:id", auth, async (req, res) => {
  await Category.deleteOne({ _id: req.params.id, userId: req.user.id });
  res.json({ message: "Deleted" });
});

export default router;
