import "../../styles/single_styles.css";
import "../../styles/single_responsive.css";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faMinus, faPlus, faStar, faTruckFast } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import instance from "../api";
import { Product } from "../interfaces/Product";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useAuth } from "../contexts/AuthContext";

const Product_details = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const [product, setProduct] = useState<Product | null>(null);
  const [mainImage, setMainImage] = useState<string | undefined>(undefined);
  const [selectedThumbnail, setSelectedThumbnail] = useState<string | undefined>(undefined);
  const [activeTab, setActiveTab] = useState<string>("tab_1"); // Thêm state cho tab
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const { user } = useAuth();

  const formatVND = (price?: number) =>
    price ? price.toLocaleString("vi-VN") + "₫" : "";

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await instance.get(`/products/${id}`);
        const current = data.data;
        setProduct(current);
        setMainImage(current.image);
        setSelectedThumbnail(current.image);

        // Fetch all products để lọc liên quan
        const resAll = await instance.get("/products");
        const allProducts: Product[] = resAll.data.data;
        const related = allProducts.filter(
          (p) =>
            p._id !== current._id &&
            p.category?._id === current.category?._id
        );
        setRelatedProducts(related);
      } catch (error) {
        console.error("Failed to fetch product", error);
      }
    };
    fetchProduct();
  }, [id]);


  const handleThumbnailClick = (imageUrl: string) => {
    setMainImage(imageUrl);
    setSelectedThumbnail(imageUrl);
  };

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
  };
  // 👉 Thêm vào đầu file

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

const handleAddToCart = async () => {
  try {
    // ✅ 1. Kiểm tra đăng nhập trước
    const token = localStorage.getItem("accessToken");
    if (!token) {
      toast.warning("Vui lòng đăng nhập để thêm vào giỏ hàng!");
      navigate("/login");
      return;
    }

    // ✅ 2. Kiểm tra chọn màu / size
    const hasColor = product?.color && product.color.length > 0;
    const hasSize = product?.size && product.size.length > 0;

    if (hasColor && hasSize) {
      if (!selectedColor || !selectedSize) {
        toast.warning("Vui lòng chọn màu và kích cỡ!");
        return;
      }
    } else if (!hasColor && hasSize) {
      if (!selectedSize) {
        toast.warning("Vui lòng chọn kích cỡ!");
        return;
      }
    }

    // ✅ 3. Gửi API thêm vào giỏ hàng
    await instance.post(
      "/cart",
      {
        productId: product?._id,
        quantity,
        color: hasColor ? selectedColor : undefined,
        size: hasSize ? selectedSize : undefined,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    toast.success("Đã thêm sản phẩm vào giỏ hàng!");
    window.dispatchEvent(new CustomEvent("cartUpdated"));
  } catch (error) {
    console.error(error);
    toast.error("Lỗi khi thêm vào giỏ hàng.");
  }
};



  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="container single_product_container">
        <div className="row">
          <div className="col">
            {/* Breadcrumbs */}
            <div className="breadcrumbs d-flex flex-row align-items-center">
              <ul>
                <li>
                  <a href="index.html">Trang chủ</a>
                </li>
                <li>
                  <a href="categories.html">
                    <i className="fa fa-angle-right" aria-hidden="true" />
                    {product.category ? product.category.title : "Danh mục"}
                  </a>
                </li>
                <li className="active">
                  <a href="#">
                    <i className="fa fa-angle-right" aria-hidden="true" />
                    Chi tiết sản phẩm
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-7">
            {/* Ảnh sản phẩm */}
            <div className="single_product_pics">
              <div className="row">
                <div className="col-lg-3 thumbnails_col order-lg-1 order-2">
                  <div className="single_product_thumbnails">
                    <ul>
                      {product.image && (
                        <li
                          className={product.image === selectedThumbnail ? "active" : ""}
                          onClick={() => handleThumbnailClick(product.image!)}
                        >
                          <img src={product.image} alt="Ảnh chính" data-image={product.image} />
                        </li>
                      )}
                      {product.thumbnail && product.thumbnail.map((thumb: string, index: number) => (
                        <li
                          key={index}
                          className={thumb === selectedThumbnail ? "active" : ""}
                          onClick={() => handleThumbnailClick(thumb)}
                        >
                          <img src={thumb} alt={`Hình nhỏ ${index + 1}`} data-image={thumb} />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="col-lg-9 image_col order-lg-2 order-1">
                  <div className="single_product_image">
                    <img
                      className="single_product_image_background"
                      style={{ backgroundImage: `url(${mainImage})` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-5">
            <div className="product_details">
              <div className="product_details_title">
                <h2>{product.title}</h2>
                <p>{product.description}</p>
              </div>

              <div className="free_delivery d-flex flex-row align-items-center justify-content-center">
                <span><FontAwesomeIcon icon={faTruckFast} flip="horizontal" /></span>
                <span>Giao hàng miễn phí</span>
              </div>
              <div className="original_price">{formatVND(product.oldprice)}</div>
              <div className="product_price-product-detail">{formatVND(product.newprice)}</div>

              <ul className="star_rating">
                {[...Array(5)].map((_, index) => (
                  <li key={index}>
                    <FontAwesomeIcon icon={faStar} style={{ color: "#FFD43B" }} />
                  </li>
                ))}
              </ul>

              {/* ✅ Thêm các thông tin chi tiết */}
              <div className="product_details_info mt-3">
                {product.brand && <p><strong>Thương hiệu:</strong> {product.brand}</p>}
                {typeof product.stock === "number" && <p><strong>Số lượng còn:</strong> {product.stock}</p>}
                <p>
                  <strong>Trạng thái:</strong>{" "}
                  <span style={{ color: product.status ? "green" : "red" }}>
                    {product.status ? "Còn hàng" : "Hết hàng"}
                  </span>
                </p>
              </div>

              {/* ✅ Màu sắc */}
              {product.color && product.color.length > 0 && (
                <div className="product_color">
                  <span className="label">Chọn màu:</span>
                  <ul className="color_list d-flex gap-2 mt-2">
                    {product.color.map((color, index) => (
                      <li
                        key={index}
                        title={color}
                        onClick={() => setSelectedColor(color)}
                        style={{
                          backgroundColor: color,
                          border: selectedColor === color ? "2px solid #000" : "1px solid #ccc",
                          width: "30px",
                          height: "30px",
                          borderRadius: "50%",
                          cursor: "pointer",
                        }}
                      />
                    ))}
                  </ul>
                </div>
              )}



              {/* ✅ Kích cỡ */}
              {product.size && product.size.length > 0 && (
                <div className="product_size mt-3">
                  <span>Chọn kích cỡ:</span>
                  <ul className="d-flex gap-2 mt-2">
                    {product.size.map((size, index) => (
                      <li
                        key={index}
                        onClick={() => setSelectedSize(size)}
                        style={{
                          border: selectedSize === size ? "2px solid #000" : "1px solid #ccc",
                          padding: "5px 10px",
                          borderRadius: "4px",
                          cursor: "pointer",
                        }}
                      >
                        {size}
                      </li>
                    ))}
                  </ul>
                </div>
              )}


              {/* Số lượng và giỏ hàng */}
              <div className="quantity d-flex flex-column flex-sm-row align-items-sm-center mt-4">
                <span>Số lượng:</span>
                <div className="quantity_selector">
                  <span className="minus" onClick={decreaseQuantity}>
                    <FontAwesomeIcon icon={faMinus} />
                  </span>
                  <span id="quantity_value">{quantity}</span>
                  <span className="plus" onClick={increaseQuantity}>
                    <FontAwesomeIcon icon={faPlus} />
                  </span>
                </div>
                <div className="red_button add_to_cart_button-product-detail" onClick={handleAddToCart}>
                  <a href="#">Thêm vào giỏ</a>
                </div>

                <div className="product_favorite">
                  <FontAwesomeIcon icon={faHeart} beat style={{ color: "#CCC" }} />
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>

      <div className="tabs_section_container">
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="tabs_container">
                <ul className="tabs d-flex flex-sm-row flex-column align-items-left align-items-md-center justify-content-center">
                  <li className={`tab ${activeTab === "tab_1" ? "active" : ""}`} onClick={() => handleTabClick("tab_1")}>
                    <span>Mô tả</span>
                  </li>
                  <li className={`tab ${activeTab === "tab_2" ? "active" : ""}`} onClick={() => handleTabClick("tab_2")}>
                    <span>Thông tin thêm</span>
                  </li>
                  <li className={`tab ${activeTab === "tab_3" ? "active" : ""}`} onClick={() => handleTabClick("tab_3")}>
                    <span>Đánh giá (2)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col">
              {/* Mô tả */}
              <div id="tab_1" className={`tab_container ${activeTab === "tab_1" ? "active" : ""}`}>
                <div className="row">
                  <div className="col-lg-5 desc_col">
                    <div className="tab_title"><h4>Mô tả</h4></div>
                    <div className="tab_text_block">
                      <h2>Áo nỉ cotton có túi</h2>
                      <p>{product.description}</p>
                    </div>
                    <div className="tab_image"><img src={product.thumbnail?.[0]} alt="" /></div>
                    <div className="tab_text_block">
                      <h2>Áo nỉ cotton có túi</h2>
                      <p>{product.description}</p>
                    </div>
                  </div>
                  <div className="col-lg-5 offset-lg-2 desc_col">
                    <div className="tab_image"><img src={product.image} alt="" /></div>
                    <div className="tab_text_block">
                      <h2>Áo nỉ cotton có túi</h2>
                      <p>{product.description}</p>
                    </div>
                    <div className="tab_image desc_last"><img src={product.thumbnail?.[1]} alt="" /></div>
                  </div>
                </div>
              </div>

              {/* Thông tin thêm */}
              <div id="tab_2" className={`tab_container ${activeTab === "tab_2" ? "active" : ""}`}>
                <div className="row">
                  <div className="col additional_info_col">
                    <div className="tab_title additional_info_title"><h4>Thông tin thêm</h4></div>
                    <p>MÀU SẮC: <span>Vàng, Đỏ</span></p>
                    <p>KÍCH CỠ: <span>L, M, XL</span></p>
                  </div>
                </div>
              </div>

              {/* Đánh giá */}
              <div id="tab_3" className={`tab_container ${activeTab === "tab_3" ? "active" : ""}`}>
                <div className="row">
                  <div className="col-lg-6 reviews_col">
                    <div className="tab_title reviews_title"><h4>Đánh giá (2)</h4></div>
                    {[1, 2].map((item, idx) => (
                      <div key={idx} className="user_review_container d-flex flex-column flex-sm-row">
                        <div className="user">
                          <div className="user_pic">
                            <img src={`https://i.pravatar.cc/100?img=${idx + 1}`} alt="avatar" />
                          </div>


                          <div className="user_rating">
                            <ul className="star_rating">
                              {[...Array(5)].map((_, index) => (
                                <li key={index}>
                                  <FontAwesomeIcon icon={faStar} style={{ color: "#FFD43B" }} />
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        <div className="review">
                          <div className="review_date">27 Tháng 8, 2016</div>
                          <div className="user_name">Brandon William</div>
                          <p>
                            Thời gian gần đây tôi đã mua sản phẩm này và rất hài lòng.
                            Thiết kế đẹp, chất lượng tốt và sử dụng dễ dàng.
                            Tôi chắc chắn sẽ giới thiệu cho bạn bè và sẽ mua lại trong tương lai!
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="col-lg-6 add_review_col">
                    <div className="add_review">
                      <form id="review_form" action="post">
                        <div>
                          <h1>Thêm đánh giá</h1>
                          <input className="form_input input_name" type="text" name="name" placeholder="Họ tên*" required />
                          <input className="form_input input_email" type="email" name="email" placeholder="Email*" required />
                        </div>
                        <div>
                          <h1>Đánh giá của bạn:</h1>
                          <ul className="user_star_rating">
                            {[...Array(5)].map((_, index) => (
                              <li key={index}><FontAwesomeIcon icon={faStar} style={{ color: "#FFD43B" }} /></li>
                            ))}
                          </ul>
                          <textarea className="input_review" name="message" placeholder="Nội dung đánh giá" rows={4} required />
                        </div>
                        <div className="text-left text-sm-right">
                          <button type="submit" className="red_button review_submit_btn">Gửi đánh giá</button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              {/* End Review */}
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      <div className="new_arrivals mt-5">
        <div className="container">
          <div className="row">
            <div className="col text-center">
              <div
                className="section_title new_arrivals_title"
                style={{ marginTop: "100px" }}
              >
                <h3>Sản phẩm liên quan</h3>
              </div>

            </div>
          </div>

          <div className="row">
            <div className="col">
              <div className="product-grid" data-isotope='{ "itemSelector": ".product-item", "layoutMode": "fitRows" }'>
                <TransitionGroup component={null}>
                  {relatedProducts.map((product, index) => (
                    <CSSTransition key={product._id} timeout={300} classNames="fade">
                      <div
                        className={`product-item ${product.category ? product.category.title : ""}`}
                        onClick={() => navigate(`/product-detail/${product._id}`)}
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
                              {product.oldprice && <span>{formatVND(product.oldprice)}</span>}
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
        </div>
      </div>

    </>
  );
};

export default Product_details;
