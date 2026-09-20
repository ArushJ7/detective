import type { InvestigationState, InvestigationAction } from './types';

export const initialInvestigationState: InvestigationState = {
  caseId: 'CASE-001',
  caseTitle: 'The Missing Necklace',
  currentObjective: 'Search the drawing room for signs of forced entry.',
  discoveredEvidenceIds: ['EVD-001'], // Starts with vitrine lock discovered upon entering
  inspectedEvidenceIds: ['EVD-001'],
  unlockedVaultItemIds: [],
  boardConnections: [
    { id: 'conn-1', sourceId: 'EVD-001', targetId: 'EVD-004', label: 'Wax Residue Match' }
  ],
  questionedSuspectIds: ['james-blackwood'],
  unlockedTopicIds: {
    'james-blackwood': ['topic-alibi']
  },
  uvModeActive: false,
  selectedEvidenceId: 'EVD-001',
  selectedSuspectId: 'james-blackwood',
  deductionDraft: {
    culpritId: null,
    methodId: null,
    motiveId: null
  },
  caseSolved: null
};

export function investigationReducer(
  state: InvestigationState,
  action: InvestigationAction
): InvestigationState {
  switch (action.type) {
    case 'DISCOVER_EVIDENCE': {
      if (state.discoveredEvidenceIds.includes(action.payload)) return state;

      const newDiscovered = [...state.discoveredEvidenceIds, action.payload];
      let updatedObjective = state.currentObjective;

      if (newDiscovered.includes('EVD-004') || newDiscovered.includes('EVD-006')) {
        updatedObjective = 'Examine paraffin wax and footprint evidence for suspect matches.';
      } else if (newDiscovered.includes('EVD-005')) {
        updatedObjective = 'Check electrical basement logs and cross-examine suspect alibis.';
      }

      return {
        ...state,
        discoveredEvidenceIds: newDiscovered,
        currentObjective: updatedObjective
      };
    }

    case 'INSPECT_EVIDENCE':
      if (state.inspectedEvidenceIds.includes(action.payload)) {
        return { ...state, selectedEvidenceId: action.payload };
      }
      return {
        ...state,
        inspectedEvidenceIds: [...state.inspectedEvidenceIds, action.payload],
        selectedEvidenceId: action.payload
      };

    case 'SET_OBJECTIVE':
      return {
        ...state,
        currentObjective: action.payload
      };

    case 'UNLOCK_VAULT_ITEM':
      if (state.unlockedVaultItemIds.includes(action.payload)) return state;
      return {
        ...state,
        unlockedVaultItemIds: [...state.unlockedVaultItemIds, action.payload],
        discoveredEvidenceIds: state.discoveredEvidenceIds.includes(action.payload)
          ? state.discoveredEvidenceIds
          : [...state.discoveredEvidenceIds, action.payload]
      };

    case 'ADD_BOARD_CONNECTION':
      if (state.boardConnections.some(c => c.id === action.payload.id)) return state;
      return {
        ...state,
        boardConnections: [...state.boardConnections, action.payload]
      };

    case 'REMOVE_BOARD_CONNECTION':
      return {
        ...state,
        boardConnections: state.boardConnections.filter(c => c.id !== action.payload)
      };

    case 'QUESTION_SUSPECT': {
      const { suspectId, topicId } = action.payload;
      const currentTopics = state.unlockedTopicIds[suspectId] || [];
      const updatedTopics = currentTopics.includes(topicId)
        ? currentTopics
        : [...currentTopics, topicId];

      const questionedSuspects = state.questionedSuspectIds.includes(suspectId)
        ? state.questionedSuspectIds
        : [...state.questionedSuspectIds, suspectId];

      return {
        ...state,
        questionedSuspectIds: questionedSuspects,
        unlockedTopicIds: {
          ...state.unlockedTopicIds,
          [suspectId]: updatedTopics
        }
      };
    }

    case 'TOGGLE_UV_MODE':
      return {
        ...state,
        uvModeActive: action.payload !== undefined ? action.payload : !state.uvModeActive
      };

    case 'SELECT_EVIDENCE':
      return {
        ...state,
        selectedEvidenceId: action.payload
      };

    case 'SELECT_SUSPECT':
      return {
        ...state,
        selectedSuspectId: action.payload
      };

    case 'SET_DEDUCTION_CULPRIT':
      return {
        ...state,
        deductionDraft: {
          ...state.deductionDraft,
          culpritId: action.payload
        }
      };

    case 'SET_DEDUCTION_METHOD':
      return {
        ...state,
        deductionDraft: {
          ...state.deductionDraft,
          methodId: action.payload
        }
      };

    case 'SET_DEDUCTION_MOTIVE':
      return {
        ...state,
        deductionDraft: {
          ...state.deductionDraft,
          motiveId: action.payload
        }
      };

    case 'SUBMIT_DEDUCTION': {
      const isCulpritCorrect = state.deductionDraft.culpritId === 'james-blackwood';
      const isMethodCorrect = state.deductionDraft.methodId === 'wax-duplicate-fuse-trip';
      const isMotiveCorrect = state.deductionDraft.motiveId === 'gambling-debts-14200';
      const solved = isCulpritCorrect && isMethodCorrect && isMotiveCorrect;

      return {
        ...state,
        caseSolved: solved
      };
    }

    case 'RESET_CASE':
      return initialInvestigationState;

    default:
      return state;
  }
}
