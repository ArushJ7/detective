import type { Suspect, StatementContradiction } from '../../state/types';

export const CASE_003_SUSPECTS: Suspect[] = [
  {
    id: 'julian-vance',
    name: 'Julian Vance',
    role: 'Senior Curator & Master Art Restorer',
    avatar: 'JV',
    age: '38',
    domicile: 'Mayfair, London',
    financialStatus: 'Severe Gambling Debts (£12,000)',
    bio: 'Senior Curator at Ravenwood Gallery. Cultured, articulate, meticulous. Secretly facing fatal debt threats from Soho bookmakers.',
    alibi: 'Claims he was trapped inside the locked Restoration Room during the entire 12-minute blackout and heard the 21:24 GMT emergency gong ring twice in the Main Hall.',
    alibiDiscrepancy: 'Acoustic test EVD-305 proves the padded door is 100% soundproof; furthermore, gong cable EVD-303 was unhooked at 21:15 GMT, meaning the gong never rang.',
    statement: 'I entered the Restoration Room at 21:10 to prepare cleaning solvents. When the arc lights failed at 21:18, the heavy door locked automatically. I sat at my desk until I distinctly heard the emergency chime ring twice in the Main Hall at 21:24 GMT.',
    statementTime: '21:45 GMT',
    motive: 'Accumulated £12,000 in debts to Blackwood Syndicate due at midnight. Targeted "The Astronomical Quadrant" to deliver to a private buyer for £15,000.',
    suspicionLevel: 'High',
    behavioralCue: 'Immaculate, highly articulate, reeking of mineral spirits; hands show faint trace of graphite grease.',
    composureStatus: 'COOL / ARTICULATE',
    pulseBpm: 72,
    tags: ['SENIOR CURATOR', 'CULPRIT', 'MASTER RESTORER'],
    imagePath: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBFWpKUxGqMixB3vBAx9OwKo2WiQlTALb4QvcL79BIh-WxBLUlBfJrb5XdyztnxRZmrSn432vSC91fW2b_BfjjaBPC681IQSUAYz33kTzuMx-iGaeUqkTyduJPc0MLprQdebFJo9x3s3A9p5sx3brXNKcjAnCKFYx79Z-d7v2jd6TqbiqP3GKznghWDBi94YgS5ojZZk6zKFmrl8TfF9DNKi7zP5cWOjXDl9JMzvR8pcuaxHITrBwslMA',
    keyObservations: [
      'Claims he heard the 21:24 GMT emergency gong from inside the locked Restoration Room.',
      'Apron EVD-307 contains graphite residue matching breaker EVD-302 and turn-screw tool matching frame EVD-301.',
      'Desk drawer contains £12,000 Blackwood Syndicate debt demand EVD-308 due at midnight.'
    ],
    linkedEvidenceIds: ['EVD-301', 'EVD-302', 'EVD-303', 'EVD-304', 'EVD-305', 'EVD-306', 'EVD-307', 'EVD-308'],
    timelineEventIds: ['evt-3014', 'evt-3015', 'evt-3017', 'evt-3018', 'evt-3020', 'evt-3024', 'evt-3026', 'evt-3028'],
    interrogationTopics: [
      {
        id: 'topic-vance-alibi',
        title: 'Restoration Room Blackout Alibi',
        prompt: 'Where were you during the 12-minute blackout between 21:18 and 21:30 GMT?',
        response: 'I was inside the Restoration Room working on solvent mixtures. When the arc lamps died, the spring door latched. I waited quietly until I heard the emergency gong ring twice at 21:24 GMT.',
        category: 'alibi',
        revealsTruth: false,
        requiredEvidenceId: 'EVD-305',
        contradictionDiscoveredId: 'C-1'
      },
      {
        id: 'topic-vance-gong',
        title: 'The 21:24 Emergency Gong Chime',
        prompt: 'You claim you heard the Main Hall emergency gong chime twice at 21:24 GMT?',
        response: 'Most clearly! It rang out twice across the gallery, reassuring me that Guard Pendelton was responding to the outage.',
        category: 'alibi',
        revealsTruth: false,
        requiredEvidenceId: 'EVD-303',
        contradictionDiscoveredId: 'C-2'
      },
      {
        id: 'topic-vance-apron',
        title: 'Apron Tools & Graphite Residue',
        prompt: 'How do you explain the graphite grease and turn-screw driver in your apron pocket?',
        response: 'I am the master restorer! I use graphite lubricant on easel hinges and turn-screw drivers for frame maintenance every afternoon.',
        category: 'evidence',
        revealsTruth: false,
        requiredEvidenceId: 'EVD-307'
      },
      {
        id: 'topic-vance-motive',
        title: 'Blackwood Syndicate Debt Note',
        prompt: 'We found a demand note for £12,000 from the Blackwood Syndicate due at midnight.',
        response: 'That is... a private financial matter. It has nothing to do with the gallery or Brahe\'s Quadrant!',
        category: 'motive',
        revealsTruth: true,
        requiredEvidenceId: 'EVD-308'
      }
    ]
  },
  {
    id: 'lady-beatrice-ravenscroft',
    name: 'Lady Beatrice Ravenscroft',
    role: 'Wealthy Patron & Benefactor\'s Widow',
    avatar: 'BR',
    age: '46',
    domicile: 'Ravenscroft Manor, Belgravia',
    financialStatus: 'Vast Family Estate',
    bio: 'Widow of Lord Henry Ravenscroft. Proud, aristocratic, bitter over her late husband\'s bequest of the painting to the public gallery.',
    alibi: 'Claims she was in the Curator\'s Office reviewing legal provenance documents when the lights failed.',
    alibiDiscrepancy: 'Her lace handkerchief EVD-309 was caught in the rear Loading Bay door latch, proving she fled into the rear corridor during the outage.',
    statement: 'I was reviewing my late husband\'s bequest ledger in Mr. Vance\'s office. When the lights extinguished, I panicked in the dark and dropped my handkerchief while trying to find the hallway door.',
    statementTime: '21:52 GMT',
    motive: 'Resented that her husband donated the £14,000 masterpiece to Ravenwood Gallery instead of leaving it to her family trust.',
    suspicionLevel: 'Medium',
    behavioralCue: 'Haughty, defensive, clutching silk gloves; annoyed by police questioning.',
    composureStatus: 'HAUGHTY / DISDAINFUL',
    pulseBpm: 84,
    tags: ['PATRON WIDOW', 'RED HERRING', 'ESTATE BEQUEST'],
    imagePath: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAsxKdx1vKEryHjfQFvy8VGpK2WAsGEHNqd906zQ038qo__IhNnlVTlg_2z4zA8jHWWSG9FsRhed9MarSfI38zzdxXRiGg0ztHmVi08xp2lb5JQ9qTSaRpgtz6yDOhhZcP4NO-76-qwsFWRNecBTeSMCmqWDwrDQ-Bnf0sWdUeRII7awRkNQbxmMlzCEbb8_tztjBG5ZWobFLhCkWyb97SeJ_nxpSy74LH2_D1aefSn7gmV-KCkZHjjEQ',
    keyObservations: [
      'Entered Curator\'s Office to inspect wall safe EVD-310 for secret bequest terms.',
      'Dropped lace handkerchief EVD-309 near Loading Bay when fleeing dark hallway.',
      'Felt prints EVD-304 refute her presence in Alcove III during blackout.'
    ],
    linkedEvidenceIds: ['EVD-309', 'EVD-310'],
    timelineEventIds: ['evt-3015', 'evt-3022'],
    interrogationTopics: [
      {
        id: 'topic-beatrice-safe',
        title: 'Curator\'s Office Safe Inspection',
        prompt: 'Why was Curator Vance\'s wall safe found open with your husband\'s bequest folder out?',
        response: 'I have a legal right to inspect my late husband\'s bequest terms! I suspect Mr. Vance was illegally mortgaging gallery assets for his own debts.',
        category: 'motive',
        revealsTruth: true,
        requiredEvidenceId: 'EVD-310'
      },
      {
        id: 'topic-beatrice-handkerchief',
        title: 'Stained Lace Handkerchief near Loading Bay',
        prompt: 'We found your lace handkerchief caught in the rear Loading Bay door latch.',
        response: 'When the blackout occurred, I panicked in total darkness! I reached for a door handle, stumbled into the rear corridor, and snagged my lace handkerchief on the latch.',
        category: 'alibi',
        revealsTruth: true,
        requiredEvidenceId: 'EVD-309',
        contradictionDiscoveredId: 'C-4'
      }
    ]
  },
  {
    id: 'marcus-sterling',
    name: 'Marcus Sterling',
    role: 'Private Art Broker & Collector\'s Agent',
    avatar: 'MS',
    age: '42',
    domicile: 'Mayfair & Paris',
    financialStatus: 'Wealthy Private Syndicate',
    bio: 'Gilded-Age private art dealer representing anonymous overseas collectors. Offered £10,000 cash off-the-record for the painting three days prior.',
    alibi: 'Claims he remained smoking cigars on the East Courtyard Terrace during the entire blackout.',
    alibiDiscrepancy: 'Custom lockpicks EVD-311 prove he entered the Private Collection passage at 21:21 GMT; stopped watch EVD-312 confirms he dropped it on the terrace when running outside.',
    statement: 'I was enjoying fresh air on the terrace. When the lights went out, I remained seated on the stone bench until the guards began shouting.',
    statementTime: '21:58 GMT',
    motive: 'Sought to acquire high-value Victorian and Renaissance masterworks for private syndicate buyers.',
    suspicionLevel: 'Medium',
    behavioralCue: 'Calculating, smooth-talking, twirling a gold signet ring; calm under questioning.',
    composureStatus: 'CALCULATING / SMOOTH',
    pulseBpm: 78,
    tags: ['ART BROKER', 'RED HERRING', 'LOCKPICKER'],
    imagePath: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCOn3D65CLTH4LvgzOSBCGjUG5WPi5DowIRiFjzb0rYgE6pXPjY--495HEblLfV4x5EjSH3ZbatruvNR9_lf902aX7d-VHAE9q77K3vy9Sb48XmdDN2K6daTTYgBI4uGnmpxQDNuYACd9kmhmEWDX5nmeMvwTFXLe3S3JQvgobb0iVPeyHWkZqyFMYeiEgrsDxG17dbgzu-fQhEhW-Yem4VQQv0r6Y1XGbMYYIn8X2EzIFvUpQM1AN0Xg',
    keyObservations: [
      'Offered £10,000 cash for Brahe\'s Quadrant earlier in the week.',
      'Attempted lockpicking Private Collection door (120 ft from Alcove III) at 21:21 GMT.',
      'Dropped pocket watch EVD-312 when running onto terrace in blackout darkness.'
    ],
    linkedEvidenceIds: ['EVD-311', 'EVD-312'],
    timelineEventIds: ['evt-3022'],
    interrogationTopics: [
      {
        id: 'topic-sterling-lockpicks',
        title: 'Lockpicks in Private Corridor',
        prompt: 'We found custom wire lockpicks matching your waistcoat tools near the Private Vault door.',
        response: 'Very well, Inspector. I attempted to pick the lock of the Private Vault to inspect an uncataloged Italian sketch. But when the blackout hit, I panicked, dropped my watch on the terrace bench, and ran outside. I never touched Brahe\'s Quadrant!',
        category: 'evidence',
        revealsTruth: true,
        requiredEvidenceId: 'EVD-311',
        contradictionDiscoveredId: 'C-3'
      }
    ]
  },
  {
    id: 'arthur-pendelton',
    name: 'Arthur Pendelton',
    role: 'Head Security Guard (25 Years Service)',
    avatar: 'AP',
    age: '59',
    domicile: 'Gallery Guard Lodge',
    financialStatus: 'Modest Pension',
    bio: 'Head Watchman of Ravenwood Gallery for 25 years. Veteran soldier, fierce protector of gallery heritage, fanatically detailed with security logs.',
    alibi: 'At Guard Lodge desk at 21:18; descended to Sub-Basement at 21:20 to reset dynamo breaker; power restored at 21:30.',
    alibiDiscrepancy: 'None. Key timeline witness and innocent guard.',
    statement: 'I was at my lodge desk when the arc lights died at 21:18. I grabbed my oil lantern and went straight down to the Sub-Basement switchboard. The knife switch had been pulled by hand.',
    statementTime: '21:38 GMT',
    motive: 'None. Fiercely loyal guard.',
    suspicionLevel: 'Low',
    behavioralCue: 'Militaristic, precise, deeply aggrieved by gallery security breach.',
    composureStatus: 'VIGILANT / AGGRIEVED',
    pulseBpm: 76,
    tags: ['HEAD GUARD', 'KEY WITNESS', 'INNOCENT'],
    imagePath: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAR_WSFnqypqwH2vTaAhZ95d745uOJYc1roj3_NjcHDu65GvJcz4vhSVrQuDXJb9EV25mYmj_kH7qPhg4KkBaIxwqjAhd2UqHBImjOWM-KoDqqpHj5E2iRDknDdWTbV0VPq7fTIVdD8XA_31SuJEEtxQt_k2yicc8piYnG-yuExjEr-MmB633D2IJW-ODrdd5UUhIpkHeGr8x1rtPPP4WlijRNQAWPAN0AzaKgPbMRBDCYx2KrMc6TPJA',
    keyObservations: [
      'Saw Curator Vance standing near the East Gong wall at 21:14 GMT.',
      'Confirmed dynamo breaker EVD-302 was manually shorted with graphite grease.',
      'Discovered missing canvas in Alcove III at 21:32 GMT upon power restoration.'
    ],
    linkedEvidenceIds: ['EVD-302', 'EVD-303', 'EVD-313'],
    timelineEventIds: ['evt-3045', 'evt-3014', 'evt-3018', 'evt-3030', 'evt-3032'],
    interrogationTopics: [
      {
        id: 'topic-pendelton-gong',
        title: 'Observation at 21:14 GMT',
        prompt: 'What did you observe during your 21:14 GMT Main Hall patrol sweep?',
        response: 'I saw Curator Vance standing near the East Gong wall holding maintenance tools. He claimed he was inspecting the pulley wire tension.',
        category: 'timeline',
        revealsTruth: true
      },
      {
        id: 'topic-pendelton-dynamo',
        title: 'Sub-Basement Dynamo Switch Inspection',
        prompt: 'What did you find when you reached the Sub-Basement dynamo switchboard at 21:20 GMT?',
        response: 'The main 200-amp knife switch was pulled wide open. The contacts were slick with fresh graphite grease. Someone shorted that switch intentionally!',
        category: 'evidence',
        revealsTruth: true,
        requiredEvidenceId: 'EVD-302'
      }
    ]
  }
];

export const CASE_003_CONTRADICTIONS: StatementContradiction[] = [
  {
    id: 'C-1',
    suspectId: 'julian-vance',
    statementSnippet: 'I sat at my desk inside the Restoration Room until I distinctly heard the emergency chime ring twice in the Main Hall at 21:24 GMT.',
    contradictingEvidenceId: 'EVD-305',
    title: 'Acoustic Soundproofing Inaudibility',
    explanation: 'Acoustic door test EVD-305 proves the padded oak door provides 48 dB soundproofing, making external hall gongs completely inaudible inside the locked room.',
    discovered: false
  },
  {
    id: 'C-2',
    suspectId: 'julian-vance',
    statementSnippet: 'The emergency hall gong chimed twice at 21:24 GMT, assuring me the guards were responding.',
    contradictingEvidenceId: 'EVD-303',
    title: 'Disengaged Alarm Gong Wire',
    explanation: 'Physical inspection EVD-303 proves the emergency gong pull-wire was unhooked at 21:15 GMT, meaning the gong NEVER chimed at 21:24 GMT at all. Vance fabricated a false sound observation.',
    discovered: false
  },
  {
    id: 'C-3',
    suspectId: 'marcus-sterling',
    statementSnippet: 'I remained smoking cigars on the East Courtyard Terrace for fresh air and never entered any gallery corridor during the blackout.',
    contradictingEvidenceId: 'EVD-311',
    title: 'Private Vault Lockpick Attempt',
    explanation: 'Lockpicks EVD-311 and stopped watch EVD-312 prove Sterling entered the Private Vault passage at 21:21 GMT to lockpick the vault door, disproving his terrace alibi.',
    discovered: false
  },
  {
    id: 'C-4',
    suspectId: 'lady-beatrice-ravenscroft',
    statementSnippet: 'I was in the Curator\'s Office discussing gallery acquisitions with Curator Vance until the blackout hit at 21:18 GMT.',
    contradictingEvidenceId: 'EVD-313',
    title: 'Vance Pre-Blackout Movements',
    explanation: 'Guard log EVD-313 and apron EVD-307 prove Vance abandoned the office by 21:14 GMT to unhook the gong wire and pull the sub-basement breaker at 21:17 GMT.',
    discovered: false
  }
];
