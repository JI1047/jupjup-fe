import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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
    url: "/points",
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
    url: "/start",
    icon: Info,
  },
  {
    title: "환전신청",
    url: "/MyPage/ExchangeRequest",
    icon: ArrowLeftRight,
  },
];

const recentSearches = [
  { title: "안양3동", url: "/search/anyang3" },
  { title: "안양4동", url: "/search/anyang4" },
  { title: "안양5동", url: "/search/anyang5" },
];

function AppSidebar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null); // ✅ 사용자 상태 저장

  // 최근 검색 클릭
  const handleRecentSearchClick = (text) => {
    console.log("최근 검색:", text);
  };

  // 로그아웃 처리
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    window.location.href = "/Main"; // ← 완전 리로드
  };

  // ✅ 로그인 사용자 정보 가져오기
  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) return; // 토큰 없으면 실행 안함

      try {
        const response = await axios.get("http://13.209.202.27:8080/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true, // ✅ 추가
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

      {/* ✅ 사용자 정보 표시 부분 */}
      <SidebarFooter>
        <Separator />
        {localStorage.getItem("accessToken") && user ? (
          // 로그인 상태
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
                  <p className="text-small text-green truncate">
                    {user.name}
                  </p>
                  <p className="text-small text-gray truncate">
                    {user.email}
                  </p>
                </div>
              </div>
            </div>
            <Button variant="outline" className="btn-logout" onClick={handleLogout}>
              <LogOut className="icon-small" />
              로그아웃
            </Button>
          </>
        ) : (
          // 비로그인 상태
          <div className="login-required-section">
            <p className="login-required-text">로그인 필요</p>
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