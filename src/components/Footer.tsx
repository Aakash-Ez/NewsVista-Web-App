import React from "react";
import { Link } from "react-router-dom";
import { Layout, Row, Col, Typography, Space } from "antd";
import "../styles.css";

const { Footer: AntFooter } = Layout;
const { Title, Text } = Typography;

const Footer: React.FC = () => {
  return (
    <AntFooter className="bg-eggshell" style={{ padding: "60px 40px 20px" }}>
      <Row gutter={[32, 32]} justify="space-between">
        <Col xs={24} md={8}>
          <Space direction="vertical" size={8}>
            <img src="/logo.svg" alt="NewsVista Logo" style={{ height: 36 }} />
            <Text className="text-dim-gray" style={{ display: 'block' }}>
              Bringing clarity to news with multilingual access, bias transparency, and AI-powered insights.
            </Text>
          </Space>
        </Col>

        <Col xs={12} md={8}>
          <Title level={5} className="text-primary">Quick Links</Title>
          <Space direction="vertical">
            <Link to="/latest-news" className="hover:text-secondary">Latest News</Link>
            <Link to="/blindspots" className="hover:text-secondary">BlindSpots</Link>
            <Link to="/dashboard" className="hover:text-secondary">Dashboard</Link>
            <Link to="/election" className="hover:text-secondary">Election Tracker</Link>
            <Link to="/bias" className="hover:text-secondary">Bias Meter</Link>
          </Space>
        </Col>

        <Col xs={12} md={8}>
          <Title level={5} className="text-primary">Support</Title>
          <Space direction="vertical">
            <Link to="/support" className="hover:text-secondary">Help Center</Link>
            <Link to="/privacy" className="hover:text-secondary">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-secondary">Terms of Service</Link>
            <Link to="/contact" className="hover:text-secondary">Contact Us</Link>
          </Space>
        </Col>
      </Row>

      <Row justify="center" style={{ marginTop: 48 }}>
        <Text className="text-dim-gray" type="secondary">
          © {new Date().getFullYear()} NewsVista. All rights reserved.
        </Text>
      </Row>
    </AntFooter>
  );
};

export default Footer;