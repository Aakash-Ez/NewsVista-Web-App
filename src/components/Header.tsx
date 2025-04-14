import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Drawer, Button, Menu, Grid, Space, Layout, message } from "antd";
import {
  MenuOutlined,
  UserOutlined,
  DashboardOutlined,
  ReadOutlined,
  LineChartOutlined,
  BarChartOutlined,
  LogoutOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { checkUserAuth, logoutUser } from "../api/auth";
import "../styles.css";

const { Header: AntHeader } = Layout;
const { useBreakpoint } = Grid;

const Header: React.FC = () => {
  const navigate = useNavigate();
  const user = checkUserAuth();
  const isGuest = !user;
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const screens = useBreakpoint();

  const handleLogout = () => {
    logoutUser();
    message.success("Logged out successfully");
    navigate("/");
  };

  const menuItems = [
    { key: "latest", label: <Link to="/latest-news">Latest</Link>, icon: <ReadOutlined /> },
    { key: "blindspots", label: <Link to="/blindspots">BlindSpots</Link>, icon: <LineChartOutlined /> },
    { key: "dashboard", label: <Link to="/dashboard">Dashboard</Link>, icon: <DashboardOutlined /> },
    { key: "election", label: <Link to="/election">Election Tracker</Link>, icon: <BarChartOutlined /> },
    { key: "about", label: <Link to="/about">About</Link>, icon: <InfoCircleOutlined /> },
    !isGuest && { key: "bias", label: <Link to="/bias">Bias Meter</Link>, icon: <LineChartOutlined /> },
    !isGuest && { key: "profile", label: <Link to="/profile">Profile</Link>, icon: <UserOutlined /> },
  ].filter(item => item !== false);

  return (
    <AntHeader style={{ backgroundColor: "#ffffff", padding: "0 24px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)", maxWidth: "100vw" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", maxWidth: "100%" }}>
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <img src="/logo.svg" alt="NewsVista Logo" style={{ height: 36 }} />
          <span style={{ fontSize: 18, fontWeight: 600, color: "var(--color-black-olive)" }}>NewsVista</span>
        </Link>

        {screens.md ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
            <Menu mode="horizontal" items={menuItems} style={{ borderBottom: "none", background: "transparent", flexWrap: "wrap" }} />
            {!isGuest ? (
              <Button icon={<LogoutOutlined />} className="btn-outline" onClick={handleLogout}>Logout</Button>
            ) : (
              <Space>
                <Button className="btn-primary" onClick={() => navigate("/login")}>Sign In</Button>
                <Button className="btn-outline" onClick={() => navigate("/signup")}>Sign Up</Button>
              </Space>
            )}
          </div>
        ) : (
          <>
            <Button
              icon={<MenuOutlined style={{ fontSize: 20, color: "var(--color-black-olive)" }} />}
              type="text"
              onClick={() => setDrawerOpen(true)}
            />
            <Drawer
              placement="right"
              title={<img src="/logo.svg" alt="NewsVista Logo" style={{ height: 36 }} />}
              width="80vw"
              onClose={() => setDrawerOpen(false)}
              open={isDrawerOpen}
              bodyStyle={{ padding: 0 }}
            >
              <Menu mode="vertical" items={menuItems} style={{ border: "none" }} />
              <div style={{ padding: 16 }}>
                {!isGuest ? (
                  <Button block icon={<LogoutOutlined />} className="btn-outline" onClick={handleLogout}>Logout</Button>
                ) : (
                  <Space direction="vertical" style={{ width: "100%" }}>
                    <Button block className="btn-primary" onClick={() => navigate("/login")}>Sign In</Button>
                    <Button block className="btn-outline" onClick={() => navigate("/signup")}>Sign Up</Button>
                  </Space>
                )}
              </div>
            </Drawer>
          </>
        )}
      </div>
    </AntHeader>
  );
};

export default Header;