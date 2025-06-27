import React from "react";
import "./PropertyCard.css";

const PropertyCard = () => {
  return (
    <div className="property-card">
      <h2 className="title">Property Details</h2>
      <img
        src="https://via.placeholder.com/600x300"
        alt="House"
        className="property-image"
      />

      <div className="section">
        <h3>Description</h3>
        <p>
          Spacious three-bedroom house with modern amenities, located in a quiet
          neighborhood. Features include an updated kitchen, hardwood floors,
          and a two-car garage.
        </p>
      </div>

      <div className="info-grid">
        <div>
          <h3>Rent</h3>
          <p>$1,800 / month</p>
        </div>
        <div>
          <h3>Location</h3>
          <p>123 Maple Street, Hometown</p>
        </div>
      </div>

      <div className="section">
        <h3>Amenities</h3>
        <ul>
          <li>Updated Kitchen</li>
          <li>Hardwood Floors</li>
          <li>Two-Car Garage</li>
          <li>Central Air Conditioning</li>
        </ul>
      </div>

      <button className="contact-button">Contact Owner</button>
    </div>
  );
};

export default PropertyCard;
