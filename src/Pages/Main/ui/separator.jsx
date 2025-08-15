import React from "react";
import "../../../Styles/Main/ui_css/separator.css";

export function Separator({
  className = "",
  orientation = "horizontal",
  decorative = true,
  ...props
}) {
  const orientationClass =
    orientation === "horizontal" ? "separator-horizontal" : "separator-vertical";

  return (
    <div
      role={decorative ? "none" : "separator"}
      aria-orientation={orientation}
      className={`separator ${orientationClass} ${className}`.trim()}
      {...props}
    />
  );
}
