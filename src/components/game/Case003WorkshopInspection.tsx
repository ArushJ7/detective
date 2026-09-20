import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInvestigation } from '../../state/InvestigationContext';
import { sfx } from '../../utils/audio';
import { ArrowLeft, Pin, CheckCircle2, AlertCircle, VolumeX, Archive, ShieldCheck } from 'lucide-react';
import './Case003WorkshopInspection.css';

export const Case003WorkshopInspection: React.FC = () => {
  const { dispatch } = useInvestigation();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'door' | 'cylinder'>('door');
  const [acousticTested, setAcousticTested] = useState<boolean>(false);
  const [cylinderOpened, setCylinderOpened] = useState<boolean>(false);
  const [toastText, setToastText] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastText(msg);
    setTimeout(() => setToastText(null), 3500);
  };

  const handleRunAcousticTest = () => {
    sfx.playClick();
    setAcousticTested(true);
    triggerToast('Acoustic Decibel Test: 48 dB attenuation confirmed. Hall chimes inaudible inside locked room.');
  };

  const handleOpenCylinder = () => {
    sfx.playClick();
    setCylinderOpened(true);
    triggerToast('Storage Cylinder Opened: Master canvas of "The Astronomical Quadrant" recovered intact!');
  };

  const handlePinToBoard = () => {
    sfx.playPaper();
    const sourceId = activeTab === 'door' ? 'EVD-305' : 'EVD-306';
    const label = activeTab === 'door' ? 'Acoustic Soundproof Disproof' : 'Recovered Stolen Canvas';

    dispatch({
      type: 'ADD_BOARD_CONNECTION',
      payload: {
        id: `pin-${Date.now()}`,
        sourceId,
        targetId: 'EVD-301',
        label
      }
    });
    triggerToast(`EXHIBIT ${sourceId} PINNED TO EVIDENCE BOARD`);
  };

  return (
    <div className="workshop-page-container font-body">
      {/* Toast Notification */}
      {toastText && (
        <div className="workshop-toast font-mono animate-fade-in">
          <CheckCircle2 size={16} className="text-gold" />
          <span>{toastText}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="workshop-header font-mono">
        <button className="btn-back font-mono" onClick={() => navigate('/scene')}>
          <ArrowLeft size={16} />
          <span>[ESC] RETURN TO GALLERY SCENE</span>
        </button>

        <div className="header-title-group">
          <span className="case-tag">EXHIBIT #EVD-305 & EVD-306 · RESTORATION WORKSHOP</span>
          <h1 className="header-headline font-headline">RESTORATION ROOM DOOR & STORAGE CAVITY</h1>
        </div>

        <div className="header-right font-mono">
          <span className="status-badge text-gold">[DECISIVE ALIBI & CANVAS RECOVERY]</span>
        </div>
      </div>

      {/* Tab Selector Strip */}
      <div className="workshop-tab-strip font-mono">
        <button
          className={`tab-btn ${activeTab === 'door' ? 'active' : ''}`}
          onClick={() => setActiveTab('door')}
        >
          <VolumeX size={16} />
          <span>EVD-305: ACOUSTIC DOOR TEST</span>
        </button>

        <button
          className={`tab-btn ${activeTab === 'cylinder' ? 'active' : ''}`}
          onClick={() => setActiveTab('cylinder')}
        >
          <Archive size={16} />
          <span>EVD-306: HOLLOW BRASS STORAGE CYLINDER</span>
        </button>
      </div>

      {/* Main Content View */}
      {activeTab === 'door' ? (
        <div className="workshop-content-grid font-mono">
          {/* Left: Acoustic Door Frame */}
          <div className="workshop-visual-panel">
            <div className="workshop-macro-viewport">
              <svg className="macro-crosshairs" viewBox="0 0 100 100" preserveAspectRatio="none">
                <line x1="50" y1="0" x2="50" y2="100" stroke="#e9c176" strokeDasharray="2,2" strokeWidth="0.3" />
                <line x1="0" y1="50" x2="100" y2="50" stroke="#e9c176" strokeDasharray="2,2" strokeWidth="0.3" />
              </svg>

              <div className="door-acoustic-art">
                <div className="padded-oak-door">
                  <div className="felt-seal-edge"></div>
                  {acousticTested && (
                    <div className="db-meter-overlay font-mono animate-fade-in">
                      <VolumeX size={24} className="text-gold" />
                      <span className="db-readout font-bold text-gold">48 dB SOUND ATTENUATION</span>
                      <span className="db-sub">HALL GONG (32 dB INSIDE) = INAUDIBLE</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="macro-badge font-mono">
                <span className="dot-live"></span>
                <span>ACOUSTIC ISOLATION LAB · RESTORATION ROOM DOOR</span>
              </div>
            </div>

            <div className="workshop-controls-bar font-mono">
              <button className={`btn-ctrl ${acousticTested ? 'active' : ''}`} onClick={handleRunAcousticTest}>
                <VolumeX size={14} />
                <span>{acousticTested ? '48 dB ATTENUATION CONFIRMED' : 'RUN ACOUSTIC DECIBEL TEST'}</span>
              </button>

              <button className="btn-ctrl" onClick={handlePinToBoard}>
                <Pin size={14} />
                <span>PIN EVD-305 TO BOARD</span>
              </button>
            </div>
          </div>

          {/* Right: Analysis */}
          <div className="workshop-analysis-panel font-mono">
            <div className="panel-section-box">
              <div className="box-title text-gold font-mono">
                <VolumeX size={16} />
                <span>EXHIBIT #EVD-305: ACOUSTIC SOUNDPROOFING TEST</span>
              </div>
              <p className="box-desc">
                Heavy double-thickness Scottish oak door fitted with perimeter felt draft seals and internal cork acoustic core.
              </p>
            </div>

            <div className="panel-section-box">
              <div className="box-title text-gold font-mono">
                <AlertCircle size={16} />
                <span>CRITICAL ALIBI DISPROOF</span>
              </div>
              <ul className="obs-list font-mono">
                <li>
                  <strong className="text-gold">1. 48 dB Sound Isolation:</strong> Acoustic measurements prove the sealed door attenuates external sound by over 48 decibels.
                </li>
                <li>
                  <strong className="text-gold">2. Inaudible Hall Gong:</strong> An 80 dB hall gong reduces to less than 32 dB inside the locked room—well below ambient background noise.
                </li>
                <li>
                  <strong className="text-gold">3. Vance's False Claim:</strong> Vance swore he heard the 21:24 GMT emergency gong from inside the locked room. Acoustic proof demonstrates he could NOT have heard it from inside!
                </li>
              </ul>
            </div>

            <div className="panel-deduction-box">
              <span className="deduction-tag font-mono">INSP. VANCE FIELD DEDUCTION LOG</span>
              <p className="deduction-text font-headline">
                “This is the decisive contradiction. Vance claims he was locked inside the Restoration Room when he heard the 21:24 GMT chime. But the room is soundproof! He fabricated hearing the chime because he was actually outside in the hall removing the painting!”
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="workshop-content-grid font-mono">
          {/* Left: Chemical Cylinder Frame */}
          <div className="workshop-visual-panel">
            <div className="workshop-macro-viewport">
              <svg className="macro-crosshairs" viewBox="0 0 100 100" preserveAspectRatio="none">
                <line x1="50" y1="0" x2="50" y2="100" stroke="#e9c176" strokeDasharray="2,2" strokeWidth="0.3" />
                <line x1="0" y1="50" x2="100" y2="50" stroke="#e9c176" strokeDasharray="2,2" strokeWidth="0.3" />
              </svg>

              <div className="cylinder-art">
                <div className="brass-cylinder-container">
                  {cylinderOpened ? (
                    <div className="canvas-revealed font-mono animate-fade-in">
                      <ShieldCheck size={28} className="text-gold mb-2" />
                      <span className="font-bold text-gold">STOLEN CANVAS RECOVERED</span>
                      <span className="text-sm italic">"The Astronomical Quadrant of Tycho Brahe" (1888)</span>
                      <span className="text-xs text-on-surface-variant mt-1">Wrapped in oiled silk · Undamaged condition</span>
                    </div>
                  ) : (
                    <div className="brass-cylinder-sealed font-mono">
                      <Archive size={28} className="text-gold mb-2" />
                      <span>SEALED BRASS CHEMICAL CYLINDER</span>
                      <span className="text-xs text-outline">Labeled: "Refined Spirits of Turpentine"</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="macro-badge font-mono">
                <span className="dot-live"></span>
                <span>WALL CAVITY INSPECTION · RESTORATION ALCOVE</span>
              </div>
            </div>

            <div className="workshop-controls-bar font-mono">
              <button className={`btn-ctrl ${cylinderOpened ? 'active' : ''}`} onClick={handleOpenCylinder}>
                <Archive size={14} />
                <span>{cylinderOpened ? 'CANVAS RECOVERED' : 'UNSEAL BRASS STORAGE CYLINDER'}</span>
              </button>

              <button className="btn-ctrl" onClick={handlePinToBoard}>
                <Pin size={14} />
                <span>PIN EVD-306 TO BOARD</span>
              </button>
            </div>
          </div>

          {/* Right: Cylinder Analysis */}
          <div className="workshop-analysis-panel font-mono">
            <div className="panel-section-box">
              <div className="box-title text-gold font-mono">
                <Archive size={16} />
                <span>EXHIBIT #EVD-306: HOLLOW BRASS STORAGE CYLINDER</span>
              </div>
              <p className="box-desc">
                4-foot polished brass storage cylinder tucked into a recessed wall cavity behind Vance\'s restoration workbench.
              </p>
            </div>

            <div className="panel-section-box">
              <div className="box-title text-gold font-mono">
                <AlertCircle size={16} />
                <span>RECOVERED ASSET ANALYSIS</span>
              </div>
              <ul className="obs-list font-mono">
                <li>
                  <strong className="text-gold">1. Fake Solvent Label:</strong> Labeled "Refined Spirits of Turpentine", but contains zero liquid solvent inside.
                </li>
                <li>
                  <strong className="text-gold">2. Intact Canvas Recovery:</strong> Contains the rolled original oil canvas of Tycho Brahe\'s Quadrant wrapped tightly in protective oiled silk.
                </li>
                <li>
                  <strong className="text-gold">3. Conclusive Physical Link:</strong> Stored in Vance\'s private alcove, proving the stolen artwork never left the gallery building.
                </li>
              </ul>
            </div>

            <div className="panel-deduction-box">
              <span className="deduction-tag font-mono">INSP. VANCE FIELD DEDUCTION LOG</span>
              <p className="deduction-text font-headline">
                “Case closed. Vance rolled the canvas during the 12-minute blackout, wrapped it in silk, and stashed it inside this hollow brass cylinder to smuggle out after midnight.”
              </p>
            </div>

            <div className="panel-footer-actions">
              <button className="btn-primary-action font-headline" onClick={() => navigate('/deduction')}>
                <span>PROCEED TO FINAL DEDUCTION</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
