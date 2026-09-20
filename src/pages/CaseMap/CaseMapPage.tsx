import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useInvestigation } from '../../state/InvestigationContext';
import { CANONICAL_LOCATIONS } from '../../data/locations';
import { CANONICAL_TIMELINE } from '../../data/timeline';
import type { EstateLocation } from '../../state/types';
import {
  FileText,
  User,
  Clock,
  ExternalLink,
  Compass
} from 'lucide-react';
import './CaseMapPage.css';

export const CaseMapPage: React.FC = () => {
  const { state, dispatch, suspectsList, discoveredEvidence } = useInvestigation();
  const navigate = useNavigate();

  const selectedLocId = state.selectedLocationId || 'drawing-room';
  const selectedLocation: EstateLocation =
    CANONICAL_LOCATIONS.find(l => l.id === selectedLocId) || CANONICAL_LOCATIONS[0];

  const handleSelectLocation = (id: string) => {
    dispatch({ type: 'SELECT_LOCATION', payload: id });
  };

  // Filter evidence found at this location that has been discovered by player
  const locationEvidence = discoveredEvidence.filter(e =>
    selectedLocation.evidenceIds.includes(e.id)
  );

  // Suspects related to location
  const locationSuspects = suspectsList.filter(s =>
    selectedLocation.suspectIds.includes(s.id)
  );

  // Timeline events related to location
  const locationEvents = CANONICAL_TIMELINE.filter(evt =>
    selectedLocation.timelineEventIds.includes(evt.id)
  );

  return (
    <div className="casemap-page-container font-body animate-fade-in">
      {/* Top Header Bar */}
      <header className="casemap-header-bar font-mono">
        <div className="header-left">
          <div className="casemap-sub-tag text-gold">BLACKWOOD ESTATE ARCHITECTURAL BLUEPRINT</div>
          <h1 className="casemap-main-title font-headline">Estate Investigation Map</h1>
          <p className="casemap-subtitle">Spatial distribution of crime scene evidence, suspect movements, and timeline events.</p>
        </div>

        <div className="header-right font-mono">
          <div className="map-stats-badge">
            LOCATIONS SURVEYED: <strong>{CANONICAL_LOCATIONS.length}</strong>
          </div>
        </div>
      </header>

      {/* Main Floorplan Blueprint Workspace */}
      <div className="casemap-workspace-grid">
        {/* Left: Interactive Floorplan Blueprint Canvas */}
        <main className="blueprint-canvas-box">
          {/* Blueprint Grid Overlay */}
          <div className="blueprint-grid-overlay"></div>
          <div className="blueprint-compass-rose">
            <Compass size={48} className="text-tertiary opacity-30" />
          </div>

          <div className="blueprint-title-stamp font-mono">
            <span>BLACKWOOD HALL // MAIN & GROUND FLOOR PLAN</span>
            <span>SCALE: 1/8" = 1'-0" · DATED 1912</span>
          </div>

          {/* Location Hotspot Pins */}
          {CANONICAL_LOCATIONS.map(loc => {
            const isSelected = selectedLocation.id === loc.id;
            const evidenceCount = loc.evidenceIds.filter(id =>
              state.discoveredEvidenceIds.includes(id)
            ).length;

            return (
              <div
                key={loc.id}
                className={`location-hotspot-pin ${isSelected ? 'selected' : ''} status-${loc.status.toLowerCase().replace(' ', '-')}`}
                style={{
                  left: `${loc.coordinates.x}%`,
                  top: `${loc.coordinates.y}%`
                }}
                onClick={() => handleSelectLocation(loc.id)}
              >
                <div className="hotspot-beacon-ring animate-pulse"></div>
                <div className="hotspot-core-dot"></div>

                <div className="hotspot-label-tag font-mono">
                  <span className="loc-name">{loc.name}</span>
                  {evidenceCount > 0 && (
                    <span className="loc-badge">{evidenceCount} CLUES</span>
                  )}
                </div>
              </div>
            );
          })}
        </main>

        {/* Right: Location Intelligence Dossier Panel */}
        <aside className="location-dossier-panel font-mono">
          <div className="dossier-header-card">
            <div className="dossier-top font-mono">
              <span className="text-gold">LOCATION DOSSIER // REF #{selectedLocation.id.toUpperCase()}</span>
              <span className={`status-badge status-${selectedLocation.status.toLowerCase().replace(' ', '-')}`}>
                {selectedLocation.status}
              </span>
            </div>

            <h2 className="location-title font-headline">{selectedLocation.name}</h2>
            <span className="location-subtitle font-mono">{selectedLocation.subtitle}</span>

            <p className="location-desc font-mono mt-3">{selectedLocation.description}</p>
          </div>

          {/* Section 1: Discovered Evidence Found Here */}
          <div className="location-section-box">
            <div className="section-header">
              <FileText size={14} className="text-gold" />
              <span>DISCOVERED EXHIBITS ({locationEvidence.length})</span>
            </div>

            {locationEvidence.length === 0 ? (
              <p className="empty-text text-tertiary">No discovered evidence items linked to this location yet.</p>
            ) : (
              <div className="dossier-items-list">
                {locationEvidence.map(item => (
                  <div
                    key={item.id}
                    className="location-item-row"
                    onClick={() => {
                      dispatch({ type: 'SELECT_EVIDENCE', payload: item.id });
                      navigate('/inspection');
                    }}
                  >
                    <div className="item-row-left">
                      <span className="item-code text-gold font-bold">{item.id}</span>
                      <span className="item-title font-headline">{item.title}</span>
                    </div>
                    <ExternalLink size={12} className="text-tertiary" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Section 2: Associated Suspects */}
          <div className="location-section-box">
            <div className="section-header">
              <User size={14} className="text-gold" />
              <span>SUSPECTS ASSOCIATED ({locationSuspects.length})</span>
            </div>

            <div className="dossier-items-list">
              {locationSuspects.map(suspect => (
                <div
                  key={suspect.id}
                  className="location-item-row"
                  onClick={() => {
                    dispatch({ type: 'SELECT_SUSPECT', payload: suspect.id });
                    navigate('/suspects');
                  }}
                >
                  <div className="item-row-left">
                    <span className="item-code text-primary font-bold">{suspect.avatar}</span>
                    <span className="item-title font-headline">{suspect.name}</span>
                  </div>
                  <span className="item-sub text-tertiary">{suspect.role}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Timeline Events at Location */}
          <div className="location-section-box">
            <div className="section-header">
              <Clock size={14} className="text-gold" />
              <span>TIMELINE EVENTS AT LOCATION ({locationEvents.length})</span>
            </div>

            <div className="dossier-items-list">
              {locationEvents.map(evt => (
                <div
                  key={evt.id}
                  className="location-item-row"
                  onClick={() => navigate('/chronology')}
                >
                  <div className="item-row-left">
                    <span className="item-code text-gold font-bold">{evt.time}</span>
                    <span className="item-title font-headline">{evt.title}</span>
                  </div>
                  <ExternalLink size={12} className="text-tertiary" />
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
