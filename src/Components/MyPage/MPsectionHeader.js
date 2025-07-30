import "../../Styles/Mypage/MypageHeader.css";
import { useNavigate } from "react-router-dom";

const MypageHeader = () => {
  const navigate = useNavigate();

// 이전화면 버튼 아이콘 추가 및 수정
  return (
    <div className="My-Header">
    <button className="home-back-button" onClick={() => navigate("/Mypage")}>
           Back 
          </button>
    </div>
  );
};

export default MypageHeader;