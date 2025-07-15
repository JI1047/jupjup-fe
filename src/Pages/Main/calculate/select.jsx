import React, { useState } from "react";
import "../../styles/cal-css/select.css";

function Select({ children, value, onValueChange }) {
  return (
    <div className="select-root">
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { value, onValueChange })
      )}
    </div>
  );
}

function SelectTrigger({ children, onClick }) {
  return (
    <div className="select select-trigger" onClick={onClick}>
      {children}
    </div>
  );
}

function SelectValue({ placeholder, value }) {
  return (
    <div className="select-value">
      {value || <span className="text-gray-400">{placeholder}</span>}
    </div>
  );
}

function SelectContent({ children }) {
  return <div className="select-content">{children}</div>;
}

function SelectItem({ value, children, onValueChange }) {
  return (
    <div
      className="select-item"
      onClick={() => onValueChange(value)}
    >
      {children}
    </div>
  );
}

export {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
};
