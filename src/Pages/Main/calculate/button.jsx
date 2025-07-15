import * as React from "react";
import "../../styles/cal-css/button.css";

function Button({ children, className = "", variant = "default", ...props }) {
  const variantClass =
    variant === "outline" ? "button-outline" : "button";

  return (
    <button
      className={`${variantClass} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
}

export { Button };
