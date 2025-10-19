import React, { useState } from "react";
import { RecyclableSelector } from "./RecyclableSelector.jsx";
import { RecyclableInfo } from "./RecyclableInfo.jsx";
import { Separator } from "../ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "./card.jsx";
import { useNavigate } from "react-router-dom";

// 가격 정보 (원 단위)
const recyclablePrices = {
  "플라스틱 병": 3,
  캔: 5,
  유리병: 8,
  종이: 2,
  골판지: 4,
  비닐봉지: 1,
  스티로폼: 2,
  전자제품: 100,
  배터리: 50,
  의류: 20,
};

export default function App() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const addRecyclableItem = (name, quantity) => {
    const newItem = {
      id: Date.now().toString(),
      name,
      quantity,
    };
    setSelectedItems([...selectedItems, newItem]);
  };

  const removeRecyclableItem = (id) => {
    setSelectedItems(selectedItems.filter((item) => item.id !== id));
  };

  const getTotalQuantity = () =>
    selectedItems.reduce((total, item) => total + item.quantity, 0);

  const getTotalItems = () => selectedItems.length;

  const getTotalValue = () =>
    selectedItems.reduce((total, item) => {
      const pricePerItem = recyclablePrices[item.name] || 0;
      return total + pricePerItem * item.quantity;
    }, 0);

  return (
    <>
      <style>
        {`
          .app {
            display: flex;
            height: 100vh;
            background-color: #f9fafb;
            font-family: sans-serif;
          }

          .left-panel {
            flex: 1;
            padding: 24px;
            background-color: #ffffff;
            display: flex;
            justify-content: center;
          }

          .right-panel {
            width: 33.33%;
            background-color: #ffffff;
            border-left: 1px solid #e5e7eb;
          }

          .photo-upload {
            border: 2px dashed #d1d5db;
            border-radius: 8px;
            padding: 32px;
            text-align: center;
            background-color: #4b5563;
            margin-bottom: 24px;
          }

          .photo-upload img {
            max-width: 100%;
            max-height: 256px;
            margin: 0 auto;
            border-radius: 8px;
          }

          .photo-upload .close-btn {
            position: absolute;
            padding: 0px 7.5px 0px 0px;
            right: 8px;
            background-color: #ef4444;
            color: #fff;
            border-radius: 9999px;
            width: 24px;
            height: 24px;
            text-align: right;
            font-size: 12px;
            cursor: pointer;
            border: none;
          }

          .photo-upload .upload-label {
            cursor: pointer;
            display: inline-block;
            background-color: #3b82f6;
            color: #fff;
            padding: 8px 16px;
            border-radius: 4px;
            margin-top: 8px;
          }

          .section {
            margin-top: 24px;
          }

          .item-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px;
            background-color: #f9fafb;
            border-radius: 4px;
          }

          .item-details {
            display: flex;
            align-items: center;
            gap: 16px;
            font-size: 14px;
            color: #4b5563;
          }

          .remove-btn {
            color: #ef4444;
            cursor: pointer;
            border: none;
            background: none;
          }

          .summary {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 16px;
            margin: 12px 0;
          }

          .summary .total {
            color: #16a34a;
          }

          h3 {
            font-size: 16px;
            margin-bottom: 12px;
          }

          h4 {
            font-size: 14px;
            color: #6b7280;
            margin-bottom: 6px;
          }
          .auth-button {
            display: flex;
            justify-content: flex-end;
            margin-top: 16px;
          }
        `}
      </style>
      <div className="My-Header">
        <button className="home-back-button" onClick={() => navigate("/Main")}>
          Home
        </button>
      </div>
      {isInfoModalOpen && (
        <RecyclableInfo onClose={() => setIsInfoModalOpen(false)} />
      )}
      <div className="app">
        {/* 왼쪽 패널 */}
        <div className="left-panel">
          <div style={{ width: "100%", maxWidth: "900px" }}>
            {/* 이미지 업로드 */}
            <div className="photo-upload">
              {uploadedImage ? (
                <div style={{ position: "relative" }}>
                  <img src={uploadedImage} alt="Uploaded" />
                  <button
                    onClick={() => setUploadedImage(null)}
                    className="close-btn"
                  >
                    X
                  </button>
                </div>
              ) : (
                <div style={{ color: "#fff" }}>
                  <div style={{ fontSize: "18px", marginBottom: "16px" }}>
                    분리 재활용품 사진 올리기
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ display: "none" }}
                    id="photo-upload"
                  />
                  <label htmlFor="photo-upload" className="upload-label">
                    사진 선택
                  </label>
                </div>
              )}
            </div>

            {/* 재활용품 선택 */}
            <div className="section">
              <RecyclableSelector
                onAddItem={addRecyclableItem}
                onHelpClick={() => setIsInfoModalOpen(true)}
              />
            </div>

            {/* 선택 항목 표시 */}
            {selectedItems.length > 0 && (
              <div className="section">
                <h3>선택된 재활용품</h3>
                <div>
                  {selectedItems.map((item) => {
                    const pricePerItem = recyclablePrices[item.name] || 0;
                    const totalItemValue = pricePerItem * item.quantity;
                    return (
                      <div key={item.id} className="item-row">
                        <span>
                          {item.name} - {item.quantity}개
                        </span>
                        <div className="item-details">
                          <span>
                            {item.name}은 현재 개당 {pricePerItem}원입니다. (총{" "}
                            {totalItemValue}원)
                          </span>
                          <button
                            onClick={() => removeRecyclableItem(item.id)}
                            className="remove-btn"
                          >
                            삭제
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <Separator />

                <div className="summary">
                  <div>총 수량: {getTotalQuantity()}개</div>
                  <div className="total">총 예상 가치: {getTotalValue()}원</div>
                </div>

                {/* 계산된 값 */}
                <Card>
                  <CardHeader>
                    <CardTitle>계산된 값</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="summary">
                      <span>선택된 항목 수:</span>
                      <span>{getTotalItems()}개 항목</span>
                    </div>
                    <div className="summary">
                      <span>총 수량:</span>
                      <span>{getTotalQuantity()}개</span>
                    </div>
                    <div className="summary">
                      <span>총 예상 가치:</span>
                      <span className="total">{getTotalValue()}원</span>
                    </div>
                    <Separator />
                    <div>
                      <h4>선택된 재활용품:</h4>
                      {selectedItems.map((item) => {
                        const pricePerItem = recyclablePrices[item.name] || 0;
                        const totalItemValue = pricePerItem * item.quantity;
                        return (
                          <div key={item.id} style={{ marginBottom: "8px" }}>
                            <div className="summary">
                              <span>{item.name}:</span>
                              <span>{item.quantity}개</span>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                fontSize: "12px",
                                color: "#6b7280",
                              }}
                            >
                              <span>단가: {pricePerItem}원</span>
                              <span>소계: {totalItemValue}원</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
            <div className="auth-button">
              <button
                onClick={() => navigate("/auth")}
                className="btn btn-default"
              >
                인증 페이지로 이동
              </button>
            </div>
          </div>
        </div>

        {/* 오른쪽 패널 */}
        {/* <div className="right-panel">
          <ScrollArea style={{ height: "100%" }}>
            <RecyclableInfo />
          </ScrollArea>
        </div> */}
      </div>
    </>
  );
}
