import React, { useState } from 'react';
import '../styles/ImageUpload.css';

export default function ImageUpload({ onImageSelect, onUpload, isLoading }) {
  const [preview, setPreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
        setError('Please upload a JPEG, PNG, or WebP image');
        setPreview(null);
        setSelectedFile(null);
        return;
      }

      // Validate file size (10 MB)
      if (file.size > 10 * 1024 * 1024) {
        setError('File is too large. Maximum size is 10 MB');
        setPreview(null);
        setSelectedFile(null);
        return;
      }

      setError(null);
      setSelectedFile(file);
      onImageSelect(file);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.classList.add('dragover');
  };

  const handleDragLeave = (e) => {
    e.currentTarget.classList.remove('dragover');
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove('dragover');
    const file = e.dataTransfer.files[0];
    if (file) {
      const input = document.querySelector('input[type="file"]');
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      input.files = dataTransfer.files;
      handleFileChange({ target: input });
    }
  };

  return (
    <div className="upload-container">
      <div
        className="upload-area"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          id="file-input"
          accept="image/*"
          onChange={handleFileChange}
          disabled={isLoading}
        />
        <label htmlFor="file-input" className="upload-label">
          <div className="upload-icon">📷</div>
          <p>Drag and drop your notes image here</p>
          <p className="upload-hint">or click to select a file</p>
          <p className="upload-formats">Supported: JPEG, PNG, WebP (Max 10 MB)</p>
        </label>
      </div>

      {preview && (
        <div className="preview-container">
          <h3>Preview</h3>
          <img src={preview} alt="Preview" className="preview-image" />
        </div>
      )}

      {error && (
        <div className="error-message">
          ❌ {error}
        </div>
      )}

      <button
        className="generate-btn"
        onClick={onUpload}
        disabled={!selectedFile || isLoading}
      >
        {isLoading ? 'Analyzing...' : 'Generate Study Material'}
      </button>
    </div>
  );
}
