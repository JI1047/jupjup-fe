import React from "react";

export function RecyclableInfo() {
  const infoData = [
    {
      title: "플라스틱 병",
      image: "./trash.jpeg",
      description: [
        { text: "#고기 PA(선용품) 플라스틱 음료수 용기, 물통", color: "#374151" },
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
        { text: "플라스틱 용기, 포장재, 백박지류 아니시금 올", color: "#6b7280" },
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
        `}
      </style>

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
    </>
  );
}
