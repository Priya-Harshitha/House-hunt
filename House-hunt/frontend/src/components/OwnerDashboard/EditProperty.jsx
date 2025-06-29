import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Card } from 'react-bootstrap';
import API from '../../api';

export default function EditProperty() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    price: '',
    bedrooms: '',
  });

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await API.get(`/properties/${id}`);
        const { title, description, location, price, bedrooms } = res.data;
        setFormData({ title, description, location, price, bedrooms });
      } catch (err) {
        console.error('Error fetching property:', err);
        alert('Failed to fetch property data.');
      }
    };

    fetchProperty();
  }, [id]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await API.put(`/properties/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Property updated!');
      navigate('/owner');
    } catch (err) {
      console.error('Update error:', err);
      alert('Failed to update property.');
    }
  };

  return (
    <div style={{ backgroundColor: '#d7eafc', minHeight: '100vh', padding: '40px 0' }}>
      <Container style={{ maxWidth: '600px' }}>
        <Card className="p-4 shadow">
          <h3 className="text-center mb-4">Edit Property</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control name="title" value={formData.title} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" name="description" rows={3} value={formData.description} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Control name="location" value={formData.location} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control name="price" type="number" value={formData.price} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Bedrooms</Form.Label>
              <Form.Control name="bedrooms" type="number" value={formData.bedrooms} onChange={handleChange} required />
            </Form.Group>
            <Button type="submit" variant="primary" className="w-100">Update Property</Button>
          </Form>
        </Card>
      </Container>
    </div>
  );
}
