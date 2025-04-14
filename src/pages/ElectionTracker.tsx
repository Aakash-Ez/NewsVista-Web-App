import React, { useState, useEffect } from 'react';
import { Layout, Card, Spin, Typography, message, Row, Col, List, Tag, Avatar } from 'antd';
import BiasMeter from '../components/BiasMeter';
import '../styles.css';

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;

interface NotableFigure {
  name: string;
  role: string;
}

interface Policy {
  title: string;
  description: string;
}

interface Sentiment {
  summary: string;
  tags: string[];
}

interface Party {
  partyName: string;
  logo?: string;
  notableFigures: NotableFigure[];
  keyPolicies: Policy[];
  publicSentiment: {
    positive: Sentiment;
    negative: Sentiment;
  };
  remarks?: string;
  // bias_score represents the party's political leaning on a scale of -1 to 1,
  // where -1 means strongly left, 0 means centrist, and 1 means strongly right.
  bias_score: number;
}

interface PublicBrief {
  expectations: string;
  keyConsiderations: string;
}

interface Election {
  electionName: string;
  country: string;
  electionType: string;
  date: string;
  description: string;
  parties: Party[];
  publicBrief: PublicBrief;
}

// An improved PartyCard component with a distinct header, side-by-side sections, and a clear bias indicator.
const PartyCard: React.FC<{ party: Party }> = ({ party }) => {
  // Determine a textual label based on the bias_score value.
  const getPoliticalLeaning = (score: number): string => {
    if (score < -0.33) return 'Left';
    if (score > 0.33) return 'Right';
    return 'Center';
  };

  return (
    <Card
      className="card"
      hoverable
      style={{
        borderRadius: 12,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      }}
      bodyStyle={{ padding: '16px' }}
    >
      {/* Header Section: Party Logo, Name, and Bias Info */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {party.logo ? (
            <Avatar shape="square" size={64} src={party.logo} style={{ marginRight: 16 }} />
          ) : (
            <Avatar shape="square" size={64} style={{ backgroundColor: '#1890ff', marginRight: 16 }}>
              {party.partyName.charAt(0)}
            </Avatar>
          )}
          <Title level={4} className="text-primary" style={{ margin: 0 }}>
            {party.partyName}
          </Title>
        </div>
        <div style={{ textAlign: 'right' }}>
          <Text strong>Political Leaning:</Text>
          <br />
          <Text>{getPoliticalLeaning(party.bias_score)}</Text>
          <div style={{ marginTop: 8 }}>
            <BiasMeter score={party.bias_score} />
          </div>
        </div>
      </div>

      {/* Body Section: Notable Figures and Key Policies */}
      <div style={{ marginTop: 16 }}>
        <Row gutter={16}>
          <Col span={12}>
            <Text strong>Notable Figures:</Text>
            <List
              size="small"
              dataSource={party.notableFigures}
              renderItem={(figure) => (
                <List.Item style={{ padding: 0 }}>
                  <Text>{figure.name} ({figure.role})</Text>
                </List.Item>
              )}
              style={{ marginTop: 8 }}
            />
          </Col>
          <Col span={12}>
            <Text strong>Key Policies:</Text>
            <List
              size="small"
              dataSource={party.keyPolicies}
              renderItem={(policy) => (
                <List.Item style={{ padding: 0 }}>
                  <Text strong>{policy.title}: </Text>
                  <Text>{policy.description}</Text>
                </List.Item>
              )}
              style={{ marginTop: 8 }}
            />
          </Col>
        </Row>
      </div>

      {/* Public Sentiment Section */}
      <div style={{ marginTop: 16 }}>
        <Row gutter={16}>
          <Col span={12}>
            <Card size="small" bordered={false} style={{ backgroundColor: '#f6ffed' }}>
              <Text strong>Positive:</Text>
              <Paragraph style={{ marginBottom: 4 }}>{party.publicSentiment.positive.summary}</Paragraph>
              {party.publicSentiment.positive.tags.map((tag, index) => (
                <Tag color="green" key={index}>
                  {tag}
                </Tag>
              ))}
            </Card>
          </Col>
          <Col span={12}>
            <Card size="small" bordered={false} style={{ backgroundColor: '#fff1f0' }}>
              <Text strong>Negative:</Text>
              <Paragraph style={{ marginBottom: 4 }}>{party.publicSentiment.negative.summary}</Paragraph>
              {party.publicSentiment.negative.tags.map((tag, index) => (
                <Tag color="red" key={index}>
                  {tag}
                </Tag>
              ))}
            </Card>
          </Col>
        </Row>
      </div>

      {/* Optional Remarks */}
      {party.remarks && (
        <div style={{ marginTop: 16 }}>
          <Text strong>Remarks:</Text>
          <Paragraph>{party.remarks}</Paragraph>
        </div>
      )}
    </Card>
  );
};

const ElectionTracker: React.FC = () => {
  // List of election names to load (each appears only once)
  const electionNames = [
    "German Bundestag Election",
    "Australian Parliamentary Elections",
    "Canadian Federal Election",
  ];
  const [loadedElections, setLoadedElections] = useState<Election[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [progressMessage, setProgressMessage] = useState<string>("Getting the latest updates...");

  // Array of progress messages to cycle through while loading.
  const progressMessages = [
    "Getting the latest updates...",
    "Incorporating party details...",
    "Understanding bias values...",
    "Finalizing public brief..."
  ];

  // Cycle progress messages every 2 seconds until loading is complete.
  useEffect(() => {
    if (!loading) return;
    const intervalId = setInterval(() => {
      setProgressMessage(prev => {
        const currentIndex = progressMessages.indexOf(prev);
        const nextIndex = (currentIndex + 1) % progressMessages.length;
        return progressMessages[nextIndex];
      });
    }, 2000);
    return () => clearInterval(intervalId);
  }, [loading]);

  // Function to fetch a single election's data from GPT‑4o.
  const fetchSingleElection = async (electionName: string): Promise<Election> => {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'user',
            content:
              `Provide current election details for the election: ${electionName}. ` +
              `Return your response strictly as valid JSON following exactly the structure provided below. ` +
              `Include at least three party objects in the "parties" field. ` +
              `Ensure that the "bias_score" value is a number between -1 and 1 (where -1 means strongly left, 0 means centrist, and 1 means strongly right). ` +
              `At the end, provide a "publicBrief" section with a summary of public expectations and key considerations regarding the election. ` +
              `Do not output any extra text or markdown formatting (remove any \`\`\`json and \`\`\` wrappers).\n\n` +
              `Expected JSON Format:\n` +
              `{\n` +
              `  "electionName": "${electionName}",\n` +
              `  "country": "Country Name",\n` +
              `  "electionType": "Type of Election",\n` +
              `  "date": "2025-xx-xx",\n` +
              `  "description": "A brief overview of the election context and importance.",\n` +
              `  "parties": [\n` +
              `    {\n` +
              `      "partyName": "Party Name",\n` +
              `      "logo": "https://example.com/logo.png",\n` +
              `      "notableFigures": [\n` +
              `        {"name": "Name 1", "role": "Role 1"},\n` +
              `        {"name": "Name 2", "role": "Role 2"}\n` +
              `      ],\n` +
              `      "keyPolicies": [\n` +
              `        {"title": "Policy A", "description": "Description of policy A."},\n` +
              `        {"title": "Policy B", "description": "Description of policy B."}\n` +
              `      ],\n` +
              `      "publicSentiment": {\n` +
              `        "positive": {"summary": "Positive commentary", "tags": ["trustworthy", "innovative"]},\n` +
              `        "negative": {"summary": "Critical commentary", "tags": ["controversial", "divisive"]}\n` +
              `      },\n` +
              `      "remarks": "Additional remarks",\n` +
              `      "bias_score": 0.2\n` +
              `    }\n` +
              `    // Include at least two additional party objects\n` +
              `  ],\n` +
              `  "publicBrief": {\n` +
              `    "expectations": "A brief summary of the public’s expectations regarding this election, including what they hope to see in policy and leadership.",\n` +
              `    "keyConsiderations": "A summary of the critical issues and concerns driving voter opinions, such as economic performance, social policies, and international relations."\n` +
              `  }\n` +
              `}\n`
          },
        ],
        temperature: 0.7,
        max_tokens: 2200,
      }),
    });
    const result = await response.json();
    let rawContent = result.choices[0].message.content as string;
    // Remove markdown formatting if any is present.
    const cleanedContent = rawContent.replace(/```json/g, '').replace(/```/g, '').trim();
    const parsedData = JSON.parse(cleanedContent);
    return parsedData;
  };

  // Fetch all elections concurrently.
  useEffect(() => {
    const loadAllElections = async () => {
      try {
        const elections = await Promise.all(electionNames.map(name => fetchSingleElection(name)));
        setLoadedElections(elections);
      } catch (err) {
        console.error(err);
        setError('Error loading elections');
      } finally {
        setLoading(false);
      }
    };
    loadAllElections();
  }, []);

  return (
    <Layout style={{ minHeight: '100vh', padding: '2rem', backgroundColor: 'var(--color-eggshell)' }}>
      <Content>
        {loading && (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <Spin tip={progressMessage} />
          </div>
        )}
        {loadedElections.length > 0 && (
          <div style={{ marginBottom: '1rem' }}>
            <Text strong>{`Loaded ${loadedElections.length} of ${electionNames.length} elections`}</Text>
          </div>
        )}
        {loadedElections.map((election, idx) => (
          <Card key={idx} className="card" style={{ marginBottom: '2rem' }}>
            <Title level={3} className="text-primary">{election.electionName}</Title>
            <Paragraph className="subheading">
              <Text strong>Country:</Text> {election.country}
            </Paragraph>
            <Paragraph className="paragraph">{election.description}</Paragraph>
            <Title level={4} className="text-secondary" style={{ marginTop: '1rem' }}>
              Parties Involved:
            </Title>
            <Row gutter={[16, 16]}>
              {election.parties.map((party, index: number) => (
                <Col key={index} xs={24} sm={12} md={8}>
                  <PartyCard party={party} />
                </Col>
              ))}
            </Row>
            {/* Improved Public Brief Section */}
            <div style={{ marginTop: '2rem', padding: '16px', backgroundColor: '#e6f7ff', borderRadius: '8px', border: '1px solid #91d5ff' }}>
              <Title level={5}>Public Brief</Title>
              <Row gutter={16}>
                <Col span={12}>
                  <Title level={5}>Public Expectations</Title>
                  <Paragraph>{election.publicBrief.expectations}</Paragraph>
                </Col>
                <Col span={12}>
                  <Title level={5}>Key Considerations</Title>
                  <Paragraph>{election.publicBrief.keyConsiderations}</Paragraph>
                </Col>
              </Row>
            </div>
          </Card>
        ))}
        {error && <Paragraph style={{ color: 'red' }}>{error}</Paragraph>}
      </Content>
    </Layout>
  );
};

export default ElectionTracker;
