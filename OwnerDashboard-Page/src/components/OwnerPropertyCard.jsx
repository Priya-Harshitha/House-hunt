function OwnerPropertyCard({ property, onDelete }) {
  return (
    <div className="card" style={{ width: "18rem" }}>
      <img
        src={property.images[0] || "/house.jpeg"}
        className="card-img-top"
        alt="Property"
      />
      <div className="card-body">
        <h5 className="card-title">{property.title}</h5>
        <p className="card-text">{property.price}</p>
        <p className="card-text">{property.location} · {property.bedrooms}</p>
        <button className="btn btn-warning me-2">Edit</button>
        <button className="btn btn-danger" onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
}

export default OwnerPropertyCard;

