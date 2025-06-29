import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Navbar, Nav } from 'react-bootstrap';
import { FaBars } from 'react-icons/fa';
import API from '../../api';
import { useNavigate } from 'react-router-dom';

export default function RenterDashboard() {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [filters, setFilters] = useState({ location: '', price: '', bedrooms: '' });
  const [showNav, setShowNav] = useState(false); // 👈 for responsive menu

  const fetchProperties = async () => {
    try {
      const params = new URLSearchParams(filters).toString();
      const res = await API.get(`/properties?${params}`);
      setProperties(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const logout = () => {
    localStorage.clear();
    navigate('/');
  };

  const viewProperty = (id) => {
    navigate(`/view-property/${id}`);
  };

  const sendInquiry = (id) => {
    navigate(`/inquiry/${id}`);
  };

  return (
    <div style={{ backgroundColor: '#d7eafc', minHeight: '100vh', paddingBottom: '30px' }}>
      {/* Navbar */}
      <Navbar expand="lg" className="px-4 py-3 mb-4" style={{ backgroundColor: '#444' }}>
        <Container fluid className="d-flex justify-content-between align-items-center">
          <Navbar.Brand className="text-white fw-bold">Renter Dashboard</Navbar.Brand>

          {/* FaBars icon - show only on small screens */}
          <FaBars
            className="text-white d-lg-none"
            size={22}
            style={{ cursor: 'pointer' }}
            onClick={() => setShowNav(!showNav)}
          />

          {/* Nav items - responsive toggle */}
          <Nav
            className={`d-lg-flex gap-4 align-items-center ${showNav ? 'd-flex flex-column mt-3' : 'd-none'}`}
          >
            <Nav.Link className="text-white" onClick={() => navigate('/renter')}>Home</Nav.Link>
            <Nav.Link className="text-white" onClick={() => navigate('/bookings')}>Bookings</Nav.Link>
            <Nav.Link className="text-white" onClick={() => navigate('/profile')}>Profile</Nav.Link>
            <Nav.Link className="text-white" onClick={logout}>Logout</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {/* Filters */}
      <Container>
        <Card className="p-3 mb-4 shadow-sm">
          <Row>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Location</Form.Label>
                <Form.Control
                  name="location"
                  value={filters.location}
                  onChange={handleFilterChange}
                  placeholder="City or area"
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Max Price (₹)</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  value={filters.price}
                  onChange={handleFilterChange}
                  placeholder="e.g. 15000"
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Bedrooms</Form.Label>
                <Form.Select name="bedrooms" value={filters.bedrooms} onChange={handleFilterChange}>
                  <option value="">Any</option>
                  <option value="1">1 BHK</option>
                  <option value="2">2 BHK</option>
                  <option value="3">3 BHK</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col md={4}>
              <Button variant="primary" onClick={fetchProperties} className="me-2">Apply Filter</Button>
              <Button
                variant="outline-secondary"
                onClick={() => {
                  setFilters({ location: '', price: '', bedrooms: '' });
                  fetchProperties();
                }}
              >
                Reset
              </Button>
            </Col>
          </Row>
        </Card>

        {/* Property Cards */}
        <Row>
          {properties.length === 0 ? (
            <p className="text-center text-white">No properties available.</p>
          ) : (
            properties.map((p) => (
              <Col md={4} key={p._id} className="mb-4">
                <Card className="shadow-sm h-100">
                  <Card.Img variant="top" src={`https://house-hunt-2.onrender.com${p.image}`}/>
                  <Card.Body className="d-flex flex-column">
                    <Card.Title>{p.title}</Card.Title>
                    <Card.Text>
                      <strong>Location:</strong> {p.location}<br />
                      <strong>Price:</strong> ₹{p.price}/mo<br />
                      <strong>Bedrooms:</strong> {p.bedrooms || 'N/A'}
                    </Card.Text>
                    <div className="mt-auto d-flex justify-content-between">
                      <Button variant="info" onClick={() => viewProperty(p._id)}>View Property</Button>
                      <Button variant="warning" onClick={() => sendInquiry(p._id)}>Inquiry</Button>
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
