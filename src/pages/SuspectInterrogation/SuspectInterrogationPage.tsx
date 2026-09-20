import React, { useState } from 'react';
import { useInvestigation } from '../../state/InvestigationContext';
import { AlertCircle, Sparkles, CheckCircle2 } from 'lucide-react';
import './SuspectInterrogationPage.css';

export const SuspectInterrogationPage: React.FC = () => {
  const { state, dispatch, suspectsList } = useInvestigation();
  const suspect = suspectsList.find(s => s.id === state.selectedSuspectId) || suspectsList[0];

  const unlockedTopics = state.unlockedTopicIds[suspect.id] || ['topic-alibi'];
  const [activeTopicId, setActiveTopicId] = useState<string>(unlockedTopics[0] || 'topic-alibi');

  const activeTopic = suspect.interrogationTopics.find(t => t.id === activeTopicId) || suspect.interrogationTopics[0];

  const handleAskQuestion = (topicId: string) => {
    setActiveTopicId(topicId);
    dispatch({
      type: 'QUESTION_SUSPECT',
      payload: { suspectId: suspect.id, topicId }
    });

    const topic = suspect.interrogationTopics.find(t => t.id === topicId);
    if (topic?.unlocksEvidenceId) {
      dispatch({ type: 'DISCOVER_EVIDENCE', payload: topic.unlocksEvidenceId });
    }
  };

  return (
    <div className="interrogation-container animate-fade-in">
      <div className="interrogation-header">
        <div className="header-info">
          <span className="label-stamp label-stamp-red font-mono">FORMAL INTERROGATION ROOM</span>
          <h2 className="interrogation-title">{suspect.name.toUpperCase()}</h2>
          <span className="interrogation-role font-mono">{suspect.role}</span>
        </div>

        <div className="interrogation-stats font-mono">
          TOPICS QUESTIONED: <strong>{unlockedTopics.length} / {suspect.interrogationTopics.length}</strong>
        </div>
      </div>

      <div className="interrogation-layout">
        {/* Question Topic List */}
        <aside className="topics-sidebar">
          <div className="sidebar-title font-mono">SELECT QUESTIONING LINE</div>
          <div className="topics-list">
            {suspect.interrogationTopics.map(topic => {
              const asked = unlockedTopics.includes(topic.id);
              return (
                <button
                  key={topic.id}
                  className={`topic-btn ${activeTopicId === topic.id ? 'active' : ''}`}
                  onClick={() => handleAskQuestion(topic.id)}
                >
                  <div className="topic-btn-top font-mono">
                    <span>{topic.title}</span>
                    {asked && <CheckCircle2 size={14} className="text-green" />}
                  </div>
                  <div className="topic-prompt-preview">{topic.prompt}</div>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Dialogue Box */}
        <main className="dialogue-panel">
          <div className="transcript-card">
            {/* Detective Prompt */}
            <div className="speech-bubble bubble-detective">
              <div className="speaker-tag font-mono">DETECTIVE DIRECTIVE:</div>
              <div className="speech-text">{activeTopic.prompt}</div>
            </div>

            {/* Suspect Response */}
            <div className="speech-bubble bubble-suspect">
              <div className="speaker-tag font-mono">{suspect.name.toUpperCase()} STATEMENT:</div>
              <div className="speech-text font-mono">{activeTopic.response}</div>
              {activeTopic.revealsTruth && (
                <div className="truth-badge font-mono animate-pulse-glow">
                  <Sparkles size={14} /> DEDUCTIVE BREAKTHROUGH: SUSPECT REVEALED KEY FACT
                </div>
              )}
            </div>

            {activeTopic.unlocksEvidenceId && (
              <div className="clue-unlocked-banner font-mono">
                <AlertCircle size={16} /> NEW CLUE ADDED TO EVIDENCE BOARD: {activeTopic.unlocksEvidenceId}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};
