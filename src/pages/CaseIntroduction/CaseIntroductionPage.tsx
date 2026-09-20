import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInvestigation } from '../../state/InvestigationContext';
import { DoorOpen, FileText, Lock, Users, Fingerprint, X, Volume2 } from 'lucide-react';
import { sfx } from '../../utils/audio';
import { TypewriterText } from '../../components/ui/TypewriterText';
import './CaseIntroductionPage.css';

export const CaseIntroductionPage: React.FC = () => {
  const navigate = useNavigate();
  const { caseMetadata, evidenceList, suspectsList } = useInvestigation();
  const [showBriefModal, setShowBriefModal] = useState<boolean>(false);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  const handleEnterEstate = () => {
    sfx.playPaper();
    setIsTransitioning(true);
    setTimeout(() => {
      navigate('/scene');
    }, 450);
  };

  const handleOpenBrief = () => {
    sfx.playClick();
    setShowBriefModal(true);
  };

  return (
    <div className={`case-intro-container ${isTransitioning ? 'transition-out' : ''}`}>
      {/* Film Noir Ambient Background Overlays */}
      <div className="intro-bg-overlay">
        <div className="vignette-radial"></div>
        <div className="gradient-left"></div>
      </div>

      {/* SVG Rain Effect Simulation */}
      <svg className="rain-svg-overlay" xmlns="http://www.w3.org/2000/svg">
        <line stroke="#e0e3de" strokeDasharray="8 60" strokeWidth="0.5" x1="12%" x2="10%" y1="0%" y2="100%" />
        <line stroke="#e0e3de" strokeDasharray="12 80" strokeWidth="0.75" x1="38%" x2="35%" y1="0%" y2="100%" />
        <line stroke="#e0e3de" strokeDasharray="15 70" strokeWidth="0.5" x1="65%" x2="62%" y1="0%" y2="100%" />
        <line stroke="#e0e3de" strokeDasharray="10 90" strokeWidth="0.6" x1="88%" x2="85%" y1="0%" y2="100%" />
      </svg>

      {/* Top Docket / Confidential Dispatch Header */}
      <div className="intro-top-docket font-mono">
        <div className="docket-tag-group">
          <span className="ping-dot"></span>
          <span className="docket-id">ARCHIVE DOCKET: {caseMetadata.caseNumber}</span>
          <span className="divider-slash">/</span>
          <span className="docket-sub">SCOTLAND YARD CRIMINAL INVESTIGATION DEPT.</span>
        </div>

        <div className="restricted-stamp">
          <span>RESTRICTED · EYES ONLY</span>
        </div>
      </div>

      {/* Central Narrative Focal Anchor */}
      <div className="intro-main-content">
        <div className="incident-date-row font-mono">
          <span className="gold-dash"></span>
          <span>{caseMetadata.location.toUpperCase()} · {caseMetadata.year}</span>
        </div>

        <h1 className="intro-monumental-title font-headline">
          {caseMetadata.title.toUpperCase()}
        </h1>

        {/* Typewritten Incident Summary Card */}
        <div className="typewriter-ledger-card">
          <div className="card-top-tab"></div>

          <p className="ledger-quote font-headline">
            “<TypewriterText text={caseMetadata.synopsis} speed={20} />”
          </p>

          <p className="ledger-body font-mono">
            {caseMetadata.fullReportBody.split('\n\n')[0]}
          </p>

          {/* Quick Case Manifest Stats */}
          <div className="manifest-quick-stats font-mono">
            <div className="stat-pill">
              <Lock size={14} className="text-gold" />
              <span className="stat-label">SCENE:</span>
              <span className="stat-val">{caseMetadata.subtitle.toUpperCase()}</span>
            </div>
            <div className="stat-pill">
              <Users size={14} className="text-red" />
              <span className="stat-label">SUSPECTS:</span>
              <span className="stat-val">{suspectsList.length} REMAINING</span>
            </div>
            <div className="stat-pill">
              <Fingerprint size={14} className="text-green" />
              <span className="stat-label">LEADS:</span>
              <span className="stat-val">{evidenceList.length} UNRESOLVED</span>
            </div>
          </div>
        </div>

        {/* Action CTAs */}
        <div className="intro-action-bar font-mono">
          <button className="btn-enter-estate" onClick={handleEnterEstate}>
            <DoorOpen size={18} />
            <span>[ ENTER THE ESTATE ]</span>
          </button>

          <button className="btn-read-brief" onClick={handleOpenBrief}>
            <FileText size={16} />
            <span>[ READ CASE BRIEF ]</span>
          </button>

          <div className="audio-ambient-pill font-mono">
            <Volume2 size={16} className="text-gold" />
            <span>AUDIO: AMBIENT MONSOON (60 BPM)</span>
          </div>
        </div>
      </div>

      {/* Bottom Forensic Case Metadata Banner */}
      <div className="intro-bottom-banner font-mono">
        <div className="banner-left">
          <span className="label-title">DIFFICULTY:</span>
          <span className="label-val">{caseMetadata.difficulty}</span>
          <span className="divider">|</span>
          <span className="label-title">ESTIMATED RECONSTRUCTION:</span>
          <span className="label-val">{caseMetadata.estimatedDuration}</span>
        </div>

        <div className="banner-right">
          {caseMetadata.id === 'case-002' ? (
            <>
              <div className="marker-item">
                <span className="dot dot-green"></span>
                <span>DINNER ENDS: 20:15</span>
              </div>
              <div className="marker-item">
                <span className="dot dot-red"></span>
                <span>DOOR LOCKED: 21:03</span>
              </div>
              <div className="marker-item">
                <span className="dot dot-gold animate-pulse"></span>
                <span>AUDIBLE THUD: 21:42</span>
              </div>
            </>
          ) : (
            <>
              <div className="marker-item">
                <span className="dot dot-green"></span>
                <span>VITRINE SECURED: 21:00</span>
              </div>
              <div className="marker-item">
                <span className="dot dot-red"></span>
                <span>POWER FAULT: 22:30</span>
              </div>
              <div className="marker-item">
                <span className="dot dot-gold animate-pulse"></span>
                <span>THEFT DISCOVERED: 22:47</span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Interactive Case Brief Modal Overlay */}
      {showBriefModal && (
        <div className="brief-modal-backdrop animate-fade-in">
          <div className="brief-modal-card">
            <div className="modal-header">
              <div>
                <span className="modal-tag font-mono">OFFICIAL POLICE REPORT</span>
                <h2 className="modal-title font-headline">EXHIBIT A: PRELIMINARY SYNOPSIS</h2>
              </div>
              <button className="modal-close-btn font-mono" onClick={() => setShowBriefModal(false)}>
                [ESC / CLOSE] <X size={16} />
              </button>
            </div>

            <div className="modal-body font-mono">
              {caseMetadata.id === 'case-002' ? (
                <>
                  <p>
                    On the evening of 12 November 1895, Professor Adrian Cole was discovered unconscious inside his private study at Highland Estate during a heavy rainstorm. The solid Scottish oak door was bolted from the inside with a mortise deadbolt; the key remained turned in the interior keyway.
                  </p>
                  <p>
                    All double-hung sash windows were latched from within. At 21:42 GMT, a loud metallic thud was heard across the courtyard, prompting Butler Arthur Vance to break the door down with a crowbar at 21:50 GMT.
                  </p>
                  <p className="modal-highlight font-headline">
                    “The room was locked from within. How did the poisoning occur when entry appeared impossible, and why did the crime appear to occur at 21:42 when the culprit had an alibi?”
                  </p>
                </>
              ) : (
                <>
                  <p>
                    On the evening of 14 October, Lord Archibald Blackwood hosted an intimate gathering for four esteemed associates to present the 120-carat Queen of Solms necklace. The gem was contained in an armored glass vitrine with two keyed locks: Key A held by Lord Blackwood, Key B by his housekeeper, Victoria Vane.
                  </p>
                  <p>
                    At 22:30, lightning grounded the generator transformer. The entire manor was plunged into darkness for seventeen minutes. When power was restored at 22:47, the cabinet was unlocked, unmarred, and empty.
                  </p>
                  <p className="modal-highlight font-headline">
                    “No glass was shattered. No lock pins were forced with picks. The culprit possessed access to a key or crafted a duplicate.”
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
