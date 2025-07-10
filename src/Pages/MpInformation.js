import "../Styles/Mypage/MypageInformation.css";
import MypageHeader from "../Components/MyPage/MypageHeader.js";
import InformationBody from "../Components/MyPage/InformationBody.js";



const MypageInformation = () => {
  return (
    <div className="My-Information">
        <MypageHeader />
        <InformationBody />
      
    </div>
  );
};

export default MypageInformation;