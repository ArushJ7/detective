import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInvestigation } from '../../state/InvestigationContext';
import type { EvidenceItem } from '../../state/types';
import { Folder, Camera, Box, FileText, Activity, Volume2, Lock, Eye, X, Sparkles } from 'lucide-react';
import './EvidenceVaultPage.css';

export const EvidenceVaultPage: React.FC = () => {
  const { state, dispatch, evidenceList, discoveredEvidence } = useInvestigation();
  const navigate = useNavigate();

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [modalItem, setModalItem] = useState<EvidenceItem | null>(null);

  const discoveredCount = discoveredEvidence.length;
  const totalCount = evidenceList.length;

  const categoryTabs = [
    { id: 'all', label: `ALL ARCHIVES (${totalCount})`, icon: Folder },
    { id: 'photo', label: 'PHOTOGRAPHS', icon: Camera },
    { id: 'object', label: 'SPECIMENS & OBJECTS', icon: Box },
    { id: 'document', label: 'DOCUMENTS & TEXT', icon: FileText },
    { id: 'digital', label: 'TELEMETRY & LOGS', icon: Activity },
    { id: 'audio', label: 'AUDIO TRACKS', icon: Volume2 }
  ];

  const filteredItems = evidenceList.filter(item => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  const handleOpenInspect = (item: EvidenceItem) => {
    if (state.discoveredEvidenceIds.includes(item.id)) {
      setModalItem(item);
    }
  };

  const handleNavigateToFullInspection = (item: EvidenceItem) => {
    dispatch({ type: 'SELECT_EVIDENCE', payload: item.id });
    navigate('/inspection');
  };

  return (
    <div className="vault-page-container font-body">
      {/* Archival Header Strip */}
      <div className="vault-archive-header font-mono">
        <div className="header-title-block">
          <div className="docket-sub-line">
            <span className="dot animate-pulse text-gold"></span>
            <span>REGISTRY DIVISION // SECTION 04</span>
            <span className="divider">/</span>
            <span className="text-gold">STORAGE BAY: VAULT-B</span>
          </div>
          <h1 className="vault-main-title font-headline">
            EVIDENCE VAULT <span className="vault-id font-mono">#EV-001-BLKW</span>
          </h1>
        </div>

        <div className="vault-stats-badge font-mono">
          <div className="stat-col">
            <span className="lbl">SECURED RETRIEVAL</span>
            <span className="val text-gold">{discoveredCount} <small>/ {totalCount} CATALOGED</small></span>
          </div>
          <span className="v-divider"></span>
          <div className="stat-col">
            <span className="lbl">UNRESOLVED LEADS</span>
            <span className="val text-red">{totalCount - discoveredCount} <small>UNRECOVERED</small></span>
          </div>
        </div>
      </div>

      {/* Category Folder Filter Tabs */}
      <div className="vault-category-tabs font-mono">
        {categoryTabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeCategory === tab.id;
          return (
            <button
              key={tab.id}
              className={`vault-tab ${isActive ? 'active' : ''}`}
              onClick={() => setActiveCategory(tab.id)}
            >
              <Icon size={14} />
              <span>{tab.label}</span>
              {isActive && <div className="tab-active-indicator"></div>}
            </button>
          );
        })}
      </div>

      {/* Vault Locker Mosaic Grid */}
      <div className="vault-mosaic-grid">
        {filteredItems.map(item => {
          const isDiscovered = state.discoveredEvidenceIds.includes(item.id);

          if (!isDiscovered) {
            return (
              <div key={item.id} className="vault-item-card locked-locker font-mono">
                <div className="locker-icon-box">
                  <Lock size={24} className="text-red" />
                </div>
                <span className="locked-tag">[SECURED EXHIBIT {item.id}]</span>
                <span className="locked-type">{item.title}</span>

                <div className="caution-tape-strip">
                  <span>LOCKED // CLASSIFIED</span>
                </div>

                <div className="locker-hint-box">
                  <Sparkles size={12} className="text-gold" />
                  <span>RECOVERY HINT: Search Drawing Room hotspots or question suspects to discover.</span>
                </div>

                <div className="locker-footer">
                  <span>[UNDISCOVERED CLUE]</span>
                </div>
              </div>
            );
          }

          return (
            <div
              key={item.id}
              className="vault-item-card discovered-card"
              onClick={() => handleOpenInspect(item)}
            >
              {/* Simulated Brass Specimen Clip */}
              <div className="brass-clip">
                <div className="clip-inner"></div>
              </div>

              {/* Photo / Mount Plate */}
              <div className="card-mount-frame">
                <div className="mount-image-box">
                  <div className="mount-backdrop">
                    <span className="tag-number font-mono">EXHIBIT #{item.id.replace('EVD-', '')}</span>
                    <span className="tag-status font-mono">DISCOVERED</span>
                  </div>
                </div>
              </div>

              {/* Card Metadata Details */}
              <div className="card-details-block font-mono">
                <div className="card-meta-row">
                  <span className="ev-code">{item.id} // {item.category.toUpperCase()}</span>
                  <span className="ev-time">{item.timeDiscovered}</span>
                </div>
                <h3 className="card-title-text font-headline">{item.title}</h3>
                <p className="card-desc-text font-mono">{item.description}</p>

                <div className="card-click-trigger font-mono">
                  <span>[CLICK TO EXAMINE]</span>
                  <Eye size={14} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Click-to-Inspect Modal Overlay */}
      {modalItem && (
        <div className="vault-modal-backdrop animate-fade-in font-mono">
          <div className="vault-modal-card">
            <div className="modal-top">
              <div className="modal-title-group">
                <span className="modal-stamp">MAGNIFICATION LOUPE</span>
                <span className="modal-id">{modalItem.id}</span>
              </div>
              <button className="btn-modal-close" onClick={() => setModalItem(null)}>
                <X size={18} />
              </button>
            </div>

            <div className="modal-viewport">
              <div className="modal-viewport-art">
                <div className="modal-grid-overlay"></div>
                <div className="modal-scale font-mono">
                  <span>+ 0.00 mm</span>
                  <span>+ 45.00 mm</span>
                  <span>+ 90.00 mm</span>
                </div>
              </div>
            </div>

            <div className="modal-notes-box">
              <span className="lbl text-gold">INSPECTOR FIELD NOTATION:</span>
              <p className="txt font-mono">{modalItem.detailedNotes}</p>
            </div>

            <div className="modal-actions font-mono">
              <button
                className="btn-modal-primary font-headline"
                onClick={() => handleNavigateToFullInspection(modalItem)}
              >
                <Eye size={16} />
                <span>EXAMINE IN FULL LAB BENCH</span>
              </button>
              <button className="btn-modal-sec" onClick={() => setModalItem(null)}>
                <span>RETURN TO VAULT</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
