function Navbar({ setActiveTab }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <span className="navbar-brand">Owner Dashboard</span>
      <div className="navbar-nav">
        <button className="nav-link btn btn-link text-light" onClick={() => setActiveTab("properties")}>My Properties</button>
        <button className="nav-link btn btn-link text-light" onClick={() => setActiveTab("add")}>Add Property</button>
        <button className="nav-link btn btn-link text-light" onClick={() => setActiveTab("inquiries")}>Inquiries</button>
        <button className="nav-link btn btn-link text-light">Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;

