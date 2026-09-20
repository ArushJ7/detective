import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useInvestigation } from '../../state/InvestigationContext';
import { MessageSquare, ChevronRight } from 'lucide-react';
import './SuspectDossierPage.css';

export const SuspectDossierPage: React.FC = () => {
  const { state, dispatch, suspectsList } = useInvestigation();
  const navigate = useNavigate();

  const selectedSuspect = suspectsList.find(s => s.id === state.selectedSuspectId) || suspectsList[0];

  return (
    <div className="dossier-container animate-fade-in">
      {/* Suspect Roster Selector */}
      <aside className="suspect-roster">
        <div className="roster-header font-mono">PERSONS OF INTEREST ({suspectsList.length})</div>
        <div className="roster-list">
          {suspectsList.map(suspect => (
            <div
              key={suspect.id}
              className={`suspect-card-mini ${selectedSuspect.id === suspect.id ? 'active' : ''}`}
              onClick={() => dispatch({ type: 'SELECT_SUSPECT', payload: suspect.id })}
            >
              <div className="avatar-box font-headline">{suspect.avatar}</div>
              <div className="mini-info">
                <span className="mini-name">{suspect.name}</span>
                <span className="mini-role font-mono">{suspect.role}</span>
              </div>
              <span className={`suspicion-badge font-mono suspicion-${suspect.suspicionLevel.toLowerCase()}`}>
                {suspect.suspicionLevel}
              </span>
            </div>
          ))}
        </div>
      </aside>

      {/* Main Dossier File View */}
      <main className="dossier-main">
        <div className="dossier-paper">
          <div className="dossier-header">
            <div className="stamp-row">
              <span className="label-stamp label-stamp-red font-mono">POLICE DOSSIER // CONFIDENTIAL</span>
              <span className={`label-stamp font-mono label-stamp-${selectedSuspect.suspicionLevel === 'High' ? 'red' : 'gold'}`}>
                SUSPICION: {selectedSuspect.suspicionLevel.toUpperCase()}
              </span>
            </div>

            <div className="dossier-title-row">
              <div className="avatar-large font-headline">{selectedSuspect.avatar}</div>
              <div className="title-details">
                <h1 className="suspect-full-name">{selectedSuspect.name}</h1>
                <div className="suspect-role-title font-mono">{selectedSuspect.role}</div>
              </div>
            </div>
          </div>

          <div className="dossier-grid">
            <div className="dossier-section">
              <h3 className="section-heading font-headline">BIOGRAPHICAL BACKGROUND</h3>
              <p className="bio-text">{selectedSuspect.bio}</p>
            </div>

            <div className="dossier-section">
              <h3 className="section-heading font-headline">STATEMENT OF ALIBI</h3>
              <p className="alibi-text font-mono">{selectedSuspect.alibi}</p>
            </div>

            <div className="dossier-section">
              <h3 className="section-heading font-headline">ESTABLISHED MOTIVE</h3>
              <p className="motive-text font-mono">{selectedSuspect.motive}</p>
            </div>

            <div className="dossier-section">
              <h3 className="section-heading font-headline">KEY FORENSIC OBSERVATIONS</h3>
              <ul className="observations-list">
                {selectedSuspect.keyObservations.map((obs, i) => (
                  <li key={i} className="font-mono">{obs}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="dossier-actions">
            <button
              className="btn-interrogate font-headline"
              onClick={() => {
                dispatch({ type: 'SELECT_SUSPECT', payload: selectedSuspect.id });
                navigate('/interrogation');
              }}
            >
              <MessageSquare size={18} />
              <span>INTERROGATE {selectedSuspect.name.toUpperCase()}</span>
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
