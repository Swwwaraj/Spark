import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Leaf,
  Link as LinkIcon,
  Palette,
  BarChart,
  Settings,
  LogOut
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import LinksTab from "../components/LinksTab";
import AppearanceTab from "../components/AppearanceTab";
import AnalyticsTab from "../components/AnalyticsTab";
import SettingsTab from "../components/SettingsTab";
import "../styles/Dashboard.css";

export function Dashboard() {
  const [activeTab, setActiveTab] = useState("links");
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="sidebar-header">
          <Link to="/" className="brand">
          <img 
              src = "https://i.postimg.cc/j21rGsM0/Screenshot-2025-03-01-223449-removebg-preview.png" style={{
                height:50 
              }}
            />
            <span className="logo-text">
              <strong> SPARK™</strong> 
            </span>
          </Link>
        </div>
        <nav className="sidebar-nav">
          {[
            { key: "links", icon: <LinkIcon /> },
            { key: "appearance", icon: <Palette /> },
            { key: "analytics", icon: <BarChart /> },
            { key: "settings", icon: <Settings /> },
          ].map(({ key, icon }) => (
            <button
              key={key}
              className={`nav-item ${activeTab === key ? "active" : ""}`}
              onClick={() => setActiveTab(key)}
            >
              {icon}
              <span>{key.charAt(0).toUpperCase() + key.slice(1)}</span>
            </button>
          ))}
          <button className="nav-item logout" onClick={handleLogout}>
            <LogOut />
            <span>Logout</span>
          </button>
        </nav>
        <div className="user-profile">
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Jenny"
            alt="Profile"
            className="avatar"
          />
          <div className="user-info">
            <div className="username">{user?.firstName || 'Jenny'} {user?.lastName || 'Wilson'}</div>
            <div className="handle">@{user?.username || 'popopo_08'}</div>
          </div>
        </div>
      </aside>

      <main className="main-content">
        {activeTab === "links" && <LinksTab />}
        {activeTab === "appearance" && <AppearanceTab />}
        {activeTab === "analytics" && <AnalyticsTab />}
        {activeTab === "settings" && <SettingsTab />}
      </main>
    </div>
  );
}

export default Dashboard;