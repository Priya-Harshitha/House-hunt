import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from "./components/Auth/Auth";
import RenterDashboard from './components/RenterDashboard/RenterDashboard';
import OwnerDashboard from './components/OwnerDashboard/OwnerDashboard';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import Profile from './components/Profile/Profile';
import ViewProperty from './components/PropertyCard/ViewProperty';
import Bookings from './components/Bookings/Bookings';
import InquiryForm from './components/InquiryForm/InquiryForm';
import AddProperty from './components/OwnerDashboard/AddProperty';
import EditProperty from './components/OwnerDashboard/EditProperty';
import OwnerRequests from './components/OwnerDashboard/OwnerRequests';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/renter" element={<RenterDashboard />} />
        <Route path="/owner" element={<OwnerDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/view-property/:id" element={<ViewProperty />} />
        <Route path="/inquiry/:id" element={<InquiryForm />} /> 
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/add-property" element={<AddProperty />} />
        <Route path="/edit-property/:id" element={<EditProperty />} />
        <Route path="/owner-requests" element={<OwnerRequests />} />
      </Routes>
    </Router>
  );
}

export default App;
