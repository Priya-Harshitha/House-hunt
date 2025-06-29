import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    alert("Admin logged out!");
    navigate('/');
  };

  return (
    <div className="container mt-5">
      <h2>Admin Dashboard</h2>
      <div className="d-flex gap-3 mb-4">
        <button className="btn btn-outline-danger" onClick={handleLogout}>Logout</button>
      </div>
      <p>This is where the admin can view users and manage the platform.</p>
    </div>
  );
};

export default AdminDashboard;
