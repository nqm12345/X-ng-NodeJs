import "../../styles/single_styles.css";
import "../../styles/single_responsive.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faMinus, faPlus, faStar, faTruckFast } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import instance from "../api";
import { Product } from "../interfaces/Product";

const Product_details = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [mainImage, setMainImage] = useState<string | undefined>(undefined);
  const [selectedThumbnail, setSelectedThumbnail] = useState<string | undefined>(undefined);
  const [activeTab, setActiveTab] = useState<string>("tab_1"); // Thêm state cho tab

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await instance.get(`/products/${id}`);
        setProduct(data.data);
        if (data.data.image) {
          setMainImage(data.data.image); // Set default main image to the product's main image
          setSelectedThumbnail(data.data.image); // Set the default selected thumbnail
        }
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
                  <a href="index.html">Home</a>
                </li>
                <li>
                  <a href="categories.html">
                    <i className="fa fa-angle-right" aria-hidden="true" />
                    {product.category ? product.category.title : "Category"}
                  </a>
                </li>
                <li className="active">
                  <a href="#">
                    <i className="fa fa-angle-right" aria-hidden="true" />
                    Single Product
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-7">
            <div className="single_product_pics">
              <div className="row">
                <div className="col-lg-3 thumbnails_col order-lg-1 order-2">
                  <div className="single_product_thumbnails">
                    <ul>
                      {/* Default main image */}
                      {product.image && (
                        <li
                          className={product.image === selectedThumbnail ? "active" : ""}
                          onClick={() => handleThumbnailClick(product.image!)}
                        >
                          <img
                            src={product.image}
                            alt="Main"
                            data-image={product.image}
                          />
                        </li>
                      )}
                      {/* Thumbnails from the `thumbnail` array */}
                      {product.thumbnail && product.thumbnail.map((thumb: string, index: number) => (
                        <li
                          key={index}
                          className={thumb === selectedThumbnail ? "active" : ""}
                          onClick={() => handleThumbnailClick(thumb)}
                        >
                          <img
                            src={thumb}
                            alt={`Thumbnail ${index + 1}`}
                            data-image={thumb}
                          />
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
                <span>free delivery</span>
              </div>
              <div className="original_price">${product.oldprice}</div>
              <div className="product_price-product-detail">${product.newprice}</div>
              <ul className="star_rating">
                {[...Array(5)].map((_, index) => (
                  <li key={index}>
                    <FontAwesomeIcon icon={faStar} style={{ color: "#FFD43B" }} />
                  </li>
                ))}
              </ul>
              <div className="product_color">
                <span>Select Color:</span>
                <ul>
                  {/* Add color options if available */}
                  <li style={{ background: "#e54e5d" }} />
                  <li style={{ background: "#252525" }} />
                  <li style={{ background: "#60b3f3" }} />
                </ul>
              </div>
              <div className="quantity d-flex flex-column flex-sm-row align-items-sm-center">
                <span>Quantity:</span>
                <div className="quantity_selector">
                  <span className="minus">
                    <FontAwesomeIcon icon={faMinus} />
                  </span>
                  <span id="quantity_value">1</span>
                  <span className="plus">
                    <FontAwesomeIcon icon={faPlus} />
                  </span>
                </div>
                <div className="red_button add_to_cart_button-product-detail">
                  <a href="#">add to cart</a>
                </div>
                <div className="product_favorite"><FontAwesomeIcon icon={faHeart} beat style={{ color: "#CCC", }} /></div>
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
                  <li className={`tab ${activeTab === "tab_1" ? "active" : ""}`} data-active-tab="tab_1" onClick={() => handleTabClick("tab_1")}>
                    <span>Description</span>
                  </li>
                  <li className={`tab ${activeTab === "tab_2" ? "active" : ""}`} data-active-tab="tab_2" onClick={() => handleTabClick("tab_2")}>
                    <span>Additional Information</span>
                  </li>
                  <li className={`tab ${activeTab === "tab_3" ? "active" : ""}`} data-active-tab="tab_3" onClick={() => handleTabClick("tab_3")}>
                    <span>Reviews (2)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              {/* Tab Description */}
              <div id="tab_1" className={`tab_container ${activeTab === "tab_1" ? "active" : ""}`}>
                <div className="row">
                  <div className="col-lg-5 desc_col">
                    <div className="tab_title">
                      <h4>Description</h4>
                    </div>
                    <div className="tab_text_block">
                      <h2>Pocket cotton sweatshirt</h2>
                      <p>
                        Nam tempus turpis at metus scelerisque placerat nulla
                        deumantos solicitud felis. Pellentesque diam dolor, elementum
                        etos lobortis des mollis ut...
                      </p>
                    </div>
                    <div className="tab_image">
                      <img src={product.thumbnail?.[0]} alt="" />
                    </div>
                    <div className="tab_text_block">
                      <h2>Pocket cotton sweatshirt</h2>
                      <p>
                        {product.description}
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-5 offset-lg-2 desc_col">
                    <div className="tab_image">
                      <img src={product.image} alt="" />
                    </div>
                    <div className="tab_text_block">
                      <h2>Pocket cotton sweatshirt</h2>
                      <p>
                        {product.description}

                      </p>
                    </div>
                    <div className="tab_image desc_last">
                      <img src={product.thumbnail?.[1]} alt="" />

                    </div>
                  </div>
                </div>
              </div>
              {/* Tab Additional Info */}
              <div id="tab_2" className={`tab_container ${activeTab === "tab_2" ? "active" : ""}`}>
                <div className="row">
                  <div className="col additional_info_col">
                    <div className="tab_title additional_info_title">
                      <h4>Additional Information</h4>
                    </div>
                    <p>
                      COLOR:<span>Gold, Red</span>
                    </p>
                    <p>
                      SIZE:<span>L,M,XL</span>
                    </p>
                  </div>
                </div>
              </div>
              {/* Tab Reviews */}
              <div id="tab_3" className={`tab_container ${activeTab === "tab_3" ? "active" : ""}`}>
                <div className="row">
                  <div className="col-lg-6 reviews_col">
                    <div className="tab_title reviews_title">
                      <h4>Reviews (2)</h4>
                    </div>
                    <div className="user_review_container d-flex flex-column flex-sm-row">
                      <div className="user">
                        <div className="user_pic" />
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
                        <div className="review_date">27 Aug 2016</div>
                        <div className="user_name">Brandon William</div>
                        <p>
                          Nam tempus turpis at metus scelerisque placerat nulla deumantos
                          solicitud felis. Pellentesque diam dolor, elementum etos lobortis
                          des mollis ut...
                        </p>
                      </div>
                    </div>
                    <div className="user_review_container d-flex flex-column flex-sm-row">
                      <div className="user">
                        <div className="user_pic" />
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
                        <div className="review_date">27 Aug 2016</div>
                        <div className="user_name">Brandon William</div>
                        <p>
                          Nam tempus turpis at metus scelerisque placerat nulla deumantos
                          solicitud felis. Pellentesque diam dolor, elementum etos lobortis
                          des mollis ut...
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 add_review_col">
                    <div className="add_review">
                      <form id="review_form" action="post">
                        <div>
                          <h1>Add Review</h1>
                          <input
                            id="review_name"
                            className="form_input input_name"
                            type="text"
                            name="name"
                            placeholder="Name*"
                            required
                            data-error="Name is required."
                          />
                          <input
                            id="review_email"
                            className="form_input input_email"
                            type="email"
                            name="email"
                            placeholder="Email*"
                            required
                            data-error="Valid email is required."
                          />
                        </div>
                        <div>
                          <h1>Your Rating:</h1>
                          <ul className="user_star_rating">
                            {[...Array(5)].map((_, index) => (
                              <li key={index}>
                                <FontAwesomeIcon icon={faStar} style={{ color: "#FFD43B" }} />
                              </li>
                            ))}
                          </ul>
                          <textarea
                            id="review_message"
                            className="input_review"
                            name="message"
                            placeholder="Your Review"
                            rows={4}
                            required
                            data-error="Please, leave us a review."
                          />
                        </div>
                        <div className="text-left text-sm-right">
                          <button
                            id="review_submit"
                            type="submit"
                            className="red_button review_submit_btn"
                            value="Submit"
                          >
                            submit
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              {/* Tab Reviews End */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product_details;
