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


      <div className="newsletter">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="newsletter_text d-flex flex-column justify-content-center align-items-lg-start align-items-md-center text-center">
                <h4>Newsletter</h4>
                <p>
                  Subscribe to our newsletter and get 20% off your first
                  purchase
                </p>
              </div>
            </div>
            <div className="col-lg-6">
              <form action="post">
                <div className="newsletter_form d-flex flex-md-row flex-column flex-xs-column align-items-center justify-content-lg-end justify-content-center">
                  <input
                    id="newsletter_email"
                    type="email"
                    placeholder="Your email"
                    data-error="Valid email is required."
                  />
                  <button
                    id="newsletter_submit"
                    type="submit"
                    className="newsletter_submit_btn trans_300"
                    value="Submit"
                  >
                    subscribe
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
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
                    <a href="#">FAQs</a>
                  </li>
                  <li>
                    <a href="contact.html">Contact us</a>
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
                  ©2018 All Rights Reserverd. Made with{" "}
                  <FontAwesomeIcon icon={faHeart} /> by <a href="#">Colorlib</a>{" "}
                  &amp; distributed by{" "}
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
