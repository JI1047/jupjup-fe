import "../../Styles/Login/LoginForm.css";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

function LoginForm() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch("/api/auth/local-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: id, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("accessToken", data.jwt);
        console.log("accessToken:", localStorage.getItem("accessToken"));
        console.log("로컬 로그인 성공:", data);

        setTimeout(() => {
          navigate("/Main");
        }, 200);
      } else {
        alert("로그인 실패: 아이디 또는 비밀번호가 올바르지 않습니다.");
      }
    } catch (error) {
      console.error("로그인 에러:", error);
      alert("서버 오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const jwt = urlParams.get("token");

    if (jwt) {
      localStorage.setItem("accessToken", jwt);
      console.log("accessToken:", jwt);
      navigate("/login-success");
    }
  }, [navigate]);

  return (
    <div className="LoginForm">
      <div className="login-box">
        <input
          type="text"
          placeholder="ID"
          className="login-input"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="find-info">
          <span>ID | Password 찾기</span>
          <div className="singup">
            <Link to="/signup" className="find-link">
              회원가입하기
            </Link>
          </div>
        </div>

        <button className="login-btn" onClick={handleLogin}>
          로그인하기
        </button>
      </div>
    </div>
  );
}

export default LoginForm;