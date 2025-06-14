// components/Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css'; // optional styles

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2 className="logo">🎯 TourCraft</h2>
      <nav>
        <NavLink to="/" end className="nav-item">📊 Dashboard</NavLink>
        <NavLink to="/tours" className="nav-item">🗺️ Tours</NavLink>
        <NavLink to="/pages" className="nav-item">📄 Pages</NavLink>
        <NavLink to="/analytics" className="nav-item">📈 Analytics</NavLink>
        <NavLink to="/settings" className="nav-item">⚙️ Settings</NavLink>
        <NavLink to="/logout" className="nav-item">🚪 Logout</NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
