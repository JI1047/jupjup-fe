import { useEffect } from "react"
import "../../Styles/Main/mapView.css"

export function MapView() {
  useEffect(() => {
    const script = document.createElement("script")
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=f143a20f2be877dcef35366b593462b0&autoload=false`
    script.async = true

    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById("map")
        const options = {
          center: new window.kakao.maps.LatLng(37.5665, 126.9780),
          level: 3,
        }
        new window.kakao.maps.Map(container, options)
      })
    }

    document.head.appendChild(script)
  }, [])

  return (
    <div id="map" className="kakao-map">
      {/* 카카오 지도 표시 */}
    </div>
  )
}
