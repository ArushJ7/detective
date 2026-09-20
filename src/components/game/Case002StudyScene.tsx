import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInvestigation } from '../../state/InvestigationContext';
import { sfx } from '../../utils/audio';
import { Sparkles, CheckCircle2, Eye, Pin, X, Search, Compass, AlertCircle } from 'lucide-react';
import './Case002StudyScene.css';

export interface StudyHotspot {
  id: string; // matches EVD-201..214
  key: string;
  title: string;
  subtitle: string;
  category: string;
  exhibitTag: string;
  left: string;
  top: string;
  coords: string;
  pathologistNote: string;
  vanceDeduction: string;
  uvNote: string;
  obs1: string;
  obs2: string;
}

const STUDY_HOTSPOTS: StudyHotspot[] = [
  {
    id: 'EVD-201',
    key: 'door',
    title: 'STUDY DOOR & SPLINTERED JAMB',
    subtitle: 'Mortise deadbolt fully extended · Exterior forced jamb',
    category: 'PHYSICAL ENTRYWAY // POINT OF ACCESS',
    exhibitTag: 'EXHIBIT 01-A',
    left: '8%',
    top: '34%',
    coords: 'SEC 01-WEST · POS 57.1497°N',
    pathologistNote: 'Wood splinters and sheared strike plate confirm external force (crowbar) applied by Butler Vance at 21:50 GMT.',
    vanceDeduction: '“The heavy forged deadbolt was thrown completely into the receiver plate from the INSIDE when entry was forced.”',
    uvNote: 'FORCE VECTOR IMPRESSIONS MATCH CORRIDOR CROWBAR',
    obs1: 'Splintered wood fibers demonstrate the heavy solid oak door was forced inward from the hallway corridor after hearing the 21:42 thud.',
    obs2: 'The heavy forged deadbolt remained thrown completely into the receiver plate from the INSIDE at the moment of failure.'
  },
  {
    id: 'EVD-202',
    key: 'keyhole',
    title: 'INTERIOR KEYWAY & SEATED KEY',
    subtitle: 'Brass key turned 90° in interior escutcheon',
    category: 'LOCK MECHANISM // INTERIOR ANOMALY',
    exhibitTag: 'EXHIBIT 01-B',
    left: '11%',
    top: '46%',
    coords: 'SEC 01-WEST · POS 57.1497°N',
    pathologistNote: 'The authentic brass key remains inserted in the study-side lock barrel, blocking exterior key operation.',
    vanceDeduction: '“If the key never left the inside lock, how could a second person lock the door from outside?”',
    uvNote: 'ZERO WIRE OR PICK MARKS DETECTED ON KEY COLLAR',
    obs1: 'The authentic brass ward key was discovered securely seated in the study-facing keyway, rotated 90 degrees.',
    obs2: 'Exterior key engagement is mechanically blocked by the seated interior key barrel.'
  },
  {
    id: 'EVD-203',
    key: 'desk',
    title: 'MAHOGANY WRITING DESK',
    subtitle: 'Unfinished Royal Society letter exposing patent theft',
    category: 'CORRESPONDENCE // RESEARCH RECORDS',
    exhibitTag: 'EXHIBIT 02-C',
    left: '44%',
    top: '62%',
    coords: 'SEC 02-CENTER · POS 57.1498°N',
    pathologistNote: 'Ink blotter shows sudden tremor mid-sentence at 21:10 GMT as neuromuscular paralysis began.',
    vanceDeduction: '“Cole was writing a formal exposure of Dr. Reed to the Royal Society Vice President when his hand failed.”',
    uvNote: 'SMEARED INK SPECTRUM CONTAINS ACIDIC ALKALOID TRACES',
    obs1: 'An unfinished manuscript intended for the Royal Society titled "On Synthetic Alkaloids" explicitly accusing Dr. Reed.',
    obs2: 'The inkwell is fresh, trailing off in a jagged downward stroke across parchment.'
  },
  {
    id: 'EVD-204',
    key: 'stamp',
    title: 'BRASS SEAL STAMP & RESIDUE',
    subtitle: 'Ebony handle with oily neurotoxic film & crest print',
    category: 'CHEMICAL TRACE // FORENSIC MARK',
    exhibitTag: 'EXHIBIT 02-D',
    left: '48%',
    top: '72%',
    coords: 'SEC 02-CENTER · POS 57.1498°N',
    pathologistNote: 'Primary poisoning vector: brass stamp handle retains transdermal neurotoxin reagent.',
    vanceDeduction: '“A tactile trap. Dr. Reed coated the handle at 20:30 so Cole would poison himself when sealing his letters.”',
    uvNote: 'LATENT THUMBPRINT OF PROF. COLE EMBEDDED IN WAX BASE',
    obs1: 'The Cole family crest brass seal exhibits oily film along its ebony handle.',
    obs2: 'Transdermal neurotoxin compound identified on handle surface; Cole\'s thumbprint embedded in wax.'
  },
  {
    id: 'EVD-209',
    key: 'candle',
    title: 'HIGH LECTERN & CALIBRATED CANDLE',
    subtitle: 'Burnt tallow stub with scorched violin gut string',
    category: 'PHYSICAL STUDY APPARATUS // DECOY TRIGGER',
    exhibitTag: 'EXHIBIT 03-A',
    left: '26%',
    top: '42%',
    coords: 'SEC 03-NORTH · POS 57.1499°N',
    pathologistNote: 'Candle stub burned to base; melted wax pool contains scorched violin E-string catgut fragment.',
    vanceDeduction: '“Part 1 of the 21:42 decoy timer mechanism. The burning candle severed the string holding the weight.”',
    uvNote: 'CHARRED VIOLIN GUT-STRING FRAGMENT MELTED IN WAX',
    obs1: 'A tallow candle stub placed at 20:30 calibrated to burn for 72 minutes before severing string.',
    obs2: 'Scorched cord fragment matches violin E-string tensile wire from music room.'
  },
  {
    id: 'EVD-208',
    key: 'paperweight',
    title: 'BRONZE SPHINX PAPERWEIGHT',
    subtitle: '3.2 lb weight lying on hearth fender with fresh gouge',
    category: 'THERMAL REMNANT // SOUND DECOY',
    exhibitTag: 'EXHIBIT 04-A',
    left: '68%',
    top: '56%',
    coords: 'SEC 04-EAST · POS 57.1496°N',
    pathologistNote: '3.2 lb bronze weight plummeted 4.8 ft from lectern onto brass hearth fender, causing the 21:42 thud.',
    vanceDeduction: '“The 21:42 thud was NOT an attack on Cole! It was a timed paperweight crash establishing a fake attack timestamp.”',
    uvNote: 'FRESH BRASS METALLIC SCRAPE ON BOTTOM MATCHES FENDER',
    obs1: 'Heavy bronze sphinx found lying inside hearth fender 8 ft from lectern desk.',
    obs2: 'Fresh scratch mark on bottom matches brass hearth fender edge.'
  },
  {
    id: 'EVD-205',
    key: 'window',
    title: 'SOUTH LEADED SASH WINDOW',
    subtitle: 'Interior brass acorn latch turned to locked position',
    category: 'PERIMETER CHECK // INCLINE EXTERIOR',
    exhibitTag: 'EXHIBIT 05-A',
    left: '88%',
    top: '38%',
    coords: 'SEC 05-SOUTH · POS 57.1495°N',
    pathologistNote: 'Window sash latched securely from inside. Egress or window break-in physically impossible.',
    vanceDeduction: '“Julian Sterling was on the terrace outside, but the window remained latched from inside.”',
    uvNote: 'UNDISTURBED COBWEBS ALONG UPPER CASEMENT',
    obs1: 'Internal brass thumb-latch is fully engaged in locked vertical position.',
    obs2: 'Undisturbed dust and rain streaks confirm window was not opened during storm.'
  },
  {
    id: 'EVD-210',
    key: 'clock',
    title: 'SCOTTISH TALL GRANDFATHER CLOCK',
    subtitle: 'Mahogany pendulum clock ticking accurately',
    category: 'CHRONOMETRIC REFERENCE // RED HERRING',
    exhibitTag: 'EXHIBIT 06-B',
    left: '79%',
    top: '32%',
    coords: 'SEC 06-NORTH · POS 57.1499°N',
    pathologistNote: 'Maintenance log shows service yesterday. Pendulum and gear train completely un-tampered.',
    vanceDeduction: '“Clock tampering theory is a distraction. The time illusion was created by the candle decoy.”',
    uvNote: 'NO DISRUPTION MARKS ON ESCAPEMENT OR PENDULUM',
    obs1: 'Clock mechanism verified accurate by horologist log.',
    obs2: 'Refutes clock modification theory.'
  },
  {
    id: 'EVD-206',
    key: 'armchair',
    title: 'ARMCHAIR & PARALYSIS DRAG MARKS',
    subtitle: 'Scuff marks on rug & leather armrest',
    category: 'BODY POSITION // COLLAPSE PROOF',
    exhibitTag: 'EXHIBIT 07-A',
    left: '34%',
    top: '60%',
    coords: 'SEC 07-FLOOR · POS 57.1497°N',
    pathologistNote: 'Leather armrest has hand drag marks showing sudden loss of leg muscle control.',
    vanceDeduction: '“Cole collapsed from his chair near the desk during the 21:20–21:30 window.”',
    uvNote: 'FRICTION MARKS ON LEATHER ALIGN WITH DESK POSITION',
    obs1: 'Leather armrest shows downward drag marks from victim\'s hands.',
    obs2: 'Rug scuffs indicate sudden physical collapse rather than struggle.'
  },
  {
    id: 'EVD-211',
    key: 'patent',
    title: 'TORN PATENT FORMULA DRAFT',
    subtitle: 'Chemical notes with Dr. Reed\'s name crossed out',
    category: 'DISCARDED ARTIFACTS // MOTIVE PROOF',
    exhibitTag: 'EXHIBIT 08-C',
    left: '56%',
    top: '78%',
    coords: 'SEC 08-EAST · POS 57.1496°N',
    pathologistNote: 'Torn chemical formulas for synthetic alkaloid signed by Cole with Reed\'s name erased.',
    vanceDeduction: '“Cole decided to strip Dr. Reed of patent credit earlier today, sparking the crisis.”',
    uvNote: 'ERASED LEAD GRAPHITE READS: "REED CO-AUTHOR (REVOKED)"',
    obs1: 'Formula notes signed by Adrian Cole with co-author line struck out.',
    obs2: 'Draft found torn inside wicker basket near writing desk.'
  },
  {
    id: 'EVD-213',
    key: 'cabinet',
    title: 'SIDE APOTHECARY CABINET',
    subtitle: 'Locked mahogany chest with intact vial seals',
    category: 'PHARMACEUTICAL STOCKS // RED HERRING',
    exhibitTag: 'EXHIBIT 09-D',
    left: '2%',
    top: '62%',
    coords: 'SEC 09-WEST · POS 57.1498°N',
    pathologistNote: 'Amber vials of chloroform and ether with unbroken factory wax seals.',
    vanceDeduction: '“Chloroform was not used. Poison was the transdermal compound on the wax seal stamp.”',
    uvNote: 'FACTORY WAX SEALS INTACT ON ALL ANESTHETIC BOTTLES',
    obs1: 'Locked medical cabinet containing intact chloroform bottles.',
    obs2: 'Eliminates gas or inhaled anesthetic attack.'
  },
  {
    id: 'EVD-207',
    key: 'autopsy',
    title: 'MEDICAL EXAMINER AUTOPSY REPORT',
    subtitle: 'Official report by Dr. H. Watson, M.D.',
    category: 'FORENSIC SUMMARY // CRITICAL TIMELINE',
    exhibitTag: 'EXHIBIT 10-M',
    left: '40%',
    top: '82%',
    coords: 'SEC 10-DESK · POS 57.1497°N',
    pathologistNote: 'Autopsy notes transdermal toxin absorption on right thumb with collapse window 21:20–21:30 GMT.',
    vanceDeduction: '“The attack happened at ~21:25 GMT! The 21:42 thud occurred 17 minutes AFTER Cole collapsed!”',
    uvNote: 'EPIDERMAL CORROSION PATTERN MATCHES STAMP HANDLE Crest',
    obs1: 'Official report establishing true collapse window: 21:20–21:30 GMT.',
    obs2: 'Transdermal absorption pattern on right thumb and index finger.'
  }
];

export const Case002StudyScene: React.FC = () => {
  const { state, dispatch } = useInvestigation();
  const navigate = useNavigate();

  const [inspectingHotspot, setInspectingHotspot] = useState<StudyHotspot | null>(
    STUDY_HOTSPOTS[0]
  );
  const [drawerOpen, setDrawerOpen] = useState<boolean>(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [uvActive, setUvActive] = useState<boolean>(false);
  const [hudReticlesOn, setHudReticlesOn] = useState<boolean>(true);

  const handleSelectHotspot = (hotspot: StudyHotspot) => {
    sfx.playReticle();
    setInspectingHotspot(hotspot);
    setDrawerOpen(true);

    const isNewlyDiscovered = !state.discoveredEvidenceIds.includes(hotspot.id);

    dispatch({ type: 'DISCOVER_EVIDENCE', payload: hotspot.id });
    dispatch({ type: 'INSPECT_EVIDENCE', payload: hotspot.id });

    if (isNewlyDiscovered) {
      setToastMessage(`NEW DISCOVERY: ${hotspot.id} — ${hotspot.title}`);
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
          targetId: 'EVD-201',
          label: 'Study Scene Connection'
        }
      });
      setToastMessage(`PINNED ${inspectingHotspot.id} TO EVIDENCE BOARD`);
      setTimeout(() => setToastMessage(null), 3000);
    }
  };

  return (
    <div className="scene002-page-container font-body">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="scene002-toast-popup animate-fade-in font-mono">
          <CheckCircle2 size={16} className="text-gold" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Viewport Container */}
      <div className="scene002-viewport">
        {/* Background Artwork */}
        <div className="scene002-art-backdrop">
          <svg className="rain-streaks-svg" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="rain-drops-002" width="120" height="240" patternUnits="userSpaceOnUse">
                <line x1="20" y1="0" x2="10" y2="70" stroke="#e9c176" strokeWidth="0.75" opacity="0.3" />
                <line x1="80" y1="40" x2="72" y2="130" stroke="#e0e3de" strokeWidth="0.5" opacity="0.4" />
                <line x1="110" y1="120" x2="102" y2="190" stroke="#9a8f80" strokeWidth="0.5" opacity="0.2" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#rain-drops-002)" />
          </svg>
        </div>

        {/* Top HUD Directive Banner */}
        <div className="scene002-directive-banner font-mono">
          <div className="directive-left">
            <span className="ping-beacon"></span>
            <div className="directive-text-group">
              <span className="directive-tag">FIELD DIRECTIVE · 22:15 GMT</span>
              <span className="directive-headline font-headline">
                "Establish how Professor Cole was poisoned inside a locked study before the 21:42 thud."
              </span>
            </div>
          </div>

          <div className="directive-controls">
            <button
              className="btn-toggle-hud font-mono"
              onClick={() => setHudReticlesOn(!hudReticlesOn)}
            >
              [SPACE] HUD RETICLES: {hudReticlesOn ? 'ON' : 'OFF'}
            </button>
          </div>
        </div>

        {/* Interactive Crime Scene Hotspots */}
        <div className={`scene002-hotspots-layer ${hudReticlesOn ? 'visible' : 'hidden'}`}>
          {STUDY_HOTSPOTS.map(hotspot => {
            const isDiscovered = state.discoveredEvidenceIds.includes(hotspot.id);
            const isSelected = inspectingHotspot?.id === hotspot.id && drawerOpen;

            return (
              <div
                key={hotspot.id}
                className={`scene002-hotspot-pin ${isSelected ? 'active' : ''} ${
                  isDiscovered ? 'discovered' : 'new-clue'
                }`}
                style={{ left: hotspot.left, top: hotspot.top }}
                onClick={() => handleSelectHotspot(hotspot)}
              >
                <div className="hotspot-reticle">
                  <span className="pulse-ring"></span>
                  <span className="center-dot"></span>
                  {!isDiscovered && <span className="new-badge-ping"></span>}
                </div>

                <div className="hotspot-micro-tag font-mono">
                  <div className="tag-top">
                    <span className="tag-action">[E] EXAMINE</span>
                    <span className="tag-title">{hotspot.title}</span>
                  </div>
                  <span className="tag-sub">{hotspot.subtitle}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Ambient Telemetry Bar */}
        <div className="scene002-telemetry-bar font-mono">
          <div className="telemetry-item">
            <Compass size={14} className="text-gold" />
            <span>TEMP: 11.8°C · BAROMETRIC: 988 hPa</span>
          </div>
          <span className="telemetry-divider">|</span>
          <div className="telemetry-item">
            <Search size={14} className="text-gold" />
            <span>LIGHT: 1.2 LUX (HIGHLAND STORM)</span>
          </div>
          <span className="telemetry-divider">|</span>
          <div className="telemetry-item hint font-bold">
            <span>[CLICK HOTSPOTS TO EXAMINE EVIDENCE]</span>
          </div>
        </div>

        {/* Slide-Out Forensic Examination Drawer */}
        {drawerOpen && inspectingHotspot && (
          <aside className="scene002-drawer-panel animate-fade-in font-mono">
            {/* Header */}
            <div className="drawer-header">
              <div className="drawer-exhibit-tag">
                <span className="tag-dot text-gold"></span>
                <span>{inspectingHotspot.exhibitTag}</span>
              </div>
              <button className="btn-close-drawer" onClick={() => setDrawerOpen(false)}>
                <span>[ESC]</span>
                <X size={16} />
              </button>
            </div>

            {/* Body */}
            <div className="drawer-body">
              <div className="exhibit-title-block">
                <div className="coords-row">
                  <span className="tag-type">{inspectingHotspot.id}</span>
                  <span className="coords-val">{inspectingHotspot.coords}</span>
                </div>
                <h2 className="exhibit-title font-headline">{inspectingHotspot.title}</h2>
                <div className="exhibit-loc font-mono">HIGHLAND MANOR · EAST WING STUDY</div>
              </div>

              {/* Loupe Macro Inspection Frame */}
              <div className="loupe-viewer-box">
                <div className={`loupe-image-frame ${uvActive ? 'uv-active' : ''}`}>
                  <div className="loupe-grid-reticle"></div>

                  {uvActive && (
                    <div className="uv-spectrum-overlay font-mono animate-pulse-uv">
                      <Sparkles size={16} />
                      <span>{inspectingHotspot.uvNote}</span>
                    </div>
                  )}

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
                  <span>SPECTRUM: {uvActive ? '365NM UV' : 'RAKING LIGHT'}</span>
                  <span>LAB: SCOTLAND YARD</span>
                </div>
              </div>

              {/* Pathologist Observation */}
              <div className="pathologist-note-box">
                <div className="note-header font-mono">
                  <AlertCircle size={14} className="text-gold" />
                  <span>FORENSIC OBSERVATION</span>
                </div>
                <p className="note-text font-mono">{inspectingHotspot.pathologistNote}</p>
              </div>

              {/* Vance Deduction Log */}
              <div className="vance-log-box">
                <span className="log-tag font-mono">INSP. VANCE FIELD DEDUCTION</span>
                <p className="log-quote font-headline">{inspectingHotspot.vanceDeduction}</p>
              </div>

              {/* Action Deck */}
              <div className="drawer-actions font-mono">
                <div className="action-row-split">
                  <button
                    className={`btn-drawer-opt ${uvActive ? 'active' : ''}`}
                    onClick={() => setUvActive(!uvActive)}
                  >
                    <Sparkles size={14} />
                    <span>{uvActive ? 'UV ACTIVE' : 'REVEAL UV RESIDUE'}</span>
                  </button>

                  <button className="btn-drawer-opt" onClick={handlePinToBoard}>
                    <Pin size={14} />
                    <span>PIN TO BOARD</span>
                  </button>
                </div>

                <button className="btn-drawer-primary font-headline" onClick={handleExamineDetail}>
                  <Eye size={16} />
                  <span>EXAMINE IN FORENSIC BENCH</span>
                </button>
              </div>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
};
