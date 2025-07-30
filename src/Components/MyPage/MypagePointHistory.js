import "../../Styles/Mypage/PointHistory.css";
import Header from "./MPsectionHeader.js";
import { useState } from "react";



const MypagePointHistory = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // 기준: 6개월 전 (최소 날짜)
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

    const isNextMonthAllowed = () => {
      const next = new Date(currentMonth);
      next.setMonth(next.getMonth() + 1);
      return next <= today;
    };


    const isPrevMonthAllowed = () => {
      const prev = new Date(currentMonth);
      prev.setMonth(prev.getMonth() - 1);
      return prev >= minMonth;
    };


  return (
    <div className="My-PointHistory">
      <Header />
    <div className="PointHistory">
    
    <div className="PointHistory-Body">
       <section className="point-summary">
        <h2>보유 포인트</h2>
        <div className="current-point">24P</div>
      </section>

        <section className="month-selector">
          {isPrevMonthAllowed() && (
        <button className="month-nav" onClick={handlePrevMonth}>
          ⬅ 이전 달
        </button>)}
        <span className="current-month">{formatMonth(currentMonth)}</span>
        {isNextMonthAllowed() && (
        <button className="month-nav" onClick={handleNextMonth}>
          다음 달 ➡
        </button>)}
      </section>

      <section className="point-history-list">
        <table className="point-table">
          <thead>
            <tr>
              <th>날짜</th>
              <th>내용</th>
              <th>포인트</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2025-07-13</td>
              <td>재활용 외 2개</td>
              <td>+2P</td>
            </tr>
            <tr>
              <td>2025-07-01</td>
              <td>페트병</td>
              <td>-1P</td>
            </tr>
          </tbody>
        </table>
      </section>
      
      </div>
    </div>
    </div>
  );
};

export default MypagePointHistory;