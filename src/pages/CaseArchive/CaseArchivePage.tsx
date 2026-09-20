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
          return (
            <div key={c.id} className={`case-card ${isActive ? 'active-case' : ''}`}>
              <div className="case-card-header font-mono">
                <span className="case-number-badge">{c.caseNumber}</span>
                <span className="case-status-badge available font-bold">
                  {state.caseSolved ? 'COMPLETED' : 'AVAILABLE'}
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
                  className="btn-select-case font-mono"
                  onClick={() => handleSelectCase(c.id)}
                >
                  <Play size={14} />
                  <span>{isActive ? 'CONTINUE INVESTIGATION' : 'OPEN CASE DOSSIER'}</span>
                </button>
              </div>
            </div>
          );
        })}

        {/* Future Case Placeholder (Locked) */}
        <div className="case-card locked-case">
          <div className="case-card-header font-mono">
            <span className="case-number-badge">SY-1895-CR-002</span>
            <span className="case-status-badge locked font-bold">
              <Lock size={12} className="inline mr-1" />
              LOCKED
            </span>
          </div>

          <h2 className="case-card-title font-headline">The Locked Room Mystery</h2>
          <span className="case-card-subtitle font-mono">Highland Manor · Sealed Tower Suite</span>

          <p className="case-card-synopsis">
            A prominent industrialist is found deceased behind a double-bolted oak door. No windows breached. No secret passages detected.
          </p>

          <div className="case-card-meta font-mono">
            <div className="meta-item">
              <span className="lbl">LOCATION:</span>
              <span className="val">Highland Estate, Scotland</span>
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
