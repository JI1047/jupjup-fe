import "../Styles/Start/Start.css";
import Header from "../Components/Start/StartHeader";
import Body from "../Components/Start/StartBody";
import Footer from "../Components/Start/StartFooter";



const Start = () => {
  return (
    <div className="Background">
        로그인으로 이동할 수 있는 메인페이지
         <Header />
         <Body />
         <Footer />
    </div>
  );
};

export default Start;