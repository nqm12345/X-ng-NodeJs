import { useState, useEffect } from 'react';
import "../../../styles/DealOfTheWeek.scss";

const Deal_ofthe_week = () => {
  const [timeLeft, setTimeLeft] = useState<{
    days: number,
    hours: number,
    minutes: number,
    seconds: number
  }>({
    days: 3,
    hours: 15,
    minutes: 45,
    seconds: 23
  });

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

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft() as {
        days: number,
        hours: number,
        minutes: number,
        seconds: number
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="deal_ofthe_week" data-aos="fade-up">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6" data-aos="fade-right" data-aos-delay="200">
            <div className="deal_ofthe_week_img">
              <img src="images/deal_ofthe_week.png" alt="Ưu đãi trong tuần" />
            </div>
          </div>
          <div
            className="col-lg-6 text-right deal_ofthe_week_col"
            data-aos="fade-left"
            data-aos-delay="400"
          >
            <div className="deal_ofthe_week_content d-flex flex-column align-items-center float-right">
              <div className="section_title" data-aos="zoom-in" data-aos-delay="600">
                <h2>Ưu đãi trong tuần</h2>
              </div>
              <ul className="timer" data-aos="zoom-in-up" data-aos-delay="800">
                <li className="d-inline-flex flex-column justify-content-center align-items-center">
                  <div id="day" className="timer_num">{String(timeLeft.days).padStart(2, '0')}</div>
                  <div className="timer_unit">Ngày</div>
                </li>
                <li className="d-inline-flex flex-column justify-content-center align-items-center">
                  <div id="hour" className="timer_num">{String(timeLeft.hours).padStart(2, '0')}</div>
                  <div className="timer_unit">Giờ</div>
                </li>
                <li className="d-inline-flex flex-column justify-content-center align-items-center">
                  <div id="minute" className="timer_num">{String(timeLeft.minutes).padStart(2, '0')}</div>
                  <div className="timer_unit">Phút</div>
                </li>
                <li className="d-inline-flex flex-column justify-content-center align-items-center">
                  <div id="second" className="timer_num">{String(timeLeft.seconds).padStart(2, '0')}</div>
                  <div className="timer_unit">Giây</div>
                </li>
              </ul>
              <div className="red_button deal_ofthe_week_button" data-aos="fade-up" data-aos-delay="1000">
                <a href="#">Mua ngay</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Deal_ofthe_week;
