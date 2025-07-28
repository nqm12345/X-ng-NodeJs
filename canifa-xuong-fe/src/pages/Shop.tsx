import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../api";
import "../../styles/NewArrivals.scss";
import { Product } from "../interfaces/Product";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "../../styles/animations.css";
import ReactPaginate from "react-paginate";

const Shop = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(1000);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const productsPerPage = 8;
  const navigate = useNavigate();

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

  useEffect(() => {
    setCurrentPage(0);
  }, [selectedCategory, searchTerm, minPrice, maxPrice]);

  const filterProducts = () => {
    return products
      .filter((product) => {
        if (!product.category) return false;
        if (selectedCategory === "all") {
          return product.category.title !== "Chưa phân loại";
        }
        const isWomen = selectedCategory === "women";
        return product.category.title.includes(isWomen ? "Thời trang nữ" : "Thời trang nam");
      })
      .filter((product) => {
        const titleMatches = product.title.toLowerCase().includes(searchTerm.toLowerCase());
        const priceMatches = product.newprice >= minPrice && product.newprice <= maxPrice;
        return titleMatches && priceMatches;
      });
  };

  const filteredProducts = filterProducts();
  const pageCount = Math.ceil(filteredProducts.length / productsPerPage);
  const offset = currentPage * productsPerPage;
  const displayedProducts = filteredProducts.slice(offset, offset + productsPerPage);

  const handlePageClick = (data: { selected: number }) => {
    setCurrentPage(data.selected);
  };

  const handleProductClick = (productId: string) => {
    navigate(`/product-detail/${productId}`);
  };

  return (
    <div className="new_arrivals">
      <div className="container">
        <div className="row">
          <div className="col text-center">
            <div className="section_title new_arrivals_title" data-aos="fade-up">
              <h2 style={{ marginTop: "150px" }}>Sản phẩm</h2>
            </div>
          </div>
        </div>

        <div className="row align-items-center">
          <div className="col text-center">
            <div className="new_arrivals_sorting" data-aos="fade-up" data-aos-delay="100">
              <ul className="arrivals_grid_sorting clearfix button-group filters-button-group">
                {["all", "women", "men"].map((category) => (
                  <li
                    key={category}
                    className={`grid_sorting_button button d-flex flex-column justify-content-center align-items-center ${
                      selectedCategory === category ? "active is-checked" : ""
                    }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category === "all"
                      ? "Tất cả"
                      : category === "women"
                      ? "Thời trang nữ"
                      : "Thời trang nam"}
                  </li>
                ))}
              </ul>
              <div className="filter-section" data-aos="fade-up" data-aos-delay="200">
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

        <div className="row">
          <div className="col">
            <div className="product-grid" data-isotope='{ "itemSelector": ".product-item", "layoutMode": "fitRows" }'>
              <TransitionGroup component={null}>
                {displayedProducts.map((product, index) => (
                  <CSSTransition key={product._id} timeout={300} classNames="fade">
                    <div
                      className={`product-item ${product.category ? product.category.title : ""}`}
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
                            ${product.newprice}
                            {product.oldprice && <span>${product.oldprice}</span>}
                          </div>
                        </div>
                      </div>
                      <div className="red_button add_to_cart_button">
                        <a href="#">Thêm vào giỏ</a>
                      </div>
                    </div>
                  </CSSTransition>
                ))}
              </TransitionGroup>
            </div>
          </div>
        </div>

        {pageCount > 1 && (
          <div className="pagination-wrapper mt-4 d-flex justify-content-center">
            <ReactPaginate
              previousLabel={"←"}
              nextLabel={"→"}
              breakLabel={"..."}
              pageCount={pageCount}
              marginPagesDisplayed={1}
              pageRangeDisplayed={3}
              onPageChange={handlePageClick}
              containerClassName={"pagination"}
              activeClassName={"active"}
              pageClassName={"page-item"}
              previousClassName={"page-item"}
              nextClassName={"page-item"}
              breakClassName={"page-item"}
              pageLinkClassName={"page-link"}
              previousLinkClassName={"page-link"}
              nextLinkClassName={"page-link"}
              breakLinkClassName={"page-link"}
              forcePage={currentPage}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
