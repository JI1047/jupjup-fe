import "../../Styles/Login/LoginBody.css";
import { Link } from "react-router-dom"; 
import LoginForm from "./LoginForm";
import Sociallogin from "./sociallogin";
//import Pagebtn from "./pagebtn";



const LoginBody = () => {
  return (
    <div className="LoginBody">
        <LoginForm />
        <Sociallogin />
        {/*<Pagebtn />*/}
    </div>
  );
};

export default LoginBody;

{/* 
      <div className="login-box">
        <input type="text" placeholder="ID" className="login-input" />
        <input type="password" placeholder="Password" className="login-input" />

        <div className="find-info">
          <span>ID | Password 찾기</span>
        </div>

   
        <div className="social-login">
          <p>간편로그인</p>
          <div className="social-buttons">
            <button className="kakao-btn">카카오로 로그인</button>
            <div className="social-icons">
              <button className="google-btn">구글</button>
              <button className="naver-btn">네이버</button>
            </div>
          </div>
        </div>

        <button className="login-btn">Login</button>
        <Link to="/signup">
          <button className="signup-btn">회원 가입</button>
        </Link>
      </div> */}