import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import API from '../../api';

export default function Bookings() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await API.get('/inquiries', {
          headers: { Authorization: token }
        });
        setBookings(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchBookings();
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div style={{ backgroundColor: '#d7eafc', minHeight: '100vh', paddingBottom: '30px' }}>
      {/* Navbar */}
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

      {/* Content */}
      <Container>
        <h2 className="text-dark mb-4">My Bookings</h2>
        {bookings.length === 0 ? (
          <p className="bg-white text-dark p-3 rounded shadow-sm">You have no bookings yet.</p>
        ) : (
          bookings.map((b, i) => (
            <Card key={i} className="mb-3 shadow-sm">
              <Card.Body className="text-dark">
                <Card.Title>{b.propertyTitle || 'Property'}</Card.Title>
                <Card.Text>
                  <strong>Name:</strong> {b.name} <br />
                  <strong>Email:</strong> {b.email} <br />
                  <strong>Message:</strong> {b.message}
                </Card.Text>
              </Card.Body>
            </Card>
          ))
        )}
      </Container>
    </div>
  );
}
