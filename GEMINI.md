# DIGITAL DETECTIVE — Project Guide

## Project Context

This is **Digital Detective** — a premium narrative investigation game. Not a dashboard, not an admin panel.

The Stitch design export in `/stitch_digital_detective_archive_workspace/` is the VISUAL SOURCE OF TRUTH.

## Stack

- **Vite + React 18 + TypeScript**
- **Vanilla CSS** with CSS custom properties (from `src/styles/tokens.css`)
- **React Router v6** for navigation
- **React Context + useReducer** for investigation state

## Design Rules

1. **NEVER** introduce Tailwind, Material UI, or generic SaaS components
2. **ALWAYS** use CSS custom properties from `--color-primary`, `--font-headline`, etc.
3. **NEVER** use `border-radius > 0` for evidence cards/dossiers (razor-sharp corners per DESIGN.md)
4. **ALWAYS** check `DESIGN.md` before choosing any color or typography
5. The game must feel **cinematic, archival, forensic** — not corporate

## Case Truth (NEVER CHANGE)

- **Culprit:** James Blackwood
- **Method:** Wax-cast duplicate key + manual fuse trip at 21:24
- **Motive:** £14,200 gambling debts

## File Structure

```
src/
  components/
    game/         # HUD, navigation, notifications
    evidence/     # Evidence cards, vault items, inspection panel
    suspects/     # Dossier, roster, interrogation
    ui/           # Shared UI primitives
  pages/
    CaseIntroduction/
    InvestigationScene/
    EvidenceInspection/
    EvidenceBoard/
    EvidenceVault/
    SuspectDossier/
    SuspectInterrogation/
    FinalDeduction/
    CaseResolution/
  data/
    case001/      # Case metadata, truth object
    evidence/     # All 12 evidence items
    suspects/     # All 4 suspects
    timeline/     # Event timeline
  state/
    InvestigationContext.tsx
    investigationReducer.ts
    types.ts
  styles/
    tokens.css    # All CSS custom properties from DESIGN.md
    globals.css   # Reset + base styles
```

## GSD Workflow

- Planning docs: `.planning/`
- Run phases with: `/gsd-plan-phase N` then `/gsd-execute-phase N`
- Current phase: **Phase 1**
- Roadmap: `.planning/ROADMAP.md`
