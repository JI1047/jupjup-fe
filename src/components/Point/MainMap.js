import React, { useEffect } from 'react';

const MainMap = () => {
  useEffect(() => {
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
          center: new window.kakao.maps.LatLng(37.6581404, 126.8321693), // 고양시청 기준
          level: 7, // 확대 정도는 필요에 따라 조절
        };

        const map = new window.kakao.maps.Map(mapContainer, mapOption);

        const imageSrc =
          'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';

        // ✅ 위치 데이터 fetch
        fetch('http://localhost:8080/map/main')
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
                    max-width: 220px;
                  ">
                    <div style="font-weight: bold; margin-bottom: 5px;">${pos.name}</div>
                    <div>주소: ${pos.lotAddress}</div>
                    <div>연락처: ${pos.tel}</div>
                    <div>설명: ${pos.description}</div>
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
  }, []);

  return <div id="map" style={{ width: '100vw', height: '100vh' }}></div>;
};

export default MainMap;
