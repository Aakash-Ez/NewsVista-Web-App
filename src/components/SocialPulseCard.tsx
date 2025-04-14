import React, { useState } from 'react';
import { Card, Typography, Button, Spin, List, Tooltip } from 'antd';
import {
  FireOutlined,
  RedditOutlined,
  TwitterOutlined,
  FacebookOutlined,
  GlobalOutlined,
} from '@ant-design/icons';
import '../styles.css';

const { Title, Paragraph } = Typography;

interface SocialPulseProps {
  headline: string;
  apiUrl: string;
}

interface PulseEntry {
  source: string;
  title: string;
  url: string;
}

const sourceIcons: Record<string, React.ReactNode> = {
  'reddit.com': <RedditOutlined style={{ color: '#FF4500' }} />,
  'x.com': <TwitterOutlined style={{ color: '#1DA1F2' }} />,
  'facebook.com': <FacebookOutlined style={{ color: '#1877F2' }} />,
};

const SocialPulseCard: React.FC<SocialPulseProps> = ({ headline, apiUrl }) => {
  const [loading, setLoading] = useState(false);
  const [pulse, setPulse] = useState<PulseEntry[]>([]);

  const handleSocialPulse = async () => {
    setLoading(true);
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ headline })
      });
      const data = await response.json();
      setPulse(data.results || []);
    } catch (err) {
      console.error('Social pulse fetch failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Title level={4} className="text-primary" style={{ margin: 0 }}>
          Social Pulse
        </Title>
        <Button
          type="primary"
          icon={<FireOutlined />}
          onClick={handleSocialPulse}
          loading={loading}
          className="btn-primary"
        >
          Analyze Buzz
        </Button>
      </div>

      {loading && <Spin size="large" style={{ display: 'block', margin: '24px auto' }} />}

      {!loading && pulse.length === 0 && (
        <Paragraph className="text-dim-gray" style={{ textAlign: 'center', marginTop: 16 }}>
          Click "Analyze Buzz" to see related discussions on social platforms.
        </Paragraph>
      )}

      {!loading && pulse.length > 0 && (
        <List
          itemLayout="horizontal"
          dataSource={pulse}
          renderItem={item => (
            <List.Item style={{ alignItems: 'flex-start' }}>
              <List.Item.Meta
                avatar={
                  <Tooltip title={item.source}>
                    {sourceIcons[item.source] || <GlobalOutlined />}
                  </Tooltip>
                }
                title={
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontWeight: 500 }}
                  >
                    {item.title.length > 90 ? item.title.slice(0, 87) + '...' : item.title}
                  </a>
                }
              />
            </List.Item>
          )}
          style={{ marginTop: 16 }}
        />
      )}
    </Card>
  );
};

export default SocialPulseCard;