import type { EstateLocation } from '../../state/types';

export const CANONICAL_LOCATIONS: EstateLocation[] = [
  {
    id: 'drawing-room',
    name: 'West Drawing Room',
    subtitle: 'Primary Crime Scene & Display Gallery',
    description: 'Opulent Victorian reception hall housing West Vitrine #04 where the Star of Blackwood diamond was stored. Features heavy mahogany mullions and arched French sash window leading to terrace.',
    coordinates: { x: 28, y: 38 },
    evidenceIds: ['EVD-001', 'EVD-002', 'EVD-007'],
    suspectIds: ['james-blackwood', 'eleanor-blackwood'],
    timelineEventIds: ['evt-2100', 'evt-2131', 'evt-2142', 'evt-2147'],
    status: 'ACTIVE HOTSPOT'
  },
  {
    id: 'dining-room',
    name: 'Grand Dining Room',
    subtitle: 'Estate Guest Banquet Hall',
    description: 'Formal dining hall with long oak banquet table where Lord Blackwood hosted evening dinner guests prior to the 21:24 power interruption.',
    coordinates: { x: 54, y: 32 },
    evidenceIds: ['EVD-002'],
    suspectIds: ['eleanor-blackwood', 'daniel-sterling', 'james-blackwood'],
    timelineEventIds: ['evt-2000', 'evt-2115'],
    status: 'SEARCHED'
  },
  {
    id: 'study-library',
    name: 'Study & Library Vault',
    subtitle: 'Lord Blackwood Private Office',
    description: 'Paneled library containing confidential legal records, grandfather clock secret vault, and wastebasket where financial documents were recovered.',
    coordinates: { x: 76, y: 52 },
    evidenceIds: ['EVD-003', 'EVD-011', 'EVD-012'],
    suspectIds: ['james-blackwood', 'eleanor-blackwood'],
    timelineEventIds: ['evt-2000'],
    status: 'SEARCHED'
  },
  {
    id: 'pantry-scullery',
    name: 'Pantry & Scullery',
    subtitle: 'Housekeeper Key & Service Hub',
    description: 'Butler and housekeeper service room housing the wall key safe, teaware cupboards, and staff shift rosters.',
    coordinates: { x: 42, y: 62 },
    evidenceIds: ['EVD-010'],
    suspectIds: ['martha-caldwell'],
    timelineEventIds: ['evt-2100'],
    status: 'SECURED'
  },
  {
    id: 'terrace-balcony',
    name: 'Terrace Balcony & Balustrade',
    subtitle: 'Exterior Flagstone Perimeter',
    description: 'Elevated stone balcony overlooking terrace garden. Damp soil and stone flagstones bear bespoke boot tread impressions and tobacco ash.',
    coordinates: { x: 18, y: 24 },
    evidenceIds: ['EVD-006', 'EVD-008'],
    suspectIds: ['james-blackwood', 'daniel-sterling'],
    timelineEventIds: ['evt-2115', 'evt-2142'],
    status: 'ACTIVE HOTSPOT'
  },
  {
    id: 'basement-breaker',
    name: 'Basement & Electrical Room',
    subtitle: 'Subterranean Utility & Generator Hub',
    description: 'Coal basement housing the estate mains voltage control panel and circuit breakers. Telemetry logs confirm a manual breaker trip at 21:24:02 GMT.',
    coordinates: { x: 36, y: 82 },
    evidenceIds: ['EVD-005', 'EVD-006', 'EVD-009'],
    suspectIds: ['james-blackwood'],
    timelineEventIds: ['evt-2124', 'evt-2138'],
    status: 'ACTIVE HOTSPOT'
  },
  {
    id: 'east-archive',
    name: 'East Wing Staff Archive Annex',
    subtitle: 'Estate Manuscript Repository',
    description: 'Quiet research annex where Martha Caldwell claimed to be sorting 17th-century estate manuscripts during the blackout.',
    coordinates: { x: 84, y: 24 },
    evidenceIds: ['EVD-003', 'EVD-010'],
    suspectIds: ['martha-caldwell'],
    timelineEventIds: ['evt-2100'],
    status: 'SEARCHED'
  }
];
