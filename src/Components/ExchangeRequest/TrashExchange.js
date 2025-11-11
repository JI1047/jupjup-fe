// parts/TrashExchange.js
import React, { useState, useMemo } from "react";
import "./TrashExchange.css";

const PRODUCTS = [
  { id: "bag10",  name: "종량제 10L",  price: 500,  img: "/images/음식물.png" },
  { id: "bag20",  name: "종량제 20L",  price: 900,  img: "/images/공공용.png" },
  { id: "bag50",  name: "종량제 50L",  price: 2000, img: "/images/재사용.png" },
  { id: "bag100", name: "종량제 100L", price: 3700, img: "/images/소각용.png" },
];

const CITIES = [
  "서울시","수원시","용인시","고양시","성남시","부천시","안양시",
  "안산시","의정부시","남양주시","화성시","평택시","시흥시",
  "파주시","김포시","광명시","하남시","군포시","의왕시","과천시",
];

export default function TrashExchange({ balance }) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCity, setSelectedCity] = useState("");
  const [quantity, setQuantity] = useState(1);

  const price = useMemo(() => {
    const p = PRODUCTS.find(v => v.id === selectedProduct);
    return p ? p.price : 0;
  }, [selectedProduct]);

  const total = price * quantity;
  const dec = () => setQuantity(q => Math.max(1, q - 1));
  const inc = () => setQuantity(q => q + 1);

  const onPurchase = () => {
    if (!selectedProduct) return alert("상품을 선택해주세요.");
    if (!selectedCity) return alert("도시(시)를 선택해주세요.");
    if (quantity < 1) return alert("수량은 1 이상이어야 합니다.");
    if (total > balance) return alert("포인트가 부족합니다.");
    alert("교환 신청이 완료되었습니다.");
  };

  return (
    <div className="details">
      <div className="section-title">상품 선택</div>
      <div className="product-grid">
        {PRODUCTS.map(p => (
          <button key={p.id} type="button"
            className={`product-card ${selectedProduct === p.id ? "active" : ""}`}
            onClick={() => setSelectedProduct(p.id)}>
            <div className="thumb" aria-hidden>
              <img src={p.img} alt={p.name} />
            </div>
            <div className="product-name">{p.name}</div>
            <div className="product-price">{p.price.toLocaleString()} P</div>
          </button>
        ))}
      </div>

      <div className="form-row">
        <label htmlFor="citySelect">도시(시)</label>
        <select id="citySelect" value={selectedCity} onChange={e => setSelectedCity(e.target.value)}>
          <option value="">선택하세요</option>
          {CITIES.map(city => <option key={city} value={city}>{city}</option>)}
        </select>
      </div>

      <div className="form-row">
        <label>종량제 봉투</label>
        <select className="bag-select" value={selectedProduct || ""} onChange={e => setSelectedProduct(e.target.value)}>
          <option value="">용량 선택</option>
          <option value="bag10">10L</option>
          <option value="bag20">20L</option>
          <option value="bag50">50L</option>
          <option value="bag100">100L</option>
        </select>

        <div className="qty">
          <button type="button" onClick={dec} aria-label="수량 감소">−</button>
          <input type="number" min={1} value={quantity}
            onChange={e => setQuantity(Math.max(1, Number(e.target.value) || 1))}/>
          <button type="button" onClick={inc} aria-label="수량 증가">＋</button>
        </div>
      </div>

      <div className="summary-bar">
        <div className="summary-left">
          총 수량 <strong>{quantity}</strong>개
          <span className="divider">·</span>
          총 포인트 <strong>{total.toLocaleString()} P</strong>
        </div>
        <button type="button" className="final-btn" onClick={onPurchase}>구매 결정</button>
      </div>
    </div>
  );
}
