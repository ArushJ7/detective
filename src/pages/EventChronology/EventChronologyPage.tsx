import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInvestigation } from '../../state/InvestigationContext';
import type { TimelineEvent, StatementContradiction } from '../../state/types';
import {
  AlertTriangle,
  FileText,
  User,
  Info
} from 'lucide-react';
import './EventChronologyPage.css';

export const EventChronologyPage: React.FC = () => {
  const { dispatch, activeCase, timelineEvents, contradictionsList, suspectsList } = useInvestigation();
  const navigate = useNavigate();

  const [filterSuspect, setFilterSuspect] = useState<string>('ALL');
  const [selectedContradiction, setSelectedContradiction] = useState<StatementContradiction | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3200);
  };

  const filteredTimeline = timelineEvents.filter(evt => {
    if (filterSuspect === 'ALL') return true;
    return evt.relatedSuspects.includes(filterSuspect);
  });

  const handleInspectContradiction = (evt: TimelineEvent) => {
    const matching = contradictionsList.find(c =>
      evt.relatedEvidence.includes(c.contradictingEvidenceId) || c.suspectId === evt.relatedSuspects[0]
    );

    if (matching) {
      setSelectedContradiction(matching);
      dispatch({ type: 'DISCOVER_CONTRADICTION', payload: matching.id });
      showToast(`CONTRADICTION DISCOVERED: ${matching.title}`);
    } else {
      showToast(`Event ${evt.time} verified against physical records.`);
    }
  };

  return (
    <div className="chronology-page-container font-body animate-fade-in">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="chronology-toast font-mono">
          <Info size={16} className="text-gold" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header Bar */}
      <header className="chronology-header-bar font-mono">
        <div className="header-left">
          <div className="sub-tag text-gold">EVENT CHRONOLOGY // INCIDENT #{activeCase.metadata.caseNumber}</div>
          <h1 className="main-title font-headline">Reconstructed Time Sequence</h1>
          <p className="subtitle">Chronological record of verified events, suspect movements, and statement contradictions.</p>
        </div>

        <div className="header-right">
          <div className="filter-pill-group">
            <span className="filter-label text-tertiary">FILTER BY SUSPECT:</span>
            <button
              className={`filter-pill ${filterSuspect === 'ALL' ? 'active' : ''}`}
              onClick={() => setFilterSuspect('ALL')}
            >
              ALL ({timelineEvents.length})
            </button>
            {suspectsList.map(s => (
              <button
                key={s.id}
                className={`filter-pill ${filterSuspect === s.id ? 'active' : ''}`}
                onClick={() => setFilterSuspect(s.id)}
              >
                {s.name.split(' ')[1]?.toUpperCase() || s.name.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Timeline Workspace */}
      <main className="chronology-timeline-wrapper">
        <div className="timeline-spine-line"></div>

        <div className="timeline-events-list">
          {filteredTimeline.map(evt => {
            const hasDiscrepancy = evt.hasContradiction;

            return (
              <div
                key={evt.id}
                className={`timeline-event-card ${hasDiscrepancy ? 'has-discrepancy' : ''}`}
              >
                {/* Node Time Circle */}
                <div className="timeline-node-circle">
                  <div className="node-inner-dot"></div>
                </div>

                {/* Event Card Content */}
                <div className="event-card-body">
                  <div className="event-card-top font-mono">
                    <span className="event-time-badge font-bold">{evt.time}</span>
                    <span className="event-location-badge">{evt.location}</span>
                    {hasDiscrepancy && (
                      <span className="event-warning-tag font-bold">
                        <AlertTriangle size={12} className="inline mr-1" /> STATEMENT CONTRADICTION
                      </span>
                    )}
                  </div>

                  <h3 className="event-title font-headline">{evt.title}</h3>
                  <p className="event-desc font-mono">{evt.description}</p>

                  {/* Related Evidence & Suspects Chips Row */}
                  <div className="event-tags-row font-mono">
                    <div className="tags-group">
                      <span className="tag-label text-tertiary">PARTICIPANTS:</span>
                      {evt.relatedSuspects.map(sId => (
                        <span
                          key={sId}
                          className="suspect-tag-pill cursor-pointer"
                          onClick={() => {
                            dispatch({ type: 'SELECT_SUSPECT', payload: sId });
                            navigate(`/suspects`);
                          }}
                        >
                          <User size={10} className="inline mr-1" />
                          {sId.replace('-', ' ').toUpperCase()}
                        </span>
                      ))}
                    </div>

                    <div className="tags-group">
                      <span className="tag-label text-tertiary">EVIDENCE LINKS:</span>
                      {evt.relatedEvidence.map(evId => (
                        <span
                          key={evId}
                          className="evidence-tag-pill cursor-pointer"
                          onClick={() => {
                            dispatch({ type: 'SELECT_EVIDENCE', payload: evId });
                            navigate('/inspection');
                          }}
                        >
                          <FileText size={10} className="inline mr-1" />
                          {evId}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Contradiction Note Banner */}
                  {evt.contradictionNote && (
                    <div className="contradiction-note-box font-mono">
                      <div className="note-header">
                        <AlertTriangle size={14} className="text-red" />
                        <span className="text-red font-bold">STATEMENT vs EVIDENCE INCONSISTENCY</span>
                      </div>
                      <p className="note-text">{evt.contradictionNote}</p>
                      <button
                        className="btn-inspect-contradiction font-mono"
                        onClick={() => handleInspectContradiction(evt)}
                      >
                        [ INSPECT STATEMENT CONTRADICTION ]
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Contradiction Detail Inspector Modal */}
      {selectedContradiction && (
        <div className="modal-backdrop animate-fade-in font-mono" onClick={() => setSelectedContradiction(null)}>
          <div className="contradiction-modal-card" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <span className="text-red font-bold">STATEMENT INCONSISTENCY INSPECTOR</span>
              <button className="btn-close" onClick={() => setSelectedContradiction(null)}>✕</button>
            </div>

            <div className="modal-body">
              <h3 className="font-headline text-lg text-gold">{selectedContradiction.title}</h3>

              <div className="modal-section mt-3">
                <span className="lbl text-tertiary">SUSPECT CLAIM:</span>
                <p className="txt-snippet font-headline italic">"{selectedContradiction.statementSnippet}"</p>
              </div>

              <div className="modal-section mt-3">
                <span className="lbl text-tertiary">CONTRADICTING EXHIBIT:</span>
                <p className="txt-ev font-bold text-gold">{selectedContradiction.contradictingEvidenceId}</p>
              </div>

              <div className="modal-section mt-3">
                <span className="lbl text-tertiary">FORENSIC ANALYSIS:</span>
                <p className="txt font-mono">{selectedContradiction.explanation}</p>
              </div>
            </div>

            <div className="modal-footer">
              <button
                className="btn-modal-primary"
                onClick={() => {
                  dispatch({ type: 'SELECT_SUSPECT', payload: selectedContradiction.suspectId });
                  navigate(`/interrogation?suspect=${selectedContradiction.suspectId}`);
                  setSelectedContradiction(null);
                }}
              >
                CONFRONT SUSPECT IN INTERROGATION
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
