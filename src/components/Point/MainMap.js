import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MainMap = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ JWT 있는지 확인
    const token = localStorage.getItem("accessToken");
    if (!token) {
      alert("로그인 후 이용해주세요.");
      navigate("/oauth/loginInfo");
      return;
    }

    const script = document.createElement('script');
    script.src =
      '//dapi.kakao.com/v2/maps/sdk.js?appkey=f698892088386f2ca502628b65c42eab&autoload=false';
    script.async = true;

    script.onload = () => {
      console.log("🔥 SDK 로딩 시작");
      console.log("✅ window.kakao 상태:", window.kakao);

      window.kakao.maps.load(() => {
        const mapContainer = document.getElementById('map');
        const mapOption = {
          center: new window.kakao.maps.LatLng(37.6581404, 126.8321693),
          level: 7,
        };

        const map = new window.kakao.maps.Map(mapContainer, mapOption);

        const imageSrc =
          'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';

        // ✅ EC2 IP 사용
        fetch('http://13.209.202.27:8080/map/main')
          .then((res) => res.json())
          .then((data) => {
            data.forEach((pos) => {
              const imageSize = new window.kakao.maps.Size(24, 35);
              const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);

              const marker = new window.kakao.maps.Marker({
                map: map,
                position: new window.kakao.maps.LatLng(pos.latitude, pos.longitude),
                title: pos.name,
                image: markerImage,
              });

              // ✅ 수거 항목 리스트 처리
              const itemListHtml = pos.itemNames && pos.itemNames.length > 0
                ? `<ul style="padding-left: 18px; margin-top: 4px;">
                    ${pos.itemNames.map(item => `<li>${item}</li>`).join('')}
                  </ul>`
                : '<div>수거 품목 정보 없음</div>';

              const infowindow = new window.kakao.maps.InfoWindow({
                content: `
                  <div style="
                    position: relative;
                    padding: 10px;
                    background: #fff;
                    border: 1px solid #ccc;
                    border-radius: 8px;
                    font-size: 14px;
                    box-shadow: 2px 2px 8px rgba(0,0,0,0.3);
                    max-width: 240px;
                  ">
                    <div style="font-weight: bold; margin-bottom: 5px;">${pos.name}</div>
                    <div>주소: ${pos.lotAddress}</div>
                    <div>연락처: ${pos.tel}</div>
                    <div>설명: ${pos.description}</div>
                    <div style="margin-top: 5px;"><strong>수거 항목:</strong></div>
                    ${itemListHtml}
                    <div style="
                      content: '';
                      position: absolute;
                      bottom: -10px;
                      left: 50%;
                      margin-left: -10px;
                      width: 0;
                      height: 0;
                      border: 10px solid transparent;
                      border-top-color: #fff;
                      z-index: 1;
                    "></div>
                  </div>
                `
              });

              window.kakao.maps.event.addListener(marker, 'click', function () {
                infowindow.open(map, marker);
              });
            });
          })
          .catch((err) => {
            console.error('마커 데이터 로딩 실패:', err);
          });
      });
    };

    document.head.appendChild(script);
  }, [navigate]);

  return (
    <div style={{ position: 'relative' }}>
      <div id="map" style={{ width: '100vw', height: '100vh' }}></div>

      {/* ✅ 오른쪽 위 고정 버튼 */}
      <div style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        zIndex: 1000,
      }}>
        <button
          onClick={() => navigate('/mypage')}
          style={{
            padding: '10px 16px',
            background: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          마이페이지
        </button>
        <button
          onClick={() => navigate('/search')}
          style={{
            padding: '10px 16px',
            background: '#2196F3',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          거점 검색
        </button>
      </div>
    </div>
  );
};

export default MainMap;
