import "./PointExchange.css";
import { useNavigate } from "react-router-dom";

const PointExchange = () => {
  const navigate = useNavigate();

  return (
    <div className="History-back">
      <section className="point-history-section">
        <h3 className="section-title">빠른 메뉴</h3>
        <div className="quick-menu-buttons">
          <button
            className="menu-btn"
            onClick={() => navigate("/MyPage/pointHistory")}
          >
            포인트 내역
          </button>
          <button
            className="menu-btn"
            onClick={() => navigate("/MyPage/ExchangeRequest")}
          >
            환전
            <br />
            신청
          </button>
          <button
            className="menu-btn"
            onClick={() => navigate("/MyPage/ExchangeHistory")}
          >
            환전
            <br />
            내역
          </button>
        </div>
      </section>
    </div>
  );
};

export default PointExchange;
