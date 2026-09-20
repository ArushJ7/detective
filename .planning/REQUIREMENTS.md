# Digital Detective — Requirements

## v1 Requirements

### GAME-001 — Application Shell & Design System
- [ ] **GAME-001a**: Design tokens (colors, typography, spacing) from DESIGN.md implemented as CSS custom properties
- [ ] **GAME-001b**: EB Garamond + Courier Prime fonts loaded from Google Fonts
- [ ] **GAME-001c**: Application shell with persistent navigation header and HUD footer
- [ ] **GAME-001d**: React Router navigation between all game screens
- [ ] **GAME-001e**: Global investigation state context (Context + useReducer)
- [ ] **GAME-001f**: Keyboard shortcut system (E, TAB, N, SPACE, D, ESC)

### GAME-002 — Case Introduction Screen
- [ ] **GAME-002a**: Full-bleed atmospheric Victorian scene background with vignette
- [ ] **GAME-002b**: Cinematic case title "THE MISSING NECKLACE" with metadata
- [ ] **GAME-002c**: Timeline indicators (VITRINE SECURED 21:00 / POWER FAULT 22:30 / THEFT DISCOVERED 22:47)
- [ ] **GAME-002d**: "ENTER THE ESTATE" CTA navigates to Investigation Scene
- [ ] **GAME-002e**: "READ CASE BRIEF" modal overlay with official police report
- [ ] **GAME-002f**: Archive docket header and restricted stamp

### GAME-003 — Investigation Scene (Drawing Room)
- [ ] **GAME-003a**: Full-viewport atmospheric scene with background image and overlay layers
- [ ] **GAME-003b**: Interactive hotspots for all 5 clue locations (vitrine, window, carpet, clock, flute)
- [ ] **GAME-003c**: Forensic examination panel (slide-out drawer) with clue details
- [ ] **GAME-003d**: UV residue toggle feature per clue
- [ ] **GAME-003e**: "Pin to Evidence Board" action adds clue to game state
- [ ] **GAME-003f**: Field directive banner with current objective
- [ ] **GAME-003g**: Toast notifications for game actions
- [ ] **GAME-003h**: Hotspot toggle ([SPACE] reveal/hide clue reticles)

### GAME-004 — Evidence Inspection Detail
- [ ] **GAME-004a**: Dedicated full-page evidence inspection view
- [ ] **GAME-004b**: High-res forensic loupe / macro photograph display
- [ ] **GAME-004c**: Forensic observation notes section
- [ ] **GAME-004d**: Detective deduction log (italic quote)
- [ ] **GAME-004e**: Linked hypothesis display
- [ ] **GAME-004f**: "Add to Evidence Board" action

### GAME-005 — Evidence Board
- [ ] **GAME-005a**: Full-viewport cork/incident board with dot-grid texture
- [ ] **GAME-005b**: Draggable evidence cards (photo plates, telegram slips, suspect mugshots, data strips)
- [ ] **GAME-005c**: SVG thread connections between cards (crimson yarn + brass yarn)
- [ ] **GAME-005d**: Cards show only discovered evidence from game state
- [ ] **GAME-005e**: Working Hypothesis dock (crime sequence reconstruction)
- [ ] **GAME-005f**: "Final Accusation" button navigates to Final Deduction screen

### GAME-006 — Evidence Vault
- [ ] **GAME-006a**: Archival grid of all collected evidence items
- [ ] **GAME-006b**: Filter by evidence type (physical, documentary, testimonial, forensic)
- [ ] **GAME-006c**: Evidence items populated from game state (only discovered items visible)
- [ ] **GAME-006d**: Click-through to Evidence Inspection detail
- [ ] **GAME-006e**: Evidence import progress indicator (X / 12 discovered)

### GAME-007 — Suspect Dossier
- [ ] **GAME-007a**: Left panel suspect roster (all 4 suspects)
- [ ] **GAME-007b**: Main dossier panel with sepia photograph plate, personal data, background summary
- [ ] **GAME-007c**: Dossier tabs: Profile, Statements, Alibi Reconstruction, Known Connections, Related Evidence
- [ ] **GAME-007d**: Recorded testimony section with alibi discrepancy flag
- [ ] **GAME-007e**: Linked evidence chips (navigates to Evidence Inspection)
- [ ] **GAME-007f**: "BEGIN INTERROGATION" CTA

### GAME-008 — Suspect Interrogation
- [ ] **GAME-008a**: Scripted question list UI (player selects from available questions)
- [ ] **GAME-008b**: Suspect response display in typewriter style
- [ ] **GAME-008c**: Evidence-gated questions (some questions unlock only after discovering relevant evidence)
- [ ] **GAME-008d**: Interrogation log / transcript panel
- [ ] **GAME-008e**: Contradiction flag display (when alibi broken)

### GAME-009 — Final Deduction
- [ ] **GAME-009a**: WHO selector (choose from 4 suspects)
- [ ] **GAME-009b**: HOW selector (choose from predefined methods)
- [ ] **GAME-009c**: WHY selector (choose from predefined motives)
- [ ] **GAME-009d**: Supporting evidence selector (from discovered evidence)
- [ ] **GAME-009e**: Submit deduction action

### GAME-010 — Case Resolution
- [ ] **GAME-010a**: Validate submitted deduction against hardcoded case truth
- [ ] **GAME-010b**: Correct deduction: cinematic "CASE CLOSED" reveal with full truth exposition
- [ ] **GAME-010c**: Incorrect deduction: "INSUFFICIENT EVIDENCE" with hints
- [ ] **GAME-010d**: Case summary showing all evidence, timeline, method

## v2 (Deferred)

- Event Chronology timeline reconstruction
- Detective Notebook with player freeform notes
- Case Map of Blackwood Estate locations
- Ambient audio system (rain, clock, tension music)
- Animated evidence discovery sequences
- Case #002

## Out of Scope

- Backend/database persistence — session only; games don't need accounts to ship v1
- Multiple simultaneous cases — Case #001 must be perfect before scaling
- AI-generated dialogue — defeats the purpose of a fixed mystery
- Multiplayer — out of scope entirely
- Mobile-native apps — responsive web only

## Traceability

| Phase | Requirements |
|-------|-------------|
| Phase 1 | GAME-001 |
| Phase 2 | GAME-002, GAME-003 |
| Phase 3 | GAME-004, GAME-006 |
| Phase 4 | GAME-005 |
| Phase 5 | GAME-007, GAME-008 |
| Phase 6 | GAME-009, GAME-010 |
| Phase 7 | Polish, responsive, keyboard shortcuts |

---
*Generated: 2026-09-20 — Digital Detective v1*
