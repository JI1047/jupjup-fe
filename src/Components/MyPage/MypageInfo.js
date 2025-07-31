import "../../Styles/Mypage/MypageInfo.css";
import Header from "./MPsectionHeader.js";
import { Link  } from "react-router-dom";




const MypageInformation = () => {
  return (
    <div className="My-Information">
       <Header />
       
       <div className="Information-Body">
       <div className="Information-form">
    <div className="Information-input-wrapper">
      <input
        className="Information-input"
        type="text"
        placeholder="ID"
      />
      
    </div>

    <p className="Information-message-text"> {/* 중복확인 결과 메시지 위치 */} </p>

    <div className="Information-input-wrapper">
      <input
        className="Information-input"
        type="password"
        placeholder="Password : ex) 영문, 숫자, 특수문자 포함 8자 이상"
      />
    </div>

    <div className="Information-input-wrapper">
      <input
        className="Information-input"
        type="password"
        placeholder="Password 확인"
      />
    </div>

    <div className="Information-input-wrapper">
      <input
        className="Information-input"
        type="text"
        placeholder="이름"
      />
    </div>

    <div className="Information-input-wrapper">
      <input
        className="Information-input"
        type="text"
        placeholder="전화번호"
      />
    </div>

    <div className="Information-input-wrapper">
      <select className="Information-input">
        <option value="MALE">남자</option>
        <option value="FEMALE">여자</option>
      </select>
    </div>

    <div className="Information-input-wrapper">
      <input
        className="Information-input"
        type="text"
        placeholder="생년월일 (YYYY-MM-DD)"
      />
    </div>

    <div className="Information-input-wrapper">
      <input
        className="Information-input"
        type="text"
        placeholder="Address"
      />
    </div>
      <Link to="/Mypage">
    <button className="Information-submit-button">정보 저장</button></Link>
  </div>
</div>
</div>
  );
};

export default MypageInformation;