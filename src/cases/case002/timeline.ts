import type { TimelineEvent } from '../../state/types';

export const CASE_002_TIMELINE: TimelineEvent[] = [
  {
    id: 'evt-1800',
    time: '18:00 GMT',
    title: 'Lab Confrontation over Stolen Patent',
    description: 'Professor Cole confronts Dr. Evelyn Reed in the research lab after discovering she secretly sold his synthetic alkaloid patent to Apex Chemical Syndicate for £10,000.',
    location: 'Highland Research Laboratory',
    relatedSuspects: ['dr-evelyn-reed'],
    relatedEvidence: ['EVD-203', 'EVD-211', 'EVD-214'],
    hasContradiction: true,
    contradictionNote: 'Reed claims they discussed routine lab supplies.'
  },
  {
    id: 'evt-2015',
    time: '20:15 GMT',
    title: 'Dinner Concludes at Highland Estate',
    description: 'Dinner concludes in the main dining hall. Professor Cole, Lady Margaret, Dr. Reed, Julian Sterling, and guests separate.',
    location: 'Main Dining Hall',
    relatedSuspects: ['dr-evelyn-reed', 'julian-sterling', 'lady-margaret-cole', 'arthur-vance'],
    relatedEvidence: []
  },
  {
    id: 'evt-2030',
    time: '20:30 GMT',
    title: 'Reed Rigging Mechanism & Contaminating Stamp',
    description: 'Dr. Evelyn Reed enters Cole\'s study alone under the pretext of returning a monograph. She coats the wax seal stamp handle with neurotoxin (EVD-204) and rigs the calibrated candle-string decoy (EVD-208 / EVD-209).',
    location: 'Professor Cole\'s Study',
    relatedSuspects: ['dr-evelyn-reed'],
    relatedEvidence: ['EVD-204', 'EVD-208', 'EVD-209'],
    hasContradiction: true,
    contradictionNote: 'Reed claims she dropped a book and left in 30 seconds.'
  },
  {
    id: 'evt-2045',
    time: '20:45 GMT',
    title: 'Reed Joins Guests in Drawing Room',
    description: 'Dr. Reed leaves the study area and joins Lady Margaret in the Drawing Room to begin their evening chess game.',
    location: 'Drawing Room',
    relatedSuspects: ['dr-evelyn-reed', 'lady-margaret-cole'],
    relatedEvidence: []
  },
  {
    id: 'evt-2103',
    time: '21:03 GMT',
    title: 'Cole Locks Study Door from Inside',
    description: 'Professor Cole enters his study alone and locks the heavy oak door from inside with the mortise deadbolt. Butler Vance hears the deadbolt engage.',
    location: 'Study Door & Hallway',
    relatedSuspects: ['arthur-vance'],
    relatedEvidence: ['EVD-201', 'EVD-202']
  },
  {
    id: 'evt-2110',
    time: '21:10 GMT',
    title: 'Cole Handles Contaminated Wax Seal Stamp',
    description: 'Cole writes his letter to the Royal Society exposing Dr. Reed. He handles the brass wax seal stamp (EVD-204), initiating transdermal absorption of the neurotoxin.',
    location: 'Professor Cole\'s Writing Desk',
    relatedSuspects: ['dr-evelyn-reed'],
    relatedEvidence: ['EVD-203', 'EVD-204', 'EVD-207']
  },
  {
    id: 'evt-2125',
    time: '21:20–21:30 GMT',
    title: 'Neuromuscular Paralysis & Collapse Window',
    description: 'Transdermal neurotoxin takes effect (~21:25 central point). Cole suffers respiratory paralysis, drops his pen, and collapses onto the carpet near his desk.',
    location: 'Professor Cole\'s Study',
    relatedSuspects: ['dr-evelyn-reed'],
    relatedEvidence: ['EVD-204', 'EVD-206', 'EVD-207'],
    hasContradiction: true,
    contradictionNote: 'Autopsy proves collapse occurred between 21:20 and 21:30, NOT at 21:42 thud.'
  },
  {
    id: 'evt-2142',
    time: '21:42 GMT',
    title: 'Decoy Sound: Sphinx Paperweight Crashes',
    description: 'The calibrated tallow candle burns through the gut string (EVD-209). The 3.2 lb sphinx paperweight (EVD-208) plummets onto the hearth fender with a loud thud, creating a false timestamp while Reed is in the Drawing Room.',
    location: 'Study Hearth & Lectern / West Terrace',
    relatedSuspects: ['dr-evelyn-reed', 'julian-sterling'],
    relatedEvidence: ['EVD-208', 'EVD-209', 'EVD-212'],
    hasContradiction: true,
    contradictionNote: 'Witnesses assumed an attack occurred at 21:42; it was a mechanical decoy.'
  },
  {
    id: 'evt-2145',
    time: '21:45 GMT',
    title: 'Alarm Raised by Sterling & Butler Vance',
    description: 'Julian Sterling knocks frantically on the study door after hearing the thud. Receiving no answer, he alerts Butler Arthur Vance.',
    location: 'East Wing Corridor',
    relatedSuspects: ['julian-sterling', 'arthur-vance'],
    relatedEvidence: []
  },
  {
    id: 'evt-2150',
    time: '21:50 GMT',
    title: 'Study Door Forced Open with Crowbar',
    description: 'Butler Vance forces the locked study door using a crowbar, deforming the strike plate (EVD-201). Cole is discovered unconscious on the floor.',
    location: 'Study Door Jamb',
    relatedSuspects: ['arthur-vance'],
    relatedEvidence: ['EVD-201', 'EVD-202', 'EVD-206']
  }
];
