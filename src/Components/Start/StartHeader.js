import "../../Styles/Start/StartHeader.css";
import { Link } from "react-router-dom"; 


const StartHader = () => {
  return (
    <div className="Hader">
       <Link to="/Login">
          <button className="login-button">Admin only</button>
          </Link>
          {/* <Link to="/Mypage">
         <button className="login-button">Mypage</button>
          </Link>*/}
          {/*<Link to="/SignupSuccess">
          <button className="login-button">가입완료</button>
          </Link>*/}
    </div>
  );
};

export default StartHader;