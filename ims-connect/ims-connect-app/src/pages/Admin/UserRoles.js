import React, { useState } from "react"; 
import Notification from "../Notification"; 
import "./UserRoles.css";

const UserRoles = () => {
  const [notification, setNotification] = useState(""); 

  const handleAction = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(""), 3000); 
  };

  return (
    <div className="userroles-page">
      {notification && <Notification message={notification} />} {/* Показываем уведомление, если оно есть */}
      <h1>User Role Settings</h1>
      <div className="userroles-card">
        <button onClick={() => handleAction("Feature in development, please try again later")}>
          Manage User Roles
        </button>
        <button onClick={() => handleAction("Feature in development, please try again later")}>
          Create New User Role
        </button>
      </div>
    </div>
  );
};

export default UserRoles;
