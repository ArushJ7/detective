import type { TimelineEvent } from '../../state/types';

export const CASE_001_TIMELINE: TimelineEvent[] = [
  {
    id: 'evt-2000',
    time: '20:00 GMT',
    title: 'Dinner Banquet Commences',
    description: 'Lord Blackwood and guests assemble in the Grand Dining Room for four-course dinner service.',
    location: 'Grand Dining Room',
    relatedSuspects: ['james-blackwood', 'eleanor-blackwood', 'daniel-sterling', 'martha-caldwell'],
    relatedEvidence: ['EVD-003', 'EVD-011']
  },
  {
    id: 'evt-2100',
    time: '21:00 GMT',
    title: 'Vitrine #04 Routine Verification',
    description: 'Martha Caldwell conducts routine inventory check of West Vitrine #04 and verifies Chubb cylinder lock is fully engaged.',
    location: 'West Drawing Room',
    relatedSuspects: ['martha-caldwell', 'victoria-vane'],
    relatedEvidence: ['EVD-001', 'EVD-010']
  },
  {
    id: 'evt-2115',
    time: '21:15 GMT',
    title: 'Terrace Departure & Cigarette Break',
    description: 'James Blackwood and Daniel Sterling leave the dining table to step onto the terrace balcony balustrade.',
    location: 'Drawing Room Balcony Terrace',
    relatedSuspects: ['james-blackwood', 'daniel-sterling'],
    relatedEvidence: ['EVD-008']
  },
  {
    id: 'evt-2124',
    time: '21:24 GMT',
    title: 'Basement Mains Fuse Breaker Trip',
    description: 'Main electrical breaker manually disengaged in basement room at 21:24:02 GMT. 240-second blackout commences.',
    location: 'Basement Electrical Room',
    relatedSuspects: ['james-blackwood'],
    relatedEvidence: ['EVD-002', 'EVD-005', 'EVD-009'],
    hasContradiction: true,
    contradictionNote: 'James claims he was on the balcony, but telemetry and CCTV log basement access at 21:24.'
  },
  {
    id: 'evt-2131',
    time: '21:31 GMT',
    title: 'Vitrine Lock Disengagement',
    description: 'Chubb brass cylinder disengaged cleanly using paraffin wax-cast duplicate key EK-09 without picks.',
    location: 'West Drawing Room Vitrine #04',
    relatedSuspects: ['james-blackwood', 'martha-caldwell'],
    relatedEvidence: ['EVD-001', 'EVD-004', 'EVD-012'],
    hasContradiction: true,
    contradictionNote: 'Paraffin wax mold found in coat pocket matches lock residue.'
  },
  {
    id: 'evt-2138',
    time: '21:38 GMT',
    title: 'Butler Hastings Cellar Observation',
    description: 'Butler Hastings observes James Blackwood at wine cellar door 14 minutes after blackout began.',
    location: 'Wine Cellar Stairwell',
    relatedSuspects: ['james-blackwood'],
    relatedEvidence: ['EVD-006'],
    hasContradiction: true,
    contradictionNote: 'Contradicts James\' statement claiming cellar descent at 21:20.'
  },
  {
    id: 'evt-2142',
    time: '21:42 GMT',
    title: 'Sash Window Opening & Exterior Footprint',
    description: 'West sash window unlatched from interior; bespoke size 11 Oxford heel print left on damp terraceFlagstones.',
    location: 'West Window & Terrace',
    relatedSuspects: ['james-blackwood'],
    relatedEvidence: ['EVD-006', 'EVD-007']
  },
  {
    id: 'evt-2147',
    time: '21:47 GMT',
    title: 'Alarm Sounded & Missing Necklace Discovery',
    description: 'Generator restores full lighting. Lady Eleanor discovers Vitrine #04 empty. Emergency alarm raised.',
    location: 'Drawing Room',
    relatedSuspects: ['eleanor-blackwood', 'james-blackwood', 'martha-caldwell', 'daniel-sterling'],
    relatedEvidence: ['EVD-001', 'EVD-002', 'EVD-008']
  }
];
