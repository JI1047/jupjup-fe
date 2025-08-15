import { useEffect } from "react"
import "../../Styles/Main/mapView.css"

const KAKAO_SDK = "//dapi.kakao.com/v2/maps/sdk.js?appkey=f143a20f2be877dcef35366b593462b0&autoload=false"
const BACKEND_URL = "http://13.209.202.27:8080/map/main" // 필요시 .env로 분리해서 사용

export function MapView() {
  useEffect(() => {
    const loadKakao = () =>
      new Promise((resolve) => {
        if (window.kakao && window.kakao.maps) return resolve()
        const script = document.createElement("script")
        script.src = KAKAO_SDK
        script.async = true
        script.onload = () => window.kakao.maps.load(() => resolve())
        document.head.appendChild(script)
      })

    const init = async () => {
      await loadKakao()

      const container = document.getElementById("map")
      const options = {
        center: new window.kakao.maps.LatLng(37.5665, 126.9780),
        level: 3,
      }
      const map = new window.kakao.maps.Map(container, options)

      // ✅ 백엔드에서 마커 데이터 가져와서 표시
      try {
        // 토큰 필요 시 주석 해제
        // const token = localStorage.getItem("accessToken")

        const res = await fetch(BACKEND_URL, {
          // headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        })
        const data = await res.json()

        const imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"

        data.forEach((pos) => {
          const imageSize = new window.kakao.maps.Size(24, 35)
          const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize)

          const marker = new window.kakao.maps.Marker({
            map,
            position: new window.kakao.maps.LatLng(pos.latitude, pos.longitude),
            title: pos.name,
            image: markerImage,
          })

          const itemListHtml =
            pos.itemNames && pos.itemNames.length > 0
              ? `<ul style="padding-left:18px;margin-top:4px;">
                  ${pos.itemNames.map((item) => `<li>${item}</li>`).join("")}
                 </ul>`
              : "<div>수거 품목 정보 없음</div>"

          const iwContent = `
            <div style="
              position:relative;padding:10px;background:#fff;border:1px solid #ccc;border-radius:8px;
              font-size:14px;box-shadow:2px 2px 8px rgba(0,0,0,0.3);max-width:240px;">
              <div style="font-weight:bold;margin-bottom:5px;">${pos.name}</div>
              <div>주소: ${pos.lotAddress ?? "-"}</div>
              <div>연락처: ${pos.tel ?? "-"}</div>
              <div>설명: ${pos.description ?? "-"}</div>
              <div style="margin-top:5px;"><strong>수거 항목:</strong></div>
              ${itemListHtml}
              <div style="
                content:'';position:absolute;bottom:-10px;left:50%;margin-left:-10px;width:0;height:0;
                border:10px solid transparent;border-top-color:#fff;z-index:1;"></div>
            </div>`

          const infowindow = new window.kakao.maps.InfoWindow({ content: iwContent })
          window.kakao.maps.event.addListener(marker, "click", () => infowindow.open(map, marker))
        })
      } catch (e) {
        console.error("마커 데이터 로딩 실패:", e)
      }
    }

    init()
  }, [])

  return <div id="map" className="kakao-map" />
}