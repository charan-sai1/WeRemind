import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SignIn from './pages/signIn';
import MainPage from './pages/MainPage';
import Dashboard from './pages/Dashboard'; // Ensure you have a Dashboard component

function App() {
  const [isVerified, setIsVerified] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/signin" element={<SignIn setIsVerified={setIsVerified} />} />
        <Route path="/dashboard" element={isVerified ? <Dashboard /> : <Navigate to="/signin" />} />
        {/* ...other routes... */}
      </Routes>
    </Router>
  );
}

export default App;
