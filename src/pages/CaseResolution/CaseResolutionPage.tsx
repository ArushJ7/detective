import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInvestigation } from '../../state/InvestigationContext';
import { sfx } from '../../utils/audio';
import { TypewriterText } from '../../components/ui/TypewriterText';
import { ShieldCheck, AlertCircle, FileSearch, ExternalLink, RefreshCw, Layout, BookOpen, Clock, Users } from 'lucide-react';
import './CaseResolutionPage.css';

export const CaseResolutionPage: React.FC = () => {
  const navigate = useNavigate();
  const { state, dispatch, activeCase, evidenceList, timelineEvents } = useInvestigation();

  const { deductionSubmitted, deductionResult, deductionDraft } = state;

  useEffect(() => {
    if (deductionSubmitted && deductionResult) {
      sfx.playStamp();
    }
  }, [deductionSubmitted, deductionResult]);

  if (!deductionSubmitted || !deductionResult) {
    return (
      <div className="resolution-empty-page">
        <div className="empty-box">
          <AlertCircle size={40} className="empty-icon" />
          <h2>NO SUBMITTED ACCUSATION DOSSIER</h2>
          <p>You have not yet submitted a formal deduction for {activeCase.metadata.caseNumber}: {activeCase.metadata.title}.</p>
          <button className="btn-navigate-deduction" onClick={() => navigate('/deduction')}>
            GO TO FINAL ACCUSATION DOSSIER
          </button>
        </div>
      </div>
    );
  }

  const { resolutionState, culprit, method, motive, evidenceChain, timelineReconstruction, summaryTitle, summaryNarrative } = deductionResult;

  const attachedEvidenceItems = evidenceList.filter(e => deductionDraft.selectedEvidenceIds.includes(e.id));
  const attachedTimelineEvents = timelineEvents.filter(t => deductionDraft.selectedTimelineEventIds.includes(t.id));

  const handleNavigateToEvidence = (evidenceId: string) => {
    dispatch({ type: 'INSPECT_EVIDENCE', payload: evidenceId });
    navigate('/inspection');
  };

  const handleNavigateToTimeline = () => {
    navigate('/chronology');
  };

  const handleReopenDeduction = () => {
    dispatch({ type: 'RESET_DEDUCTION' });
    navigate('/deduction');
  };

  const getStampClass = () => {
    if (resolutionState === 'SOLVED') return 'stamp-solved';
    if (resolutionState === 'PARTIALLY_SOLVED') return 'stamp-partial';
    return 'stamp-unresolved';
  };

  const getStampLabel = () => {
    if (resolutionState === 'SOLVED') return 'CASE SOLVED · ACCUSATION SUBSTANTIATED';
    if (resolutionState === 'PARTIALLY_SOLVED') return 'PARTIALLY SOLVED · CULPRIT DETAINED';
    return 'UNRESOLVED · ACCUSATION REJECTED';
  };

  const getStatusBadgeClass = (status: string) => {
    if (status === 'ESTABLISHED') return 'badge-established';
    if (status === 'SUPPORTED') return 'badge-supported';
    if (status === 'PARTIALLY SUPPORTED') return 'badge-partially';
    return 'badge-unresolved';
  };

  return (
    <div className="resolution-page">
      {/* Archival Case Seal Header */}
      <div className="resolution-header-banner">
        <div className="header-left">
          <div className="case-id-tag">
            <ShieldCheck size={16} />
            <span>METROPOLITAN POLICE · FORENSIC AUDIT RECORD</span>
          </div>
          <h1 className="resolution-main-title">{summaryTitle}</h1>
          <p className="resolution-date-stamp">FILED: 20TH SEPTEMBER 2026 · AUDIT COMPLETED</p>
        </div>
        <div className="header-right">
          <div className={`archival-stamp animate-stamp-drop ${getStampClass()}`}>
            <span>{getStampLabel()}</span>
          </div>
        </div>
      </div>

      {/* Executive Summary Narrative */}
      <div className="resolution-summary-box">
        <h3 className="summary-heading">EXECUTIVE FORENSIC SUMMARY</h3>
        <p className="summary-narrative">
          <TypewriterText text={summaryNarrative} speed={20} />
        </p>
      </div>

      {/* Forensic Component Breakdown */}
      <div className="forensic-breakdown-section">
        <h2 className="section-title">FORENSIC EVALUATION BREAKDOWN</h2>

        <div className="breakdown-grid">
          {/* CULPRIT */}
          <div className="assessment-card">
            <div className="assessment-card-header">
              <span className="component-name">PRIMARY ACCUSED</span>
              <span className={`status-badge ${getStatusBadgeClass(culprit.status)}`}>
                {culprit.status}
              </span>
            </div>
            <p className="assessment-notes">{culprit.notes}</p>
          </div>

          {/* METHOD */}
          <div className="assessment-card">
            <div className="assessment-card-header">
              <span className="component-name">METHOD OF BREACH</span>
              <span className={`status-badge ${getStatusBadgeClass(method.status)}`}>
                {method.status}
              </span>
            </div>
            <p className="assessment-notes">{method.notes}</p>
          </div>

          {/* MOTIVE */}
          <div className="assessment-card">
            <div className="assessment-card-header">
              <span className="component-name">PRIMARY MOTIVE</span>
              <span className={`status-badge ${getStatusBadgeClass(motive.status)}`}>
                {motive.status}
              </span>
            </div>
            <p className="assessment-notes">{motive.notes}</p>
          </div>

          {/* EVIDENCE CHAIN */}
          <div className="assessment-card">
            <div className="assessment-card-header">
              <span className="component-name">EVIDENCE CHAIN ({evidenceChain.matchedKeyCount}/{evidenceChain.totalKeyCount} KEY EXHIBITS)</span>
              <span className={`status-badge ${getStatusBadgeClass(evidenceChain.status)}`}>
                {evidenceChain.status}
              </span>
            </div>
            <p className="assessment-notes">{evidenceChain.notes}</p>
          </div>

          {/* TIMELINE RECONSTRUCTION */}
          <div className="assessment-card">
            <div className="assessment-card-header">
              <span className="component-name">TIMELINE RECONSTRUCTION ({timelineReconstruction.matchedKeyCount}/{timelineReconstruction.totalKeyCount} KEY TIMESTAMPS)</span>
              <span className={`status-badge ${getStatusBadgeClass(timelineReconstruction.status)}`}>
                {timelineReconstruction.status}
              </span>
            </div>
            <p className="assessment-notes">{timelineReconstruction.notes}</p>
          </div>
        </div>
      </div>

      {/* Traceable Evidentiary Chain */}
      <div className="resolution-section">
        <div className="section-title-row">
          <FileSearch size={18} />
          <h2>ATTACHED FORENSIC EXHIBITS ({attachedEvidenceItems.length})</h2>
        </div>
        <div className="traceable-items-grid">
          {attachedEvidenceItems.length === 0 ? (
            <p className="empty-text">No supporting evidence exhibits were attached to this dossier.</p>
          ) : (
            attachedEvidenceItems.map(item => (
              <div key={item.id} className="traceable-item-card" onClick={() => handleNavigateToEvidence(item.id)}>
                <div className="item-card-top">
                  <span className="item-tag">{item.id}</span>
                  <ExternalLink size={12} className="link-icon" />
                </div>
                <h4 className="item-title">{item.title}</h4>
                <p className="item-location">{item.locationFound}</p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Traceable Timeline Events */}
      <div className="resolution-section">
        <div className="section-title-row">
          <Clock size={18} />
          <h2>ATTACHED TIMELINE TIMESTAMPS ({attachedTimelineEvents.length})</h2>
        </div>
        <div className="traceable-timeline-list">
          {attachedTimelineEvents.length === 0 ? (
            <p className="empty-text">No timeline timestamps were attached to this dossier.</p>
          ) : (
            attachedTimelineEvents.map(evt => (
              <div key={evt.id} className="traceable-timeline-card" onClick={handleNavigateToTimeline}>
                <span className="timeline-time">{evt.time}</span>
                <span className="timeline-title">{evt.title}</span>
                <span className="timeline-loc">{evt.location}</span>
                <ExternalLink size={12} className="link-icon" />
              </div>
            ))
          )}
        </div>
      </div>

      {/* Official Canonical Truth Reveal */}
      <div className="canonical-truth-box">
        <div className="truth-header">
          <ShieldCheck size={20} />
          <h3>CANONICAL POLICE CASE RECONSTRUCTION</h3>
        </div>
        <p className="truth-text">{activeCase.truth.explanation}</p>
      </div>

      {/* Navigation Footer */}
      <div className="resolution-nav-footer">
        <button className="btn-res-nav" onClick={() => navigate('/board')}>
          <Layout size={14} />
          <span>EVIDENCE BOARD</span>
        </button>

        <button className="btn-res-nav" onClick={() => navigate('/notebook')}>
          <BookOpen size={14} />
          <span>NOTEBOOK</span>
        </button>

        <button className="btn-res-nav" onClick={() => navigate('/chronology')}>
          <Clock size={14} />
          <span>CHRONOLOGY</span>
        </button>

        <button className="btn-res-nav" onClick={() => navigate('/suspects')}>
          <Users size={14} />
          <span>SUSPECTS</span>
        </button>

        <button className="btn-res-reopen" onClick={handleReopenDeduction}>
          <RefreshCw size={14} />
          <span>REOPEN ACCUSATION</span>
        </button>
      </div>
    </div>
  );
};
