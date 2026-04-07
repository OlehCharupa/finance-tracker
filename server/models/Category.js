import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  icon: { type: String, default: "category" }
});

export default mongoose.model("Category", categorySchema);
