import "../../Styles/Mypage/PointHistory.css";
import Header from "./MPsectionHeader.js";
import { useState, useEffect } from "react";

const MypagePointHistory = () => {
  const [historyList, setHistoryList] = useState([]);

  // 🔥 페이지 로드될 때 전체 이력 가져오기
  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    fetch("http://13.209.202.27:8080/recycle-history/user", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("📌 전체 이력:", data);
        setHistoryList(data);
      })
      .catch((err) => console.error("❌ 이력 불러오기 실패:", err));
  }, []);

  return (
    <div className="My-PointHistory">
      <Header />

      <div className="PointHistory">
        <div className="PointHistory-Body">
          <section className="point-summary">
            <h2>보유 포인트</h2>
            <div className="current-point">24P</div>
          </section>

          <section className="point-history-list">
            <table className="point-table">
              <thead>
                <tr>
                  <th>날짜</th>
                  <th>위치</th>      {/* 🔥 추가 */}
                  <th>내용</th>
                  <th>포인트</th>
                </tr>
              </thead>

              <tbody>
                {historyList.length === 0 ? (
                  <tr>
                    <td colSpan="3" style={{ textAlign: "center", padding: "20px" }}>
                      이력이 없습니다.
                    </td>
                  </tr>
                ) : (
                  historyList.map((item) => (
                    <tr key={item.id}>
                      <td>{item.date.substring(0, 10)}</td>
                      <td>{item.place}</td>            {/* 🔥 거점 위치 */}
                      <td>{item.item}</td>
                      <td>{item.points > 0 ? `+${item.points}P` : `${item.points}P`}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </section>
        </div>
      </div>
    </div>
  );
};

export default MypagePointHistory;
