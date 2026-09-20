import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInvestigation } from '../../state/InvestigationContext';
import { Shield, FileCheck, AlertTriangle, Lock, UserCheck, Zap, Coins, Clock, ArrowRight, RotateCcw } from 'lucide-react';
import './FinalDeductionPage.css';

export const FinalDeductionPage: React.FC = () => {
  const navigate = useNavigate();
  const { state, dispatch, activeCase, suspectsList, discoveredEvidence, timelineEvents } = useInvestigation();
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const { culpritId, methodId, motiveId, selectedEvidenceIds, selectedTimelineEventIds, theoryText } = state.deductionDraft;
  const deductionOptions = activeCase.deductionOptions;

  const handleSelectCulprit = (id: string) => {
    dispatch({ type: 'SET_DEDUCTION_CULPRIT', payload: id === culpritId ? null : id });
  };

  const handleSelectMethod = (id: string) => {
    dispatch({ type: 'SET_DEDUCTION_METHOD', payload: id === methodId ? null : id });
  };

  const handleSelectMotive = (id: string) => {
    dispatch({ type: 'SET_DEDUCTION_MOTIVE', payload: id === motiveId ? null : id });
  };

  const handleToggleEvidence = (id: string) => {
    dispatch({ type: 'TOGGLE_DEDUCTION_EVIDENCE', payload: id });
  };

  const handleToggleTimeline = (id: string) => {
    dispatch({ type: 'TOGGLE_DEDUCTION_TIMELINE', payload: id });
  };

  const handleTheoryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({ type: 'SET_DEDUCTION_THEORY', payload: e.target.value });
  };

  const handleConfirmSubmit = () => {
    dispatch({ type: 'SUBMIT_DEDUCTION' });
    setShowConfirmModal(false);
    navigate('/resolution');
  };

  const isFormComplete = Boolean(culpritId && methodId && motiveId);

  return (
    <div className="deduction-page">
      {/* Header Banner */}
      <div className="deduction-header">
        <div className="deduction-header-left">
          <div className="deduction-badge">
            <Shield size={16} />
            <span>METROPOLITAN POLICE · CASE #{activeCase.metadata.caseNumber} ACCUSATION</span>
          </div>
          <h1 className="deduction-title">Final Accusation Dossier</h1>
          <p className="deduction-subtitle">
            Synthesize your findings and assemble the formal indictment for {activeCase.metadata.title}.
          </p>
        </div>
        <div className="deduction-header-right">
          <div className={`form-status-pill ${isFormComplete ? 'complete' : 'incomplete'}`}>
            <FileCheck size={14} />
            <span>{isFormComplete ? 'DOSSIER READY FOR SEALING' : 'SECTIONS INCOMPLETE'}</span>
          </div>
        </div>
      </div>

      <div className="deduction-content">
        {/* SECTION 01: CULPRIT */}
        <div className="deduction-section">
          <div className="section-header">
            <span className="section-number">01</span>
            <UserCheck size={18} className="section-icon" />
            <h2>PRIMARY ACCUSED · THE CULPRIT</h2>
          </div>
          <p className="section-instruction">Select the individual responsible for the perpetrator actions in {activeCase.metadata.title}.</p>

          <div className="suspect-selection-grid">
            {suspectsList.map(suspect => {
              const isSelected = culpritId === suspect.id;
              return (
                <div
                  key={suspect.id}
                  className={`suspect-deduction-card ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleSelectCulprit(suspect.id)}
                >
                  <div className="suspect-card-header">
                    <div className="suspect-avatar-badge">{suspect.avatar}</div>
                    <div className="suspect-card-title">
                      <h3>{suspect.name}</h3>
                      <span className="suspect-role">{suspect.role}</span>
                    </div>
                  </div>
                  <p className="suspect-bio-snippet">{suspect.financialStatus}</p>
                  <div className="suspect-select-radio">
                    <div className={`radio-dot ${isSelected ? 'active' : ''}`} />
                    <span>{isSelected ? 'PRIMARY ACCUSED' : 'SELECT SUSPECT'}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* SECTION 02: METHOD */}
        <div className="deduction-section">
          <div className="section-header">
            <span className="section-number">02</span>
            <Zap size={18} className="section-icon" />
            <h2>METHOD OF BREACH & SABOTAGE</h2>
          </div>
          <p className="section-instruction">Determine how the crime was executed without triggering alarms.</p>

          <div className="option-selection-list">
            {deductionOptions.methods.map(method => {
              const isSelected = methodId === method.id;
              return (
                <div
                  key={method.id}
                  className={`option-deduction-card ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleSelectMethod(method.id)}
                >
                  <div className={`radio-dot ${isSelected ? 'active' : ''}`} />
                  <span className="option-label">{method.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* SECTION 03: MOTIVE */}
        <div className="deduction-section">
          <div className="section-header">
            <span className="section-number">03</span>
            <Coins size={18} className="section-icon" />
            <h2>PRIMARY MOTIVE & INCENTIVE</h2>
          </div>
          <p className="section-instruction">Select the financial, personal, or legal driver behind the perpetrator's actions.</p>

          <div className="option-selection-list">
            {deductionOptions.motives.map(motive => {
              const isSelected = motiveId === motive.id;
              return (
                <div
                  key={motive.id}
                  className={`option-deduction-card ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleSelectMotive(motive.id)}
                >
                  <div className={`radio-dot ${isSelected ? 'active' : ''}`} />
                  <span className="option-label">{motive.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* SECTION 04: SUPPORTING EVIDENCE */}
        <div className="deduction-section">
          <div className="section-header">
            <span className="section-number">04</span>
            <Lock size={18} className="section-icon" />
            <h2>SUPPORTING FORENSIC EVIDENCE CHAIN</h2>
          </div>
          <p className="section-instruction">Attach discovered evidence items that directly support your accusation (Select all that apply).</p>

          <div className="evidence-selection-grid">
            {discoveredEvidence.map(item => {
              const isSelected = selectedEvidenceIds.includes(item.id);
              return (
                <div
                  key={item.id}
                  className={`evidence-deduction-chip ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleToggleEvidence(item.id)}
                >
                  <div className={`checkbox-box ${isSelected ? 'checked' : ''}`} />
                  <div className="chip-info">
                    <span className="chip-tag">{item.id} · {item.tag}</span>
                    <span className="chip-title">{item.title}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* SECTION 05: TIMELINE RECONSTRUCTION */}
        <div className="deduction-section">
          <div className="section-header">
            <span className="section-number">05</span>
            <Clock size={18} className="section-icon" />
            <h2>TIMELINE EVENT RECONSTRUCTION</h2>
          </div>
          <p className="section-instruction">Attach key timestamps from your event chronology to establish the window of opportunity.</p>

          <div className="timeline-selection-list">
            {timelineEvents.map(event => {
              const isSelected = selectedTimelineEventIds.includes(event.id);
              return (
                <div
                  key={event.id}
                  className={`timeline-deduction-chip ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleToggleTimeline(event.id)}
                >
                  <div className={`checkbox-box ${isSelected ? 'checked' : ''}`} />
                  <div className="chip-time">{event.time}</div>
                  <div className="chip-details">
                    <span className="event-title">{event.title}</span>
                    <span className="event-location">{event.location}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* SECTION 06: FINAL THEORY */}
        <div className="deduction-section">
          <div className="section-header">
            <span className="section-number">06</span>
            <FileCheck size={18} className="section-icon" />
            <h2>INVESTIGATOR'S FINAL CASE NARRATIVE</h2>
          </div>
          <p className="section-instruction">Provide your final handwritten synthesis explaining the crime sequence (Optional).</p>

          <textarea
            className="deduction-textarea"
            rows={4}
            placeholder="Type your final narrative reconstruction of events..."
            value={theoryText}
            onChange={handleTheoryChange}
          />
        </div>

        {/* ACTION BAR */}
        <div className="deduction-action-bar">
          <button
            className="btn-clear-deduction"
            onClick={() => dispatch({ type: 'RESET_DEDUCTION' })}
          >
            <RotateCcw size={14} />
            <span>RESET DEDUCTION DRAFT</span>
          </button>

          <button
            className="btn-submit-deduction"
            disabled={!isFormComplete}
            onClick={() => setShowConfirmModal(true)}
          >
            <span>SEAL & SUBMIT ACCUSATION DOSSIER</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* CONFIRMATION MODAL */}
      {showConfirmModal && (
        <div className="modal-overlay">
          <div className="modal-box seal-modal">
            <div className="modal-header warning">
              <AlertTriangle size={24} />
              <h2>SEAL CASE DOSSIER?</h2>
            </div>
            <p className="modal-body-text">
              You are about to formally seal the accusation dossier for <strong>Case #001: The Missing Necklace</strong>.
              <br /><br />
              Your deduction will be forensically audited against the evidence before being presented to the Magistrates' Court.
            </p>
            <div className="modal-actions">
              <button className="btn-cancel" onClick={() => setShowConfirmModal(false)}>
                AMEND DOSSIER
              </button>
              <button className="btn-confirm-seal" onClick={handleConfirmSubmit}>
                CONFIRM & SUBMIT
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
