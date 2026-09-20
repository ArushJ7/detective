import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useInvestigation } from '../../state/InvestigationContext';
import { CaseManager } from '../../engine';
import { Shield, Lock, Play } from 'lucide-react';
import './CaseArchivePage.css';

export const CaseArchivePage: React.FC = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useInvestigation();

  const cases = CaseManager.getAllCasesMetadata();

  const handleSelectCase = (caseId: string) => {
    dispatch({ type: 'SWITCH_CASE', payload: caseId });
    navigate('/intro');
  };

  return (
    <div className="archive-page-container font-body">
      {/* Header Banner */}
      <div className="archive-header font-mono">
        <div className="header-badge">
          <Shield size={16} className="text-gold" />
          <span>METROPOLITAN POLICE ARCHIVES · SCOTLAND YARD</span>
        </div>
        <h1 className="archive-title font-headline">CONFIDENTIAL CASE FILES</h1>
        <p className="archive-subtitle">
          Select an active investigation docket to examine evidence, cross-examine suspects, and reconstruct the crime sequence.
        </p>
      </div>

      {/* Cases Grid */}
      <div className="cases-grid">
        {/* Active Registered Cases */}
        {cases.map(c => {
          const isActive = state.activeCaseId === c.id;
          const isCase1Completed =
            state.completedCaseIds.includes('case-001') ||
            state.completedCaseIds.includes('case001') ||
            (state.activeCaseId === 'case-001' && state.caseSolved === true);

          const isCase2Completed =
            state.completedCaseIds.includes('case-002') ||
            state.completedCaseIds.includes('case002') ||
            (state.activeCaseId === 'case-002' && state.caseSolved === true);

          const isSolved =
            state.completedCaseIds.includes(c.id) ||
            (state.activeCaseId === c.id && state.caseSolved === true);

          // Lock logic: Case 1 is always unlocked. Case 2 unlocks after Case 1. Case 3 unlocks after Case 2.
          const isLocked =
            (c.id === 'case-002' && !isCase1Completed) ||
            (c.id === 'case-003' && !isCase2Completed);

          const requiredCaseText = c.id === 'case-002' ? 'CASE #001' : 'CASE #002';

          const statusText = isSolved ? 'COMPLETED' : isLocked ? 'LOCKED' : 'AVAILABLE';
          const statusClass = isSolved ? 'completed' : isLocked ? 'locked' : 'available';

          return (
            <div key={c.id} className={`case-card ${isActive ? 'active-case' : ''} ${isLocked ? 'locked-case' : ''}`}>
              <div className="case-card-header font-mono">
                <span className="case-number-badge">{c.caseNumber}</span>
                <span className={`case-status-badge ${statusClass} font-bold`}>
                  {isLocked && <Lock size={12} className="inline mr-1" />}
                  {statusText}
                </span>
              </div>

              <h2 className="case-card-title font-headline">{c.title}</h2>
              <span className="case-card-subtitle font-mono">{c.subtitle}</span>

              <p className="case-card-synopsis">{c.synopsis}</p>

              <div className="case-card-meta font-mono">
                <div className="meta-item">
                  <span className="lbl">LOCATION:</span>
                  <span className="val">{c.location}</span>
                </div>
                <div className="meta-item">
                  <span className="lbl">ESTIMATED:</span>
                  <span className="val">{c.estimatedDuration}</span>
                </div>
              </div>

              <div className="case-card-actions">
                <button
                  className={`btn-select-case font-mono ${isLocked ? 'disabled' : ''}`}
                  disabled={isLocked}
                  onClick={() => !isLocked && handleSelectCase(c.id)}
                >
                  {isLocked ? (
                    <>
                      <Lock size={14} />
                      <span>CASE FILE SEALED (REQUIRES {requiredCaseText})</span>
                    </>
                  ) : (
                    <>
                      <Play size={14} />
                      <span>{isActive ? 'CONTINUE INVESTIGATION' : 'OPEN CASE DOSSIER'}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}

        {/* Future Case Placeholder (Locked) */}
        <div className="case-card locked-case">
          <div className="case-card-header font-mono">
            <span className="case-number-badge">SY-1896-CR-003</span>
            <span className="case-status-badge locked font-bold">
              <Lock size={12} className="inline mr-1" />
              LOCKED
            </span>
          </div>

          <h2 className="case-card-title font-headline">The Vanishing Cipher</h2>
          <span className="case-card-subtitle font-mono">Royal Observatory · Greenwich</span>

          <p className="case-card-synopsis">
            An astronomer vanishes from an enclosed observatory dome during a celestial eclipse. Telegraph line severed.
          </p>

          <div className="case-card-meta font-mono">
            <div className="meta-item">
              <span className="lbl">LOCATION:</span>
              <span className="val">Greenwich, London</span>
            </div>
            <div className="meta-item">
              <span className="lbl">STATUS:</span>
              <span className="val">FUTURE CASE FILE</span>
            </div>
          </div>

          <div className="case-card-actions">
            <button className="btn-select-case disabled font-mono" disabled>
              <Lock size={14} />
              <span>CASE FILE SEALED</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
