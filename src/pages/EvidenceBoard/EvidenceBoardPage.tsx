import React, { useState } from 'react';
import { useInvestigation } from '../../state/InvestigationContext';
import { FileText, Link, Trash2, Plus } from 'lucide-react';
import './EvidenceBoardPage.css';

export const EvidenceBoardPage: React.FC = () => {
  const { state, dispatch, discoveredEvidence } = useInvestigation();
  const [sourceId, setSourceId] = useState<string>('');
  const [targetId, setTargetId] = useState<string>('');
  const [connLabel, setConnLabel] = useState<string>('');

  const handleAddConnection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sourceId || !targetId || sourceId === targetId) return;

    dispatch({
      type: 'ADD_BOARD_CONNECTION',
      payload: {
        id: `conn-${Date.now()}`,
        sourceId,
        targetId,
        label: connLabel || 'Deductive Link'
      }
    });

    setSourceId('');
    setTargetId('');
    setConnLabel('');
  };

  return (
    <div className="board-container animate-fade-in">
      <div className="board-header">
        <div className="board-title-group">
          <h2 className="board-title"><FileText size={20} /> THE WEB OF CLUES — EVIDENCE BOARD</h2>
          <span className="board-subtitle font-mono">PINNED EVIDENCE & DEDUCTIVE STRING CONNECTIONS</span>
        </div>

        <div className="board-stats font-mono">
          CLUES PINNED: <strong>{discoveredEvidence.length}</strong> | STRINGS CONNECTED: <strong>{state.boardConnections.length}</strong>
        </div>
      </div>

      {/* String Connection Control Bar */}
      <form className="connection-form" onSubmit={handleAddConnection}>
        <div className="form-group">
          <label className="font-mono">CLUE A:</label>
          <select value={sourceId} onChange={e => setSourceId(e.target.value)}>
            <option value="">Select First Clue...</option>
            {discoveredEvidence.map(e => (
              <option key={e.id} value={e.id}>{e.id} — {e.title}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="font-mono">CLUE B:</label>
          <select value={targetId} onChange={e => setTargetId(e.target.value)}>
            <option value="">Select Second Clue...</option>
            {discoveredEvidence.map(e => (
              <option key={e.id} value={e.id}>{e.id} — {e.title}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="font-mono">LINK RELATIONSHIP:</label>
          <input
            type="text"
            placeholder="e.g. Wax Match / Alibi Contradiction"
            value={connLabel}
            onChange={e => setConnLabel(e.target.value)}
          />
        </div>

        <button type="submit" className="btn-add-string font-mono" disabled={!sourceId || !targetId || sourceId === targetId}>
          <Plus size={16} /> CONNECT WITH RED STRING
        </button>
      </form>

      {/* Corkboard Workspace */}
      <div className="corkboard-canvas">
        <div className="corkboard-texture"></div>

        {/* Existing Red String Connections List */}
        <div className="connections-overlay">
          {state.boardConnections.map(conn => {
            const src = discoveredEvidence.find(e => e.id === conn.sourceId);
            const tgt = discoveredEvidence.find(e => e.id === conn.targetId);
            return (
              <div key={conn.id} className="string-connection-badge">
                <Link size={14} className="string-icon" />
                <span className="font-mono">{src?.id} ↔ {tgt?.id}: <strong>{conn.label}</strong></span>
                <button
                  className="btn-remove-string"
                  onClick={() => dispatch({ type: 'REMOVE_BOARD_CONNECTION', payload: conn.id })}
                >
                  <Trash2 size={12} />
                </button>
              </div>
            );
          })}
        </div>

        {/* Pinned Evidence Cards */}
        <div className="board-grid">
          {discoveredEvidence.map(ev => (
            <div key={ev.id} className="pinned-card">
              <div className="pin-head"></div>
              <div className="card-header">
                <span className="label-stamp label-stamp-gold font-mono">{ev.id}</span>
                <span className="tag-name font-mono">{ev.tag}</span>
              </div>
              <h4 className="card-title">{ev.title}</h4>
              <p className="card-desc font-mono">{ev.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
