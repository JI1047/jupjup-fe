import "./UserProfile.css";



const UserProfile = () => {
  return (
    <div className="UserProfile">
         <section className="user-info-section">
        <div className="user-info-header">
          <div className="user-profile">
            <img src="/images/profile-placeholder.png" alt="프로필 사진" />
          </div>
          <div className="user-details">
            <h3>아무개</h3>
            <p>010-1234-5678</p>
          </div>
          <div className="user-points">
            <p>보유 포인트</p>
            <h2>24P</h2>
          </div>
        </div>
        <div className="user-buttons">
          <button>사진 변경</button>
          <button>내정보</button>
          <button>포인트 내역</button>
          <button>출금 신청</button>
        </div>
      </section>
    </div>

     );
};
export default UserProfile;