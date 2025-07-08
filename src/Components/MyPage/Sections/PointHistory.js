import "./PointHistory.css";



const PointHistory = () => {
  return (
    <div className="History-back">
         <section className="point-history-section">
        <div className="point-box">
          <p>환경 신청 포인트</p>
          <strong>1P</strong>
        </div>
        <div className="point-box">
          <p>환경 완료 리워드</p>
          <strong>1P</strong>
        </div>
        <button className="check-history-button">환전내역</button>
      </section>
    </div>

     );
};
   
export default PointHistory;