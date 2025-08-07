import React from "react"
import ReactDOM from "react-dom/client"
import { SidebarProvider, SidebarInset } from "./ui/sidebar.jsx"
import { AppSidebar } from "./mapSidebar.jsx"
import { SearchBar } from "./SearchBar.jsx"
import { MapView } from "./MapView.jsx"
import "../../Styles/Main/Main.css"
import "../../Styles/Main/map.css"

export default function App() {
  return (
    <SidebarProvider>
      <div className="app-container">
        <AppSidebar />
        <SidebarInset className="sidebar-inset">
          <main className="main">
            <header className="header">
              <div className="header-title">
                <h1>현 위치</h1>
              </div>
              <SearchBar />
            </header>
            <div className="map-container">
              <MapView />
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}


