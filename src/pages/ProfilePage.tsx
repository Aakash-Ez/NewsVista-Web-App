import React, { useEffect, useState } from 'react';
import { Typography, Row, Col, Button, Divider, Input, message, Slider } from 'antd';
import BiasMeter from '../components/BiasMeter';
import NewsCard from '../components/NewsCard';
import SubscriptionCTA from '../components/SubscriptionCTA';
import { getUser, logoutUser, updateUser, changeTier, checkUserAuth } from '../api/auth';
import { ArticleWithBias } from '../types';
import '../styles.css';

const questionMap: { [key: string]: string } = {
    question1: 'The government should provide universal healthcare',
    question2: 'Welfare programs are essential to help those in need',
    question3: 'Government regulation of the economy is necessary',
    question4: 'Higher taxes on the rich are needed to support public services',
    question5: 'Military spending should be increased',
    question6: 'The private sector is more efficient than the public sector',
    question7: 'Climate change should be a top priority for policy makers',
    question8: 'Religious values should influence government decisions',
    question9: 'The government should not interfere in free markets',
    question10: 'Healthcare is a right, not a privilege',
};

const { Title, Paragraph } = Typography;

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [tier, setTier] = useState('');
  const [bookmarked, setBookmarked] = useState<ArticleWithBias[]>([]);
  const [biasFromBookmarks, setBiasFromBookmarks] = useState<number>(0);

  useEffect(() => {
    const cookie = checkUserAuth();
    let uid = '';
    if (cookie) {
      uid = cookie.uid;
    } else {
      window.location.href = '/';
    }

    const fetchUser = async () => {
      try {
        const data = await getUser(uid);
        if (data) {
          setUser(data);
          setName(data.name);
          setTier(data.tier);
          setCountry(data.country);
        }
      } catch (err) {
        console.error('Failed to fetch user data', err);
      }
    };
    fetchUser();

    const fetchBookmarks = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BOOKMARK_API}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ "uid": uid }),
        });
        const data = await res.json();
        const articles = data.articles || [];
        setBookmarked(articles);
        const avgBias = articles.reduce((acc: number, curr: ArticleWithBias) => acc + (curr.bias_score || 0), 0) / (articles.length || 1);
        setBiasFromBookmarks(avgBias);
      } catch (err) {
        console.error('Failed to fetch bookmarks', err);
      }
    };

    fetchBookmarks();
  }, []);

  const handleLogout = async () => {
    await logoutUser();
    message.success('Logged out');
    window.location.href = '/';
  };

  const handleSave = async () => {
    try {
      const updated = await updateUser(user.uid, { name, country });
      setUser(updated);
      setEditMode(false);
      message.success('Profile updated');
    } catch (err) {
      message.error('Failed to update profile');
    }
  };

  const handleTierChange = async (value: string) => {
    try {
      const updated = await changeTier(user.uid, value);
      setUser(updated);
      setTier(value);
      message.success('Subscription updated');
    } catch (err) {
      message.error('Failed to update subscription');
    }
  };

  return (
    <div className="bg-eggshell" style={{ padding: '40px 24px', minHeight: '100vh' }}>
      <Title level={2} className="text-primary">Welcome back, {user?.name}!</Title>
      <Paragraph className="text-dim-gray">Manage your account, explore your bias insights, and revisit bookmarked content.</Paragraph>

      <Divider>👤 Edit Profile</Divider>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          {editMode ? (
            <>
              <Input value={name} onChange={(e) => setName(e.target.value)} style={{ marginBottom: 12 }} />
              <Input value={country} onChange={(e) => setCountry(e.target.value)} style={{ marginBottom: 12 }} />
              <Input value={user?.email} disabled style={{ marginBottom: 12 }} />
              <Button type="primary" onClick={handleSave}>Save Changes</Button>
            </>
          ) : (
            <>
              <Paragraph><strong>Name:</strong> {user?.name}</Paragraph>
              <Paragraph><strong>Email:</strong> {user?.email}</Paragraph>
              <Paragraph><strong>Country:</strong> {user?.country}</Paragraph>
              <Button onClick={() => setEditMode(true)}>Edit Profile</Button>
            </>
          )}
        </Col>

        <Col xs={24} md={12}>
          <Title level={4} className="text-primary">🧠 Bias Insight</Title>
          <BiasMeter score={biasFromBookmarks} />
          <Paragraph className="text-dim-gray" style={{ marginTop: 12 }}>
            This score is based on the bias levels of the articles you bookmarked.
          </Paragraph>
        </Col>
      </Row>

      <SubscriptionCTA tier={tier} handleTierChange={handleTierChange} />

    <Divider>🧪 Your Survey Responses</Divider>
    <Row gutter={[16, 16]} justify="center">
      {user?.responses && (
        <>
          <Col xs={24} sm={12} md={8}>
            <div className="response-box" style={{ backgroundColor: '#f6ffed', border: '1px solid #b7eb8f', padding: '16px', borderRadius: '8px' }}>
              <Title level={4} style={{ color: '#52c41a', textAlign: 'center' }}>Agreed</Title>
              {Object.entries(user.responses)
                .filter(([_, val]) => (val as number) > 3)
                .map(([q, val], index) => (
                  <Paragraph key={index} style={{ marginBottom: '8px', textAlign: 'center' }}>
                    {questionMap[q] || q.replace(/question/, 'Question ')}
                  </Paragraph>
                ))}
            </div>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <div className="response-box" style={{ backgroundColor: '#fffbe6', border: '1px solid #ffe58f', padding: '16px', borderRadius: '8px' }}>
              <Title level={4} style={{ color: '#faad14', textAlign: 'center' }}>Neutral</Title>
              {Object.entries(user.responses)
                .filter(([_, val]) => (val as number) === 3)
                .map(([q, val], index) => (
                  <Paragraph key={index} style={{ marginBottom: '8px', textAlign: 'center' }}>
                    {questionMap[q] || q.replace(/question/, 'Question ')}
                  </Paragraph>
                ))}
            </div>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <div className="response-box" style={{ backgroundColor: '#fff1f0', border: '1px solid #ffa39e', padding: '16px', borderRadius: '8px' }}>
              <Title level={4} style={{ color: '#ff4d4f', textAlign: 'center' }}>Disagreed</Title>
              {Object.entries(user.responses)
                .filter(([_, val]) => (val as number) < 3)
                .map(([q, val], index) => (
                  <Paragraph key={index} style={{ marginBottom: '8px', textAlign: 'center' }}>
                    {questionMap[q] || q.replace(/question/, 'Question ')}
                  </Paragraph>
                ))}
            </div>
          </Col>
        </>
      )}
    </Row>

      <Divider>🔖 Bookmarked Articles</Divider>
      <Row gutter={[16, 16]}>
        {bookmarked.length === 0 ? (
          <Paragraph className="text-dim-gray">You haven't bookmarked any articles yet.</Paragraph>
        ) : (
          bookmarked.map((article, index) => (
            <Col xs={24} sm={12} md={8} key={index}>
              <NewsCard article={article} />
            </Col>
          ))
        )}
      </Row>
    </div>
  );
};

export default ProfilePage;
