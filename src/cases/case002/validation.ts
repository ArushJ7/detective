import type { DeductionDraft, DeductionValidationResult, ComponentAssessment } from '../../state/types';
import { CASE_002_TRUTH } from './truth';

const KEY_EVIDENCE_IDS = ['EVD-204', 'EVD-207', 'EVD-209', 'EVD-203', 'EVD-214'];
const KEY_TIMELINE_IDS = ['evt-2030', 'evt-2103', 'evt-2125', 'evt-2142'];

export function validateCase002Deduction(draft: DeductionDraft): DeductionValidationResult {
  const isCulpritCorrect = draft.culpritId === CASE_002_TRUTH.culpritId;
  const isMethodCorrect = draft.methodId === CASE_002_TRUTH.methodId;
  const isMotiveCorrect = draft.motiveId === CASE_002_TRUTH.motiveId;

  // Evidence Chain Assessment
  const matchedEvidenceCount = draft.selectedEvidenceIds.filter(id => KEY_EVIDENCE_IDS.includes(id)).length;
  const totalKeyEvidence = KEY_EVIDENCE_IDS.length;
  const isEvidenceChainStrong = matchedEvidenceCount >= 3;

  // Timeline Reconstruction Assessment
  const matchedTimelineCount = draft.selectedTimelineEventIds.filter(id => KEY_TIMELINE_IDS.includes(id)).length;
  const totalKeyTimeline = KEY_TIMELINE_IDS.length;
  const isTimelineStrong = matchedTimelineCount >= 2;

  // Culprit Assessment
  const culpritAssessment: ComponentAssessment = {
    isCorrect: isCulpritCorrect,
    status: isCulpritCorrect ? 'ESTABLISHED' : 'UNRESOLVED',
    notes: isCulpritCorrect
      ? 'Dr. Evelyn Reed correctly identified as the perpetrator of the poisoning.'
      : 'Incorrect suspect identified. Physical evidence and timeline contradict this accusation.'
  };

  // Method Assessment
  const methodAssessment: ComponentAssessment = {
    isCorrect: isMethodCorrect,
    status: isMethodCorrect ? 'ESTABLISHED' : isCulpritCorrect ? 'PARTIALLY SUPPORTED' : 'UNRESOLVED',
    notes: isMethodCorrect
      ? 'Contaminated wax seal stamp (EVD-204) and 21:42 candle-string paperweight sound decoy (EVD-209/208) correctly identified.'
      : 'Mechanism incorrectly identified. The room was locked from within by the victim himself at 21:03; the 21:42 thud was a mechanical sound decoy.'
  };

  // Motive Assessment
  const motiveAssessment: ComponentAssessment = {
    isCorrect: isMotiveCorrect,
    status: isMotiveCorrect ? 'ESTABLISHED' : isCulpritCorrect ? 'SUPPORTED' : 'UNRESOLVED',
    notes: isMotiveCorrect
      ? 'Prevention of exposure for £10,000 synthetic alkaloid patent theft correctly identified.'
      : 'Motive misidentified. The dispute stemmed from Cole discovering Reed\'s secret patent sale to Apex Chemical Syndicate.'
  };

  // Evidence Chain Assessment Output
  const evidenceChainAssessment = {
    isCorrect: isEvidenceChainStrong,
    status: (isEvidenceChainStrong ? 'ESTABLISHED' : matchedEvidenceCount > 0 ? 'PARTIALLY SUPPORTED' : 'UNRESOLVED') as any,
    notes: isEvidenceChainStrong
      ? `Strong evidentiary chain (${matchedEvidenceCount}/${totalKeyEvidence} key exhibits attached, including contaminated stamp and autopsy collapse window).`
      : `Incomplete evidence chain (${matchedEvidenceCount}/${totalKeyEvidence} key exhibits attached).`,
    matchedKeyCount: matchedEvidenceCount,
    totalKeyCount: totalKeyEvidence
  };

  // Timeline Reconstruction Output
  const timelineAssessment = {
    isCorrect: isTimelineStrong,
    status: (isTimelineStrong ? 'ESTABLISHED' : matchedTimelineCount > 0 ? 'SUPPORTED' : 'UNRESOLVED') as any,
    notes: isTimelineStrong
      ? `Timeline sequence established (${matchedTimelineCount}/${totalKeyTimeline} key timestamps attached, acknowledging 21:20-21:30 collapse window).`
      : `Timeline reconstruction incomplete (${matchedTimelineCount}/${totalKeyTimeline} key timestamps attached).`,
    matchedKeyCount: matchedTimelineCount,
    totalKeyCount: totalKeyTimeline
  };

  // Overall Resolution State
  let resolutionState: 'SOLVED' | 'PARTIALLY_SOLVED' | 'UNRESOLVED';
  let summaryTitle: string;
  let summaryNarrative: string;

  if (isCulpritCorrect && isMethodCorrect && isMotiveCorrect) {
    resolutionState = 'SOLVED';
    summaryTitle = 'CASE #002 SOLVED: ACCUSATION SUBSTANTIATED';
    summaryNarrative =
      'Your deduction is flawless. You correctly deduced that Dr. Evelyn Reed poisoned Professor Cole at 20:30 by coating his wax seal stamp handle with neurotoxin (EVD-204) and setting up a calibrated candle decoy (EVD-209) to drop a sphinx paperweight (EVD-208) at 21:42.\n\nCole locked himself in his study at 21:03, handled the stamp at 21:10, and collapsed between 21:20 and 21:30 (EVD-207). The 21:42 thud was a mechanical illusion that gave Reed an ironclad Drawing Room alibi. Dr. Reed has been taken into custody by Scotland Yard.';
  } else if (isCulpritCorrect) {
    resolutionState = 'PARTIALLY_SOLVED';
    summaryTitle = 'CASE #002 PARTIALLY SOLVED: CULPRIT DETAINED';
    summaryNarrative =
      'Dr. Evelyn Reed has been detained based on financial motive and patent correspondence. However, your reconstruction of the locked-room mechanism or timeline was incomplete. The 21:42 thud was not an attack, but a delayed candle-string paperweight decoy set by Reed at 20:30.';
  } else {
    resolutionState = 'UNRESOLVED';
    summaryTitle = 'CASE #002 UNRESOLVED: ACCUSATION REJECTED';
    summaryNarrative =
      'The Magistrates\' Court has rejected your indictment. The physical evidence (mortise deadbolt locked from within, latched windows, transdermal toxin absorption) demonstrates that your chosen suspect could not have committed the crime as accused. Re-examine the wax stamp and autopsy collapse window.';
  }

  return {
    resolutionState,
    culprit: culpritAssessment,
    method: methodAssessment,
    motive: motiveAssessment,
    evidenceChain: evidenceChainAssessment,
    timelineReconstruction: timelineAssessment,
    summaryTitle,
    summaryNarrative
  };
}
