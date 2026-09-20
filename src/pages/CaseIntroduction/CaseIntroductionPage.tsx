import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Clock, AlertTriangle } from 'lucide-react';
import './CaseIntroductionPage.css';

export const CaseIntroductionPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="case-intro-container animate-fade-in">
      <div className="intro-card">
        <div className="intro-header">
          <div className="intro-stamp label-stamp label-stamp-red">CASE DOSSIER #001</div>
          <h1 className="intro-title">THE MISSING NECKLACE</h1>
          <div className="intro-subtitle font-mono">BLACKWOOD MANOR ESTATE — 20 SEPTEMBER</div>
        </div>

        <div className="intro-briefing">
          <div className="briefing-section">
            <h3 className="section-title"><Clock size={16} /> INCIDENT SUMMARY</h3>
            <p className="briefing-text">
              At 21:24 GMT during an evening gala at Blackwood Manor, the primary electrical circuit tripped, plunging the grand drawing room into blackout for exactly four minutes.
            </p>
            <p className="briefing-text">
              When emergency power restored, the primary glass vitrine housing the priceless <strong>Star of Blackwood Diamond Necklace</strong> (£1.2M value) was discovered unlocked and empty.
            </p>
          </div>

          <div className="briefing-grid">
            <div className="brief-item">
              <span className="brief-label font-mono">PRIMARY LOCATION</span>
              <span className="brief-val">Drawing Room, West Wing</span>
            </div>
            <div className="brief-item">
              <span className="brief-label font-mono">VICTIM / OWNER</span>
              <span className="brief-val">Lady Eleanor Blackwood</span>
            </div>
            <div className="brief-item">
              <span className="brief-label font-mono">SUSPECTS ON SITE</span>
              <span className="brief-val">4 Key Persons of Interest</span>
            </div>
            <div className="brief-item">
              <span className="brief-label font-mono">INITIAL CLUES</span>
              <span className="brief-val">10 Items Discovered</span>
            </div>
          </div>

          <div className="intro-directive">
            <AlertTriangle className="directive-icon" size={20} />
            <div className="directive-text">
              <strong>INVESTIGATIVE DIRECTIVE:</strong> Examine the crime scene, inspect physical evidence in detail, review suspect dossiers, and connect clues on the Evidence Board to pinpoint the thief, method, and motive.
            </div>
          </div>
        </div>

        <div className="intro-actions">
          <button className="btn-begin-investigation" onClick={() => navigate('/scene')}>
            <span>BEGIN INVESTIGATION</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
