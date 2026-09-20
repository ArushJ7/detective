import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInvestigation } from '../../state/InvestigationContext';
import { sfx } from '../../utils/audio';
import {
  ZoomIn,
  Sun,
  Layers,
  Pin,
  Edit3,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  FileText,
  HelpCircle
} from 'lucide-react';
import './Case002DoorInspection.css';

export const Case002DoorInspection: React.FC = () => {
  const navigate = useNavigate();
  const { dispatch } = useInvestigation();

  const [isZoomed, setIsZoomed] = useState<boolean>(false);
  const [isRaking, setIsRaking] = useState<boolean>(true);
  const [activePin, setActivePin] = useState<'A1' | 'B2' | 'C3' | null>('A1');
  const [pinnedAlert, setPinnedAlert] = useState<boolean>(false);

  const handleToggleZoom = () => {
    sfx.playClick();
    setIsZoomed(!isZoomed);
  };

  const handleToggleRaking = () => {
    sfx.playClick();
    setIsRaking(!isRaking);
  };

  const handlePinClues = () => {
    sfx.playPaper();
    dispatch({
      type: 'ADD_BOARD_CONNECTION',
      payload: {
        id: `pin-door-${Date.now()}`,
        sourceId: 'EVD-201',
        targetId: 'EVD-202',
        label: 'Mortise & Interior Key Lock Seal'
      }
    });
    setPinnedAlert(true);
    setTimeout(() => setPinnedAlert(false), 3000);
  };

  const handleAddNote = () => {
    sfx.playClick();
    dispatch({
      type: 'ADD_NOTE',
      payload: {
        id: `note-door-${Date.now()}`,
        type: 'theory',
        title: 'Mortise Lock Egress Paradox',
        content: 'The Chubb mortise deadbolt was locked strictly from within (EVD-201) with the key left inside (EVD-202). The culprit could not have locked the door from outside.',
        annotation: 'CONTRADICTION',
        createdAt: '22:30 GMT',
        relatedEvidenceId: 'EVD-201'
      }
    });
    navigate('/notebook');
  };

  return (
    <div className="door-inspect-page font-body">
      {/* Top Specimen Banner */}
      <div className="door-banner font-mono">
        <div className="banner-left">
          <span className="specimen-badge">SPECIMEN ARCHIVE // EVD-201 & EVD-202</span>
          <div className="title-stack">
            <h1 className="banner-title font-headline">LAB BENCH: STUDY MORTISE & INTERIOR KEY</h1>
            <span className="banner-sub">OPTICAL MICROMETRY & METALLURGICAL VERIFICATION · RIG-04</span>
          </div>
        </div>

        <div className="banner-right font-mono">
          <div className="verified-pill">
            <ShieldCheck size={14} className="text-gold" />
            <span>INTEGRITY VERIFIED: SEALED FROM WITHIN</span>
          </div>
          <span className="status-badge">IN SITU RECORD</span>
        </div>
      </div>

      {/* Main Two-Column Workbench */}
      <div className="door-workbench-grid">
        {/* Left Column: Macro Photomicrograph Frame (7 cols) */}
        <div className="door-viewport-column">
          <div className="door-macro-frame">
            {/* Specimen Photo Layer */}
            <div className={`macro-image-holder ${isZoomed ? 'zoomed' : ''} ${isRaking ? 'raking' : 'diffuse'}`}>
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuARd4UxNWFu0IcVJhxfGyRWNOUb1DioJSSiYg67ag8lPf65uHjwUFlgIIPWRLQrXc5zvdDpHnri4ZHc374yMfL_ynK-nLFVCFCHUZQVv3MQ5K0qedN1-MJxQnDZbVichG8fdGJAqTdod95CE3rH7LfG8y_Cg3AB3GkMu6ZXdV5w87iX9sQe4_OYwE0t28kIoPrWEluNTDByc58cl7yViP_QoOXwy9Q07QNW9HiPMKzQFGuCnXFLvf35Ng"
                alt="Forensic macro photograph of mortise deadbolt and interior key"
                className="specimen-img"
              />

              {/* Forensic Metric Grid */}
              <svg className="grid-overlay-svg" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="doorGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e9c176" strokeWidth="0.5" strokeDasharray="2 4" opacity="0.3" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#doorGrid)" />
                <circle cx="50%" cy="50%" r="48" fill="none" stroke="#e9c176" strokeWidth="0.75" strokeDasharray="4 2" opacity="0.4" />
                <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#e9c176" strokeWidth="0.5" strokeDasharray="2 6" opacity="0.4" />
                <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#e9c176" strokeWidth="0.5" strokeDasharray="2 6" opacity="0.4" />
              </svg>

              {/* Pin A1: Mortise Deadbolt */}
              <div
                className={`target-pin pin-a1 ${activePin === 'A1' ? 'active' : ''}`}
                onClick={() => setActivePin('A1')}
              >
                <button className="pin-btn">A1</button>
                {activePin === 'A1' && (
                  <div className="pin-popover font-mono animate-fade-in">
                    <div className="pop-top">
                      <span className="pop-title">EVD-201 // MORTISE DEADBOLT</span>
                      <span className="pop-status">EXTENDED</span>
                    </div>
                    <p className="pop-body">
                      Forged steel bolt fully extended 24mm. Fractured oak fibers indicate outward mechanical violence from hall crowbar. Bolt was ENGAGED at impact.
                    </p>
                  </div>
                )}
              </div>

              {/* Pin B2: Interior Keyway */}
              <div
                className={`target-pin pin-b2 ${activePin === 'B2' ? 'active' : ''}`}
                onClick={() => setActivePin('B2')}
              >
                <button className="pin-btn b2">B2</button>
                {activePin === 'B2' && (
                  <div className="pin-popover font-mono animate-fade-in">
                    <div className="pop-top">
                      <span className="pop-title text-secondary">EVD-202 // INTERIOR KEYWAY</span>
                      <span className="pop-status red">NO PICK MARKS</span>
                    </div>
                    <p className="pop-body">
                      Heavy cast brass key seated horizontally in interior escutcheon. No pick scratches or torque marks on barrel collar. Reverse keyway blocked from hall.
                    </p>
                  </div>
                )}
              </div>

              {/* Pin C3: Splintered Strike Plate */}
              <div
                className={`target-pin pin-c3 ${activePin === 'C3' ? 'active' : ''}`}
                onClick={() => setActivePin('C3')}
              >
                <button className="pin-btn c3">C3</button>
                {activePin === 'C3' && (
                  <div className="pin-popover font-mono animate-fade-in">
                    <div className="pop-top">
                      <span className="pop-title text-tertiary">STRIKE PLATE SHEAR</span>
                      <span className="pop-status">42° ANGLE</span>
                    </div>
                    <p className="pop-body">
                      High shear angle on mounting screws confirms deadbolt was completely thrown into locked position prior to door breach at 21:50 GMT.
                    </p>
                  </div>
                )}
              </div>

              {/* Readout Overlay */}
              <div className="optical-readout font-mono">
                <span className="dot animate-ping"></span>
                <span>
                  FIELD: {isZoomed ? '16.0X MACRO' : '1.0X STANDARD'} · LIGHT: {isRaking ? '35° RAKING' : 'DIFFUSE'}
                </span>
              </div>
            </div>

            {/* Vernier Metric Ruler Footer */}
            <div className="vernier-scale font-mono">
              <span>0 mm</span>
              <span className="scale-center">◄ VERNIER CALIBRATION 50mm SCALE (±0.02mm) ►</span>
              <span>50 mm</span>
            </div>
          </div>

          {/* Controls Toolbar */}
          <div className="door-toolbar font-mono">
            <div className="tool-group">
              <button className={`tool-btn ${isZoomed ? 'active' : ''}`} onClick={handleToggleZoom}>
                <ZoomIn size={14} />
                <span>{isZoomed ? 'ZOOM 1.0X' : 'ZOOM 16X'}</span>
              </button>
              <button className={`tool-btn ${isRaking ? 'active' : ''}`} onClick={handleToggleRaking}>
                <Sun size={14} />
                <span>RAKING LIGHT: {isRaking ? 'ON' : 'OFF'}</span>
              </button>
            </div>

            <div className="tool-group">
              <button
                className="tool-btn"
                onClick={() => alert('CALIPERS: Deadbolt throw depth = 24.32mm. Zero lateral play detected.')}
              >
                <Layers size={14} />
                <span>COMPARE MASTER BLANK</span>
              </button>
            </div>
          </div>

          {/* Mini Evidence Cards Row */}
          <div className="mini-cards-grid font-mono">
            <div className="mini-card">
              <div className="card-head">
                <span>EVD-201</span>
                <span className="text-gold">MORTISE THROW</span>
              </div>
              <div className="card-val font-headline">Extracted Deadbolt</div>
              <p className="card-desc">Bevel wear aligns with counter-clockwise interior throw motion.</p>
            </div>

            <div className="mini-card">
              <div className="card-head">
                <span>EVD-202</span>
                <span className="text-secondary">TRAPPED KEY</span>
              </div>
              <div className="card-val font-headline">Interior Master Key</div>
              <p className="card-desc">Remained 100% engaged, blocking exterior key insertion.</p>
            </div>

            <div className="mini-card">
              <div className="card-head">
                <span>JAMB-04</span>
                <span className="text-tertiary">STRIKE SHEAR</span>
              </div>
              <div className="card-val font-headline">Oak Jamb Breach</div>
              <p className="card-desc">Catastrophic fiber failure caused by hallway crowbar at 21:50 GMT.</p>
            </div>
          </div>
        </div>

        {/* Right Column: Metropolitan Police Forensic Report (5 cols) */}
        <aside className="door-docket-column">
          <div className="docket-card font-mono">
            {/* Header */}
            <div className="docket-card-header">
              <div>
                <span className="org-label">METROPOLITAN POLICE ARCHIVES · SPECIAL BRANCH</span>
                <h2 className="docket-heading font-headline">MECHANICAL FORENSICS DOCKET</h2>
                <span className="docket-ref">RECORD REF: SY-1895-CR-002 // EVD-201 & EVD-202</span>
              </div>
              <div className="stamp-box">LOCKED FROM WITHIN</div>
            </div>

            {/* Metadata Table */}
            <div className="meta-grid">
              <div>
                <span className="lbl">INQUIRER:</span>
                <span className="val">Insp. R. Vance</span>
              </div>
              <div>
                <span className="lbl">EXAMINED:</span>
                <span className="val">22:30 GMT · Oct 14</span>
              </div>
              <div>
                <span className="lbl">MECHANISM:</span>
                <span className="val">Chubb 4-Lever Brass Mortise</span>
              </div>
              <div>
                <span className="lbl">FORCED ENTRY:</span>
                <span className="val text-red">CONFIRMED (CROWBAR)</span>
              </div>
            </div>

            {/* Locksmith findings */}
            <div className="report-block">
              <div className="block-title text-gold">
                <FileText size={14} />
                <span>TECHNICAL LOCKSMITH FINDINGS</span>
              </div>
              <p className="block-text italic font-body">
                “Metallurgical analysis confirms the mortise deadbolt was thrown exclusively from the interior study side. The key remains trapped in the lock cylinder. Wire-turning from the exterior keyhole is mechanically impossible due to the solid escutcheon warding.”
              </p>
            </div>

            {/* Contradiction Box */}
            <div className="contradiction-callout-box">
              <div className="box-title text-gold">
                <HelpCircle size={16} />
                <span>THE CORE INVESTIGATIVE PARADOX</span>
              </div>
              <p className="box-headline font-headline text-gold">
                “IF THE HEAVY DOOR WAS SECURED FROM WITHIN AND THE KEY WAS NEVER EXTRACTED, HOW DID THE POISONER DELIVER THE TOXIC AGENT AND DEPART?”
              </p>
              <span className="box-foot text-tertiary">PARADOX DETECTED: SPATIAL INTEGRITY SECURED</span>
            </div>

            {/* Vance Memorandum */}
            <div className="vance-memo-card">
              <div className="memo-head">
                <span className="text-tertiary">INSPECTOR VANCE FIELD JOURNAL</span>
                <span>10:42 PM</span>
              </div>
              <p className="memo-body font-headline">
                “The door didn’t deceive us — it was truly locked by Cole himself at 21:03. Therefore, our assumption about WHEN the attack occurred must be flawed...”
              </p>
            </div>

            {/* Action buttons */}
            <div className="docket-actions">
              {pinnedAlert && (
                <div className="pinned-alert font-mono">
                  <CheckCircle2 size={14} className="text-gold" />
                  <span>EVD-201 & EVD-202 PINNED TO BOARD</span>
                </div>
              )}

              <button className="btn-pin-clues" onClick={handlePinClues}>
                <Pin size={14} />
                <span>[ PIN EVD-201 & EVD-202 TO BOARD ]</span>
              </button>

              <div className="btn-dual-row">
                <button className="btn-sub" onClick={handleAddNote}>
                  <Edit3 size={14} />
                  <span>RECORD NOTE</span>
                </button>
                <button className="btn-sub" onClick={() => navigate('/scene')}>
                  <ArrowLeft size={14} />
                  <span>RETURN TO STUDY</span>
                </button>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
