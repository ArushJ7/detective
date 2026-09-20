import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useInvestigation } from '../../state/InvestigationContext';
import { Eye, Shield, FileText, Lock, Users, Brain, MapPin, Sparkles } from 'lucide-react';
import './GameHeader.css';

export const GameHeader: React.FC = () => {
  const { state, dispatch, discoveredEvidence } = useInvestigation();
  const location = useLocation();

  const isUV = state.uvModeActive;

  const navItems = [
    { path: '/scene', label: 'THE SCENE', icon: MapPin },
    { path: '/evidence-board', label: 'EVIDENCE BOARD', icon: FileText, badge: state.boardConnections.length },
    { path: '/inspection', label: 'INSPECTION', icon: Eye },
    { path: '/vault', label: 'EVIDENCE VAULT', icon: Lock, badge: state.unlockedVaultItemIds.length },
    { path: '/suspects', label: 'SUSPECT DOSSIERS', icon: Users },
    { path: '/deduction', label: 'FINAL DEDUCTION', icon: Brain }
  ];

  return (
    <header className={`game-header ${isUV ? 'uv-active-header' : ''}`}>
      {/* Top Meta Bar */}
      <div className="header-top-bar">
        <div className="header-brand">
          <Shield className="header-logo-icon" size={20} />
          <div className="header-brand-titles">
            <span className="case-tag">CASE #001 — CONFIDENTIAL</span>
            <span className="case-title">THE MISSING NECKLACE</span>
          </div>
        </div>

        <div className="header-center-status">
          <div className="status-pill">
            <span className="status-dot"></span>
            <span className="font-mono">INVESTIGATION IN PROGRESS</span>
          </div>
          <div className="evidence-counter font-mono">
            EVIDENCE DISCOVERED: <strong>{discoveredEvidence.length} / 12</strong>
          </div>
        </div>

        <div className="header-actions">
          <button
            className={`uv-toggle-btn ${isUV ? 'active' : ''}`}
            onClick={() => dispatch({ type: 'TOGGLE_UV_MODE' })}
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
