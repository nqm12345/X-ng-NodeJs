import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightToBracket,
  faCartShopping,
  faMagnifyingGlass,
  faUser,
  faUserPlus,
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import "../../../styles/Header.scss";
import { AuthContext, AuthContextType } from "../../contexts/AuthContext";
import { useContext, useState, useRef, useEffect } from "react";
import CartModal from "../CartModal/CartModal";
import instance from "../../api";

interface CartItem {
  product: {
    _id: string;
    title: string;
    image: string;
    newprice: number;
  };
  quantity: number;
  color?: string;  // thêm
  size?: string;   // thêm
}



const Header = () => {
  const { user, logout } = useContext(AuthContext) as AuthContextType;
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

useEffect(() => {
  const handleCartUpdate = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token || !user) return;

    try {
      const res = await instance.get("/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data?.cart?.products) {
        setCartItems(res.data.cart.products);
      }
    } catch (err) {
      console.error("❌ Lỗi cập nhật giỏ hàng:", err);
    }
  };

  // Lắng nghe sự kiện từ Product_details
  window.addEventListener("cartUpdated", handleCartUpdate);

  return () => {
    window.removeEventListener("cartUpdated", handleCartUpdate);
  };
}, [user]);

  const cartItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

useEffect(() => {
  // Nếu chưa đăng nhập thì clear giỏ hàng
  if (!user) {
    setCartItems([]);
    return;
  }

  const token = localStorage.getItem("accessToken");
  if (!token) return;

  const fetchCart = async () => {
    try {
      const res = await instance.get("/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data?.cart?.products) {
        setCartItems(res.data.cart.products);
      } else {
        setCartItems([]);
      }
    } catch (err) {
      console.error("❌ Lỗi lấy giỏ hàng:", err);
      setCartItems([]);
    }
  };

  // 🔹 Gọi ngay khi load trang hoặc khi user thay đổi
  fetchCart();

  // 🔹 Lắng nghe sự kiện cập nhật giỏ hàng từ các component khác
  window.addEventListener("cartUpdated", fetchCart);

  // 🔹 Cleanup khi component unmount
  return () => {
    window.removeEventListener("cartUpdated", fetchCart);
  };
}, [user]);


  const handleCartClick = () => {
    if (user) {
      setIsCartModalOpen(true);
    } else {
      alert("Vui lòng đăng nhập để xem giỏ hàng");
    }
  };

  const handleCartItemsChange = (updatedItems: CartItem[]) => {
    setCartItems(updatedItems);
  };

  return (
    <>
      <header className="header">
        <div className="top_nav">
          <div className="container">
            <div className="top_nav_left">
              MIỄN PHÍ VẬN CHUYỂN CHO TẤT CẢ ĐƠN HÀNG TRÊN 50$
            </div>
          </div>
        </div>

        <div className="main_nav_container">
          <div className="container">
            <div className="nav_content">
              <div className="logo_container">
                <Link to="/">colo<span>shop</span></Link>
              </div>

              <nav className={`navbar_menu ${menuOpen ? "open" : ""}`}>
                <button className="close_btn" onClick={() => setMenuOpen(false)}>
                  <FontAwesomeIcon icon={faXmark} />
                </button>
                <ul>
                  <li><Link to="/">TRANG CHỦ</Link></li>
                  <li><Link to="/shop">CỬA HÀNG</Link></li>
                  <li><Link to="#">KHUYẾN MÃI</Link></li>
                  <li><Link to="#">TRANG PHỤ</Link></li>
                  <li><Link to="#">BLOG</Link></li>
                  <li><Link to="#">LIÊN HỆ</Link></li>

                  {user && (
                    <li className="extra_user">
                      <div className="user_mobile">
                        <img
                          src={user.avatar || "/default-avatar.png"}
                          alt="avatar"
                          className="user_avatar"
                        />
                        <span className="user_name">{user.username}</span>
                        {user.role === "admin" && (
                          <Link to="/admin" className="admin_link">Quản trị</Link>
                        )}
                        <button className="logout_btn" onClick={logout}>Đăng xuất</button>
                      </div>
                    </li>
                  )}
                </ul>
              </nav>

              <div className="navbar_user">
                <FontAwesomeIcon icon={faMagnifyingGlass} className="icon" />

                {user ? (
                  <div className="user_logged_in dropdown" ref={dropdownRef}>
                    <div
                      className="dropdown_toggle"
                      onClick={() => setDropdownOpen(prev => !prev)}
                    >
                      <img
                        src={user.avatar || "/default-avatar.png"}
                        alt="avatar"
                        className="user_avatar"
                      />
                      <span className="user_name">{user.username}</span>
                    </div>
                    {dropdownOpen && (
                      <ul className="dropdown_menu">
                        {user.role === "admin" && (
                          <li><Link to="/admin" className="admin_link">Quản trị</Link></li>
                        )}
                        <li><button className="logout_btn" onClick={logout}>Đăng xuất</button></li>
                      </ul>
                    )}
                  </div>
                ) : (
                  <div className="account">
                    <FontAwesomeIcon icon={faUser} className="icon" />
                    <ul className="account_selection">
                      <li><Link to="/login"><FontAwesomeIcon icon={faArrowRightToBracket} /> Đăng nhập</Link></li>
                      <li><Link to="/register"><FontAwesomeIcon icon={faUserPlus} /> Đăng ký</Link></li>
                    </ul>
                  </div>
                )}

                <div className="cart" onClick={handleCartClick} style={{ cursor: "pointer" }}>
                  <FontAwesomeIcon icon={faCartShopping} className="icon" />
                  {cartItemsCount > 0 && (
                    <span className="checkout_items">{cartItemsCount}</span>
                  )}
                </div>
              </div>

              <div className="hamburger_container" onClick={() => setMenuOpen(true)}>
                <FontAwesomeIcon icon={faBars} />
              </div>
            </div>
          </div>
        </div>
      </header>

      {menuOpen && <div className="menu_overlay" onClick={() => setMenuOpen(false)}></div>}

      {isCartModalOpen && (
        <CartModal
          onClose={() => setIsCartModalOpen(false)}
          items={cartItems.map((item) => ({
            _id: item.product._id,
            name: item.product.title,
            image: item.product.image,
            price: item.product.newprice,
            quantity: item.quantity,
            color: item.color,  // thêm
            size: item.size,    // thêm
          }))}
          onItemsChange={(updatedItems) => {
            handleCartItemsChange(
              updatedItems.map(item => ({
                product: {
                  _id: item._id,
                  title: item.name,
                  image: item.image,
                  newprice: item.price,
                },
                quantity: item.quantity,
                color: item.color, // thêm
                size: item.size,   // thêm
              }))
            );
          }}
        />

      )}
    </>
  );
};

export default Header;
