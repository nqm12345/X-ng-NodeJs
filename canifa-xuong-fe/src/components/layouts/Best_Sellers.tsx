import React, { useState } from "react";
import "../../../styles/main_styles.css";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Best_Sellers = () => {
  const [startIndex, setStartIndex] = useState(0);

  const products = [
    { id: 1, name: "Fujifilm X100T 16 MP Digital Camera (Silver)", price: 520, oldPrice: 590, image: "images/product_1.png" },
    { id: 2, name: "Samsung CF591 Series Curved 27-Inch FHD Monitor", price: 610, image: "images/product_2.png" },
    { id: 3, name: "Blue Yeti USB Microphone Blackout Edition", price: 120, image: "images/product_3.png" },
    { id: 4, name: "DYMO LabelWriter 450 Turbo Thermal Label Printer", price: 410, image: "images/product_4.png" },
    { id: 5, name: "Pryma Headphones, Rose Gold & Grey", price: 180, image: "images/product_5.png" },
    { id: 6, name: "Fujifilm X100T 16 MP Digital Camera (Silver)", price: 520, oldPrice: 590, image: "images/product_6.png" },
    { id: 7, name: "Samsung CF591 Series Curved 27-Inch FHD Monitor", price: 610, image: "images/product_7.png" },
    { id: 8, name: "Blue Yeti USB Microphone Blackout Edition", price: 120, image: "images/product_8.png" },
    { id: 9, name: "DYMO LabelWriter 450 Turbo Thermal Label Printer", price: 410, image: "images/product_9.png" },
    { id: 10, name: "Pryma Headphones, Rose Gold & Grey", price: 180, image: "images/product_10.png" }
  ];

  const handleNext = () => {
    if (startIndex < products.length - 5) {
      setStartIndex(startIndex + 1);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  return (
    <div className="best_sellers">
      <div className="container">
        <div className="row">
          <div className="col text-center">
            <div className="section_title new_arrivals_title">
              <h2>Best Sellers</h2>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="product_slider_container">
              <div className="product_slider">
                {products.slice(startIndex, startIndex + 5).map((product, index) => (
                  <div className="product_slider_item" key={index}>
                    <div className="product-item">
                      <div className="product">
                        <div className="product_image">
                          <img src={product.image} alt={product.name} />
                        </div>
                        <div className="favorite" />
                        <div className="product_info">
                          <h6 className="product_name">
                            <a href="single.html">{product.name}</a>
                          </h6>
                          <div className="product_price">
                            ${product.price}
                            {product.oldPrice && <span>${product.oldPrice}</span>}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="product_slider_nav_left product_slider_nav d-flex align-items-center justify-content-center flex-column" onClick={handlePrev}>
              <FontAwesomeIcon icon={faChevronLeft} style={{color: "#ffffff",}} />
              </div>
              <div className="product_slider_nav_right product_slider_nav d-flex align-items-center justify-content-center flex-column" onClick={handleNext}>
              <FontAwesomeIcon icon={faChevronRight} style={{color: "#ffffff",}}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Best_Sellers;
