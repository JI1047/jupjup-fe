import { User, Clock, Coins, Mail, Settings, LogOut } from "lucide-react";
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
import "../../Styles/Main/appSidebar.css";

const menuItems = [
  {
    title: "My Page",
    url: "#",
    icon: User,
    isActive: true,
  },
  {
    title: "포인트",
    url: "#",
    icon: Coins,
    badge: "25P",
  },
];

const recentSearches = [
  { title: "안양3동", url: "#" },
  { title: "안양4동", url: "#" },
  { title: "안양5동", url: "#" },
];

export function AppSidebar() {
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
                <SidebarMenuButton asChild isActive={item.isActive}>
                  <a href={item.url} className="sidebar-menu-button">
                    <div className="menu-item-content">
                      <div className="menu-item-left">
                        <item.icon className="icon-small" />
                        <span>{item.title}</span>
                      </div>
                      {item.badge && (
                        <span
                          className={
                            item.isActive ? "badge-green-active" : "badge"
                          }
                        >
                          {item.badge}
                        </span>
                      )}
                    </div>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>

        <SidebarGroup>
          <SidebarGroupLabel>최근 검색</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {recentSearches.map((search) => (
                <SidebarMenuItem key={search.title}>
                  <SidebarMenuButton asChild>
                    <a href={search.url} className="sidebar-menu-button">
                      <div className="menu-item-left">
                        <Clock className="icon-small" />
                        <span className="text-small">{search.title}</span>
                      </div>
                    </a>
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
