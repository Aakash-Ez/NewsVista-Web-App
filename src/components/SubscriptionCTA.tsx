import React from 'react';
import { Button, Divider, Typography } from 'antd';

const { Title, Paragraph } = Typography;

interface SubscriptionCTAProps {
  tier: string;
  handleTierChange: (newTier: 'free' | 'premium') => void;
}

const SubscriptionCTA: React.FC<SubscriptionCTAProps> = ({ tier, handleTierChange }) => {
  return (
    <>
      <Divider style={{ margin: '24px 0 12px' }}>📦 Subscription Tier</Divider>
      {tier === 'free' && (
        <div
          style={{
            background: '#f0f5ff',
            padding: '16px',
            borderRadius: '8px',
            textAlign: 'center',
            marginTop: '16px',
          }}
        >
          <Title level={4} style={{ color: '#1d39c4', marginBottom: '8px' }}>
            Unlock Premium Features!
          </Title>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              'Upgrade to Premium for exclusive benefits like a personalized dashboard, election tracking, and deeper bias insights.',
              'By joining Premium, you support our mission to provide unbiased news and empower individuals to make informed decisions.',
              'Our story began with a simple idea: to bridge the gap between diverse perspectives and foster understanding in a polarized world.',
              'With your support, we can continue to innovate, expand our features, and bring you the tools you need to navigate the complex media landscape.',
            ].map((text, index) => (
              <div
                key={index}
                style={{
                  background: '#f9f9f9',
                  padding: '16px',
                  borderRadius: '8px',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                }}
              >
                <Paragraph className="text-dim-gray" style={{ marginBottom: 0 }}>
                  {text}
                </Paragraph>
              </div>
            ))}
          </div>
          <Button
            type="primary"
            size="large"
            style={{ backgroundColor: '#1d39c4', borderColor: '#1d39c4', marginTop: 24 }}
            onClick={() => handleTierChange('premium')}
          >
            Upgrade to Premium
          </Button>
        </div>
      )}
      {tier === 'premium' && (
        <div
          style={{
            background: '#e6f7ff',
            padding: '16px',
            borderRadius: '8px',
            textAlign: 'center',
            marginTop: '16px',
          }}
        >
          <Title level={4} style={{ color: '#0050b3', marginBottom: '8px' }}>
            You're a Premium Member!
          </Title>
          <Paragraph className="text-dim-gray" style={{ marginBottom: '16px' }}>
            Thank you for supporting us with a Premium subscription. Your contribution helps us continue our mission to provide unbiased news and empower informed decisions.
          </Paragraph>
          <Button
            type="default"
            size="large"
            style={{ borderColor: '#0050b3', color: '#0050b3' }}
            onClick={() => handleTierChange('free')}
          >
            Downgrade to Free
          </Button>
        </div>
      )}
    </>
  );
};

export default SubscriptionCTA;
