import React from 'react';
import '../styles/ResultCard.css';

export default function ExplanationCard({ content }) {
  return (
    <div className="result-card">
      <h2>📖 Explanation</h2>
      <div className="result-content">
        {content || 'No explanation available'}
      </div>
    </div>
  );
}
