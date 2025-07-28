import React, { useState, useEffect } from "react";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../../styles/DealOfTheWeek.scss";

const Best_Sellers = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  useEffect(() => {
    const updateItemsPerPage = () => {
      const width = window.innerWidth;
      if (width <= 576) setItemsPerPage(1);
      else if (width <= 768) setItemsPerPage(2);
      else if (width <= 992) setItemsPerPage(3);
      else setItemsPerPage(4);
    };

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  const products = [
    { id: 1, name: "Máy ảnh Fujifilm X100T 16 MP (Bạc)", price: 520, oldPrice: 590, image: "images/product_1.png" },
    { id: 2, name: "Màn hình cong Samsung CF591 27 inch FHD", price: 610, image: "images/product_2.png" },
    { id: 3, name: "Micro Blue Yeti USB - Blackout Edition", price: 120, image: "images/product_3.png" },
    { id: 4, name: "Máy in nhãn nhiệt DYMO LabelWriter 450", price: 410, image: "images/product_4.png" },
    { id: 5, name: "Tai nghe Pryma, Vàng hồng & Xám", price: 180, image: "images/product_5.png" },
    { id: 6, name: "Máy ảnh Fujifilm X100T 16 MP (Bạc)", price: 520, oldPrice: 590, image: "images/product_6.png" },
    { id: 7, name: "Màn hình cong Samsung CF591 27 inch FHD", price: 610, image: "images/product_7.png" },
    { id: 8, name: "Micro Blue Yeti USB - Blackout Edition", price: 120, image: "images/product_8.png" },
    { id: 9, name: "Máy in nhãn nhiệt DYMO LabelWriter 450", price: 410, image: "images/product_9.png" },
    { id: 10, name: "Tai nghe Pryma, Vàng hồng & Xám", price: 180, image: "images/product_10.png" }
  ];

  const handleNext = () => {
    if (startIndex < products.length - itemsPerPage) {
      setStartIndex(startIndex + 1);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  return (
    <div className="best_sellers" data-aos="fade-up">
      <div className="container">
        <div className="row">
          <div className="col text-center" data-aos="zoom-in">
            <div className="section_title new_arrivals_title">
              <h2>Sản phẩm bán chạy</h2>
            </div>
          </div>
        </div>
        <div className="row" data-aos="fade-up" data-aos-delay="200">
          <div className="col">
            <div className="product_slider_container">
              <div className="product_slider d-flex">
                {products.slice(startIndex, startIndex + itemsPerPage).map((product, index) => (
                  <div className="product_slider_item" key={product.id} data-aos="fade-up" data-aos-delay={index * 150}>
                    <div className="product-item">
                      <div className="product">
                        <div className="product_image">
                          <img src={product.image} alt={product.name} />
                        </div>
                        <div className="product_info">
                          <h6 className="product_name">
                            <a href="#">{product.name}</a>
                          </h6>
                          <div className="product_price">
                            ${product.price}
                            {product.oldPrice && <span>${product.oldPrice}</span>}
                          </div>
                        </div>
                        <button className="add_to_cart_btn">Thêm vào giỏ hàng</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Nút điều hướng trái/phải */}
              <div
                className="product_slider_nav_left product_slider_nav"
                onClick={handlePrev}
                data-aos="fade-right"
                data-aos-delay="100"
              >
                <FontAwesomeIcon icon={faChevronLeft} />
              </div>
              <div
                className="product_slider_nav_right product_slider_nav"
                onClick={handleNext}
                data-aos="fade-left"
                data-aos-delay="100"
              >
                <FontAwesomeIcon icon={faChevronRight} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Best_Sellers;
