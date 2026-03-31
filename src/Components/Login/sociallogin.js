import "../../Styles/Login/sociallogin.css";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Sociallogin() {
   const navigate = useNavigate();

  useEffect(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const jwt = urlParams.get("token");

  if (jwt) {
    localStorage.setItem("accessToken", jwt);
    console.log("🔥 accessToken:", jwt);
    navigate("/login-success");
  }
}, [navigate]);

 const socialLogin = (provider) => {
    window.location.href = `http://localhost:8080/oauth2/authorization/${provider}`;
  };


  return (
    <div className="sociallogin">
       <div className="Box">
       <div className="Text">
          <p>간편로그인</p>
          </div>
          <div className="social-buttons">
            <button className="kakao-btn"onClick={() => socialLogin('kakao')} >카카오</button>
            <div className="social-icons">
              <button className="naver-btn" onClick={() => socialLogin('naver')}>네이버</button>
            </div>
          </div>
        </div>
    </div>
  );
};

export default Sociallogin;