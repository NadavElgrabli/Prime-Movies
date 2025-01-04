import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "../styles.css";

function Header() {
  return (
    <header className="header">
      <Link to="/" className="logo-link">
        <h1 className="main-header">Prime Movies</h1>
      </Link>
    </header>
  );
}

export default Header;
