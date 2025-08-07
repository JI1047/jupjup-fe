import React, { useRef, useEffect, useState } from "react";

export function RecyclableInfo({ onClose }) {
  const modalRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // 처음 한 번: 중앙 배치
    const centerX = window.innerWidth / 2 - 195;
    const centerY = window.innerHeight / 2 - 350;
    setPosition({ x: centerX, y: centerY });
  }, []);
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!dragging) return;
      const newX = e.clientX - offset.x;
      const newY = e.clientY - offset.y;
      setPosition({ x: newX, y: newY });
    };
  
    const handleMouseUp = () => setDragging(false);
  
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging, offset]);
  

  const startDrag = (e) => {
    const rect = modalRef.current.getBoundingClientRect();
    setDragging(true);
    setOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const infoData = [
    {
      title: "플라스틱 병",
      image: "./trash.jpeg",
      description: [
        {
          text: "#고기 PA(선용품) 플라스틱 음료수 용기, 물통",
          color: "#374151",
        },
        { text: "#라벨지 부착된 상태에서 배수 매립 처리", color: "#1f2937" },
      ],
    },
    {
      title: "캔류",
      image: "./trash.jpeg",
      description: [
        { text: "#칫솔 인쇄품의 부착식 실압 내장 공정", color: "#4b5563" },
        { text: "단음, 단추 저류물질 표시 부가 처리나", color: "#6b7280" },
        { text: "안전한 회수법임으로 집재", color: "#9ca3af" },
      ],
    },
    {
      title: "유리병",
      image: "./trash.jpeg",
      description: [
        { text: "음료수, 맥주 화장품, 의약품 화장품의", color: "red" },
        { text: "진료원 우시 수거해야 함수 소형 용기", color: "#6b7280" },
        { text: "스테인리스 금 망류를 교체 제거 후지", color: "#9ca3af" },
        { text: "기어 이내에 따른 병물질 처리 금지", color: "#6b7280" },
        { text: "종류낭, 물품 주위 물맥품의 아니시", color: "#4b5563" },
        { text: "증가이 흠품의 아니시 격리", color: "#1f2937" },
      ],
    },
    {
      title: "기타",
      image: "./trash.jpeg",
      description: [
        {
          text: "플라스틱 용기, 포장재, 백박지류 아니시금 올",
          color: "#6b7280",
        },
        { text: "기타 다회의 건물 화면 일치", color: "#9ca3af" },
      ],
    },
    {
      title: "잡병류",
      image: "./trash.jpeg",
      description: [
        { text: "접촉마고 정리된 충결 관리시설", color: "#4b5563" },
        { text: "제고 진료 취대처 아니시설", color: "#6b7280" },
      ],
    },
    {
      title: "유리병+뚜껑",
      image: "./trash.jpeg",
      description: [],
    },
  ];

  return (
    <>
      <style>
        {`
          .info-container {
            padding: 16px;
            font-family: sans-serif;
          }

          .info-title {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 24px;
            text-align: center;
          }

          .info-block {
            margin-bottom: 32px;
            padding-bottom: 16px;
            border: none;
            
          }

          .info-header {
            font-weight: bold;
            font-size: 16px;
            margin-bottom: 8px;
          }

          .info-img {
            max-width: 100%;
            height: auto;
            margin: 8px 0;
            // display: block;
            justify-content: center;
          }

          .info-description {
            font-size: 14px;
            margin: 4px 0;
            line-height: 1.5;
          }

          .modal-backdrop {
            position: fixed;
            inset: 0;
            background-color: rgba(0,0,0,0.5);
            z-index: 1000;
          }

          .modal-content {
            position: fixed;
            background: white;
            max-width: 600px;
            max-height: 80vh;
            overflow-y: auto;
            z-index: 1001;
            padding: 24px;
            cursor: move;
          }

          .modal-close {
            position: absolute;
            top: 8px;
            right: 12px;
            background: none;
            border: none;
            font-size: 20px;
            cursor: pointer;
            color: #ef4444;
          }
        `}
      </style>

      <div className="modal-backdrop" onClick={onClose}></div>

      <div
        className="modal-content"
        ref={modalRef}
        onMouseDown={startDrag}
        style={{
          left: position.x,
          top: position.y,
        }}
      >
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="info-container">
          <h2 className="info-title">재정된 물품 목록 매뉴얼</h2>
          {infoData.map((item, index) => (
              <div className="info-block" key={index}>
                <div className="info-header">{item.title}</div>
                <img src={item.image} alt={item.title} className="info-img" />
                {item.description.map((desc, i) => (
                  <div
                    key={i}
                    className="info-description"
                    style={{ color: desc.color }}
                  >
                    {desc.text}
                  </div>
                ))}
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
