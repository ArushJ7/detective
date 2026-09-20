import type { AssessmentStatus, DeductionValidationResult, ResolutionState, DeductionDraft } from '../../state/types';
import { CASE_001_TRUTH } from './truth';

export function validateDeduction(draft: DeductionDraft): DeductionValidationResult {
  const KEY_EVIDENCE = ['EVD-001', 'EVD-004', 'EVD-005', 'EVD-009', 'EVD-012'];
  const KEY_TIMELINE = ['evt-2124', 'evt-2131', 'evt-2138'];

  // 1. Culprit Assessment
  const isCulpritCorrect = draft.culpritId === CASE_001_TRUTH.culpritId;
  const culpritAssessment = {
    isCorrect: isCulpritCorrect,
    status: (isCulpritCorrect ? 'ESTABLISHED' : 'UNRESOLVED') as AssessmentStatus,
    notes: isCulpritCorrect
      ? 'James Blackwood correctly identified as the sole perpetrator.'
      : 'Selected suspect was not involved in executing the theft.'
  };

  // 2. Method Assessment
  const isMethodCorrect = draft.methodId === CASE_001_TRUTH.methodId;
  const methodAssessment = {
    isCorrect: isMethodCorrect,
    status: (isMethodCorrect ? 'ESTABLISHED' : 'UNRESOLVED') as AssessmentStatus,
    notes: isMethodCorrect
      ? 'Paraffin wax key impressioning & 21:24 basement breaker sabotage verified.'
      : 'Selected method fails to match vitrine lock state, wax mold, and electrical telemetry.'
  };

  // 3. Motive Assessment
  const isMotiveCorrect = draft.motiveId === CASE_001_TRUTH.motiveId;
  const motiveAssessment = {
    isCorrect: isMotiveCorrect,
    status: (isMotiveCorrect ? 'ESTABLISHED' : 'UNRESOLVED') as AssessmentStatus,
    notes: isMotiveCorrect
      ? '£14,200 London Syndicate gambling debt established as immediate pressure.'
      : 'Assumed motive is unsupported by financial records and debt ledgers.'
  };

  // 4. Evidence Chain Assessment
  const matchedKeyEvidence = draft.selectedEvidenceIds.filter(id => KEY_EVIDENCE.includes(id));
  const matchedKeyEvCount = matchedKeyEvidence.length;
  let evStatus: AssessmentStatus = 'UNRESOLVED';
  let evCorrect = false;

  if (matchedKeyEvCount >= 3) {
    evStatus = 'ESTABLISHED';
    evCorrect = true;
  } else if (matchedKeyEvCount >= 1) {
    evStatus = 'SUPPORTED';
    evCorrect = true;
  } else if (draft.selectedEvidenceIds.length > 0) {
    evStatus = 'PARTIALLY SUPPORTED';
    evCorrect = false;
  }

  const evidenceAssessment = {
    isCorrect: evCorrect,
    status: evStatus,
    matchedKeyCount: matchedKeyEvCount,
    totalKeyCount: KEY_EVIDENCE.length,
    notes: evCorrect
      ? `Attached ${matchedKeyEvCount}/${KEY_EVIDENCE.length} key physical exhibits (lock, wax mold, telemetry, CCTV clip, duplicate blank) linking suspect to the crime scene.`
      : 'Attached evidence chain lacks direct physical connection to the vitrine breach or breaker panel.'
  };

  // 5. Timeline Reconstruction Assessment
  const matchedKeyTimeline = draft.selectedTimelineEventIds.filter(id => KEY_TIMELINE.includes(id));
  const matchedKeyTimeCount = matchedKeyTimeline.length;
  let timeStatus: AssessmentStatus = 'UNRESOLVED';
  let timeCorrect = false;

  if (matchedKeyTimeCount >= 2) {
    timeStatus = 'ESTABLISHED';
    timeCorrect = true;
  } else if (matchedKeyTimeCount === 1) {
    timeStatus = 'SUPPORTED';
    timeCorrect = true;
  } else if (draft.selectedTimelineEventIds.length > 0) {
    timeStatus = 'PARTIALLY SUPPORTED';
    timeCorrect = false;
  }

  const timelineAssessment = {
    isCorrect: timeCorrect,
    status: timeStatus,
    matchedKeyCount: matchedKeyTimeCount,
    totalKeyCount: KEY_TIMELINE.length,
    notes: timeCorrect
      ? `Reconstructed ${matchedKeyTimeCount}/${KEY_TIMELINE.length} critical timestamps during the 21:24 blackout and vitrine access window.`
      : 'Timeline sequence fails to account for the 240-second electrical outage.'
  };

  // 6. Overall Resolution State
  let resolutionState: ResolutionState = 'UNRESOLVED';
  let summaryTitle = '';
  let summaryNarrative = '';

  if (isCulpritCorrect && isMethodCorrect && isMotiveCorrect && matchedKeyEvCount >= 2) {
    resolutionState = 'SOLVED';
    summaryTitle = 'CASE SOLVED · ACCUSATION SUBSTANTIATED';
    summaryNarrative = 'Perpetrator James Blackwood has been formally accused. The paraffin wax impression mold, electrical telemetry log, and gambling debt ledgers constitute conclusive proof beyond reasonable doubt.';
  } else if (isCulpritCorrect) {
    resolutionState = 'PARTIALLY_SOLVED';
    summaryTitle = 'PARTIALLY SOLVED · CULPRIT DETAINED';
    summaryNarrative = 'James Blackwood has been taken into custody based on suspect identification. However, gaps in the method or motive narrative leave reasonable doubt for legal defense.';
  } else {
    resolutionState = 'UNRESOLVED';
    summaryTitle = 'CASE UNRESOLVED · FLAWED ACCUSATION';
    summaryNarrative = 'The wrong suspect has been accused. The true perpetrator remains at large while key physical evidence remains unexplained.';
  }

  return {
    resolutionState,
    culprit: culpritAssessment,
    method: methodAssessment,
    motive: motiveAssessment,
    evidenceChain: evidenceAssessment,
    timelineReconstruction: timelineAssessment,
    summaryTitle,
    summaryNarrative
  };
}
