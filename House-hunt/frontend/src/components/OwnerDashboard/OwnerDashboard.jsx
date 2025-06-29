import React, { useEffect, useState } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Navbar,
  Nav,
} from 'react-bootstrap';
import { FaBars } from 'react-icons/fa';
import API from '../../api';
import { useNavigate } from 'react-router-dom';

export default function OwnerDashboard() {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [showNav, setShowNav] = useState(false); // 👈 navbar toggle state for small screens

  const fetchMyProperties = async () => {
    try {
      const res = await API.get('/properties/my');
      setProperties(res.data);
    } catch (err) {
      console.error('Error fetching properties:', err.response?.data || err.message);
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate('/');
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this property?')) return;
    try {
      const token = localStorage.getItem('token');
      await API.delete(`/properties/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Property deleted successfully!');
      fetchMyProperties();
    } catch (err) {
      console.error('Failed to delete:', err);
      alert('Failed to delete property.');
    }
  };

  useEffect(() => {
    fetchMyProperties();
  }, []);

  return (
    <div style={{ backgroundColor: '#d7eafc', minHeight: '100vh', paddingBottom: '30px' }}>
      {/* Navbar */}
      <Navbar expand="lg" className="px-4 py-3 mb-4" style={{ backgroundColor: '#444' }}>
        <Container fluid className="d-flex justify-content-between align-items-center">
          <Navbar.Brand className="text-white fw-bold">Owner Dashboard</Navbar.Brand>

          {/* Show menu icon only on small screens */}
          <FaBars
            className="text-white d-lg-none"
            size={22}
            onClick={() => setShowNav(!showNav)}
            style={{ cursor: 'pointer' }}
          />

          {/* Nav items - hidden on mobile until icon clicked */}
          <Nav
            className={`d-lg-flex gap-4 align-items-center ${showNav ? 'd-flex flex-column mt-3' : 'd-none'}`}
          >
            <Nav.Link className="text-white" onClick={fetchMyProperties}>My Properties</Nav.Link>
            <Nav.Link className="text-white" onClick={() => navigate('/add-property')}>Add New</Nav.Link>
            <Nav.Link className="text-white" onClick={() => navigate('/owner-requests')}>Booking Requests</Nav.Link>
            <Nav.Link className="text-white" onClick={logout}>Logout</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {/* Properties section */}
      <Container>
        <h4 className="mb-4 text-dark fw-semibold">My Listed Properties</h4>
        <Row>
          {properties.length === 0 ? (
            <p className="text-center text-dark">You haven’t added any properties yet.</p>
          ) : (
            properties.map((p) => (
              <Col md={4} key={p._id} className="mb-4">
                <Card className="shadow-sm h-100">
                  <Card.Img
                    variant="top"
                    src={`https://house-hunt-2.onrender.com${p.image}`}
                    alt="property"
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <Card.Body className="d-flex flex-column">
                    <Card.Title>{p.title}</Card.Title>
                    <Card.Text>
                      <strong>Location:</strong> {p.location}<br />
                      <strong>Price:</strong> ₹{p.price}/month<br />
                      <strong>Bedrooms:</strong> {p.bedrooms || 'N/A'}
                    </Card.Text>
                    <div className="mt-auto d-flex justify-content-between">
                      <Button variant="warning" size="sm" onClick={() => navigate(`/edit-property/${p._id}`)}>Edit</Button>
                      <Button variant="danger" size="sm" onClick={() => handleDelete(p._id)}>Delete</Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))
          )}
        </Row>
      </Container>
    </div>
  );
}
