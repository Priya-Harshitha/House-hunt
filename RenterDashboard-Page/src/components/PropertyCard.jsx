function PropertyCard() {
  return (
    <div className="card custom-card bg-card" style={{ width: "18rem" }}>
      <img src="/house_renter.jpeg" className="card-img-top" alt="House" />
      <div className="card-body">
        <h5 className="card-title">Cozy 2-Bedroom Apartment</h5>
        <p className="card-text">$1,200/month</p>
        <p className="card-text">Location . 2 bedrooms</p>
        <a href="#" className="btn btn-primary">
          View Property
        </a>
        <a href="#" className="btn orange">
          Inquire
        </a>
      </div>
    </div>
  );
}

export default PropertyCard;
