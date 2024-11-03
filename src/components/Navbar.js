import React from "react";
export const Navbar = () => (
  <nav className="navbar bg-light">
    <div className="container-fluid">
      <span className="navbar-brand mb-0 h1" style={{ color: '#00b14f' }}>
        CrabForAdministration
      </span>
      <div className="d-flex">
        <span style={{ color: '#00b14f' }} className="me-2">
          WELCOME, <strong>ADMIN</strong>.
        </span>
        <div
          style={{
            cursor: "pointer",
            marginLeft: "20px",
            marginRight: "20px",
            display: "inline",
            color: "#00b14f"
          }}
        >
          LOG OUT
        </div>
      </div>
    </div>
  </nav>
);

