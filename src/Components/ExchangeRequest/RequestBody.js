import React, { useState } from "react";
import "../../Styles/ExchangeRequest/RequestBody.css";

const RequestBody = () => {
  const [option, setOption] = useState("bongtoo");

  const options = [
    {
      id: "bongtoo",
      label: (
        <>
          중앙제 봉투로 교환
          <span className="subtext"> *1000P 당 종량제 1개 지급됩니다</span>
        </>
      ),
    },
    { id: "giftcard", label: "상품권으로 교환" },
    { id: "index", label: "Index" },
  ];

  return (
    <div className="requestbody">
    <div className="exchange-wrap">
      {/* 보유 포인트 */}
      <div className="points-row">
        <div className="points-title">보유 포인트</div>
        <div className="points-value">
          1,500 <span>Point</span>
        </div>
      </div>
      <hr className="divider" />
 
        <button className="policy-link" type="button">
        *포인트 교환 정책 자세히 알아보기 →
      </button>

      {/* 옵션 */}
      <div className="options">
        {options.map(({ id, label }) => (
          <label key={id} className={`option ${option === id ? "active" : ""}`}>
            <input
              type="radio"
              name="exchange-option"
              value={id}
              checked={option === id}
              onChange={() => setOption(id)}
            />
            <span className="radio-visual" aria-hidden />
            <span className="option-label">{label}</span>
          </label>
        ))}
      </div>

    

      {/* 제출 버튼 */}
      <button className="submit-btn" type="button">
        포인트 교환 신청
      </button>
    </div>
    </div>
  );
}
export default RequestBody;