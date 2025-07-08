import "../../Styles/Mypage/MypageBody.css";
import UserProfile from "./Sections/UserProfile";
import PointHistory from "./Sections/PointHistory";
import ResourceInfo from "./Sections/ResourceInfo";

const MypageBody = () => {
  return (
        <div className="My-Body">
        <UserProfile />
      <PointHistory />
      <ResourceInfo />
</div>
     );
};
   
export default MypageBody;