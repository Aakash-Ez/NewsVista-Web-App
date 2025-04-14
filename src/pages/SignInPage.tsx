import React, { useState } from 'react';
import { Form, Input, Button, Typography, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api/auth';
import '../styles.css';

const { Title, Paragraph } = Typography;

const SignInPage: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      await loginUser(values.email, values.password);
      message.success('Welcome back!');
      navigate('/');
    } catch (err) {
      console.error(err);
      message.error('Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-eggshell" style={{ minHeight: '100vh', padding: 40 }}>
      <div style={{ maxWidth: 600, margin: '0 auto' }}>
        <Title level={2} className="text-primary">Welcome to NewsVista</Title>
        <Paragraph className="text-dim-gray" style={{ marginBottom: 32 }}>
          NewsVista helps you see the full picture. Compare how different media outlets frame the same story, track your reading habits, and understand your own biases.
        </Paragraph>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{}}
        >
          <Form.Item name="email" label="Email" initialValue="" rules={[{ required: true, type: 'email' }]}> 
            <Input /> 
          </Form.Item>
          <Form.Item name="password" label="Password" initialValue="" rules={[{ required: true }]}> 
            <Input.Password /> 
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>Sign In</Button>
          </Form.Item>
        </Form>

        <Paragraph className="text-dim-gray" style={{ marginTop: 32 }}>
          Don't have an account? <a href="/signup">Sign up here</a>.
        </Paragraph>
      </div>
    </div>
  );
};

export default SignInPage;
