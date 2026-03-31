import "../../Styles/Signup/SignupHeader.css";


const SignupHeader = () => {
  return (
    <div className="SignupHeader">
     <a href="http://localhost:8080/oauth2/authorization/kakao">
       <button className="Home-button">카카오로 회원가입</button></a>

        <a href="http://localhost:8080/oauth2/authorization/naver">
         <button className="Home-button">네이버로 회원가입</button></a>


    </div>
     
       
  );
};

export default SignupHeader;