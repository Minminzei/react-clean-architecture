import React from "react";

type Props = {
  children: React.ReactNode;
  style: React.CSSProperties;
};

export function Layout({ children, style }: Props) {
  return (
    <div
      className="fixed inset-0 bg-transparent"
      style={{ zIndex: 2147483550 }}
    >
      <div className="fixed" style={style}>
        {children}
      </div>
    </div>
  );
}
