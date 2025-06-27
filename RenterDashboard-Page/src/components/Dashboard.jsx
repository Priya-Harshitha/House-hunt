import FilterBar from "./FilterBar";
import PropertyCard from "./PropertyCard";

function Dashboard() {
  return (
    <section>
      <FilterBar />
      <div className="cards">
        {Array.from({ length: 9 }).map((_, idx) => (
          <PropertyCard key={idx} />
        ))}
      </div>
    </section>
  );
}

export default Dashboard;
