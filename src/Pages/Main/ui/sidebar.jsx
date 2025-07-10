import React, { createContext, useContext, useState } from "react"
import "../../../Styles/Main/ui_css/sidebar.css"

// Sidebar Context
const SidebarContext = createContext()

export function SidebarProvider({ children, defaultOpen = true }) {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  
  return (
    <SidebarContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </SidebarContext.Provider>
  )
}

export function useSidebar() {
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
}

export function Sidebar({ className = "", children, ...props }) {
  const combinedClassName = `sidebar ${className}`.trim()
  return <div className={combinedClassName} {...props}>{children}</div>
}

export function SidebarHeader({ className = "", children, ...props }) {
  const combinedClassName = `sidebar-header ${className}`.trim()
  return <div className={combinedClassName} {...props}>{children}</div>
}

export function SidebarContent({ className = "", children, ...props }) {
  const combinedClassName = `sidebar-content ${className}`.trim()
  return <div className={combinedClassName} {...props}>{children}</div>
}

export function SidebarFooter({ className = "", children, ...props }) {
  const combinedClassName = `sidebar-footer ${className}`.trim()
  return <div className={combinedClassName} {...props}>{children}</div>
}

export function SidebarGroup({ className = "", children, ...props }) {
  const combinedClassName = `sidebar-group ${className}`.trim()
  return <div className={combinedClassName} {...props}>{children}</div>
}

export function SidebarGroupLabel({ className = "", children, ...props }) {
  const combinedClassName = `sidebar-group-label ${className}`.trim()
  return <div className={combinedClassName} {...props}>{children}</div>
}

export function SidebarGroupContent({ className = "", children, ...props }) {
  const combinedClassName = `${className}`.trim()
  return <div className={combinedClassName} {...props}>{children}</div>
}

export function SidebarMenu({ className = "", children, ...props }) {
  const combinedClassName = `sidebar-menu ${className}`.trim()
  return <ul className={combinedClassName} {...props}>{children}</ul>
}

export function SidebarMenuItem({ className = "", children, ...props }) {
  const combinedClassName = `${className}`.trim()
  return <li className={combinedClassName} {...props}>{children}</li>
}

export function SidebarMenuButton({ 
  className = "", 
  children, 
  asChild = false,
  isActive = false,
  ...props 
}) {
  const combinedClassName = `sidebar-menu-button ${isActive ? 'active' : ''} ${className}`.trim()

  if (asChild) {
    return React.cloneElement(children, {
      className: combinedClassName,
      ...props
    })
  }

  return (
    <button className={combinedClassName} {...props}>
      {children}
    </button>
  )
}

export function SidebarInset({ className = "", children, ...props }) {
  const combinedClassName = `sidebar-inset ${className}`.trim()
  return <main className={combinedClassName} {...props}>{children}</main>
}
