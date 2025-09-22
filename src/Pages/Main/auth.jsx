import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../Styles/Mypage/MypageHeader.css";

export default function Auth() {
  const navigate = useNavigate();
  const [authCode, setAuthCode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (authCode.trim() === "") {
      alert("인증 코드를 입력해주세요.");
      return;
    }

    // TODO: 서버에 인증 코드 전송 + 포인트 적립 처리
    alert(`입력한 인증 코드: ${authCode}`);
    setAuthCode(""); // 입력값 초기화
  };

  return (
    <div>
      <style>
        {`
                .auth-body-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 4rem;
  text-align: center;
}

.auth-form {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 300px;
}

.auth-input {
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.auth-submit-button {
  padding: 0.75rem;
  background-color: #1da846;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
}

.auth-submit-button:hover {
  background-color: #0a5218;
}

            `}
      </style>
      {/* ✅ 헤더 */}
      <div className="My-Header">
        <button className="home-back-button" onClick={() => navigate("/Main")}>
          Home
        </button>
      </div>

      {/* ✅ 본문 */}
      <div className="auth-body-container">
        <h2>거점 인증 코드 입력</h2>
        <p>거점에서 받은 인증 코드를 입력하면 포인트를 적립할 수 있어요.</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="인증 코드 입력"
            value={authCode}
            onChange={(e) => setAuthCode(e.target.value)}
            className="auth-input"
          />
          <button type="submit" className="auth-submit-button">
            코드 제출
          </button>
        </form>
      </div>
    </div>
  );
}
