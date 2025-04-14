import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Typography, Row, Col, Card, Button, Divider } from 'antd';
import BiasMeter from '../components/BiasMeter';
import FactCheckCard from '../components/FactCheckCard';
import SocialPulseCard from '../components/SocialPulseCard';
import RelatedArticlesCard from '../components/RelatedArticlesCard';
import { ArticleWithBias } from '../types';
import MarkAsReadButton from '../components/MarkAsReadButton';
import '../styles.css';
import TTSCard from '../components/TTSCard';
import { checkUserAuth } from '../api/auth';
import SubscriptionCTA from '../components/SubscriptionCTA';

const { Title, Paragraph } = Typography;

const FACT_API_HOST = import.meta.env.VITE_FACT_API_HOST;
const FACT_API_URL = import.meta.env.VITE_FACT_API_URL;
const SOCIAL_API_HOST = import.meta.env.VITE_SOCIAL_API_HOST;
const SOCIAL_API_URL = import.meta.env.VITE_SOCIAL_API_URL;
const RELATED_API_HOST = import.meta.env.VITE_RELATED_API_HOST;
const RELATED_API_URL = import.meta.env.VITE_RELATED_API_URL;

const ArticlesPage: React.FC = () => {
  const { state } = useLocation();
  const [article, setArticle] = useState<ArticleWithBias | null>(null);

  useEffect(() => {
    if (state.article) {
      setArticle(state.article);
    }
  }, [state]);

  if (!article) return <div style={{ padding: 32 }}>Loading article...</div>;

  return (
    <div className="bg-eggshell" style={{ padding: '40px 24px' }}>
      <Title level={2} className="text-primary">{article.title}</Title>
      <Paragraph className="text-dim-gray" style={{ fontSize: 16 }}>{article.summary}</Paragraph>
      <Button className="btn-primary" style={{ margin: '12px 0' }} href={article.url} target="_blank">
        Read Full Article
      </Button>
      {document.cookie.includes('User=') && (
        <div style={{ marginTop: 12 }}>
          <React.Suspense fallback={null}>
            {article.id && (
              <>
                <Divider style={{ margin: '24px 0 8px' }}>📝 Mark as Read</Divider>
                <MarkAsReadButton articleId={article.id} userId={JSON.parse(decodeURIComponent(document.cookie.split('; ').find(row => row.startsWith('User='))?.split('=')[1] || '{}')).uid} />
              </>
            )}
          </React.Suspense>
        </div>
      )}

      <Divider />

      <Row gutter={32}>
        <Col xs={24} md={12}>
          <Card className="card">
            <Title level={4} className="text-primary">Source Bias</Title>
            <BiasMeter score={ 0} />
            <Title level={4} className="text-primary" style={{ marginTop: 24 }}>Article Bias</Title>
            <BiasMeter score={article.bias_score || 0} />
          </Card>
            <div style={{ marginTop: 24 }}>
            {checkUserAuth() ? (
              (() => {
              const userCookie = document.cookie.split('; ').find(row => row.startsWith('User='));
              const user = userCookie ? JSON.parse(decodeURIComponent(userCookie.split('=')[1])) : null;
              return user?.tier === 'premium' ? (
                <TTSCard summary={article.summary} />
              ) : (
                <></> 
              );
              })()
            ) : (
              <></>
            )}
            </div>
        </Col>
        {checkUserAuth() ? (
            <Col xs={24} md={12}>
            {(() => {
              const userCookie = document.cookie.split('; ').find(row => row.startsWith('User='));
              const user = userCookie ? JSON.parse(decodeURIComponent(userCookie.split('=')[1])) : null;
              return user?.tier === 'premium' ? (
              <Card className="card">
                <Title level={4} className="text-primary">Understand the Article</Title>
                <Paragraph><strong>ELI5:</strong> {article.eli5}</Paragraph>
                <Paragraph><strong>Historical Context:</strong> {article.historical_context}</Paragraph>
                <Paragraph><strong>Counterpoints:</strong> {article.counterpoints}</Paragraph>
              </Card>
              ) : (
                <Card className="card">
                <Title level={4} className="text-primary">Upgrade to Premium</Title>
                <Paragraph>Unlock exclusive features such as:</Paragraph>
                <ul>
                  <li>Detailed article analysis</li>
                  <li>Text-to-Speech summaries</li>
                  <li>Historical context and counterpoints</li>
                  <li>Fact-checking insights</li>
                  <li>Social media pulse tracking</li>
                </ul>
                </Card>
              );
            })()}
            </Col>
        ) : null}
        {!checkUserAuth() && (
            <></>
        )}

      </Row>

      <Divider />

      <Row gutter={[16, 16]}>
        {checkUserAuth() ? (
          (() => {
        const userCookie = document.cookie.split('; ').find(row => row.startsWith('User='));
        const user = userCookie ? JSON.parse(decodeURIComponent(userCookie.split('=')[1])) : null;
        return user?.tier === 'premium' ? (
          <>
            <Col xs={24} md={12}>
          <FactCheckCard headline={article.title} apiUrl={`${FACT_API_HOST}${FACT_API_URL}`} />
            </Col>
            <Col xs={24} md={12}>
          <SocialPulseCard headline={article.title} apiUrl={`${SOCIAL_API_HOST}${SOCIAL_API_URL}`} />
            </Col>
          </>
        ) : (
          <Col xs={24}>
            <SubscriptionCTA 
          tier={'free'} 
          handleTierChange={() => {
            window.location.href = '/profile';
          }} 
            />
          </Col>
        );
          })()
        ) : (
          <Col xs={24}>
        <SubscriptionCTA 
          tier={'guest'} 
          handleTierChange={() => {
            window.location.href = '/signup';
          }} 
        />
          </Col>
        )}
      </Row>

      <Divider />

      <RelatedArticlesCard headline={article.title} apiUrl={`${RELATED_API_HOST}${RELATED_API_URL}`} />
    </div>
  );
};

export default ArticlesPage;
