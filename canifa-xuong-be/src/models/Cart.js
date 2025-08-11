import mongoose, { Schema } from "mongoose";

const CartItemSchema = new Schema(
  {
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, default: 1 },
    color: { type: String, required: false }, // Không bắt buộc trong DB
    size: { type: String, required: true },   // Luôn bắt buộc
  },
  { _id: false }
);

const cartSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  products: [CartItemSchema],
  totalPrice: { type: Number, default: 0 },
});

export default mongoose.model("Cart", cartSchema);
