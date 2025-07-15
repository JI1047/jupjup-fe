import * as React from "react";
import "../../styles/cal-css/input.css";

function Input({ className = "", type = "text", ...props }) {
  return (
    <input
      type={type}
      className={`input ${className}`.trim()}
      {...props}
    />
  );
}

export { Input };
