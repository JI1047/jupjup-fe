import "../Styles/Start/Start.css";
import Header from "../Components/Start/StartHeader";
import Body from "../Components/Start/StartBody";
//import Footer from "../Components/Start/StartFooter";




const Start = () => {
  return (
    <div className="Background">
     
        <Header />
         <div className="image-wrapper">
           <img
          src="/images/Start2.png" 
          alt="CHAJAJJU 메인 이미지"
          className="full-bg"
        />
        
        </div>
        <Body />
      </div>

      /*<Body />
         <Footer />*/
  
  );
};

export default Start;