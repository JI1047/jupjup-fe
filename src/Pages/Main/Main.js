import React from "react";
// import ReactDOM from "react-dom/client";

import { SidebarProvider, SidebarInset } from "./ui/sidebar.jsx";
import AppSidebar from "./mapSidebar.jsx";
import { SearchBar } from "./SearchBar.jsx";
import { MapView } from "./MapView.jsx";
import { RecentSearchProvider, useRecentSearch } from "./RecentSearch.jsx";

import "../../Styles/Main/Main.css";
import "../../Styles/Main/map.css";

export default function App() {
  return (
    <RecentSearchProvider>
      <SidebarProvider>
        <MainContent />
      </SidebarProvider>
    </RecentSearchProvider>
  );
}

function MainContent() {
  const { currentSearch } = useRecentSearch(); // 현재 검색어 가져오기

  return (
    <div className="app-container">
      <AppSidebar />
      <SidebarInset className="sidebar-inset">
        <main className="main">
          <header className="header">
            <div className="header-title">
              <h1>{currentSearch}</h1>
            </div>
            <SearchBar />
          </header>
          <div className="map-container">
            <MapView />
          </div>
        </main>
      </SidebarInset>
    </div>
  );
}
