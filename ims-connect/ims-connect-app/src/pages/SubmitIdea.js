import React, { useState } from "react";
import Notification from "./Notification"; 
import "./SubmitIdea.css";

const SubmitIdea = () => {
  const [idea, setIdea] = useState({ title: "", description: "", attachment: null });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIdea({ ...idea, [name]: value });
  };

  const handleFileChange = (e) => {
    setIdea({ ...idea, attachment: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting idea", idea);
    setMessage("Submitted successfully!");
    setIdea({ title: "", description: "", attachment: null });
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="submit-idea-page">
      <Notification message={message} />
      <h1>Submit New Idea</h1>
      <form onSubmit={handleSubmit} className="submit-idea-form">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={idea.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={idea.description}
          onChange={handleChange}
          required
        />
        <input
          type="file"
          name="attachment"
          onChange={handleFileChange}
        />
        <button type="submit">Submit Idea</button>
      </form>
    </div>
  );
};

export default SubmitIdea;
