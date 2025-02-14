import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../api";
import "../../styles/main_styles.css";
import { Product } from "../interfaces/Product";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "../../styles/animations.css"; // Thêm file CSS chứa các hiệu ứng

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(1000);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await instance.get("/products");
        setProducts(data.data);
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
    };
    fetchProducts();
  }, []);

  const filterProducts = () => {
    return products
      .filter(
        (product) =>
          product.category &&
          (selectedCategory === "all"
            ? product.category.title !== "Chưa phân loại"
            : product.category.title.includes(
                selectedCategory === "women" ? "Thời trang nữ" : "Thời trang nam"
              ))
      )
      .filter(
        (product) =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
          product.newprice >= minPrice &&
          product.newprice <= maxPrice
      );
  };

  const handleProductClick = (productId: string) => {
    navigate(`/product-detail/${productId}`);
  };

  return (
    <div className="new_arrivals">
      <div className="container">
        <div className="row">
          <div className="col text-center">
            <div className="section_title new_arrivals_title">
              <h2>New Arrivals</h2>
            </div>
          </div>
        </div>
        <div className="row align-items-center">
          <div className="col text-center">
            <div className="new_arrivals_sorting">
              <ul className="arrivals_grid_sorting clearfix button-group filters-button-group">
                <li
                  className={`grid_sorting_button button d-flex flex-column justify-content-center align-items-center ${
                    selectedCategory === "all" ? "active is-checked" : ""
                  }`}
                  onClick={() => setSelectedCategory("all")}
                >
                  all
                </li>
                <li
                  className={`grid_sorting_button button d-flex flex-column justify-content-center align-items-center ${
                    selectedCategory === "women" ? "active is-checked" : ""
                  }`}
                  onClick={() => setSelectedCategory("women")}
                >
                  women's
                </li>
                <li
                  className={`grid_sorting_button button d-flex flex-column justify-content-center align-items-center ${
                    selectedCategory === "men" ? "active is-checked" : ""
                  }`}
                  onClick={() => setSelectedCategory("men")}
                >
                  men's
                </li>
              </ul>
              <div className="filter-section">
                <input
                  type="text"
                  placeholder="Search by product name"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
                <div className="price-filter">
                  <input
                    type="number"
                    value={minPrice}
                    onChange={(e) => setMinPrice(Number(e.target.value))}
                    className="price-input"
                    min="0"
                    max={maxPrice}
                  />
                  <span>-</span>
                  <input
                    type="number"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="price-input"
                    min={minPrice}
                    max="10000"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div
              className="product-grid"
              data-isotope='{ "itemSelector": ".product-item", "layoutMode": "fitRows" }'
            >
              <TransitionGroup component={null}>
                {filterProducts().map((product) => (
                  <CSSTransition
                    key={product._id}
                    timeout={300}
                    classNames="fade"
                  >
                    <div
                      key={product._id}
                      className={`product-item ${
                        product.category ? product.category.title : ""
                      }`}
                      onClick={() => handleProductClick(product._id!)}
                    >
                      <div className="product product_filter">
                        <div className="product_image">
                          <img src={product.image} alt={product.title} />
                        </div>
                        <div className="favorite favorite_left"></div>
                        <div className="product_info">
                          <h6 className="product_name">
                            <a href="#">{product.title}</a>
                          </h6>
                          <div className="product_price">
                            ${product.newprice} <span>${product.oldprice}</span>
                          </div>
                        </div>
                      </div>
                      <div className="red_button add_to_cart_button">
                        <a href="#">add to cart</a>
                      </div>
                    </div>
                  </CSSTransition>
                ))}
              </TransitionGroup>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
