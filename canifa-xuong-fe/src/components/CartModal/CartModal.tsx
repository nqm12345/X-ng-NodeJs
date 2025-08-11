import { useState } from "react";
import "./CartModal.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import instance from "../../api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface CartItem {
  _id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  color?: string;
  size?: string;
}

interface CartModalProps {
  onClose: () => void;
  items: CartItem[];
  onItemsChange: (updatedItems: CartItem[]) => void;
}

const CartModal: React.FC<CartModalProps> = ({ onClose, items: initialItems, onItemsChange }) => {
  const [items, setItems] = useState<CartItem[]>(initialItems);
  const [shippingFee, setShippingFee] = useState<number>(0); // 💡 phí giao hàng

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const grandTotal = total + shippingFee; // 💡 tổng cuối cùng

  const getItemKey = (item: CartItem) =>
    `${item._id}-${item.color ?? "no-color"}-${item.size ?? "no-size"}`;

  const handleIncrease = async (id: string, color?: string, size?: string) => {
    try {
      const updated = items.map(item =>
        item._id === id && item.color === color && item.size === size
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setItems(updated);
      onItemsChange(updated);

      const updatedItem = updated.find(i => i._id === id && i.color === color && i.size === size);
      if (!updatedItem) return;

      await instance.put(`/cart/update-cart/${id}`, {
        quantity: updatedItem.quantity,
        color: color ?? updatedItem.color,
        size: size ?? updatedItem.size,
      });
    } catch (error) {
      console.error("Không thể tăng số lượng:", error);
      toast.error("Không thể tăng số lượng sản phẩm.");
    }
  };

  const handleDecrease = async (id: string, color?: string, size?: string) => {
    try {
      const current = items.find(i => i._id === id && i.color === color && i.size === size);
      if (!current || current.quantity <= 1) return;

      const updated = items.map(item =>
        item._id === id && item.color === color && item.size === size
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
      setItems(updated);
      onItemsChange(updated);

      const updatedItem = updated.find(i => i._id === id && i.color === color && i.size === size);
      if (!updatedItem) return;

      await instance.put(`/cart/update-cart/${id}`, {
        quantity: updatedItem.quantity,
        color: color ?? updatedItem.color,
        size: size ?? updatedItem.size,
      });
    } catch (error) {
      console.error("Không thể giảm số lượng:", error);
      toast.error("Không thể giảm số lượng sản phẩm.");
    }
  };

  const handleDelete = async (productId: string, color?: string, size?: string) => {
    try {
      await instance.delete(`/cart/remove-cart/${productId}`, {
        params: {
          color: color && color.trim() !== "" ? color : undefined,
          size: size && size.trim() !== "" ? size : undefined,
        }
      });

      const updated = items.filter(item => {
        const sameId = item._id === productId;
        const sameColor = (item.color || "") === (color || "");
        const sameSize = (item.size || "") === (size || "");
        return !(sameId && sameColor && sameSize);
      });

      setItems(updated);
      onItemsChange(updated);

      toast.success("Xóa sản phẩm khỏi giỏ hàng thành công!");
    } catch (error) {
      console.error("Không thể xóa sản phẩm:", error);
      toast.error("Không thể xóa sản phẩm. Vui lòng thử lại.");
    }
  };

  // 💡 Xử lý thay đổi phương thức giao hàng
  const handleShippingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === "fast") {
      setShippingFee(20000);
    } else {
      setShippingFee(0);
    }
  };

  return (
    <div className="cart-modal-overlay" onClick={onClose}>
      <div className="cart-modal" onClick={(e) => e.stopPropagation()}>
        <div className="cart-content">
          <div className="cart-left">
            <div className="cart-header">
              <h2><FontAwesomeIcon icon={faCartShopping} /> Giỏ hàng</h2>
              <span>{items.length} sản phẩm</span>
            </div>

            {items.length === 0 ? (
              <p className="empty-text">Giỏ hàng của bạn đang trống.</p>
            ) : (
              <ul className="cart-items">
                {items.map((item) => (
                  <li key={getItemKey(item)} className="cart-item">
                    <img src={item.image} alt={item.name} />
                    <div className="item-details">
                      <h4>{item.name}</h4>
                      {item.color && <p>Màu: {item.color}</p>}
                      {item.size && <p>Kích cỡ: {item.size}</p>}
                      <div className="quantity-control">
                        <button onClick={() => handleDecrease(item._id, item.color, item.size)}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => handleIncrease(item._id, item.color, item.size)}>+</button>
                      </div>
                      <p>{(item.price * item.quantity).toLocaleString()} đ</p>
                    </div>
                    <button className="remove-btn" onClick={() => handleDelete(item._id, item.color, item.size)}>×</button>
                  </li>
                ))}
              </ul>
            )}

            <a className="back-link" href="#">← Quay lại mua sắm</a>
          </div>

          <div className="cart-right">
            <h3>Tóm tắt đơn hàng</h3>
            <div className="summary-row">
              <span>SỐ LƯỢNG: {items.length}</span>
              <span>{total.toLocaleString()} đ</span>
            </div>
            <div className="summary-row">
              <label>HÌNH THỨC GIAO HÀNG</label>
              <select onChange={handleShippingChange}>
                <option value="standard">Giao hàng tiêu chuẩn - 0 đ</option>
                <option value="fast">Giao hàng nhanh - 20.000 đ</option>
              </select>
            </div>
            <div className="summary-row">
              <label>MÃ GIẢM GIÁ</label>
              <input type="text" placeholder="Nhập mã của bạn" />
            </div>
            <div className="summary-row total-price">
              <span>TỔNG TIỀN</span>
              <span>{grandTotal.toLocaleString()} đ</span>
            </div>
            <button className="checkout-btn">THANH TOÁN</button>
          </div>
        </div>

        <button className="close-btn" onClick={onClose}>×</button>
      </div>
    </div>
  );
};

export default CartModal;
