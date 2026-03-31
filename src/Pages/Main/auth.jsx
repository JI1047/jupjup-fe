import React, { useState, useEffect } from "react"; 
import { useNavigate } from "react-router-dom";
import QRCode from "qrcode";
import "../../Components/MyPage/MypageHeader.js";
import "../../Styles/Main/Admin.css";

export default function Admin() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(180);

  const [formData, setFormData] = useState({
    userId: "",
    locationId: "",
    itemId: "",
    quantity: "",
  });

  const [qrImage, setQrImage] = useState(null);
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(false); // ⭐ NEW
  const token = localStorage.getItem("accessToken");

  // 🔥 폼 입력 처리
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 🔥 QR 생성 API 호출
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8080/recycle-history/claims", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          itemId: Number(formData.itemId),
          quantity: Number(formData.quantity),
          collectionPointId: Number(formData.locationId),
          intendedUserId: Number(formData.userId),
        }),
      });

      if (!res.ok) throw new Error(`서버 응답 오류: ${res.status}`);

      const data = await res.json();
      setResponseData(data);

      const qr = await QRCode.toDataURL(data.qrUrl, { width: 240, margin: 2 });
      setQrImage(qr);

      setShowModal(true); // ⭐ 모달 열기

    } catch (err) {
      alert(`에러: ${err.message}`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

useEffect(() => {
  let timer;

  if (showModal) {
    setCountdown(180); // 모달 열릴 때 타이머 초기화

    timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setShowModal(false); // 자동으로 닫기
          return 0;
        }
        return prev - 1;
      });
    }, 1000); // 1초마다 실행
  }

  return () => clearInterval(timer);
}, [showModal]);


  return (
    <div>
      <div className="My-Header">
        <button className="home-back-button" onClick={() => navigate("/adminlogin")}>
          logout
        </button>
      </div>

      <div className="admin-container">
        <h2 className="admin-title">QR 발급</h2>
        <p className="admin-sub">올바른 사용자 정보를 입력해주세요.</p>

        {/* 입력 폼 */}
        <form className="admin-form" onSubmit={handleSubmit}>

          <label className="admin-label">사용자 ID</label>
          <input
            type="text"
            name="userId"
            className="admin-input"
            value={formData.userId}
            onChange={handleChange}
          />

          <label className="admin-label">거점 ID</label>
          <input
            type="text"
            name="locationId"
            className="admin-input"
            value={formData.locationId}
            onChange={handleChange}
          />

          <label className="admin-label">재활용 품목</label>
          <select
            name="itemId"
            className="admin-select"
            value={formData.itemId}
            onChange={handleChange}
          >
            <option value="">-- 선택 --</option>
            <option value={1}>투명페트병</option>
            <option value={2}>플라스틱</option>
            <option value={3}>알루미늄 캔</option>
            <option value={4}>철 캔</option>
            <option value={5}>비닐</option>
            <option value={6}>종이팩</option>
            <option value={7}>신문</option>
            <option value={8}>의류</option>
            <option value={9}>소주병</option>
            <option value={10}>맥주병</option>
            <option value={11}>기타병</option>
          </select>

          <label className="admin-label">수량</label>
          <input
            type="number"
            name="quantity"
            className="admin-input"
            value={formData.quantity}
            onChange={handleChange}
          />

          <button type="submit" className="admin-submit-button" disabled={loading}>
            {loading ? "생성 중..." : "QR 생성"}
          </button>
        </form>
      </div>

      {/* ⭐ NEW : QR 생성 모달 */}
      {showModal && responseData && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <h3 className="modal-title">QR코드</h3>
            <p className="modal-guide">아래 QR을 인식하면 포인트가 자동으로 적립됩니다. </p>

            <p className="modal-text"><strong>Claim ID:</strong> {responseData.claimId}</p>
            <p className="modal-text"><strong>만료 시각:</strong> {responseData.expiresAt}</p>
            <p className="modal-text"><strong>URL:</strong> {responseData.qrUrl}</p>

             <p className="modal-timer">
              남은 시간: {Math.floor(countdown / 60)}분 {countdown % 60}초 </p>

            {qrImage && (
              <div className="modal-qr">
                <img src={qrImage} alt="QR" width="300" />
              </div>
            )}

          <button 
                  className="modal-close-btn" 
                  onClick={() => setShowModal(false)}
                >
                  닫기
                </button>
          
            
          </div>
        </div>
      )}

    </div>
  );
}