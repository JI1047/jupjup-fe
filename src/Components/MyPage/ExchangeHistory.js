import "../../Styles/Mypage/ExchangeHistory.css";
import Header from "./MPsectionHeader.js";
import { useState } from "react";


const ExchangeHistory = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const minMonth = new Date(today.getFullYear(), today.getMonth() - 5, 1);

  const handlePrevMonth = () => {
    const prev = new Date(currentMonth);
    prev.setMonth(prev.getMonth() - 1);
    if (prev >= minMonth) setCurrentMonth(prev);
  };

  const handleNextMonth = () => {
    const next = new Date(currentMonth);
    next.setMonth(next.getMonth() + 1);
    if (next <= today) setCurrentMonth(next);
  };

  const formatMonth = (date) =>
    `${date.getFullYear()}년 ${String(date.getMonth() + 1).padStart(2, "0")}월`;


  return (
    <div className="ExchangeHistory">
       <Header />
        <div className="Exchange">
    <div className="Exchange-body">

        <section className="exchange-form">
        <h2>환전 내역</h2>

        <div className="month-selector">
          <button className="month-nav" onClick={handlePrevMonth}>
            ⬅ 이전 달
          </button>
          <span className="current-month">{formatMonth(currentMonth)}</span>
          {new Date(currentMonth).getMonth() < today.getMonth() && (
            <button className="month-nav" onClick={handleNextMonth}>
              다음 달 ➡
            </button>
          )}
        </div>

        <table className="exchange-table">
          <thead>
            <tr>
              <th>날짜</th>
              <th>신청 금액</th>
              <th>상태</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2025-07-13</td>
              <td>5,000P</td>
              <td>완료</td>
            </tr>
            <tr>
              <td>2025-07-01</td>
              <td>3,000P</td>
              <td>진행 중</td>
            </tr>
          </tbody>
        </table>
      </section>

        </div>
        </div>
    </div>

     );
};
   
export default ExchangeHistory