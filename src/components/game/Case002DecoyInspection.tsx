import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInvestigation } from '../../state/InvestigationContext';
import { sfx } from '../../utils/audio';
import {
  Clock,
  Pin,
  ArrowLeft,
  CheckCircle2,
  Lightbulb
} from 'lucide-react';
import './Case002DecoyInspection.css';

export const Case002DecoyInspection: React.FC = () => {
  const navigate = useNavigate();
  const { dispatch } = useInvestigation();

  const [activeTab, setActiveTab] = useState<'trajectory' | 'burnrate' | 'decibel' | 'wax'>('trajectory');
  const [pinnedAlert, setPinnedAlert] = useState<boolean>(false);

  const handleSelectTab = (tab: 'trajectory' | 'burnrate' | 'decibel' | 'wax') => {
    sfx.playClick();
    setActiveTab(tab);
  };

  const handlePinHypothesis = () => {
    sfx.playPaper();
    dispatch({
      type: 'ADD_BOARD_CONNECTION',
      payload: {
        id: `pin-decoy-${Date.now()}`,
        sourceId: 'EVD-208',
        targetId: 'EVD-209',
        label: 'Candle-String Sound Decoy Mechanism'
      }
    });
    setPinnedAlert(true);
    setTimeout(() => setPinnedAlert(false), 3000);
  };

  return (
    <div className="decoy-inspect-page font-body">
      {/* Top Context Ribbon */}
      <div className="decoy-banner font-mono">
        <div className="banner-left">
          <span className="bench-tag">LAB ANALYSIS // BENCH 04</span>
          <div className="title-stack">
            <h1 className="banner-title font-headline">Spatial Forensic Reconstruction: The Locked-Room Fall</h1>
            <span className="banner-sub">REF: SY-1895-EVD-RECON · BALLISTIC & KINETIC PARADOX RESOLUTION</span>
          </div>
        </div>

        <div className="banner-right font-mono">
          <div className="status-pill">
            <span className="ping-dot animate-ping"></span>
            <span>STATUS: CORRELATED (88%)</span>
          </div>
        </div>
      </div>

      {/* Main Two-Column Bento Layout */}
      <div className="decoy-workbench-grid">
        {/* Left Column: Spatial Vector Stage & Telemetry (7 cols) */}
        <div className="decoy-stage-column">
          {/* Photographic Stage */}
          <div className="decoy-photo-stage">
            <div className="photo-mounting-bar font-mono">
              <span>PLATE 31-B // HIGH HEARTH PERIMETER</span>
              <span className="grid-tag">[GRID: 1 IN. ISO]</span>
            </div>

            <div className="photo-canvas">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAkVlIHAqfJ76IaAbKxI9IF8YKRfijsHOFcXwzLwYx2iDmXX_YLviIQpA48IpODsw1PNF8AaTh0OlW-CkAi1F5vAyQEW3xBbpI3ULQfotEuBdSbeSdJdkUD3U88L3lYAHpvuafU3SiRugID1uQws3nh0nVP2G8-Fpz6FNu7AsDIjOl3mcTJvyVQvWloUYHdxptbt4g8DaxK-v--1153o1z4aPdiAiq2EfZ8NGkOnNS2SAb7WE_O8pB58w"
                alt="Crime scene spatial photograph of bronze sphinx paperweight and scorched candle"
                className="stage-img"
              />

              {/* Trajectory Vectors SVG Overlay */}
              <svg className="vector-svg-overlay" viewBox="0 0 1000 625" preserveAspectRatio="none">
                <line x1="80" y1="90" x2="920" y2="90" stroke="#4e4639" strokeDasharray="4 4" opacity="0.4" />
                <line x1="140" y1="40" x2="140" y2="580" stroke="#4e4639" strokeDasharray="4 4" opacity="0.4" />

                {/* Arc trajectory path */}
                <path d="M 220 120 Q 280 200, 510 480" fill="none" stroke="#e9c176" strokeWidth="2.5" strokeDasharray="6 4" />
                <circle cx="220" cy="120" r="6" fill="#e9c176" />
                <circle cx="220" cy="120" r="14" fill="none" stroke="#e9c176" strokeWidth="1.5" strokeDasharray="2 2" />

                <circle cx="510" cy="480" r="7" fill="#832933" />
                <circle cx="510" cy="480" r="18" fill="none" stroke="#ffb3b5" strokeWidth="1" strokeDasharray="3 3" />
              </svg>

              {/* Spatial Overlay Badges */}
              <div className="spatial-badge-box font-mono">
                <span className="badge-text text-gold">VERTICAL DROP: 4.8 FEET</span>
                <span className="badge-text text-green">DISTANCE TO HEARTH: 14 INCHES</span>
                <span className="badge-text">MASS: 3.2 LBS SOLID BRONZE</span>
                <span className="badge-text text-red">FALL ANGLE: 35° OFF VERTICAL</span>
              </div>

              {/* Callout Plaque EVD-208 */}
              <div className="callout-card-evd208 font-mono">
                <div className="card-top font-mono">
                  <span>MARKER EVD-208</span>
                  <span className="primary-tag">PRIMARY ARTIFACT</span>
                </div>
                <h3 className="card-heading font-headline">Bronze Sphinx Paperweight</h3>
                <p className="card-body">
                  Fresh metallic gouge on lower left plinth. Impact angle 35° consistent with a free fall from the high lectern desk onto the stone hearth fender.
                </p>
              </div>

              {/* Callout Plaque EVD-209 */}
              <div className="callout-card-evd209 font-mono">
                <div className="card-top font-mono">
                  <span>MARKER EVD-209</span>
                  <span className="organic-tag">ORGANIC RESIDUE</span>
                </div>
                <h3 className="card-heading font-headline">Charred Candle & Catgut Cord</h3>
                <p className="card-body">
                  Violin E-string catgut section scorched end severed by open flame. Nearby candle stub burned down to wick base. Melted tallow pool on lectern rail.
                </p>
              </div>
            </div>

            {/* Spatial Controls Toolbar */}
            <div className="spatial-toolbar font-mono">
              <button
                className={`tab-btn ${activeTab === 'trajectory' ? 'active' : ''}`}
                onClick={() => handleSelectTab('trajectory')}
              >
                [ SPATIAL TRAJECTORY ]
              </button>
              <button
                className={`tab-btn ${activeTab === 'burnrate' ? 'active' : ''}`}
                onClick={() => handleSelectTab('burnrate')}
              >
                [ CANDLE BURN RATE ]
              </button>
              <button
                className={`tab-btn ${activeTab === 'decibel' ? 'active' : ''}`}
                onClick={() => handleSelectTab('decibel')}
              >
                [ DECIBEL RECONSTRUCTION ]
              </button>
              <button
                className={`tab-btn ${activeTab === 'wax' ? 'active' : ''}`}
                onClick={() => handleSelectTab('wax')}
              >
                [ THERMAL WAX ]
              </button>
            </div>
          </div>

          {/* Comparative Telemetry Slates */}
          <div className="telemetry-slates-grid font-mono">
            <div className="tele-slate">
              <div className="slate-head">
                <span>KINETIC IMPACT</span>
                <span>EVD-208</span>
              </div>
              <div className="slate-val font-headline text-gold">3.2 lbs · 17.5 ft/sec</div>
              <p className="slate-desc">
                Impact energy equals 14.8 ft-lbs on cast iron hearth fender. Produced hollow boom reverberating through adjacent stone hallway.
              </p>
            </div>

            <div className="tele-slate">
              <div className="slate-head">
                <span>DECOY TRIGGER</span>
                <span>EVD-209</span>
              </div>
              <div className="slate-val font-headline text-red">Severed ~21:42 GMT</div>
              <p className="slate-desc">
                Prepared tallow candle stub positioned to burn down and sever retaining string at ~21:42 GMT, releasing weight long after study was locked.
              </p>
            </div>

            <div className="tele-slate">
              <div className="slate-head">
                <span>TENSILE COMPONENT</span>
                <span>PIRASTRO E-STRING</span>
              </div>
              <div className="slate-val font-headline text-green">0.28mm Catgut</div>
              <p className="slate-desc">
                12 lbs dry holding capacity. Flame exposure at 230°C causes sheath failure in 3.4 seconds. Matches music room stock.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Hypothesis & Correlation Dossier (5 cols) */}
        <aside className="decoy-docket-column font-mono">
          <div className="decoy-docket-card">
            {/* Header */}
            <div className="docket-top">
              <span className="docket-title-tag">FORENSIC DOCKET // EVD-208 & EVD-209</span>
              <span className="revelation-pill">CRITICAL REVELATION</span>
            </div>

            <h2 className="docket-heading font-headline">The Lectern Decoy & Delayed Sound Hypothesis</h2>
            <span className="docket-author">EXAMINER: INSP. R. VANCE · FORENSIC LAB, GLASGOW ROAD</span>

            {/* Fact Cards */}
            <div className="facts-list">
              <div className="fact-item">
                <div className="fact-head">
                  <span className="text-gold">FACT A // AUDITORY PERCEPTION</span>
                  <span className="text-outline">WITNESS: HOUSEHOLD</span>
                </div>
                <p className="fact-body font-body">
                  The household heard a heavy metallic thud at <strong className="text-gold">21:42 GMT</strong>, which they assumed was Professor Cole collapsing during an attack.
                </p>
              </div>

              <div className="fact-item">
                <div className="fact-head">
                  <span className="text-green">FACT B // MECHANICAL RELEASE</span>
                  <span className="text-outline">BALLISTIC FIT</span>
                </div>
                <p className="fact-body font-body">
                  The heavy 3.2 lb sphinx paperweight fell from the lectern when the catgut string was burned through by the candle stub.
                </p>
              </div>

              <div className="fact-item">
                <div className="fact-head">
                  <span className="text-red">FACT C // POST-MORTEM CONTRADICTION</span>
                  <span className="text-outline">EVD-207</span>
                </div>
                <p className="fact-body font-body">
                  Autopsy (EVD-207) proves Cole was paralyzed at ~<strong className="text-red">21:25 GMT</strong> — 17 minutes BEFORE the sound!
                </p>
              </div>
            </div>

            {/* Crucial Deduction Box */}
            <div className="crucial-deduction-box">
              <div className="box-head text-gold">
                <Lightbulb size={16} />
                <span>CRUCIAL INVESTIGATIVE DEDUCTION</span>
              </div>
              <p className="box-quote font-headline text-gold">
                “THE 21:42 THUD WAS NOT THE ATTACK. It was a delayed mechanical noise designed to establish a false time of death and an airtight alibi.”
              </p>
            </div>

            {/* Journal Excerpt */}
            <div className="journal-excerpt">
              <span className="journal-head text-gold">[ INSP. VANCE // FIELD JOURNAL ]</span>
              <p className="journal-body font-headline">
                “The killer wasn't in the room at 21:42. They set this simple timed trigger at 20:30, walked into the Drawing Room, and let the candle burn...”
              </p>
            </div>

            {/* Action buttons */}
            <div className="docket-actions">
              {pinnedAlert && (
                <div className="pinned-alert font-mono">
                  <CheckCircle2 size={14} className="text-gold" />
                  <span>CANDLE-STRING DECOY PINNED TO BOARD</span>
                </div>
              )}

              <button className="btn-pin-hypothesis font-headline" onClick={handlePinHypothesis}>
                <Pin size={16} />
                <span>[ PIN DECOY MECHANISM TO BOARD ]</span>
              </button>

              <div className="btn-dual-row">
                <button className="btn-sub" onClick={() => navigate('/chronology')}>
                  <Clock size={14} />
                  <span>TIMELINE</span>
                </button>
                <button className="btn-sub" onClick={() => navigate('/scene')}>
                  <ArrowLeft size={14} />
                  <span>STUDY</span>
                </button>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
