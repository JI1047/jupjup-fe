import React, { useState } from "react";

export function RecyclableSelector({ onAddItem }) {
  const [selectedItem, setSelectedItem] = useState("");
  const [quantity, setQuantity] = useState(1);

  const recyclableItems = [
    "플라스틱 병",
    "캔",
    "유리병",
    "종이",
    "골판지",
    "비닐봉지",
    "스티로폼",
    "전자제품",
    "배터리",
    "의류",
  ];

  const handleAdd = () => {
    if (selectedItem && quantity > 0) {
      onAddItem(selectedItem, quantity);
      setSelectedItem("");
      setQuantity(1);
    }
  };

  return (
    <>
      <style>
        {`
          .selector-container {
            padding: 16px;
            border: 1px solid #d1d5db;
            border-radius: 6px;
            background-color: #f9fafb;
            display: flex;
            flex-direction: column;
            gap: 8px;
          }

          .selector-label {
            font-weight: bold;
            margin-bottom: 4px;
            font-size: 14px;
            text-align: start;
          }

          .selector-row {
            display: flex;
            gap: 8px;
            align-items: center;
            flex-wrap: wrap;
            justify-content: space-between;
          }
          
          .left { }

          .right {
            display: flex;
            gap: 8px;
          }

          select,
          input[type="number"] {
            padding: 8px;
            border-radius: 4px;
            border: 1px solid #ccc;
            font-size: 14px;
            min-width: 160px;
          }

          button {
            padding: 8px 16px;
            background-color: #3b82f6;
            color: white;
            border: none;
            border-radius: 4px;
            font-size: 14px;
            cursor: pointer;
          }

          button:hover {
            background-color: #2563eb;
          }
        `}
      </style>

      <div className="selector-container">
        <label className="selector-label">재활용품 선택</label>
        <div className="selector-row">
          <div className="left">
            <select
              value={selectedItem}
              onChange={(e) => setSelectedItem(e.target.value)}
            >
              <option value="">재활용품을 선택하세요</option>
              {recyclableItems.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div className="right">
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />

            <button onClick={handleAdd}>추가</button>
          </div>
        </div>
      </div>
    </>
  );
}
