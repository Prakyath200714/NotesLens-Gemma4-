import React from 'react';
import '../styles/ResultCard.css';

export default function SummaryCard({ content }) {
  return (
    <div className="result-card">
      <h2>✍️ Summary</h2>
      <div className="result-content">
        {content || 'No summary available'}
      </div>
    </div>
  );
}
