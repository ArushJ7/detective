import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useInvestigation } from '../../state/InvestigationContext';
import { sfx } from '../../utils/audio';
import { Eye, Shield, FileText, Lock, Users, MessageSquare, Clock, BookOpen, Compass, Brain, MapPin, Sparkles, Target, ShieldCheck, Folder } from 'lucide-react';
import './GameHeader.css';

export const GameHeader: React.FC = () => {
  const { state, dispatch, discoveredEvidence, caseMetadata, evidenceList } = useInvestigation();
  const location = useLocation();

  const isUV = state.uvModeActive;

  const navItems = [
    { path: '/cases', label: 'CASES', icon: Folder },
    { path: '/scene', label: 'THE SCENE', icon: MapPin },
    { path: '/evidence-board', label: 'EVIDENCE BOARD', icon: FileText, badge: state.boardConnections.length },
    { path: '/inspection', label: 'INSPECTION', icon: Eye },
    { path: '/vault', label: 'EVIDENCE VAULT', icon: Lock, badge: state.unlockedVaultItemIds.length },
    { path: '/suspects', label: 'SUSPECT DOSSIERS', icon: Users },
    { path: '/interrogation', label: 'INTERROGATION', icon: MessageSquare },
    { path: '/chronology', label: 'CHRONOLOGY', icon: Clock },
    { path: '/notebook', label: 'NOTEBOOK', icon: BookOpen, badge: state.notes.length },
    { path: '/map', label: 'ESTATE MAP', icon: Compass },
    { path: '/deduction', label: 'FINAL DEDUCTION', icon: Brain },
    ...(state.deductionSubmitted ? [{ path: '/resolution', label: 'RESOLUTION', icon: ShieldCheck }] : [])
  ];

  const handleUVToggle = () => {
    sfx.playTorchToggle();
    dispatch({ type: 'TOGGLE_UV_MODE' });
  };

  return (
    <header className={`game-header ${isUV ? 'uv-active-header' : ''}`}>
      {/* Top Meta Bar */}
      <div className="header-top-bar">
        <div className="header-brand">
          <Shield className="header-logo-icon" size={20} />
          <div className="header-brand-titles">
            <span className="case-tag">CASE FILE #{caseMetadata.caseNumber} — CONFIDENTIAL</span>
            <span className="case-title font-headline">{caseMetadata.title} · {caseMetadata.subtitle}</span>
          </div>
        </div>

        {/* Objective Pill */}
        <div className="header-objective-pill font-mono">
          <Target size={14} className="objective-icon" />
          <span className="objective-prefix font-bold">[OBJECTIVE:</span>
          <span className="objective-text">{state.currentObjective}</span>
          <span className="objective-prefix font-bold">]</span>
        </div>

        <div className="header-actions">
          <div className="evidence-counter font-mono">
            CLUES: <strong>{discoveredEvidence.length} / {evidenceList.length}</strong>
          </div>
          <button
            className={`uv-toggle-btn ${isUV ? 'active' : ''}`}
            onClick={handleUVToggle}
            title="Toggle UV Forensic Torch (Reveals hidden fluorescent clues)"
          >
            <Sparkles size={16} />
            <span className="font-mono">{isUV ? 'UV TORCH: ON' : 'UV TORCH: OFF'}</span>
          </button>
        </div>
      </div>

      {/* Main Navigation Tabs */}
      <nav className="header-nav">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path || (item.path === '/scene' && location.pathname === '/');
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`nav-tab ${isActive ? 'active' : ''}`}
              onClick={() => sfx.playClick()}
            >
              <Icon size={16} />
              <span>{item.label}</span>
              {item.badge !== undefined && item.badge > 0 && (
                <span className="nav-badge font-mono">{item.badge}</span>
              )}
            </NavLink>
          );
        })}
      </nav>
    </header>
  );
};
