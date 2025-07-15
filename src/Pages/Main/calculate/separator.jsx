import * as React from "react";
import "../../../Styles/Main/cal-css/separator.css";

function Separator({ orientation = "horizontal", className = "", ...props }) {
  const isVertical = orientation === "vertical";
  const orientationClass = isVertical ? "separator-vertical" : "separator-horizontal";

  return (
    <div
      className={`separator ${orientationClass} ${className}`.trim()}
      {...props}
    />
  );
}

export { Separator };
