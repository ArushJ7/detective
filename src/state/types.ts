export type EvidenceType = 'physical' | 'document' | 'digital' | 'forensic' | 'photo' | 'note';
export type EvidenceCategory = 'photo' | 'document' | 'object' | 'digital' | 'audio';

export interface ForensicObservation {
  id: string;
  label: string;
  text: string;
  detailText?: string;
  confirmed: boolean;
}

export interface EvidenceItem {
  id: string;
  title: string;
  subtitle?: string;
  type: EvidenceType;
  category: EvidenceCategory;
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
  observations: ForensicObservation[];
  relatedSuspects: string[];
  relatedTimelineEvents: string[];
}

export interface InterrogationTopic {
  id: string;
  title: string;
  prompt: string;
  response: string;
  category?: 'timeline' | 'alibi' | 'evidence' | 'motive';
  revealsTruth: boolean;
  unlocksEvidenceId?: string;
  requiredEvidenceId?: string;
  contradictionDiscoveredId?: string;
}

export interface Suspect {
  id: string;
  name: string;
  role: string;
  avatar: string;
  age?: string;
  domicile?: string;
  financialStatus?: string;
  bio: string;
  alibi: string;
  alibiDiscrepancy: string;
  statement: string;
  statementTime: string;
  motive: string;
  suspicionLevel: 'High' | 'Medium' | 'Low';
  behavioralCue: string;
  composureStatus: string;
  pulseBpm: number;
  tags: string[];
  imagePath?: string;
  keyObservations: string[];
  linkedEvidenceIds: string[];
  timelineEventIds: string[];
  interrogationTopics: InterrogationTopic[];
}

export interface TimelineEvent {
  id: string;
  time: string;
  title: string;
  description: string;
  location: string;
  relatedSuspects: string[];
  relatedEvidence: string[];
  hasContradiction?: boolean;
  contradictionNote?: string;
}

export interface StatementContradiction {
  id: string;
  suspectId: string;
  statementSnippet: string;
  contradictingEvidenceId: string;
  title: string;
  explanation: string;
  discovered: boolean;
}

export interface BoardConnection {
  id: string;
  sourceId: string;
  targetId: string;
  label?: string;
  color?: string;
}

export interface NotebookNote {
  id: string;
  type: 'free' | 'evidence' | 'suspect' | 'timeline' | 'theory';
  title: string;
  content: string;
  annotation: 'IMPORTANT' | 'QUESTION' | 'FOLLOW UP' | 'CONTRADICTION' | 'THEORY';
  createdAt: string;
  relatedEvidenceId?: string;
  relatedSuspectId?: string;
  relatedTimelineEventId?: string;
}

export interface EstateLocation {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  coordinates: { x: number; y: number };
  evidenceIds: string[];
  suspectIds: string[];
  timelineEventIds: string[];
  status: 'SEARCHED' | 'ACTIVE HOTSPOT' | 'SECURED';
}

export interface CaseTruth {
  culpritId: string;
  methodId: string;
  motiveId: string;
  explanation: string;
}

export type AssessmentStatus = 'ESTABLISHED' | 'SUPPORTED' | 'PARTIALLY SUPPORTED' | 'UNRESOLVED';
export type ResolutionState = 'SOLVED' | 'PARTIALLY_SOLVED' | 'UNRESOLVED';

export interface ComponentAssessment {
  status: AssessmentStatus;
  isCorrect: boolean;
  notes: string;
}

export interface DeductionValidationResult {
  resolutionState: ResolutionState;
  culprit: ComponentAssessment;
  method: ComponentAssessment;
  motive: ComponentAssessment;
  evidenceChain: ComponentAssessment & { matchedKeyCount: number; totalKeyCount: number };
  timelineReconstruction: ComponentAssessment & { matchedKeyCount: number; totalKeyCount: number };
  summaryTitle: string;
  summaryNarrative: string;
}

export interface DeductionDraft {
  culpritId: string | null;
  methodId: string | null;
  motiveId: string | null;
  selectedEvidenceIds: string[];
  selectedTimelineEventIds: string[];
  theoryText: string;
}

export interface InvestigationState {
  activeCaseId: string;
  caseId: string;
  caseTitle: string;
  currentObjective: string;
  discoveredEvidenceIds: string[];
  inspectedEvidenceIds: string[];
  unlockedVaultItemIds: string[];
  boardConnections: BoardConnection[];
  cardPositions: Record<string, { x: number; y: number }>;
  workingHypothesis: string;
  questionedSuspectIds: string[];
  unlockedTopicIds: Record<string, string[]>;
  discoveredContradictionIds: string[];
  selectedTimelineFilter: string;
  notes: NotebookNote[];
  selectedLocationId: string | null;
  uvModeActive: boolean;
  selectedEvidenceId: string | null;
  selectedSuspectId: string | null;
  deductionDraft: DeductionDraft;
  deductionSubmitted: boolean;
  deductionResult: DeductionValidationResult | null;
  caseSolved: boolean | null;
}

export type InvestigationAction =
  | { type: 'SWITCH_CASE'; payload: string }
  | { type: 'DISCOVER_EVIDENCE'; payload: string }
  | { type: 'INSPECT_EVIDENCE'; payload: string }
  | { type: 'UNLOCK_VAULT_ITEM'; payload: string }
  | { type: 'ADD_BOARD_CONNECTION'; payload: BoardConnection }
  | { type: 'REMOVE_BOARD_CONNECTION'; payload: string }
  | { type: 'UPDATE_CARD_POSITION'; payload: { id: string; x: number; y: number } }
  | { type: 'SET_WORKING_HYPOTHESIS'; payload: string }
  | { type: 'CONFIRM_OBSERVATION'; payload: { evidenceId: string; observationId: string } }
  | { type: 'QUESTION_SUSPECT'; payload: { suspectId: string; topicId: string } }
  | { type: 'DISCOVER_CONTRADICTION'; payload: string }
  | { type: 'SELECT_TIMELINE_FILTER'; payload: string }
  | { type: 'ADD_NOTE'; payload: NotebookNote }
  | { type: 'UPDATE_NOTE'; payload: NotebookNote }
  | { type: 'DELETE_NOTE'; payload: string }
  | { type: 'SELECT_LOCATION'; payload: string | null }
  | { type: 'TOGGLE_UV_MODE'; payload?: boolean }
  | { type: 'SELECT_EVIDENCE'; payload: string | null }
  | { type: 'SELECT_SUSPECT'; payload: string | null }
  | { type: 'SET_OBJECTIVE'; payload: string }
  | { type: 'SET_DEDUCTION_CULPRIT'; payload: string | null }
  | { type: 'SET_DEDUCTION_METHOD'; payload: string | null }
  | { type: 'SET_DEDUCTION_MOTIVE'; payload: string | null }
  | { type: 'TOGGLE_DEDUCTION_EVIDENCE'; payload: string }
  | { type: 'TOGGLE_DEDUCTION_TIMELINE'; payload: string }
  | { type: 'SET_DEDUCTION_THEORY'; payload: string }
  | { type: 'SUBMIT_DEDUCTION' }
  | { type: 'RESET_DEDUCTION' }
  | { type: 'RESET_CASE' };

