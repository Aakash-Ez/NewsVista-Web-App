import React, { useState } from 'react';
import { Card, Typography, Tag, Button, Spin, Divider } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined, QuestionCircleOutlined, ExclamationCircleOutlined, SearchOutlined } from '@ant-design/icons';
import '../styles.css';

const { Title, Paragraph } = Typography;

interface FactCheckProps {
  headline: string;
  apiUrl: string;
}

const verdictStyleMap: Record<string, { color: string; icon: React.ReactNode }> = {
  true: { color: 'green', icon: <CheckCircleOutlined /> },
  false: { color: 'red', icon: <CloseCircleOutlined /> },
  misleading: { color: 'orange', icon: <ExclamationCircleOutlined /> },
  unverified: { color: 'gray', icon: <QuestionCircleOutlined /> },
};

const FactCheckCard: React.FC<FactCheckProps> = ({ headline, apiUrl }) => {
  const [loading, setLoading] = useState(false);
  const [factCheck, setFactCheck] = useState<any>(null);

  const handleFactCheck = async () => {
    setLoading(true);
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ headline })
      });
      const data = await response.json();
      setFactCheck(data);
    } catch (err) {
      console.error('Fact check failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const verdict = factCheck?.verdict?.toLowerCase();
  const verdictStyle = verdictStyleMap[verdict] || { color: 'default', icon: <SearchOutlined /> };

  return (
    <Card className="card" style={{ borderLeft: `6px solid ${verdictStyle.color}` }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Title level={4} className="text-primary" style={{ margin: 0 }}>
          Fact Check
        </Title>
        <Button
          type="primary"
          icon={<SearchOutlined />}
          onClick={handleFactCheck}
          loading={loading}
          className="btn-primary"
        >
          Run Check
        </Button>
      </div>

      <Divider style={{ margin: '16px 0' }} />

      {loading && <Spin size="large" style={{ display: 'block', margin: '24px auto' }} />}

      {!loading && !factCheck && (
        <Paragraph className="text-dim-gray" style={{ textAlign: 'center' }}>
          Click "Run Check" to verify this headline using AI and search context.
        </Paragraph>
      )}

      {!loading && factCheck && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Paragraph className="text-dim-gray">
            <strong>Claim:</strong><br /> {factCheck.claim}
          </Paragraph>
          <Paragraph className="text-dim-gray">
            <strong>Verdict:</strong> <Tag color={verdictStyle.color} icon={verdictStyle.icon}>{factCheck.verdict}</Tag>
          </Paragraph>
          <Paragraph className="text-dim-gray">
            <strong>Explanation:</strong><br /> {factCheck.explanation}
          </Paragraph>
          <Paragraph className="text-dim-gray">
            <strong>Evidence:</strong><br /> {factCheck.evidence}
          </Paragraph>
        </div>
      )}
    </Card>
  );
};

export default FactCheckCard;