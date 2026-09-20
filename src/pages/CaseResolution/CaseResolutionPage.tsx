import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useInvestigation } from '../../state/InvestigationContext';
import { CASE_001_TRUTH } from '../../data/case001/truth';
import { AlertTriangle, RotateCcw, Award } from 'lucide-react';
import './CaseResolutionPage.css';

export const CaseResolutionPage: React.FC = () => {
  const { state, dispatch } = useInvestigation();
  const navigate = useNavigate();

  const isSolved = state.caseSolved === true;

  const handleRestart = () => {
    dispatch({ type: 'RESET_CASE' });
    navigate('/intro');
  };

  return (
    <div className="resolution-container animate-fade-in">
      <div className="resolution-card">
        {isSolved ? (
          <div className="result-header solved animate-pulse-glow">
            <Award size={48} className="result-icon text-green" />
            <span className="label-stamp label-stamp-green font-mono">CASE RESOLVED // VERDICT SUCCESSFUL</span>
            <h1 className="result-title">CASE SOLVED!</h1>
            <div className="result-subtitle font-mono">ARREST WARRANT ISSUED FOR JAMES BLACKWOOD</div>
          </div>
        ) : (
          <div className="result-header failed">
            <AlertTriangle size={48} className="result-icon text-red" />
            <span className="label-stamp label-stamp-red font-mono">CASE FAILED // INSUFFICIENT PROOF</span>
            <h1 className="result-title">INCORRECT DEDUCTION</h1>
            <div className="result-subtitle font-mono">THE SUSPECT WAS RELEASED DUE TO FLAWE EVIDENCE</div>
          </div>
        )}

        <div className="truth-disclosure">
          <h3 className="disclosure-heading font-headline">THE OFFICIAL CASE TRUTH</h3>
          <p className="truth-text">{CASE_001_TRUTH.explanation}</p>
        </div>

        <div className="resolution-actions">
          <button className="btn-restart font-headline" onClick={handleRestart}>
            <RotateCcw size={18} />
            <span>RESTART CASE #001</span>
          </button>
        </div>
      </div>
    </div>
  );
};
