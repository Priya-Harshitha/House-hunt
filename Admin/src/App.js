import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [view, setView] = useState("owners");
  const navigate = useNavigate();
  const fetchUsers = async () => {
    const res = await axios.get("http://localhost:5000/api/users");
    setUsers(res.data);
  };

  const updateStatus = async (id, status) => {
    await axios.put(`http://localhost:5000/api/users/${id}`, { status });
    fetchUsers();
  };
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="app">
      <header>
        <h1>Admin Dashboard</h1>
        <nav>
          <button onClick={() => setView("owners")} id="approve">
            Approve Owners
          </button>
          <button onClick={() => setView("users")} id="users">
            Users
          </button>
          <button onclick={handleLogout} className="logout">
            Logout
          </button>
        </nav>
      </header>{" "}
      <main>
        {view === "owners" && (
          <section>
            <h2>Approve Owners</h2>{" "}
            <table>
              <thead>
                {" "}
                <tr>
                  {" "}
                  <th>Name</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Actions</th>{" "}
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.status}</td>
                    <td>
                      {" "}
                      <button
                        onClick={() => updateStatus(user._id, "approved")}
                      >
                        {" "}
                        Approve{" "}
                      </button>
                      <button
                        onClick={() => updateStatus(user._id, "rejected")}
                      >
                        {" "}
                        Reject{" "}
                      </button>{" "}
                    </td>{" "}
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}
        {view === "users" && (
          <section>
            <h2>All Owners</h2>
            <table border="1">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {users
                  .filter((user) => user.role === "owner")
                  .map((user) => (
                    <tr key={user._id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.status}</td>
                    </tr>
                  ))}
              </tbody>
            </table>

            <h2 style={{ marginTop: "30px" }}>All Renters</h2>
            <table border="1">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {users
                  .filter((user) => user.role === "renter")
                  .map((user) => (
                    <tr key={user._id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.status}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </section>
        )}
      </main>
    </div>
  );
}
export default App;
