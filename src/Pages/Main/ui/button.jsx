import React from "react"
import "../../../Styles/Main/ui_css/button.css"

export function Button({
  className = "",
  variant = "default",
  size = "default",
  children,
  ...props
}) {
  let buttonClasses = "btn"

  if (variant === "outline") {
    buttonClasses += " btn-outline"
  } else if (variant === "ghost") {
    buttonClasses += " btn-ghost"
  } else {
    buttonClasses += " btn-default"
  }

  if (size === "sm") {
    buttonClasses += " btn-sm"
  }

  const combinedClassName = `${buttonClasses} ${className}`.trim()

  return (
    <button className={combinedClassName} {...props}>
      {children}
    </button>
  )
}
