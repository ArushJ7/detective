import type { EvidenceItem } from '../../state/types';

export const CASE_002_EVIDENCE: EvidenceItem[] = [
  {
    id: 'EVD-201',
    title: 'Forced Mortise Deadbolt',
    subtitle: 'Heavy brass deadbolt extended outward',
    type: 'physical',
    category: 'object',
    description: 'Heavy brass mortise deadbolt mechanism. Bolt is bent outward with wood splinters adhering to the latch edge.',
    detailedNotes: 'Forensic observation proves the strike plate was deformed from external impact (crowbar). The deadbolt was fully extended when forced, proving the door was deadbolted from INSIDE when entry was breached.',
    locationFound: "Study Door & Frame",
    timeDiscovered: '21:50 GMT',
    iconName: 'lock',
    tag: 'PHYSICAL / KEY MECHANISM',
    significance: 'high',
    observations: [
      {
        id: 'obs-201-1',
        label: 'Deadbolt Throw',
        text: 'The forged steel bolt was extended 1.5 inches fully into the strike plate.',
        detailText: 'Proves the door was locked from the inside prior to entry.',
        confirmed: true
      },
      {
        id: 'obs-201-2',
        label: 'Wood Splinter Failure',
        text: 'Outer jamb splinters point inward from external crowbar force.',
        detailText: 'Confirms forced entry from hallway at 21:50 GMT.',
        confirmed: true
      }
    ],
    relatedSuspects: ['arthur-vance'],
    relatedTimelineEvents: ['evt-2103', 'evt-2150'],
    connectedEvidenceIds: ['EVD-202']
  },
  {
    id: 'EVD-202',
    title: 'Interior Key in Lock',
    subtitle: 'Brass key turned 90° in interior keyway',
    type: 'physical',
    category: 'object',
    description: 'Iron skeleton key resting inside the interior keyway, turned 90 degrees.',
    detailedNotes: 'Proves an exterior key could not have operated the lock from outside because the interior key barrel blocked exterior tumbler engagement.',
    locationFound: 'Inside Keyhole',
    timeDiscovered: '21:50 GMT',
    iconName: 'key',
    tag: 'PHYSICAL / KEY MECHANISM',
    significance: 'high',
    observations: [
      {
        id: 'obs-202-1',
        label: 'Key Orientation',
        text: 'Authentic master key turned horizontally inside the lock barrel.',
        detailText: 'Key left in lock prevents exterior key operation.',
        confirmed: true
      }
    ],
    relatedSuspects: ['arthur-vance'],
    relatedTimelineEvents: ['evt-2103', 'evt-2150'],
    connectedEvidenceIds: ['EVD-201']
  },
  {
    id: 'EVD-203',
    title: 'Unfinished Royal Society Letter',
    subtitle: 'Accusation draft to Royal Society Vice President',
    type: 'document',
    category: 'document',
    description: 'Letter written by Cole dated today at 21:00, addressed to the Vice President of the Royal Society, accusing Dr. Evelyn Reed of patent usurpation.',
    detailedNotes: 'Establishes critical motive: Cole was exposing Dr. Reed\'s stolen £10,000 synthetic alkaloid patent at midnight.',
    locationFound: 'Writing Desk',
    timeDiscovered: '21:52 GMT',
    iconName: 'file-text',
    tag: 'DOCUMENTARY / KEY MOTIVE',
    significance: 'high',
    observations: [
      {
        id: 'obs-203-1',
        label: 'Accusation Draft',
        text: 'Explicitly names Dr. Evelyn Reed regarding unauthorized patent transfer.',
        detailText: 'Cole intended to deliver this notice by midnight.',
        confirmed: true
      }
    ],
    relatedSuspects: ['dr-evelyn-reed'],
    relatedTimelineEvents: ['evt-1800', 'evt-2110'],
    connectedEvidenceIds: ['EVD-211', 'EVD-214']
  },
  {
    id: 'EVD-204',
    title: 'Poisoned Wax Seal Stamp',
    subtitle: 'Brass stamp with turned ebony handle',
    type: 'forensic',
    category: 'object',
    description: 'Brass seal stamp with carved Cole crest and turned ebony handle.',
    detailedNotes: 'Handle retains forensic neurotoxin residue + transdermal carrier reagent. Cole\'s right thumbprint is embedded in wax residue on the crest base. Primary vector of contact poisoning.',
    locationFound: 'Desk Blotter',
    timeDiscovered: '22:05 GMT',
    iconName: 'stamp',
    tag: 'FORENSIC / KEY MECHANISM',
    significance: 'high',
    uvRevealed: true,
    uvText: 'NEUROTOXIN RESIDUE & THUMBPRINT EMBEDDED IN WAX RESIDUE',
    observations: [
      {
        id: 'obs-204-1',
        label: 'Transdermal Residue',
        text: 'Oily film on ebony handle containing neurotoxic alkaloid reagent.',
        detailText: 'Causes neuromuscular paralysis 10-20 mins post contact.',
        confirmed: true
      },
      {
        id: 'obs-204-2',
        label: 'Cole\'s Thumbprint',
        text: 'Victim\'s thumbprint etched into red sealing wax on base.',
        detailText: 'Confirms Cole handled the stamp at ~21:10 GMT.',
        confirmed: true
      }
    ],
    relatedSuspects: ['dr-evelyn-reed'],
    relatedTimelineEvents: ['evt-2030', 'evt-2110', 'evt-2125'],
    connectedEvidenceIds: ['EVD-203', 'EVD-207']
  },
  {
    id: 'EVD-205',
    title: 'Latched Sash Window',
    subtitle: 'Double-hung sash window with brass acorn latch',
    type: 'physical',
    category: 'object',
    description: 'Heavy glass sash window fully closed with brass acorn catch turned to locked position.',
    detailedNotes: 'Proves no entry or egress was made through the windows. Eliminates window breach theories.',
    locationFound: 'South Sash Window',
    timeDiscovered: '21:55 GMT',
    iconName: 'window',
    tag: 'ENVIRONMENTAL / ELIMINATION',
    significance: 'medium',
    observations: [
      {
        id: 'obs-205-1',
        label: 'Interior Acorn Latch',
        text: 'Brass acorn catch securely engaged in upper socket from inside.',
        detailText: 'Window could not be opened from terrace outside.',
        confirmed: true
      }
    ],
    relatedSuspects: ['julian-sterling'],
    relatedTimelineEvents: ['evt-2142'],
    connectedEvidenceIds: ['EVD-212']
  },
  {
    id: 'EVD-206',
    title: 'Paralysis Drag Marks',
    subtitle: 'Scuff marks on leather armrest and oriental rug',
    type: 'forensic',
    category: 'photo',
    description: 'Scuff marks on oriental rug and leather armchair armrest.',
    detailedNotes: 'Indicates sudden loss of muscle control and gradual collapse downward from desk toward floor, rather than violent struggle.',
    locationFound: 'Floor near Desk',
    timeDiscovered: '21:53 GMT',
    iconName: 'activity',
    tag: 'FORENSIC / TIMELINE PROOF',
    significance: 'high',
    observations: [
      {
        id: 'obs-206-1',
        label: 'Neuromuscular Collapse',
        text: 'Hand drag marks on leather armrest and carpet fibers.',
        detailText: 'Shows victim collapsed while sitting at desk.',
        confirmed: true
      }
    ],
    relatedSuspects: ['dr-evelyn-reed'],
    relatedTimelineEvents: ['evt-2125'],
    connectedEvidenceIds: ['EVD-204', 'EVD-207']
  },
  {
    id: 'EVD-207',
    title: 'Medical Examiner Report',
    subtitle: 'Autopsy notes by Dr. H. Watson, M.D.',
    type: 'document',
    category: 'document',
    description: 'Official medical report detailing transdermal toxic absorption on Cole\'s right thumb and forefinger.',
    detailedNotes: 'Onset latency: 10–20 minutes post contact. Estimated collapse window: 21:20 – 21:30 GMT (~21:25 central point). Proves attack happened long BEFORE 21:42 thud!',
    locationFound: 'Medical Examiner Desk',
    timeDiscovered: '22:30 GMT',
    iconName: 'file-spreadsheet',
    tag: 'FORENSIC / CRITICAL TIMELINE',
    significance: 'high',
    observations: [
      {
        id: 'obs-207-1',
        label: 'Collapse Window',
        text: 'Estimated collapse window 21:20–21:30 GMT (~21:25 central point).',
        detailText: 'Refutes assumption that attack occurred at 21:42.',
        confirmed: true
      },
      {
        id: 'obs-207-2',
        label: 'Contact Vector',
        text: 'Transdermal absorption on right thumb and index finger.',
        detailText: 'Matches handle of wax seal stamp EVD-204.',
        confirmed: true
      }
    ],
    relatedSuspects: ['dr-evelyn-reed'],
    relatedTimelineEvents: ['evt-2110', 'evt-2125', 'evt-2142'],
    connectedEvidenceIds: ['EVD-204', 'EVD-206', 'EVD-209']
  },
  {
    id: 'EVD-208',
    title: 'Sphinx Paperweight',
    subtitle: '4 lb bronze paperweight resting on hearth fender',
    type: 'physical',
    category: 'object',
    description: '4 lb bronze paperweight found lying inside brass hearth fender, 8 feet from its normal spot on the lectern desk.',
    detailedNotes: 'Fresh brass scrape on bottom matching the hearth fender rim. Source of the loud 21:42 thud heard by witnesses.',
    locationFound: 'Hearth Fender',
    timeDiscovered: '21:58 GMT',
    iconName: 'box',
    tag: 'PHYSICAL / DECOY PROOF',
    significance: 'high',
    observations: [
      {
        id: 'obs-208-1',
        label: 'Hearth Scrape',
        text: 'Fresh metallic scrape on bottom matching fender ridge.',
        detailText: 'Fell from high lectern onto hearth at 21:42.',
        confirmed: true
      }
    ],
    relatedSuspects: ['dr-evelyn-reed', 'julian-sterling'],
    relatedTimelineEvents: ['evt-2030', 'evt-2142'],
    connectedEvidenceIds: ['EVD-209']
  },
  {
    id: 'EVD-209',
    title: 'Scorched Candle & Gut String',
    subtitle: 'Calibrated tallow stub & charred violin string',
    type: 'forensic',
    category: 'object',
    description: 'Specially calibrated tallow candle stub burnt to base, with melted wax pool containing a charred fragment of gut string.',
    detailedNotes: 'Gut string matches violin E-string tensile cord. Placed at 20:30 to burn through and drop paperweight EVD-208 at ~21:42. Key proof of pre-programmed mechanical decoy!',
    locationFound: 'High Lectern Desk',
    timeDiscovered: '22:10 GMT',
    iconName: 'flame',
    tag: 'FORENSIC / DECOY PROOF',
    significance: 'high',
    uvRevealed: true,
    uvText: 'CHARRED VIOLIN GUT-STRING FRAGMENT MELTED IN TALLOW WAX',
    observations: [
      {
        id: 'obs-209-1',
        label: 'Calibrated Candle Decoy',
        text: 'Candle stub set to burn for ~72 mins (20:30 to 21:42).',
        detailText: 'Burnt string released sphinx paperweight at 21:42.',
        confirmed: true
      },
      {
        id: 'obs-209-2',
        label: 'Violin Gut String',
        text: 'Scorched cord fragment embedded in tallow wax.',
        detailText: 'Not a standard candle wick; part of release trigger.',
        confirmed: true
      }
    ],
    relatedSuspects: ['dr-evelyn-reed'],
    relatedTimelineEvents: ['evt-2030', 'evt-2142'],
    connectedEvidenceIds: ['EVD-208', 'EVD-207']
  },
  {
    id: 'EVD-210',
    title: 'Clock Maintenance Log',
    subtitle: 'Log showing grandfather clock service yesterday',
    type: 'document',
    category: 'document',
    description: 'Log showing grandfather clock was serviced yesterday by Aberdeen Horology.',
    detailedNotes: 'Red Herring. Suggests clock hands might have been altered. Mechanical inspection confirms clock pendulum was un-tampered and ticking accurately.',
    locationFound: 'Study Bookshelf',
    timeDiscovered: '22:15 GMT',
    iconName: 'clock',
    tag: 'DOCUMENTARY / RED HERRING',
    significance: 'low',
    observations: [
      {
        id: 'obs-210-1',
        label: 'Standard Service',
        text: 'Routine oiling and pendulum balance logged yesterday.',
        detailText: 'Clock mechanism shows no sign of tampering.',
        confirmed: true
      }
    ],
    relatedSuspects: ['arthur-vance'],
    relatedTimelineEvents: ['evt-2142'],
    connectedEvidenceIds: []
  },
  {
    id: 'EVD-211',
    title: 'Torn Patent Formula Draft',
    subtitle: 'Chemical notes with Dr. Reed\'s name crossed out',
    type: 'document',
    category: 'document',
    description: 'Fragmented notes showing chemical formulas for synthetic alkaloid signed by Cole, with Dr. Reed\'s name aggressively crossed out.',
    detailedNotes: 'Confirms escalating conflict over alkaloid patent ownership between Cole and Dr. Reed.',
    locationFound: 'Wastebasket',
    timeDiscovered: '22:02 GMT',
    iconName: 'file-text',
    tag: 'DOCUMENTARY / MOTIVE',
    significance: 'medium',
    observations: [
      {
        id: 'obs-211-1',
        label: 'Erased Co-Author',
        text: 'Dr. Reed\'s name struck through in heavy black ink.',
        detailText: 'Shows Cole\'s decision to strip her of credit.',
        confirmed: true
      }
    ],
    relatedSuspects: ['dr-evelyn-reed'],
    relatedTimelineEvents: ['evt-1800'],
    connectedEvidenceIds: ['EVD-203', 'EVD-214']
  },
  {
    id: 'EVD-212',
    title: 'Terrace Footprint Cast',
    subtitle: 'Plaster cast of size 10 gentlemen\'s boot print',
    type: 'forensic',
    category: 'photo',
    description: 'Plaster cast of size 10 gents riding boot footprint in mud outside study window.',
    detailedNotes: 'Red Herring. Matches Julian Sterling\'s riding boots. Proves Sterling was snooping on terrace at 21:40, but window EVD-205 was locked from inside.',
    locationFound: 'West Terrace Mud',
    timeDiscovered: '22:20 GMT',
    iconName: 'footprints',
    tag: 'FORENSIC / RED HERRING',
    significance: 'medium',
    observations: [
      {
        id: 'obs-212-1',
        label: 'Sterling Boot Match',
        text: 'Tread pattern matches Julian Sterling\'s boots.',
        detailText: 'Proves presence on terrace, but window remained latched.',
        confirmed: true
      }
    ],
    relatedSuspects: ['julian-sterling'],
    relatedTimelineEvents: ['evt-2142'],
    connectedEvidenceIds: ['EVD-205']
  },
  {
    id: 'EVD-213',
    title: 'Intact Anesthetic Vials',
    subtitle: 'Locked mahogany chest with unbroken wax seals',
    type: 'physical',
    category: 'object',
    description: 'Locked apothecary cabinet containing chloroform and ether bottles with intact wax seals.',
    detailedNotes: 'Red Herring. Proves chloroform or volatile anesthetic gas was NOT used in the crime.',
    locationFound: 'Side Cabinet',
    timeDiscovered: '22:12 GMT',
    iconName: 'package',
    tag: 'PHYSICAL / RED HERRING',
    significance: 'low',
    observations: [
      {
        id: 'obs-213-1',
        label: 'Seals Intact',
        text: 'All chloroform vials retain factory wax seals.',
        detailText: 'Eliminates gas poison theory.',
        confirmed: true
      }
    ],
    relatedSuspects: [],
    relatedTimelineEvents: [],
    connectedEvidenceIds: []
  },
  {
    id: 'EVD-214',
    title: 'London Syndicate Contract',
    subtitle: 'Secret agreement for £10,000 patent rights',
    type: 'document',
    category: 'document',
    description: 'Secret agreement between Dr. Reed and Apex Chemical Syndicate for £10,000 upon delivery of patent rights before midnight, Oct 14.',
    detailedNotes: 'Proves financial urgency for Dr. Reed to silence Cole before midnight to secure £10,000 payout.',
    locationFound: 'Dr. Reed\'s Desk Drawer',
    timeDiscovered: '22:40 GMT',
    iconName: 'file-text',
    tag: 'DOCUMENTARY / KEY MOTIVE',
    significance: 'high',
    observations: [
      {
        id: 'obs-214-1',
        label: 'Midnight Deadline',
        text: 'Requires delivery of sole patent rights before midnight.',
        detailText: 'Drives Reed\'s immediate action tonight.',
        confirmed: true
      }
    ],
    relatedSuspects: ['dr-evelyn-reed'],
    relatedTimelineEvents: ['evt-1800', 'evt-2030'],
    connectedEvidenceIds: ['EVD-203', 'EVD-211']
  }
];
