import "../../Styles/admin/adminbody.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AdminBody() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // ✅ 로컬 로그인
  const handleLogin = async () => {
    try {
      const response = await fetch(
        "http://13.209.202.27:8080/api/auth/local-login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: id, password }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("accessToken", data.jwt);

        console.log("🔥 accessToken:", data.jwt);
        console.log("로컬 로그인 성공:", data);

        setTimeout(() => {
          navigate("/auth");
        }, 150);

      } else {
        alert("로그인 실패: 아이디 또는 비밀번호가 틀렸습니다.");
      }
    } catch (error) {
      console.error("로그인 에러:", error);
      alert("서버 오류가 발생했습니다.");
    }
  };

  // ✅ 소셜 로그인 콜백
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const jwt = urlParams.get("token");

    if (jwt) {
      localStorage.setItem("accessToken", jwt);
      console.log("🔥 accessToken:", jwt);
      navigate("/login-success");
    }
  }, [navigate]);

  return (
    <div className="admin-container">
      <div className="admin-box">
        <h2 className="admin-title">Admin Access Only</h2>
        <p className="admin-sub">관리자 전용 페이지입니다.</p>

        <input
          type="text"
          placeholder="관리자 ID"
          className="admin-input"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />

        <input
          type="password"
          placeholder="비밀번호"
          className="admin-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="admin-btn" onClick={handleLogin}>
          로그인하기
        </button>
      </div>
    </div>
  );
}

export default AdminBody;