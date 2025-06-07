import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

function LoginPage() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // ✅ 로컬 로그인
  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/auth/local-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: id, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('accessToken', data.jwt);        
        console.log("🔥 accessToken:", localStorage.getItem("accessToken"));

        console.log('로컬 로그인 성공:', data);
        navigate('/login-success');
      } else {
        alert('로그인 실패: 아이디 또는 비밀번호가 틀렸습니다.');
      }
    } catch (error) {
      console.error('로그인 에러:', error);
      alert('서버 오류가 발생했습니다.');
    }
  };

  // ✅ 소셜 로그인 리디렉션 후 토큰 발급
  useEffect(() => {
  let didRun = false; // ✅ 한 번만 실행하게 막기

  if (!didRun && window.location.pathname === '/oauth/loginInfo') {
    didRun = true;

    fetch('http://localhost:8080/api/auth/token', { credentials: 'include' })
      .then((res) => {
        if (!res.ok) throw new Error('토큰 발급 실패');
        return res.json();
      })
      .then((data) => {
        localStorage.setItem('accessToken', data.jwt);
        console.log("🔥 accessToken:", localStorage.getItem("accessToken"));
        navigate('/login-success');
      })
      .catch((err) => {
        console.error('소셜 로그인 에러:', err);
        alert('소셜 로그인 실패');
      });
  }
}, [navigate]);

  // ✅ 소셜 로그인 시작
  const socialLogin = (provider) => {
    window.location.href = `http://localhost:8080/oauth2/authorization/${provider}`;
  };

  return (
    <div className="login-container">
      <h2>로그인</h2>

      <input
        type="text"
        placeholder="이메일"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="login-btn" onClick={handleLogin}>로그인</button>

      <div className="link-row">
       
        <button onClick={() => navigate('/local-signup')}>회원가입</button>
        {/* ✅ 🟩 지도로 이동하기 버튼 추가 */}
        <button onClick={() => navigate('/point-map')}>지도로 이동</button>
      </div>

      <hr />

      <div className="sns-login">
        <h3>SNS 로그인</h3>
        <button onClick={() => socialLogin('kakao')}>카카오톡</button>
        <button onClick={() => socialLogin('google')}>구글</button>
        <button onClick={() => socialLogin('naver')}>네이버</button>
      </div>
    </div>
  );
}

export default LoginPage;
