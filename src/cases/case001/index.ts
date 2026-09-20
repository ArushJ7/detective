import type { CaseDefinition } from '../types';
import { CASE_001_METADATA } from './metadata';
import { CASE_001_EVIDENCE } from './evidence';
import { CASE_001_SUSPECTS, CASE_001_CONTRADICTIONS } from './suspects';
import { CASE_001_TIMELINE } from './timeline';
import { CASE_001_LOCATIONS } from './locations';
import { CASE_001_INITIAL_OBJECTIVES } from './objectives';
import { CASE_001_TRUTH, CASE_001_DEDUCTION_OPTIONS } from './truth';
import { validateCase001Deduction } from './validation';

export const case001: CaseDefinition = {
  metadata: CASE_001_METADATA,
  evidence: CASE_001_EVIDENCE,
  suspects: CASE_001_SUSPECTS,
  timeline: CASE_001_TIMELINE,
  locations: CASE_001_LOCATIONS,
  contradictions: CASE_001_CONTRADICTIONS,
  initialObjectives: CASE_001_INITIAL_OBJECTIVES,
  deductionOptions: CASE_001_DEDUCTION_OPTIONS,
  truth: CASE_001_TRUTH,
  validateDeduction: validateCase001Deduction
};

export * from './metadata';
export * from './evidence';
export * from './suspects';
export * from './timeline';
export * from './locations';
export * from './truth';
export * from './validation';
