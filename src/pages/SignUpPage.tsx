import React, { useState } from 'react';
import { Form, Input, Button, Select, Typography, message, Slider } from 'antd';
import { registerUser } from '../api/auth';
import '../styles.css';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;
const { Option } = Select;

const SignUpPage: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const answers = Array.from({ length: 10 }, (_, i) => values[`question${i + 1}`]);
      const average = answers.reduce((a, b) => a + b, 0) / answers.length;

      const userData = {
        name: values.name,
        email: values.email,
        password: values.password,
        country: values.country,
        interests: values.interests,
        customInterest: values.customInterest,
        newsHabits: values.newsHabits,
        socialMediaUsage: values.socialMediaUsage,
        responses: Object.fromEntries(
          Object.entries(values).filter(([key]) => key.startsWith('question'))
        )
      };

      const preferences = {
        preferred_topics: values.interests?.[0] || 'General',
        preferred_bias: average,
        preferred_region: values.country,
        bias_score: average
      };

      await registerUser(userData, preferences);
      message.success('Sign up successful! Redirecting...');
      form.resetFields();
      navigate('/');
    } catch (err) {
      console.error(err);
      message.error('Failed to sign up.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-eggshell" style={{ minHeight: '100vh', padding: 40 }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <Title level={2} className="text-primary">Create Your Account</Title>
        <Form form={form} initialValues={{}} validateTrigger="onBlur"
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={() => message.error('Please complete the form.')}
        >
          <Form.Item name="name" label="Name" rules={[{ required: true }]} initialValue=""><Input /></Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]} initialValue=""><Input /></Form.Item>
          <Form.Item name="password" label="Password" rules={[{ required: true }]} initialValue=""><Input.Password /></Form.Item>
          <Form.Item name="country" label="Country" rules={[{ required: true }]} initialValue=""><Input /></Form.Item>

          <Form.Item name="interests" label="Topics of Interest" rules={[{ required: true }]} initialValue={[]}> 
            <Select mode="multiple">
              <Option value="Politics">Politics</Option>
              <Option value="Tech">Tech</Option>
              <Option value="Health">Health</Option>
              <Option value="Economy">Economy</Option>
              <Option value="Environment">Environment</Option>
              <Option value="Science">Science</Option>
              <Option value="Education">Education</Option>
            </Select> 
          </Form.Item>
          <Form.Item name="customInterest" label="Add Custom Interest" initialValue=""><Input /></Form.Item>

          <Form.Item name="question1" label="The government should provide universal healthcare" rules={[{ required: true }]} initialValue={1}>
            <Slider min={1} max={5} marks={{1:'Strongly Disagree', 3:'Neutral', 5:'Strongly Agree'}} />
          </Form.Item>
          <Form.Item name="question2" label="Welfare programs are essential to help those in need" rules={[{ required: true }]} initialValue={1}>
            <Slider min={1} max={5} marks={{1:'Strongly Disagree', 3:'Neutral', 5:'Strongly Agree'}} />
          </Form.Item>
          <Form.Item name="question3" label="Government regulation of the economy is necessary" rules={[{ required: true }]} initialValue={1}>
            <Slider min={1} max={5} marks={{1:'Strongly Disagree', 3:'Neutral', 5:'Strongly Agree'}} />
          </Form.Item>
          <Form.Item name="question4" label="Higher taxes on the rich are needed to support public services" rules={[{ required: true }]} initialValue={1}>
            <Slider min={1} max={5} marks={{1:'Strongly Disagree', 3:'Neutral', 5:'Strongly Agree'}} />
          </Form.Item>
          <Form.Item name="question5" label="Military spending should be increased" rules={[{ required: true }]} initialValue={1}>
            <Slider min={1} max={5} marks={{1:'Strongly Disagree', 3:'Neutral', 5:'Strongly Agree'}} />
          </Form.Item>
          <Form.Item name="question6" label="The private sector is more efficient than the public sector" rules={[{ required: true }]} initialValue={1}>
            <Slider min={1} max={5} marks={{1:'Strongly Disagree', 3:'Neutral', 5:'Strongly Agree'}} />
          </Form.Item>
          <Form.Item name="question7" label="Climate change should be a top priority for policy makers" rules={[{ required: true }]} initialValue={1}>
            <Slider min={1} max={5} marks={{1:'Strongly Disagree', 3:'Neutral', 5:'Strongly Agree'}} />
          </Form.Item>
          <Form.Item name="question8" label="Religious values should influence government decisions" rules={[{ required: true }]} initialValue={1}>
            <Slider min={1} max={5} marks={{1:'Strongly Disagree', 3:'Neutral', 5:'Strongly Agree'}} />
          </Form.Item>
          <Form.Item name="question9" label="The government should not interfere in free markets" rules={[{ required: true }]} initialValue={1}>
            <Slider min={1} max={5} marks={{1:'Strongly Disagree', 3:'Neutral', 5:'Strongly Agree'}} />
          </Form.Item>
          <Form.Item name="question10" label="Healthcare is a right, not a privilege" rules={[{ required: true }]} initialValue={1}>
            <Slider min={1} max={5} marks={{1:'Strongly Disagree', 3:'Neutral', 5:'Strongly Agree'}} />
          </Form.Item>

          <Form.Item name="newsHabits" label="How often do you consume news?" rules={[{ required: true }]} initialValue="daily"> 
            <Select> 
              <Option value="hourly">Hourly</Option>
              <Option value="daily">Daily</Option>
              <Option value="weekly">Weekly</Option>
            </Select> 
          </Form.Item>
          <Form.Item name="socialMediaUsage" label="Which social platforms do you use most?" rules={[{ required: true }]} initialValue={["Twitter"]}> 
            <Select mode="multiple"> 
              <Option value="Twitter">Twitter</Option>
              <Option value="Facebook">Facebook</Option>
              <Option value="Reddit">Reddit</Option>
            </Select> 
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>Sign Up</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default SignUpPage;
