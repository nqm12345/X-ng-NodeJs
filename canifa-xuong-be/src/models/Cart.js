import mongoose, {Schema} from "mongoose";

const CartItem = new Schema({
    product: {type: Schema.Types.ObjectId, ref: "Product"},
    quantity: Number,
});

const cartSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: "User"},
    products: [CartItem],
    totalPrice: Number,
});
export default mongoose.model("Cart", cartSchema);