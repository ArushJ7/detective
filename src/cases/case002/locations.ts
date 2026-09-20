import type { EstateLocation } from '../../state/types';

export const CASE_002_LOCATIONS: EstateLocation[] = [
  {
    id: 'cole-study',
    name: "Professor Cole's Study",
    subtitle: 'East Wing · Primary Incident Scene',
    description: 'Victorian Scottish manor study with heavy oak mortise door, fireplace hearth, desk, lectern, grandfather clock, and sash windows.',
    coordinates: { x: 450, y: 320 },
    evidenceIds: [
      'EVD-201',
      'EVD-202',
      'EVD-203',
      'EVD-204',
      'EVD-205',
      'EVD-206',
      'EVD-207',
      'EVD-208',
      'EVD-209',
      'EVD-210',
      'EVD-211',
      'EVD-213'
    ],
    suspectIds: ['dr-evelyn-reed', 'arthur-vance'],
    timelineEventIds: ['evt-2030', 'evt-2103', 'evt-2110', 'evt-2125', 'evt-2142', 'evt-2150'],
    status: 'ACTIVE HOTSPOT'
  },
  {
    id: 'west-terrace',
    name: 'West Stone Terrace',
    subtitle: 'Highland Estate Exterior',
    description: 'Rain-soaked granite flagstone terrace overlooking the East Wing study window.',
    coordinates: { x: 220, y: 380 },
    evidenceIds: ['EVD-212'],
    suspectIds: ['julian-sterling'],
    timelineEventIds: ['evt-2142', 'evt-2145'],
    status: 'SEARCHED'
  },
  {
    id: 'drawing-room',
    name: 'Main Drawing Room',
    subtitle: 'Highland Estate Central Wing',
    description: 'Opulent Victorian parlor where Lady Margaret and Dr. Evelyn Reed played chess.',
    coordinates: { x: 680, y: 250 },
    evidenceIds: ['EVD-214'],
    suspectIds: ['dr-evelyn-reed', 'lady-margaret-cole'],
    timelineEventIds: ['evt-2045', 'evt-2115', 'evt-2142'],
    status: 'SECURED'
  },
  {
    id: 'pantry-corridor',
    name: 'Butler Pantry & Main Corridor',
    subtitle: 'Ground Floor Servants Quarters',
    description: 'Hallway where Butler Arthur Vance heard the mortise deadbolt click at 21:03.',
    coordinates: { x: 320, y: 180 },
    evidenceIds: [],
    suspectIds: ['arthur-vance'],
    timelineEventIds: ['evt-2103', 'evt-2145', 'evt-2150'],
    status: 'SECURED'
  }
];
