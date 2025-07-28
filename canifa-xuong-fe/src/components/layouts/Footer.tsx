import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../../styles/main_styles.css";
import { faFacebookF } from "@fortawesome/free-brands-svg-icons/faFacebookF";
import {
  faPinterest,
  faSkype,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons/faInstagram";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <>
      {/* Newsletter */}
      <div className="newsletter">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="newsletter_text d-flex flex-column justify-content-center align-items-lg-start align-items-md-center text-center">
                <h4>Bản Tin</h4>
                <p>
                  Đăng ký nhận bản tin và nhận ngay giảm giá 20% cho đơn hàng đầu tiên
                </p>
              </div>
            </div>
            <div className="col-lg-6">
              <form action="post">
                <div className="newsletter_form d-flex flex-md-row flex-column flex-xs-column align-items-center justify-content-lg-end justify-content-center">
                  <input
                    id="newsletter_email"
                    type="email"
                    placeholder="Email của bạn"
                    data-error="Vui lòng nhập email hợp lệ."
                  />
                  <button
                    id="newsletter_submit"
                    type="submit"
                    className="newsletter_submit_btn trans_300"
                    value="Submit"
                  >
                    Đăng ký
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="footer_nav_container d-flex flex-sm-row flex-column align-items-center justify-content-lg-start justify-content-center text-center">
                <ul className="footer_nav">
                  <li>
                    <a href="#">Blog</a>
                  </li>
                  <li>
                    <a href="#">Câu hỏi thường gặp</a>
                  </li>
                  <li>
                    <a href="contact.html">Liên hệ với chúng tôi</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="footer_social d-flex flex-row align-items-center justify-content-lg-end justify-content-center">
                <ul>
                  <li>
                    <a href="#">
                      <FontAwesomeIcon icon={faFacebookF} />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <FontAwesomeIcon icon={faTwitter} />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <FontAwesomeIcon icon={faInstagram} />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <FontAwesomeIcon icon={faSkype} />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <FontAwesomeIcon icon={faPinterest} />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="footer_nav_container">
                <div className="cr">
                  ©2018 Bản quyền thuộc về Colorlib. Thiết kế với{" "}
                  <FontAwesomeIcon icon={faHeart} /> bởi <a href="#">Colorlib</a>{" "}
                  và phân phối bởi{" "}
                  <a href="https://themewagon.com">ThemeWagon</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
