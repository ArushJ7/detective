import React, { createContext, useContext, useReducer } from 'react';
import type { ReactNode } from 'react';
import type { InvestigationState, InvestigationAction, EvidenceItem, Suspect, TimelineEvent, EstateLocation } from './types';
import type { CaseDefinition, CaseMetadata } from '../engine';
import { initialInvestigationState, investigationReducer } from './investigationReducer';
import { CaseManager } from '../engine';

interface InvestigationContextType {
  state: InvestigationState;
  dispatch: React.Dispatch<InvestigationAction>;
  activeCase: CaseDefinition;
  caseMetadata: CaseMetadata;
  evidenceList: EvidenceItem[];
  suspectsList: Suspect[];
  timelineEvents: TimelineEvent[];
  locationsList: EstateLocation[];
  discoveredEvidence: EvidenceItem[];
  vaultEvidence: EvidenceItem[];
  selectedEvidence: EvidenceItem | null;
  selectedSuspect: Suspect | null;
}

const InvestigationContext = createContext<InvestigationContextType | undefined>(undefined);

export const InvestigationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(investigationReducer, initialInvestigationState);

  const activeCase = CaseManager.getCase(state.activeCaseId) || CaseManager.getActiveCase();
  const caseMetadata = activeCase.metadata;
  const evidenceList = activeCase.evidence;
  const suspectsList = activeCase.suspects;
  const timelineEvents = activeCase.timeline;
  const locationsList = activeCase.locations;

  const discoveredEvidence = evidenceList.filter(e =>
    state.discoveredEvidenceIds.includes(e.id)
  );

  const vaultEvidence = evidenceList.filter(e => e.isVaultOnly);

  const selectedEvidence = evidenceList.find(e => e.id === state.selectedEvidenceId) || null;
  const selectedSuspect = suspectsList.find(s => s.id === state.selectedSuspectId) || null;

  return (
    <InvestigationContext.Provider
      value={{
        state,
        dispatch,
        activeCase,
        caseMetadata,
        evidenceList,
        suspectsList,
        timelineEvents,
        locationsList,
        discoveredEvidence,
        vaultEvidence,
        selectedEvidence,
        selectedSuspect
      }}
    >
      {children}
    </InvestigationContext.Provider>
  );
};

export const useInvestigation = (): InvestigationContextType => {
  const context = useContext(InvestigationContext);
  if (!context) {
    throw new Error('useInvestigation must be used within an InvestigationProvider');
  }
  return context;
};
