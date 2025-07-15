import * as React from "react";

function Card({ className = "", children, ...props }) {
  return (
    <>
      <style>
        {`
          .card {
            background-color: white;
            border: 1px solid #e5e7eb;
            border-radius: 0.5rem;
            padding: 1rem;
          }

          .card-header {
            margin-bottom: 1rem;
          }

          .card-title {
            font-size: 1.25rem;
            font-weight: 600;
            color: #1f2937;
          }

          .card-content {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
          }
        `}
      </style>
      <div className={`card ${className}`.trim()} {...props}>
        {children}
      </div>
    </>
  );
}

function CardHeader({ className = "", children }) {
  return <div className={`card-header ${className}`.trim()}>{children}</div>;
}

function CardTitle({ className = "", children }) {
  return <h3 className={`card-title ${className}`.trim()}>{children}</h3>;
}

function CardContent({ className = "", children }) {
  return <div className={`card-content ${className}`.trim()}>{children}</div>;
}

export { Card, CardHeader, CardTitle, CardContent };
