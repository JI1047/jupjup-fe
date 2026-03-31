import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useRecentSearch } from "./RecentSearch.jsx";
import {
  User,
  Clock,
  Coins,
  LogOut,
  Calculator,
  Info,
  ArrowLeftRight,
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
    url: "/MyPage/pointHistory",
    icon: Coins,
    badge: "25P",
  },
  {
    title: "재활용품 계산",
    url: "/calPage",
    icon: Calculator,
  },
  {
    title: "소개",
    url: "/",
    icon: Info,
  },
  {
    title: "환전요청",
    url: "/MyPage/ExchangeRequest",
    icon: ArrowLeftRight,
  },
];

function AppSidebar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const { recentSearches } = useRecentSearch();

  const handleRecentSearchClick = (text) => {
    console.log("최근 검색", text);
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    window.location.href = "/Main";
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) return;

      try {
        const response = await axios.get("/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        setUser(response.data);
      } catch (error) {
        console.error("사용자 정보 요청 실패:", error);
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="logo-container">
          <div className="logo-icon">
            <img src="/images/logo.png" alt="logo" className="logopng" />
          </div>
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
                      {item.badge && <span className="badge">{item.badge}</span>}
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
              {recentSearches.length > 0 ? (
                recentSearches.map((searchText, idx) => (
                  <SidebarMenuItem key={`${searchText}-${idx}`}>
                    <SidebarMenuButton asChild>
                      <button
                        className="sidebar-menu-button"
                        onClick={() => handleRecentSearchClick(searchText)}
                      >
                        <div className="menu-item-left">
                          <Clock className="icon-small" />
                          <span className="text-small">{searchText}</span>
                        </div>
                      </button>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))
              ) : (
                <li className="recent-empty">최근 검색이 없습니다</li>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <Separator />
        {localStorage.getItem("accessToken") && user ? (
          <>
            <div className="profile-section">
              <div className="profile-info">
                <Avatar className="avatar-md">
                  <AvatarImage src="/profile.png" />
                  <AvatarFallback>
                    {user.name ? user.name.charAt(0) : "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="profile-details">
                  <p className="text-small text-green truncate">{user.name}</p>
                  <p className="text-small text-gray truncate">{user.email}</p>
                </div>
              </div>
            </div>
            <Button variant="outline" className="btn-logout" onClick={handleLogout}>
              <LogOut className="icon-small" />
              로그아웃
            </Button>
          </>
        ) : (
          <div className="login-required-section">
            <p className="login-required-text">로그인이 필요합니다</p>
            <Button
              variant="outline"
              className="btn-login"
              onClick={() => (window.location.href = "/login")}
            >
              로그인
            </Button>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSidebar;
