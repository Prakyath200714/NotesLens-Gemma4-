import React from 'react';
import '../styles/Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <h1 className="navbar-title">📚 NoteLens</h1>
        <p className="navbar-tagline">Transform your notes into study material</p>
      </div>
    </nav>
  );
}
