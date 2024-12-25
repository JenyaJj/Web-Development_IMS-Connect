import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Notification from "./Notification"; 
import "./IdeaList.css";

const IdeaList = () => {
  const navigate = useNavigate();
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const [notification, setNotification] = useState("");
  const [ideas, setIdeas] = useState([]);

  useEffect(() => {
    fetch("https://ims-connect-server-app.vercel.app/ideas")
      .then((res) => res.json())
      .then((data) => setIdeas(data))
      .catch((err) => console.error("Error fetching ideas:", err));
  }, []);

  const handleVote = (id) => {
    const updatedIdeas = ideas.map((idea) =>
      idea.id === id ? { ...idea, votes: idea.votes + 1 } : idea
    );
    setIdeas(updatedIdeas);
    setNotification("Voted successfully!");
    setTimeout(() => setNotification(""), 3000);
  };

  const handleAction = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(""), 3000);
  };

  const handleSubmitIdea = () => {
    navigate("/submit-idea");
  };

  const { role } = loggedInUser;

  switch (role) {
    case "User":
      return (
        <div className="idea-list-page">
          <Notification message={notification} />
          <h1>Submitted Ideas</h1>
          <div className="idea-list-actions">
            <button onClick={handleSubmitIdea}>Submit New Idea</button>
          </div>
          <div className="idea-list">
            {ideas.map((idea) => (
              <div key={idea.id} className="idea-card">
                <h3>{idea.title}</h3>
                <p>Votes: {idea.votes}</p>
                <div className="idea-card-buttons">
                  <button onClick={() => handleAction("Feature in development, please try again later")}>View</button>
                  <button onClick={() => handleVote(idea.id)}>Vote</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    case "Manager":
      return (
        <div className="idea-list-page">
          <Notification message={notification} />
          <h1>Submitted Ideas</h1>
          <div className="idea-list-actions">
            <button onClick={() => handleAction("AI successfully launched")}>Run AI</button>
          </div>
          <div className="idea-list">
            {ideas.map((idea) => (
              <div key={idea.id} className="idea-card">
                <h3>{idea.title}</h3>
                <p>Votes: {idea.votes}</p>
                <div className="idea-card-buttons">
                  <button onClick={() => handleAction("Feature in development, please try again later")}>View</button>
                  <button onClick={() => handleAction("Idea successfully marked")}>Mark as Priority</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
  }
};

export default IdeaList;
