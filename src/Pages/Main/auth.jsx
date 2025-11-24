import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import QRCode from "qrcode";
import "../../Components/MyPage/MypageHeader.js";
import "../../Styles/Main/Admin.css";

export default function Admin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userId: "",
    locationId: "",
    itemId: "",
    quantity: "",
    calculatedPoint: "",
  });

  const [qrImage, setQrImage] = useState(null);
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(false);

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
      const res = await fetch("http://13.209.202.27:8080/recycle-history/claims", {
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

      alert("QR 생성 성공!");

    } catch (err) {
      alert(`에러: ${err.message}`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* 🔼 상단 헤더 */}
      <div className="My-Header">
        <button className="home-back-button" onClick={() => navigate("/adminlogin")}>
          logout
        </button>
      </div>

      <div className="admin-container">
        <h2 className="admin-title">관리자 입력 + QR 생성</h2>

        {/* 입력 폼 */}
        <form className="admin-form" onSubmit={handleSubmit}>

          <label className="admin-label">사용자 ID</label>
          <input
            type="number"
            name="userId"
            className="admin-input"
            value={formData.userId}
            onChange={handleChange}
          />

          <label className="admin-label">거점 ID</label>
          <input
            type="number"
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

      {/* QR 및 응답 표시 */}
      {responseData && (
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <p><strong>Claim ID:</strong> {responseData.claimId}</p>
          <p><strong>만료 시각:</strong> {responseData.expiresAt}</p>
          <p><strong>URL:</strong> <a href={responseData.qrUrl}>{responseData.qrUrl}</a></p>

          {qrImage && (
            <div style={{ marginTop: "30px" }}>
              <h4>생성된 QR 코드</h4>
              <img src={qrImage} alt="qr" width="240" />
            </div>
          )}
        </div>
      )}

    </div>
  );
}
