import React, { useState } from 'react';
import { Form, Button, Container, Card } from 'react-bootstrap';
import API from '../../api';
import { useNavigate } from 'react-router-dom';

export default function AddProperty() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    price: '',
    bedrooms: '',
  });
  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const form = new FormData();

    // Append text fields
    Object.entries(formData).forEach(([key, value]) => {
      form.append(key, value);
    });

    // Append image file
    if (imageFile) {
      form.append('image', imageFile);
    }

    try {
      await API.post('/properties', form, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('Property added successfully!');
      navigate('/owner');
    } catch (err) {
      console.error('Upload failed:', err?.response?.data || err.message);
      alert('Failed to add property.');
    }
  };

  return (
    <div style={{ backgroundColor: '#d7eafc', minHeight: '100vh', padding: '40px 0' }}>
      <Container style={{ maxWidth: '600px' }}>
        <Card className="p-4 shadow">
          <h3 className="text-center mb-4">Add New Property</h3>
          <Form onSubmit={handleSubmit} encType="multipart/form-data">
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" name="title" value={formData.title} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" name="description" value={formData.description} onChange={handleChange} rows={3} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Control type="text" name="location" value={formData.location} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price (₹/month)</Form.Label>
              <Form.Control type="number" name="price" value={formData.price} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Bedrooms</Form.Label>
              <Form.Control type="number" name="bedrooms" value={formData.bedrooms} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Upload Image</Form.Label>
              <Form.Control type="file" onChange={handleImageChange} accept="image/*" />
            </Form.Group>
            <Button type="submit" variant="primary" className="w-100">Add Property</Button>
          </Form>
        </Card>
      </Container>
    </div>
  );
}
