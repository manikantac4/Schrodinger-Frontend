// App.jsx

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import your Login page

import HeroPage from "./components/heropage";
import AuthRouter from "./components/authrouter";

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route */}
        <Route path="/" element={<HeroPage />} />
        <Route path="/auth" element={<AuthRouter />} />
        {/* Optional: separate login route */}
       
      </Routes>
    </Router>
  );
}

export default App;