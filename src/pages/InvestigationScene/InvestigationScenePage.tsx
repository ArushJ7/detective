import React from 'react';
import { useInvestigation } from '../../state/InvestigationContext';
import { MapPin, Sparkles } from 'lucide-react';
import './InvestigationScenePage.css';

export const InvestigationScenePage: React.FC = () => {
  const { state, dispatch, evidenceList } = useInvestigation();

  const sceneEvidence = evidenceList.filter(e => !e.isVaultOnly);

  return (
    <div className={`scene-page-container ${state.uvModeActive ? 'uv-mode' : ''}`}>
      <div className="scene-header">
        <div className="scene-title-block">
          <h2 className="scene-room-title"><MapPin size={20} /> BLACKWOOD DRAWING ROOM</h2>
          <span className="scene-subtitle font-mono">CRIME SCENE #01 — INTERACTIVE INSPECTION LAYER</span>
        </div>

        {state.uvModeActive && (
          <div className="uv-banner animate-pulse-uv font-mono">
            <Sparkles size={16} /> UV TORCH ACTIVE: FLUORESCENT WAX & DUST TRACES REVEALED
          </div>
        )}
      </div>

      <div className="scene-viewport">
        <div className="scene-background-placeholder">
          <div className="watermark scene-watermark">DRAWING ROOM // CONFIDENTIAL</div>

          {/* Interactive Scene Hotspots */}
          {sceneEvidence.slice(0, 5).map((ev, idx) => (
            <div
              key={ev.id}
              className={`scene-hotspot hotspot-pos-${idx + 1} ${state.uvModeActive && ev.uvRevealed ? 'uv-hotspot' : ''}`}
              onClick={() => {
                dispatch({ type: 'INSPECT_EVIDENCE', payload: ev.id });
              }}
            >
              <div className="hotspot-pulse"></div>
              <div className="hotspot-tag font-mono">{ev.id} — {ev.title}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="scene-hotspot-list">
        <h3 className="list-heading font-mono">HOTSPOTS DISCOVERED IN THIS ROOM</h3>
        <div className="hotspots-grid">
          {sceneEvidence.map(ev => (
            <div
              key={ev.id}
              className={`hotspot-card ${state.selectedEvidenceId === ev.id ? 'active' : ''}`}
              onClick={() => dispatch({ type: 'INSPECT_EVIDENCE', payload: ev.id })}
            >
              <div className="card-top">
                <span className="label-stamp label-stamp-gold font-mono">{ev.id}</span>
                <span className="ev-type font-mono">{ev.type}</span>
              </div>
              <div className="card-title">{ev.title}</div>
              <div className="card-loc font-mono">{ev.locationFound}</div>
              {state.uvModeActive && ev.uvRevealed && (
                <div className="uv-clue-badge font-mono"><Sparkles size={12} /> UV Trace</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
