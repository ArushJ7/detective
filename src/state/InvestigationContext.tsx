import React, { createContext, useContext, useReducer } from 'react';
import type { ReactNode } from 'react';
import type { InvestigationState, InvestigationAction, EvidenceItem, Suspect } from './types';
import { initialInvestigationState, investigationReducer } from './investigationReducer';
import { INITIAL_EVIDENCE } from '../data/evidence';
import { INITIAL_SUSPECTS } from '../data/suspects';

interface InvestigationContextType {
  state: InvestigationState;
  dispatch: React.Dispatch<InvestigationAction>;
  evidenceList: EvidenceItem[];
  suspectsList: Suspect[];
  discoveredEvidence: EvidenceItem[];
  vaultEvidence: EvidenceItem[];
  selectedEvidence: EvidenceItem | null;
  selectedSuspect: Suspect | null;
}

const InvestigationContext = createContext<InvestigationContextType | undefined>(undefined);

export const InvestigationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(investigationReducer, initialInvestigationState);

  const evidenceList = INITIAL_EVIDENCE;
  const suspectsList = INITIAL_SUSPECTS;

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
        evidenceList,
        suspectsList,
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
