import "./PointExchange.css";
import { useNavigate } from "react-router-dom";

const PointExchange = () => {
  const navigate = useNavigate();

  return (
    <div className="History-back">
      <section className="point-history-section">
        
        <div className="point-box2">
          <div>
            <p>환경 신청 포인트</p>
            <strong>43P</strong>
          </div>
          <div>
            <p>환경 완료 리워드</p>
            <strong>97P</strong>
          </div>
        </div>

        <div className="Exchange-buttons2">
          <button onClick={() => navigate("/MyPage/ExchangeRequest")}>환전신청</button>
          <button onClick={() => navigate("/MyPage/ExchangeHistory")}>환전내역</button>
        </div>
      </section>
    </div>

  );
};

export default PointExchange;