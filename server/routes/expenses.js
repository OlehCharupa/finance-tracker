import express from "express";
import Expense from "../models/Expense.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", auth, async (req, res) => {
  const { from, to, categoryId, sortBy } = req.query;
  const filter = { userId: req.user.id };

  if (from || to) {
    filter.date = {};
    if (from) filter.date.$gte = new Date(from);
    if (to) filter.date.$lte = new Date(to);
  }
  if (categoryId) filter.categoryId = categoryId;

  const sort = sortBy === "amount" ? { amount: -1 } : { date: -1 };

  const expenses = await Expense.find(filter).populate("categoryId").sort(sort);
  res.json(expenses);
});

router.post("/", auth, async (req, res) => {
  const expense = new Expense({ userId: req.user.id, ...req.body });
  await expense.save();
  res.json(expense);
});

router.put("/:id", auth, async (req, res) => {
  const updated = await Expense.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.id },
    req.body,
    { new: true }
  );
  res.json(updated);
});

router.delete("/:id", auth, async (req, res) => {
  await Expense.deleteOne({ _id: req.params.id, userId: req.user.id });
  res.json({ message: "Deleted" });
});

export default router;
