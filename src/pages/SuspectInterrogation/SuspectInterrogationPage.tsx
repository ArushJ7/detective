import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useInvestigation } from '../../state/InvestigationContext';
import type { Suspect, InterrogationTopic } from '../../state/types';
import { sfx } from '../../utils/audio';
import { TypewriterText } from '../../components/ui/TypewriterText';
import {
  Activity,
  CheckCircle2,
  FolderOpen,
  History,
  Gavel,
  Brain,
  Info,
  Sparkles
} from 'lucide-react';
import './SuspectInterrogationPage.css';

export const SuspectInterrogationPage: React.FC = () => {
  const { state, dispatch, suspectsList, discoveredEvidence, contradictionsList } = useInvestigation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const urlSuspectId = searchParams.get('suspect');
  const selectedSuspectId = urlSuspectId || state.selectedSuspectId || suspectsList[0]?.id || 'dr-evelyn-reed';

  const suspect: Suspect =
    suspectsList.find(s => s.id === selectedSuspectId) || suspectsList[0];

  const unlockedTopics = state.unlockedTopicIds[suspect.id] || [suspect.interrogationTopics[0]?.id || 'topic-alibi'];
  const [activeTopicId, setActiveTopicId] = useState<string>(
    unlockedTopics[0] || suspect.interrogationTopics[0]?.id || 'topic-alibi'
  );
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const activeTopic: InterrogationTopic =
    suspect.interrogationTopics.find(t => t.id === activeTopicId) ||
    suspect.interrogationTopics[0];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3200);
  };

  // Handle asking an interrogation question topic
  const handleSelectTopic = (topic: InterrogationTopic) => {
    sfx.playClick();
    setActiveTopicId(topic.id);

    dispatch({
      type: 'QUESTION_SUSPECT',
      payload: { suspectId: suspect.id, topicId: topic.id }
    });

    if (topic.unlocksEvidenceId) {
      dispatch({ type: 'DISCOVER_EVIDENCE', payload: topic.unlocksEvidenceId });
      showToast(`NEW EVIDENCE UNLOCKED: ${topic.unlocksEvidenceId}`);
    }

    if (topic.contradictionDiscoveredId) {
      dispatch({ type: 'DISCOVER_CONTRADICTION', payload: topic.contradictionDiscoveredId });
      const contradiction = contradictionsList.find(c => c.id === topic.contradictionDiscoveredId);
      if (contradiction) {
        showToast(`STATEMENT INCONSISTENCY DETECTED: ${contradiction.title}`);
      }
    }
  };

  // Handle confronting suspect with evidence from fast dock
  const handleConfrontWithEvidence = (evidenceId: string) => {
    const matchingContradiction = contradictionsList.find(
      c => c.suspectId === suspect.id && c.contradictingEvidenceId === evidenceId
    );

    if (matchingContradiction) {
      dispatch({ type: 'DISCOVER_CONTRADICTION', payload: matchingContradiction.id });
      showToast(`CONFRONTATION SUCCESS: ${matchingContradiction.title}`);
      dispatch({
        type: 'SET_OBJECTIVE',
        payload: `Confrontation confirmed. Compare ${evidenceId} against ${suspect.name}'s statement on event timeline.`
      });
    } else {
      showToast(`${suspect.name} denies any knowledge of ${evidenceId}.`);
    }
  };

  // Desk ready evidence items
  const deskEvidenceItems = discoveredEvidence.filter(e =>
    suspect.linkedEvidenceIds.includes(e.id) || e.id === 'EVD-001' || e.id === 'EVD-004' || e.id === 'EVD-009'
  );

  return (
    <div className="interrogation-page-container font-body animate-fade-in">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="interrogation-toast font-mono">
          <Info size={16} className="text-gold" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Dossier Meta Sub-Bar */}
      <div className="interrogation-subbar font-mono">
        <div className="subbar-left">
          <span className="subbar-badge">INTERROGATION TRANSCRIPT // SESSION #04</span>
          <span className="subbar-ref">RECORDED: 23:42 HRS · BLACKWOOD ESTATE LIBRARY ANTECHAMBER</span>
        </div>
        <div className="subbar-right">
          <div className="pulse-group">
            <span className="live-dot animate-ping"></span>
            <span className="live-text text-secondary">LIVE TRANSCRIPTION ACTIVE</span>
          </div>
          <span className="reel-tag">TAPE REEL 03-B</span>
        </div>
      </div>

      {/* Primary Interrogation Layout Stage */}
      <div className="interrogation-stage-grid">
        {/* LEFT & CENTER: Cinematic Subject Framing & Psycho-Physiological Metrics */}
        <div className="cinematic-framing-column">
          {/* Main Cinematic Viewport Box */}
          <div className="cinematic-viewport-box">
            <img
              src={suspect.imagePath || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400'}
              alt={suspect.name}
              className="cinematic-portrait-img"
            />

            {/* Noir Vignette Layer */}
            <div className="vignette-overlay"></div>

            {/* Archival Overlays */}
            <div className="archival-frame-labels font-mono">
              <span className="subject-name-tag text-gold">SUBJECT: {suspect.name.toUpperCase()}</span>
              <span className="subject-meta-tag">AGE: {suspect.age || '42'} · {suspect.role}</span>
            </div>

            <div className="primary-suspect-stamp font-mono">
              PRIMARY SUSPECT
            </div>

            {/* Live Stress & Pulse Meter */}
            <div className="stress-meter-dock font-mono">
              <div className="meter-header">
                <div className="meter-label">
                  <Activity size={16} className="text-secondary" />
                  <span className="text-secondary font-bold">COMPOSURE: {suspect.composureStatus}</span>
                </div>
                <span className="pulse-rate">PULSE: {suspect.pulseBpm} BPM</span>
              </div>

              {/* GSR Sparkline Graph */}
              <div className="gsr-sparkline-box">
                <svg className="sparkline-svg" viewBox="0 0 500 40" preserveAspectRatio="none">
                  <path
                    d="M0,20 L60,20 L75,8 L85,32 L95,15 L105,24 L115,20 L220,20 L230,4 L240,36 L250,12 L260,28 L275,20 L350,20 L365,2 L378,38 L390,14 L400,20 L500,20"
                    stroke="#ffb3b5"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
                <div className="scanline-beam animate-pulse"></div>
              </div>

              {/* Behavioral Forensics Cue */}
              <div className="behavioral-cue-box">
                <Brain size={14} className="text-gold shrink-0 mt-0.5" />
                <span className="cue-text text-gold">[BEHAVIORAL CUE: {suspect.behavioralCue}]</span>
              </div>
            </div>
          </div>

          {/* Dialogue Transcript Speech Box */}
          <div className="speech-transcript-box font-mono">
            <div className="transcript-header">
              <span className="text-tertiary">AUDIO TRANSLATION // MIC ARRAY #1</span>
              <span className="text-tertiary">ROOM TONE: 42dB · HEAVY RAINFALL</span>
            </div>

            <div className="speaker-block">
              <div className="speaker-title font-bold">
                <span className="text-gold">{suspect.name.toUpperCase()}:</span>
                <span className="speaker-state text-tertiary">[VOICE STRAINED, AGITATED]</span>
              </div>
              <blockquote className="speaker-quote font-headline">
                "<TypewriterText text={activeTopic.response} speed={25} />"
              </blockquote>
            </div>

            {activeTopic.unlocksEvidenceId && (
              <div className="unlocked-clue-alert font-mono">
                <Sparkles size={14} className="text-gold" />
                <span>UNLOCKED CLUE: {activeTopic.unlocksEvidenceId}</span>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT: Cross-Examination Tactics & Fast Dock */}
        <div className="tactics-column font-mono">
          {/* Docket Header */}
          <div className="tactics-header-card">
            <div>
              <span className="tactics-subtitle text-gold">CROSS-EXAMINATION TACTICS</span>
              <h2 className="tactics-title font-headline">Press the Inconsistency</h2>
            </div>
            <div className="suspicion-stat-box">
              <span className="lbl text-tertiary">SUSPECT SUSPICION</span>
              <span className={`val ${suspect.suspicionLevel === 'High' ? 'text-red' : 'text-gold'}`}>
                {suspect.suspicionLevel.toUpperCase()}
              </span>
            </div>
          </div>

          {/* Interactive Dialogue Topic Choice Slate */}
          <div className="dialogue-choice-slate">
            {suspect.interrogationTopics.map((topic, idx) => {
              const isAsked = unlockedTopics.includes(topic.id);
              const isActive = activeTopicId === topic.id;

              return (
                <button
                  key={topic.id}
                  className={`choice-button ${isActive ? 'active' : ''}`}
                  onClick={() => handleSelectTopic(topic)}
                >
                  <span className="choice-number">[{idx + 1}]</span>
                  <div className="choice-details">
                    <div className="choice-category-row">
                      <span className="choice-cat text-tertiary">
                        {topic.category ? topic.category.toUpperCase() : 'QUESTION'}
                      </span>
                      {isAsked && <CheckCircle2 size={12} className="text-gold" />}
                    </div>
                    <p className="choice-prompt font-headline">{topic.prompt}</p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Present Clue Fast-Dock */}
          <div className="exhibits-fastdock-box">
            <div className="fastdock-header">
              <span className="text-tertiary">PINNED PHYSICAL EXHIBITS ON DESK</span>
              <span className="text-gold">{deskEvidenceItems.length} READY TO CONFRONT</span>
            </div>

            <div className="fastdock-grid">
              {deskEvidenceItems.slice(0, 3).map(item => (
                <div
                  key={item.id}
                  className="fastdock-item-card"
                  onClick={() => handleConfrontWithEvidence(item.id)}
                  title={`Confront ${suspect.name} with ${item.title}`}
                >
                  <div className="fastdock-img-box">
                    <img
                      src={item.imagePath || 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=400'}
                      alt={item.title}
                      className="fastdock-img"
                    />
                    <span className="fastdock-tag">{item.id}</span>
                  </div>
                  <span className="fastdock-item-name">{item.title}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Action Commands Footer */}
          <div className="tactics-actions-footer">
            <button
              className="btn-quick-action"
              onClick={() => navigate('/vault')}
            >
              <FolderOpen size={14} className="text-gold" />
              <span>EVIDENCE POUCH</span>
            </button>
            <button
              className="btn-quick-action"
              onClick={() => navigate('/chronology')}
            >
              <History size={14} className="text-gold" />
              <span>EVENT TIMELINE</span>
            </button>
            <button
              className="btn-quick-action btn-confront"
              onClick={() => {
                showToast(`Formal confrontation logged for ${suspect.name}.`);
                dispatch({ type: 'SET_OBJECTIVE', payload: 'Formulate final accusation against suspect in Final Deduction.' });
              }}
            >
              <Gavel size={14} />
              <span>CONFRONT</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
