import { Router } from "express";
import {
  addToCart,
  checkout,
  getCart,
  removeFromCart,
  updateCartItem
} from "../controllers/cart.js";
import { checkAuth } from "../middlewares/checkAuth.js"; // 💡 Đảm bảo bạn import đúng path

const cartRouter = Router();

// ➕ Thêm sản phẩm vào giỏ (phải đăng nhập mới thêm được)
cartRouter.post("/", checkAuth, addToCart);

// 🛒 Lấy giỏ hàng
cartRouter.get("/", checkAuth, getCart);

// 🔁 Cập nhật số lượng sản phẩm trong giỏ
cartRouter.put("/update-cart/:productId", checkAuth, updateCartItem);

// 🗑️ Xóa sản phẩm khỏi giỏ
cartRouter.delete("/remove-cart/:productId", checkAuth, removeFromCart);


// 💳 Thanh toán (xoá toàn bộ giỏ hàng)
cartRouter.post("/checkout", checkAuth, checkout);

export default cartRouter;
