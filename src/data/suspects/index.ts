import type { Suspect } from '../../state/types';

export const INITIAL_SUSPECTS: Suspect[] = [
  {
    id: 'james-blackwood',
    name: 'James Blackwood',
    role: 'Eldest Son & Heir',
    avatar: 'JB',
    bio: '34 years old. Former naval officer with a reputation for high-stakes gambling in Mayfair clubs.',
    alibi: 'Claims he was on the terrace smoking from 21:15 to 21:35 continuously during the power outage.',
    motive: 'In severe debt (£14,200) to London bookmakers; facing immediate public ruin and legal action.',
    suspicionLevel: 'High',
    keyObservations: [
      'Nervous disposition during questioning; keeps checking pocket watch.',
      'Smells of fresh Turkish tobacco identical to cigarettes found on balcony.',
      'Faint pink paraffin wax residue detected under fingernails of left hand.'
    ],
    interrogationTopics: [
      {
        id: 'topic-alibi',
        title: 'Terrace Alibi at 21:24',
        prompt: 'Where exactly were you when the lights went out at 21:24?',
        response: 'I was outside on the balcony, leaning against the balustrade smoking a cigarette. I saw the lights flicker off inside, but assumed it was a routine power generator spike.',
        revealsTruth: false
      },
      {
        id: 'topic-debts',
        title: 'Gambling Debts & Ledger',
        prompt: 'We found a Mayfair Club ledger entry for £14,200 under your name.',
        response: '...That is a private matter! Fine, yes, I owe money. But I would never rob my own family estate. I was planning to ask mother for a loan tomorrow.',
        revealsTruth: true,
        unlocksEvidenceId: 'EVD-003'
      },
      {
        id: 'topic-wax',
        title: 'Paraffin Wax Residue',
        prompt: 'Forensic testing found jeweler\'s impressioning wax in your coat pocket.',
        response: 'That... that jacket was borrowed! I left it in the coat rack earlier. Anyone could have slipped something into the pocket while I was out on the terrace!',
        revealsTruth: true,
        unlocksEvidenceId: 'EVD-004'
      },
      {
        id: 'topic-fuse',
        title: 'Basement Breaker Trip',
        prompt: 'The CCTV footage shows someone of your exact build moving to the basement at 21:20.',
        response: 'Nonsense! Infrared camera angles are notoriously distorted. You cannot prove that silhouette was me!',
        revealsTruth: true,
        unlocksEvidenceId: 'EVD-009'
      }
    ]
  },
  {
    id: 'victoria-vane',
    name: 'Victoria Vane',
    role: 'Head Housekeeper & Curator',
    avatar: 'VV',
    bio: '52 years old. Has served the Blackwood household for 22 years. Meticulous keeper of the vitrine collection.',
    alibi: 'Was in the butler\'s pantry preparing evening tea service when the lights failed.',
    motive: 'Recently expressed resentment over unpaid overtime and strict estate security policies.',
    suspicionLevel: 'Medium',
    keyObservations: [
      'Holds duplicate key ring for routine cleaning, but vitrine key #04 was locked in the main safe.',
      'Hands were covered in polishing cream, leaving clear traces on pantry teaware.',
      'Agitated by the disruption to her regimented household schedule.'
    ],
    interrogationTopics: [
      {
        id: 'topic-keys',
        title: 'Vitrine Key Security',
        prompt: 'Who has access to the master key for West Vitrine #04?',
        response: 'Only Lord Blackwood and myself. My key remains locked in the pantry safe at all times, except during Monday morning dusting.',
        revealsTruth: true
      },
      {
        id: 'topic-pantry',
        title: 'Pantry Activity at 21:24',
        prompt: 'Did anyone see you in the pantry when the outage occurred?',
        response: 'Arthur Pendelton passed through the hall around 21:15 asking for tea, but when the power cut out, I was alone lighting emergency candles.',
        revealsTruth: false
      }
    ]
  },
  {
    id: 'arthur-pendelton',
    name: 'Arthur Pendelton',
    role: 'Family Attorney',
    avatar: 'AP',
    bio: '61 years old. Senior partner at Pendelton & Croft. Manages all Blackwood trust funds and legal filings.',
    alibi: 'Claims he was in the study reviewing property deeds during the entire evening.',
    motive: 'Aware of impending audit of trust accounts which might reveal administrative irregularities.',
    suspicionLevel: 'Medium',
    keyObservations: [
      'Carried a heavy leather briefcase that was locked throughout the investigation.',
      'Calm and measured demeanor; answered all questions with precise legal phrasing.',
      'Confirmed Lord Blackwood was considering amending his will.'
    ],
    interrogationTopics: [
      {
        id: 'topic-will',
        title: 'Estate Will Revisions',
        prompt: 'Was Lady Blackwood planning to alter the estate inheritance terms?',
        response: 'As legal counsel, client confidentiality prevents disclosure. However, I can confirm draft papers were prepared earlier this week.',
        revealsTruth: true
      },
      {
        id: 'topic-study',
        title: 'Study Room Presence',
        prompt: 'Did you leave the study at any point around 21:20?',
        response: 'Only to request a cup of Earl Grey from Mrs. Vane. I returned to my desk immediately and remained there until the alarm sounded.',
        revealsTruth: false
      }
    ]
  },
  {
    id: 'eleanor-blackwood',
    name: 'Lady Eleanor Blackwood',
    role: 'Estate Matriarch & Owner',
    avatar: 'EB',
    bio: '68 years old. Owner of the Star of Blackwood Diamond. Philanthropist and patron of the London Arts Guild.',
    alibi: 'Was receiving guests in the grand drawing room until the blackout occurred.',
    motive: 'None evident; victim of the crime.',
    suspicionLevel: 'Low',
    keyObservations: [
      'Deeply distraught by the theft of her family heirloom.',
      'Insisted the police conduct a thorough search without favor to family members.',
      'Noticed James was absent from the drawing room right before the blackout.'
    ],
    interrogationTopics: [
      {
        id: 'topic-necklace',
        title: 'Diamond History & Value',
        prompt: 'Tell us about the significance of the Star of Blackwood.',
        response: 'It has been in our family for four generations, valued at over £1.2M. It is irreplaceable, not just financially but historically.',
        revealsTruth: false
      },
      {
        id: 'topic-family',
        title: 'James\' Behavior Lately',
        prompt: 'Have you noticed any strange behavior from your son James recently?',
        response: 'James has been distant... anxious. He asked me for a large sum of money last week, but refused to explain why.',
        revealsTruth: true
      }
    ]
  }
];
