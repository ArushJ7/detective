import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInvestigation } from '../../state/InvestigationContext';
import { Case002DoorInspection } from '../../components/game/Case002DoorInspection';
import { Case002DecoyInspection } from '../../components/game/Case002DecoyInspection';
import { Sparkles, ZoomIn, RotateCw, Contrast, Key, Pin, Edit3, X, CheckCircle2, ShieldAlert } from 'lucide-react';
import './EvidenceInspectionPage.css';

export const EvidenceInspectionPage: React.FC = () => {
  const { state, dispatch, discoveredEvidence, selectedEvidence } = useInvestigation();
  const navigate = useNavigate();

  const item = selectedEvidence || discoveredEvidence[0];

  if (state.activeCaseId === 'case-002' && (item?.id === 'EVD-201' || item?.id === 'EVD-202')) {
    return <Case002DoorInspection />;
  }

  if (state.activeCaseId === 'case-002' && (item?.id === 'EVD-208' || item?.id === 'EVD-209')) {
    return <Case002DecoyInspection />;
  }

  const [zoomLevel, setZoomLevel] = useState<'12.5X' | '25.0X'>('12.5X');
  const [rotationDegree, setRotationDegree] = useState<number>(0);
  const [uvActive, setUvActive] = useState<boolean>(state.uvModeActive);
  const [invertActive, setInvertActive] = useState<boolean>(false);
  const [showKeyComparison, setShowKeyComparison] = useState<boolean>(true);
  const [activeMarkerId, setActiveMarkerId] = useState<string>('obs-1');
  const [toastText, setToastText] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastText(msg);
    setTimeout(() => setToastText(null), 3000);
  };

  const handleToggleZoom = () => {
    const nextZoom = zoomLevel === '12.5X' ? '25.0X' : '12.5X';
    setZoomLevel(nextZoom);
    triggerToast(`Forensic Zoom set to ${nextZoom}.`);
  };

  const handleRotate = () => {
    const nextRot = (rotationDegree + 90) % 360;
    setRotationDegree(nextRot);
    triggerToast(`Specimen rotated to ${nextRot}°.`);
  };

  const handleToggleUV = () => {
    setUvActive(!uvActive);
    dispatch({ type: 'TOGGLE_UV_MODE', payload: !uvActive });
    triggerToast(!uvActive ? '365nm Ultraviolet Light Engaged.' : 'Raking White Light Restored.');
  };

  const handleToggleInvert = () => {
    setInvertActive(!invertActive);
    triggerToast(!invertActive ? 'High-contrast negative filter engaged.' : 'Standard contrast restored.');
  };

  const handlePinToBoard = () => {
    if (!item) return;
    dispatch({
      type: 'ADD_BOARD_CONNECTION',
      payload: {
        id: `pin-${Date.now()}`,
        sourceId: item.id,
        targetId: 'EVD-001',
        label: 'Lab Inspection Link'
      }
    });
    triggerToast(`Exhibit ${item.id} pinned to Evidence Board.`);
  };

  return (
    <div className="lab-inspection-page font-body">
      {/* Toast Notification */}
      {toastText && (
        <div className="lab-toast font-mono animate-fade-in">
          <CheckCircle2 size={16} className="text-gold" />
          <span>{toastText}</span>
        </div>
      )}

      {/* Roster Specimen Selector Strip */}
      <div className="specimen-roster-bar font-mono">
        <span className="roster-title">CATALOGED SPECIMENS ({discoveredEvidence.length}):</span>
        <div className="roster-pills-scroll">
          {discoveredEvidence.map(ev => (
            <button
              key={ev.id}
              className={`specimen-pill ${item?.id === ev.id ? 'active' : ''}`}
              onClick={() => dispatch({ type: 'SELECT_EVIDENCE', payload: ev.id })}
            >
              <span className="ev-id">{ev.id}</span>
              <span className="ev-name">{ev.title}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="lab-table-layout">
        {/* Left & Center: Forensic Macro Inspection Viewer */}
        <div className="lab-viewer-chamber">
          {/* Forensic HUD Status Banner */}
          <div className="lab-hud-banner font-mono">
            <div className="hud-left">
              <span className="beacon-dot animate-pulse"></span>
              <span className="hud-label text-gold">LAB BENCH 03 · ULTRA-MACRO CHROMATIC ANALYSIS</span>
              <span className="hud-slash">/</span>
              <span className="hud-specimen-id">SPECIMEN ID: {item?.id || 'EVD-001'}</span>
            </div>
            <div className="hud-right">
              <span>APERTURE: <strong className="text-gold">f/8.4</strong></span>
              <span>·</span>
              <span>SPECTRAL WAVELENGTH: <strong className="text-gold">{uvActive ? '365NM UV' : '580NM RAKING'}</strong></span>
              <span>·</span>
              <span>MAG: <strong className="text-gold">{zoomLevel}</strong></span>
            </div>
          </div>

          {/* Main Viewer Chamber */}
          <div className={`viewer-viewport-box ${invertActive ? 'filter-invert' : ''}`}>
            {/* Viewport Image Background */}
            <div
              className={`viewport-image-layer ${uvActive ? 'uv-active' : ''}`}
              style={{
                transform: `scale(${zoomLevel === '25.0X' ? 1.6 : 1}) rotate(${rotationDegree}deg)`
              }}
            >
              <div className="crosshair-reticle-grid"></div>

              {uvActive && (
                <div className="uv-fluorescent-overlay font-mono animate-pulse-uv">
                  <Sparkles size={20} />
                  <span>{item?.uvText || '365NM SPECTRUM: CHEMICAL RESIDUE & BRASS FILINGS DETECTED'}</span>
                </div>
              )}

              {/* Optical Crosshairs SVG */}
              <svg className="crosshairs-svg-overlay" viewBox="0 0 100 100" preserveAspectRatio="none">
                <circle cx="50%" cy="50%" r="28" fill="none" stroke="#e9c176" strokeWidth="0.5" opacity="0.4" />
                <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#e9c176" strokeDasharray="2 4" strokeWidth="0.3" opacity="0.4" />
                <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#e9c176" strokeDasharray="2 4" strokeWidth="0.3" opacity="0.4" />
              </svg>
            </div>

            {/* Reticle Callout Markers */}
            {item?.observations?.map((obs, idx) => (
              <div
                key={obs.id}
                className={`reticle-callout-pin callout-pos-${idx + 1} ${activeMarkerId === obs.id ? 'active' : ''}`}
                onClick={() => setActiveMarkerId(obs.id)}
              >
                <div className="callout-card font-mono">
                  <div className="callout-header">
                    <span className="callout-dot text-gold"></span>
                    <span className="callout-label">{obs.label}</span>
                  </div>
                  <p className="callout-text">{obs.text}</p>
                  {obs.detailText && <div className="callout-detail">{obs.detailText}</div>}
                </div>
              </div>
            ))}

            {/* Heirloom Key Comparison Inset */}
            {showKeyComparison && (
              <div className="key-comparison-inset font-mono animate-fade-in">
                <div className="inset-header">
                  <span className="text-gold">KEY COMPARISON OVERLAY</span>
                  <span className="text-tertiary">[BITTING MATCH 99.8%]</span>
                </div>
                <div className="key-silhouette-box">
                  <Key size={32} className="text-gold key-icon animate-pulse" />
                  <span className="key-match-stamp">MASTER KEY EK-09 ALIGNED</span>
                </div>
                <p className="key-inset-note">
                  Bitting matches master cabinet key. Ward clearance: 0.02mm variance.
                </p>
              </div>
            )}
          </div>

          {/* Inspection Toolbar */}
          <div className="lab-toolbar-strip font-mono">
            <div className="toolbar-left">
              <button className={`tool-btn ${zoomLevel === '25.0X' ? 'active' : ''}`} onClick={handleToggleZoom}>
                <ZoomIn size={14} />
                <span>ZOOM {zoomLevel}</span>
              </button>
              <button className="tool-btn" onClick={handleRotate}>
                <RotateCw size={14} />
                <span>ROTATE {rotationDegree}°</span>
              </button>
              <button className={`tool-btn ${uvActive ? 'active-uv' : ''}`} onClick={handleToggleUV}>
                <Sparkles size={14} />
                <span>UV SPECTRUM [365nm]</span>
              </button>
              <button className={`tool-btn ${invertActive ? 'active' : ''}`} onClick={handleToggleInvert}>
                <Contrast size={14} />
                <span>INVERT CONTRAST</span>
              </button>
            </div>

            <div className="toolbar-right">
              <button
                className={`tool-btn ${showKeyComparison ? 'active' : ''}`}
                onClick={() => setShowKeyComparison(!showKeyComparison)}
              >
                <Key size={14} />
                <span>COMPARE MASTER KEY</span>
              </button>
            </div>
          </div>

          {/* Forensic Metrics Strip */}
          <div className="lab-metrics-strip font-mono">
            <div className="metric-box">
              <span className="metric-title">TUMBLER WEAR INDEX</span>
              <span className="metric-value text-gold">0.03 mm</span>
              <span className="metric-sub">Uniform across 4 levers</span>
            </div>
            <div className="metric-box">
              <span className="metric-title">MECHANICAL RESISTANCE</span>
              <span className="metric-value text-green">NORMAL (FLUID)</span>
              <span className="metric-sub">Zero bind on ward lock</span>
            </div>
            <div className="metric-box">
              <span className="metric-title">PARTICLE COMPOSITION</span>
              <span className="metric-value text-red">64% Cu / 36% Zn</span>
              <span className="metric-sub">Commercial brass alloy</span>
            </div>
            <div className="metric-box">
              <span className="metric-title">GLASS INTEGRITY</span>
              <span className="metric-value text-white">100% INTACT</span>
              <span className="metric-sub">Mullions undisturbed</span>
            </div>
          </div>
        </div>

        {/* Right Panel: Archival Case Docket & Pathologist Report */}
        <aside className="lab-docket-panel">
          {/* Classified Docket Header Card */}
          <div className="docket-header-card">
            <div className="confidential-seal font-mono">
              CONFIDENTIAL // SY-EVID
            </div>
            <div className="docket-subtitle font-mono">
              SCOTLAND YARD METROPOLITAN FORENSICS
            </div>
            <h2 className="docket-main-title font-headline">{item?.tag || 'FORENSIC DOCKET EXHIBIT #01'}</h2>
            <div className="docket-case-tag font-mono">{item?.title}</div>

            <div className="docket-grid font-mono">
              <div>
                <span className="lbl">RECOVERED AT:</span>
                <span className="val">{item?.locationFound}</span>
              </div>
              <div>
                <span className="lbl">TIME DISCOVERED:</span>
                <span className="val">{item?.timeDiscovered}</span>
              </div>
              <div>
                <span className="lbl">CUSTODIAN:</span>
                <span className="val">Insp. R. Vance</span>
              </div>
              <div>
                <span className="lbl">FORCED ENTRY SIGNS:</span>
                <span className="val text-red font-bold">NEGATIVE (0.0%)</span>
              </div>
            </div>
          </div>

          {/* Expert Report Box */}
          <div className="expert-report-card">
            <div className="report-header font-mono">
              <ShieldAlert size={14} className="text-gold" />
              <span>EXPERT EXAMINATION REPORT</span>
            </div>
            <p className="report-text font-mono">{item?.description}</p>
            <p className="report-conclusion font-mono">
              <strong className="text-gold">Conclusion:</strong> {item?.detailedNotes}
            </p>
          </div>

          {/* Vance Deduction Log Card */}
          <div className="vance-log-card">
            <span className="log-title font-mono">INSP. VANCE'S FIELD LOG ENTRY</span>
            <p className="log-quote font-headline">
              "The lock wasn't forced... someone opened it who held the key during dinner. The thief never smashed a thing. They simply took the necklace, closed the cabinet doors, and relocked it from the front."
            </p>
          </div>

          {/* Action Deck Buttons */}
          <div className="lab-action-deck font-mono">
            <button className="btn-action-primary font-headline" onClick={handlePinToBoard}>
              <Pin size={16} />
              <span>[ PIN TO EVIDENCE BOARD ]</span>
            </button>

            <div className="action-row-dual">
              <button
                className="btn-action-secondary"
                onClick={() => {
                  if (!item) return;
                  dispatch({
                    type: 'ADD_NOTE',
                    payload: {
                      id: `note-${Date.now()}`,
                      type: 'evidence',
                      title: `Observation on ${item.id}`,
                      content: item.detailedNotes || item.description,
                      annotation: 'IMPORTANT',
                      createdAt: `${new Date().getHours().toString().padStart(2, '0')}:${new Date().getMinutes().toString().padStart(2, '0')} GMT`,
                      relatedEvidenceId: item.id
                    }
                  });
                  triggerToast(`Transcribed ${item.id} memo to Notebook.`);
                  navigate('/notebook');
                }}
              >
                <Edit3 size={14} />
                <span>ADD TO NOTEBOOK</span>
              </button>
              <button className="btn-action-secondary" onClick={() => navigate('/vault')}>
                <X size={14} />
                <span>RETURN TO VAULT</span>
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
