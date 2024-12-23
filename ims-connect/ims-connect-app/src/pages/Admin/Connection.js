import React, { useState } from "react"; 
import Notification from "../Notification";
import "./Connection.css";

const Connection = () => {
  const [notification, setNotification] = useState(""); 
  const [offices] = useState([ 
    { id: 1, officeid: 1443253, region: "East Africa" },
    { id: 2, officeid: 3525333, region: "West Africa" },
    { id: 3, officeid: 4032883, region: "South America" },
  ]);

  const handleAction = (message) => {
    setNotification(message); 
    setTimeout(() => setNotification(""), 3000); // Очищаем сообщение через 3 секунды
  };

  return (
    <div className="connection-page">
      {notification && <Notification message={notification} />} {/* Показываем уведомление, если оно есть */}
      <h1>Manage Connection Issues</h1>
      <ul className="connection-cards">
        {offices.map((office) => (
          <li key={office.id} className="connection-card">
            <h3>Office ID: {office.officeid}</h3>
            <p>{office.region}</p>
            <button onClick={() => handleAction("Feature in development, please try again later")}>
              Review
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Connection;
