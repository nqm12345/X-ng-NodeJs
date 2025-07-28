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
import { Link } from "react-router-dom";
import "../../../styles/Header.scss";
import { AuthContext, AuthContextType } from "../../contexts/AuthContext";
import { useContext, useState, useRef, useEffect } from "react";

const Header = () => {
  const { user, logout } = useContext(AuthContext) as AuthContextType;
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Ẩn dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
                  <div
                    className="user_logged_in dropdown"
                    ref={dropdownRef}
                  >
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
                          <li>
                            <Link to="/admin" className="admin_link">Quản trị</Link>
                          </li>
                        )}
                        <li>
                          <button className="logout_btn" onClick={logout}>Đăng xuất</button>
                        </li>
                      </ul>
                    )}
                  </div>
                ) : (
                  <div className="account">
                    <FontAwesomeIcon icon={faUser} className="icon" />
                    <ul className="account_selection">
                      <li>
                        <Link to="/login">
                          <FontAwesomeIcon icon={faArrowRightToBracket} /> Đăng nhập
                        </Link>
                      </li>
                      <li>
                        <Link to="/register">
                          <FontAwesomeIcon icon={faUserPlus} /> Đăng ký
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}

                <div className="cart">
                  <FontAwesomeIcon icon={faCartShopping} className="icon" />
                  <span className="checkout_items">2</span>
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
    </>
  );
};

export default Header;
