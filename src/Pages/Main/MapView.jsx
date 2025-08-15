import React, { useEffect, useRef } from "react";
import "../../Styles/Main/mapView.css";
import "../../Styles/Main/ui_css/infoBox.css";

const KAKAO_SDK =
  "//dapi.kakao.com/v2/maps/sdk.js?appkey=f143a20f2be877dcef35366b593462b0&autoload=false";
const BACKEND_URL = "http://13.209.202.27:8080/map/main";

export function MapView() {
  const mapRef = useRef(null);
  const markerDataRef = useRef([]);

  useEffect(() => {
    const loadKakao = () =>
      new Promise((resolve) => {
        if (window.kakao && window.kakao.maps) return resolve();
        const script = document.createElement("script");
        script.src = KAKAO_SDK;
        script.async = true;
        script.onload = () => window.kakao.maps.load(() => resolve());
        document.head.appendChild(script);
      });

    const initMap = async () => {
      await loadKakao();

      const container = document.getElementById("map");
      const options = {
        center: new window.kakao.maps.LatLng(37.5665, 126.978),
        level: 3,
      };

      const map = new window.kakao.maps.Map(container, options);
      mapRef.current = map;

      try {
        const res = await fetch(BACKEND_URL);
        const data = await res.json();

        const imageSrc =
          "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

        window.infowindows = {};

        const newMarkerData = data.map((pos, index) => {
          const imageSize = new window.kakao.maps.Size(24, 35);
          const markerImage = new window.kakao.maps.MarkerImage(
            imageSrc,
            imageSize
          );

          const marker = new window.kakao.maps.Marker({
            map,
            position: new window.kakao.maps.LatLng(pos.latitude, pos.longitude),
            title: pos.name,
            image: markerImage,
          });

          const itemListHtml =
            pos.itemNames && pos.itemNames.length > 0
              ? `<ul>
                  ${pos.itemNames.map((item) => `<li>${item}</li>`).join("")}
                 </ul>`
              : "<div>수거 품목 정보 없음</div>";

          const markerId = `marker-${index}`;
          const iwContent = `
          <div class="infoBox" id="${markerId}">
            <button class="close-btn" onclick="window.closeInfoWindow('${markerId}')">×</button>
            <div class="title">${pos.name}</div>
            <div class="label">주소:</div>
            <div class="value">${pos.lotAddress ?? "-"}</div>
            <div class="label">연락처:</div>
            <div class="value">${pos.tel ?? "-"}</div>
            <div class="label">설명:</div>
            <div class="value">${pos.description ?? "-"}</div>
            <div class="label">수거 항목:</div>
            ${itemListHtml}
            <div class="tail"></div>
          </div>`;

          const infowindow = new window.kakao.maps.InfoWindow({
            content: iwContent,
          });

          window.kakao.maps.event.addListener(marker, "click", () => {
            infowindow.open(map, marker);
          });

          window.infowindows[markerId] = infowindow;

          return {
            name: pos.name,
            address: pos.lotAddress,
            marker,
            infowindow,
          };
        });

        markerDataRef.current = newMarkerData;
      } catch (e) {
        console.error("마커 데이터 로딩 실패:", e);
      }
    };

    initMap();

    // ✅ 전역 닫기 함수 등록
    window.closeInfoWindow = (id) => {
      if (window.infowindows && window.infowindows[id]) {
        window.infowindows[id].close();
      }
    };
  }, []);

  // 🔍 외부에서 마커로 이동
  MapView.moveToMarkerByName = (name) => {
    const map = mapRef.current;
    if (!map) return;

    const match = markerDataRef.current.find(
      (m) => m.name.includes(name) || (m.address && m.address.includes(name))
    );

    if (match) {
      const position = match.marker.getPosition();
      map.setCenter(position);
      match.infowindow.open(map, match.marker);
    } else {
      console.warn("해당 마커를 찾을 수 없습니다.");
    }
  };

  return <div id="map" className="kakao-map" />;
}
