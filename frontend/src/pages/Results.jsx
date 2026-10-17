import React from 'react';
import Navbar from '../components/Navbar';
import ExplanationCard from '../components/ExplanationCard';
import SummaryCard from '../components/SummaryCard';
import KeyPointsCard from '../components/KeyPointsCard';
import QuizCard from '../components/QuizCard';
import '../styles/Results.css';

export default function Results({ analysisData, onBackHome }) {
  const parseAnalysis = (text) => {
    const sections = {
      explanation: '',
      summary: '',
      important: '',
      quiz: ''
    };

    if (!text) return sections;

    const explanationMatch = text.match(/(?:Explanation|📖.*?)\s*\n(.*?)(?=\n\n(?:Summary|✍️)|\n\n(?:Important|⭐)|$)/is);
    const summaryMatch = text.match(/(?:Summary|✍️.*?)\s*\n(.*?)(?=\n\n(?:Important|⭐)|\n\n(?:Practice|❓)|$)/is);
    const importantMatch = text.match(/(?:Important Points|⭐.*?)\s*\n(.*?)(?=\n\n(?:Practice|❓)|$)/is);
    const quizMatch = text.match(/(?:Practice Questions|❓.*?)\s*\n(.*?)$/is);

    sections.explanation = explanationMatch ? explanationMatch[1].trim() : text;
    sections.summary = summaryMatch ? summaryMatch[1].trim() : '';
    sections.important = importantMatch ? importantMatch[1].trim() : '';
    sections.quiz = quizMatch ? quizMatch[1].trim() : '';

    return sections;
  };

  const sections = parseAnalysis(analysisData?.analysis);

  return (
    <div className="results-page">
      <Navbar />
      <main className="results-main">
        <div className="results-header">
          <h2>Study Material Generated</h2>
          <button className="back-btn" onClick={onBackHome}>
            ← Upload Another Image
          </button>
        </div>

        <div className="results-grid">
          <ExplanationCard content={sections.explanation} />
          <SummaryCard content={sections.summary} />
          <KeyPointsCard content={sections.important} />
          <QuizCard content={sections.quiz} />
        </div>

        <div className="results-footer">
          <p>Generated using {analysisData?.model || 'Gemma 4'}</p>
        </div>
      </main>
    </div>
  );
}
