function FilterBar() {
  return (
    <div className="d-flex items">
      <div className="p-2 flex-fill">
        <input placeholder="Location" id="location" />
      </div>
      <div className="p-2 flex-fill">
        <select id="range">
          <option selected hidden>Price Range</option>
          <option>Below 5,000</option>
          <option>5,000 - 10,000</option>
          <option>10,000-20,000</option>
          <option>Above 20,000</option>
        </select>
      </div>
      <div className="p-2 flex-fill">
        <select id="type">
          <option selected hidden>Bedrooms</option>
          <option>1BHK</option>
          <option>2BHK</option>
          <option>3BHK</option>
        </select>
      </div>
      <div className="p-2 flex-fill">
        <button id="search" className="btn btn-primary">
          Search
        </button>
      </div>
    </div>
  );
}

export default FilterBar;
