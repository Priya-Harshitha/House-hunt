import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProfileForm.css';

const ProfileForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    phone: '',
  });

  // Fetch profile data from backend when component mounts
  useEffect(() => {
    axios
      .get('http://localhost:5000/api/profile')
      .then((res) => {
        if (res.data) setFormData(res.data);
      })
      .catch((err) => console.error('Fetch error:', err));
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Save updated profile to backend
  const handleSave = () => {
    axios
      .put('http://localhost:5000/api/profile', formData)
      .then((res) => {
        alert('Profile saved successfully!');
        console.log('Saved:', res.data);
      })
      .catch((err) => {
        console.error('Save error:', err);
        alert('Failed to save profile.');
      });
  };

  const handleLogout = () => {
    alert('Logged out!');
  };

  return (
    <div className="profile-wrapper">
      <div className="profile-container">
        <h2 className="profile-heading">Profile</h2>

        <label className="profile-label">Name:</label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="profile-input"
        />

        <label className="profile-label">Email:</label>
        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="profile-input"
        />

        <label className="profile-label">Role:</label>
        <input
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="profile-input"
        />

        <label className="profile-label">Phone:</label>
        <input
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="profile-input"
        />

        <div className="profile-button-container">
          <button onClick={handleSave} className="save-button">Save</button>
          <button onClick={handleLogout} className="logout-button">Logout</button>
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
