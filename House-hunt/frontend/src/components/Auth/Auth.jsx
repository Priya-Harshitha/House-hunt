import React, { useState } from 'react';
import { Container, Card, Form, Button, Tabs, Tab } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import API from '../../api';

export default function Auth() {
  const nav = useNavigate();
  const [activeTab, setActiveTab] = useState('login');
  const [loginData, setLoginData] = useState({ email: '', password: '', role: 'renter' });
  const [registerData, setRegisterData] = useState({ name: '', email: '', password: '', role: 'renter' });

  const handleLogin = e => setLoginData({ ...loginData, [e.target.name]: e.target.value });
  const handleRegister = e => setRegisterData({ ...registerData, [e.target.name]: e.target.value });

  const submitLogin = async e => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', loginData);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      nav(`/${res.data.user.role}`);
    } catch {
      alert('Incorrect login credentials');
    }
  };

  const submitRegister = async e => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/register', registerData);
      alert('Registration successful!');
      setActiveTab('login');
    } catch {
      alert('Registration failed');
    }
  };

  return (
    <div style={{ background: '#d7eafc', minHeight: '100vh' }}>
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <Card className="p-4 shadow" style={{ width: '400px' }}>
          <Tabs activeKey={activeTab} onSelect={setActiveTab} className="mb-3" justify>
            <Tab eventKey="login" title="Login">
              <Form onSubmit={submitLogin}>
                <Form.Group className="mb-3">
                  <Form.Select name="role" value={loginData.role} onChange={handleLogin}>
                    <option value="renter">Renter</option>
                    <option value="owner">Owner</option>
                    <option value="admin">Admin</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control name="email" type="email" placeholder="Email" onChange={handleLogin} required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control name="password" type="password" placeholder="Password" onChange={handleLogin} required />
                </Form.Group>
                <Button className="w-100 mb-2" type="submit">Login</Button>
                <div className="text-center">
                  <small style={{ color: 'gray' }}>Forgot password?</small>
                </div>
              </Form>
            </Tab>

            <Tab eventKey="register" title="Register">
              <Form onSubmit={submitRegister}>
                <Form.Group className="mb-3">
                  <Form.Control name="name" placeholder="Name" onChange={handleRegister} required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Select name="role" value={registerData.role} onChange={handleRegister}>
                    <option value="renter">Renter</option>
                    <option value="owner">Owner</option>
                    <option value="admin">Admin</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control name="email" type="email" placeholder="Email" onChange={handleRegister} required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control name="password" type="password" placeholder="Password" onChange={handleRegister} required />
                </Form.Group>
                <Button className="w-100" type="submit">Register</Button>
              </Form>
            </Tab>
          </Tabs>
        </Card>
      </Container>
    </div>
  );
}
