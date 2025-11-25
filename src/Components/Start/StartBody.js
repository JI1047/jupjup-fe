import "../../Styles/Start/StartBody.css";
import { Link } from "react-router-dom"; 


const StartBody = () => {
  return (
     <div className="Body-back">
    <div className="Body">
   
          
           <Link to="/Login">
          <button className="pass-button">로그인 후 바로 이용하기 ➜</button></Link>

          
  
    </div>
      {/*<section className="contents-section">
        <Link to="/Introduse">
        <button className="content-card"></button></Link>

    <Link to="/IntroduseSE">
        <button className="content-card"></button></Link>

        <Link to="/IntroduseTH">
        <button className="content-card"></button></Link>

        <Link to="/IntroduseFO">
        <button className="content-card"></button></Link>
      </section>*/}

   
    </div>
  );
};

export default StartBody;