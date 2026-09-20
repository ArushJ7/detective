import type { TimelineEvent } from '../../state/types';

export const CASE_003_TIMELINE: TimelineEvent[] = [
  {
    id: 'evt-3045',
    time: '20:45 GMT',
    title: 'Public Hours Close & Gates Secured',
    description: 'Gallery public operating hours end. Guard Pendelton locks the heavy exterior iron entrance gates. Only registered VIP patrons and gallery staff remain inside.',
    location: 'Main Vestibule & Exterior Gates',
    relatedSuspects: ['arthur-pendelton'],
    relatedEvidence: ['EVD-313']
  },
  {
    id: 'evt-3100',
    time: '21:00 GMT',
    title: 'Evening VIP Private Viewing Commences',
    description: 'Private evening art viewing begins under carbon electric arc illumination. Patrons include Lady Beatrice Ravenscroft and art broker Marcus Sterling.',
    location: 'Main Exhibition Hall',
    relatedSuspects: ['lady-beatrice-ravenscroft', 'marcus-sterling', 'julian-vance'],
    relatedEvidence: ['EVD-313']
  },
  {
    id: 'evt-3014',
    time: '21:14 GMT',
    title: 'Curator Vance Spotted at East Gong Wall',
    description: 'Guard Pendelton conducts a routine hall sweep and logs Curator Vance standing near the East Gong wall holding maintenance tools.',
    location: 'Main Exhibition Hall · East Wall',
    relatedSuspects: ['julian-vance', 'arthur-pendelton'],
    relatedEvidence: ['EVD-313']
  },
  {
    id: 'evt-3015',
    time: '21:15 GMT',
    title: 'Emergency Gong Unhooked & Frame Turn-Screws Loosened',
    description: 'Vance manually unhooks the emergency gong pull-wire (EVD-303) and pre-loosens the rear brass turn-screws of frame EVD-301 in Alcove III.',
    location: 'Main Exhibition Hall · Alcove III',
    relatedSuspects: ['julian-vance'],
    relatedEvidence: ['EVD-301', 'EVD-303', 'EVD-307'],
    hasContradiction: true,
    contradictionNote: 'Vance claims he was in the Restoration Room at this time, but Guard Pendelton saw him at the Gong wall.'
  },
  {
    id: 'evt-3017',
    time: '21:17 GMT',
    title: 'Vance Slips Down to Sub-Basement',
    description: 'Vance takes the service stairs to the Sub-Basement Electrical Room carrying mineral spirits solvent and graphite pliers.',
    location: 'Sub-Basement Service Stairs',
    relatedSuspects: ['julian-vance'],
    relatedEvidence: ['EVD-302', 'EVD-307', 'EVD-314']
  },
  {
    id: 'evt-3018',
    time: '21:18 GMT',
    title: 'Dynamo Breaker Shorted — 12-Minute Blackout Begins',
    description: 'Vance trips the primary 200-amp DC knife switch (EVD-302). Electric arc lamps extinguish; frame low-voltage alarm circuit collapses. Gallery plunged into pitch darkness.',
    location: 'Sub-Basement Electrical Room',
    relatedSuspects: ['julian-vance', 'arthur-pendelton'],
    relatedEvidence: ['EVD-302', 'EVD-308', 'EVD-313']
  },
  {
    id: 'evt-3020',
    time: '21:20 GMT',
    title: 'Canvas Excised & Velvet Backing Inserted',
    description: 'Wearing felt restoration slippers (EVD-304), Vance unmounts the canvas in Alcove III, inserts dark velvet backing into frame EVD-301, and rolls the canvas in oiled silk.',
    location: 'Main Exhibition Hall · Alcove III',
    relatedSuspects: ['julian-vance'],
    relatedEvidence: ['EVD-301', 'EVD-304', 'EVD-307']
  },
  {
    id: 'evt-3022',
    time: '21:22 GMT',
    title: 'Marcus Sterling Lockpick Attempt & Watch Drop',
    description: 'Marcus Sterling attempts lockpicking the Private Vault door (EVD-311); flees outdoors in darkness, dropping silver pocket watch EVD-312 on terrace bench at 21:22 GMT.',
    location: 'Private Vault Corridor & East Terrace',
    relatedSuspects: ['marcus-sterling', 'lady-beatrice-ravenscroft'],
    relatedEvidence: ['EVD-309', 'EVD-310', 'EVD-311', 'EVD-312'],
    hasContradiction: true,
    contradictionNote: 'Disproves Sterling\'s claim that he never entered any internal corridor.'
  },
  {
    id: 'evt-3024',
    time: '21:24 GMT',
    title: 'Canvas Transported to Restoration Corridor',
    description: 'Vance carries the rolled canvas into the Restoration Corridor. Vance later falsely claims he heard the emergency gong chime at this exact minute.',
    location: 'Restoration Corridor',
    relatedSuspects: ['julian-vance'],
    relatedEvidence: ['EVD-303', 'EVD-305', 'EVD-306'],
    hasContradiction: true,
    contradictionNote: 'Vance claims he heard the gong chime twice at 21:24 GMT, but EVD-303 proves the gong was disconnected.'
  },
  {
    id: 'evt-3026',
    time: '21:26 GMT',
    title: 'Stolen Canvas Hidden in Hollow Brass Cylinder',
    description: 'Vance conceals the rolled original canvas inside hollow brass chemical storage cylinder EVD-306 in his private restoration alcove wall cavity.',
    location: 'Restoration Alcove Wall Cavity',
    relatedSuspects: ['julian-vance'],
    relatedEvidence: ['EVD-306', 'EVD-308']
  },
  {
    id: 'evt-3028',
    time: '21:28 GMT',
    title: 'Vance Deadbolts Restoration Room Door',
    description: 'Vance enters the Restoration Room, deadbolts the padded oak door from inside (EVD-305), and waits for power restoration.',
    location: 'Restoration Room Threshold',
    relatedSuspects: ['julian-vance'],
    relatedEvidence: ['EVD-305']
  },
  {
    id: 'evt-3030',
    time: '21:30 GMT',
    title: 'Breaker Reset — 12-Minute Blackout Ends',
    description: 'Guard Pendelton resets the dynamo breaker switch in the Sub-Basement. Arc lamps restrike; gallery illumination restored.',
    location: 'Sub-Basement Electrical Room',
    relatedSuspects: ['arthur-pendelton'],
    relatedEvidence: ['EVD-302', 'EVD-313']
  },
  {
    id: 'evt-3032',
    time: '21:32 GMT',
    title: 'Missing Canvas Discovered in Alcove III',
    description: 'Guard Pendelton discovers the bare gilt frame in Alcove III. Triggers immediate gallery lockdown and calls Scotland Yard.',
    location: 'Main Exhibition Hall · Alcove III',
    relatedSuspects: ['arthur-pendelton', 'julian-vance'],
    relatedEvidence: ['EVD-301', 'EVD-313']
  }
];
