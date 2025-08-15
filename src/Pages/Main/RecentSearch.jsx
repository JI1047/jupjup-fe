import React, { createContext, useContext, useState } from "react";

// ✅ 1. Context 생성
const RecentSearchContext = createContext();

// ✅ 2. Provider 컴포넌트
export function RecentSearchProvider({ children }) {
  const [recentSearches, setRecentSearches] = useState([]);

  const addRecentSearch = (keyword) => {
    setRecentSearches((prev) => {
      const updated = [keyword, ...prev.filter((item) => item !== keyword)];
      return updated.slice(0, 5); // 최대 5개 유지
    });
  };

  return (
    <RecentSearchContext.Provider value={{ recentSearches, addRecentSearch }}>
      {children}
    </RecentSearchContext.Provider>
  );
}

// ✅ 3. Hook 형태로 Context 사용
export function useRecentSearch() {
  const context = useContext(RecentSearchContext);
  if (!context) {
    throw new Error(
      "useRecentSearch must be used within a RecentSearchProvider"
    );
  }
  return context;
}
