import type { InvestigationState, InvestigationAction } from './types';
import { CaseManager } from '../engine/CaseManager';

export const initialInvestigationState: InvestigationState = {
  activeCaseId: 'case-001',
  caseId: 'CASE-001',
  caseTitle: 'The Missing Necklace',
  currentObjective: 'Synthesize clues, inspect location contexts, and record working theories in your notebook.',
  discoveredEvidenceIds: ['EVD-001', 'EVD-003', 'EVD-004', 'EVD-005', 'EVD-006', 'EVD-008', 'EVD-009'],
  inspectedEvidenceIds: ['EVD-001', 'EVD-004'],
  unlockedVaultItemIds: [],
  boardConnections: [
    { id: 'conn-1', sourceId: 'EVD-001', targetId: 'EVD-004', label: 'Wax Residue Match' },
    { id: 'conn-2', sourceId: 'EVD-005', targetId: 'EVD-009', label: '21:24 Telemetry Match' }
  ],
  cardPositions: {
    'EVD-001': { x: 60, y: 60 },
    'EVD-007': { x: 420, y: 70 },
    'EVD-006': { x: 780, y: 80 },
    'EVD-005': { x: 80, y: 380 },
    'EVD-002': { x: 440, y: 390 },
    'EVD-004': { x: 800, y: 400 }
  },
  workingHypothesis: 'James Blackwood tripped the basement breaker at 21:24 to access Vitrine #04 using a wax-cast duplicate key during dinner.',
  questionedSuspectIds: ['james-blackwood', 'martha-caldwell'],
  unlockedTopicIds: {
    'james-blackwood': ['topic-alibi', 'topic-debts'],
    'martha-caldwell': ['topic-keys-martha']
  },
  discoveredContradictionIds: ['con-1'],
  selectedTimelineFilter: 'ALL',
  notes: [
    {
      id: 'note-1',
      type: 'theory',
      title: 'Staged Break-In Theory',
      content: 'The sash window was opened from the INTERIOR (EVD-007). Zero pick marks on Vitrine #04 (EVD-001). This was an insider key job, not an exterior burglar.',
      annotation: 'THEORY',
      createdAt: '22:15 GMT',
      relatedEvidenceId: 'EVD-001',
      relatedSuspectId: 'james-blackwood',
      relatedTimelineEventId: 'evt-2131'
    },
    {
      id: 'note-2',
      type: 'evidence',
      title: 'Paraffin Wax Residue',
      content: 'Pink jeweler paraffin wax found in Lock #04 matches residue scraped from James Blackwood\'s coat pocket (EVD-004).',
      annotation: 'IMPORTANT',
      createdAt: '22:30 GMT',
      relatedEvidenceId: 'EVD-004',
      relatedSuspectId: 'james-blackwood'
    },
    {
      id: 'note-3',
      type: 'suspect',
      title: 'James Blackwood Alibi Discrepancy',
      content: 'James claims he was in the wine cellar from 21:20 to 21:45. However, Butler Hastings observed him at the cellar door at 21:38, leaving 18 minutes unaccounted.',
      annotation: 'CONTRADICTION',
      createdAt: '23:10 GMT',
      relatedSuspectId: 'james-blackwood',
      relatedTimelineEventId: 'evt-2124'
    }
  ],
  selectedLocationId: 'drawing-room',
  uvModeActive: false,
  selectedEvidenceId: 'EVD-001',
  selectedSuspectId: 'james-blackwood',
  deductionDraft: {
    culpritId: null,
    methodId: null,
    motiveId: null,
    selectedEvidenceIds: ['EVD-001', 'EVD-004'],
    selectedTimelineEventIds: ['evt-2124'],
    theoryText: 'James Blackwood tripped the breaker at 21:24 to open Vitrine #04 using a wax duplicate key.'
  },
  deductionSubmitted: false,
  deductionResult: null,
  caseSolved: null,
  completedCaseIds: []
};

export function investigationReducer(
  state: InvestigationState,
  action: InvestigationAction
): InvestigationState {
  switch (action.type) {
    case 'SWITCH_CASE': {
      const targetCase = CaseManager.getCase(action.payload);
      if (!targetCase) return state;

      CaseManager.setActiveCase(action.payload);

      const isCase3 = targetCase.metadata.id === 'case-003';
      const isCase2 = targetCase.metadata.id === 'case-002';
      const initialDiscovered = isCase3
        ? ['EVD-301', 'EVD-302', 'EVD-303', 'EVD-304', 'EVD-313']
        : isCase2
        ? ['EVD-201', 'EVD-202', 'EVD-203', 'EVD-205', 'EVD-206']
        : targetCase.evidence.slice(0, 5).map(e => e.id);

      const initialInspected = isCase3
        ? ['EVD-301', 'EVD-302']
        : isCase2
        ? ['EVD-201', 'EVD-202']
        : targetCase.evidence.slice(0, 2).map(e => e.id);

      const initialCardPositions: Record<string, { x: number; y: number }> = isCase3
        ? {
            'EVD-301': { x: 60, y: 60 },
            'EVD-302': { x: 420, y: 60 },
            'EVD-303': { x: 780, y: 70 },
            'EVD-304': { x: 80, y: 380 },
            'EVD-305': { x: 440, y: 390 },
            'EVD-306': { x: 800, y: 400 }
          }
        : isCase2
        ? {
            'EVD-201': { x: 60, y: 60 },
            'EVD-202': { x: 420, y: 60 },
            'EVD-204': { x: 780, y: 70 },
            'EVD-207': { x: 80, y: 380 },
            'EVD-208': { x: 440, y: 390 },
            'EVD-209': { x: 800, y: 400 }
          }
        : {
            'EVD-001': { x: 60, y: 60 },
            'EVD-007': { x: 420, y: 70 },
            'EVD-006': { x: 780, y: 80 },
            'EVD-005': { x: 80, y: 380 },
            'EVD-002': { x: 440, y: 390 },
            'EVD-004': { x: 800, y: 400 }
          };

      const initialConnections = isCase3
        ? [
            { id: 'conn-301', sourceId: 'EVD-301', targetId: 'EVD-304', label: 'Frame & Footprint Match' },
            { id: 'conn-302', sourceId: 'EVD-302', targetId: 'EVD-303', label: 'Blackout & Gong Disconnect' }
          ]
        : isCase2
        ? [
            { id: 'conn-201', sourceId: 'EVD-201', targetId: 'EVD-202', label: 'Door Lock Assembly' },
            { id: 'conn-204', sourceId: 'EVD-204', targetId: 'EVD-207', label: 'Transdermal Contact' }
          ]
        : [
            { id: 'conn-1', sourceId: 'EVD-001', targetId: 'EVD-004', label: 'Wax Residue Match' },
            { id: 'conn-2', sourceId: 'EVD-005', targetId: 'EVD-009', label: '21:24 Telemetry Match' }
          ];

      const initialNotes = isCase3
        ? [
            {
              id: 'note-301',
              type: 'theory' as const,
              title: '12-Minute Blackout Paradox',
              content: 'The electric arc lights and frame alarms died simultaneously at 21:18 GMT when the sub-basement dynamo breaker was manually tripped (EVD-302).',
              annotation: 'IMPORTANT' as const,
              createdAt: '21:35 GMT',
              relatedEvidenceId: 'EVD-302',
              relatedSuspectId: 'julian-vance',
              relatedTimelineEventId: 'evt-3018'
            }
          ]
        : isCase2
        ? [
            {
              id: 'note-201',
              type: 'theory' as const,
              title: 'Locked Room Mechanism Paradox',
              content: 'The mortise deadbolt was fully thrown from inside (EVD-201) and key remained in lock (EVD-202). Egress without locking from inside was impossible.',
              annotation: 'IMPORTANT' as const,
              createdAt: '22:15 GMT',
              relatedEvidenceId: 'EVD-201',
              relatedSuspectId: 'arthur-vance',
              relatedTimelineEventId: 'evt-2103'
            }
          ]
        : initialInvestigationState.notes;

      return {
        ...initialInvestigationState,
        completedCaseIds: state.completedCaseIds,
        activeCaseId: action.payload,
        caseId: targetCase.metadata.id,
        caseTitle: targetCase.metadata.title,
        currentObjective: targetCase.initialObjectives[0] || initialInvestigationState.currentObjective,
        discoveredEvidenceIds: initialDiscovered,
        inspectedEvidenceIds: initialInspected,
        unlockedVaultItemIds: [],
        boardConnections: initialConnections,
        cardPositions: initialCardPositions,
        workingHypothesis: isCase3
          ? 'A master painting vanished from Alcove III during a 12-minute blackout (21:18-21:30 GMT). Reconstruct who had access and locate the stolen canvas.'
          : isCase2
          ? 'Professor Cole was found unconscious inside a study deadbolted from the inside. Determine how the poisoning occurred and why the 21:42 thud occurred.'
          : initialInvestigationState.workingHypothesis,
        questionedSuspectIds: isCase3
          ? ['julian-vance', 'arthur-pendelton']
          : isCase2
          ? ['dr-evelyn-reed', 'arthur-vance']
          : ['james-blackwood', 'martha-caldwell'],
        unlockedTopicIds: isCase3
          ? {
              'julian-vance': ['topic-vance-alibi'],
              'arthur-pendelton': ['topic-pendelton-gong']
            }
          : isCase2
          ? {
              'dr-evelyn-reed': ['topic-reed-2030'],
              'arthur-vance': ['topic-vance-door']
            }
          : initialInvestigationState.unlockedTopicIds,
        discoveredContradictionIds: [],
        notes: initialNotes,
        selectedLocationId: isCase3 ? 'ravenwood-main-hall' : isCase2 ? 'cole-study' : 'drawing-room',
        selectedEvidenceId: targetCase.evidence[0]?.id || null,
        selectedSuspectId: targetCase.suspects[0]?.id || null,
        deductionDraft: {
          culpritId: null,
          methodId: null,
          motiveId: null,
          selectedEvidenceIds: isCase3 ? ['EVD-301', 'EVD-302'] : isCase2 ? ['EVD-201', 'EVD-204'] : ['EVD-001', 'EVD-004'],
          selectedTimelineEventIds: isCase3 ? ['evt-3018'] : isCase2 ? ['evt-2103'] : ['evt-2124'],
          theoryText: ''
        },
        deductionSubmitted: false,
        deductionResult: null,
        caseSolved: null
      };
    }

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

    case 'UPDATE_CARD_POSITION':
      return {
        ...state,
        cardPositions: {
          ...state.cardPositions,
          [action.payload.id]: { x: action.payload.x, y: action.payload.y }
        }
      };

    case 'SET_WORKING_HYPOTHESIS':
      return {
        ...state,
        workingHypothesis: action.payload
      };

    case 'CONFIRM_OBSERVATION':
      return state;

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

    case 'DISCOVER_CONTRADICTION':
      if (state.discoveredContradictionIds.includes(action.payload)) return state;
      return {
        ...state,
        discoveredContradictionIds: [...state.discoveredContradictionIds, action.payload],
        currentObjective: 'Statement inconsistency flagged. Reconstruct event chronology and confront suspect.'
      };

    case 'SELECT_TIMELINE_FILTER':
      return {
        ...state,
        selectedTimelineFilter: action.payload
      };

    case 'ADD_NOTE':
      return {
        ...state,
        notes: [action.payload, ...state.notes]
      };

    case 'UPDATE_NOTE':
      return {
        ...state,
        notes: state.notes.map(n => (n.id === action.payload.id ? action.payload : n))
      };

    case 'DELETE_NOTE':
      return {
        ...state,
        notes: state.notes.filter(n => n.id !== action.payload)
      };

    case 'SELECT_LOCATION':
      return {
        ...state,
        selectedLocationId: action.payload
      };

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

    case 'TOGGLE_DEDUCTION_EVIDENCE': {
      const exists = state.deductionDraft.selectedEvidenceIds.includes(action.payload);
      const updated = exists
        ? state.deductionDraft.selectedEvidenceIds.filter(id => id !== action.payload)
        : [...state.deductionDraft.selectedEvidenceIds, action.payload];
      return {
        ...state,
        deductionDraft: {
          ...state.deductionDraft,
          selectedEvidenceIds: updated
        }
      };
    }

    case 'TOGGLE_DEDUCTION_TIMELINE': {
      const exists = state.deductionDraft.selectedTimelineEventIds.includes(action.payload);
      const updated = exists
        ? state.deductionDraft.selectedTimelineEventIds.filter(id => id !== action.payload)
        : [...state.deductionDraft.selectedTimelineEventIds, action.payload];
      return {
        ...state,
        deductionDraft: {
          ...state.deductionDraft,
          selectedTimelineEventIds: updated
        }
      };
    }

    case 'SET_DEDUCTION_THEORY':
      return {
        ...state,
        deductionDraft: {
          ...state.deductionDraft,
          theoryText: action.payload
        }
      };

    case 'SUBMIT_DEDUCTION': {
      const result = CaseManager.validateCaseDeduction(state.activeCaseId, state.deductionDraft);
      const isSolved = result.resolutionState === 'SOLVED';
      const updatedCompleted = isSolved && !state.completedCaseIds.includes(state.activeCaseId)
        ? [...state.completedCaseIds, state.activeCaseId]
        : state.completedCaseIds;

      return {
        ...state,
        deductionSubmitted: true,
        deductionResult: result,
        caseSolved: isSolved,
        completedCaseIds: updatedCompleted
      };
    }

    case 'RESET_DEDUCTION':
      return {
        ...state,
        deductionSubmitted: false,
        deductionResult: null,
        caseSolved: null
      };

    case 'RESET_CASE':
      return {
        ...initialInvestigationState,
        completedCaseIds: state.completedCaseIds
      };

    default:
      return state;
  }
}
