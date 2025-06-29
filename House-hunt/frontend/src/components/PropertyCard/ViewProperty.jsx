import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../../api';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';

export default function ViewProperty() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await API.get(`/properties/${id}`);
        setProperty(res.data);
      } catch (err) {
        console.error('Failed to load property:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  if (loading) {
    return <p className="text-center mt-5">Loading...</p>;
  }

  if (!property) {
    return <p className="text-center text-danger mt-5">Property not found.</p>;
  }

  return (
    <div style={{ backgroundColor: '#d7eafc', minHeight: '100vh', padding: '40px 0' }}>
      <Container>
        <Card className="shadow-lg p-4">
          <Row>
            <Col md={6}>
              <Card.Img
  variant="top"
  src={`https://house-hunt-2.onrender.com${p.image}`}
  style={{ maxHeight: '300px', objectFit: 'cover' }}
/>

            </Col>
            <Col md={6}>
              <h3>{property.title}</h3>
              <p><strong>Location:</strong> {property.location}</p>
              <p><strong>Price:</strong> ₹{property.price}/month</p>
              <p><strong>Bedrooms:</strong> {property.bedrooms || 'N/A'}</p>
              <p><strong>Description:</strong> {property.description || 'No description available.'}</p>
              <div className="d-flex gap-3 mt-4">
                {/* ✅ Working Make Inquiry button */}
                <Button variant="warning" onClick={() => navigate(`/inquiry/${property._id}`)}>
                  Make Inquiry
                </Button>
                <Button variant="secondary" onClick={() => navigate(-1)}>
                  Go Back
                </Button>
              </div>
            </Col>
          </Row>
        </Card>
      </Container>
    </div>
  );
}
