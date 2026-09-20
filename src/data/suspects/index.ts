import type { Suspect, StatementContradiction } from '../../state/types';

export const INITIAL_SUSPECTS: Suspect[] = [
  {
    id: 'james-blackwood',
    name: 'James Blackwood',
    role: 'Nephew & Sole Heir',
    avatar: 'JB',
    age: '42 Years',
    domicile: 'South Kensington, London',
    financialStatus: 'Indebted to London Syndicates (£14,200)',
    bio: 'Former naval officer with a reputation for high-stakes gambling in Mayfair clubs. Arrived unannounced at Blackwood Hall on Thursday evening despite an explicit cablegram from Lord Blackwood refusing an audience.',
    alibi: 'Claims he was in the wine cellar retrieving vintage claret from 21:20 to 21:45.',
    alibiDiscrepancy: 'Butler Hastings testifies wine cellar descent took place at 21:38, leaving 18 unaccounted minutes between dinner conclusion and the reported scream.',
    statement: '“I never set foot inside the drawing room after dinner commenced. I was in the wine cellar retrieving vintage claret from 21:20 to 21:45. Uncle knew very well the cellar key was kept on the pantry hook. Anyone could have gone down there.”',
    statementTime: '23:40 GMT',
    motive: 'In severe debt (£14,200) to London bookmakers; facing immediate public ruin and legal action. Disinherited in revised draft will.',
    suspicionLevel: 'High',
    behavioralCue: 'Avoids eye contact whenever vitrine lock is mentioned. Left thumb rubbing gold signet ring frantically.',
    composureStatus: 'CRACKING (NERVOUS POSTURE)',
    pulseBpm: 114,
    tags: ['DEBTOR', 'NERVOUS', 'HIGH RISK'],
    imagePath: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400',
    keyObservations: [
      'Nervous disposition during questioning; keeps checking pocket watch.',
      'Smells of fresh Turkish tobacco identical to cigarettes found on balcony balustrade.',
      'Faint pink paraffin wax residue detected under fingernails of left hand.',
      'Bespoke Oxford boot heels match wet size 11 tread impressions near basement stairwell.'
    ],
    linkedEvidenceIds: ['EVD-001', 'EVD-003', 'EVD-004', 'EVD-006', 'EVD-008', 'EVD-009', 'EVD-011', 'EVD-012'],
    timelineEventIds: ['evt-2115', 'evt-2124', 'evt-2131', 'evt-2138'],
    interrogationTopics: [
      {
        id: 'topic-alibi',
        title: 'Wine Cellar Alibi vs Butler Testimony',
        prompt: 'Your butler Hastings claims you didn\'t reach the wine cellar until 21:38. Where were you at 21:24 during the blackout?',
        response: 'I... I stepped onto the terrace balustrade to light a cigarette before going downstairs! The blackout caught me off guard. You cannot scrutinize every minute of a dark evening!',
        category: 'alibi',
        revealsTruth: false,
        contradictionDiscoveredId: 'con-1'
      },
      {
        id: 'topic-debts',
        title: 'Mayfair Bookmaker Debt (£14,200)',
        prompt: 'We recovered a Mayfair Syndicate ledger demanding £14,200 due midnight 20th September.',
        response: '...That is a private matter! Fine, yes, I owe money. But I would never rob my family estate. I came to ask my mother for an emergency loan!',
        category: 'motive',
        revealsTruth: true,
        unlocksEvidenceId: 'EVD-003'
      },
      {
        id: 'topic-wax',
        title: 'Pink Paraffin Wax Residue',
        prompt: 'Forensic testing found jeweler\'s impressioning wax in your coat pocket matching Lock #04 residue.',
        category: 'evidence',
        requiredEvidenceId: 'EVD-004',
        response: 'That jacket was left on the coat rack all evening! Anyone could have slipped something into the pocket while I was out on the terrace!',
        revealsTruth: true,
        unlocksEvidenceId: 'EVD-004',
        contradictionDiscoveredId: 'con-2'
      },
      {
        id: 'topic-fuse',
        title: 'Basement Breaker CCTV Telemetry',
        prompt: 'CCTV telemetry records a 6ft silhouette tripping the main electrical breaker in the basement at 21:24:02.',
        category: 'evidence',
        requiredEvidenceId: 'EVD-005',
        response: 'Infrared cameras distort shapes! You cannot prove that silhouette was me from a shadowy feed!',
        revealsTruth: true,
        unlocksEvidenceId: 'EVD-009',
        contradictionDiscoveredId: 'con-3'
      }
    ]
  },
  {
    id: 'martha-caldwell',
    name: 'Martha Caldwell',
    role: 'Estate Archivist & Curator',
    avatar: 'MC',
    age: '54 Years',
    domicile: 'East Wing Staff Annex',
    financialStatus: 'Modest Income (£240/yr)',
    bio: 'Has served as Blackwood Estate archivist for 18 years. Meticulous keeper of manuscripts, locks, and vitrine display inventories.',
    alibi: 'Claims she was sorting 17th-century manuscripts in the east annex archive room from 21:00 to 22:00 continuously.',
    alibiDiscrepancy: 'A torn Western Post telegram addressed to "M.C." was intercepted instructing a vitrine swap before midnight.',
    statement: '“I was in the east annex sorting family manuscripts all evening. I checked Vitrine #04 at 21:00 sharp and verified the Chubb cylinder lock was fully engaged before returning to my desk.”',
    statementTime: '23:15 GMT',
    motive: 'Fears termination due to estate restructuring; possessed intimate knowledge of vitrine lock keyway profiles.',
    suspicionLevel: 'Medium',
    behavioralCue: 'Hands tremble slightly when adjusting wire-rim spectacles; keeps polishing fountain pen nib with handkerchief.',
    composureStatus: 'EVASIVE (CONTROLLED STOICISM)',
    pulseBpm: 88,
    tags: ['VAULT ACCESS', 'EVASIVE', 'ARCHIVIST'],
    imagePath: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400',
    keyObservations: [
      'Access to master lock key index in estate pantry safe.',
      'Fountain pen ink on fingers matches Higgins #2 ink on telegram fragment.',
      'Reported Vitrine #04 lock intact at 21:00 during routine inspection.'
    ],
    linkedEvidenceIds: ['EVD-001', 'EVD-010', 'EVD-012'],
    timelineEventIds: ['evt-2100', 'evt-2131'],
    interrogationTopics: [
      {
        id: 'topic-keys-martha',
        title: 'Vitrine Lock Inspection at 21:00',
        prompt: 'You inspected Vitrine #04 at 21:00. Was there any sign of tampering prior to dinner?',
        response: 'None whatsoever. The brass cylinder disengaged smoothly for my inventory check and I locked it securely before handing the key ring back.',
        category: 'timeline',
        revealsTruth: true
      },
      {
        id: 'topic-telegram-martha',
        title: 'Western Post Telegram Fragment',
        prompt: 'We found a telegram snippet signed "M.C." referencing a vitrine replica exchange.',
        response: 'I... I frequently correspond with museum appraisers regarding artifact loans! That telegram has been taken entirely out of context.',
        category: 'evidence',
        requiredEvidenceId: 'EVD-003',
        revealsTruth: true,
        contradictionDiscoveredId: 'con-4'
      }
    ]
  },
  {
    id: 'daniel-sterling',
    name: 'Daniel Sterling',
    role: 'Weekend Guest & Financier',
    avatar: 'DS',
    age: '38 Years',
    domicile: 'Mayfair, London',
    financialStatus: 'Wealthy Private Investor',
    bio: 'London financier and guest of Lord Blackwood for the weekend shooting party. Known collector of rare gemstone jewelry.',
    alibi: 'Claims he was in the billiards room playing solitaire from 21:10 to 21:40.',
    alibiDiscrepancy: 'Balcony balustrade ash tray contains Turkish tobacco matching his custom cigarette case.',
    statement: '“I spent the outage in the billiards room. When the lights went out, I simply poured myself a brandy and waited for the staff to restore generator power.”',
    statementTime: '23:55 GMT',
    motive: 'Expressed private interest in acquiring the Star of Blackwood diamond for a Swiss syndicate.',
    suspicionLevel: 'Medium',
    behavioralCue: 'Maintains aloof, amused composure; frequently checks gold pocket watch and twirls signet ring.',
    composureStatus: 'COMPOSED (CALM RESTRAINT)',
    pulseBpm: 72,
    tags: ['OUTSIDER', 'COMPOSED', 'FINANCIER'],
    imagePath: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400',
    keyObservations: [
      'Experienced gemstone buyer with international contacts.',
      'Observed conversing privately with James Blackwood in the conservatory prior to dinner.',
      'Carried a customized leather attache case locked in guest quarters.'
    ],
    linkedEvidenceIds: ['EVD-008'],
    timelineEventIds: ['evt-2115', 'evt-2147'],
    interrogationTopics: [
      {
        id: 'topic-billiards-daniel',
        title: 'Billiards Room Solitaire Alibi',
        prompt: 'Did anyone witness you in the billiards room between 21:10 and 21:40?',
        response: 'The staff were occupied with dinner service. Solitaire is a solitary pastime, Inspector.',
        category: 'alibi',
        revealsTruth: false
      },
      {
        id: 'topic-cigar-daniel',
        title: 'Terrace Balcony Cigarette Case',
        prompt: 'We found a silver cigarette case on the terrace balcony containing Turkish tobacco.',
        response: 'James and I stepped out briefly before dinner to smoke. It is hardly surprising to find tobacco ash on a terrace balustrade.',
        category: 'evidence',
        requiredEvidenceId: 'EVD-008',
        revealsTruth: true
      }
    ]
  },
  {
    id: 'eleanor-blackwood',
    name: 'Lady Eleanor Blackwood',
    role: 'Estate Matriarch & Owner',
    avatar: 'EB',
    age: '68 Years',
    domicile: 'Blackwood Hall, Main Suite',
    financialStatus: 'Sole Executor of Blackwood Estate',
    bio: 'Matriarch of Blackwood Hall and custodian of the Star of Blackwood Diamond. Highly protective of family honor.',
    alibi: 'Was receiving guests in the drawing room until the blackout occurred at 21:24.',
    alibiDiscrepancy: 'Shattered crystal glass near hearth shows lip gloss residue matching her shade.',
    statement: '“The diamond has been in our family for four generations. I was conversing with guests near the fireplace when the lights flickered off. The theft is an outrage against our house!”',
    statementTime: '23:05 GMT',
    motive: 'Victim of the theft; highly protective of estate reputation.',
    suspicionLevel: 'Low',
    behavioralCue: 'Distraught and stern; demands swift resolution while protecting family name.',
    composureStatus: 'DEFENSIVE (DISTRAUGHT MATRIARCH)',
    pulseBpm: 96,
    tags: ['ESTATE RESIDENT', 'DEFENSIVE', 'MATRIARCH'],
    imagePath: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400',
    keyObservations: [
      'Shattered Dom Pérignon flute near hearth dropped during blackout.',
      'Recently requested legal draft from Attorney Pendelton regarding inheritance changes.',
      'Confirmed James asked for a major financial advance last week.'
    ],
    linkedEvidenceIds: ['EVD-002', 'EVD-011'],
    timelineEventIds: ['evt-2000', 'evt-2124', 'evt-2147'],
    interrogationTopics: [
      {
        id: 'topic-diamond-eleanor',
        title: 'Star of Blackwood History',
        prompt: 'Tell us about the history and security of the Star of Blackwood.',
        response: 'It was purchased by my grandfather in 1884. The vitrine was specially fitted with Chubb locks. Only three keys exist.',
        category: 'evidence',
        revealsTruth: true
      },
      {
        id: 'topic-james-eleanor',
        title: 'James\' Recent Behavior',
        prompt: 'Did James mention his financial difficulties to you before dinner?',
        response: 'James asked for an advance on his inheritance last week. I refused. He was furious... but I never imagined he could be involved in this!',
        category: 'motive',
        revealsTruth: true,
        unlocksEvidenceId: 'EVD-011'
      }
    ]
  }
];

export const INITIAL_CONTRADICTIONS: StatementContradiction[] = [
  {
    id: 'con-1',
    suspectId: 'james-blackwood',
    title: 'STATEMENT vs BUTLER TESTIMONY',
    statementSnippet: 'James claims he descended to the wine cellar at 21:20.',
    contradictingEvidenceId: 'EVD-005',
    explanation: 'Butler Hastings testifies wine cellar descent occurred at 21:38, leaving 18 minutes unaccounted during the 21:24 blackout.',
    discovered: false
  },
  {
    id: 'con-2',
    suspectId: 'james-blackwood',
    title: 'STATEMENT vs WAX IMPRESSION MOLD',
    statementSnippet: 'James claims he never touched the vitrine lock mechanism.',
    contradictingEvidenceId: 'EVD-004',
    explanation: 'Pink paraffin wax alloy matching Lock #04 keyway residue was recovered directly from James\' coat pocket.',
    discovered: false
  },
  {
    id: 'con-3',
    suspectId: 'james-blackwood',
    title: 'STATEMENT vs CCTV TELEMETRY LOG',
    statementSnippet: 'James claims he remained on the terrace balcony during the blackout.',
    contradictingEvidenceId: 'EVD-009',
    explanation: 'CCTV infrared camera feed recorded a silhouette matching James\' 6ft build moving to the basement breaker at 21:24:02.',
    discovered: false
  },
  {
    id: 'con-4',
    suspectId: 'martha-caldwell',
    title: 'STATEMENT vs TELEGRAM FRAGMENT',
    statementSnippet: 'Martha claims she was sorting 17th-century manuscripts all evening.',
    contradictingEvidenceId: 'EVD-003',
    explanation: 'Western Post telegram addressed to "M.C." details instructions to swap Vitrine #04 before midnight.',
    discovered: false
  }
];
