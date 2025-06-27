import React, { useState } from 'react';
import './CSS.css';

const LoginPage = ({ onSwitch,onForgot }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.status === 200) {
        setMessage('Login successful!');
      } else {
        setMessage(data.error || 'Login failed');
      }
    } catch (err) {
      console.error(err);
      setMessage('Server error');
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
      <p>{message}</p>
      <p>
        Don't have an account?{' '}
        <button onClick={onSwitch} className="link-button">Register</button>
      </p>
      <p>
        <button onClick={onForgot} className="link-button">Forgot Password?</button>
      </p>
    </div>
  );
};

export default LoginPage;
