import { useState } from "react"
import { useNavigate } from "react-router-dom";
import {
  User,
  Clock,
  Coins,
  Mail,
  Settings,
  LogOut,
  Calculator,
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
import "../../Styles/Main/mapSidebar.css";

const menuItems = [
  {
    title: "마이페이지",
    url: "/mypage",
    icon: User,
  },
  {
    title: "포인트",
    url: "/points",
    icon: Coins,
    badge: "25P",
  },
  {
    title: "재활용품 계산",
    url: "/calculate",
    icon: Calculator,
  },
];

const recentSearches = [
  { title: "안양3동", url: "/search/anyang3" },
  { title: "안양4동", url: "/search/anyang4" },
  { title: "안양5동", url: "/search/anyang5" },
];



// 최근 검색 클릭 핸들러


export function AppSidebar() {
  const navigate = useNavigate();

  const [searchText, setSearchText] = useState("");
  const handleRecentSearchClick = (text) => {
    setSearchText(text);
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
                    onClick={() => navigate(item.url)}
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
            <SidebarMenu>
              {recentSearches.map((search) => (
                <SidebarMenuItem key={search.title}>
                  <SidebarMenuButton asChild>
                    <button
                      className="sidebar-menu-button"
                      onClick={() => handleRecentSearchClick(search.title)}
                    >
                      <div className="menu-item-left">
                        <Clock className="icon-small" />
                        <span className="text-small">{search.title}</span>
                      </div>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
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
