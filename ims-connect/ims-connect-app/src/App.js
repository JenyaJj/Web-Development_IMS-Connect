import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"; // Navbar for navigation
import UserProfile from "./pages/UserProfile";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import SubmitIdea from "./pages/SubmitIdea";
import Workspaces from "./pages/Workspaces";
import IdeaList from "./pages/IdeaList";
import Security from "./pages/Security";
import UserRoles from "./pages/UserRoles";
import Connection from "./pages/Connection";
import CollaborationWorkspace from "./pages/CollaborationWorkspace";

function App() {
  return (
    <Router>
      <Navbar /> {/* Display Navbar for navigation */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/submit-idea" element={<SubmitIdea />} />
        <Route path="/workspaces" element={<Workspaces />} />
        <Route path="/ideas" element={<IdeaList />} />
<Route path="/collaboration/:workspaceId" element={<CollaborationWorkspace />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/security" element={<Security />} />
        <Route path="/connection" element={<Connection />} />
        <Route path="/userroles" element={<UserRoles />} />
      </Routes>
    </Router>
  );
}

export default App;
