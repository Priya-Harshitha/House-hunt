import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropertyCard from '../PropertyCard/PropertyCard';
import { useNavigate } from 'react-router-dom';

const RenterDashboard = () => {
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/properties');
        setProperties(res.data);
      } catch (err) {
        console.error('Error fetching properties:', err);
      }
    };

    fetchProperties();
  }, []);

  return (
    <div className="container mt-5">
      <h2>🏠 Renter Dashboard</h2>
      <div className="mb-3">
        <button className="btn btn-outline-primary me-2" onClick={() => navigate('/profile')}>Profile</button>
        <button className="btn btn-outline-secondary me-2" onClick={() => navigate('/bookings')}>Bookings</button>
        <button className="btn btn-outline-danger" onClick={() => { localStorage.removeItem('token'); navigate('/'); }}>Logout</button>
      </div>
      <div className="row">
        {properties.length === 0 ? (
          <p>No properties yet. Check back soon!</p>
        ) : (
          properties.map((property) => (
            <div className="col-md-4" key={property._id}>
              <PropertyCard property={property} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RenterDashboard;
