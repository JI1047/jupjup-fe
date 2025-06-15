import React, { useState } from 'react';
import axios from 'axios';
import './LocalSignUpPage.css';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('MALE');
  const [birth, setBirth] = useState('');
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');

  // 이메일 중복 확인
  const handleCheckEmail = async () => {
    try {
      const res = await axios.get('http://13.209.202.27:8080/api/auth/check-email', {
        params: { email }
      });
      setMessage(res.data); // "사용 가능한 이메일입니다"
    } catch (err) {
      if (err.response && err.response.status === 409) {
        setMessage(err.response.data); // "이메일이 중복됨"
      } else {
        setMessage('서버 오류가 발생했습니다.');
      }
    }
  };

  // 회원가입
  const handleSignup = async () => {
    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      const response = await axios.post('http://13.209.202.27:8080/api/auth/signup', {
        email,
        password,
        name,
        phone,
        gender,
        birth,
        address,
      });
      console.log('회원가입 성공:', response.data);
      alert('회원가입 성공!');
    } catch (error) {
      console.error('회원가입 실패:', error);
      alert('회원가입 실패!');
    }
  };

  return (
    <div className="signup-form">
      {/* 소셜 로그인 버튼 */}
      <div>
        <a href="http://13.209.202.27:8080/oauth2/authorization/kakao">
          <button>카카오로 시작</button>
        </a>
        <a href="http://13.209.202.27:8080/oauth2/authorization/naver">
          <button>네이버로 시작</button>
        </a>
        <a href="http://13.209.202.27:8080/oauth2/authorization/google">
          <button>구글로 시작</button>
        </a>
      </div>

      {/* 로컬 회원가입 입력 폼 */}
      <div className="input-wrapper">
        <input
          className="signup-input"
          type="text"
          placeholder="ID"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="signup-button" onClick={handleCheckEmail}>중복확인</button>
      </div>

      {/* 메시지 출력 */}
      {message && <p className="message-text">{message}</p>}

      <div className="input-wrapper">
        <input
          className="signup-input"
          type="password"
          placeholder="Password : ex) 영문, 숫자, 특수문자 포함 8자 이상"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="input-wrapper">
        <input
          className="signup-input"
          type="password"
          placeholder="Password 확인"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>

      <div className="input-wrapper">
        <input
          className="signup-input"
          type="text"
          placeholder="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="input-wrapper">
        <input
          className="signup-input"
          type="text"
          placeholder="전화번호"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      <div className="input-wrapper">
        <select
          className="signup-input"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="MALE">남자</option>
          <option value="FEMALE">여자</option>
        </select>
      </div>

      <div className="input-wrapper">
        <input
          className="signup-input"
          type="text"
          placeholder="생년월일 (YYYY-MM-DD)"
          value={birth}
          onChange={(e) => setBirth(e.target.value)}
        />
      </div>

      <div className="input-wrapper">
        <input
          className="signup-input"
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>

      <button className="submit-button" onClick={handleSignup}>
        회원가입
      </button>
    </div>
  );
}

export default Signup;
