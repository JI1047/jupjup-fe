import { Search } from "lucide-react"
import { useState } from "react"
import "../../Styles/Main/searchBar.css"

export function SearchBar() {
  return (
    <div className="searchbar-container">
      <Search className="searchbar-icon" />
      <input
        type="text"
        placeholder="장소, 주소 검색..."
        className="searchbar-input"
      />
    </div>
  )
}
