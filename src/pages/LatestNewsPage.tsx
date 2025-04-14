import React, { useEffect, useState } from 'react';
import { Typography, Spin, Input } from 'antd';
import NewsCard from '../components/NewsCard';
import '../styles.css';

const { Title } = Typography;
const { Search } = Input;

const SOURCES = ["The Hindu", "India Today", "Times of India", "NDTV"];

const LatestNewsPage: React.FC = () => {
  const [allNews, setAllNews] = useState<{ [key: string]: any[] }>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const fetchNews = async () => {
    setLoading(true);
    const results: { [key: string]: any[] } = {};

    try {
      for (const source of SOURCES) {
        const response = await fetch(`${import.meta.env.VITE_NEWS_API_HOST}${import.meta.env.VITE_NEWS_API_URL}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ source })
        });
        if (response.ok) {
          const data = await response.json();
          results[source] = data.articles || [];
        } else {
          results[source] = [];
        }
      }
    } catch (error) {
      console.error('Failed to fetch news', error);
      SOURCES.forEach(source => (results[source] = []));
    } finally {
      setAllNews(results);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const filteredArticles = (articles: any[]) =>
    articles.filter(article =>
      article.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.summary?.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="bg-eggshell" style={{ minHeight: '100vh', padding: '40px 24px' }}>
      <Title level={2} className="text-primary" style={{ textAlign: 'center', marginBottom: 16 }}>
        Latest Headlines
      </Title>

      <div style={{ maxWidth: 600, margin: '0 auto 40px' }}>
        <Search
          placeholder="Search articles by title or summary..."
          enterButton
          onSearch={value => setSearchTerm(value)}
          onChange={e => setSearchTerm(e.target.value)}
          size="large"
        />
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', marginTop: 100 }}>
          <Spin size="large" />
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
          {SOURCES.map(source => (
            <div key={source}>
              <Title level={4} className="text-primary" style={{ marginBottom: 16 }}>{source}</Title>
              <div style={{ display: 'flex', overflowX: 'auto', gap: 24, paddingBottom: 8 }}>
                {filteredArticles(allNews[source] || []).map((article, index) => (
                  <div key={index} style={{ minWidth: 280, maxWidth: 400, flexShrink: 0 }}>
                    <NewsCard article={article} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LatestNewsPage;