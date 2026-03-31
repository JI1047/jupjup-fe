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
    title: "ÎßàÏù¥?òÏù¥ÏßÄ",
    url: "/mypage",
    icon: User,
  },
  {
    title: "?¨Ïù∏??,
    url: "/MyPage/pointHistory",
    icon: Coins,
    badge: "25P",
  },
  {
    title: "?¨Ìôú?©Ìíà Í≥ÑÏÇ∞",
    url: "/calPage",
    icon: Calculator,
  },
  {
    title: "?åÍ∞ú",
    url: "/",
    icon: Info,
  },
  {
    title: "?òÏ†Ñ?†Ï≤≠",
    url: "/MyPage/ExchangeRequest",
    icon: ArrowLeftRight,
  },
];

function AppSidebar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null); // ???¨Ïö©???ÅÌÉú ?Ä??  const { recentSearches } = useRecentSearch(); // ÏµúÍ∑º Í≤Ä?âÏñ¥ Í∞Ä?∏Ïò§Í∏?
  // ÏµúÍ∑º Í≤Ä???¥Î¶≠
  const handleRecentSearchClick = (text) => {
    console.log("ÏµúÍ∑º Í≤Ä??", text);
  };

  // Î°úÍ∑∏?ÑÏõÉ Ï≤òÎ¶¨
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    window.location.href = "/Main"; // ???ÑÏ†Ñ Î¶¨Î°ú??  };

  // ??Î°úÍ∑∏???¨Ïö©???ïÎ≥¥ Í∞Ä?∏Ïò§Í∏?  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) return; // ?†ÌÅ∞ ?ÜÏúºÎ©??§Ìñâ ?àÌï®

      try {
        const response = await axios.get("/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true, // ??Ï∂îÍ?
        });
        setUser(response.data);
      } catch (error) {
        console.error("?¨Ïö©???ïÎ≥¥ ?îÏ≤≠ ?§Ìå®:", error);
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
            ÏµúÍ∑º Í≤Ä??          </SidebarGroupLabel>
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
                <li className="recent-empty">ÏµúÍ∑º Í≤Ä?âÏù¥ ?ÜÏäµ?àÎã§</li>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* ???¨Ïö©???ïÎ≥¥ ?úÏãú Î∂ÄÎ∂?*/}
      <SidebarFooter>
        <Separator />
        {localStorage.getItem("accessToken") && user ? (
          // Î°úÍ∑∏???ÅÌÉú
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
              Î°úÍ∑∏?ÑÏõÉ
            </Button>
          </>
        ) : (
          // ÎπÑÎ°úÍ∑∏Ïù∏ ?ÅÌÉú
          <div className="login-required-section">
            <p className="login-required-text">Î°úÍ∑∏???ÑÏöî</p>
            <Button
              variant="outline"
              className="btn-login"
              onClick={() => (window.location.href = "/login")}
            >
              Î°úÍ∑∏??            </Button>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSidebar;
