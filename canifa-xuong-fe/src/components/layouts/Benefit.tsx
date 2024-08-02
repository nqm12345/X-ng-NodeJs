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
          <div className="col-lg-3 benefit_col">
            <div className="benefit_item d-flex flex-row align-items-center">
              <div className="benefit_icon">
                <FontAwesomeIcon icon={faTruck} style={{ color: "#f0334f" }} />
              </div>
              <div className="benefit_content">
                <h6>free shipping</h6>
                <p>Suffered Alteration in Some Form</p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 benefit_col">
            <div className="benefit_item d-flex flex-row align-items-center">
              <div className="benefit_icon">
                <FontAwesomeIcon
                  icon={faMoneyBill1}
                  style={{ color: "#f0334f" }}
                />
              </div>
              <div className="benefit_content">
                <h6>cach on delivery</h6>
                <p>The Internet Tend To Repeat</p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 benefit_col">
            <div className="benefit_item d-flex flex-row align-items-center">
              <div className="benefit_icon">
                <FontAwesomeIcon
                  icon={faRotateLeft}
                  style={{ color: "#f0334f" }}
                />
              </div>
              <div className="benefit_content">
                <h6>45 days return</h6>
                <p>Making it Look Like Readable</p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 benefit_col">
            <div className="benefit_item d-flex flex-row align-items-center">
              <div className="benefit_icon">
                <FontAwesomeIcon icon={faClock} style={{ color: "#f0334f" }} />
              </div>
              <div className="benefit_content">
                <h6>opening all week</h6>
                <p>8AM - 09PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Benefit;
