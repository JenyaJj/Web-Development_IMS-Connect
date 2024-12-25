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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", idea.title);
    formData.append("description", idea.description);
    formData.append("attachment", idea.attachment);

    try {
      const response = await fetch("https://ims-connect-server.onrender.com/ideas", {
        method: "POST",
        body: JSON.stringify({
          title: idea.title,
          description: idea.description,
          attachment: idea.attachment ? idea.attachment.name : null,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setMessage("Submitted successfully!");
        setIdea({ title: "", description: "", attachment: null });
      } else {
        setMessage("Error submitting idea");
      }
    } catch (error) {
      setMessage("Error submitting idea");
    }

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
