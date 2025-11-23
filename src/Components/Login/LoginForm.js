import "../../Styles/Login/LoginForm.css";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LoginForm() {
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
        console.log("🔥 accessToken:", localStorage.getItem("accessToken"));
        console.log("로컬 로그인 성공:", data);


        // 로그인 성공 시 Main 페이지로 이동
        navigate("/Main");

        console.log('로컬 로그인 성공:', data);
       // ✅ 토큰 저장 후 이동 (0.2초 딜레이로 안전하게)
        setTimeout(() => {
          navigate("/Main"); // 또는 /Main, 실제 페이지 경로에 맞게
        }, 200);

      } else {
        alert("로그인 실패: 아이디 또는 비밀번호가 틀렸습니다.");
      }
    } catch (error) {
      console.error("로그인 에러:", error);
      alert("서버 오류가 발생했습니다.");
    }
  };

  // ✅ 소셜 로그인 리디렉션 후 토큰 발급
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const jwt = urlParams.get("token");

    if (jwt) {
      localStorage.setItem("accessToken", jwt);
      console.log("🔥 accessToken:", jwt);
      navigate("/login-success");
    }
  }, [navigate]);

  // ✅ 소셜 로그인 시작
  const socialLogin = (provider) => {
    window.location.href = `http://13.209.202.27:8080/oauth2/authorization/${provider}`;
  };

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