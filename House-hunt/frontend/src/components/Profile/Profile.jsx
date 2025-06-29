import React, { useEffect, useState } from 'react';
import { Container, Card, Navbar, Nav, Alert } from 'react-bootstrap';
import API from '../../api';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await API.get('/profile/me', {
          headers: { Authorization: token },
        });
        setUser(res.data);
      } catch {
        navigate('/');
      }
    };
    fetch();
  }, [navigate]);

  const logout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div style={{ backgroundColor: '#d7eafc', minHeight: '100vh', paddingBottom: '30px' }}>
      <Navbar expand="lg" className="px-4 py-3 mb-4" style={{ backgroundColor: '#444' }}>
        <Container fluid>
          <Navbar.Brand className="text-white fw-bold">Renter Dashboard</Navbar.Brand>
          <Nav className="ms-auto d-flex gap-4">
            <Nav.Link className="text-white" onClick={() => navigate('/renter')}>Home</Nav.Link>
            <Nav.Link className="text-white" onClick={() => navigate('/bookings')}>Bookings</Nav.Link>
            <Nav.Link className="text-white" onClick={() => navigate('/profile')}>Profile</Nav.Link>
            <Nav.Link className="text-white" onClick={logout}>Logout</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Container>
        {user ? (
          <Card className="p-4 shadow-sm">
            <h4 className="mb-3">Your Profile</h4>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role}</p>
            <p><strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
          </Card>
        ) : (
          <Alert variant="light">Loading profile...</Alert>
        )}
      </Container>
    </div>
  );
}
