// RequestBody.js
import React, { useState } from "react";
import "../../Styles/ExchangeRequest/RequestBody.css";
import TrashExchange from "./TrashExchange.js";
import GiftcardExchange from "./GiftcardExchange.js";
import DonateExchange from "./DonateExchange.js";

export default function RequestBody({ balance = 12000 }) {
  const [selectedOption, setSelectedOption] = useState("trash"); // "trash" | "giftcard" | "donate"
  const [showDetails, setShowDetails] = useState(false);

  const onSubmit = () => {
    setShowDetails(true);
  };

  return (
    <div className="RequestBody">
      {/* 보유 포인트 */}
      <div className="balance-box">
        <span className="label">보유 포인트</span>
        <strong className="value">{balance.toLocaleString()} P</strong>
      </div>

      {/* 옵션 라디오 */}
      <div className="options">
        <label className={`option ${selectedOption === "trash" ? "active" : ""}`}>
          <input type="radio" name="exchange" value="trash"
            checked={selectedOption === "trash"} onChange={() => setSelectedOption("trash")} />
          <span className="radio-visual" aria-hidden />
          <span className="option-text">종량제 봉투 교환</span>
        </label>

        <label className={`option ${selectedOption === "giftcard" ? "active" : ""}`}>
          <input type="radio" name="exchange" value="giftcard"
            checked={selectedOption === "giftcard"} onChange={() => setSelectedOption("giftcard")} />
          <span className="radio-visual" aria-hidden />
          <span className="option-text">상품권 교환</span>
        </label>

        <label className={`option ${selectedOption === "donate" ? "active" : ""}`}>
          <input type="radio" name="exchange" value="donate"
            checked={selectedOption === "donate"} onChange={() => setSelectedOption("donate")} />
          <span className="radio-visual" aria-hidden />
          <span className="option-text">기부</span>
        </label>
      </div>

      <button className="submit-btn" onClick={onSubmit}>포인트 교환 신청</button>

      {/* 선택된 상세 파트 */}
      {showDetails && (
        <>
          {selectedOption === "trash" && <TrashExchange balance={balance} />}
          {selectedOption === "giftcard" && <GiftcardExchange balance={balance} />}
          {selectedOption === "donate" && <DonateExchange balance={balance} />}
        </>
      )}
    </div>
  );
}
