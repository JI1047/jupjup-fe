import "../../Styles/Mypage/MypageHeader.css";
import { useNavigate } from "react-router-dom";

const MypageHeader = () => {
  const navigate = useNavigate();


  return (
    <div className="My-Header">
    <button className="home-back-button" onClick={() => navigate("/Main")}>
            Home
          </button>
    </div>
  );
};

export default MypageHeader;