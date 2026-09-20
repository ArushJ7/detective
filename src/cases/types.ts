import React from 'react';
import type {
  EvidenceItem,
  Suspect,
  TimelineEvent,
  EstateLocation,
  CaseTruth,
  StatementContradiction,
  DeductionValidationResult,
  DeductionDraft
} from '../state/types';

export interface CaseMetadata {
  id: string;
  caseNumber: string;
  title: string;
  subtitle: string;
  location: string;
  year: string;
  difficulty: 'FORENSIC DEDUCTION (UNGUIDED)' | 'STANDARD' | 'HARD';
  estimatedDuration: string;
  synopsis: string;
  fullReportQuote: string;
  fullReportBody: string;
  status: 'available' | 'locked' | 'completed';
}

export interface CaseDeductionOptions {
  culprits: Array<{ id: string; label: string }>;
  methods: Array<{ id: string; label: string }>;
  motives: Array<{ id: string; label: string }>;
}

export interface CaseDefinition {
  metadata: CaseMetadata;
  evidence: EvidenceItem[];
  suspects: Suspect[];
  timeline: TimelineEvent[];
  locations: EstateLocation[];
  contradictions: StatementContradiction[];
  initialObjectives: string[];
  deductionOptions: CaseDeductionOptions;
  truth: CaseTruth;
  validateDeduction: (draft: DeductionDraft) => DeductionValidationResult;
  specialSceneComponent?: React.ComponentType;
}
