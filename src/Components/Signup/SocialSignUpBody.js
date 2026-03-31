import React, { useState } from 'react';
import { useSearchParams,useNavigate  } from 'react-router-dom';
import axios from 'axios';
import '../../Styles/Signup/SocialSignUp.css'; 

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
        `/api/auth/social-signup?snsId=${snsId}&provider=${provider}`,
        {

          name,
          phone,
          gender,
          birth,
          address,
        }
      );
      console.log('?�원가???�공:', response.data);
      alert('?�원가???�공!');
      navigate('/'); 
    } catch (error) {
      console.error('?�원가???�패:', error);
      alert('?�원가???�패!');
    }
  };

  return (
     <div className="SignupBody">
    <div className="signup-form">
  
      <div className="input-wrapper">
        <input
          className="signup-input"
          type="text"
          placeholder="?�름"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="input-wrapper">
        <input
          className="signup-input"
          type="text"
          placeholder="?�화번호"
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
          <option value="MALE">?�자</option>
          <option value="FEMALE">?�자</option>
        </select>
      </div>

      <div className="input-wrapper">
        <input
          className="signup-input"
          type="text"
          placeholder="?�년?�일 (YYYY-MM-DD)"
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
        ?�원가??      </button>
    </div>
    </div>
  );
}

export default Signup;
