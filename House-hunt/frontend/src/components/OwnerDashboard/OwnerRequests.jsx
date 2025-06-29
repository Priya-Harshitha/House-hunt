import React from 'react';
import { Container } from 'react-bootstrap';

export default function OwnerRequests() {
  return (
    <div style={{ backgroundColor: '#d7eafc', minHeight: '100vh', paddingTop: '50px' }}>
      <Container className="text-center">
        <h3 className="text-dark mb-4">Booking Requests</h3>
        <p className="text-muted fs-5">No booking requests yet.</p>
      </Container>
    </div>
  );
}
