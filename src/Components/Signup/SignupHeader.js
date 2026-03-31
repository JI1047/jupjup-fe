import "../../Styles/Signup/SignupHeader.css";


const SignupHeader = () => {
  return (
    <div className="SignupHeader">
     <a href="/oauth2/authorization/kakao">
       <button className="Home-button">카카?�로 ?�원가??/button></a>

        <a href="/oauth2/authorization/naver">
         <button className="Home-button">?�이버로 ?�원가??/button></a>


    </div>
     
       
  );
};

export default SignupHeader;
