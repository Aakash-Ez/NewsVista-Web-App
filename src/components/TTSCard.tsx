import React, { useState } from 'react';
import { Card, Typography, Button, Select, message } from 'antd';
import { PlayCircleOutlined } from '@ant-design/icons';
import translate from 'translate';
import '../styles.css';

const { Title, Paragraph } = Typography;

const LANG_OPTIONS = [
  { label: 'English', value: 'en-US', translateCode: 'en' },
  { label: 'Hindi', value: 'hi-IN', translateCode: 'hi' },
];

interface TTSCardProps {
  summary: string;
}

const TTSCard: React.FC<TTSCardProps> = ({ summary }) => {
  const [ttsLang, setTtsLang] = useState('en-US');
  const [loading, setLoading] = useState(false);

  const handleTTSPlay = async () => {
    try {
      setLoading(true);
      const selectedOption = LANG_OPTIONS.find(opt => opt.value === ttsLang);
      const text = summary;
      const translatedText = selectedOption?.translateCode === 'en'
        ? text
        : await translate(text, { to: selectedOption?.translateCode });
      const utterance = new SpeechSynthesisUtterance(translatedText);
      utterance.lang = ttsLang;
      speechSynthesis.cancel();
      speechSynthesis.speak(utterance);
    } catch (err) {
      console.error(err);
      message.error("Text-to-speech not supported or failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Title level={4} className="text-primary" style={{ margin: 0 }}>
          Listen to Summary
        </Title>
        <Button
          type="primary"
          icon={<PlayCircleOutlined />}
          loading={loading}
          onClick={handleTTSPlay}
          className="btn-primary"
        >
          Play
        </Button>
      </div>
      <Paragraph className="text-dim-gray" style={{ marginTop: 16 }}>
        Convert the summary into audio using text-to-speech in your preferred language.
      </Paragraph>
      <Select
        value={ttsLang}
        onChange={setTtsLang}
        style={{ width: '100%' }}
        options={LANG_OPTIONS.map(opt => ({ label: opt.label, value: opt.value }))}
      />
    </Card>
  );
};

export default TTSCard;