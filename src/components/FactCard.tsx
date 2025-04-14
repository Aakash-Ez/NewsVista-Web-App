import React from 'react';
import { Card, Typography, Tag } from 'antd';
import '../styles.css';

const { Title, Paragraph } = Typography;

interface FactCardProps {
  fact: {
    fact: string;
    year: number;
    location: string;
    description: string;
  };
}

const FactCard: React.FC<FactCardProps> = ({ fact }) => {
  return (
    <Card className="card" style={{ borderLeft: '6px solid #e3b23c', background: '#fffef7', borderRadius: 16 }}>
      <div style={{ marginBottom: 12 }}>
        <Tag color="gold" style={{ fontSize: 14 }}>{fact.year}</Tag>
        <Tag color="blue" style={{ fontSize: 14 }}>{fact.location}</Tag>
      </div>
      <Title level={5} style={{ color: '#423e37', marginBottom: 8 }}>{fact.fact}</Title>
      <Paragraph className="text-dim-gray" style={{ fontSize: 14 }}>{fact.description}</Paragraph>
    </Card>
  );
};

export default FactCard;
