import { Link } from "react-router-dom"; 

import "../Styles/Signup/SignupSuccess.css";


function SignupSuccess() {
  return (
    <div className="signup-success">
          <div className="signup-success-container">
                Logo
          </div>
       <h2 className="signup-success-title">🎉 회원가입이 성공적으로 완료되었습니다!</h2>
       <Link to="/Login">
       <button className="success-button">
        로그인 후 바로 이용하기 ➜
      </button>
       </Link>
      
    </div>
  );
}

export default SignupSuccess;