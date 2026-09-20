export type EvidenceType = 'physical' | 'document' | 'digital' | 'forensic' | 'photo' | 'note';

export interface EvidenceItem {
  id: string;
  title: string;
  subtitle?: string;
  type: EvidenceType;
  description: string;
  detailedNotes: string;
  locationFound: string;
  timeDiscovered: string;
  iconName: string;
  imagePath?: string;
  uvRevealed?: boolean;
  uvText?: string;
  isVaultOnly?: boolean;
  vaultCodeRequired?: string;
  connectedEvidenceIds: string[];
  tag: string;
  significance: 'high' | 'medium' | 'low';
}

export interface InterrogationTopic {
  id: string;
  title: string;
  prompt: string;
  response: string;
  revealsTruth: boolean;
  unlocksEvidenceId?: string;
}

export interface Suspect {
  id: string;
  name: string;
  role: string;
  avatar: string;
  bio: string;
  alibi: string;
  motive: string;
  suspicionLevel: 'High' | 'Medium' | 'Low';
  keyObservations: string[];
  interrogationTopics: InterrogationTopic[];
}

export interface BoardConnection {
  id: string;
  sourceId: string;
  targetId: string;
  label?: string;
  color?: string;
}

export interface CaseTruth {
  culpritId: string;
  methodId: string;
  motiveId: string;
  explanation: string;
}

export interface InvestigationState {
  caseId: string;
  caseTitle: string;
  currentObjective: string;
  discoveredEvidenceIds: string[];
  inspectedEvidenceIds: string[];
  unlockedVaultItemIds: string[];
  boardConnections: BoardConnection[];
  questionedSuspectIds: string[];
  unlockedTopicIds: Record<string, string[]>;
  uvModeActive: boolean;
  selectedEvidenceId: string | null;
  selectedSuspectId: string | null;
  deductionDraft: {
    culpritId: string | null;
    methodId: string | null;
    motiveId: string | null;
  };
  caseSolved: boolean | null;
}

export type InvestigationAction =
  | { type: 'DISCOVER_EVIDENCE'; payload: string }
  | { type: 'INSPECT_EVIDENCE'; payload: string }
  | { type: 'UNLOCK_VAULT_ITEM'; payload: string }
  | { type: 'ADD_BOARD_CONNECTION'; payload: BoardConnection }
  | { type: 'REMOVE_BOARD_CONNECTION'; payload: string }
  | { type: 'QUESTION_SUSPECT'; payload: { suspectId: string; topicId: string } }
  | { type: 'TOGGLE_UV_MODE'; payload?: boolean }
  | { type: 'SELECT_EVIDENCE'; payload: string | null }
  | { type: 'SELECT_SUSPECT'; payload: string | null }
  | { type: 'SET_OBJECTIVE'; payload: string }
  | { type: 'SET_DEDUCTION_CULPRIT'; payload: string | null }
  | { type: 'SET_DEDUCTION_METHOD'; payload: string | null }
  | { type: 'SET_DEDUCTION_MOTIVE'; payload: string | null }
  | { type: 'SUBMIT_DEDUCTION' }
  | { type: 'RESET_CASE' };
