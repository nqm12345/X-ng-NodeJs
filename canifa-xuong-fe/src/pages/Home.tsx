import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../api";
import "../../styles/NewArrivals.scss";
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

  // ✅ Hàm format tiền VNĐ
  const formatVND = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await instance.get("/products");
        setProducts(data.data);
      } catch (error) {
        console.error("Không thể tải sản phẩm", error);
      }
    };
    fetchProducts();
  }, []);

  const filterProducts = () => {
    const now = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(now.getDate() - 30);

    return products
      .filter((product) => {
        // ✅ Kiểm tra createdAt
        if (!product.createdAt) return false;
        const createdDate = new Date(product.createdAt);
        return !isNaN(createdDate.getTime()) && createdDate >= sevenDaysAgo;
      })
      .filter((product) => {
        // ✅ Lọc theo category
        if (!product.category) return false;

        const categoryTitle =
          typeof product.category === "string"
            ? product.category
            : product.category.title;

        if (selectedCategory === "all") {
          return categoryTitle !== "Chưa phân loại";
        }
        const isWomen = selectedCategory === "women";
        return categoryTitle.includes(isWomen ? "Thời trang nữ" : "Thời trang nam");
      })
      .filter((product) => {
        // ✅ Lọc theo từ khóa và giá
        const titleMatches = product.title
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        const priceMatches =
          product.newprice >= minPrice && product.newprice <= maxPrice;
        return titleMatches && priceMatches;
      });
  };

  const handleProductClick = (productId: string) => {
    navigate(`/product-detail/${productId}`);
  };

  return (
    <div className="new_arrivals">
      <div className="container">
        <div className="row">
          <div className="col text-center">
            <div
              className="section_title new_arrivals_title"
              data-aos="fade-up"
            >
              <h2>Sản phẩm mới</h2>
            </div>
          </div>
        </div>

        {/* Bộ lọc */}
        <div className="row align-items-center">
          <div className="col text-center">
            <div
              className="new_arrivals_sorting"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <ul className="arrivals_grid_sorting clearfix button-group filters-button-group">
                <li
                  className={`grid_sorting_button button d-flex flex-column justify-content-center align-items-center ${
                    selectedCategory === "all" ? "active is-checked" : ""
                  }`}
                  onClick={() => setSelectedCategory("all")}
                >
                  Tất cả
                </li>
                <li
                  className={`grid_sorting_button button d-flex flex-column justify-content-center align-items-center ${
                    selectedCategory === "women" ? "active is-checked" : ""
                  }`}
                  onClick={() => setSelectedCategory("women")}
                >
                  Thời trang nữ
                </li>
                <li
                  className={`grid_sorting_button button d-flex flex-column justify-content-center align-items-center ${
                    selectedCategory === "men" ? "active is-checked" : ""
                  }`}
                  onClick={() => setSelectedCategory("men")}
                >
                  Thời trang nam
                </li>
              </ul>

              {/* Ô tìm kiếm và lọc giá */}
              <div
                className="filter-section"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <input
                  type="text"
                  placeholder="Tìm kiếm theo tên sản phẩm"
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

        {/* Danh sách sản phẩm */}
        <div className="row">
          <div className="col">
            <div
              className="product-grid"
              data-isotope='{ "itemSelector": ".product-item", "layoutMode": "fitRows" }'
            >
              <TransitionGroup component={null}>
                {filterProducts().map((product, index) => (
                  <CSSTransition
                    key={product._id}
                    timeout={300}
                    classNames="fade"
                  >
                    <div
                      className={`product-item ${
                        product.category
                          ? typeof product.category === "string"
                            ? product.category
                            : product.category.title
                          : ""
                      }`}
                      onClick={() => handleProductClick(product._id!)}
                      data-aos="zoom-in"
                      data-aos-delay={index * 100}
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
                            {formatVND(product.newprice)}
                            {product.oldprice && (
                              <span>{formatVND(product.oldprice)}</span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="red_button add_to_cart_button">
                        <a href="#">Xem chi tiết</a>
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
