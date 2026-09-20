import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInvestigation } from '../../state/InvestigationContext';
import { sfx } from '../../utils/audio';
import { Sparkles, ArrowLeft, Pin, CheckCircle2, AlertCircle, Zap, Droplet } from 'lucide-react';
import './Case003DynamoInspection.css';

export const Case003DynamoInspection: React.FC = () => {
  const { dispatch } = useInvestigation();
  const navigate = useNavigate();

  const [uvActive, setUvActive] = useState<boolean>(true);
  const [solventTested, setSolventTested] = useState<boolean>(false);
  const [toastText, setToastText] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastText(msg);
    setTimeout(() => setToastText(null), 3500);
  };

  const handleToggleUV = () => {
    sfx.playClick();
    setUvActive(!uvActive);
    triggerToast(!uvActive ? '365nm UV Spectrum Engaged — Graphite grease fluoresces.' : 'White raking light restored.');
  };

  const handleTestSolvent = () => {
    sfx.playClick();
    setSolventTested(true);
    triggerToast('Solvent Swab Test: Mineral Spirits (Restoration Grade Solvent) Confirmed.');
  };

  const handlePinToBoard = () => {
    sfx.playPaper();
    dispatch({
      type: 'ADD_BOARD_CONNECTION',
      payload: {
        id: `pin-${Date.now()}`,
        sourceId: 'EVD-302',
        targetId: 'EVD-307',
        label: 'Dynamo Graphite & Apron Solvent Match'
      }
    });
    triggerToast('EXHIBIT EVD-302 PINNED TO EVIDENCE BOARD');
  };

  return (
    <div className="dynamo-page-container font-body">
      {/* Toast Notification */}
      {toastText && (
        <div className="dynamo-toast font-mono animate-fade-in">
          <CheckCircle2 size={16} className="text-gold" />
          <span>{toastText}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="dynamo-header font-mono">
        <button className="btn-back font-mono" onClick={() => navigate('/scene')}>
          <ArrowLeft size={16} />
          <span>[ESC] RETURN TO GALLERY SCENE</span>
        </button>

        <div className="header-title-group">
          <span className="case-tag">EXHIBIT #EVD-302 · SUB-BASEMENT DYNAMO BREAKER</span>
          <h1 className="header-headline font-headline">INDUSTRIAL DC KNIFE SWITCH & GRAPHITE GREASE</h1>
        </div>

        <div className="header-right font-mono">
          <span className="status-badge text-gold">[PRIMARY BLACKOUT VECTOR]</span>
        </div>
      </div>

      {/* Main Forensic Examination Layout */}
      <div className="dynamo-content-grid">
        {/* Left: High-Precision Visual Macro Inspection Frame */}
        <div className="dynamo-visual-panel">
          <div className={`dynamo-macro-viewport ${uvActive ? 'uv-engaged' : ''}`}>
            {/* Grid Crosshairs Overlay */}
            <svg className="macro-crosshairs" viewBox="0 0 100 100" preserveAspectRatio="none">
              <line x1="50" y1="0" x2="50" y2="100" stroke="#e9c176" strokeDasharray="2,2" strokeWidth="0.3" />
              <line x1="0" y1="50" x2="100" y2="50" stroke="#e9c176" strokeDasharray="2,2" strokeWidth="0.3" />
              <circle cx="50" cy="50" r="28" fill="none" stroke="#e9c176" strokeWidth="0.4" />
            </svg>

            {/* Heavy Electrical Switch Art Representation */}
            <div className="knife-switch-art">
              <div className="switch-base-porcelain">
                <div className="blade-contact-pitted">
                  <div className="knife-blade open"></div>
                  {uvActive && (
                    <div className="graphite-fluorescence animate-pulse-uv font-mono">
                      <Sparkles size={18} />
                      <span>GRAPHITE GREASE & MINERAL SPIRITS TRACE DETECTED ON BLADE CONTACTS</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Specimen Telemetry Badge */}
            <div className="macro-badge font-mono">
              <span className="dot-live"></span>
              <span>MAGNIFICATION 25.0X · DYNAMO CELLAR SEC 05</span>
            </div>
          </div>

          {/* Interactive Inspection Controls Bar */}
          <div className="dynamo-controls-bar font-mono">
            <button className={`btn-ctrl ${uvActive ? 'active' : ''}`} onClick={handleToggleUV}>
              <Sparkles size={14} />
              <span>{uvActive ? '365NM UV ENGAGED' : 'ENGAGE 365NM UV LIGHT'}</span>
            </button>

            <button className={`btn-ctrl ${solventTested ? 'active' : ''}`} onClick={handleTestSolvent}>
              <Droplet size={14} />
              <span>{solventTested ? 'MINERAL SPIRITS CONFIRMED' : 'RUN SOLVENT SWAB TEST'}</span>
            </button>

            <button className="btn-ctrl" onClick={handlePinToBoard}>
              <Pin size={14} />
              <span>PIN TO EVIDENCE BOARD</span>
            </button>
          </div>
        </div>

        {/* Right: Analytical Forensic Findings & Vance Deduction Log */}
        <div className="dynamo-analysis-panel font-mono">
          <div className="panel-section-box">
            <div className="box-title text-gold font-mono">
              <Zap size={16} />
              <span>SPECIMEN CATALOG: EXHIBIT #EVD-302</span>
            </div>
            <p className="box-desc">
              Main 200-amp direct-current knife switch on the gas-engine dynamo switchboard in the Sub-Basement Electrical Cellar.
            </p>
          </div>

          <div className="panel-section-box">
            <div className="box-title text-gold font-mono">
              <AlertCircle size={16} />
              <span>FORENSIC PATHOLOGIST OBSERVATIONS</span>
            </div>
            <ul className="obs-list font-mono">
              <li>
                <strong className="text-gold">1. Manual Breaker Trip:</strong> The heavy copper knife switch was pulled open cleanly by hand at 21:18 GMT, not tripped by an automatic thermal overload surge.
              </li>
              <li>
                <strong className="text-gold">2. Graphite Grease Friction Reduction:</strong> Copper blade contacts exhibit a thin coating of graphite grease used to eliminate switch friction noise when pulling the lever quickly in darkness.
              </li>
              <li>
                <strong className="text-gold">3. Mineral Spirits Solvent Scent:</strong> Chemical swab analysis confirms mineral spirits (restoration grade solvent) mixed with the graphite grease, matching stains on Curator Vance\'s apron EVD-307.
              </li>
            </ul>
          </div>

          <div className="panel-deduction-box">
            <span className="deduction-tag font-mono">INSP. VANCE FIELD DEDUCTION LOG</span>
            <p className="deduction-text font-headline">
              “The blackout at 21:18 GMT was an inside job. The thief knew the sub-basement switchboard layout, coated the knife switch with graphite grease to pull it silently, and disabled the primary DC arc lamps and low-voltage frame alarm circuit in one motion.”
            </p>
          </div>

          <div className="panel-footer-actions">
            <button className="btn-primary-action font-headline" onClick={() => navigate('/scene')}>
              <span>PROCEED TO GALLERY CRIME SCENE RECONSTRUCTION</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
