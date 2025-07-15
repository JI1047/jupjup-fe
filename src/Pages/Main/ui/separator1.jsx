import React from "react"
import "../../../Styles/Main/ui_css/separator1.css"

export function Separator({ 
  className = "", 
  orientation = "horizontal", 
  decorative = true,
  ...props 
}) {
  const baseClass = orientation === "horizontal" ? "separator" : "separator-vertical"
  const combinedClassName = `${baseClass} ${className}`.trim()

  return (
    <div
      role={decorative ? "none" : "separator"}
      aria-orientation={orientation}
      className={combinedClassName}
      {...props}
    />
  )
}
