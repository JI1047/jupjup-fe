import "./PointExchange.css";
import { useNavigate } from "react-router-dom";

const PointExchange = () => {
  const navigate = useNavigate();

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
        <div className="Exchange-buttons">
        <button >환전신청</button>
        <button onClick={() => navigate("/MyPage/ExchangeHistory")}>환전내역</button>
        </div>
      </section>
    </div>

     );
};
   
export default PointExchange;