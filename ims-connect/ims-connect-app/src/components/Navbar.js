import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("loggedInUser"); // Clear user data
    navigate("/"); // Redirect to homepage after logout
  };

  // Function to render links based on user role
  const renderLinksByRole = () => {
    if (!loggedInUser) {
      // Unlogged users
      return (
        <>
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </>
      );
    }

    // Logged-in users
    const { role } = loggedInUser;

    switch (role) {
      case "Admin":
        return (
          <>
            <Link to="/">Home</Link>
            <Link to="/security">Security</Link>
            <Link to="/userroles">User Roles</Link>
            <Link to="/connection">Connection</Link>
            <Link to="/profile">Profile</Link>
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </>
        );
      case "Manager":
        return (
          <>
            <Link to="/">Home</Link>
            <Link to="/workspaces">Workspaces</Link>
            <Link to="/ideas">Ideas</Link>
            <Link to="/profile">Profile</Link>
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </>
        );
      case "User":
        return (
          <>
            <Link to="/">Home</Link>
            <Link to="/workspaces">Workspaces</Link>
            <Link to="/ideas">Ideas</Link>
            <Link to="/profile">Profile</Link>
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <nav className="navbar">
      <h1 onClick={() => navigate("/")}>IMS-Connect</h1>
      <div className="nav-links">{renderLinksByRole()}</div>
    </nav>
  );
};

export default Navbar;
