import { useNavigate } from 'react-router-dom';
import "../Styles/Test/Test.css";


const Test = () => {
 const navigate = useNavigate();

  const goToStart = () => {
    navigate('/start'); // App.js에 설정된 Start 페이지 경로
  };

  const goToMain = () => {
    navigate('/main'); // App.js에 설정된 Main 페이지 경로
  };

  return (
    <div className="Test">
        <h1> 버튼에서 이동되는 페이지부터 각자 작업</h1>
      <div className="button-container">
        <div className="button-box">
          <p>처음에 뜨는 소개 페이지</p>
          <button onClick={goToStart}>Start 페이지</button>
        </div>
        <div className="button-box">
          <p>지도가 있는 메인 페이지</p>
          <button onClick={goToMain}>Main 페이지</button>
        </div>
      </div>
    </div>
  );
};

export default Test;
