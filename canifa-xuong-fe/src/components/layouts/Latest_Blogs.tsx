import "../../../styles/main_styles.css";

const Latest_Blogs = () => {
  return (
    <div>
      <div className="blogs" data-aos="fade-up">
        <div className="container">
          <div className="row">
            <div className="col text-center" data-aos="fade-up" data-aos-delay="100">
              <div className="section_title">
                <h2>Blog Mới Nhất</h2>
              </div>
            </div>
          </div>
          <div className="row blogs_container">
            <div className="col-lg-4 blog_item_col" data-aos="zoom-in" data-aos-delay="200">
              <div className="blog_item">
                <div
                  className="blog_background"
                  style={{ backgroundImage: "url(images/blog_1.jpg)" }}
                />
                <div className="blog_content d-flex flex-column align-items-center justify-content-center text-center">
                  <h4 className="blog_title">
                    Đây là những xu hướng tôi thấy sẽ đến vào mùa thu này
                  </h4>
                  <span className="blog_meta">bởi quản trị viên | 01 Tháng 12, 2017</span>
                  <a className="blog_more" href="#">
                    Đọc thêm
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 blog_item_col" data-aos="zoom-in" data-aos-delay="400">
              <div className="blog_item">
                <div
                  className="blog_background"
                  style={{ backgroundImage: "url(images/blog_2.jpg)" }}
                />
                <div className="blog_content d-flex flex-column align-items-center justify-content-center text-center">
                  <h4 className="blog_title">
                    Đây là những xu hướng tôi thấy sẽ đến vào mùa thu này
                  </h4>
                  <span className="blog_meta">bởi quản trị viên | 01 Tháng 12, 2017</span>
                  <a className="blog_more" href="#">
                    Đọc thêm
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 blog_item_col" data-aos="zoom-in" data-aos-delay="600">
              <div className="blog_item">
                <div
                  className="blog_background"
                  style={{ backgroundImage: "url(images/blog_3.jpg)" }}
                />
                <div className="blog_content d-flex flex-column align-items-center justify-content-center text-center">
                  <h4 className="blog_title">
                    Đây là những xu hướng tôi thấy sẽ đến vào mùa thu này
                  </h4>
                  <span className="blog_meta">bởi quản trị viên | 01 Tháng 12, 2017</span>
                  <a className="blog_more" href="#">
                    Đọc thêm
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>    
    </div>
  );
};

export default Latest_Blogs;
