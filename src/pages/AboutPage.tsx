import React from 'react';
import { Typography, Row, Col, Card, List, Tag } from 'antd';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import '../styles.css';

const { Title, Paragraph } = Typography;

const biasData = [
  { name: 'Favors Ruling Party', value: 45 },
  { name: 'Neutral', value: 30 },
  { name: 'Favors Opposition', value: 25 },
];

const echoData = [
  { name: 'Similar Viewpoints', value: 50 },
  { name: 'Opposing Perspectives', value: 35 },
  { name: 'Uncertain', value: 15 },
];

const COLORS = ['#1890ff', '#8c8c8c', '#fa541c'];

const team = [
  'Aakash Ezhilan', 'Aashikram R', 'Amarendra Mandal', 'Ankita Halder',
  'Balasubramanian R', 'Gautham S', 'Jayendra', 'N J Eshwar',
  'Tithi Biswas', 'Upasana', 'Sanya'
];

const AboutPage: React.FC = () => {
  return (
    <div className="bg-eggshell" style={{ minHeight: '100vh' }}>
      <div style={{ padding: '40px 24px' }}>
        <Title level={2} className="text-primary" style={{ textAlign: 'center' }}>About NewsVista</Title>
        <Paragraph className="text-dim-gray" style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto 48px' }}>
          At NewsVista, we are committed to delivering unbiased news by aggregating diverse perspectives and highlighting blind spots in mainstream narratives. Our mission is to empower readers with comprehensive information, fostering informed opinions in an era dominated by polarized media.
        </Paragraph>

        <div style={{ maxWidth: 1000, margin: '0 auto 48px' }}>
          <Title level={3} className="text-primary">The Problem We Face</Title>
          <Paragraph className="text-dim-gray">
            India's news ecosystem is facing a serious credibility crisis. Ownership patterns are concentrated, political influence seeps into editorial decisions, and viewers are often subjected to heavily opinionated narratives. According to a 2021 report by Reporters Without Borders, India ranks 142 out of 180 in the Press Freedom Index. This is compounded by a lack of transparency, inadequate representation of regional and minority voices, and increasing sensationalism.
          </Paragraph>
          <Paragraph className="text-dim-gray">
            Compounding the issue is the rise of digital echo chambers. Social media algorithms are designed to reinforce existing beliefs, not challenge them. Misinformation spreads faster than truth. Trust in media has declined, and what remains is skepticism and tribalism. The citizens suffer — unaware of what they're not being told.
          </Paragraph>
        </div>

        <Row gutter={[32, 32]} align="middle">
          <Col xs={24} md={12}>
            <Card className="card">
              <Title level={4} className="text-primary">Perception of Media Bias</Title>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={biasData}
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={3}
                    dataKey="value"
                    label
                  >
                    {biasData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
              <Paragraph className="text-dim-gray" style={{ marginTop: 12 }}>
                According to a 2022 Statista report, 45% of respondents believe Indian media favors the ruling party. Only 30% believe the media is neutral. [Statista, 2022]
              </Paragraph>
            </Card>
          </Col>

          <Col xs={24} md={12}>
            <div>
              <Title level={3} className="text-primary">Why It Matters</Title>
              <Paragraph className="text-dim-gray">
                Media bias significantly influences public perception and democratic processes in India. A skewed representation can manipulate political outcomes, suppress dissent, and reduce trust in journalism. Echo chambers reinforce polarization and amplify misinformation.
              </Paragraph>
              <Paragraph className="text-dim-gray">
                We are working to change that. At NewsVista, we combine AI-powered bias detection, sentiment analysis, and a multilingual interface to bring readers the full picture. We trace ideological influence, surface blind spots, and ensure every narrative is critically examined.
              </Paragraph>
              <Paragraph className="text-dim-gray">
                Our platform features counter-narratives, contextual summaries, blindspot flags, and tools for ideological tracking — all designed to give the power of perspective back to the reader. We are not here to tell you what to believe. We are here to ensure you have access to all sides before you decide.
              </Paragraph>
            </div>
          </Col>
        </Row>

        <Row gutter={[32, 32]} align="middle" style={{ marginTop: 48 }}>
          <Col xs={24} md={12}>
            <Card className="card">
              <Title level={4} className="text-primary">Impact of Echo Chambers</Title>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={echoData}
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={3}
                    dataKey="value"
                    label
                  >
                    {echoData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
              <Paragraph className="text-dim-gray" style={{ marginTop: 12 }}>
                A 2023 WACC Global report found that over 50% of Indian users mainly interact with like-minded content, increasing the risk of polarization and misinformation.
              </Paragraph>
            </Card>
          </Col>

          <Col xs={24} md={12}>
            <div>
              <Title level={3} className="text-primary">Who We Are</Title>
              <Paragraph className="text-dim-gray">
                NewsVista is brought to you by a passionate team dedicated to reimagining how India reads and understands news.
              </Paragraph>
              <List
                size="small"
                dataSource={team}
                renderItem={name => (
                  <List.Item><Tag color="blue">{name}</Tag></List.Item>
                )}
                style={{ marginTop: 12 }}
              />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default AboutPage;