import { Search } from "lucide-react"
import { useState } from "react"
import "../../Styles/Main/searchBar.css"

export function SearchBar({ value, onChange }) {
  const [isFocused, setIsFocused] = useState(false)
  
  return (
    <div className="searchbar-container">
      <Search className="searchbar-icon" />
      <input
        type="text"
        placeholder="장소, 주소 검색..."
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`searchbar-input ${isFocused ? "focused" : ""}`}
      />
    </div>
  )
}
