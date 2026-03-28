// App.jsx

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
// Import your Login page
import LandingPage from "./pages/LandingPage";
import HeroPage from "./components/heropage";
import AuthRouter from "./components/authrouter";
import Dashboard from "./components/dashboard"; 
function App() {
  return (
    <Router>
      <Routes>
        {/* Default route */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthRouter />} />
        {/* Optional: separate login route */}
          <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;