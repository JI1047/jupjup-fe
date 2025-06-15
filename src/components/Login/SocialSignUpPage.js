import React, { useState } from 'react';
import { useSearchParams,useNavigate  } from 'react-router-dom';
import axios from 'axios';
import './SocialSignUpPage.css'; // 따로 CSS 파일 분리 (같이 보여줄게)

function Signup() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const snsId = searchParams.get('snsId');
  const provider = searchParams.get('provider');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('MALE');
  const [birth, setBirth] = useState('');
  const [address, setAddress] = useState('');

  const handleSignup = async () => {
    

    try {
      const response = await axios.post(
        `http://13.209.202.27:8080/api/auth/social-signup?snsId=${snsId}&provider=${provider}`,
        {

          name,
          phone,
          gender,
          birth,
          address,
        }
      );
      console.log('회원가입 성공:', response.data);
      alert('회원가입 성공!');
      navigate('/'); 
    } catch (error) {
      console.error('회원가입 실패:', error);
      alert('회원가입 실패!');
    }
  };

  return (
    <div className="signup-form">
  
      

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
