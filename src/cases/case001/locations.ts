import type { EstateLocation } from '../../state/types';

export const CASE_001_LOCATIONS: EstateLocation[] = [
  {
    id: 'drawing-room',
    name: 'DRAWING ROOM',
    subtitle: 'Primary Crime Scene · Vitrine #04 Breach',
    description: 'The central reception room of Blackwood Hall where the Star of Blackwood Diamond was displayed in a custom Chubb brass vitrine.',
    coordinates: { x: 50, y: 42 },
    evidenceIds: ['EVD-001', 'EVD-002', 'EVD-004', 'EVD-007'],
    suspectIds: ['eleanor-blackwood', 'james-blackwood'],
    timelineEventIds: ['evt-2100', 'evt-2131', 'evt-2147'],
    status: 'ACTIVE HOTSPOT'
  },
  {
    id: 'dining-room',
    name: 'GRAND DINING ROOM',
    subtitle: 'Solstice Banquet Location',
    description: 'Banquet hall where Lord Blackwood hosted dinner for 4 guests prior to the 21:24 electrical blackout.',
    coordinates: { x: 30, y: 30 },
    evidenceIds: ['EVD-003'],
    suspectIds: ['eleanor-blackwood', 'james-blackwood', 'daniel-sterling', 'martha-caldwell'],
    timelineEventIds: ['evt-2000'],
    status: 'SEARCHED'
  },
  {
    id: 'study-library',
    name: 'STUDY & LIBRARY',
    subtitle: 'Estate Archives & Wastebasket',
    description: 'Lord Blackwood\'s private sanctuary. Contains estate ledger files, wastepaper basket, and secret bureau vault compartment.',
    coordinates: { x: 75, y: 35 },
    evidenceIds: ['EVD-003', 'EVD-012'],
    suspectIds: ['martha-caldwell', 'james-blackwood'],
    timelineEventIds: ['evt-2000'],
    status: 'SECURED'
  },
  {
    id: 'terrace-balcony',
    name: 'TERRACE BALCONY',
    subtitle: 'Exterior Cigarette Balustrade',
    description: 'Elevated stone balcony overlooking the west gardens. Fresh Turkish tobacco ash and dropped cigarette case found here.',
    coordinates: { x: 20, y: 55 },
    evidenceIds: ['EVD-008', 'EVD-007'],
    suspectIds: ['james-blackwood', 'daniel-sterling'],
    timelineEventIds: ['evt-2115', 'evt-2142'],
    status: 'SEARCHED'
  },
  {
    id: 'basement-breaker',
    name: 'BASEMENT & BREAKER ROOM',
    subtitle: 'Electrical Sabotage Site',
    description: 'Subterranean utility chamber housing main circuit breaker panel, emergency generator delay relays, and damp coal dust floor.',
    coordinates: { x: 45, y: 80 },
    evidenceIds: ['EVD-005', 'EVD-006', 'EVD-009'],
    suspectIds: ['james-blackwood'],
    timelineEventIds: ['evt-2124', 'evt-2138'],
    status: 'ACTIVE HOTSPOT'
  },
  {
    id: 'east-archive',
    name: 'EAST ANNEX ARCHIVE',
    subtitle: 'Manuscript Storage & Curator Desk',
    description: 'Meticulously cataloged archive room where Martha Caldwell claims she spent the evening sorting 17th-century deeds.',
    coordinates: { x: 80, y: 70 },
    evidenceIds: ['EVD-010'],
    suspectIds: ['martha-caldwell'],
    timelineEventIds: ['evt-2100'],
    status: 'SEARCHED'
  },
  {
    id: 'scullery-pantry',
    name: 'PANTRY & SCULLERY',
    subtitle: 'Staff Access & Key Hooks',
    description: 'Service area connecting kitchen to wine cellar stairwell. Master pantry hook holds wine cellar keys.',
    coordinates: { x: 30, y: 70 },
    evidenceIds: ['EVD-006'],
    suspectIds: ['james-blackwood'],
    timelineEventIds: ['evt-2138'],
    status: 'SECURED'
  }
];
