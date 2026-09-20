import type { CaseDefinition } from '../types';
import { CASE_002_METADATA } from './metadata';
import { CASE_002_EVIDENCE } from './evidence';
import { CASE_002_SUSPECTS, CASE_002_CONTRADICTIONS } from './suspects';
import { CASE_002_TIMELINE } from './timeline';
import { CASE_002_LOCATIONS } from './locations';
import { CASE_002_INITIAL_OBJECTIVES } from './objectives';
import { CASE_002_TRUTH, CASE_002_DEDUCTION_OPTIONS } from './truth';
import { validateCase002Deduction } from './validation';

export const case002: CaseDefinition = {
  metadata: CASE_002_METADATA,
  evidence: CASE_002_EVIDENCE,
  suspects: CASE_002_SUSPECTS,
  timeline: CASE_002_TIMELINE,
  locations: CASE_002_LOCATIONS,
  contradictions: CASE_002_CONTRADICTIONS,
  initialObjectives: CASE_002_INITIAL_OBJECTIVES,
  deductionOptions: CASE_002_DEDUCTION_OPTIONS,
  truth: CASE_002_TRUTH,
  validateDeduction: validateCase002Deduction
};

export * from './metadata';
export * from './evidence';
export * from './suspects';
export * from './timeline';
export * from './locations';
export * from './truth';
export * from './validation';
