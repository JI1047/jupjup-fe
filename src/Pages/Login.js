import "../Styles/Login/login.css";
import { Link } from "react-router-dom"; 
import Header from "../Components/Login/LoginHeader";
import Body from "../Components/Login/LoginBody";
//import Footer from "../Components/Start/StartFooter";



const Login = () => {
  return (
    <div className="Login">
         <Header />
         <Body />
    </div>
  );
};

export default Login;