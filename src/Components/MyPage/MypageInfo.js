import "../../Styles/Mypage/MypageInfo.css";
import Header from "./MPsectionHeader.js";



const MypageInformation = () => {
  return (
    <div className="My-Information">
       <Header />
       
       <div className="Information-Body">
       <form className="info-form">
        <label>
          이름
          <input type="text" placeholder="이름을 입력하세요" />
        </label>

        <label>
          이메일
          <input type="email" placeholder="이메일을 입력하세요" />
        </label>

        <label>
          전화번호
          <input type="text" placeholder="전화번호를 입력하세요" />
        </label>

        <label>
          새 비밀번호
          <input type="password" placeholder="새 비밀번호" />
        </label>

        <label>
          비밀번호 확인
          <input type="password" placeholder="비밀번호 확인" />
        </label>

        <button type="submit">저장</button>
      </form>
      </div>
    </div>
  );
};

export default MypageInformation;