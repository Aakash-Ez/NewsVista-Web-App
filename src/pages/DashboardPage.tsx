import React, { useEffect, useState } from 'react';
import { Typography, Row, Col, Divider, Spin, Tag } from 'antd';
import BiasMeter from '../components/BiasMeter';
import NewsCard from '../components/NewsCard';
import BlindSpotCard from '../components/BlindSpotCard';
import { ArticleWithBias, BlindSpotArticles } from '../types';
import '../styles.css';
import FactCard from '../components/FactCard';
import { getUserPreferences } from '../api/user_preferences';

const { Title, Paragraph } = Typography;

const DashboardPage: React.FC = () => {
  const [trending, setTrending] = useState<ArticleWithBias[]>([]);
  const [userBlindspot, setuserBlindspot] = useState<BlindSpotArticles | null>(null);
  const [biasScore, setBiasScore] = useState<Object | null>(null);
  const [curiousFacts, setCuriousFacts] = useState<Object | null>(null);
  const [topics, setTopics] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [trendingRes, leftRes, biasRes, keywordsRes, factsRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_TRENDING_API}`),
          fetch(`${import.meta.env.VITE_BLINDSPOT_API}`, {
            method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ side: 'left', user_preferences: getUserPreferences() })
          }),
          fetch(`${import.meta.env.VITE_AVERAGE_BIAS_API}`),
          fetch(`${import.meta.env.VITE_KEYWORD_API}`),
          fetch(`${import.meta.env.VITE_CURIOSITY_API}`),
        ]);

        const trendingData = await trendingRes.json();
        const leftData = await leftRes.json();
        const biasData = await biasRes.json();
        const keywordsData = await keywordsRes.json();
        const factsData = await factsRes.json();

        setTrending(trendingData.articles.slice(0, 3) || []);
        setuserBlindspot(leftData.articles?.[0] || null);
        console.log('Bias Data:', biasData);
        setBiasScore(biasData.average_bias_by_source || null);
        setTopics(keywordsData.keywords || []);
        setCuriousFacts(factsData.facts || null);
      } catch (err) {
        console.error('Dashboard fetch failed:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  return (
    <div className="bg-eggshell" style={{ padding: '40px 24px', minHeight: '100vh' }}>
      <Row justify="space-between" align="middle">
        <Col xs={24} md={16}>
          <Title level={2} className="text-primary">Today’s News Landscape</Title>
          <Paragraph className="text-dim-gray">
            A snapshot of bias, divergence, and information gaps in the media today.
          </Paragraph>
        </Col>
        <Col xs={24} md={8} style={{ textAlign: 'right' }}>
          <Paragraph className="text-dim-gray" style={{ fontSize: 13, marginBottom: 0 }}>
            Curious to dig deeper?
          </Paragraph>
          <a href="/signup" className="text-primary" style={{ fontWeight: 500 }}>Create your free personalized dashboard →</a>
        </Col>
      </Row>

      {loading ? <Spin size="large" style={{ margin: '40px auto', display: 'block' }} /> : (
        <>
            <Divider>🧭 Overall Bias Score by News Agency</Divider>
<Row gutter={[16, 16]} style={{ width: '100%' }}>
  {biasScore &&
    Object.entries(biasScore)
      .filter(([source]) =>
        ["NDTV", "India Today", "Times of India", "The Hindu"].includes(source)
      )
      .map(([source, score]) => (
        <Col key={source} xs={24} sm={12} md={8}>
          <div
            style={{
              backgroundColor: "#ffffff",
              padding: 20,
              borderRadius: 12,
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            }}
          >
            <div
              style={{
                fontWeight: 600,
                fontSize: 16,
                color: "#302e7c",
                marginBottom: 12,
              }}
            >
              {source}
            </div>
            <BiasMeter score={score} />
          </div>
        </Col>
      ))}
</Row>

          <Divider>🗂 Trending Topics</Divider>
          <Row gutter={[8, 8]} style={{ marginBottom: 24, alignItems: "center" }}>
            {topics.map((topic, i) => (
            <div
                style={{
                    backgroundColor: "#f0f4ff",
                    padding: "8px 16px",
                    borderRadius: "16px",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#1d39c4",
                    display: "inline-block",
                    marginRight: 8,
                }}
            >
                {topic}
            </div>
            ))}
          </Row>

          <Divider>📌 Trending Articles</Divider>
          <Row gutter={[24, 24]}>
            {trending.map((article, i) => (
              <Col xs={24} md={8} key={i}>
                <NewsCard article={article} />
              </Col>
            ))}
          </Row>

          <Divider>🚨 Key Blindspots</Divider>
          <Row gutter={[24, 24]}>
            {userBlindspot && <Col xs={24} md={12}><BlindSpotCard article={userBlindspot} /></Col>}
          </Row>

          <Divider>📊 Curious Fact</Divider>
          <Row gutter={[24, 24]}>
            {curiousFacts &&
                Array.isArray(curiousFacts) &&
                curiousFacts.map((fact: any, index: number) => (
                <Col key={index} xs={24} md={12}>
                    <FactCard fact={fact} />
                </Col>
                ))}
            </Row>
        </>
      )}
    </div>
  );
};

export default DashboardPage;
