import "../Styles/Mypage/MyPage.css";
import MypageHeader from "../Components/MyPage/MypageHeader.js";
import MypageBody from "../Components/MyPage/MypageBody";
import Sidebar from "../Components/MyPage/MypageSidebar";


const MyPage = () => {
  return (
    <div className="My">
       <MypageHeader />
         <MypageBody />
         <Sidebar  />
    </div>
  );
};

export default MyPage;