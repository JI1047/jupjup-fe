import "./ResourceInfo.css";
import { useNavigate } from "react-router-dom";


const ResourceInfo = () => {
  const navigate = useNavigate();

  return (
    <div className="ResourceInfo">
        <section className="point-history">
        <div className="point-box">
          <p>포인트 내역</p>
          <strong>1P</strong>
        </div>
        <div className="point-box">
          <p>포인트 내역</p>
          <strong>1P</strong>
        </div>
        <div className="Exchange-buttons">
      
        <button onClick={() => navigate("/MyPage/Poinhistory")}>포인트내역</button>
        </div>
      </section>
    </div>

     );
};
   
export default ResourceInfo;