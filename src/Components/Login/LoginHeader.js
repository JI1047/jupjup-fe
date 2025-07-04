import "../../Styles/Login/LoginHeader.css";
import { Link } from "react-router-dom"; 



const LoginHeader = () => {
  return (
    <div className="LoginHeader">
       <Link to="/Start"> {/* 어떤 메인 화면으로 이동할지 수정 필요요*/}
          <button className="Home-button">Home</button>
          </Link>
    </div>
  );
};

export default LoginHeader;