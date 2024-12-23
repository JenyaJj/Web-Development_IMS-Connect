import React, { useState } from "react"; 
import { useNavigate } from "react-router-dom"; 
import Notification from "./Notification"; 
import "./Workspaces.css";

const Workspaces = () => {
  const [notification, setNotification] = useState(""); 
  const navigate = useNavigate();
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")) || {}; 
  const workspaces = [
    { id: 1, name: "Sustainability Project", members: 8 },
    { id: 2, name: "Energy Innovation", members: 12 },
    { id: 3, name: "Circular Economy", members: 5 },
  ];

  const handleAction = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(""), 3000);
  };

  const handleJoinWorkspace = (workspaceId) => {
    navigate(`/collaboration/${workspaceId}`); 
  };

  const { role } = loggedInUser; 
  return (
    <div className="workspaces-page">
      {notification && <Notification message={notification} />} {/* Показываем уведомление, если есть */}
      <h1>Cross Regional Collaborative Workspaces</h1>
      <div className="workspace-list">
        {workspaces.map((workspace) => (
          <div key={workspace.id} className="workspace-card">
            <h3>{workspace.name}</h3>
            <p>{workspace.members} Members</p>
            {role === "User" && (
              <button onClick={() => handleJoinWorkspace(workspace.id)}>Join Workspace</button>
            )}
            {role === "Manager" && (
              <button onClick={() => handleAction("Feature in development, please try again later")}>
                Manage Workspace
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Workspaces;
