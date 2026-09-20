import type { EvidenceItem } from '../../state/types';

export const INITIAL_EVIDENCE: EvidenceItem[] = [
  {
    id: 'EVD-001',
    title: 'The Vitrine Lock Mechanism',
    subtitle: 'Key cylinder unscratched · Glass intact',
    type: 'physical',
    category: 'object',
    description: 'High-security Chubb brass lock barrel showing microscopic scratch-free keyway and smooth lever tumblers.',
    detailedNotes: 'Forensic zoom reveals paraffin wax residue inside the keyway. The lock was opened cleanly using a duplicate key cast rather than lockpicks.',
    locationFound: 'Drawing Room — West Vitrine',
    timeDiscovered: '21:40 GMT',
    iconName: 'Lock',
    tag: 'EXHIBIT #01-A · PRIME EVIDENCE',
    significance: 'high',
    uvRevealed: true,
    uvText: 'PETROLEUM JELLY & BRASS TUMBLER RESIDUE DETECTED',
    connectedEvidenceIds: ['EVD-004', 'EVD-007', 'EVD-012'],
    relatedSuspects: ['james-blackwood', 'victoria-vane'],
    relatedTimelineEvents: ['21:00 Vitrine Checked', '21:24 Power Outage'],
    observations: [
      {
        id: 'obs-1',
        label: 'MARKER α-1 · ES-TOOL',
        text: 'Tool marks completely absent — zero burrs from tension wrenches or picks.',
        detailText: 'Confirmed unforced entry. The lock tumblers were disengaged using a smooth key bit.',
        confirmed: true
      },
      {
        id: 'obs-2',
        label: 'MARKER β-2 · METALLURGY',
        text: 'Microscopic brass filings recovered inside barrel.',
        detailText: 'Alloy matches locksmith blank EK-09 precisely. Cut within the last 12 hours.',
        confirmed: true
      },
      {
        id: 'obs-3',
        label: 'MARKER γ-3 · MECHANICS',
        text: 'Lever tumblers depressed without friction or scratching.',
        detailText: 'Follower springs returned under standard 1.2N factory tension.',
        confirmed: true
      }
    ]
  },
  {
    id: 'EVD-002',
    title: 'Shattered Champagne Flute',
    subtitle: 'Vintage crystal glass fragment',
    type: 'physical',
    category: 'object',
    description: 'Broken crystal glass found near the fireplace hearth. Smells of Vintage Dom Pérignon.',
    detailedNotes: 'Glass fragments show lip gloss residue and faint thumbprints on the stem. Dropped in sudden darkness when lights failed at 21:24.',
    locationFound: 'Drawing Room — Fireplace',
    timeDiscovered: '21:45 GMT',
    iconName: 'Wine',
    tag: 'EXHIBIT #02-E · PHYSICAL GLASS',
    significance: 'low',
    connectedEvidenceIds: ['EVD-005'],
    relatedSuspects: ['eleanor-blackwood'],
    relatedTimelineEvents: ['21:24 Power Outage'],
    observations: [
      {
        id: 'obs-1',
        label: 'MARKER α-1 · SPECTROGRAPHY',
        text: 'Lip gloss residue detected on crystal rim.',
        detailText: 'Matches Lady Eleanor Blackwood shade.',
        confirmed: true
      },
      {
        id: 'obs-2',
        label: 'MARKER β-2 · FRACTURE',
        text: 'Impact point centered on hearth marble brick.',
        detailText: 'Shattered under 9.8m/s gravity drop.',
        confirmed: false
      }
    ]
  },
  {
    id: 'EVD-003',
    title: 'Torn Mayfair Ledger Sheet',
    subtitle: 'London Betting Debt Fragment',
    type: 'document',
    category: 'document',
    description: 'Torn piece of paper with handwritten tallies and names recovered from library wastebasket.',
    detailedNotes: 'Reads: "Blackwood, J. — £14,200 due 20th Sept. FINAL NOTICE." Official stamp from Mayfair Club.',
    locationFound: 'Library Wastebasket',
    timeDiscovered: '22:05 GMT',
    iconName: 'FileText',
    tag: 'EXHIBIT #03-B · FINANCIAL RECORD',
    significance: 'high',
    connectedEvidenceIds: ['EVD-004', 'EVD-008', 'EVD-011'],
    relatedSuspects: ['james-blackwood'],
    relatedTimelineEvents: ['20:00 Dinner Banquet'],
    observations: [
      {
        id: 'obs-1',
        label: 'MARKER α-1 · DEBT TOTAL',
        text: 'Outstanding balance £14,200 with 48-hour enforcement warning.',
        detailText: 'Indicates severe financial extortion threat.',
        confirmed: true
      },
      {
        id: 'obs-2',
        label: 'MARKER β-2 · HANDWRITING',
        text: 'Signature stamp verified by Syndicate Mayfair.',
        detailText: 'Bookmaker ledger authentic.',
        confirmed: true
      }
    ]
  },
  {
    id: 'EVD-004',
    title: 'Paraffin Wax Mold Fragment',
    subtitle: 'Jeweler impression wax mold lump',
    type: 'forensic',
    category: 'object',
    description: 'Small lump of pink jeweler wax tucked inside velvet jacket pocket on coat rack.',
    detailedNotes: 'Matches exact wax alloy used for key impressioning. Chemically identical to residue inside Lock #04.',
    locationFound: 'Gentlemen Coat Rack — Jacket #2',
    timeDiscovered: '22:15 GMT',
    iconName: 'Package',
    tag: 'EXHIBIT #04-F · FORENSIC WAX',
    significance: 'high',
    uvRevealed: true,
    uvText: 'LATENT THUMBPRINT MATCHES J. BLACKWOOD OVERLAY',
    connectedEvidenceIds: ['EVD-001', 'EVD-003', 'EVD-012'],
    relatedSuspects: ['james-blackwood'],
    relatedTimelineEvents: ['18:00 Guest Arrival'],
    observations: [
      {
        id: 'obs-1',
        label: 'MARKER α-1 · WAX COMPOSITION',
        text: 'Pink paraffin wax alloy with 8% beeswax blend.',
        detailText: 'Used exclusively by Bond Street locksmiths for key casting.',
        confirmed: true
      },
      {
        id: 'obs-2',
        label: 'MARKER β-2 · IMPRESSION',
        text: 'Keyway pin depth marks visible under 25X loupe.',
        detailText: 'Matches vitrine key tumbler spacing.',
        confirmed: true
      }
    ]
  },
  {
    id: 'EVD-005',
    title: 'Mains Fuse Box Telemetry Log',
    subtitle: 'Mansion Automation Control',
    type: 'digital',
    category: 'digital',
    description: 'Digital log printout from basement breaker box showing power state changes.',
    detailedNotes: 'Main circuit trip recorded at 21:24:02. Manual switch lever pulled downward. Generator delay override engaged for 240 seconds.',
    locationFound: 'Basement Electrical Room',
    timeDiscovered: '21:55 GMT',
    iconName: 'Zap',
    tag: 'EXHIBIT #05-D · TELEMETRY LOG',
    significance: 'high',
    connectedEvidenceIds: ['EVD-006', 'EVD-009'],
    relatedSuspects: ['james-blackwood', 'arthur-pendelton'],
    relatedTimelineEvents: ['21:24 Power Outage'],
    observations: [
      {
        id: 'obs-1',
        label: 'MARKER α-1 · DISCONNECT TIME',
        text: 'Circuit trip recorded at exactly 21:24:02 GMT.',
        detailText: 'Manual lever disengaged from interior basement panel.',
        confirmed: true
      },
      {
        id: 'obs-2',
        label: 'MARKER β-2 · DURATION',
        text: 'Blackout lasted 240 seconds before generator engaged.',
        detailText: 'Window of opportunity for theft.',
        confirmed: true
      }
    ]
  },
  {
    id: 'EVD-006',
    title: 'Muddy Bespoke Shoe Impression',
    subtitle: 'Terrace Door Footprint',
    type: 'forensic',
    category: 'photo',
    description: 'Partial boot tread impression in damp soil near basement exterior stairwell.',
    detailedNotes: 'Size 11 Oxford dress shoe with custom leather heel tap. Matches luxury footwear line sold at Bond Street.',
    locationFound: 'Basement Exterior Walkway',
    timeDiscovered: '22:20 GMT',
    iconName: 'Footprints',
    tag: 'EXHIBIT #06-C · TREAD IMPRESSION',
    significance: 'medium',
    uvRevealed: true,
    uvText: 'UV FLUORESCENT DUST MATCHES BASEMENT FLOOR',
    connectedEvidenceIds: ['EVD-005', 'EVD-008'],
    relatedSuspects: ['james-blackwood'],
    relatedTimelineEvents: ['21:20 Basement Access'],
    observations: [
      {
        id: 'obs-1',
        label: 'MARKER α-1 · TREAD PATTERN',
        text: 'Size 11 Oxford leather heel welt tap.',
        detailText: 'Custom cobbler pattern matches James Blackwood footwear.',
        confirmed: true
      },
      {
        id: 'obs-2',
        label: 'MARKER β-2 · SOIL COMPOSITION',
        text: 'Damp loamy earth mixed with basement coal dust.',
        detailText: 'Establishes movement from basement to terrace.',
        confirmed: true
      }
    ]
  },
  {
    id: 'EVD-007',
    title: 'Arched Sash Window & Tweed Fiber',
    subtitle: 'Tweed fiber caught in brass sash lock',
    type: 'physical',
    category: 'photo',
    description: 'Arched sash window pushed ajar 3 inches; coarse Harris tweed fiber caught in brass catch bolt.',
    detailedNotes: 'Indigo dyed tweed fiber matches James Blackwood\'s evening sports jacket. Window opened from interior.',
    locationFound: 'West Drawing Room Wall',
    timeDiscovered: '21:38 GMT',
    iconName: 'Box',
    tag: 'EXHIBIT #07-B · PERIMETER BREACH',
    significance: 'medium',
    connectedEvidenceIds: ['EVD-001', 'EVD-004'],
    relatedSuspects: ['james-blackwood'],
    relatedTimelineEvents: ['21:24 Power Outage'],
    observations: [
      {
        id: 'obs-1',
        label: 'MARKER α-1 · FIBER SPECTRUM',
        text: 'Indigo tweed wool fiber extracted from sash bolt.',
        detailText: 'Matches jacket #2 on coat rack.',
        confirmed: true
      },
      {
        id: 'obs-2',
        label: 'MARKER β-2 · SASH MECHANICS',
        text: 'Latch turned from interior side.',
        detailText: 'Staged break-in indication.',
        confirmed: true
      }
    ]
  },
  {
    id: 'EVD-008',
    title: 'Silver Cigarette Case',
    subtitle: 'Engraved J.B. Initials',
    type: 'physical',
    category: 'object',
    description: 'Solid sterling silver case with initials J.B. Contains fresh Turkish tobacco cigarettes.',
    detailedNotes: 'Found abandoned on balcony balustrade. Tobacco ash is fresh, smoked within 30 minutes of blackout.',
    locationFound: 'Drawing Room Terrace Balcony',
    timeDiscovered: '21:50 GMT',
    iconName: 'Inbox',
    tag: 'EXHIBIT #08-G · PERSONAL ITEM',
    significance: 'medium',
    connectedEvidenceIds: ['EVD-003', 'EVD-006'],
    relatedSuspects: ['james-blackwood'],
    relatedTimelineEvents: ['21:15 Terrace Smoke'],
    observations: [
      {
        id: 'obs-1',
        label: 'MARKER α-1 · ENGRAVING',
        text: 'Monogram J.B. in cursive lettering.',
        detailText: 'Owned by James Blackwood.',
        confirmed: true
      },
      {
        id: 'obs-2',
        label: 'MARKER β-2 · ASH FRESHNESS',
        text: 'Turkish blend tobacco ash warm at 21:50.',
        detailText: 'Confirms suspect presence on balcony.',
        confirmed: true
      }
    ]
  },
  {
    id: 'EVD-009',
    title: 'CCTV Security Infrared Clip',
    subtitle: 'Hallway Footage 21:20-21:30',
    type: 'digital',
    category: 'digital',
    description: 'Grainy infrared video clip showing hallway during power outage.',
    detailedNotes: 'At 21:24, tall silhouette carrying flashlight moves swiftly from east wing towards drawing room door.',
    locationFound: 'Security Monitor Station',
    timeDiscovered: '22:30 GMT',
    iconName: 'Video',
    tag: 'EXHIBIT #09-H · INFRARED FOOTAGE',
    significance: 'high',
    connectedEvidenceIds: ['EVD-005', 'EVD-006'],
    relatedSuspects: ['james-blackwood'],
    relatedTimelineEvents: ['21:24 Power Outage'],
    observations: [
      {
        id: 'obs-1',
        label: 'MARKER α-1 · SILHOUETTE HEIGHT',
        text: 'Subject height 6ft 1in with broad shoulders.',
        detailText: 'Matches James Blackwood physical build.',
        confirmed: true
      },
      {
        id: 'obs-2',
        label: 'MARKER β-2 · TIMELINE STAMP',
        text: 'Timestamp 21:24:18 GMT in East Hallway.',
        detailText: 'Contradicts terrace smoking alibi.',
        confirmed: true
      }
    ]
  },
  {
    id: 'EVD-010',
    title: 'Housekeeper Roster Note',
    subtitle: 'Shift Duty Roster Sept 20',
    type: 'document',
    category: 'document',
    description: 'Handwritten schedule detailing staff duties and lock-up times for the evening.',
    detailedNotes: 'Notes Victoria Vane checked vitrine at 21:00 GMT and reported locks secure.',
    locationFound: 'Staff Office Desk',
    timeDiscovered: '22:40 GMT',
    iconName: 'Calendar',
    tag: 'EXHIBIT #10-I · ROSTER NOTE',
    significance: 'low',
    connectedEvidenceIds: ['EVD-001'],
    relatedSuspects: ['victoria-vane'],
    relatedTimelineEvents: ['21:00 Vitrine Checked'],
    observations: [
      {
        id: 'obs-1',
        label: 'MARKER α-1 · INVENTORY STAMP',
        text: 'Checked 21:00 by V. Vane.',
        detailText: 'Establishes baseline status of diamond.',
        confirmed: true
      }
    ]
  },
  {
    id: 'EVD-011',
    title: 'Encryption Flash Drive',
    subtitle: 'Vault Confidential PDF File',
    type: 'digital',
    category: 'digital',
    isVaultOnly: true,
    vaultCodeRequired: '2124',
    description: 'Encrypted USB drive hidden inside grandfather clock casing.',
    detailedNotes: 'Contains scanned PDF of Lady Blackwood\'s updated will, dated 3 days prior, reducing James\' inheritance share.',
    locationFound: 'Grandfather Clock Vault',
    timeDiscovered: 'UNLOCKED FROM VAULT',
    iconName: 'Key',
    tag: 'EXHIBIT #11-J · VAULT FILE',
    significance: 'high',
    connectedEvidenceIds: ['EVD-003'],
    relatedSuspects: ['james-blackwood', 'arthur-pendelton'],
    relatedTimelineEvents: ['20:00 Dinner Banquet'],
    observations: [
      {
        id: 'obs-1',
        label: 'MARKER α-1 · WILL REVISION',
        text: 'Trust share reduced by 50% in favor of charity.',
        detailText: 'Adds secondary disinheritance panic motive.',
        confirmed: true
      }
    ]
  },
  {
    id: 'EVD-012',
    title: 'Duplicate Master Key Blank',
    subtitle: 'Brass Key Blank with Filing Shavings',
    type: 'physical',
    category: 'audio',
    isVaultOnly: true,
    vaultCodeRequired: '1420',
    description: 'Unfinished brass key blank with fresh filing shavings on bitting.',
    detailedNotes: 'Discovered inside secret compartment of study bureau. Matches vitrine lock pin profiles exactly.',
    locationFound: 'Study Desk Vault Compartment',
    timeDiscovered: 'UNLOCKED FROM VAULT',
    iconName: 'Unlock',
    tag: 'EXHIBIT #12-K · VAULT KEY BLANK',
    significance: 'high',
    connectedEvidenceIds: ['EVD-001', 'EVD-004'],
    relatedSuspects: ['james-blackwood'],
    relatedTimelineEvents: ['18:00 Guest Arrival'],
    observations: [
      {
        id: 'obs-1',
        label: 'MARKER α-1 · BITTING MATCH',
        text: '99.8% match to vitrine master key EK-09.',
        detailText: 'Definitive physical proof of key duplication.',
        confirmed: true
      }
    ]
  }
];
