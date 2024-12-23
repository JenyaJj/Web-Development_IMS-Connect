import React from "react";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-page">
      <div className="image-section"></div>
      <div className="content-section">
        <h1>GreenFuture</h1>
        <p>
          GreenFuture is a global leader in sustainability. With 2,500 employees across 20 offices, we are committed to driving innovation for a greener, brighter future.
        </p>
        <div className="dashboard-cards">
          <div className="card">
            <h2>About Us</h2>
            <p>
              Our mission is to pioneer eco-friendly solutions in renewable energy, urban development, and environmental policy.
            </p>
          </div>
          <div className="card">
            <h2>Our Vision</h2>
            <p>
              We strive to build a sustainable future through global collaboration, cutting-edge technology, and innovative ideas.
            </p>
          </div>
          <div className="card">
            <h2>Technological Edge</h2>
            <p>
              Leveraging AI and green tech, we tackle the world’s toughest environmental challenges.
            </p>
          </div>
          <div className="card">
            <h2>Employee Spotlight</h2>
            <p>
              Meet the people driving change at GreenFuture. Our global team is at the forefront of sustainability innovation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
