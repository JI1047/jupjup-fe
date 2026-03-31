import "./UserProfile.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function UserProfile() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        console.log("저장된 JWT:", token);

        const response = await fetch("/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("로그인 정보 조회 실패");

        const data = await response.json();
        console.log("응답 사용자 정보:", data);
        setUserData(data);
      } catch (error) {
        console.error("에러:", error);
        alert("사용자 정보를 불러오는데 실패했습니다.");
      }
    };

    fetchUserInfo();
  }, []);

  if (!userData) return <p>로딩 중...</p>;

  return (
    <div className="UserProfile">
      <section className="user-info-section">
        <div className="user-info-header">
          <div className="user-profile-area">
            <div className="user-profile">
              <img src="/images/profile.jpg" alt="프로필 사진" />
            </div>
            <div className="user-details">
              <h3>{userData.name}</h3>
              <p>{userData.phone}</p>
            </div>
          </div>
          <div className="user-points">
            <p>보유 포인트</p>
            <h2>{userData.point ?? 0}P</h2>
          </div>
        </div>
        <div className="user-buttons">
          <button className="profile-btn">사진 변경</button>
          <button className="profile-btn" onClick={() => navigate("/MyPage/Info")}>
            정보수정
          </button>
          <button
            className="profile-btn"
            onClick={() => navigate("/MyPage/CustomerService")}
          >
            고객센터
          </button>
        </div>
      </section>
    </div>
  );
}

export default UserProfile;
