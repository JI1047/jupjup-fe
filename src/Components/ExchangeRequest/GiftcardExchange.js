// parts/GiftcardExchange.js
import React, { useMemo, useState } from "react";
import "./GiftcardExchange.css";

/** 상품 이미지 경로
 * - public/images/ 폴더 기준 예시입니다.
 *   (원하면 src/assets import 방식으로 바꿔도 됨)
 */
const PRODUCTS = [
  { id: "gift5",   name: "상품권 5,000원",  price: 5000,  img: "/images/5000_gift.jpg"  },
  { id: "gift10",  name: "상품권 10,000원", price: 10000, img: "/images/10000_gift.jpg" },
  { id: "gift50",  name: "상품권 50,000원", price: 50000, img: "/images/50000_gift.jpg" },
  { id: "google",  name: "Google Play 기프트", price: null, img: "/images/googlePlay_gift.png" },
];

/** Google Play 선택 시 노출되는 금액 옵션 */
const GOOGLE_AMOUNTS = [5000, 10000, 20000, 30000, 50000];

export default function GiftcardExchange({ balance = 12000 }) {
  const [selectedProduct, setSelectedProduct] = useState(null); // "gift5" | "gift10" | "gift50" | "google"
  const [googleAmount, setGoogleAmount] = useState("");         // "5000" | "10000" | ...
  const [quantity, setQuantity] = useState(1);

  const basePrice = useMemo(() => {
    if (selectedProduct === "google") {
      return Number(googleAmount) || 0;
    }
    const p = PRODUCTS.find(v => v.id === selectedProduct);
    return p?.price || 0;
  }, [selectedProduct, googleAmount]);

  const total = basePrice * quantity;

  const dec = () => setQuantity(q => Math.max(1, q - 1));
  const inc = () => setQuantity(q => q + 1);

  const onPurchase = () => {
    if (!selectedProduct) return alert("상품을 선택해주세요.");
    if (selectedProduct === "google" && !googleAmount) {
      return alert("Google Play 금액을 선택해주세요.");
    }
    if (quantity < 1) return alert("수량은 1 이상이어야 합니다.");
    if (total > balance) return alert("포인트가 부족합니다.");

    // 이후 API 연동 지점
    alert("교환 신청이 완료되었습니다.");
  };

  return (
    <div className="details">
      <div className="section-title">상품권 선택</div>

      {/* 상품 그리드 */}
      <div className="product-grid">
        {PRODUCTS.map(p => (
          <button
            key={p.id}
            type="button"
            className={`product-card ${selectedProduct === p.id ? "active" : ""}`}
            onClick={() => setSelectedProduct(p.id)}
          >
            <div className="thumb" aria-hidden>
              {/* ▼ 이미지 크기 조절 포인트: .thumb / .thumb img 스타일을 GiftcardExchange.css에서 조절하세요 */}
              <img src={p.img} alt={p.name} />
            </div>
            <div className="product-name">{p.name}</div>
            <div className="product-price">
              {p.id === "google"
                ? (googleAmount ? `${Number(googleAmount).toLocaleString()} P` : "금액 선택 필요")
                : `${p.price.toLocaleString()} P`}
            </div>
          </button>
        ))}
      </div>

      {/* Google Play 전용 금액 선택 (선택 시에만 표시) */}
      {selectedProduct === "google" && (
        <div className="form-row">
          <label htmlFor="googleAmount">금액 선택</label>
          <select
            id="googleAmount"
            value={googleAmount}
            onChange={(e) => setGoogleAmount(e.target.value)}
          >
            <option value="">선택하세요</option>
            {GOOGLE_AMOUNTS.map(a => (
              <option key={a} value={a}>{a.toLocaleString()}원</option>
            ))}
          </select>
        </div>
      )}

      {/* 수량 */}
      <div className="form-row">
        <label>수량</label>
        <div className="qty">
          <button type="button" onClick={dec} aria-label="수량 감소">−</button>
          <input
            type="number"
            min={1}
            value={quantity}
            onChange={e => setQuantity(Math.max(1, Number(e.target.value) || 1))}
          />
          <button type="button" onClick={inc} aria-label="수량 증가">＋</button>
        </div>
      </div>

      {/* 요약 / 구매 결정 */}
      <div className="summary-bar">
        <div className="summary-left">
          총 수량 <strong>{quantity}</strong>개
          <span className="divider">·</span>
          총 포인트 <strong>{total.toLocaleString()} P</strong>
        </div>
        <button type="button" className="final-btn" onClick={onPurchase}>
          구매 결정
        </button>
      </div>
    </div>
  );
}
