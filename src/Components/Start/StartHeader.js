import "../../Styles/Start/StartHeader.css";
import { Link } from "react-router-dom"; 


const StartHader = () => {
  return (
    <div className="Hader">
       <Link to="/Login">
          <button className="login-button">Login</button>
          </Link>
           <Link to="/Mypage">
          <button className="login-button">Mypage</button>{/*임시 경로수정필요*/}
          </Link>
    </div>
  );
};

export default StartHader;