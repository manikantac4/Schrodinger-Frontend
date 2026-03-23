// App.jsx

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import your Login page
import Login from "./components/login";
import HeroPage from "./components/hero/heropage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route */}
        <Route path="/" element={<HeroPage />} />

        {/* Optional: separate login route */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;