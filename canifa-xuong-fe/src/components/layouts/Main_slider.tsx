import "../../../styles/MainSlider.scss";

const Main_slider = () => {
  return (
    <>
      <div
        className="main_slider"
        style={{ backgroundImage: "url(images/slider_1.jpg)" }}
      >
        <div className="container fill_height">
          <div className="row align-items-center fill_height">
            <div className="col">
              <div
                className="main_slider_content"
                data-aos="fade-up"
                data-aos-duration="1000"
              >
                <h6 data-aos="fade-down" data-aos-delay="200">Bộ sưu tập Xuân / Hè 2017</h6>
                <h1 data-aos="fade-up" data-aos-delay="400">Giảm đến 30% cho Hàng Mới Về</h1>
                <div
                  className="red_button shop_now_button"
                  data-aos="zoom-in"
                  data-aos-delay="600"
                >
                  <a href="#">mua ngay</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="banner">
        <div className="container">
          <div className="row">
            <div
              className="col-md-4"
              data-aos="fade-right"
              data-aos-duration="800"
            >
              <div
                className="banner_item align-items-center"
                style={{ backgroundImage: "url(images/banner_1.jpg)" }}
              >
                <div className="banner_category">
                  <a href="categories.html">thời trang nữ</a>
                </div>
              </div>
            </div>
            <div
              className="col-md-4"
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-delay="200"
            >
              <div
                className="banner_item align-items-center"
                style={{ backgroundImage: "url(images/banner_2.jpg)" }}
              >
                <div className="banner_category">
                  <a href="categories.html">phụ kiện</a>
                </div>
              </div>
            </div>
            <div
              className="col-md-4"
              data-aos="fade-left"
              data-aos-duration="800"
              data-aos-delay="400"
            >
              <div
                className="banner_item align-items-center"
                style={{ backgroundImage: "url(images/banner_3.jpg)" }}
              >
                <div className="banner_category">
                  <a href="categories.html">thời trang nam</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main_slider;
