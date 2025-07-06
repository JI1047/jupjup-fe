import "../Styles/Mypage/MyPage.css";
import MypageHeader from "../Components/MyPage/MypageHeader.js";
import MypageBody from "../Components/MyPage/MypageBody.js";
import Sidebar from "../Components/MyPage/MypageSidebar.js";


const MyPage = () => {
  return (
    <div className="My">
      <MypageHeader />
      <MypageBody />
      <Sidebar />
    </div>
  );
};

export default MyPage;