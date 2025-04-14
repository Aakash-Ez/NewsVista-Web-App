import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Typography, Button } from 'antd';
import BiasMeter from './BiasMeter';
import { ArticleWithBias } from '../types';
import '../styles.css';

const { Title, Paragraph, Text } = Typography;

interface BlindSpotCardProps {
  article: ArticleWithBias & { explanation: string };
}

const BlindSpotCard: React.FC<BlindSpotCardProps> = ({ article }) => {
  const navigate = useNavigate();

  const handleUnderstand = () => {
    navigate('/article', { state: { article } });
  };

  return (
    <Card
      hoverable
      className="card"
      style={{ borderLeft: '6px solid #fa541c', background: '#fffaf5', borderRadius: 16 }}
    >
      <Title level={5} style={{ color: '#fa541c', marginBottom: 4 }}>
        Blindspot
      </Title>
      <Text strong style={{ fontSize: 16 }}>{article.title}</Text>
      <Paragraph type="secondary" style={{ marginTop: 4, fontSize: 14 }}>
        {article.summary?.slice(0, 120)}...
      </Paragraph>
      <BiasMeter score={article.bias_score || 0} />

      <div style={{ marginTop: 12 }}>
        <Paragraph style={{ fontSize: 13, color: '#595959' }}>
          <strong>Why it's a blindspot:</strong><br />
          {article.explanation}
        </Paragraph>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 16 }}>
        <Button type="link" href={article.url} target="_blank">
          Read Full Article
        </Button>
        <Button type="primary" onClick={handleUnderstand}>
          Understand
        </Button>
      </div>
    </Card>
  );
};

export default BlindSpotCard;
