import "../../Styles/Mypage/MypageHeader.css";
import { useNavigate } from "react-router-dom";

const RequestHeader = () => {
  const navigate = useNavigate();


  return (
    <div className="My-Header">
   
    <button className="back-button" onClick={() => navigate(-1)}>
           back
          </button>
      <button className="home-back-button" onClick={() => navigate("/Main")}>
            Home
          </button>     
    </div>
  );
};

export default RequestHeader;