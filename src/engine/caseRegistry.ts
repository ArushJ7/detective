import { case001 } from '../cases/case001';
import { case002 } from '../cases/case002';
import type { CaseDefinition } from '../cases/types';

export const caseRegistry: Record<string, CaseDefinition> = {
  'case-001': case001,
  'case001': case001,
  'CASE-001': case001,
  'case-002': case002,
  'case002': case002,
  'CASE-002': case002
};

