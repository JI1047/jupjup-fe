import "../../Styles/Mypage/PointHistory.css";
import Header from "./MPsectionHeader.js";
import { useState, useEffect } from "react";

const MypagePointHistory = () => {
  const [historyList, setHistoryList] = useState([]);

  // ?î• ?òÏù¥ÏßÄ Î°úÎìú?????ÑÏ≤¥ ?¥Î†• Í∞Ä?∏Ïò§Í∏?  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    fetch("/recycle-history/user", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("?ìå ?ÑÏ≤¥ ?¥Î†•:", data);
        setHistoryList(data);
      })
      .catch((err) => console.error("???¥Î†• Î∂àÎü¨?§Í∏∞ ?§Ìå®:", err));
  }, []);

  return (
    <div className="My-PointHistory">
      <Header />

      <div className="PointHistory">
        <div className="PointHistory-Body">
          <section className="point-summary">
            <h2>Î≥¥Ïú† ?¨Ïù∏??/h2>
            <div className="current-point">24P</div>
          </section>

          <section className="point-history-list">
            <table className="point-table">
              <thead>
                <tr>
                  <th>?†Ïßú</th>
                  <th>?ÑÏπò</th>      {/* ?î• Ï∂îÍ? */}
                  <th>?¥Ïö©</th>
                  <th>?¨Ïù∏??/th>
                </tr>
              </thead>

              <tbody>
                {historyList.length === 0 ? (
                  <tr>
                    <td colSpan="3" style={{ textAlign: "center", padding: "20px" }}>
                      ?¥Î†•???ÜÏäµ?àÎã§.
                    </td>
                  </tr>
                ) : (
                  historyList.map((item) => (
                    <tr key={item.id}>
                      <td>{item.date.substring(0, 10)}</td>
                      <td>{item.place}</td>            {/* ?î• Í±∞Ï†ê ?ÑÏπò */}
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
