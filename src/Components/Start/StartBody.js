import "../../Styles/Start/StartBody.css";
import { Link } from "react-router-dom"; 


const StartBody = () => {
  return (
     <div className="Body-back">
    <div className="Body">
      <div className="slogan">
          <h1>이미지 공간</h1>
           <Link to="/Signup">
          <button className="pass-button">회원가입 후 바로 이용하기 ➜</button></Link>
    </div> 
    </div>
      <section className="contents-section">
        <div className="content-card">Contents</div>
        <div className="content-card">Contents</div>
        <div className="content-card">Contents</div>
        <div className="content-card">Contents</div>
      </section>

   
    </div>
  );
};

export default StartBody;