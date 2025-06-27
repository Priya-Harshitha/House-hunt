import React, { useState } from 'react';
import LoginPage from './LoginPage';
import Register from './Register';
import ForgotPassword from './ForgotPassword';
import './CSS.css';

function App() {
  const [page, setPage] = useState('login');

  const handleBackToLogin = () => setPage('login');

  return (
    <div className="App">
      {page === 'login' && (
        <LoginPage onSwitch={() => setPage('register')} onForgot={() => setPage('forgot')} />
      )}
      {page === 'register' && <Register onSwitch={() => setPage('login')} />}
      {page === 'forgot' && <ForgotPassword onBackToLogin={handleBackToLogin} />}
    </div>
  );
}

export default App;
