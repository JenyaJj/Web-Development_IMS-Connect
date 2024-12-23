import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./CollaborationWorkspace.css";

const CollaborationWorkspace = () => {
  const { workspaceId } = useParams(); 
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);

  const workspaces = [
    { id: 1, name: "Sustainability Project", members: 8 },
    { id: 2, name: "Energy Innovation", members: 12 },
    { id: 3, name: "Circular Economy", members: 5 },
  ];

  const workspace = workspaces.find((ws) => ws.id === parseInt(workspaceId));

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages([...messages, { text: message, sender: "you" }]);
      setMessage("");
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = () => {
    if (file) {
      alert(`File "${file.name}" uploaded successfully!`);
      setFile(null);
    } else {
      alert("Please select a file to upload.");
    }
  };

  return (
    <div className="workspace-page">
      {workspace ? (
        <>
          <h1>{workspace.name}</h1>
          <p>{workspace.members} Members</p>

          <div className="workspace-chat">
            <h2>Workspace Chat</h2>
            <div className="chat-box">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`chat-message ${
                    msg.sender === "you" ? "chat-message-you" : "chat-message-other"
                  }`}
                >
                  {msg.sender === "you" ? "You: " : "Other: "}
                  {msg.text}
                </div>
              ))}
            </div>
            <div className="chat-input">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
              />
              <button onClick={handleSendMessage}>Send</button>
            </div>

            <div className="file-upload">
              <h3>Upload File</h3>
              <input type="file" name="attachment" onChange={handleFileChange} />
              {file && <p>File chosen: {file.name}</p>}
              <button onClick={handleFileUpload}>Upload</button>
            </div>
          </div>
        </>
      ) : (
        <p>Workspace not found.</p>
      )}
    </div>
  );
};

export default CollaborationWorkspace;
