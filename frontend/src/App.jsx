import React, { useState } from 'react';
import Home from './pages/Home';
import Results from './pages/Results';
import './App.css';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [analysisData, setAnalysisData] = useState(null);

  const handleAnalysisComplete = (data) => {
    setAnalysisData(data);
    setCurrentPage('results');
  };

  const handleBackHome = () => {
    setCurrentPage('home');
    setAnalysisData(null);
  };

  return (
    <div className="app">
      {currentPage === 'home' ? (
        <Home onAnalysisComplete={handleAnalysisComplete} />
      ) : (
        <Results analysisData={analysisData} onBackHome={handleBackHome} />
      )}
    </div>
  );
}