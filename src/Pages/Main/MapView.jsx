import React, { useEffect, useRef } from "react";
import "../../Styles/Main/mapView.css";
import "../../Styles/Main/ui_css/infoBox.css";

const KAKAO_JS_KEY =
  process.env.REACT_APP_KAKAO_JS_KEY || "f698892088386f2ca502628b65c42eab";
const KAKAO_SDK = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_JS_KEY}&autoload=false`;
const BACKEND_URL = "/map/main";

export function MapView() {
  const mapRef = useRef(null);
  const markerDataRef = useRef([]);

  useEffect(() => {
    const loadKakao = () =>
      new Promise((resolve, reject) => {
        if (window.kakao && window.kakao.maps) return resolve();

        const existingScript = document.querySelector(
          `script[src="${KAKAO_SDK}"]`
        );
        if (existingScript) {
          existingScript.addEventListener("load", () =>
            window.kakao.maps.load(() => resolve())
          );
          existingScript.addEventListener("error", () =>
            reject(new Error("Failed to load Kakao Maps SDK."))
          );
          return;
        }

        const script = document.createElement("script");
        script.src = KAKAO_SDK;
        script.async = true;
        script.onerror = () =>
          reject(new Error("Failed to load Kakao Maps SDK."));
        script.onload = () => window.kakao.maps.load(() => resolve());
        document.head.appendChild(script);
      });

    const initMap = async () => {
      try {
        await loadKakao();
      } catch (error) {
        console.error("Failed to initialize Kakao Map:", error);
        return;
      }

      const container = document.getElementById("map");
      const options = {
        center: new window.kakao.maps.LatLng(37.6581404, 126.8321693),
        level: 3,
      };

      const map = new window.kakao.maps.Map(container, options);
      mapRef.current = map;

      try {
        const res = await fetch(BACKEND_URL);
        const data = await res.json();

        const imageSrc = `data:image/svg+xml;utf8,${encodeURIComponent(`
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="50" viewBox="0 0 40 50">
            <path fill="#16a34a" stroke="#ffffff" stroke-width="2" d="M20 0C9 0 0 9 0 20c0 11 20 30 20 30s20-19 20-30C40 9 31 0 20 0z"/>
            <circle cx="20" cy="20" r="7" fill="white"/>
          </svg>
        `)}`;

        window.infowindows = {};

        const newMarkerData = data.map((pos, index) => {
          const imageSize = new window.kakao.maps.Size(40, 50);
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
            <div class="label">연락처</div>
            <div class="value">${pos.tel ?? "-"}</div>
            <div class="items-section">
              <div class="items-label">수거 품목</div>
              ${itemListHtml}
            </div>
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
      } catch (error) {
        console.error("Failed to load marker data:", error);
      }
    };

    initMap();

    window.closeInfoWindow = (id) => {
      if (window.infowindows && window.infowindows[id]) {
        window.infowindows[id].close();
      }
    };
  }, []);

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
      console.warn("No marker matched the selected name.");
    }
  };

  return <div id="map" className="kakao-map" />;
}
