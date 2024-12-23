import React, { useEffect, useState } from "react";
import axios from "axios";
import Notification from "./Notification"; 
import "./UserProfile.css";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    contact: "",
  });
  const [notification, setNotification] = useState(""); 
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser) {
      setUser(loggedInUser);
      setFormData({
        email: loggedInUser.email,
        contact: loggedInUser.contact,
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const response = await axios.put("http://localhost:5000/update-user", {
        id: user.id,
        email: formData.email,
        contact: formData.contact,
      });

      setNotification("Profile updated successfully!"); 
      setTimeout(() => setNotification(""), 3000); 

      const updatedUser = { ...user, ...formData };
      setUser(updatedUser);
      localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating user:", error);
      setNotification("Failed to update profile. Please try again later."); 
      setTimeout(() => setNotification(""), 3000); 
    }
  };

  const handleExit = () => {
    setFormData({
      email: user.email,
      contact: user.contact,
    });
    setIsEditing(false);
  };

  if (!user) {
    return (
      <div className="user-profile-page">
        <h1>User Profile</h1>
        <p>Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="user-profile-page">
      <Notification message={notification} />
      <h1>User Profile</h1>
      <div className="user-card">
        <h2>{user.name}</h2>
        <p>Role: {user.role}</p>
        <p>Date of birth: {user.dob}</p>
        {isEditing ? (
          <>
            <p>
              Email:{" "}
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </p>
            <p>
              Contact:{" "}
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
              />
            </p>
            <div className="profile-button-container">
              <button className="profile-button" onClick={handleSave}>
                Save
              </button>
              <button className="profile-button" onClick={handleExit}>
                Exit
              </button>
            </div>
          </>
        ) : (
          <>
            <p>Email: {user.email}</p>
            <p>Contact: {user.contact}</p>
            <div className="profile-button-container">
              <button className="profile-button" onClick={handleEdit}>
                Edit
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
