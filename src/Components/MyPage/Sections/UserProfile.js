import "./UserProfile.css";
import { useNavigate } from "react-router-dom";



const UserProfile = () => {
  const navigate = useNavigate();

  return (
    <div className="UserProfile">
         <section className="user-info-section">
        <div className="user-info-header">
          <div className="user-profile">
            <img src="/images/profile.jpg" alt="프로필 사진" />
          </div>
          <div className="user-details">
            <h3>아무개</h3>
            <p>abcd1234@gmail.com</p>
          </div>
          <div className="user-points">
            <p></p>
            <p>보유 포인트</p>
            <h2>24P</h2>
          </div>
        </div>
        <div className="user-buttons">
          <button>사진 변경</button>
          <button onClick={() => navigate("/MyPage/Info")}>정보수정</button>
          <button onClick={() => navigate("/MyPage/Poinhistory")}>포인트 내역</button>
  
        </div>
      </section>
    </div>

     );
};
export default UserProfile;