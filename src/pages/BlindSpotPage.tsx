import React, { useEffect, useState } from 'react';
import { Row, Col, Typography, Spin } from 'antd';
import BlindSpotCard from '../components/BlindSpotCard';
import { BlindSpotArticles } from '../types';
import '../styles.css';

const { Title, Paragraph } = Typography;

const BlindSpotPage: React.FC = () => {
  const [leftBlindspots, setLeftBlindspots] = useState<BlindSpotArticles[]>([]);
  const [rightBlindspots, setRightBlindspots] = useState<BlindSpotArticles[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlindspots = async () => {
      setLoading(true);
      try {
        const [leftRes, rightRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_BLINDSPOT_API}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ side: 'left' })
          }),
          fetch(`${import.meta.env.VITE_BLINDSPOT_API}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ side: 'right' })
          })
        ]);

        const leftData = await leftRes.json();
        const rightData = await rightRes.json();

        setLeftBlindspots(leftData.articles || []);
        setRightBlindspots(rightData.articles || []);
      } catch (err) {
        console.error('Error fetching blindspots:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlindspots();
  }, []);

  return (
    <div className="bg-eggshell" style={{ padding: '40px 24px', margin: '0 auto', width: '100%' }}>
      <Title level={2} className="text-primary">Blindspots in the Media</Title>
      <Paragraph className="text-dim-gray">
        These articles highlight stories that may be overlooked depending on your political orientation.
      </Paragraph>

      {loading ? <Spin size="large" style={{ display: 'block', margin: '48px auto' }} /> : (
        <>
          <Title level={3} className="text-primary" style={{ marginTop: 40 }}>Blindspots on the Left</Title>
          <Row gutter={[24, 24]}>
            {leftBlindspots.map((article, index) => (
              <Col key={index} xs={24} md={12} lg={8}>
                <BlindSpotCard article={article} />
              </Col>
            ))}
          </Row>

          <Title level={3} className="text-primary" style={{ marginTop: 60 }}>Blindspots on the Right</Title>
          <Row gutter={[24, 24]}>
            {rightBlindspots.map((article, index) => (
              <Col key={index} xs={24} md={12} lg={8}>
                <BlindSpotCard article={article} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </div>
  );
};

export default BlindSpotPage;
