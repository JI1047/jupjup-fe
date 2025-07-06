import React from "react"
import "../../../Styles/Main/ui_css/avatar.css"

export function Avatar({ className = "", children, ...props }) {
  const combinedClassName = `avatar ${className}`.trim()

  return (
    <div className={combinedClassName} {...props}>
      {children}
    </div>
  )
}

export function AvatarImage({ className = "", src, alt = "avatar", ...props }) {
  const combinedClassName = `avatar-image ${className}`.trim()

  return (
    <img
      className={combinedClassName}
      src={src}
      alt={alt}
      {...props}
    />
  )
}

export function AvatarFallback({ className = "", children, ...props }) {
  const combinedClassName = `avatar-fallback ${className}`.trim()

  return (
    <div className={combinedClassName} {...props}>
      {children}
    </div>
  )
}
