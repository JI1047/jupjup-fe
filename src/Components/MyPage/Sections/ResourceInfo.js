import "./ResourceInfo.css";
import { useNavigate } from "react-router-dom";

const ResourceInfo = () => {
  return (
    <div className="ResourceInfo">
      <section className="point-history">
        <h3 className="section-title">안내</h3>
        <div className="info-content">
          <p>포인트는 재활용품 수거를 통해 적립됩니다.</p>
          <p>일정 포인트 이상 모으면 환전 신청이 가능합니다.</p>
        </div>
      </section>
    </div>
  );
};

export default ResourceInfo;
