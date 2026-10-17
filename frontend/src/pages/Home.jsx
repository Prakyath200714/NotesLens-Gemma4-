import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import ImageUpload from '../components/ImageUpload';
import { uploadImage } from '../services/api';
import '../styles/Home.css';

export default function Home({ onAnalysisComplete }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleImageSelect = (file) => {
    setSelectedFile(file);
    setError(null);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsLoading(true);
    setError(null);

    try {
      const result = await uploadImage(selectedFile);
      if (result.success) {
        onAnalysisComplete(result);
      } else {
        setError(result.error || 'Failed to analyze image');
      }
    } catch (err) {
      console.error('Upload error:', err);
      setError(err.error || err.detail || 'Failed to upload image. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="home-page">
      <Navbar />
      <main className="home-main">
        <section className="hero">
          <h2>Upload Your Study Notes</h2>
          <p>Take a photo of your handwritten or printed notes and get AI-powered study material</p>
        </section>

        <ImageUpload
          onImageSelect={handleImageSelect}
          onUpload={handleUpload}
          isLoading={isLoading}
        />

        {error && (
          <div className="error-alert">
            <strong>Error:</strong> {error}
          </div>
        )}

        {isLoading && (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Analyzing your notes with AI...</p>
          </div>
        )}
      </main>
    </div>
  );
}
