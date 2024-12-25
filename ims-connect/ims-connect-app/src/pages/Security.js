import React, { useState } from "react"; 
import Notification from "./Notification"; 
import "./Security.css";

const Security = () => {
  const [notification, setNotification] = useState(""); 

  const handleAction = (message) => {
    setNotification(message); 
    setTimeout(() => setNotification(""), 3000); 
  };

  return (
    <div className="security-page">
      {notification && <Notification message={notification} />} {/* Показываем уведомление, если оно есть */}
      <h1>Security</h1>
      <div className="security-card">
        <button onClick={() => handleAction("Feature in development, please try again later")}>
          Security Logs
        </button>
        <button onClick={() => handleAction("Feature in development, please try again later")}>
          Security Alerts
        </button>
      </div>
    </div>
  );
};

export default Security;
