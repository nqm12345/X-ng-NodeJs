import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

// 🛒 Lấy giỏ hàng
export const getCart = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const cart = await Cart.findOne({ userId }).populate("products.product");

    if (!cart) {
      return res.status(200).json({
        message: "Giỏ hàng rỗng",
        cart: { products: [], totalPrice: 0 },
      });
    }

    return res.status(200).json({
      message: "Lấy giỏ hàng thành công",
      cart,
    });
  } catch (error) {
    next(error);
  }
};

// ➕ Thêm vào giỏ
export const addToCart = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { productId, quantity, color, size } = req.body;

    const product = await Product.findById(productId);
    if (!product)
      return res.status(404).json({ message: "Sản phẩm không tồn tại" });

    const hasColor = product.color && product.color.length > 0;
    const hasSize = product.size && product.size.length > 0;

    if (hasColor && hasSize) {
      if (!color || !size) {
        return res
          .status(400)
          .json({ message: "Vui lòng chọn màu và kích cỡ!" });
      }
    } else if (!hasColor && hasSize) {
      if (!size) {
        return res.status(400).json({ message: "Vui lòng chọn kích cỡ!" });
      }
    }

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, products: [], totalPrice: 0 });
    }

    const productIndex = cart.products.findIndex(
      (item) =>
        item.product.toString() === productId &&
        item.color === (color || undefined) &&
        item.size === (size || undefined)
    );

    if (productIndex === -1) {
      cart.products.push({ product: productId, quantity, color, size });
    } else {
      cart.products[productIndex].quantity += quantity;
    }

    cart.totalPrice += product.newprice * quantity;
    await cart.save();

    return res.status(200).json({ message: "Đã thêm sản phẩm vào giỏ", cart });
  } catch (error) {
    console.error("=== LỖI TỔNG TRONG addToCart ===", error);
    next(error);
  }
};

// 🗑️ Xóa sản phẩm khỏi giỏ
export const removeFromCart = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { productId } = req.params;
    let { color, size } = req.query;

    // Chuẩn hóa giá trị
    const normalize = (val) => (val === null || val === undefined ? "" : val);

    color = normalize(color);
    size = normalize(size);

    console.log("[removeFromCart] Request params:", { productId, color, size });
    console.log("[removeFromCart] User ID:", userId);

    const cart = await Cart.findOne({ userId }).populate("products.product");
    if (!cart) {
      console.warn("[removeFromCart] Cart not found for user:", userId);
      return res.status(404).json({ message: "Giỏ hàng không tồn tại" });
    }

    console.log("[removeFromCart] Cart products:", cart.products.map(item => ({
      productId: item.product._id.toString(),
      color: normalize(item.color),
      size: normalize(item.size),
      quantity: item.quantity,
    })));

    const productIndex = cart.products.findIndex(
      (item) =>
        item.product._id.toString() === productId &&
        normalize(item.color) === color &&
        normalize(item.size) === size
    );

    if (productIndex === -1) {
      console.warn("[removeFromCart] Product not found in cart:", { productId, color, size });
      return res.status(404).json({ message: "Sản phẩm không tồn tại trong giỏ" });
    }

    const item = cart.products[productIndex];
    const priceToSubtract = item.priceAtAdd ?? item.product.newprice;

    cart.totalPrice -= priceToSubtract * item.quantity;
    cart.products.splice(productIndex, 1);

    await cart.save();

    console.log("[removeFromCart] Product removed successfully:", item);
    return res.status(200).json({ message: "Xóa sản phẩm khỏi giỏ thành công", cart });
  } catch (error) {
    console.error("[removeFromCart] Error:", error);
    next(error);
  }
};




// 🔁 Cập nhật số lượng
export const updateCartItem = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { productId } = req.params;
    const { quantity, color, size } = req.body;

    if (quantity < 1) {
      return res.status(400).json({ message: "Số lượng phải >= 1" });
    }

    const cart = await Cart.findOne({ userId }).populate("products.product");
    if (!cart)
      return res.status(404).json({ message: "Giỏ hàng không tồn tại" });

    const productIndex = cart.products.findIndex(
      (item) =>
        item.product._id.toString() === productId &&
        item.color === color &&
        item.size === size
    );

    if (productIndex === -1) {
      return res
        .status(404)
        .json({ message: "Sản phẩm không tồn tại trong giỏ" });
    }

    const oldItem = cart.products[productIndex];
    const product = oldItem.product;

    cart.totalPrice -= product.newprice * oldItem.quantity;
    cart.products[productIndex].quantity = quantity;
    cart.totalPrice += product.newprice * quantity;

    await cart.save();

    return res
      .status(200)
      .json({ message: "Cập nhật số lượng thành công", cart });
  } catch (error) {
    next(error);
  }
};

// 💳 Thanh toán (clear giỏ)
export const checkout = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const cart = await Cart.findOne({ userId });
    if (!cart)
      return res.status(404).json({ message: "Giỏ hàng không tồn tại" });

    // Thực hiện logic thanh toán ở đây (ghi log đơn hàng, thanh toán, ...)

    // Xóa sạch giỏ hàng sau khi thanh toán
    cart.products = [];
    cart.totalPrice = 0;

    await cart.save();

    return res.status(200).json({ message: "Thanh toán thành công", cart });
  } catch (error) {
    next(error);
  }
};
