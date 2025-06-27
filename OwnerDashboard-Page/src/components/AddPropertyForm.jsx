import React, { useState } from "react";

function AddPropertyForm({ onAdd }) {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    location: "",
    bedrooms: "",
    images: []
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const filePaths = files.map((file) => URL.createObjectURL(file));
    setFormData({ ...formData, images: filePaths });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData);
    setFormData({ title: "", price: "", location: "", bedrooms: "", images: [] });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input name="title" placeholder="Title" value={formData.title} onChange={handleChange} className="form-control mb-2" required />
      <input name="price" placeholder="Price" value={formData.price} onChange={handleChange} className="form-control mb-2" required />
      <input name="location" placeholder="Location" value={formData.location} onChange={handleChange} className="form-control mb-2" required />
      <select name="bedrooms" value={formData.bedrooms} onChange={handleChange} className="form-control mb-2" required>
        <option value="" hidden>Bedrooms</option>
        <option value="1BHK">1BHK</option>
        <option value="2BHK">2BHK</option>
        <option value="3BHK">3BHK</option>
      </select>

      <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="form-control mb-3" />

      <button className="btn btn-primary">Add Property</button>
    </form>
  );
}

export default AddPropertyForm;

