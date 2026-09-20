# Digital Detective

## What This Is

A premium, atmospheric narrative investigation game where the player solves fictional criminal cases through exploration, deduction, and interrogation. Not a dashboard. Not a CRUD app. A **game** — styled after mid-century forensic archives, literary noir, and physical evidence dockets.

The player inhabits Inspector R. Vance of Scotland Yard, poring over declassified case records under low-wattage desk lamps.

## Core Value

**The player should feel like they are investigating a real mystery.** Every UI element is a physical forensic artifact. Every interaction reveals the truth about what happened at Blackwood Estate on the night of 14 October.

## Product

**DIGITAL DETECTIVE** — Case #001: The Missing Necklace

### Visual Identity

Drawn from the Google Stitch design export in `/stitch_digital_detective_archive_workspace/`:

- **Typography:** EB Garamond (headlines) + Courier Prime (body/labels/HUD)
- **Palette:** Dark olive surfaces (#101411 base), antique brass accents (#e9c176 primary), dried burgundy evidence marks (#ffb3b5 secondary), weathered moss (#b7ccb2 tertiary)
- **Design language:** Razor-sharp corners (0 radius), archival textures, vignettes, film grain, physical artifacts — index cards, photograph plates, telegram slips, dossier folders
- **Elevation:** Desk surface → dossier folders → pinned evidence → inspection loupe
- **Anti-patterns:** No glassmorphism, no rounded cards, no purple gradients, no corporate SaaS aesthetic

### The Case: THE MISSING NECKLACE

**Setting:** Blackwood Estate, Drawing Room — 14 October, 22:47 BST

**Incident:** The 120-carat Queen of Solms diamond necklace disappears from a double-locked glass vitrine during the annual winter solstice banquet. The bridge is washed out. Telephone lines severed. The culprit is still inside.

**Suspects:**
1. James Blackwood — Nephew & Sole Heir (£14,200 in syndicate debt; alibi discrepancy of 18 minutes)
2. Martha Caldwell — Estate Archivist/Curator (vault access; signature "M.C." on intercepted telegram)
3. Daniel Sterling — Weekend Guest/Financier (outsider; unusually composed)
4. Eleanor Blackwood — Sister to Lord Blackwood; held Key B to the vitrine

**Established Truth (hardcoded — never random):**
- **Culprit:** James Blackwood
- **Method:** Used a secretly wax-cast duplicate key (from beeswax impressions taken months prior), cut in his London workshop; descended to cellar at 21:20, manually tripped the fuse box at 21:24 (blacking out the manor for 11 minutes), opened the vitrine during darkness, concealed the necklace in his boot, staged the window to implicate an exterior intruder
- **Motive:** Gambling debts of £14,200 to East End syndicates; creditor ultimatum due midnight 24 October
- **Key Evidence:** Wax-cast duplicate key hidden in conservatory fern soil; size 10 muddy welt footprints on carpet leading to conservatory; stopped ormolu clock at 21:24; champagne flute with chloral hydrate; intercepted telegram; power voltage log showing fuse trip at 21:24; tweed fiber on window latch (staging evidence, not real entry)
- **Contradiction:** James claims he was in the wine cellar 21:20–21:45, but Butler Hastings testifies he descended at 21:38 — leaving 18 unaccounted minutes

## Target Audience

Mystery/detective game fans; players who enjoy Clue/Cluedo, Heaven's Vault, Return of the Obra Dinn, Her Story, Sherlock Holmes games.

## Stack

- **Framework:** Vite + React 18 + TypeScript
- **Styling:** Vanilla CSS (CSS custom properties from design tokens) — NO Tailwind in the actual app
- **State:** React Context + useReducer for investigation state
- **Routing:** React Router v6
- **Images:** AI-generated assets (via `generate_image` tool) matching Stitch design references
- **Build:** Vite dev server

## Requirements

### Validated

(None yet — build to validate)

### Active

- [ ] Case Introduction screen matching Stitch design
- [ ] Investigation Scene with interactive hotspots
- [ ] Evidence Inspection panel with UV toggle
- [ ] Evidence Board with draggable cards and thread connections
- [ ] Evidence Vault with filterable archive
- [ ] Suspect Dossier for all 4 suspects
- [ ] Suspect Interrogation with scripted dialogue tree
- [ ] Shared investigation state (evidence discovery, board connections, interrogation progress)
- [ ] Final Deduction submission and validation
- [ ] Case Resolution reveal (correct vs. incorrect)
- [ ] Navigation between all screens
- [ ] Design system matching DESIGN.md tokens exactly
- [ ] Keyboard shortcuts (E, TAB, N, SPACE, D, ESC)
- [ ] Responsive layout (mobile: card-stack; desktop: full layout)

### Out of Scope (Phase 1)

- Event Chronology (Phase 6)
- Detective Notebook (Phase 6)
- Case Map (Phase 6)
- Multiple cases (future)
- Multiplayer (never)
- AI-generated dialogue (never — all dialogue hardcoded)
- Backend/persistence beyond sessionStorage

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Vite + React + TypeScript | Modern DX, fast HMR, type safety for complex game state | — Pending |
| Vanilla CSS with CSS custom properties | Matches Stitch design token approach; no Tailwind conflicts | — Pending |
| Hardcoded case truth | Game requires deterministic solution; prevents AI invention | — Committed |
| React Context + useReducer for state | Game state is complex enough for context but doesn't need Redux overhead | — Pending |
| No Tailwind in app | Stitch uses Tailwind in isolation; app CSS must be bespoke and maintainable | — Committed |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition:**
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active

---
*Last updated: 2026-09-20 after initialization*
