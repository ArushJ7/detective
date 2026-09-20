import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInvestigation } from '../../state/InvestigationContext';
import { sfx } from '../../utils/audio';
import { Sparkles, CheckCircle2, Eye, Pin, X, Search, Compass, AlertCircle, Sun, Moon, Footprints } from 'lucide-react';
import './Case003GalleryScene.css';

export interface GalleryHotspot {
  id: string; // matches EVD-301..314
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

const GALLERY_HOTSPOTS: GalleryHotspot[] = [
  {
    id: 'EVD-301',
    key: 'frame',
    title: 'ALCOVE III FRAME MOUNT',
    subtitle: 'Ornate gilt-bronze frame hanging bare · Unscrewed clips',
    category: 'PRIMARY CRIME SCENE // EXCISED CANVAS',
    exhibitTag: 'EXHIBIT 01-A',
    left: '52%',
    top: '32%',
    coords: 'SEC 03-ALCOVE III · POS 51.5074°N',
    pathologistNote: 'Rear brass turn-screws unscrewed with a curator driver. A dark velvet sheet was placed behind matting to disguise missing canvas in dim light.',
    vanceDeduction: '“The thief had curator tool access and time during the outage. The frame was not torn down in haste.”',
    uvNote: 'PRE-CUT VELVET BACKING INSERTED BEHIND MATTING',
    obs1: 'Brass turn-screw retainers were unscrewed without damaging gilt frame edge.',
    obs2: 'Dark velvet backing sheet inserted to absorb ambient light during blackout.'
  },
  {
    id: 'EVD-304',
    key: 'parquet',
    title: 'ALCOVE III PARQUET FLOOR',
    subtitle: 'Soft felt-soled slipper prints in chalk dust',
    category: 'PHYSICAL TRACE // FOOTWEAR IMPRESSION',
    exhibitTag: 'EXHIBIT 01-B',
    left: '50%',
    top: '74%',
    coords: 'SEC 03-ALCOVE III · POS 51.5074°N',
    pathologistNote: 'Faint oval impressions in fine restoration chalk dust. Mesh fiber sole pattern with zero heel block.',
    vanceDeduction: '“The thief wore specialized felt restoration slippers to move silently across oak parquet in the dark.”',
    uvNote: 'WOVEN FELT MESH IMPRESSION MATCHES CURATOR FOOTWEAR RACK',
    obs1: 'Two oval impressions in chalk dust showing felt sole weave pattern.',
    obs2: 'Eliminates visitors wearing outdoor leather dress boots or high heels.'
  },
  {
    id: 'EVD-303',
    key: 'gong',
    title: 'EMERGENCY BRONZE ALARM GONG',
    subtitle: 'Wall-mounted gong with disengaged steel pull-cable',
    category: 'MECHANICAL ALARM // SOUND VECTOR',
    exhibitTag: 'EXHIBIT 02-A',
    left: '28%',
    top: '26%',
    coords: 'SEC 02-EAST WALL · POS 51.5075°N',
    pathologistNote: 'Steel pull-cable unhooked from pulley arm and wedged behind timber moulding at 21:15 GMT.',
    vanceDeduction: '“The gong was unhooked BEFORE the blackout! It physically could NOT have chimed at 21:24 GMT.”',
    uvNote: 'TOOL SCRAPES ON CABLE TENSION RING DATED PRE-BLACKOUT',
    obs1: 'Mechanical tension ring unhooked from gong lever arm.',
    obs2: 'Proves the gong was inoperable during the entire blackout.'
  },
  {
    id: 'EVD-305',
    key: 'door',
    title: 'RESTORATION ROOM PADDED DOOR',
    subtitle: 'Double-thickness oak door with cork & felt insulation',
    category: 'ACOUSTIC ISOLATION // ALIBI DISPROOF',
    exhibitTag: 'EXHIBIT 03-A',
    left: '78%',
    top: '38%',
    coords: 'SEC 04-RESTO WING · POS 51.5076°N',
    pathologistNote: 'Acoustic testing confirms 48 dB noise reduction when deadbolted. Hall chimes inaudible from inside.',
    vanceDeduction: '“Vance claims he heard the 21:24 gong from inside. But acoustic tests prove the room is soundproof when locked!”',
    uvNote: 'PERIMETER FELT DRAFT-SEAL INTACT; 48 DB NOISE REDUCTION',
    obs1: 'Double-thickness oak door fitted with perimeter felt draft seals.',
    obs2: 'Soundproofing renders external hall chimes inaudible inside.'
  },
  {
    id: 'EVD-302',
    key: 'dynamo',
    title: 'SUB-BASEMENT DYNAMO BREAKER',
    subtitle: 'Main 200-amp DC knife switch with graphite grease',
    category: 'POWER SYSTEM // BLACKOUT CAUSE',
    exhibitTag: 'EXHIBIT 05-A',
    left: '12%',
    top: '82%',
    coords: 'SEC 05-CELLAR · POS 51.5072°N',
    pathologistNote: 'Main DC knife switch pulled open by hand. Contact blades coated with graphite grease and mineral spirits.',
    vanceDeduction: '“The blackout was manually triggered at 21:18 GMT using graphite lubricant to eliminate switch pull noise.”',
    uvNote: 'GRAPHITE GREASE FILM & MINERAL SPIRITS SOLVENT DETECTED',
    obs1: 'Knife switch pulled open cleanly by hand at 21:18 GMT.',
    obs2: 'Graphite grease coating matches restoration apron EVD-307.'
  },
  {
    id: 'EVD-306',
    key: 'cylinder',
    title: 'HOLLOW BRASS STORAGE CYLINDER',
    subtitle: 'Refined spirits cylinder containing rolled original canvas',
    category: 'STOLEN ASSET // CONCEALMENT VECTOR',
    exhibitTag: 'EXHIBIT 04-B',
    left: '84%',
    top: '68%',
    coords: 'SEC 04-RESTO ALCOVE · POS 51.5076°N',
    pathologistNote: '4-foot polished brass cylinder. Interior holds rolled original canvas of Tycho Brahe\'s Quadrant in oiled silk.',
    vanceDeduction: '“The smoking gun. Vance wrapped the canvas in silk and hid it inside a hollow chemical cylinder in his alcove.”',
    uvNote: 'RECOVERED CANVAS UNDAMAGED; IMPRINTS MATCH VANCE APRON',
    obs1: 'Original 1888 canvas of Tycho Brahe\'s Quadrant wrapped in oiled silk.',
    obs2: 'Hidden inside Vance\'s private chemical inventory alcove.'
  },
  {
    id: 'EVD-307',
    key: 'apron',
    title: 'CURATOR VANCE\'S STAINED APRON',
    subtitle: 'Canvas apron with graphite grease & turn-screw tool',
    category: 'PERSONAL CLOTHING // CULPRIT LINK',
    exhibitTag: 'EXHIBIT 04-C',
    left: '72%',
    top: '46%',
    coords: 'SEC 04-RESTO WING · POS 51.5076°N',
    pathologistNote: 'Left pocket contains graphite grease matching breaker EVD-302. Right pocket holds frame turn-screw driver.',
    vanceDeduction: '“Direct physical evidence linking Vance to the dynamo blackout switch and the frame turn-screws.”',
    uvNote: 'GRAPHITE RESIDUE MATCHES BREAKER EVD-302 BLADES',
    obs1: 'Left pocket retains graphite grease residue matching breaker switch EVD-302.',
    obs2: 'Right pocket holds brass turn-screw driver fitting frame EVD-301.'
  },
  {
    id: 'EVD-308',
    key: 'debt',
    title: 'BLACKWOOD SYNDICATE DEBT NOTE',
    subtitle: 'Handwritten demand note for £12,000 due at midnight',
    category: 'CORRESPONDENCE // FINANCIAL MOTIVE',
    exhibitTag: 'EXHIBIT 06-A',
    left: '38%',
    top: '64%',
    coords: 'SEC 06-OFFICE · POS 51.5073°N',
    pathologistNote: 'Handwritten demand letter from Blackwood Syndicate requiring £12,000 payment by midnight April 14th.',
    vanceDeduction: '“Vance faced immediate physical violence and legal ruin unless he produced £12,000 before midnight.”',
    uvNote: 'BLACKWOOD CIPHER SEAL CONFIRMED AUTHENTIC',
    obs1: 'Demand note requiring £12,000 by midnight under threat of violence.',
    obs2: 'Addressed directly to Senior Curator Julian Vance.'
  },
  {
    id: 'EVD-309',
    key: 'handkerchief',
    title: 'STAINED LACE HANDKERCHIEF',
    subtitle: 'Monogrammed silk handkerchief caught in door latch',
    category: 'PHYSICAL TRACE // RED HERRING',
    exhibitTag: 'EXHIBIT 07-A',
    left: '92%',
    top: '52%',
    coords: 'SEC 07-LOADING BAY · POS 51.5077°N',
    pathologistNote: 'Silk handkerchief monogrammed "B.R." belonging to Lady Beatrice Ravenscroft, stained with linseed oil.',
    vanceDeduction: '“Lady Beatrice fled into the rear corridor during the blackout, dropping her handkerchief in the dark.”',
    uvNote: 'MONOGRAM "B.R." MATCHES LADY BEATRICE RAVENSCROFT',
    obs1: 'Silk handkerchief caught in exterior Loading Bay door latch.',
    obs2: 'Proves presence near loading bay, but felt prints EVD-304 refute her in Alcove III.'
  },
  {
    id: 'EVD-310',
    key: 'safe',
    title: 'CURATOR\'S WALL SAFE & LEDGER',
    subtitle: 'Safe ajar with Lord Ravenscroft bequest terms',
    category: 'LEGAL DOCUMENTS // RED HERRING PROOF',
    exhibitTag: 'EXHIBIT 06-B',
    left: '34%',
    top: '48%',
    coords: 'SEC 06-OFFICE · POS 51.5073°N',
    pathologistNote: 'Wall safe door resting ajar. Bequest provenance ledger opened to page 42 regarding family trust revertment.',
    vanceDeduction: '“Lady Beatrice was searching for her husband\'s bequest letters, not stealing the painting.”',
    uvNote: 'FINGERPRINTS MATCH LADY BEATRICE ON SAFE DIAL',
    obs1: 'Safe door left ajar with provenance ledger open.',
    obs2: 'Explains Lady Beatrice\'s presence in Curator\'s Office.'
  },
  {
    id: 'EVD-311',
    key: 'lockpicks',
    title: 'CUSTOM WIRE LOCKPICKS',
    subtitle: 'Set of 4 steel tension wrenches in Private Vault passage',
    category: 'CRIMINAL TOOLS // RED HERRING',
    exhibitTag: 'EXHIBIT 08-A',
    left: '18%',
    top: '42%',
    coords: 'SEC 08-VAULT CORRIDOR · POS 51.5071°N',
    pathologistNote: 'Lockpicks dropped in carpet runner near Private Collection door, 120 ft away from Alcove III.',
    vanceDeduction: '“Marcus Sterling was lockpicking the Private Vault door at 21:21 GMT, 120 ft away from the crime scene.”',
    uvNote: 'SCRAPES ON VAULT LOCK MATCH PICK TIPS EXACTLY',
    obs1: 'Lockpicks hidden behind carpet runner in Private Vault passage.',
    obs2: 'Proves Sterling\'s lockpick attempt on vault door.'
  },
  {
    id: 'EVD-312',
    key: 'watch',
    title: 'STOPPED SILVER POCKET WATCH',
    subtitle: 'Cracked crystal watch frozen at 21:22 GMT on terrace',
    category: 'CHRONOMETRIC ITEM // RED HERRING',
    exhibitTag: 'EXHIBIT 08-B',
    left: '6%',
    top: '38%',
    coords: 'SEC 08-TERRACE · POS 51.5070°N',
    pathologistNote: 'Swiss silver pocket watch stopped by impact at 21:22 GMT when dropped on terrace bench.',
    vanceDeduction: '“Confirms Sterling fled to the terrace at 21:22 GMT during the blackout.”',
    uvNote: 'GLASS CRACK PATTERN MATCHES STONE BENCH EDGE IMPACT',
    obs1: 'Swiss watch with cracked crystal frozen at 21:22 GMT.',
    obs2: 'Belongs to Marcus Sterling.'
  }
];

export const Case003GalleryScene: React.FC = () => {
  const { state, dispatch } = useInvestigation();
  const navigate = useNavigate();

  const [inspectingHotspot, setInspectingHotspot] = useState<GalleryHotspot | null>(
    GALLERY_HOTSPOTS[0]
  );
  const [drawerOpen, setDrawerOpen] = useState<boolean>(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [uvActive, setUvActive] = useState<boolean>(false);
  const [blackoutMode, setBlackoutMode] = useState<boolean>(false);
  const [footprintSweep, setFootprintSweep] = useState<boolean>(false);

  const handleSelectHotspot = (hotspot: GalleryHotspot) => {
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
          targetId: 'EVD-301',
          label: 'Gallery Scene Link'
        }
      });
      setToastMessage(`PINNED ${inspectingHotspot.id} TO EVIDENCE BOARD`);
      setTimeout(() => setToastMessage(null), 3000);
    }
  };

  return (
    <div className={`scene003-page-container font-body ${blackoutMode ? 'blackout-active' : ''} ${footprintSweep ? 'sweep-active' : ''}`}>
      {/* Toast Popup */}
      {toastMessage && (
        <div className="scene003-toast-popup animate-fade-in font-mono">
          <CheckCircle2 size={16} className="text-gold" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Viewport Container */}
      <div className="scene003-viewport">
        {/* Background Artwork Layer */}
        <div className="scene003-art-backdrop">
          {/* Subtle Ambient Grain & Gas Lamp Flicker Overlay */}
          <div className="gas-flicker-overlay"></div>
        </div>

        {/* Top HUD Directive Banner */}
        <div className="scene003-directive-banner font-mono">
          <div className="directive-left">
            <span className="ping-beacon"></span>
            <div className="directive-text-group">
              <span className="directive-tag">FIELD DIRECTIVE · 21:45 GMT</span>
              <span className="directive-headline font-headline">
                "Determine who accessed Alcove III during the 12-minute blackout and locate the missing canvas."
              </span>
            </div>
          </div>

          <div className="directive-controls font-mono">
            <button
              className={`btn-mode-toggle ${blackoutMode ? 'active' : ''}`}
              onClick={() => {
                sfx.playClick();
                setBlackoutMode(!blackoutMode);
              }}
            >
              {blackoutMode ? <Moon size={14} /> : <Sun size={14} />}
              <span>{blackoutMode ? 'BLACKOUT RECONSTRUCTION (21:18–21:30)' : 'STANDARD LIGHTING'}</span>
            </button>

            <button
              className={`btn-mode-toggle ${footprintSweep ? 'active' : ''}`}
              onClick={() => {
                sfx.playClick();
                setFootprintSweep(!footprintSweep);
              }}
            >
              <Footprints size={14} />
              <span>FOOTPRINT SWEEP: {footprintSweep ? 'ACTIVE' : 'OFF'}</span>
            </button>
          </div>
        </div>

        {/* Interactive Crime Scene Hotspots */}
        <div className="scene003-hotspots-layer">
          {GALLERY_HOTSPOTS.map(hotspot => {
            const isDiscovered = state.discoveredEvidenceIds.includes(hotspot.id);
            const isSelected = inspectingHotspot?.id === hotspot.id && drawerOpen;

            return (
              <div
                key={hotspot.id}
                className={`scene003-hotspot-pin ${isSelected ? 'active' : ''} ${
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

        {/* Bottom Telemetry Bar */}
        <div className="scene003-telemetry-bar font-mono">
          <div className="telemetry-item">
            <Compass size={14} className="text-gold" />
            <span>MAYFAIR SANCTUM · TEMP: 16.5°C</span>
          </div>
          <span className="telemetry-divider">|</span>
          <div className="telemetry-item">
            <Search size={14} className="text-gold" />
            <span>LIGHTING: {blackoutMode ? '0.5 LUX (BLACKOUT RECONSTRUCTION)' : '18.0 LUX (GAS-ELECTRIC DYNAMO)'}</span>
          </div>
          <span className="telemetry-divider">|</span>
          <div className="telemetry-item hint font-bold">
            <span>[CLICK HOTSPOTS TO INVESTIGATE SCENE]</span>
          </div>
        </div>

        {/* Slide-Out Forensic Examination Drawer */}
        {drawerOpen && inspectingHotspot && (
          <aside className="scene003-drawer-panel animate-fade-in font-mono">
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
                <div className="exhibit-loc font-mono">RAVENWOOD GALLERY · MAYFAIR, LONDON</div>
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
                  <span>SPECTRUM: {uvActive ? '365NM UV RAKING LIGHT' : 'STANDARD POLARIZED'}</span>
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
