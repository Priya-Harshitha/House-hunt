import React, { useState } from "react";
import Navbar from "./Navbar";
import OwnerPropertyCard from "./OwnerPropertyCard";
import InquiriesList from "./InquiriesList";
import AddPropertyForm from "./AddPropertyForm";

function OwnerDashboard() {
  const [activeTab, setActiveTab] = useState("properties");

  const [properties, setProperties] = useState([
    {
    title: "Modern 2BHK Flat",
    price: "$1,200/month",
    location: "Bangalore",
    bedrooms: "2BHK",
    images: ["/house.jpeg"]
  },
  {
    title: "Modern 2BHK Flat",
    price: "$1,200/month",
    location: "Bangalore",
    bedrooms: "2BHK",
    images: ["/house.jpeg"]
  },
  {
    title: "Modern 2BHK Flat",
    price: "$1,200/month",
    location: "Bangalore",
    bedrooms: "2BHK",
    images: ["/house.jpeg"]
  },
  {
    title: "Modern 2BHK Flat",
    price: "$1,200/month",
    location: "Bangalore",
    bedrooms: "2BHK",
    images: ["/house.jpeg"]
  },
  {
    title: "Modern 2BHK Flat",
    price: "$1,200/month",
    location: "Bangalore",
    bedrooms: "2BHK",
    images: ["/house.jpeg"]
  },
  {
    title: "Modern 2BHK Flat",
    price: "$1,200/month",
    location: "Bangalore",
    bedrooms: "2BHK",
    images: ["/house.jpeg"]
  },
    {
      title: "Modern 2BHK Flat",
      price: "$1,200/month",
      location: "Bangalore",
      bedrooms: "2BHK",
      images: ["/house.jpeg"]
    },
    {
      title: "Cozy 1BHK Studio",
      price: "$800/month",
      location: "Hyderabad",
      bedrooms: "1BHK",
      images: ["/house.jpeg"]
    }
  ]);

  const [inquiries, setInquiries] = useState([
    { property: "Modern 2BHK Flat", renter: "Priya", message: "Is it still available?", date: "25 Jun" },
    { property: "Cozy 1BHK Studio", renter: "Rahul", message: "Can I visit this weekend?", date: "24 Jun" }
  ]);

  const addProperty = (newProp) => {
    setProperties([...properties, newProp]);
    setActiveTab("properties");
  };

  const deleteProperty = (index) => {
    const updated = [...properties];
    updated.splice(index, 1);
    setProperties(updated);
  };

  return (
    <>
      <Navbar setActiveTab={setActiveTab} />
      <div className="container mt-4">
        {activeTab === "properties" && (
          <>
            <h4 className="mb-3">My Properties</h4>
            <div className="row">
              {properties.length === 0 && <p>No properties yet.</p>}
              {properties.map((prop, idx) => (
                <div className="col-md-3 mb-4" key={idx}>
                  <OwnerPropertyCard
                    property={prop}
                    onDelete={() => deleteProperty(idx)}
                  />
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === "add" && (
          <>
            <h4 className="mb-3">Add New Property</h4>
            <AddPropertyForm onAdd={addProperty} />
          </>
        )}

        {activeTab === "inquiries" && (
          <>
            <h4 className="mb-3">Inquiries Received</h4>
            <InquiriesList inquiries={inquiries} />
          </>
        )}
      </div>
    </>
  );
}

export default OwnerDashboard;
