import type { Suspect, StatementContradiction } from '../../state/types';

export const CASE_002_SUSPECTS: Suspect[] = [
  {
    id: 'dr-evelyn-reed',
    name: 'Dr. Evelyn Reed',
    role: 'Senior Research Associate / Former Protégé',
    avatar: 'ER',
    age: '34',
    domicile: 'Edinburgh & London',
    financialStatus: 'Debts & £10,000 Syndicate Contract',
    bio: 'Former star pupil of Professor Cole, now senior associate. Bitter rival over synthetic alkaloid patent rights.',
    alibi: 'Playing chess with Lady Margaret in the Drawing Room from 21:15 to 21:50.',
    alibiDiscrepancy: 'Alibi holds for the 21:42 thud, but fails because poisoning occurred at 20:30 via transdermal wax stamp.',
    statement: 'I dropped off a monograph in Professor Cole\'s study at 20:30 and touched nothing on his desk. I joined Lady Margaret in the Drawing Room at 21:15 and played chess until the butler raised the alarm.',
    statementTime: '22:15 GMT',
    motive: 'Cole discovered she stolen his patent for £10,000 and planned to report her to the Royal Society at midnight.',
    suspicionLevel: 'High',
    behavioralCue: 'Calm, highly articulate, cold under pressure; defensive when asked about candle stubs or chemical reagents.',
    composureStatus: 'CALMED / CONTROLLED',
    pulseBpm: 68,
    tags: ['RESEARCH ASSOCIATE', 'CULPRIT', 'PATENT DISPUTE'],
    imagePath: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400',
    keyObservations: [
      'Visited study alone at 20:30 under pretense of returning a paper.',
      'Ironclad Drawing Room alibi for the 21:42 sound thud.',
      'Financial agreement with London Syndicate expiring at midnight.'
    ],
    linkedEvidenceIds: ['EVD-203', 'EVD-204', 'EVD-207', 'EVD-209', 'EVD-211', 'EVD-214'],
    timelineEventIds: ['evt-1800', 'evt-2030', 'evt-2045', 'evt-2115', 'evt-2125', 'evt-2142'],
    interrogationTopics: [
      {
        id: 'topic-reed-2030',
        title: 'Study Visit at 20:30',
        prompt: 'What occurred during your visit to Professor Cole\'s study at 20:30?',
        response: 'I merely dropped a monograph on the side table, spoke two sentences with Professor Cole, and left in under 30 seconds. I touched nothing on his writing desk.',
        category: 'alibi',
        revealsTruth: false,
        requiredEvidenceId: 'EVD-204',
        contradictionDiscoveredId: 'C-1'
      },
      {
        id: 'topic-reed-alibi',
        title: 'Drawing Room Chess Alibi',
        prompt: 'Can anyone verify your whereabouts during the 21:42 disturbance?',
        response: 'Lady Margaret can confirm I never left the chess table between 21:15 and 21:50. How could I possibly attack Professor Cole when I was in full view of witnesses?',
        category: 'alibi',
        revealsTruth: false,
        requiredEvidenceId: 'EVD-207',
        contradictionDiscoveredId: 'C-2'
      },
      {
        id: 'topic-reed-patent',
        title: 'Alkaloid Patent Dispute',
        prompt: 'Did Professor Cole confront you about the Royal Society patent application?',
        response: 'Professor Cole and I had minor academic disagreements, but nothing financial. Our partnership was harmonious.',
        category: 'motive',
        revealsTruth: false,
        requiredEvidenceId: 'EVD-203',
        contradictionDiscoveredId: 'C-4'
      }
    ]
  },
  {
    id: 'julian-sterling',
    name: 'Julian Sterling',
    role: 'Nephew & Disinherited Heir',
    avatar: 'JS',
    age: '28',
    domicile: 'Highland Estate',
    financialStatus: '£4,000 Gambling Debts',
    bio: 'Professor Cole\'s estranged nephew. Anxious, defensive, deeply in debt to London bookmakers.',
    alibi: 'Claimed to be walking in the front gardens between 21:15 and 21:45.',
    alibiDiscrepancy: 'Muddy boot prints (EVD-212) prove he was secretly spying on the west terrace outside Cole\'s window.',
    statement: 'I was taking fresh air in the gardens all evening. At 21:42 I heard a loud thud from the study window and saw a shadow fall. I ran to alert Butler Vance.',
    statementTime: '22:25 GMT',
    motive: 'Cole threatened to cut him out of the Highland Manor will earlier that afternoon.',
    suspicionLevel: 'Medium',
    behavioralCue: 'Nervous, biting fingernails, evasive about terrace movement.',
    composureStatus: 'AGITATED / DEFENSIVE',
    pulseBpm: 94,
    tags: ['ESTRANGED NEPHEW', 'RED HERRING', 'GAMBLING DEBTS'],
    imagePath: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400',
    keyObservations: [
      'Denies going near the west terrace despite boot print match.',
      'Snooping outside study window trying to locate Cole\'s will.',
      'Window was latched from inside, proving he did not enter.'
    ],
    linkedEvidenceIds: ['EVD-205', 'EVD-208', 'EVD-212'],
    timelineEventIds: ['evt-2142', 'evt-2145'],
    interrogationTopics: [
      {
        id: 'topic-sterling-terrace',
        title: 'Terrace Boot Print Match',
        prompt: 'We found size 10 boot prints matching your boots on the west terrace mud outside Cole\'s window.',
        response: 'Alright! I was on the terrace! I was trying to look into his study to see where he kept his safe... but I swear I never opened the window! It was latched from inside!',
        category: 'alibi',
        revealsTruth: true,
        requiredEvidenceId: 'EVD-212',
        contradictionDiscoveredId: 'C-3'
      }
    ]
  },
  {
    id: 'lady-margaret-cole',
    name: 'Lady Margaret Cole',
    role: 'Wife of Professor Cole',
    avatar: 'MC',
    age: '54',
    domicile: 'Highland Estate',
    financialStatus: 'Aristocratic Estate Trust',
    bio: 'Wife of Professor Cole. Aristocratic, proud, observant. Disagreed with Cole\'s refusal to move back to London.',
    alibi: 'Reading and playing chess with Dr. Reed in the Drawing Room from 21:15 to 21:50.',
    alibiDiscrepancy: 'None. Her testimony confirms Dr. Reed\'s physical presence in the Drawing Room at 21:42.',
    statement: 'Dr. Reed sat across from me at the chess table from 21:15 until Arthur Vance shouted in the hall. She never left her seat.',
    statementTime: '22:30 GMT',
    motive: 'Wished to sell Highland Estate; red herring suspect.',
    suspicionLevel: 'Low',
    behavioralCue: 'Composed, stern, protective of family dignity.',
    composureStatus: 'STATED / CALM',
    pulseBpm: 72,
    tags: ['VICTIM WIFE', 'ALIBI WITNESS', 'RED HERRING'],
    imagePath: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=400',
    keyObservations: [
      'Confirms Dr. Reed\'s presence in Drawing Room 21:15-21:50.',
      'Noticed Dr. Reed dropped off a paper in the study around 20:30.'
    ],
    linkedEvidenceIds: ['EVD-209'],
    timelineEventIds: ['evt-2015', 'evt-2115', 'evt-2142'],
    interrogationTopics: [
      {
        id: 'topic-margaret-reed-alibi',
        title: 'Chess Game Verification',
        prompt: 'Did Dr. Reed leave the Drawing Room at any point during your chess game?',
        response: 'Not once. From 21:15 until Arthur called for help at 21:45, Evelyn was seated directly across from me.',
        category: 'alibi',
        revealsTruth: true
      }
    ]
  },
  {
    id: 'arthur-vance',
    name: 'Arthur Vance',
    role: 'Head Butler (30 Years Service)',
    avatar: 'AV',
    age: '62',
    domicile: 'Highland Estate Staff Quarters',
    financialStatus: 'Modest Pension',
    bio: 'Head Butler of Highland Manor for 30 years. Meticulous, formal, completely loyal.',
    alibi: 'Pantry inventory and tea service from 20:30 to 21:45.',
    alibiDiscrepancy: 'None. Key witness for locked door timing.',
    statement: 'I heard Professor Cole enter his study at 21:03 and distinctly heard the heavy brass deadbolt click shut from inside. When Mr. Sterling called me at 21:45, I broke the door down with a crowbar. The deadbolt was fully thrown.',
    statementTime: '22:05 GMT',
    motive: 'None. Loyal servant.',
    suspicionLevel: 'Low',
    behavioralCue: 'Formal, precise with timestamps, deeply shaken.',
    composureStatus: 'SOBER / METICULOUS',
    pulseBpm: 76,
    tags: ['HEAD BUTLER', 'KEY WITNESS', 'INNOCENT'],
    imagePath: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400',
    keyObservations: [
      'Heard deadbolt lock click shut from inside at 21:03 GMT.',
      'Forced door at 21:50 GMT with crowbar; deadbolt was thrown.'
    ],
    linkedEvidenceIds: ['EVD-201', 'EVD-202'],
    timelineEventIds: ['evt-2103', 'evt-2145', 'evt-2150'],
    interrogationTopics: [
      {
        id: 'topic-vance-door',
        title: 'Deadbolt Engagement at 21:03',
        prompt: 'Are you certain Professor Cole locked the deadbolt himself at 21:03?',
        response: 'Indubitably, Inspector. I was polishing silver in the hallway when the Master stepped inside, closed the heavy door, and turned the brass thumbturn. I heard the bolt throw home.',
        category: 'timeline',
        revealsTruth: true
      }
    ]
  }
];

export const CASE_002_CONTRADICTIONS: StatementContradiction[] = [
  {
    id: 'C-1',
    suspectId: 'dr-evelyn-reed',
    statementSnippet: 'I only dropped off a book in Professor Cole\'s study at 20:30 and touched nothing on his desk.',
    contradictingEvidenceId: 'EVD-204',
    title: 'Stamp Contamination & Decoy Rigging',
    explanation: 'Dr. Reed spent 5 minutes in the study at 20:30 applying transdermal neurotoxin to the wax stamp handle (EVD-204) and rigging the candle decoy (EVD-209).',
    discovered: false
  },
  {
    id: 'C-2',
    suspectId: 'dr-evelyn-reed',
    statementSnippet: 'Professor Cole was attacked at 21:42 when everyone heard the commotion while I was in the Drawing Room.',
    contradictingEvidenceId: 'EVD-207',
    title: 'Medical Examiner Collapse Window',
    explanation: 'The autopsy report (EVD-207) proves Cole collapsed between 21:20 and 21:30 from transdermal poisoning; the 21:42 thud was a mechanical sound decoy (EVD-208/209).',
    discovered: false
  },
  {
    id: 'C-3',
    suspectId: 'julian-sterling',
    statementSnippet: 'I was taking a fresh air walk in the front gardens all evening and never went near the west terrace.',
    contradictingEvidenceId: 'EVD-212',
    title: 'Terrace Footprint Match',
    explanation: 'Plaster cast EVD-212 matches Julian Sterling\'s riding boots, proving he was snooping outside Cole\'s window at 21:40.',
    discovered: false
  },
  {
    id: 'C-4',
    suspectId: 'dr-evelyn-reed',
    statementSnippet: 'I have no financial disagreements with Professor Cole; our academic partnership was harmonious.',
    contradictingEvidenceId: 'EVD-203',
    title: 'Stolen Patent Fraud Contract',
    explanation: 'Letter EVD-203 and syndicate contract EVD-214 prove Reed secretly sold Cole\'s patent for £10,000, and Cole was exposing her tonight.',
    discovered: false
  }
];
