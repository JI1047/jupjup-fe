import "../../Styles/Login/LoginForm.css";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // ??ë¡œì»¬ ë¡œê·¸??  const handleLogin = async () => {
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
        console.log("?”¥ accessToken:", localStorage.getItem("accessToken"));
        console.log("ë¡œì»¬ ë¡œê·¸???±ê³µ:", data);


        // ë¡œê·¸???±ê³µ ??Main ?˜ì´ì§€ë¡??´ë™
        navigate("/Main");

        console.log('ë¡œì»¬ ë¡œê·¸???±ê³µ:', data);
       // ??? í° ?€?????´ë™ (0.2ì´??œë ˆ?´ë¡œ ?ˆì „?˜ê²Œ)
        setTimeout(() => {
          navigate("/Main"); // ?ëŠ” /Main, ?¤ì œ ?˜ì´ì§€ ê²½ë¡œ??ë§ê²Œ
        }, 200);

      } else {
        alert("ë¡œê·¸???¤íŒ¨: ?„ì´???ëŠ” ë¹„ë?ë²ˆí˜¸ê°€ ?€?¸ìŠµ?ˆë‹¤.");
      }
    } catch (error) {
      console.error("ë¡œê·¸???ëŸ¬:", error);
      alert("?œë²„ ?¤ë¥˜ê°€ ë°œìƒ?ˆìŠµ?ˆë‹¤.");
    }
  };

  // ???Œì…œ ë¡œê·¸??ë¦¬ë””?‰ì…˜ ??? í° ë°œê¸‰
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const jwt = urlParams.get("token");

    if (jwt) {
      localStorage.setItem("accessToken", jwt);
      console.log("?”¥ accessToken:", jwt);
      navigate("/login-success");
    }
  }, [navigate]);

  // ???Œì…œ ë¡œê·¸???œì‘
  const socialLogin = (provider) => {
    window.location.href = `/oauth2/authorization/${provider}`;
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
          <span>ID | Password ì°¾ê¸°</span>
          <div className="singup">
            <Link to="/signup" className="find-link">
              ?Œì›ê°€?…í•˜ê¸?            </Link>
          </div>
          </div>
        <button className="login-btn" onClick={handleLogin}>
          ë¡œê·¸?¸í•˜ê¸?        </button>
      </div>
    </div>
  );
}

export default LoginForm;
