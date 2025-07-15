import * as React from "react";

function ScrollArea({ className = "", children, ...props }) {
  return (
    <>
      <style>
        {`
          .scroll-area {
            overflow-y: auto;
            overflow-x: hidden;
            padding-right: 0.5rem;
            max-height: 100%;
            position: relative;
          }

          .scroll-area::-webkit-scrollbar {
            width: 8px;
          }

          .scroll-area::-webkit-scrollbar-thumb {
            background-color: #9ca3af;
            border-radius: 4px;
          }

          .scroll-area::-webkit-scrollbar-thumb:hover {
            background-color: #6b7280;
          }
        `}
      </style>
      <div className={`scroll-area ${className}`.trim()} {...props}>
        {children}
      </div>
    </>
  );
}

export { ScrollArea };
