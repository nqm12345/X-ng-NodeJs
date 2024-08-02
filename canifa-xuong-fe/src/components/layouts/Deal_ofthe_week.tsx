import { useState, useEffect } from 'react';
import "../../../styles/main_styles.css";

const Deal_ofthe_week = () => {
  // Khởi tạo state cho bộ đếm
  const [timeLeft, setTimeLeft] = useState<{ days: number, hours: number, minutes: number, seconds: number }>({
    days: 3,
    hours: 15,
    minutes: 45,
    seconds: 23
  });

  // Hàm tính toán thời gian còn lại
  const calculateTimeLeft = () => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 3);
    targetDate.setHours(15, 45, 23);

    const now = new Date();
    const difference = targetDate.getTime() - now.getTime();

    let timeLeft = {};
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    } else {
      timeLeft = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      };
    }
    return timeLeft;
  };

  // Sử dụng useEffect để cập nhật bộ đếm mỗi giây
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft() as { days: number, hours: number, minutes: number, seconds: number });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="deal_ofthe_week">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <div className="deal_ofthe_week_img">
              <img src="images/deal_ofthe_week.png" alt="" />
            </div>
          </div>
          <div className="col-lg-6 text-right deal_ofthe_week_col">
            <div className="deal_ofthe_week_content d-flex flex-column align-items-center float-right">
              <div className="section_title">
                <h2>Deal Of The Week</h2>
              </div>
              <ul className="timer">
                <li className="d-inline-flex flex-column justify-content-center align-items-center">
                  <div id="day" className="timer_num">{String(timeLeft.days).padStart(2, '0')}</div>
                  <div className="timer_unit">Day</div>
                </li>
                <li className="d-inline-flex flex-column justify-content-center align-items-center">
                  <div id="hour" className="timer_num">{String(timeLeft.hours).padStart(2, '0')}</div>
                  <div className="timer_unit">Hours</div>
                </li>
                <li className="d-inline-flex flex-column justify-content-center align-items-center">
                  <div id="minute" className="timer_num">{String(timeLeft.minutes).padStart(2, '0')}</div>
                  <div className="timer_unit">Mins</div>
                </li>
                <li className="d-inline-flex flex-column justify-content-center align-items-center">
                  <div id="second" className="timer_num">{String(timeLeft.seconds).padStart(2, '0')}</div>
                  <div className="timer_unit">Sec</div>
                </li>
              </ul>
              <div className="red_button deal_ofthe_week_button">
                <a href="#">shop now</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Deal_ofthe_week;
