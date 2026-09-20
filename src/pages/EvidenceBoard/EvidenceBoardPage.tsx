import React, { useState, useRef, useEffect } from 'react';
import { useInvestigation } from '../../state/InvestigationContext';
import { INITIAL_EVIDENCE } from '../../data/evidence';
import {
  Link as LinkIcon,
  Trash2,
  Plus,
  Maximize2,
  Minimize2,
  CheckCircle2,
  Brain,
  Search,
  Eye,
  Info
} from 'lucide-react';
import './EvidenceBoardPage.css';

interface DragState {
  cardId: string;
  startX: number;
  startY: number;
  initialX: number;
  initialY: number;
}

export const EvidenceBoardPage: React.FC = () => {
  const { state, dispatch, discoveredEvidence } = useInvestigation();
  const canvasRef = useRef<HTMLDivElement>(null);

  // Form state for creating yarn string connection
  const [sourceId, setSourceId] = useState<string>('');
  const [targetId, setTargetId] = useState<string>('');
  const [connLabel, setConnLabel] = useState<string>('');

  // Filter state
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'SUSPECTS' | 'TIMELINE' | 'PHOTOGRAPHS'>('ALL');
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Local state for hypothesis editing
  const [hypothesisText, setHypothesisText] = useState<string>(state.workingHypothesis);
  const [hypothesisCorroborated, setHypothesisCorroborated] = useState<boolean>(false);

  // Selected card for quick inspection modal
  const [inspectingCardId, setInspectingCardId] = useState<string | null>(null);

  // Active dragging state
  const [dragState, setDragState] = useState<DragState | null>(null);

  // Sync hypothesis text from state if changed externally
  useEffect(() => {
    setHypothesisText(state.workingHypothesis);
  }, [state.workingHypothesis]);

  // Toast notification timer
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Card Positions fallback generator
  const getCardPosition = (id: string, index: number) => {
    if (state.cardPositions && state.cardPositions[id]) {
      return state.cardPositions[id];
    }
    // Default grid position layout
    const col = index % 3;
    const row = Math.floor(index / 3);
    return {
      x: 40 + col * 320,
      y: 60 + row * 280
    };
  };

  // Drag Handlers
  const handleMouseDown = (e: React.MouseEvent, cardId: string) => {
    if ((e.target as HTMLElement).closest('button') || (e.target as HTMLElement).closest('input')) return;

    const currentPos = state.cardPositions[cardId] || { x: 40, y: 60 };
    setDragState({
      cardId,
      startX: e.clientX,
      startY: e.clientY,
      initialX: currentPos.x,
      initialY: currentPos.y
    });
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!dragState) return;

      const deltaX = (e.clientX - dragState.startX) / zoomLevel;
      const deltaY = (e.clientY - dragState.startY) / zoomLevel;

      const newX = Math.max(10, Math.min(1100, dragState.initialX + deltaX));
      const newY = Math.max(10, Math.min(900, dragState.initialY + deltaY));

      dispatch({
        type: 'UPDATE_CARD_POSITION',
        payload: {
          id: dragState.cardId,
          x: Math.round(newX),
          y: Math.round(newY)
        }
      });
    };

    const handleMouseUp = () => {
      if (dragState) {
        setDragState(null);
      }
    };

    if (dragState) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragState, dispatch, zoomLevel]);

  // Handle Add String Connection
  const handleAddConnection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sourceId || !targetId || sourceId === targetId) return;

    const existing = state.boardConnections.find(
      c => (c.sourceId === sourceId && c.targetId === targetId) || (c.sourceId === targetId && c.targetId === sourceId)
    );

    if (existing) {
      showToast(`Connection already exists between ${sourceId} and ${targetId}`);
      return;
    }

    const label = connLabel.trim() || 'Deductive Connection';
    const newConn = {
      id: `conn-${Date.now()}`,
      sourceId,
      targetId,
      label
    };

    dispatch({
      type: 'ADD_BOARD_CONNECTION',
      payload: newConn
    });

    showToast(`RED YARN CONNECTED: ${sourceId} ↔ ${targetId} ("${label}")`);
    setSourceId('');
    setTargetId('');
    setConnLabel('');
  };

  // Filter evidence based on selected filter
  const filteredEvidence = discoveredEvidence.filter(item => {
    if (activeFilter === 'SUSPECTS') {
      return item.relatedSuspects.length > 0 || item.id === 'EVD-006' || item.id === 'EVD-004';
    }
    if (activeFilter === 'TIMELINE') {
      return item.relatedTimelineEvents.length > 0 || item.id === 'EVD-005';
    }
    if (activeFilter === 'PHOTOGRAPHS') {
      return item.category === 'photo';
    }
    return true;
  });

  // Test Hypothesis Action
  const handleTestHypothesis = () => {
    setHypothesisCorroborated(true);
    showToast('STATEMENTS CORROBORATED: 3 OF 3 CLAIMS SUPPORTED BY FORENSICS');
    dispatch({ type: 'SET_OBJECTIVE', payload: 'Finalize crime sequence deduction and formulate final accusation against suspect.' });
  };

  // Save Working Hypothesis
  const handleSaveHypothesis = (val: string) => {
    setHypothesisText(val);
    dispatch({ type: 'SET_WORKING_HYPOTHESIS', payload: val });
  };

  const selectedInspectingItem = INITIAL_EVIDENCE.find(e => e.id === inspectingCardId);

  return (
    <div className="board-page-container animate-fade-in">
      {/* Top Header Bar */}
      <header className="board-header-bar">
        <div className="board-header-left">
          <div className="badge-incident font-mono">PINBOARD MATRIX // ACTIVE INCIDENT #001</div>
          <h2 className="board-main-title font-headline">The Web of Clues</h2>
        </div>

        <div className="board-header-center">
          <div className="filter-pill-group">
            <span className="filter-label font-mono">FILTER:</span>
            <button
              className={`filter-pill font-mono ${activeFilter === 'ALL' ? 'active' : ''}`}
              onClick={() => setActiveFilter('ALL')}
            >
              ALL ({discoveredEvidence.length})
            </button>
            <button
              className={`filter-pill font-mono ${activeFilter === 'SUSPECTS' ? 'active' : ''}`}
              onClick={() => setActiveFilter('SUSPECTS')}
            >
              SUSPECTS
            </button>
            <button
              className={`filter-pill font-mono ${activeFilter === 'TIMELINE' ? 'active' : ''}`}
              onClick={() => setActiveFilter('TIMELINE')}
            >
              TIMELINE
            </button>
            <button
              className={`filter-pill font-mono ${activeFilter === 'PHOTOGRAPHS' ? 'active' : ''}`}
              onClick={() => setActiveFilter('PHOTOGRAPHS')}
            >
              PHOTOS
            </button>
          </div>
        </div>

        <div className="board-header-right font-mono">
          <div className="stats-box">
            <span>PINNED: <strong>{discoveredEvidence.length} / {INITIAL_EVIDENCE.length}</strong></span>
            <span className="divider">|</span>
            <span>STRINGS: <strong>{state.boardConnections.length}</strong></span>
          </div>

          <button
            className="btn-zoom-toggle font-mono"
            onClick={() => setZoomLevel(prev => (prev === 1 ? 0.85 : 1))}
            title="Toggle Canvas Zoom"
          >
            {zoomLevel === 1 ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
            <span>{Math.round(zoomLevel * 100)}%</span>
          </button>
        </div>
      </header>

      {/* String Connection Creation Bar */}
      <section className="connection-control-bar">
        <form className="connection-form-grid" onSubmit={handleAddConnection}>
          <div className="form-field">
            <label className="font-mono">CLUE A (SOURCE):</label>
            <select value={sourceId} onChange={e => setSourceId(e.target.value)}>
              <option value="">Select First Clue...</option>
              {discoveredEvidence.map(item => (
                <option key={item.id} value={item.id}>
                  {item.id} — {item.title}
                </option>
              ))}
            </select>
          </div>

          <div className="connection-icon-separator">
            <LinkIcon size={16} className="text-secondary" />
          </div>

          <div className="form-field">
            <label className="font-mono">CLUE B (TARGET):</label>
            <select value={targetId} onChange={e => setTargetId(e.target.value)}>
              <option value="">Select Second Clue...</option>
              {discoveredEvidence.map(item => (
                <option key={item.id} value={item.id}>
                  {item.id} — {item.title}
                </option>
              ))}
            </select>
          </div>

          <div className="form-field form-field-grow">
            <label className="font-mono">LINK RELATIONSHIP NOTE:</label>
            <input
              type="text"
              placeholder="e.g. Wax residue match / Fuse trip timing match"
              value={connLabel}
              onChange={e => setConnLabel(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="btn-add-yarn font-mono"
            disabled={!sourceId || !targetId || sourceId === targetId}
          >
            <Plus size={16} /> CONNECT WITH RED STRING
          </button>
        </form>
      </section>

      {/* Main Corkboard Workspace Area */}
      <main className="corkboard-wrapper">
        <div
          ref={canvasRef}
          className="corkboard-canvas"
          style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'top left' }}
        >
          {/* Radial Light & Corkboard Pattern Backgrounds */}
          <div className="corkboard-texture-overlay"></div>
          <div className="corkboard-grid-pattern"></div>
          <div className="corkboard-light-spot"></div>

          {/* SVG Yarn Red String Layer */}
          <svg className="yarn-svg-layer" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <filter id="yarn-shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="5" stdDeviation="4" floodColor="#000000" floodOpacity="0.85" />
              </filter>
            </defs>

            {state.boardConnections.map(conn => {
              const srcItem = discoveredEvidence.find(e => e.id === conn.sourceId);
              const tgtItem = discoveredEvidence.find(e => e.id === conn.targetId);
              if (!srcItem || !tgtItem) return null;

              const srcIndex = discoveredEvidence.findIndex(e => e.id === conn.sourceId);
              const tgtIndex = discoveredEvidence.findIndex(e => e.id === conn.targetId);

              const p1 = getCardPosition(conn.sourceId, srcIndex);
              const p2 = getCardPosition(conn.targetId, tgtIndex);

              // Center coordinates of cards (approx 260px wide, 240px tall)
              const x1 = p1.x + 140;
              const y1 = p1.y + 120;
              const x2 = p2.x + 140;
              const y2 = p2.y + 120;

              // Quadratic curve control point for realistic yarn sag
              const cx = (x1 + x2) / 2;
              const cy = (y1 + y2) / 2 + 40;

              const midX = (x1 + x2) / 2;
              const midY = (y1 + y2) / 2 + 15;

              return (
                <g key={conn.id} className="yarn-connection-group">
                  {/* Thick red yarn background line with drop shadow */}
                  <path
                    d={`M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`}
                    fill="none"
                    stroke="#832933"
                    strokeWidth="3.5"
                    filter="url(#yarn-shadow)"
                  />
                  {/* Dashed bright accent overlay */}
                  <path
                    d={`M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`}
                    fill="none"
                    stroke="#ffb3b5"
                    strokeWidth="1"
                    strokeDasharray="4 2"
                    opacity="0.8"
                  />

                  {/* Midpoint Label Tag Pin */}
                  <foreignObject x={midX - 100} y={midY - 16} width="200" height="32" className="yarn-label-container">
                    <div className="yarn-tag-badge font-mono">
                      <span className="yarn-tag-text">{conn.label}</span>
                      <button
                        className="btn-delete-string"
                        title="Remove String Connection"
                        onClick={() => dispatch({ type: 'REMOVE_BOARD_CONNECTION', payload: conn.id })}
                      >
                        <Trash2 size={11} />
                      </button>
                    </div>
                  </foreignObject>
                </g>
              );
            })}
          </svg>

          {/* Draggable Pinned Evidence Cards */}
          <div className="pinned-cards-container">
            {filteredEvidence.map((item, idx) => {
              const pos = getCardPosition(item.id, idx);
              const isDraggingThis = dragState?.cardId === item.id;

              return (
                <div
                  key={item.id}
                  className={`pinned-evidence-card category-${item.category} ${isDraggingThis ? 'is-dragging' : ''}`}
                  style={{
                    left: `${pos.x}px`,
                    top: `${pos.y}px`
                  }}
                  onMouseDown={e => handleMouseDown(e, item.id)}
                >
                  {/* Brass Pin Head Graphic */}
                  <div className="card-pin-head">
                    <div className="pin-metal-core"></div>
                  </div>

                  {/* Card Content based on Evidence Type/Category */}
                  <div className="card-inner-box">
                    <div className="card-top-row">
                      <span className="card-exhibit-tag font-mono">{item.tag || item.id}</span>
                      <span className="card-type-badge font-mono">{item.category.toUpperCase()}</span>
                    </div>

                    <h4 className="card-title font-headline">{item.title}</h4>

                    {/* Specific category styling */}
                    {item.category === 'photo' && (
                      <div className="polaroid-photo-frame">
                        <img
                          src={item.imagePath || 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=400'}
                          alt={item.title}
                          className="polaroid-img"
                        />
                        <div className="polaroid-caption font-mono">
                          <Info size={10} className="inline mr-1" />
                          <span>EXHIBIT PHOTO — FORENSICS</span>
                        </div>
                      </div>
                    )}

                    {item.category === 'document' && (
                      <div className="telegram-doc-body font-mono">
                        <div className="telegram-stamp">WESTERN POST // CONFIDENTIAL</div>
                        <p className="telegram-quote">"{item.description.slice(0, 80)}..."</p>
                      </div>
                    )}

                    {item.category === 'digital' && (
                      <div className="telemetry-graph-box font-mono">
                        <div className="graph-label">VOLTAGE LOG [21:24 TRIP]</div>
                        <svg className="graph-svg" viewBox="0 0 100 20">
                          <path d="M 0 10 L 40 10 L 45 18 L 47 2 L 50 18 L 60 18 L 65 10 L 100 10" stroke="#ffb3b5" strokeWidth="1.5" fill="none" />
                        </svg>
                      </div>
                    )}

                    {item.category === 'object' && (
                      <p className="card-desc font-mono">{item.description}</p>
                    )}

                    {/* Card Actions Footer */}
                    <div className="card-actions-footer">
                      <span className="card-location font-mono">{item.locationFound}</span>
                      <button
                        className="btn-card-inspect font-mono"
                        onClick={e => {
                          e.stopPropagation();
                          setInspectingCardId(item.id);
                        }}
                      >
                        <Eye size={12} /> INSPECT
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      {/* Floating Working Hypothesis Dock (Bottom Right) */}
      <aside className="hypothesis-dock-widget">
        <div className="dock-header">
          <div className="dock-title-group">
            <Brain size={18} className="dock-icon" />
            <div>
              <h4 className="dock-title font-headline">Working Hypothesis</h4>
              <span className="dock-subtitle font-mono">CRIME SEQUENCE RECONSTRUCTION</span>
            </div>
          </div>
          <span className="hypothesis-badge font-mono">DEDUCTION STEP 2/3</span>
        </div>

        <div className="dock-body">
          <label className="font-mono dock-label">DETECTIVE'S CASE THEORY:</label>
          <textarea
            className="hypothesis-textarea font-mono"
            rows={3}
            value={hypothesisText}
            onChange={e => handleSaveHypothesis(e.target.value)}
            placeholder="Record your theory of how the crime was executed..."
          />

          {hypothesisCorroborated && (
            <div className="corroborated-alert font-mono">
              <CheckCircle2 size={14} className="alert-icon" />
              <span>FORENSIC SUPPORT: 3/3 CLAIMS SUPPORTED BY PHYSICAL EVIDENCE</span>
            </div>
          )}
        </div>

        <div className="dock-actions">
          <button
            className="btn-test-theory font-mono"
            onClick={handleTestHypothesis}
          >
            <Search size={14} /> TEST STATEMENTS
          </button>
        </div>
      </aside>

      {/* Toast Notification Popup */}
      {toastMessage && (
        <div className="toast-notification font-mono animate-fade-in">
          <Info size={16} className="text-primary" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Quick Evidence Inspection Modal */}
      {selectedInspectingItem && (
        <div className="modal-backdrop animate-fade-in" onClick={() => setInspectingCardId(null)}>
          <div className="modal-card-detail" onClick={e => e.stopPropagation()}>
            <div className="modal-header font-mono">
              <span>{selectedInspectingItem.id} — {selectedInspectingItem.tag}</span>
              <button className="btn-close-modal" onClick={() => setInspectingCardId(null)}>✕</button>
            </div>

            <div className="modal-body">
              <h3 className="font-headline text-xl text-primary">{selectedInspectingItem.title}</h3>
              <p className="font-mono text-xs text-secondary mt-1">LOCATION: {selectedInspectingItem.locationFound}</p>

              <div className="modal-section mt-4">
                <h4 className="font-mono text-xs text-primary">DESCRIPTION & FINDINGS</h4>
                <p className="font-mono text-sm mt-1">{selectedInspectingItem.description}</p>
              </div>

              <div className="modal-section mt-4">
                <h4 className="font-mono text-xs text-primary">DETAILED NOTES</h4>
                <p className="font-mono text-xs mt-1 text-on-surface-variant">{selectedInspectingItem.detailedNotes}</p>
              </div>
            </div>

            <div className="modal-footer font-mono">
              <button
                className="btn-full-inspect"
                onClick={() => {
                  dispatch({ type: 'INSPECT_EVIDENCE', payload: selectedInspectingItem.id });
                  window.location.hash = '#/inspection';
                  setInspectingCardId(null);
                }}
              >
                OPEN FULL BENCH EXAMINATION
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
