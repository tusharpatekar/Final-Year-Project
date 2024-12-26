import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Signup from './components/Signup';
import PlantDisease from './components/PlantDisease';
import Result from './components/Result';
import Home from './components/Home';

const App = () => {
  const [detectionResult, setDetectionResult] = useState('');

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('/agri-bg.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <Router>
        <Navbar />
        <div className="container mx-auto pt-8 bg-agriculture-background"
        >
          <Routes>
          <Route path="/home" element={<Home/>} />
            <Route path="/" element={<Login/>} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/plantdisease"
              element={<PlantDisease setResult={setDetectionResult} />}
            />
            <Route path="/result" element={<Result result={detectionResult} />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;
