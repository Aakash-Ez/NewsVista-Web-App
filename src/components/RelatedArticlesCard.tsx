import React, { useEffect, useState } from 'react';
import { Card, Typography, Row, Col, Spin, Empty } from 'antd';
import NewsCard from './NewsCard';
import { ArticleWithBias } from '../types';

const { Title } = Typography;

interface RelatedArticlesCardProps {
  headline: string;
  apiUrl: string;
}

const RelatedArticlesCard: React.FC<RelatedArticlesCardProps> = ({ headline, apiUrl }) => {
  const [loading, setLoading] = useState(false);
  const [related, setRelated] = useState<ArticleWithBias[]>([]);

  useEffect(() => {
    const fetchRelated = async () => {
      setLoading(true);
      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ headline })
        });
        const data = await response.json();
        setRelated(data.related || []);
      } catch (err) {
        console.error('Failed to load related articles:', err);
      } finally {
        setLoading(false);
      }
    };

    if (headline) fetchRelated();
  }, [headline, apiUrl]);

  return (
    <Card className="card">
      <Title level={4} className="text-primary">Related Articles</Title>
      {loading ? (
        <Spin size="large" style={{ display: 'block', margin: '24px auto' }} />
      ) : related.length === 0 ? (
        <Empty description="No related articles found." style={{ margin: '24px 0' }} />
      ) : (
        <Row gutter={[16, 16]} style={{ marginTop: 12 }}>
          {related.map((article, index) => (
            <Col key={index} xs={24} md={8}>
              <NewsCard article={article} />
            </Col>
          ))}
        </Row>
      )}
    </Card>
  );
};

export default RelatedArticlesCard;
