import type { DeductionDraft, DeductionValidationResult, ComponentAssessment } from '../../state/types';
import { CASE_003_TRUTH } from './truth';

const KEY_EVIDENCE_IDS = ['EVD-301', 'EVD-302', 'EVD-303', 'EVD-305', 'EVD-306', 'EVD-308'];
const KEY_TIMELINE_IDS = ['evt-3014', 'evt-3018', 'evt-3020', 'evt-3026', 'evt-3028'];

export function validateCase003Deduction(draft: DeductionDraft): DeductionValidationResult {
  const isCulpritCorrect = draft.culpritId === CASE_003_TRUTH.culpritId;
  const isMethodCorrect = draft.methodId === CASE_003_TRUTH.methodId;
  const isMotiveCorrect = draft.motiveId === CASE_003_TRUTH.motiveId;

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
      ? 'Julian Vance correctly identified as the perpetrator of the art theft.'
      : 'Incorrect suspect identified. Physical trace evidence and acoustic door tests refute this accusation.'
  };

  // Method Assessment
  const methodAssessment: ComponentAssessment = {
    isCorrect: isMethodCorrect,
    status: isMethodCorrect ? 'ESTABLISHED' : isCulpritCorrect ? 'PARTIALLY SUPPORTED' : 'UNRESOLVED',
    notes: isMethodCorrect
      ? 'Dynamo breaker blackout short (EVD-302), felt-soled canvas excision (EVD-304), velvet blank substitution (EVD-301), and chemical cylinder concealment (EVD-306) correctly identified.'
      : 'Theft method misidentified. The blackout was manually caused at the dynamo breaker, and the canvas was concealed inside a hollow brass chemical storage cylinder in Vance\'s restoration alcove.'
  };

  // Motive Assessment
  const motiveAssessment: ComponentAssessment = {
    isCorrect: isMotiveCorrect,
    status: isMotiveCorrect ? 'ESTABLISHED' : isCulpritCorrect ? 'SUPPORTED' : 'UNRESOLVED',
    notes: isMotiveCorrect
      ? '£12,000 Blackwood Syndicate debt demand due at midnight (EVD-308) and private buyer offer correctly identified.'
      : 'Motive misidentified. Vance was facing immediate physical and legal destruction from Soho bookmakers unless he produced £12,000 before midnight.'
  };

  // Evidence Chain Output
  const evidenceChainAssessment = {
    isCorrect: isEvidenceChainStrong,
    status: (isEvidenceChainStrong ? 'ESTABLISHED' : matchedEvidenceCount > 0 ? 'PARTIALLY SUPPORTED' : 'UNRESOLVED') as any,
    notes: isEvidenceChainStrong
      ? `Strong evidentiary chain (${matchedEvidenceCount}/${totalKeyEvidence} key exhibits attached, including breaker graphite trace and acoustic door test).`
      : `Incomplete evidence chain (${matchedEvidenceCount}/${totalKeyEvidence} key exhibits attached).`,
    matchedKeyCount: matchedEvidenceCount,
    totalKeyCount: totalKeyEvidence
  };

  // Timeline Reconstruction Output
  const timelineAssessment = {
    isCorrect: isTimelineStrong,
    status: (isTimelineStrong ? 'ESTABLISHED' : matchedTimelineCount > 0 ? 'SUPPORTED' : 'UNRESOLVED') as any,
    notes: isTimelineStrong
      ? `Timeline sequence established (${matchedTimelineCount}/${totalKeyTimeline} key timestamps attached, acknowledging 12-minute blackout window 21:18-21:30 GMT).`
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
    summaryTitle = 'CASE #003 SOLVED: ACCUSATION SUBSTANTIATED';
    summaryNarrative =
      'Your forensic deduction is flawless. You correctly deduced that Senior Curator Julian Vance disengaged the emergency gong pull-wire (EVD-303) at 21:15 GMT, short-circuited the sub-basement dynamo breaker (EVD-302) at 21:17 GMT, unmounted the canvas wearing felt slippers (EVD-304), inserted a dark velvet backing (EVD-301), and hid the rolled masterpiece inside hollow brass cylinder EVD-306 to pay his £12,000 Blackwood Syndicate debt (EVD-308).\n\nVance\'s alibi of hearing the 21:24 GMT emergency gong from inside the locked Restoration Room was completely disproved by acoustic soundproofing test EVD-305 and disengaged gong wire EVD-303. Scotland Yard has taken Vance into custody and recovered "The Astronomical Quadrant of Tycho Brahe" undamaged.';
  } else if (isCulpritCorrect) {
    resolutionState = 'PARTIALLY_SOLVED';
    summaryTitle = 'CASE #003 PARTIALLY SOLVED: CULPRIT DETAINED';
    summaryNarrative =
      'Julian Vance has been taken into custody based on financial debt notes and tool trace evidence. However, your reconstruction of the blackout theft mechanism or concealment location was incomplete. The original canvas remained hidden in hollow brass storage cylinder EVD-306 until a secondary search of the restoration alcove.';
  } else {
    resolutionState = 'UNRESOLVED';
    summaryTitle = 'CASE #003 UNRESOLVED: ACCUSATION REJECTED';
    summaryNarrative =
      'The Magistrates\' Court has rejected your indictment. Physical evidence (acoustic door soundproofing, disengaged alarm cable, felt-soled footwear prints) demonstrates that your chosen suspect could not have committed the crime as accused. Re-examine the Sub-Basement dynamo breaker and Vance\'s acoustic door alibi.';
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
