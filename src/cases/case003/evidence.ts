import type { EvidenceItem } from '../../state/types';

export const CASE_003_EVIDENCE: EvidenceItem[] = [
  {
    id: 'EVD-301',
    title: 'Empty Canvas Frame & Intact Wire Loop',
    subtitle: 'Ornate gilt-bronze frame with unfastened rear clips',
    type: 'physical',
    category: 'object',
    description: 'Heavy gilt-bronze frame hanging undamaged on damask wall. Master canvas is missing; dark velvet sheet inserted behind matting.',
    detailedNotes: 'Forensic examination proves rear brass turn-screws were completely unscrewed rather than forced or cut. Frame wire loop remains hooked securely to the wall bracket, demonstrating the theft was executed cleanly using standard curator tools without damaging the frame.',
    locationFound: 'Main Exhibition Hall · Alcove III',
    timeDiscovered: '21:32 GMT',
    iconName: 'frame',
    tag: 'PHYSICAL / CRIME SCENE',
    significance: 'high',
    observations: [
      {
        id: 'obs-301-1',
        label: 'Unscrewed Frame Clips',
        text: 'Brass turn-screws on rear matting retain zero tool gouges and were turned by a fitted driver.',
        detailText: 'Proves the theft was prepared by someone with curator tool access.',
        confirmed: true
      },
      {
        id: 'obs-301-2',
        label: 'Velvet Backing Insert',
        text: 'A pre-cut sheet of dark velvet was placed behind matting.',
        detailText: 'Concealed the missing canvas in ambient gas footlight illumination during the blackout.',
        confirmed: true
      }
    ],
    relatedSuspects: ['julian-vance'],
    relatedTimelineEvents: ['evt-3015', 'evt-3020', 'evt-3032'],
    connectedEvidenceIds: ['EVD-304', 'EVD-307']
  },
  {
    id: 'EVD-302',
    title: 'Tripped Dynamo Breaker & Graphite Residue',
    subtitle: 'Sub-basement DC switch panel with graphite lubricant',
    type: 'forensic',
    category: 'object',
    description: 'Main 200-amp DC knife switch pulled open on the gas-engine dynamo switchboard.',
    detailedNotes: 'Copper contact blades exhibit graphite-grease coating used to eliminate mechanical friction noise when pulling the switch quickly. Mineral spirits scent on the handle matches solvent used in art restoration.',
    locationFound: 'Sub-Basement Electrical Room',
    timeDiscovered: '21:38 GMT',
    iconName: 'zap',
    tag: 'FORENSIC / BLACKOUT VECTOR',
    significance: 'high',
    uvRevealed: true,
    uvText: 'GRAPHITE GREASE RESIDUE & MINERAL SPIRITS SOLVENT DETECTED ON SWITCH BLADES',
    observations: [
      {
        id: 'obs-302-1',
        label: 'Manual Breaker Trip',
        text: 'Knife switch pulled down cleanly by hand, not tripped by electrical thermal surge.',
        detailText: 'Confirms intentional blackout created at 21:18 GMT.',
        confirmed: true
      },
      {
        id: 'obs-302-2',
        label: 'Graphite Lubricant Trace',
        text: 'Graphite grease film on porcelain base matching restoration apron EVD-307.',
        detailText: 'Directly links breaker short to Senior Curator Julian Vance.',
        confirmed: true
      }
    ],
    relatedSuspects: ['julian-vance', 'arthur-pendelton'],
    relatedTimelineEvents: ['evt-3017', 'evt-3018', 'evt-3030'],
    connectedEvidenceIds: ['EVD-303', 'EVD-307', 'EVD-314']
  },
  {
    id: 'EVD-303',
    title: 'Disengaged Emergency Gong Pull-Wire',
    subtitle: 'Mechanical alarm pull-cable unhooked from pulley arm',
    type: 'physical',
    category: 'object',
    description: 'Wall-mounted mechanical bronze alarm gong near Main Hall archway.',
    detailedNotes: 'Steel pull-cable connecting floor lever to overhead gong was unhooked from its pulley ring and wedged behind timber moulding at 21:15 GMT. Mechanically prevented the emergency alarm gong from ringing during the blackout.',
    locationFound: 'Main Exhibition Hall · East Wall',
    timeDiscovered: '21:40 GMT',
    iconName: 'bell-off',
    tag: 'PHYSICAL / SOUND MECHANISM',
    significance: 'high',
    observations: [
      {
        id: 'obs-303-1',
        label: 'Unhooked Tension Ring',
        text: 'Steel cable tension ring manually unhooked and pinned back.',
        detailText: 'Disables the alarm gong from making any sound at 21:24 GMT.',
        confirmed: true
      },
      {
        id: 'obs-303-2',
        label: 'Alibi Disproof Foundation',
        text: 'Physical proof that the alarm gong NEVER chimed at 21:24 GMT.',
        detailText: 'Contradicts Vance\'s core alibi claim that he heard the gong chime twice.',
        confirmed: true
      }
    ],
    relatedSuspects: ['julian-vance'],
    relatedTimelineEvents: ['evt-3014', 'evt-3015'],
    connectedEvidenceIds: ['EVD-302', 'EVD-305']
  },
  {
    id: 'EVD-304',
    title: 'Felt-Sled Footprints in Alcove III Dust',
    subtitle: 'Soft felt sole impressions in restoration chalk dust',
    type: 'forensic',
    category: 'photo',
    description: 'Two distinct oval smudges in fine restoration chalk dust beneath empty frame EVD-301.',
    detailedNotes: 'Impression analysis reveals a soft woven felt mesh pattern without leather heel blocks or cobbler stitching. Matches specialized felt-soled footwear used exclusively in the Restoration Room to prevent parquet floor scuffing.',
    locationFound: 'Main Exhibition Hall · Alcove III Floor',
    timeDiscovered: '21:45 GMT',
    iconName: 'footprints',
    tag: 'FORENSIC / CULPRIT TRACE',
    significance: 'high',
    observations: [
      {
        id: 'obs-304-1',
        label: 'Felt Mesh Sole Pattern',
        text: 'Woven fiber mesh impression matching restoration footwear.',
        detailText: 'Eliminates visitors wearing outdoor leather boots or heels.',
        confirmed: true
      }
    ],
    relatedSuspects: ['julian-vance'],
    relatedTimelineEvents: ['evt-3020'],
    connectedEvidenceIds: ['EVD-301', 'EVD-307']
  },
  {
    id: 'EVD-305',
    title: 'Acoustic Test of Restoration Room Door',
    subtitle: 'Soundproofing measurement of padded double-oak door',
    type: 'forensic',
    category: 'document',
    description: 'Acoustic measurement report of the Restoration Room double-thickness oak door.',
    detailedNotes: 'Door features internal cork insulation and perimeter felt draft seals. Acoustic test confirms 48 dB sound attenuation when deadbolted. External hall gongs and chimes produce less than 32 dB inside the sealed room, rendering hall chimes completely inaudible inside.',
    locationFound: 'Restoration Room Threshold',
    timeDiscovered: '22:00 GMT',
    iconName: 'volume-x',
    tag: 'FORENSIC / CONTRADICTION PROOF',
    significance: 'high',
    observations: [
      {
        id: 'obs-305-1',
        label: '48 dB Noise Reduction',
        text: 'Sealed padded door reduces external hall sounds below hearing threshold.',
        detailText: 'Main Hall gongs cannot be heard inside when the door is locked.',
        confirmed: true
      },
      {
        id: 'obs-305-2',
        label: 'Decisive Alibi Contradiction',
        text: 'Disproves Vance\'s claim that he heard the 21:24 GMT chime from inside.',
        detailText: 'Proves Vance was physically in the Main Hall/Corridor during the blackout.',
        confirmed: true
      }
    ],
    relatedSuspects: ['julian-vance'],
    relatedTimelineEvents: ['evt-3028'],
    connectedEvidenceIds: ['EVD-303', 'EVD-306']
  },
  {
    id: 'EVD-306',
    title: 'Hollow Brass Chemical Storage Cylinder',
    subtitle: '4-foot polished brass cylinder containing rolled canvas',
    type: 'physical',
    category: 'object',
    description: 'Polished brass storage cylinder labeled "Refined Spirits of Turpentine" stored in wall cavity.',
    detailedNotes: 'Interior contains no liquid solvent; holds the original rolled oil canvas of "The Astronomical Quadrant of Tycho Brahe" wrapped in protective oiled silk. Uncovered inside a recessed wall cavity in Vance\'s restoration alcove.',
    locationFound: 'Restoration Alcove Wall Cavity',
    timeDiscovered: '22:15 GMT',
    iconName: 'archive',
    tag: 'PHYSICAL / STOLEN ASSET',
    significance: 'high',
    observations: [
      {
        id: 'obs-306-1',
        label: 'Recovered Masterpiece Canvas',
        text: 'Original 1888 canvas of Tycho Brahe\'s Quadrant undamaged inside cylinder.',
        detailText: 'Proves the stolen artwork never left the gallery building.',
        confirmed: true
      },
      {
        id: 'obs-306-2',
        label: 'Curator Concealment Vector',
        text: 'Stored inside Vance\'s private chemical inventory alcove.',
        detailText: 'Conclusively ties the stolen artwork to Julian Vance.',
        confirmed: true
      }
    ],
    relatedSuspects: ['julian-vance'],
    relatedTimelineEvents: ['evt-3024', 'evt-3026'],
    connectedEvidenceIds: ['EVD-301', 'EVD-307', 'EVD-308']
  },
  {
    id: 'EVD-307',
    title: 'Curator Vance\'s Stained Apron',
    subtitle: 'Heavy canvas restoration apron with chemical stains',
    type: 'physical',
    category: 'object',
    description: 'Dark canvas restoration apron hanging on coat peg outside Restoration Room.',
    detailedNotes: 'Left pocket retains graphite-grease residue matching dynamo breaker EVD-302. Right pocket contains a fitted brass turn-screw driver matching rear clips of frame EVD-301. Smells strongly of mineral spirits.',
    locationFound: 'Restoration Corridor Coat Peg',
    timeDiscovered: '21:50 GMT',
    iconName: 'user-check',
    tag: 'PHYSICAL / CULPRIT LINK',
    significance: 'high',
    uvRevealed: true,
    uvText: 'GRAPHITE GREASE RESIDUE MATCHES BREAKER EVD-302; TURN-SCREW DRIVER IN POCKET',
    observations: [
      {
        id: 'obs-307-1',
        label: 'Graphite & Solvent Match',
        text: 'Smears match breaker switch EVD-302 and mineral spirits solvent.',
        detailText: 'Direct physical link to blackout switch operation.',
        confirmed: true
      },
      {
        id: 'obs-307-2',
        label: 'Turn-Screw Tool',
        text: 'Driver fits rear clips of frame EVD-301 exactly.',
        detailText: 'Tool used to unfasten canvas during blackout.',
        confirmed: true
      }
    ],
    relatedSuspects: ['julian-vance'],
    relatedTimelineEvents: ['evt-3014', 'evt-3017', 'evt-3020'],
    connectedEvidenceIds: ['EVD-301', 'EVD-302', 'EVD-306']
  },
  {
    id: 'EVD-308',
    title: 'Blackwood Syndicate Debt Note',
    subtitle: 'Handwritten demand letter for £12,000 gambling debt',
    type: 'document',
    category: 'document',
    description: 'Demanding note dated three days prior found inside Vance\'s locked desk drawer.',
    detailedNotes: '"£12,000 due by midnight April 14th or loan books are delivered to Scotland Yard and your neck is broken." Signed with Blackwood Syndicate cipher seal. Establishes critical financial motive for theft.',
    locationFound: 'Curator\'s Office Desk Drawer',
    timeDiscovered: '22:05 GMT',
    iconName: 'file-text',
    tag: 'DOCUMENTARY / KEY MOTIVE',
    significance: 'high',
    observations: [
      {
        id: 'obs-308-1',
        label: '£12,000 Debt Pressure',
        text: 'Blackwood Syndicate demand note with midnight April 14 deadline.',
        detailText: 'Provides urgent financial motive for stealing canvas to sell to private buyer.',
        confirmed: true
      }
    ],
    relatedSuspects: ['julian-vance'],
    relatedTimelineEvents: ['evt-3018', 'evt-3026'],
    connectedEvidenceIds: ['EVD-306']
  },
  {
    id: 'EVD-309',
    title: 'Stained Lace Handkerchief',
    subtitle: 'Monogrammed silk handkerchief caught in door latch',
    type: 'physical',
    category: 'object',
    description: 'Fine silk lace handkerchief monogrammed "B.R." found caught in rear Loading Bay door latch.',
    detailedNotes: 'Red Herring #1. Belongs to Lady Beatrice Ravenscroft. Stained with linseed oil. Proves she visited the Loading Bay corridor, but footstep prints EVD-304 in Alcove III refute her presence near the frame.',
    locationFound: 'Loading Bay Door Threshold',
    timeDiscovered: '21:48 GMT',
    iconName: 'flag',
    tag: 'PHYSICAL / RED HERRING',
    significance: 'medium',
    observations: [
      {
        id: 'obs-309-1',
        label: 'Monogram B.R.',
        text: 'Silk handkerchief belonging to Lady Beatrice Ravenscroft.',
        detailText: 'Confirms her presence in rear corridor during blackout.',
        confirmed: true
      }
    ],
    relatedSuspects: ['lady-beatrice-ravenscroft'],
    relatedTimelineEvents: ['evt-3022'],
    connectedEvidenceIds: ['EVD-310']
  },
  {
    id: 'EVD-310',
    title: 'Locked Safe & Provenance Folder',
    subtitle: 'Open wall safe with Lord Ravenscroft bequest terms',
    type: 'document',
    category: 'document',
    description: 'Curator wall safe left ajar. Bequest provenance ledger opened to page 42.',
    detailedNotes: 'Red Herring #1 Support. Explains Lady Beatrice\'s true objective: she entered the Curator\'s Office to inspect secret trust clauses in her late husband\'s gallery bequest, not to steal the painting.',
    locationFound: 'Curator\'s Office Wall Safe',
    timeDiscovered: '22:10 GMT',
    iconName: 'shield',
    tag: 'DOCUMENTARY / RED HERRING',
    significance: 'medium',
    observations: [
      {
        id: 'obs-310-1',
        label: 'Bequest Trust Ledger',
        text: 'Ledger opened to bequest clauses regarding estate revertment.',
        detailText: 'Explains why Lady Beatrice was in the Curator\'s Office.',
        confirmed: true
      }
    ],
    relatedSuspects: ['lady-beatrice-ravenscroft'],
    relatedTimelineEvents: ['evt-3015', 'evt-3022'],
    connectedEvidenceIds: ['EVD-309']
  },
  {
    id: 'EVD-311',
    title: 'Custom Wire Lockpicks',
    subtitle: 'Set of 4 tempered steel lockpick tension wrenches',
    type: 'physical',
    category: 'object',
    description: 'Set of custom lockpicks found hidden behind carpet runner in Private Vault corridor.',
    detailedNotes: 'Red Herring #2. Belongs to art broker Marcus Sterling. Scrapes around Private Vault door show he tried lockpicking the vault door 120 ft away from Alcove III, eliminating him from Main Hall theft.',
    locationFound: 'Private Collection Corridor',
    timeDiscovered: '21:52 GMT',
    iconName: 'key',
    tag: 'PHYSICAL / RED HERRING',
    significance: 'medium',
    observations: [
      {
        id: 'obs-311-1',
        label: 'Private Vault Lock Scrapes',
        text: 'Pick marks on Private Collection door, 120 ft from Alcove III.',
        detailText: 'Proves Sterling was attempting vault entry, not Main Hall theft.',
        confirmed: true
      }
    ],
    relatedSuspects: ['marcus-sterling'],
    relatedTimelineEvents: ['evt-3022'],
    connectedEvidenceIds: ['EVD-312']
  },
  {
    id: 'EVD-312',
    title: 'Stopped Silver Pocket Watch',
    subtitle: 'Swiss pocket watch stopped at 21:22 GMT on terrace bench',
    type: 'physical',
    category: 'object',
    description: 'Swiss silver pocket watch with cracked glass crystal found under Courtyard Terrace bench.',
    detailedNotes: 'Red Herring #2 Support. Hands frozen at 21:22 GMT. Belongs to Marcus Sterling, who dropped it when tripping over a stone bench in total darkness while fleeing outdoors during the blackout.',
    locationFound: 'East Courtyard Terrace Bench',
    timeDiscovered: '21:55 GMT',
    iconName: 'clock',
    tag: 'PHYSICAL / RED HERRING',
    significance: 'medium',
    observations: [
      {
        id: 'obs-312-1',
        label: '21:22 GMT Glass Crack',
        text: 'Watch mainspring intact; hands stopped by impact at 21:22 GMT.',
        detailText: 'Confirms Sterling\'s location on terrace at 21:22 GMT during blackout.',
        confirmed: true
      }
    ],
    relatedSuspects: ['marcus-sterling'],
    relatedTimelineEvents: ['evt-3022'],
    connectedEvidenceIds: ['EVD-311']
  },
  {
    id: 'EVD-313',
    title: 'Guard Pendelton\'s Security Logbook',
    subtitle: 'Official gallery guard duty logbook recorded in ink',
    type: 'document',
    category: 'document',
    description: 'Official leather-bound guard logbook kept by Head Guard Arthur Pendelton.',
    detailedNotes: 'Contains inked timeline log: 20:45 Gates locked; 21:14 Sweep noted Vance at Gong Wall; 21:18 Power failed; 21:30 Dynamo reset online; 21:32 Alcove III missing frame discovered. Key timeline verification document.',
    locationFound: 'Guard Lodge Desk',
    timeDiscovered: '21:35 GMT',
    iconName: 'book-open',
    tag: 'DOCUMENTARY / TIMELINE PROOF',
    significance: 'high',
    observations: [
      {
        id: 'obs-313-1',
        label: 'Official Duty Log',
        text: 'Logs Vance near Gong Wall at 21:14 GMT and blackout start at 21:18 GMT.',
        detailText: 'Establishes continuous timeline verification for inquest.',
        confirmed: true
      }
    ],
    relatedSuspects: ['arthur-pendelton', 'julian-vance'],
    relatedTimelineEvents: ['evt-3045', 'evt-3014', 'evt-3018', 'evt-3030', 'evt-3032'],
    connectedEvidenceIds: ['EVD-302', 'EVD-303']
  },
  {
    id: 'EVD-314',
    title: 'Gallery Floorplan & Electrical Schematic',
    subtitle: 'Architectural blueprint of gas lines & DC wiring',
    type: 'document',
    category: 'document',
    description: 'Architectural blueprint detailing DC wiring paths, Sub-Basement access stairs, and wall cavity dimensions behind Restoration Alcoves.',
    detailedNotes: 'Proves spatial feasibility of moving from Sub-Basement to Main Hall Alcove III and hiding canvas in wall cavity within the 12-minute blackout window.',
    locationFound: 'Curator\'s Office Wall Map',
    timeDiscovered: '22:25 GMT',
    iconName: 'map-pin',
    tag: 'DOCUMENTARY / STRUCTURAL',
    significance: 'medium',
    observations: [
      {
        id: 'obs-314-1',
        label: 'Service Passages',
        text: 'Shows direct service stair connecting Sub-Basement to Restoration Alcove.',
        detailText: 'Explains how Vance moved quietly between rooms in darkness.',
        confirmed: true
      }
    ],
    relatedSuspects: ['julian-vance'],
    relatedTimelineEvents: ['evt-3017', 'evt-3024'],
    connectedEvidenceIds: ['EVD-302', 'EVD-306']
  }
];
