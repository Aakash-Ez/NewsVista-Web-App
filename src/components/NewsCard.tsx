import React from 'react';
import { Card, Typography, Button, Tag } from 'antd';
import { useNavigate } from 'react-router-dom';
import BiasMeter from '../components/BiasMeter';
import '../styles.css';

const { Title, Paragraph, Text } = Typography;

interface NewsCardProps {
  article: {
    id: string;
    title: string;
    summary: string;
    source: string;
    url: string;
    bias_score?: number;
    [key: string]: any; // Allow other properties for flexibility
  };
  onClick?: () => void;
}

const NewsCard: React.FC<NewsCardProps> = ({ article }) => {
  const navigate = useNavigate();

  return (
    <Card
      className="card"
      hoverable
      style={{ borderRadius: 12, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
      bodyStyle={{ display: 'flex', flexDirection: 'column', gap: 12 }}
    >
      <div>
        <Title level={5} className="text-primary" style={{ marginBottom: 4 }}>{article.title}</Title>
        <Paragraph className="text-dim-gray" ellipsis={{ rows: 3 }}>{article.summary}</Paragraph>
        <Text type="secondary" style={{ fontSize: 12 }}>
          Source: <Tag color="blue">{article.source}</Tag>
        </Text>
        {typeof article.bias_score === 'number' && (
          <div style={{ marginTop: 12 }}>
            <BiasMeter score={article.bias_score} />
          </div>
        )}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
        <Button
          block
          className="btn-outline"
          onClick={() => window.open(article.url, '_blank')}
        >
          Read Full
        </Button>
        <Button
          block
          type="primary"
          className="btn-primary"
          onClick={() => navigate('/article', { state: { article: article } })}
        >
          Understand
        </Button>
      </div>
    </Card>
  );
};

export default NewsCard;