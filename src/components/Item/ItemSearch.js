import React, { useEffect, useState } from 'react';

const SearchItems = () => {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState([]);
  const [points, setPoints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://13.209.202.27:8080/item/search')
      .then(res => res.json())
      .then(data => {
        console.log('📦 받은 data:', data);
        setItems(data);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleChangeItem = (e) => {
    const selectedId = parseInt(e.target.value, 10);
    const item = items.find(it => it.id === selectedId);
    setSelectedItem(item);
    setQuantity(1);
  };

  const handleChangeQuantity = (e) => {
    const val = parseInt(e.target.value, 10);
    setQuantity(isNaN(val) || val < 0 ? 0 : val);
  };

  const handleAddToCart = () => {
    if (!selectedItem || quantity <= 0) return;

    const exists = cart.find(c => c.id === selectedItem.id);
    if (exists) {
      setCart(cart.map(c =>
        c.id === selectedItem.id
          ? { ...c, quantity: c.quantity + quantity, total: (c.quantity + quantity) * c.unitPrice }
          : c
      ));
    } else {
      setCart([...cart, {
        id: selectedItem.id,
        name: selectedItem.name,
        unitPrice: selectedItem.unitPrice,
        quantity,
        total: selectedItem.unitPrice * quantity
      }]);
    }

    setSelectedItem(null);
    setQuantity(1);
  };

  const handleSubmit = () => {
    const itemIds = cart.map(item => item.id);

    fetch('http://13.209.202.27:8080/item/item-search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ itemIds })
    })
      .then(res => res.json())
      .then(data => {
        console.log('서버 응답(거점 리스트):', data);
        setPoints(data);
      })
      .catch(err => console.error('에러:', err));
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.total, 0);

  return (
    <div style={{ padding: '20px' }}>
      <h2>수거 아이템 선택</h2>
      {loading ? (
        <div>로딩 중...</div>
      ) : (
        <>
          <select onChange={handleChangeItem} value={selectedItem?.id || ''}>
            <option value="">-- 아이템 선택 --</option>
            {items.map(item => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>

          {selectedItem && (
            <>
              <div style={{ marginTop: '10px' }}>
                <label>
                  수량(kg): 
                  <input 
                    type="number"
                    min="0"
                    value={quantity}
                    onChange={handleChangeQuantity}
                    style={{ marginLeft: '10px', width: '80px' }}
                  />
                </label>
                <button 
                  onClick={handleAddToCart} 
                  style={{ marginLeft: '10px' }}
                >
                  추가하기
                </button>
              </div>

              <div style={{ marginTop: '10px' }}>
                <strong>ID:</strong> {selectedItem.id} <br />
                <strong>단가:</strong> {selectedItem.unitPrice} 원
              </div>

              <div style={{ marginTop: '10px', fontSize: '18px' }}>
                💰 총 가격: <strong>{(selectedItem.unitPrice * quantity).toLocaleString()} 원</strong>
              </div>
            </>
          )}

          <h3 style={{ marginTop: '30px' }}>🛒 장바구니</h3>
          <ul>
            {cart.map((item, idx) => (
              <li key={idx}>
                {item.name} - {item.quantity}개 - 합 {item.total}원
              </li>
            ))}
          </ul>

          <div style={{ marginTop: '10px', fontSize: '18px' }}>
            💰 총 합계: <strong>{totalPrice.toLocaleString()} 원</strong>
          </div>

          <button 
            onClick={handleSubmit} 
            style={{ marginTop: '20px', padding: '10px 20px' }}
          >
            선택 아이템으로 거점 검색 (POST)
          </button>

          {points.length > 0 && (
            <div style={{ marginTop: '40px' }}>
              <h3>추천 거점 리스트</h3>
              <ul>
                {points.map((point, idx) => (
                  <li key={idx}>
                    <strong>{point.name}</strong><br />
                    주소: {point.lotAddress}<br />
                    연락처: {point.tel}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SearchItems;
