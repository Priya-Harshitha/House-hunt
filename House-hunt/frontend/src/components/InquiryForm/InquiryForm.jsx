import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../../api';
import { Card, Button, Form, Container } from 'react-bootstrap';

export default function InquiryForm() {
  const { id } = useParams(); // property ID
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [property, setProperty] = useState(null);

  useEffect(() => {
    // Fetch property to show title
    API.get(`/properties/${id}`)
      .then(res => setProperty(res.data))
      .catch(() => setProperty(null));
  }, [id]);

  const submit = async e => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      if (!token) return alert('Login session expired!');

      await API.post(
        '/inquiries',
        { propertyId: id, message },
        { headers: { Authorization: token } }
      );

      alert('Inquiry sent successfully!');
      navigate('/renter');
    } catch (err) {
      console.error(err);
      alert('Failed to send inquiry');
    }
  };

  return (
    <div style={{ backgroundColor: '#d7eafc', minHeight: '100vh', paddingTop: '50px' }}>
      <Container style={{ maxWidth: '600px' }}>
        <Card className="p-4 shadow">
          <h4 className="mb-3 text-center">Send Inquiry</h4>
          {property && (
            <Card.Text className="text-muted text-center mb-3">
              For property: <strong>{property.title}</strong>
            </Card.Text>
          )}
          <Form onSubmit={submit}>
            <Form.Group className="mb-3">
              <Form.Label>Your Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                value={message}
                required
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your inquiry or questions here..."
              />
            </Form.Group>
            <div className="d-flex justify-content-between">
              <Button type="submit" variant="primary">Send Inquiry</Button>
              <Button variant="secondary" onClick={() => navigate(-1)}>Cancel</Button>
            </div>
          </Form>
        </Card>
      </Container>
    </div>
  );
}
