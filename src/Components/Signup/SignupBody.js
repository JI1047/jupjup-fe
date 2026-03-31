import "../../Styles/Signup/SignupBody.css";
import  { useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import axios from 'axios';


function SignupBody() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('MALE');
  const [birth, setBirth] = useState('');
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');

  // ?´ë©”??ì¤‘ë³µ ?•ì¸
  const handleCheckEmail = async () => {
    try {
      const res = await axios.get('/api/auth/check-email', {
        params: { email }
      });
      setMessage(res.data); // "?¬ìš© ê°€?¥í•œ ?´ë©”?¼ì…?ˆë‹¤"
    } catch (err) {
      if (err.response && err.response.status === 409) {
        setMessage(err.response.data); // "?´ë©”?¼ì´ ì¤‘ë³µ??
      } else {
        setMessage('?œë²„ ?¤ë¥˜ê°€ ë°œìƒ?ˆìŠµ?ˆë‹¤.');
      }
    }
  };

  // ?Œì›ê°€??  const handleSignup = async () => {
    if (password !== confirmPassword) {
      alert('ë¹„ë?ë²ˆí˜¸ê°€ ?¼ì¹˜?˜ì? ?ŠìŠµ?ˆë‹¤.');
      return;
    }

    try {
      const response = await axios.post('/api/auth/signup', {
        email,
        password,
        name,
        phone,
        gender,
        birth,
        address,
      });
      console.log('?Œì›ê°€???±ê³µ:', response.data);
      alert('?Œì›ê°€???±ê³µ!');
      navigate('/signup-success');
    } catch (error) {
      console.error('?Œì›ê°€???¤íŒ¨:', error);
      alert('?Œì›ê°€???¤íŒ¨!');
    }
  };

  return (
    <div className="SignupBody">
    
    <div className="signup-form">
    <div className="input-wrapper">
        <input
          className="signup-input"
          type="text"
          placeholder="ID"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="signup-button" onClick={handleCheckEmail}>ì¤‘ë³µ?•ì¸</button>
      </div>

      {/* ë©”ì‹œì§€ ì¶œë ¥ */}
      {message && <p className="message-text">{message}</p>}

      <div className="input-wrapper">
        <input
          className="signup-input"
          type="password"
          placeholder="Password : ex) ?ë¬¸, ?«ì, ?¹ìˆ˜ë¬¸ì ?¬í•¨ 8???´ìƒ"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="input-wrapper">
        <input
          className="signup-input"
          type="password"
          placeholder="Password ?•ì¸"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>

      <div className="input-wrapper">
        <input
          className="signup-input"
          type="text"
          placeholder="?´ë¦„"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="input-wrapper">
        <input
          className="signup-input"
          type="text"
          placeholder="?„í™”ë²ˆí˜¸"
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
          <option value="MALE">?¨ì</option>
          <option value="FEMALE">?¬ì</option>
        </select>
      </div>

      <div className="input-wrapper">
        <input
          className="signup-input"
          type="text"
          placeholder="?ë…„?”ì¼ (YYYY-MM-DD)"
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
        ?Œì›ê°€??      </button>
    </div>
    </div>
  );
}


export default SignupBody;
