import "./ResourceInfo.css";
import { useNavigate } from "react-router-dom";


const ResourceInfo = () => {
  const navigate = useNavigate();

  return (
    <div className="ResourceInfo">
        <section className="point-history">
          <div className="text-box">
          </div>
        <div className="point-box1">
          <p>포인트 내역1</p>
          <strong>38P</strong>
          <p>포인트 내역2</p>
          <strong>14P</strong>
        </div>

        <div className="Exchange-buttons1">
          <button onClick={() => navigate("/MyPage/Poinhistory")}>포인트내역</button>
        </div>
      </section>
    </div>

     );
};
   
export default ResourceInfo;