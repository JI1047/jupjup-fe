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
        console.log("?‘‰ ?€?¥ëœ JWT:", token);

        const response = await fetch("/api/auth/me", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });

        if (!response.ok) throw new Error("ë¡œê·¸???•ë³´ ì¡°íšŒ ?¤íŒ¨");

        const data = await response.json();
        console.log("???‘ë‹µ ë°›ì? ?¬ìš©???•ë³´:", data);
        setUserData(data);
      } catch (error) {
        console.error("?ëŸ¬:", error);
        alert("?¬ìš©???•ë³´ë¥?ë¶ˆëŸ¬?¤ëŠ” ???¤íŒ¨?ˆìŠµ?ˆë‹¤.");
      }
    };

    fetchUserInfo();
  }, []);

  if (!userData) return <p>ë¡œë”© ì¤?..</p>;

  return (
    <div className="UserProfile">
      <section className="user-info-section">
        <div className="user-info-header">
          <div className="user-profile-area">
            <div className="user-profile">
              <img src="/images/profile.jpg" alt="?„ë¡œ???¬ì§„" />
            </div>
            <div className="user-details">
              <h3>{userData.name}</h3>
              <p>{userData.phone}</p>
            </div>
          </div>
          <div className="user-points">
            <p>ë³´ìœ  ?¬ì¸??/p>
            <h2>{userData.point ?? 0}P</h2>
          </div>
        </div>
        <div className="user-buttons">
          <button className="profile-btn">?¬ì§„ ë³€ê²?/button>
          <button
            className="profile-btn"
            onClick={() => navigate("/MyPage/Info")}
          >
            ?•ë³´?˜ì •
          </button>
          <button
            className="profile-btn"
            onClick={() => navigate("/MyPage/CustomerService")}
          >
            ê³ ê°?¼í„°
          </button>
        </div>
      </section>
    </div>
  );
}
export default UserProfile;
