// App.jsx

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import your Login page
import Login from "./components/login";

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route */}
        <Route path="/" element={<Login />} />

        {/* Optional: separate login route */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;