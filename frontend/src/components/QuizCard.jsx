import React from 'react';
import '../styles/ResultCard.css';

export default function QuizCard({ content }) {
  return (
    <div className="result-card">
      <h2>❓ Practice Questions</h2>
      <div className="result-content">
        {content ? (
          <div style={{ whiteSpace: 'pre-wrap' }}>
            {content}
          </div>
        ) : (
          'No questions available'
        )}
      </div>
    </div>
  );
}
