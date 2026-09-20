import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInvestigation } from '../../state/InvestigationContext';
import { INITIAL_EVIDENCE } from '../../data/evidence';
import type { Suspect } from '../../state/types';
import {
  AlertTriangle,
  Pin,
  MessageSquare,
  ExternalLink,
  ChevronRight,
  Info
} from 'lucide-react';
import './SuspectDossierPage.css';

export const SuspectDossierPage: React.FC = () => {
  const { state, dispatch, suspectsList } = useInvestigation();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'profile' | 'statement' | 'alibi' | 'evidence'>('profile');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const selectedSuspect: Suspect =
    suspectsList.find(s => s.id === state.selectedSuspectId) || suspectsList[0];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSelectSuspect = (id: string) => {
    dispatch({ type: 'SELECT_SUSPECT', payload: id });
  };

  const handlePinDossierToBoard = () => {
    dispatch({
      type: 'ADD_BOARD_CONNECTION',
      payload: {
        id: `pin-suspect-${selectedSuspect.id}`,
        sourceId: 'EVD-001',
        targetId: selectedSuspect.linkedEvidenceIds[0] || 'EVD-004',
        label: `${selectedSuspect.name} Dossier Pin`
      }
    });
    showToast(`Dossier for ${selectedSuspect.name} pinned to Evidence Board.`);
  };

  const handleBeginInterrogation = () => {
    dispatch({ type: 'SELECT_SUSPECT', payload: selectedSuspect.id });
    navigate(`/interrogation?suspect=${selectedSuspect.id}`);
  };

  const linkedEvidenceItems = INITIAL_EVIDENCE.filter(e =>
    selectedSuspect.linkedEvidenceIds.includes(e.id)
  );

  return (
    <div className="dossier-page-container font-body animate-fade-in">
      {/* Toast Popup */}
      {toastMessage && (
        <div className="dossier-toast font-mono">
          <Info size={16} className="text-gold" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Archival Header Bar */}
      <div className="dossier-archive-subbar font-mono">
        <div className="subbar-left">
          <span className="subbar-badge">CASE RECORD // PERSON OF INTEREST</span>
          <span className="subbar-ref">DOSSIER REF: S-0419-{selectedSuspect.id.toUpperCase()}</span>
          <span className="subbar-divider">|</span>
          <span className="subbar-clearance">FORENSIC ARCHIVE CLEARANCE LEVEL IV</span>
        </div>
        <div className="subbar-right">
          <span className="beacon-dot animate-pulse"></span>
          <span className="subbar-status">INTERVIEW READY (ROOM B)</span>
        </div>
      </div>

      {/* Main Grid Workspace */}
      <div className="dossier-grid-layout">
        {/* Left Panel: Suspect Roster Sidebar */}
        <aside className="dossier-roster-sidebar font-mono">
          <div className="roster-top-bar">
            <span className="roster-title">SUSPECT ROSTER [{suspectsList.length}]</span>
            <span className="roster-focus text-gold">1 ACTIVE FOCUS</span>
          </div>

          <div className="roster-cards-list">
            {suspectsList.map((suspect, idx) => {
              const isActive = selectedSuspect.id === suspect.id;
              return (
                <div
                  key={suspect.id}
                  className={`roster-item-card ${isActive ? 'active' : ''}`}
                  onClick={() => handleSelectSuspect(suspect.id)}
                >
                  {isActive && <div className="active-gold-bar"></div>}

                  <div className="roster-card-inner">
                    <div className="roster-photo-frame">
                      <img
                        src={suspect.imagePath || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400'}
                        alt={suspect.name}
                        className="roster-img"
                      />
                      {isActive && <div className="photo-corner-pin"></div>}
                    </div>

                    <div className="roster-info-block">
                      <div className="roster-card-header">
                        <span className="subj-code">SUBJ. #0{idx + 1}</span>
                        <span className={`risk-badge risk-${suspect.suspicionLevel.toLowerCase()}`}>
                          {suspect.suspicionLevel === 'High' ? 'HIGH RISK' : 'INDEXED'}
                        </span>
                      </div>

                      <h3 className="roster-suspect-name font-headline">{suspect.name}</h3>
                      <p className="roster-suspect-role">{suspect.role}</p>

                      <div className="roster-tags-row">
                        {suspect.tags?.slice(0, 2).map((t, i) => (
                          <span key={i} className="tag-pill">{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Roster Footer Case Notes */}
          <div className="roster-summary-box">
            <span className="summary-title">FORENSIC CASE NOTES</span>
            <p className="summary-text">
              Four persons held on estate perimeter per Magistrate order #71-B. All personal effects placed under sealed lockbox in Scullery.
            </p>
          </div>
        </aside>

        {/* Center & Right: Manila Dossier Folder */}
        <main className="dossier-main-folder">
          <div className="manila-folder-wrapper">
            {/* Folder Ear Accent & Top Seal Stamp */}
            <div className="folder-staple-accent"></div>
            <div className="confidential-seal-stamp font-mono">
              PERSON OF INTEREST
            </div>

            {/* Folder Navigation Tabs */}
            <div className="folder-tabs-header font-mono">
              <button
                className={`folder-tab ${activeTab === 'profile' ? 'active' : ''}`}
                onClick={() => setActiveTab('profile')}
              >
                [ PROFILE ]
              </button>
              <button
                className={`folder-tab ${activeTab === 'statement' ? 'active' : ''}`}
                onClick={() => setActiveTab('statement')}
              >
                [ TESTIMONY STATEMENT ]
              </button>
              <button
                className={`folder-tab ${activeTab === 'alibi' ? 'active' : ''}`}
                onClick={() => setActiveTab('alibi')}
              >
                [ ALIBI RECONSTRUCTION ]
              </button>
              <button
                className={`folder-tab ${activeTab === 'evidence' ? 'active' : ''}`}
                onClick={() => setActiveTab('evidence')}
              >
                [ RELATED EVIDENCE ({linkedEvidenceItems.length}) ]
              </button>
            </div>

            {/* Section 1: Profile Header & Identity Data */}
            <div className="dossier-profile-header">
              {/* Photo Plate with Fingerprint Overlay */}
              <div className="photo-plate-column">
                <div className="sepia-photo-plate">
                  <div className="paperclip-graphic"></div>
                  <div className="photo-viewport">
                    <img
                      src={selectedSuspect.imagePath || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400'}
                      alt={selectedSuspect.name}
                      className="dossier-portrait-img"
                    />

                    {/* Fingerprint Smudge Overlay SVG */}
                    <div className="fingerprint-overlay">
                      <svg viewBox="0 0 100 100" className="fingerprint-svg">
                        <path d="M50 15 C 30 15, 20 35, 20 50 C 20 70, 35 85, 50 85 C 65 85, 80 70, 80 50 C 80 30, 65 15, 50 15 Z" fill="none" stroke="#e9c176" strokeWidth="1" opacity="0.3" />
                      </svg>
                    </div>
                  </div>
                  <div className="photo-strip-label font-mono">
                    <span>EXHIBIT P-01 // PHOTO IDENT</span>
                  </div>
                </div>
                <span className="record-date-label font-mono">RECORD CREATED: 24 OCT · 01:15 HRS</span>
              </div>

              {/* Personal Data Grid */}
              <div className="dossier-identity-details">
                <div className="identity-title-group font-mono">
                  <span className="text-gold">IDENTITY DOSSIER · SUBJECT: {selectedSuspect.name.toUpperCase()}</span>
                  <h1 className="suspect-hero-name font-headline">{selectedSuspect.name}</h1>
                  <p className="suspect-hero-subtitle font-headline">"{selectedSuspect.role}"</p>
                </div>

                <div className="stats-grid font-mono">
                  <div className="stat-card">
                    <span className="lbl">AGE / DATED</span>
                    <span className="val">{selectedSuspect.age || '42 Years'}</span>
                  </div>
                  <div className="stat-card">
                    <span className="lbl">KINSHIP RELATION</span>
                    <span className="val">{selectedSuspect.role}</span>
                  </div>
                  <div className="stat-card">
                    <span className="lbl">DOMICILE</span>
                    <span className="val">{selectedSuspect.domicile || 'Blackwood Estate'}</span>
                  </div>
                  <div className="stat-card stat-card-alert">
                    <span className="lbl text-red font-bold">FINANCIAL STATUS</span>
                    <span className="val text-red font-bold">{selectedSuspect.financialStatus || selectedSuspect.motive}</span>
                  </div>
                </div>

                <div className="confidential-bio-box font-mono">
                  <span className="lbl text-tertiary">CONFIDENTIAL BACKGROUND SUMMARY</span>
                  <p className="bio-desc">{selectedSuspect.bio}</p>
                </div>
              </div>
            </div>

            {/* Section 2: Formal Testimonial Statement */}
            <div className="testimonial-section">
              <div className="section-title-bar font-mono">
                <span className="text-gold font-bold">RECORDED TESTIMONY STATEMENT</span>
                <span className="text-tertiary">TIME STAMP: {selectedSuspect.statementTime}</span>
              </div>
              <div className="testimonial-box">
                <p className="testimonial-text font-headline">{selectedSuspect.statement}</p>
                <div className="oath-footer font-mono">
                  <span>RECORDING CLERK: SGT. M. BRIGGS</span>
                  <span>VERIFIED UNDER OATH</span>
                </div>
              </div>
            </div>

            {/* Section 3: Alibi Discrepancy Flag Banner */}
            <div className="alibi-discrepancy-card font-mono">
              <div className="discrepancy-header">
                <AlertTriangle size={18} className="text-red" />
                <span className="text-red font-bold">ALIBI DISCREPANCY DETECTED</span>
              </div>
              <p className="discrepancy-text">{selectedSuspect.alibiDiscrepancy}</p>
              <div className="discrepancy-footer">
                <span>WITNESS CORROBORATION: HASTINGS, BUTLER</span>
                <span className="text-gold cursor-pointer" onClick={() => navigate('/chronology')}>[VIEW EVENT CHRONOLOGY]</span>
              </div>
            </div>

            {/* Section 4: Field Memo / Detective Notebook Quote */}
            <div className="field-memo-card font-mono">
              <div className="memo-header">
                <span className="text-gold font-bold">DETECTIVE NOTEBOOK // FIELD MEMO</span>
                <span className="text-tertiary">INITIALS: R.V.</span>
              </div>
              <p className="memo-quote font-headline">
                "{selectedSuspect.keyObservations[0] || 'Observe suspect movements closely.'}"
              </p>
              <div className="memo-footer">
                <span>ACTION REQUIRED: Cross-examine statement with physical exhibits</span>
                <span className="text-gold font-bold">PRIORITY: IMMEDIATE</span>
              </div>
            </div>

            {/* Section 5: Linked Physical Evidence Chips */}
            <div className="linked-evidence-section font-mono">
              <span className="section-label text-tertiary">LINKED PHYSICAL EVIDENCE [{linkedEvidenceItems.length} PIECES]</span>
              <div className="evidence-chips-grid">
                {linkedEvidenceItems.map(item => (
                  <div
                    key={item.id}
                    className="evidence-chip-card"
                    onClick={() => {
                      dispatch({ type: 'SELECT_EVIDENCE', payload: item.id });
                      navigate('/inspection');
                    }}
                  >
                    <div className="chip-header">
                      <span className="chip-code text-gold font-bold">{item.id}</span>
                      <ExternalLink size={12} className="text-tertiary" />
                    </div>
                    <h4 className="chip-title font-headline">{item.title}</h4>
                    <p className="chip-desc">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Action Deck */}
            <div className="dossier-actions-bar font-mono">
              <button
                className="btn-action-secondary font-mono"
                onClick={handlePinDossierToBoard}
              >
                <Pin size={14} />
                <span>[ PIN DOSSIER TO BOARD ]</span>
              </button>

              <button
                className="btn-action-primary font-headline"
                onClick={handleBeginInterrogation}
              >
                <MessageSquare size={16} />
                <span>[ BEGIN INTERROGATION ]</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
