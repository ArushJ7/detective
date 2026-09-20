import type { CaseDefinition } from '../types';
import { CASE_003_METADATA } from './metadata';
import { CASE_003_EVIDENCE } from './evidence';
import { CASE_003_SUSPECTS, CASE_003_CONTRADICTIONS } from './suspects';
import { CASE_003_TIMELINE } from './timeline';
import { CASE_003_LOCATIONS } from './locations';
import { CASE_003_OBJECTIVES } from './objectives';
import { CASE_003_TRUTH, CASE_003_DEDUCTION_OPTIONS } from './truth';
import { validateCase003Deduction } from './validation';

export const case003: CaseDefinition = {
  metadata: CASE_003_METADATA,
  evidence: CASE_003_EVIDENCE,
  suspects: CASE_003_SUSPECTS,
  timeline: CASE_003_TIMELINE,
  locations: CASE_003_LOCATIONS,
  contradictions: CASE_003_CONTRADICTIONS,
  initialObjectives: CASE_003_OBJECTIVES,
  deductionOptions: CASE_003_DEDUCTION_OPTIONS,
  truth: CASE_003_TRUTH,
  validateDeduction: validateCase003Deduction
};

export * from './metadata';
export * from './evidence';
export * from './suspects';
export * from './timeline';
export * from './locations';
export * from './truth';
export * from './validation';
