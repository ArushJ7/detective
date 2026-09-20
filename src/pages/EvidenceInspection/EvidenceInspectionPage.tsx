import React from 'react';
import { useInvestigation } from '../../state/InvestigationContext';
import { Eye, Sparkles } from 'lucide-react';
import './EvidenceInspectionPage.css';

export const EvidenceInspectionPage: React.FC = () => {
  const { state, selectedEvidence, discoveredEvidence, dispatch } = useInvestigation();

  const item = selectedEvidence || discoveredEvidence[0];

  return (
    <div className="inspection-container animate-fade-in">
      {/* Evidence Roster Sidebar */}
      <aside className="inspection-sidebar">
        <div className="sidebar-header font-mono">DISCOVERED EVIDENCE ({discoveredEvidence.length})</div>
        <div className="sidebar-list">
          {discoveredEvidence.map(ev => (
            <div
              key={ev.id}
              className={`sidebar-item ${item?.id === ev.id ? 'active' : ''}`}
              onClick={() => dispatch({ type: 'SELECT_EVIDENCE', payload: ev.id })}
            >
              <div className="sidebar-item-top">
                <span className="font-mono label-id">{ev.id}</span>
                <span className="font-mono label-type">{ev.type}</span>
              </div>
              <div className="sidebar-item-title">{ev.title}</div>
            </div>
          ))}
        </div>
      </aside>

      {/* Primary Inspection Area */}
      <main className="inspection-detail">
        {item ? (
          <div className="vitrine-inspection-card">
            {/* Header info */}
            <div className="detail-header">
              <div className="detail-tags">
                <span className="label-stamp label-stamp-gold font-mono">{item.id}</span>
                <span className="label-stamp label-stamp-cyan font-mono">{item.tag}</span>
                <span className="label-stamp font-mono">{item.type.toUpperCase()}</span>
              </div>
              <h1 className="item-title">{item.title}</h1>
              {item.subtitle && <div className="item-subtitle font-mono">{item.subtitle}</div>}
            </div>

            {/* Vitrine Viewer Box */}
            <div className={`vitrine-display ${state.uvModeActive && item.uvRevealed ? 'uv-illuminated' : ''}`}>
              <div className="vitrine-grid-background"></div>

              {state.uvModeActive && item.uvRevealed ? (
                <div className="uv-clue-overlay animate-pulse-uv font-mono">
                  <Sparkles size={24} />
                  <div className="uv-text">{item.uvText}</div>
                </div>
              ) : (
                <div className="vitrine-item-placeholder">
                  <Eye size={48} className="vitrine-icon" />
                  <span className="font-mono placeholder-label">HIGH-RESOLUTION FORENSIC VIEW</span>
                </div>
              )}

              <div className="vitrine-corner corner-tl"></div>
              <div className="vitrine-corner corner-tr"></div>
              <div className="vitrine-corner corner-bl"></div>
              <div className="vitrine-corner corner-br"></div>
            </div>

            {/* Notes & Technical Breakdown */}
            <div className="detail-body">
              <div className="notes-block">
                <h3 className="block-title font-headline">FORENSIC OBSERVATIONS</h3>
                <p className="notes-text">{item.description}</p>
                <p className="notes-detailed font-mono">{item.detailedNotes}</p>
              </div>

              <div className="meta-sidebar">
                <div className="meta-box">
                  <span className="meta-label font-mono">LOCATION FOUND</span>
                  <span className="meta-val">{item.locationFound}</span>
                </div>
                <div className="meta-box">
                  <span className="meta-label font-mono">DISCOVERY TIME</span>
                  <span className="meta-val">{item.timeDiscovered}</span>
                </div>
                <div className="meta-box">
                  <span className="meta-label font-mono">SIGNIFICANCE</span>
                  <span className={`meta-val significance-${item.significance}`}>{item.significance.toUpperCase()}</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="empty-inspection font-mono">Select an evidence item from the list to inspect.</div>
        )}
      </main>
    </div>
  );
};
