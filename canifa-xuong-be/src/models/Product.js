import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    newprice: { type: Number, required: true },
    oldprice: { type: Number },
    description: { type: String },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    image: { type: String },
    thumbnail: [{ type: String }],
    stock: { type: Number },

    // ✅ Đã đổi từ `colors` → `color`
    color: {
      type: [String],
      default: [],
    },

    size: {
      type: [String],
      default: [],
    },

    brand: { type: String },

    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("Product", productSchema);
