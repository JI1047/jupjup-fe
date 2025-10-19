import { Search } from "lucide-react";
import { useState } from "react";
import "../../Styles/Main/searchBar.css";

// ✅ MapView에서 마커로 이동 기능
import { MapView } from "./MapView";

// ✅ 최근 검색 추가 기능 import
import { useRecentSearch } from "./RecentSearch.jsx";

export function SearchBar() {
  const [input, setInput] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const { addRecentSearch } = useRecentSearch(); // 👈 최근 검색 추가

  const handleSearch = () => {
    const keyword = input.trim();
    if (!keyword) return;

    MapView.moveToMarkerByName(keyword); // 마커 이동
    addRecentSearch(keyword); // 최근 검색어에 추가
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="searchbar-container">
      <Search className="searchbar-icon" />
      <input
        type="text"
        placeholder="장소, 주소 검색..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onKeyDown={handleKeyDown}
        className={`searchbar-input ${isFocused ? "focused" : ""}`}
      />
    </div>
  );
}
