import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInvestigation } from '../../state/InvestigationContext';
import { Case002StudyScene } from '../../components/game/Case002StudyScene';
import { sfx } from '../../utils/audio';
import { Sparkles, Play, CheckCircle2, Eye, Pin, X, Search, Compass, AlertCircle } from 'lucide-react';
import './InvestigationScenePage.css';

interface SceneHotspotConfig {
  id: string; // matches evidence id (e.g. EVD-001)
  key: string;
  title: string;
  subtitle: string;
  coords: string;
  tag: string;
  left: string;
  top: string;
  pathologistNote: string;
  vanceDeduction: string;
  uvNote: string;
}

const SCENE_HOTSPOTS: SceneHotspotConfig[] = [
  {
    id: 'EVD-001',
    key: 'vitrine',
    title: 'The Vitrine Lock Mechanism',
    subtitle: 'Key cylinder unscratched · Glass intact',
    coords: 'SEC 03-EAST · POS 51.4921°N',
    tag: 'EXHIBIT #01-A · PRIME EVIDENCE',
    left: '54%',
    top: '42%',
    pathologistNote: 'The lock cylinder shows zero tool markings, gouges, or picks. Internal tumblers were depressed smoothly using an authorized key cast.',
    vanceDeduction: '"The lock was opened with a key cast... Lord Blackwood claimed James had the only copy on him. Did James lie, or was his pocket searched?"',
    uvNote: 'PETROLEUM JELLY & BRASS TUMBLER RESIDUE DETECTED'
  },
  {
    id: 'EVD-007',
    key: 'window',
    title: 'Arched Sash Window & Tweed Fiber',
    subtitle: 'Tweed fiber caught in brass sash lock',
    coords: 'SEC 01-WEST · POS 51.4920°N',
    tag: 'EXHIBIT #07-B · PERIMETER BREACH',
    left: '14%',
    top: '38%',
    pathologistNote: 'Sash window unlatched from interior and pushed ajar 3 inches. Coarse Harris tweed fiber caught in brass catch bolt.',
    vanceDeduction: '"The window was opened from inside to stage a terrace getaway... or to drop something to an outside accomplice in the rain."',
    uvNote: 'INDIGO DYE SPECTRUM MATCHES JAMES BLACKWOOD JACKET'
  },
  {
    id: 'EVD-006',
    key: 'carpet',
    title: 'Muddy Bespoke Shoe Print',
    subtitle: 'Fresh loamy earth · Heading Conservatory',
    coords: 'SEC 02-SOUTH · POS 51.4919°N',
    tag: 'EXHIBIT #06-C · TREAD IMPRESSION',
    left: '32%',
    top: '78%',
    pathologistNote: 'Partial size 11 Oxford dress boot tread impression in damp soil near basement stairwell door.',
    vanceDeduction: '"The tread matches high-end Bond Street footwear. Someone ran to the basement breaker right before the outage."',
    uvNote: 'FLUORESCENT BASEMENT DUST MATCHES BREAKER ROOM FLOOR'
  },
  {
    id: 'EVD-005',
    key: 'clock',
    title: 'Ormolu Mantel Clock',
    subtitle: 'FROZEN AT 21:24 BST',
    coords: 'SEC 02-NORTH · POS 51.4922°N',
    tag: 'EXHIBIT #05-D · CHRONOLOGY CLUE',
    left: '31%',
    top: '45%',
    pathologistNote: 'Pendulum stopped dead by electromagnetic surge when main breaker fuse tripped in basement at 21:24:02.',
    vanceDeduction: '"This fixes the exact minute of the blackout. The thief had 240 seconds before backup power engaged."',
    uvNote: 'MAGNETIC DISRUPTION STREAKS DETECTED ON COILS'
  },
  {
    id: 'EVD-002',
    key: 'flute',
    title: 'Shattered Champagne Flute',
    subtitle: 'Vintage crystal glass fragment',
    coords: 'SEC 04-EAST · POS 51.4918°N',
    tag: 'EXHIBIT #02-E · PHYSICAL GLASS',
    left: '78%',
    top: '68%',
    pathologistNote: 'Broken crystal glass near fireplace hearth. Smells of vintage Dom Pérignon with lip gloss residue on rim.',
    vanceDeduction: '"Dropped in sudden darkness when the lights failed. Indicates panic in the room at 21:24."',
    uvNote: 'LIP GLOSS SPECTROGRAPHY MATCHES ELEANOR BLACKWOOD'
  },
  {
    id: 'EVD-004',
    key: 'wax',
    title: 'Paraffin Wax Fragment',
    subtitle: 'Jeweler impression wax mold lump',
    coords: 'SEC 05-EAST · POS 51.4923°N',
    tag: 'EXHIBIT #04-F · FORENSIC WAX',
    left: '85%',
    top: '28%',
    pathologistNote: 'Small lump of pink jeweler wax tucked inside coat pocket. Chemically identical to residue inside Lock #04.',
    vanceDeduction: '"Thesmoking gun. Paraffin impressioning wax used to cast a duplicate vitrine key keyway."',
    uvNote: 'LATENT THUMBPRINT MATCHES J. BLACKWOOD OVERLAY'
  }
];

export const InvestigationScenePage: React.FC = () => {
  const { state, dispatch } = useInvestigation();
  const navigate = useNavigate();

  if (state.activeCaseId === 'case-002') {
    return <Case002StudyScene />;
  }

  const [inspectingHotspot, setInspectingHotspot] = useState<SceneHotspotConfig | null>(
    SCENE_HOTSPOTS[0]
  );
  const [drawerOpen, setDrawerOpen] = useState<boolean>(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [uvResidueActive, setUvResidueActive] = useState<boolean>(false);

  const handleSelectHotspot = (hotspot: SceneHotspotConfig) => {
    sfx.playReticle();
    setInspectingHotspot(hotspot);
    setDrawerOpen(true);

    const isNewlyDiscovered = !state.discoveredEvidenceIds.includes(hotspot.id);

    dispatch({ type: 'DISCOVER_EVIDENCE', payload: hotspot.id });
    dispatch({ type: 'INSPECT_EVIDENCE', payload: hotspot.id });

    if (isNewlyDiscovered) {
      setToastMessage(`NEW DISCOVERY: ${hotspot.id} — ${hotspot.title.toUpperCase()}`);
      setTimeout(() => setToastMessage(null), 4000);
    }
  };

  const handleExamineDetail = () => {
    sfx.playClick();
    if (inspectingHotspot) {
      dispatch({ type: 'SELECT_EVIDENCE', payload: inspectingHotspot.id });
      navigate('/inspection');
    }
  };

  const handlePinToBoard = () => {
    sfx.playPaper();
    if (inspectingHotspot) {
      dispatch({
        type: 'ADD_BOARD_CONNECTION',
        payload: {
          id: `pin-${Date.now()}`,
          sourceId: inspectingHotspot.id,
          targetId: 'EVD-001',
          label: 'Drawing Room Discovery'
        }
      });
      setToastMessage(`PINNED ${inspectingHotspot.id} TO EVIDENCE BOARD`);
      setTimeout(() => setToastMessage(null), 3000);
    }
  };

  return (
    <div className="scene-page-container font-body">
      {/* Toast Notification Popup */}
      {toastMessage && (
        <div className="scene-toast-popup animate-fade-in font-mono">
          <CheckCircle2 size={16} className="text-gold" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Drawing Room Viewport */}
      <div className="drawing-room-viewport">
        {/* Background Art Viewport */}
        <div className="viewport-art-backdrop">
          {/* Subtle Rain Streaks Overlay */}
          <svg className="rain-streaks-svg" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="rain-drops" width="120" height="240" patternUnits="userSpaceOnUse">
                <line x1="20" y1="0" x2="10" y2="70" stroke="#e9c176" strokeWidth="0.75" opacity="0.3" />
                <line x1="80" y1="40" x2="72" y2="130" stroke="#e0e3de" strokeWidth="0.5" opacity="0.4" />
                <line x1="110" y1="120" x2="102" y2="190" stroke="#9a8f80" strokeWidth="0.5" opacity="0.2" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#rain-drops)" />
          </svg>
        </div>

        {/* Top Tactical Ambient Directive Banner */}
        <div className="tactical-directive-banner font-mono">
          <div className="directive-left">
            <span className="ping-beacon"></span>
            <div className="directive-text-group">
              <span className="directive-tag">FIELD DIRECTIVE · 22:47 BST</span>
              <span className="directive-headline font-headline">
                "Reconstruct how the thief accessed the vitrine without breaking glass or tripping the hallway alarm."
              </span>
            </div>
          </div>

          <div className="diegetic-audio-player">
            <Play size={16} className="text-gold" />
            <div className="audio-info">
              <span className="audio-title">AUDIO LOG: 911 TAPE</span>
              <span className="audio-sub">0:48 / 1:42 · SCOTLAND YARD RECORDING</span>
            </div>
            <div className="waveform-bar font-mono">
              <span className="bar b1"></span>
              <span className="bar b2"></span>
              <span className="bar b3"></span>
              <span className="bar b4"></span>
            </div>
          </div>
        </div>

        {/* Interactive Crime Scene Hotspots */}
        {SCENE_HOTSPOTS.map(hotspot => {
          const isDiscovered = state.discoveredEvidenceIds.includes(hotspot.id);
          const isSelected = inspectingHotspot?.id === hotspot.id && drawerOpen;

          return (
            <div
              key={hotspot.id}
              className={`scene-hotspot-pin ${isSelected ? 'active' : ''} ${isDiscovered ? 'discovered' : 'new-clue'}`}
              style={{ left: hotspot.left, top: hotspot.top }}
              onClick={() => handleSelectHotspot(hotspot)}
            >
              <div className="hotspot-reticle">
                <span className="pulse-ring"></span>
                <span className="center-dot"></span>
                {!isDiscovered && <span className="new-badge-ping"></span>}
              </div>

              {/* Hover Micro-Tag */}
              <div className="hotspot-micro-tag font-mono">
                <div className="tag-top">
                  <span className="tag-action">[E] EXAMINE</span>
                  <span className="tag-title">{hotspot.title.toUpperCase()}</span>
                </div>
                <span className="tag-sub">{hotspot.subtitle}</span>
              </div>
            </div>
          );
        })}

        {/* Bottom Telemetry Bar */}
        <div className="scene-telemetry-bar font-mono">
          <div className="telemetry-item">
            <Compass size={14} className="text-gold" />
            <span>TEMP: 14.2°C · HUMIDITY 89%</span>
          </div>
          <span className="telemetry-divider">|</span>
          <div className="telemetry-item">
            <Search size={14} className="text-gold" />
            <span>DRAWING ROOM LIGHT: 0.8 LUX</span>
          </div>
          <span className="telemetry-divider">|</span>
          <div className="telemetry-item hint font-bold">
            <span>[CLICK HOTSPOTS TO INVESTIGATE SCENE]</span>
          </div>
        </div>

        {/* Diegetic Slide-Out Forensic Examination Tray */}
        {drawerOpen && inspectingHotspot && (
          <aside className="forensic-drawer-panel animate-fade-in font-mono">
            {/* Drawer Header */}
            <div className="drawer-header">
              <div className="drawer-exhibit-tag">
                <span className="tag-dot text-gold"></span>
                <span>{inspectingHotspot.tag}</span>
              </div>
              <button className="btn-close-drawer" onClick={() => setDrawerOpen(false)}>
                <span>[ESC]</span>
                <X size={16} />
              </button>
            </div>

            {/* Scrollable Drawer Body */}
            <div className="drawer-body">
              <div className="exhibit-title-block">
                <div className="coords-row">
                  <span className="tag-type">{inspectingHotspot.id}</span>
                  <span className="coords-val">{inspectingHotspot.coords}</span>
                </div>
                <h2 className="exhibit-title font-headline">{inspectingHotspot.title}</h2>
                <div className="exhibit-loc font-mono">LOCATION: DRAWING ROOM · BLACKWOOD ESTATE</div>
              </div>

              {/* Loupe Macro Inspection Viewer */}
              <div className="loupe-viewer-box">
                <div className={`loupe-image-frame ${state.uvModeActive || uvResidueActive ? 'uv-active' : ''}`}>
                  <div className="loupe-grid-reticle"></div>

                  {(state.uvModeActive || uvResidueActive) && (
                    <div className="uv-spectrum-overlay font-mono animate-pulse-uv">
                      <Sparkles size={16} />
                      <span>{inspectingHotspot.uvNote}</span>
                    </div>
                  )}

                  {/* Optical Crosshairs SVG */}
                  <svg className="crosshair-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <line x1="50" y1="0" x2="50" y2="100" stroke="#e9c176" strokeDasharray="2,2" strokeWidth="0.3" />
                    <line x1="0" y1="50" x2="100" y2="50" stroke="#e9c176" strokeDasharray="2,2" strokeWidth="0.3" />
                    <circle cx="50" cy="50" r="20" fill="none" stroke="#e9c176" strokeWidth="0.5" />
                  </svg>

                  <div className="magnification-badge font-mono">
                    <span className="dot-active"></span>
                    <span>MAGNIFICATION 12.5X</span>
                  </div>
                </div>

                <div className="loupe-footer font-mono">
                  <span>SPECTRUM: 365NM RAKING LIGHT</span>
                  <span>LAB: SCOTLAND YARD</span>
                </div>
              </div>

              {/* Forensic Notes */}
              <div className="pathologist-note-box">
                <div className="note-header font-mono">
                  <AlertCircle size={14} className="text-gold" />
                  <span>FORENSIC PATHOLOGIST NOTE</span>
                </div>
                <p className="note-text font-mono">{inspectingHotspot.pathologistNote}</p>
              </div>

              {/* Vance Deduction Log */}
              <div className="vance-log-box">
                <span className="log-tag font-mono">CONFIDENTIAL // VANCE'S DEDUCTION LOG</span>
                <p className="log-quote font-headline">{inspectingHotspot.vanceDeduction}</p>
              </div>

              {/* Action Bar */}
              <div className="drawer-actions font-mono">
                <div className="action-row-split">
                  <button
                    className={`btn-drawer-opt ${uvResidueActive ? 'active' : ''}`}
                    onClick={() => setUvResidueActive(!uvResidueActive)}
                  >
                    <Sparkles size={14} />
                    <span>{uvResidueActive ? 'UV ACTIVE' : 'REVEAL UV RESIDUE'}</span>
                  </button>

                  <button className="btn-drawer-opt" onClick={handlePinToBoard}>
                    <Pin size={14} />
                    <span>PIN TO BOARD</span>
                  </button>
                </div>

                <button className="btn-drawer-primary font-headline" onClick={handleExamineDetail}>
                  <Eye size={16} />
                  <span>EXAMINE IN FULL FORENSIC VITRINE</span>
                </button>
              </div>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
};
