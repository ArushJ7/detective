import type { EstateLocation } from '../../state/types';

export const CASE_003_LOCATIONS: EstateLocation[] = [
  {
    id: 'ravenwood-main-hall',
    name: 'Ravenwood Gallery — Main Exhibition Hall',
    subtitle: 'Mayfair, London · Primary Incident Scene',
    description: 'Victorian fine art gallery hall featuring Alcove III, damask silk wall, gilt frames, parquet floor, emergency alarm gong, and access to restoration corridor.',
    coordinates: { x: 500, y: 350 },
    evidenceIds: [
      'EVD-301',
      'EVD-303',
      'EVD-304',
      'EVD-313'
    ],
    suspectIds: ['julian-vance', 'arthur-pendelton'],
    timelineEventIds: ['evt-3100', 'evt-3014', 'evt-3015', 'evt-3020', 'evt-3032'],
    status: 'ACTIVE HOTSPOT'
  },
  {
    id: 'sub-basement-electrical',
    name: 'Sub-Basement Electrical Room',
    subtitle: 'Service Cellar · Power Origin',
    description: 'Industrial cellar holding the gas-engine electric dynamo, 200-amp DC knife switch panel, gas pipes, and graphite grease supply.',
    coordinates: { x: 250, y: 550 },
    evidenceIds: ['EVD-302', 'EVD-314'],
    suspectIds: ['julian-vance', 'arthur-pendelton'],
    timelineEventIds: ['evt-3017', 'evt-3018', 'evt-3030'],
    status: 'ACTIVE HOTSPOT'
  },
  {
    id: 'restoration-workshop',
    name: 'Restoration Room & Storage Alcove',
    subtitle: 'Curator Sanctum & Wall Cavity',
    description: 'Soundproofed workshop featuring padded oak door, chemical solvents, coat rack, and recessed wall cavity holding hollow brass storage cylinders.',
    coordinates: { x: 750, y: 280 },
    evidenceIds: [
      'EVD-305',
      'EVD-306',
      'EVD-307'
    ],
    suspectIds: ['julian-vance'],
    timelineEventIds: ['evt-3024', 'evt-3026', 'evt-3028'],
    status: 'ACTIVE HOTSPOT'
  },
  {
    id: 'curators-office',
    name: 'Curator\'s Office & Wall Safe',
    subtitle: 'Administration Room',
    description: 'Mahogany office with desk drawer, bequest safe, floorplan blueprints, and financial ledger files.',
    coordinates: { x: 380, y: 200 },
    evidenceIds: [
      'EVD-308',
      'EVD-310',
      'EVD-314'
    ],
    suspectIds: ['lady-beatrice-ravenscroft', 'julian-vance'],
    timelineEventIds: ['evt-3015', 'evt-3022'],
    status: 'SEARCHED'
  },
  {
    id: 'loading-bay-corridor',
    name: 'Rear Loading Bay Corridor',
    subtitle: 'Service Exit Passage',
    description: 'Wet corridor connecting restoration workshops to the rear alley exterior exit doors.',
    coordinates: { x: 820, y: 480 },
    evidenceIds: ['EVD-309'],
    suspectIds: ['lady-beatrice-ravenscroft'],
    timelineEventIds: ['evt-3022'],
    status: 'SEARCHED'
  },
  {
    id: 'private-collection-corridor',
    name: 'Private Vault Corridor & East Terrace',
    subtitle: 'Mayfair Gallery Perimeter',
    description: 'Narrow corridor leading to Private Collection vault and stone bench on East Courtyard Terrace.',
    coordinates: { x: 180, y: 320 },
    evidenceIds: ['EVD-311', 'EVD-312'],
    suspectIds: ['marcus-sterling'],
    timelineEventIds: ['evt-3022'],
    status: 'SEARCHED'
  }
];
