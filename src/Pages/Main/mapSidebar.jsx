import { useNavigate } from "react-router-dom";
import {
  User,
  Clock,
  Coins,
  Mail,
  Settings,
  LogOut,
  Calculator,
  Key,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";

import { useRecentSearch } from "./RecentSearch.jsx"; // ✅ 추가
import { MapView } from "./MapView"; // ✅ 지도 이동용

import "../../Styles/Main/mapSidebar.css";

const menuItems = [
  { title: "마이페이지", url: "/mypage", icon: User },
  { title: "포인트", url: "/points", icon: Coins, badge: "25P" },
  { title: "재활용품 계산", url: "/calPage", icon: Calculator },
  { title: "인증코드 입력", url: "/auth", icon: Key },
];

export function AppSidebar() {
  const navigate = useNavigate();
  const { recentSearches } = useRecentSearch(); // ✅ 최근 검색어 Context

  const handleRecentSearchClick = (text) => {
    MapView.moveToMarkerByName(text); // 👈 마커 위치로 지도 이동
  };

  const goToPage = (path) => {
    navigate(path);
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="logo-container">
          <div className="logo-icon">
            <img src="/logo.png" alt="Logo" className="icon-medium" />
          </div>
          <span className="brand-title">RECYCLING</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroupContent>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <button
                    className="sidebar-menu-button"
                    onClick={() => goToPage(item.url)}
                  >
                    <div className="menu-item-content">
                      <div className="menu-item-left">
                        <item.icon className="icon-small" />
                        <span>{item.title}</span>
                      </div>
                      {item.badge && (
                        <span className="badge">{item.badge}</span>
                      )}
                    </div>
                  </button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>

        <SidebarGroup>
          <SidebarGroupLabel className="left-align-label">
            최근 검색
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarGroup>
              <SidebarGroupLabel className="left-align-label">
                최근 검색
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {recentSearches.map((search) => (
                    <SidebarMenuItem key={search}>
                      <SidebarMenuButton asChild>
                        <button
                          className="sidebar-menu-button"
                          onClick={() => handleRecentSearchClick(search)}
                        >
                          <div className="menu-item-left">
                            <Clock className="icon-small" />
                            <span className="text-small">{search}</span>
                          </div>
                        </button>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <Separator />
        <div className="profile-section">
          <div className="profile-info">
            <Avatar className="avatar-md">
              <AvatarImage src="/빵빵이.png" />
              <AvatarFallback>사용</AvatarFallback>
            </Avatar>
            <div className="profile-details">
              <p className="text-small text-green truncate">홍길동</p>
              <div className="email-info">
                <Mail className="icon-small" />
                <span className="truncate">user@example.com</span>
              </div>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="btn-settings">
            <Settings className="icon-small" />
          </Button>
        </div>
        <Button variant="outline" className="btn-logout">
          <LogOut className="icon-small" />
          로그아웃
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
