import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Layout, Space, Row, Col } from 'antd';
import { checkUserAuth } from '../api/auth';
import '../styles.css';
import { TypeAnimation } from 'react-type-animation';

const { Title, Paragraph } = Typography;
const { Content } = Layout;

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Layout className="bg-eggshell" style={{ minHeight: '100vh' }}>

      <Content style={{ flex: 1, padding: '60px 20px' }}>
        <Row justify="center" align="middle" style={{ textAlign: 'center' }}>
          <Col xs={24} md={16}>
            <Title level={1} className="text-primary">
              Your News.{' '}
              <span className="text-secondary">

<TypeAnimation
  sequence={[
    'Unbiased',
    1000,
    'Personalized',
    1000,
    'Multilingual',
    1000,
    'Fact-Checked',
    1000,
  ]}
  wrapper="span"
  speed={50}
  repeat={Infinity}
/>

              </span>. Reimagined.
            </Title>

            <Paragraph style={{ fontSize: 18 }} className="text-dim-gray">
              NewsVista empowers you to see through the spin with AI-driven bias tracking, multilingual access, and your own dashboard to track what matters.
            </Paragraph>
            {!checkUserAuth() && (
            <Space size={16} direction="vertical" style={{ width: '100%', marginTop: 24 }}>
              <Button type="primary" block className="btn-primary" onClick={() => navigate('/signup')}>
                Create Account
              </Button>
              <Button type="default" block className="btn-outline" onClick={() => navigate('/login')}>
                Log In
              </Button>
            </Space>
            )}
          </Col>
        </Row>

        <Row justify="center" gutter={[32, 32]} style={{ marginTop: 80 }}>
          <Col xs={24} md={8}>
            <div className="card">
              <Title level={4} className="text-primary">Multilingual Access</Title>
              <Paragraph className="text-dim-gray">Consume content in 12+ Indian languages with culturally relevant presentation.</Paragraph>
            </div>
          </Col>

          <Col xs={24} md={8}>
            <div className="card">
              <Title level={4} className="text-primary">Bias Transparency</Title>
              <Paragraph className="text-dim-gray">Visualize ideological bias and compare perspectives side-by-side.</Paragraph>
            </div>
          </Col>

          <Col xs={24} md={8}>
            <div className="card">
              <Title level={4} className="text-primary">Custom Dashboard</Title>
              <Paragraph className="text-dim-gray">Get a feed curated for your interests, sentiment, and region.</Paragraph>
            </div>
          </Col>
        </Row>

        <Row justify="center" gutter={[32, 32]} style={{ marginTop: 60 }}>
          <Col xs={24} md={8}>
            <div className="card">
              <Title level={4} className="text-primary">Election Tracker</Title>
              <Paragraph className="text-dim-gray">Stay informed on candidate sentiment, regional buzz, and fake news flags in real-time.</Paragraph>
            </div>
          </Col>

          <Col xs={24} md={8}>
            <div className="card">
              <Title level={4} className="text-primary">Fact Checks & Counterpoints</Title>
              <Paragraph className="text-dim-gray">AI-generated context and rebuttals to help you avoid misinformation.</Paragraph>
            </div>
          </Col>

          <Col xs={24} md={8}>
            <div className="card">
              <Title level={4} className="text-primary">Mobile Friendly</Title>
              <Paragraph className="text-dim-gray">Swipe, listen, and scroll easily with our audio-first mobile experience.</Paragraph>
            </div>
          </Col>
        </Row>
      </Content>

    </Layout>
  );
};

export default HomePage;