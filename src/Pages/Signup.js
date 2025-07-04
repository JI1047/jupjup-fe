import "../Styles/Signup/Signup.css";
import { Link } from "react-router-dom"; 
import Header from "../Components/Signup/SignupHeader";
import Body from "../Components/Signup/SignupBody";



const Signup = () => {
  return (
    <div className="Signup">
         <Header />
         <Body />
    </div>
  );
};

export default Signup;