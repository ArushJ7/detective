import { caseRegistry } from './caseRegistry';
import type { CaseDefinition, CaseMetadata } from '../cases/types';

export class CaseManager {
  private static activeCaseId: string = 'case-001';

  public static getActiveCaseId(): string {
    return this.activeCaseId;
  }

  public static getActiveCase(): CaseDefinition {
    const active = caseRegistry[this.activeCaseId];
    if (!active) {
      return caseRegistry['case-001'];
    }
    return active;
  }

  public static getCase(caseId: string): CaseDefinition | null {
    return caseRegistry[caseId] || null;
  }

  public static setActiveCase(caseId: string): boolean {
    if (caseRegistry[caseId]) {
      this.activeCaseId = caseId;
      return true;
    }
    return false;
  }

  public static getAllCasesMetadata(): CaseMetadata[] {
    // Unique list of cases
    const seen = new Set<string>();
    const list: CaseMetadata[] = [];
    
    Object.values(caseRegistry).forEach(c => {
      if (!seen.has(c.metadata.id)) {
        seen.add(c.metadata.id);
        list.push(c.metadata);
      }
    });

    return list;
  }

  public static validateCaseDeduction(caseId: string, draft: any) {
    const targetCase = this.getCase(caseId) || this.getActiveCase();
    return targetCase.validateDeduction(draft);
  }
}
