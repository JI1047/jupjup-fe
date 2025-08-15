import "../../Styles/Mypage/MypageBody.css";
import UserProfile from "./Sections/UserProfile";
import PointExchange from "./Sections/PointExchange";
import ResourceInfo from "./Sections/ResourceInfo";

const MypageBody = () => {
  return (
        <div className="My-Body">
        <UserProfile />
       <ResourceInfo />
      <PointExchange />
</div>
     );
};
   
export default MypageBody;