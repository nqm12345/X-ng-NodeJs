import {
  faClock,
  faMoneyBill1,
  faRotateLeft,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";
import "../../../styles/main_styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Benefit = () => {
  return (
    <div className="benefit">
      <div className="container">
        <div className="row benefit_row">
          <div
            className="col-lg-3 benefit_col"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <div className="benefit_item d-flex flex-row align-items-center">
              <div className="benefit_icon">
                <FontAwesomeIcon icon={faTruck} style={{ color: "#f0334f" }} />
              </div>
              <div className="benefit_content">
                <h6>Miễn phí giao hàng</h6>
                <p>Hỗ trợ giao hàng toàn quốc</p>
              </div>
            </div>
          </div>
          <div
            className="col-lg-3 benefit_col"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <div className="benefit_item d-flex flex-row align-items-center">
              <div className="benefit_icon">
                <FontAwesomeIcon
                  icon={faMoneyBill1}
                  style={{ color: "#f0334f" }}
                />
              </div>
              <div className="benefit_content">
                <h6>Thanh toán khi nhận hàng</h6>
                <p>Đảm bảo an toàn và tiện lợi</p>
              </div>
            </div>
          </div>
          <div
            className="col-lg-3 benefit_col"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <div className="benefit_item d-flex flex-row align-items-center">
              <div className="benefit_icon">
                <FontAwesomeIcon
                  icon={faRotateLeft}
                  style={{ color: "#f0334f" }}
                />
              </div>
              <div className="benefit_content">
                <h6>Đổi trả trong 45 ngày</h6>
                <p>Hỗ trợ hoàn trả dễ dàng</p>
              </div>
            </div>
          </div>
          <div
            className="col-lg-3 benefit_col"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <div className="benefit_item d-flex flex-row align-items-center">
              <div className="benefit_icon">
                <FontAwesomeIcon icon={faClock} style={{ color: "#f0334f" }} />
              </div>
              <div className="benefit_content">
                <h6>Mở cửa cả tuần</h6>
                <p>8 giờ sáng - 9 giờ tối</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Benefit;
