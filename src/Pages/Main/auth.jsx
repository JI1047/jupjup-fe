import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("제출된 데이터:", formData);
    // TODO: 백엔드 전송 로직
  };

  return (
    <div>
      {/* ✅ 상단 헤더 유지 */}
      <div className="My-Header">
        <button className="home-back-button" onClick={() => navigate("/adminlogin")}>
          logout
        </button>
      </div>

      {/* ✅ 입력 폼 */}
      <div className="admin-container">
        <h2 className="admin-title">관리자 입력</h2>
        <form className="admin-form" onSubmit={handleSubmit}>
          <label className="admin-label">사용자 ID (이름)</label>
          <input
            type="text"
            name="userId"
            className="admin-input"
            value={formData.userId}
            onChange={handleChange}
          />

          <label className="admin-label">거점 ID (장소명)</label>
          <input
            type="text"
            name="locationId"
            className="admin-input"
            value={formData.locationId}
            onChange={handleChange}
          />

          <label className="admin-label">품목 ID</label>
          <select
            name="itemId"
            className="admin-select"
            value={formData.itemId}
            onChange={handleChange}
          >
            <option value="">-- 재활용 품목 선택 --</option>
            <option value="플라스틱">플라스틱</option>
            <option value="페트병">페트병</option>
            <option value="캔">캔</option>
            <option value="유리병">유리병</option>
            <option value="종이">종이</option>
            <option value="신문지">신문지</option>
            <option value="종이컵">종이컵</option>
            <option value="의류">의류</option>
            <option value="비닐">비닐</option>
            <option value="스티로폼">스티로폼</option>
            <option value="전자제품">전자제품</option>
            <option value="건전지">건전지</option>
            <option value="형광등">형광등</option>
            <option value="종이팩">종이팩</option>
            <option value="우유팩">우유팩</option>
          </select>

          <label className="admin-label">수량</label>
          <input
            type="number"
            name="quantity"
            className="admin-input"
            value={formData.quantity}
            onChange={handleChange}
          />

          <label className="admin-label">포인트</label>
          <input
            type="number"
            name="calculatedPoint"
            className="admin-input"
            value={formData.calculatedPoint}
            onChange={handleChange}
          />

          <button type="submit" className="admin-submit-button">
            저장
          </button>
        </form>
      </div>
    </div>
  );
}
