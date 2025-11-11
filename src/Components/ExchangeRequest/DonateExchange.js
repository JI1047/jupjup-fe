// parts/DonateExchange.js
import React, { useMemo, useState } from "react";
import "./DonateExchange.css";

const CHARITIES = [
  { id: "redcross",  name: "대한적십자사",            img: "/images/적십자.png" },
  { id: "kaawa",     name: "한국유기동물복지협회",    img: "/images/유기동물.png" },
  { id: "holt",      name: "홀트아동복지회",          img: "/images/아동.png" },
  { id: "kara",      name: "동물권행동 카라",         img: "/images/카라.png" },
  { id: "snail",     name: "사랑의 달팽이",           img: "/images/달팽이.png" },
  { id: "h2h",       name: "하트-하트 재단",          img: "/images/하트.png" },
  { id: "milal",     name: "밀알복지재단",            img: "/images/밀알.png" },
];

const PAY_METHODS = ["카드결제", "계좌이체", "간편결제"];

export default function DonateExchange({ balance = 12000 }) {
  const [selectedCharity, setSelectedCharity] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [amount, setAmount] = useState(1000); // 사용자가 직접 입력

  const total = useMemo(() => Math.max(0, Number(amount) || 0), [amount]);

  /** 🔹 포인트 입력 시 검사 로직 */
  const handleAmountChange = (e) => {
    const value = Math.max(1, Number(e.target.value) || 1);

    if (value > balance) {
      alert("보유 포인트를 초과할 수 없습니다!");
      setAmount(balance);
    } else {
      setAmount(value);
    }
  };

  const onDonateClick = () => {
    if (!selectedCharity) return alert("기부 단체를 선택해주세요.");
    if (total < 1) return alert("1P 이상만 기부 가능합니다.");
    if (total > balance) return alert("보유 포인트보다 많은 금액은 기부할 수 없습니다.");
    setShowModal(true);
  };

  const submitDonation = () => {
    if (total > balance) return alert("포인트가 부족합니다.");
    setShowModal(false);
    alert("기부가 완료되었습니다. 감사합니다!");
  };

  const onMethodClick = (m) => alert(`${m} 선택(데모)`);

  return (
    <div className="details">
      <div className="section-title">기부 단체 선택</div>

      {/* 단체 카드 그리드 */}
      <div className="product-grid">
        {CHARITIES.map((c) => (
          <button
            key={c.id}
            type="button"
            className={`product-card ${selectedCharity === c.id ? "active" : ""}`}
            onClick={() => setSelectedCharity(c.id)}
          >
            <div className="thumb" aria-hidden>
              {/* 이미지 크기 조절: .thumb / .thumb img 를 CSS에서 조정 */}
              <img src={c.img} alt={c.name} />
            </div>
            <div className="product-name">{c.name}</div>
          </button>
        ))}
      </div>

      {/* 🔹 기부 포인트 입력 */}
      <div className="amount-row">
        <label htmlFor="donateAmountMain">기부 포인트</label>
        <div className="amount-input-wrap">
          <input
            id="donateAmountMain"
            type="number"
            min={1}
            value={amount}
            onChange={handleAmountChange}
          />
          <div className="balance-chip" title="보유 포인트">
            현재 포인트&nbsp;<strong>{balance.toLocaleString()} P</strong>
          </div>
        </div>
      </div>

      {/* 요약 / 기부하기 */}
      <div className="summary-bar">
        <div className="summary-left">
          기부 예정 포인트 <strong>{total.toLocaleString()} P</strong>
        </div>
        <button type="button" className="final-btn donate" onClick={onDonateClick}>
          기부하기
        </button>
      </div>

      {/* ===== 미니창(모달) ===== */}
      {showModal && (
        <div className="donate-modal-backdrop" onClick={() => setShowModal(false)}>
          <div
            className="donate-modal"
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close" onClick={() => setShowModal(false)} aria-label="닫기">
              ×
            </button>

            <div className="modal-title">기부 포인트 확인</div>
            <div className="modal-balance">
              보유 포인트 <strong>{balance.toLocaleString()} P</strong>
            </div>

            <div className="modal-row">
              <label htmlFor="donateAmount">기부 포인트</label>
              <input
                id="donateAmount"
                type="number"
                min={1}
                value={amount}
                onChange={handleAmountChange}
              />
            </div>

            <div className="modal-summary">
              선택된 단체:&nbsp;
              <strong>{CHARITIES.find((c) => c.id === selectedCharity)?.name || "-"}</strong>
              <span className="divider">·</span>
              총 기부: <strong>{total.toLocaleString()} P</strong>
            </div>

            <div className="modal-methods">
              {PAY_METHODS.map((m) => (
                <button
                  key={m}
                  type="button"
                  className="method-btn"
                  onClick={() => onMethodClick(m)}
                >
                  {m}
                </button>
              ))}
            </div>

            <button className="modal-submit" onClick={submitDonation}>
              기부 확정
            </button>

            <div className="modal-note">
              <p className="strong">정말 기부하시겠어요?</p>
              <p>
                기부는 취소가 어려울 수 있으니 신중히 결정해 주세요.
                <br />
                여러분의 따뜻한 마음이 큰 변화를 만듭니다. 감사합니다 💚
              </p>
              <p className="muted">
                ※ 기부 처리 및 영수증 발급은 제휴 기관 정책에 따르며, 포인트는 기부 확정 시 차감됩니다.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
