import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// ── Icons (lucide-react)
import {
  User,
  Clock,
  Coins,
  LogOut,
  LogIn,
  Calculator,
  Key,
  Info,
  ArrowLeftRight as Exchange,
} from "lucide-react";

// ── UI atoms / layout (프로젝트 내 컴포넌트 사용)
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "./ui/sidebar"; // 존재하지 않으면 프로젝트의 실제 경로로 조정 필요
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";

// ── Recent search & Map hook (네 작업본 유지)
import { useRecentSearch } from "./RecentSearch.jsx"; // 존재하지 않으면 스텁/구현 필요
import { MapView } from "./MapView"; // 존재하지 않으면 스텁/구현 필요

// ── Styles
// NOTE: 프로젝트 구조에 맞춰 경로를 조정하세요.
import "../../Styles/Main/mapSidebar.css";

export default function MapSidebar() {
  const navigate = useNavigate();

  // ── 로그인/사용자 상태 (팀원본의 기능 통합)
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    const t = localStorage.getItem("token") || localStorage.getItem("accessToken");
    setToken(t);
    if (!t) {
      setLoadingUser(false);
      return;
    }

    (async () => {
      try {
        const res = await axios.get("/api/auth/me", {
          headers: { Authorization: `Bearer ${t}` },
        });
        setUser(res.data);
      } catch (e) {
        console.warn("/api/auth/me failed", e);
        setUser(null);
      } finally {
        setLoadingUser(false);
      }
    })();
  }, []);

  // ── 메뉴 정의 (네 작업본의 경로/아이콘 유지 + 포인트 배지 동적화)
  const pointsBadge = user?.point != null ? `${user.point}P` : undefined;
  const menuItems = [
    { title: "마이페이지", url: "/mypage", icon: User },
    { title: "포인트", url: "/points", icon: Coins, badge: pointsBadge || "25P" },
    { title: "재활용품 계산", url: "/calPage", icon: Calculator },
    { title: "인증코드 입력", url: "/auth", icon: Key },
    { title: "소개", url: "/start", icon: Info },
    { title: "환전신청", url: "/MyPage/ExchangeRequest", icon: Exchange },
  ];

  // ── 최근 검색 (네 작업본 유지)
  const { recentSearches = [] } = useRecentSearch();
  const handleRecentSearchClick = (text) => {
    try {
      if (MapView?.moveToMarkerByName) MapView.moveToMarkerByName(text);
    } catch (e) {
      console.warn("MapView.moveToMarkerByName not available", e);
    }
  };

  // ── 내비게이션 & 인증 버튼
  const goToPage = (path) => navigate(path);
  const handleLogout = () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("accessToken");
      setUser(null);
      setToken(null);
      // 로그인 화면으로 가거나, 그대로 새로고침해서 전역 상태 초기화
      navigate("/login");
      window.location.reload();
    } catch (_) {
      // ignore
    }
  };

  // ── UI ───────────────────────────────────────────────────────────────────
  return (
    <Sidebar className="map-sidebar">
      {/* Header: 로고 + 프로필 섹션 */}
      <SidebarHeader>
        <div className="brand">
          <img src="/logo.png" alt="logo" className="brand-logo" />
          <span className="brand-name">CHAJAJJO</span>
        </div>

        {/* 로그인 상태일 때만 프로필 정보 표시 */}
        {token && user ? (
          <div className="profile-section-header">
            {/* 프로필 사진 (80px, 가운데 정렬) */}
            <Avatar className="profile-avatar-large">
              <AvatarImage src="/profile.png" alt={user?.name || "user"} />
              <AvatarFallback>
                {(user?.name || "U").slice(0, 1)}
              </AvatarFallback>
            </Avatar>
            {/* 사용자 이름 */}
            <div className="profile-name-header">{user.name}</div>
            {/* 사용자 이메일 */}
            <div className="profile-email-header">{user.email}</div>
          </div>
        ) : null}
      </SidebarHeader>

      <Separator />

      <SidebarContent>
        {/* Menu 그룹 */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <button
                      type="button"
                      className="sidebar-menu-button"
                      onClick={() => goToPage(item.url)}
                    >
                      <span className="menu-item-left">
                        <item.icon size={18} />
                        <span className="menu-item-text">{item.title}</span>
                      </span>
                      {item.badge && <span className="menu-badge">{item.badge}</span>}
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <Separator />

        {/* 최근 검색 그룹 */}
        <SidebarGroup>
          <SidebarGroupLabel className="recent-label">
            <Clock size={14} style={{ marginRight: 6 }} /> 최근 검색
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <ul className="recent-list">
              {recentSearches.length ? (
                recentSearches.map((text, idx) => (
                  <li key={`${text}-${idx}`}>
                    <button
                      type="button"
                      className="recent-item"
                      onClick={() => handleRecentSearchClick(text)}
                    >
                      <Clock size={14} />
                      <span className="recent-text">{text}</span>
                    </button>
                  </li>
                ))
              ) : (
                <li className="recent-empty">최근 검색이 없습니다</li>
              )}
            </ul>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer: 로그인/로그아웃 */}
      <SidebarFooter>
        <Separator />
        {/* 로그인 상태에 따라 다른 UI 표시 */}
        {token && user ? (
          /* 로그인 상태: 로그아웃 버튼만 표시 */
          <Button
            variant="outline"
            className="btn-logout"
            onClick={handleLogout}
            disabled={loadingUser}
          >
            <LogOut className="icon-small" />
            로그아웃
          </Button>
        ) : (
          /* 비로그인 상태: "로그인 필요" 문구 + 로그인 버튼 표시 */
          <div className="login-required-section">
            <p className="login-required-text">로그인 필요</p>
            <Button
              variant="outline"
              className="btn-login"
              onClick={() => navigate("/login")} 
            >
              <LogIn className="icon-small" />
              로그인
            </Button>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
