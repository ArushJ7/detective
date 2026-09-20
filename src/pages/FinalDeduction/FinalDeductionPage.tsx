import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useInvestigation } from '../../state/InvestigationContext';
import { DEDUCTION_OPTIONS } from '../../data/case001/truth';
import { Brain, ArrowRight } from 'lucide-react';
import './FinalDeductionPage.css';

export const FinalDeductionPage: React.FC = () => {
  const { state, dispatch } = useInvestigation();
  const navigate = useNavigate();

  const { culpritId, methodId, motiveId } = state.deductionDraft;
  const isComplete = culpritId && methodId && motiveId;

  const handleSubmit = () => {
    dispatch({ type: 'SUBMIT_DEDUCTION' });
    navigate('/resolution');
  };

  return (
    <div className="deduction-container animate-fade-in">
      <div className="deduction-header">
        <div className="header-title-block">
          <h2 className="deduction-title"><Brain size={20} /> FINAL DEDUCTION ROOM</h2>
          <span className="deduction-subtitle font-mono">FORMULATE THE ACCUSATION DOSSIER</span>
        </div>

        <div className="deduction-status font-mono">
          STATUS: <strong>{isComplete ? 'READY FOR ARREST WARRANT' : 'INCOMPLETE ACCUSATION'}</strong>
        </div>
      </div>

      <div className="deduction-form-grid">
        {/* Step 1: Select Culprit */}
        <div className="deduction-card">
          <div className="card-top">
            <span className="label-stamp label-stamp-gold font-mono">STEP 1</span>
            <h3 className="card-heading font-headline">IDENTIFY THE CULPRIT</h3>
          </div>
          <div className="options-list">
            {DEDUCTION_OPTIONS.culprits.map(c => (
              <div
                key={c.id}
                className={`option-btn ${culpritId === c.id ? 'selected' : ''}`}
                onClick={() => dispatch({ type: 'SET_DEDUCTION_CULPRIT', payload: c.id })}
              >
                <div className="radio-dot"></div>
                <span className="font-mono">{c.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Step 2: Select Method */}
        <div className="deduction-card">
          <div className="card-top">
            <span className="label-stamp label-stamp-gold font-mono">STEP 2</span>
            <h3 className="card-heading font-headline">EXPLAIN THE METHOD</h3>
          </div>
          <div className="options-list">
            {DEDUCTION_OPTIONS.methods.map(m => (
              <div
                key={m.id}
                className={`option-btn ${methodId === m.id ? 'selected' : ''}`}
                onClick={() => dispatch({ type: 'SET_DEDUCTION_METHOD', payload: m.id })}
              >
                <div className="radio-dot"></div>
                <span className="font-mono">{m.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Step 3: Select Motive */}
        <div className="deduction-card">
          <div className="card-top">
            <span className="label-stamp label-stamp-gold font-mono">STEP 3</span>
            <h3 className="card-heading font-headline">ESTABLISH THE MOTIVE</h3>
          </div>
          <div className="options-list">
            {DEDUCTION_OPTIONS.motives.map(mot => (
              <div
                key={mot.id}
                className={`option-btn ${motiveId === mot.id ? 'selected' : ''}`}
                onClick={() => dispatch({ type: 'SET_DEDUCTION_MOTIVE', payload: mot.id })}
              >
                <div className="radio-dot"></div>
                <span className="font-mono">{mot.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="deduction-actions">
        <button
          className="btn-submit-accusation font-headline"
          disabled={!isComplete}
          onClick={handleSubmit}
        >
          <span>SUBMIT FINAL ACCUSATION</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};
