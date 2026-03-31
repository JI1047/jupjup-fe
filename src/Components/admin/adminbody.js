import "../../Styles/admin/adminbody.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AdminBody() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // ??로컬 로그??  const handleLogin = async () => {
    try {
      const response = await fetch(
        "/api/auth/local-login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: id, password }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("accessToken", data.jwt);

        console.log("?�� accessToken:", data.jwt);
        console.log("로컬 로그???�공:", data);

        setTimeout(() => {
          navigate("/auth");
        }, 150);

      } else {
        alert("로그???�패: ?�이???�는 비�?번호가 ?�?�습?�다.");
      }
    } catch (error) {
      console.error("로그???�러:", error);
      alert("?�버 ?�류가 발생?�습?�다.");
    }
  };

  // ???�셜 로그??콜백
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const jwt = urlParams.get("token");

    if (jwt) {
      localStorage.setItem("accessToken", jwt);
      console.log("?�� accessToken:", jwt);
      navigate("/login-success");
    }
  }, [navigate]);

  return (
    <div className="admin-container">
      <div className="admin-box">
        <h2 className="admin-title">Admin Access Only</h2>
        <p className="admin-sub">관리자 ?�용 ?�이지?�니??</p>

        <input
          type="text"
          placeholder="관리자 ID"
          className="admin-input"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />

        <input
          type="password"
          placeholder="비�?번호"
          className="admin-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="admin-btn" onClick={handleLogin}>
          로그?�하�?        </button>
      </div>
    </div>
  );
}

export default AdminBody;
