import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightToBracket,
  faCartShopping,
  faMagnifyingGlass,
  faUser,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import "../../../styles/main_styles.css";
import { Link } from "react-router-dom";
import { AuthContext, AuthContextType } from "../../contexts/AuthContext";
import { useContext } from "react";

const Header = () => {
  const { user, logout } = useContext(AuthContext) as AuthContextType;

  return (
    <>
      <header className="header trans_300">
        <div className="top_nav">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <div className="top_nav_left">
                  free shipping on all u.s orders over $50
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="main_nav_container">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-right">
                <div className="logo_container">
                  <a href="#">
                    colo<span>shop</span>
                  </a>
                </div>
                <nav className="navbar">
                  <ul className="navbar_menu">
                    <li>
                      <a href="#">home</a>
                    </li>
                    <li>
                      <a href="#">shop</a>
                    </li>
                    <li>
                      <a href="#">promotion</a>
                    </li>
                    <li>
                      <a href="#">pages</a>
                    </li>
                    <li>
                      <a href="#">blog</a>
                    </li>
                    <li>
                      <a href="contact.html">contact</a>
                    </li>
                  </ul>
                  <ul className="navbar_user">
                    <li>
                      <a href="#">
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                      </a>
                    </li>
                    {user ? (
                      <>
                        <li>
                          <span>Welcome, {user?.email}</span>
                        </li>
                        <li>
                          <button onClick={logout}>Logout</button>
                        </li>
                        {user.role === "admin" && (
                          <li>
                            <Link to="/admin">Admin</Link>
                          </li>
                        )}
                      </>
                    ) : (
                      <>
                        <li className="account">
                          <a href="#">
                            <FontAwesomeIcon icon={faUser} />
                          </a>
                          <ul className="account_selection">
                            <li>
                              <a href="/login">
                                <FontAwesomeIcon icon={faArrowRightToBracket} />
                                Sign In
                              </a>
                            </li>
                            <li>
                              <a href="/register">
                                <FontAwesomeIcon icon={faUserPlus} />
                                Register
                              </a>
                            </li>
                          </ul>
                        </li>
                      </>
                    )}
                    <li className="checkout">
                      <a href="#">
                        <FontAwesomeIcon icon={faCartShopping} />
                        <span id="checkout_items" className="checkout_items">
                          2
                        </span>
                      </a>
                    </li>
                  </ul>
                  <div className="hamburger_container">
                    <i className="fa fa-bars" aria-hidden="true"></i>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="fs_menu_overlay"></div>
    </>
  );
};

export default Header;
