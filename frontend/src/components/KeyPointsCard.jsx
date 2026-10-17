import React from 'react';
import '../styles/ResultCard.css';

export default function KeyPointsCard({ content }) {
  return (
    <div className="result-card">
      <h2>⭐ Important Points</h2>
      <div className="result-content">
        {content ? (
          <div style={{ whiteSpace: 'pre-wrap' }}>
            {content}
          </div>
        ) : (
          'No important points available'
        )}
      </div>
    </div>
  );
}
