import "../Styles/admin/adminlogin.css";
import Header from "../Components/Login/LoginHeader";
import Body from "../Components/admin/adminbody";

const adminlogin = () => {
  return (
    <div className="Login">
      <Header />
      <Body />
    </div>
  );
};

export default adminlogin;