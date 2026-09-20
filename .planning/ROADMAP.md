# Digital Detective — Roadmap

## Overview

8-phase roadmap for Case #001: The Missing Necklace. Each phase is independently testable with a running application.

---

### Phase 1: Foundation & Design System
**Goal:** Establish the Vite+React project, implement all design tokens from DESIGN.md as CSS custom properties, scaffold the application shell (header nav + footer HUD), and set up routing and global investigation state. The app should run with a loading screen that captures the full noir aesthetic.

**Mode:** mvp

**Requirements:** GAME-001a, GAME-001b, GAME-001c, GAME-001d, GAME-001e, GAME-001f

**Success Criteria:**
1. `npm run dev` launches a dark, atmospheric application with correct fonts and colors
2. Navigation header shows "[1] THE SCENE ... [7] FINAL DEDUCTION" tabs in Courier Prime
3. HUD footer shows keyboard shortcut hints
4. CSS variables match DESIGN.md color tokens exactly
5. Investigation state context initializes with no discovered evidence

---

### Phase 2: Case Introduction + Investigation Scene
**Goal:** Implement the cinematic Case Introduction screen and the full Investigation Scene with interactive hotspots. These are the two most important screens in the game.

**Mode:** mvp

**Requirements:** GAME-002a–f, GAME-003a–h

**Success Criteria:**
1. Case Introduction screen visually matches `case_introduction_the_missing_necklace/screen.png` within 90%
2. "ENTER THE ESTATE" button navigates to Investigation Scene
3. Case Brief modal opens/closes correctly
4. All 5 hotspots are clickable and open the forensic examination panel
5. UV toggle works on vitrine hotspot
6. "PIN TO EVIDENCE BOARD" adds evidence to game state
7. Toast notifications appear for all game actions
8. [SPACE] toggles hotspot visibility

---

### Phase 3: Evidence Inspection + Evidence Vault
**Goal:** Build the Evidence Inspection detail view and Evidence Vault archive. Evidence state drives both screens — only discovered evidence appears.

**Mode:** mvp

**Requirements:** GAME-004a–f, GAME-006a–e

**Success Criteria:**
1. Clicking evidence opens full Evidence Inspection detail page
2. UV toggle displays correctly
3. Evidence Vault shows only discovered evidence items
4. Filter buttons (ALL / PHYSICAL / DOCUMENTARY / FORENSIC) work
5. Evidence count reflects game state accurately

---

### Phase 4: Evidence Board
**Goal:** Implement the cork incident board with draggable evidence cards, SVG thread connections, and the Working Hypothesis dock.

**Mode:** mvp

**Requirements:** GAME-005a–f

**Success Criteria:**
1. Board visually matches `evidence_board_the_web_of_clues/screen.png` within 90%
2. Evidence cards are draggable (mouse)
3. SVG threads render between cards
4. Only pinned evidence appears as cards
5. Working Hypothesis dock shows current deduction steps
6. "FINAL ACCUSATION" button navigates to Final Deduction

---

### Phase 5: Suspect Dossiers + Interrogation
**Goal:** All 4 suspect dossiers with full profile data, plus scripted interrogation system with evidence-gated questions.

**Mode:** mvp

**Requirements:** GAME-007a–f, GAME-008a–e

**Success Criteria:**
1. Dossier screen matches `suspect_dossier_james_blackwood/screen.png` within 90%
2. All 4 suspects selectable from roster panel
3. Dossier tabs (Profile, Statements, Alibi, Connections, Evidence) render correct content
4. Alibi Discrepancy block appears for James Blackwood
5. Interrogation screen shows scripted question list
6. Evidence-gated questions unlock after discovering relevant evidence
7. "BEGIN INTERROGATION" CTA works from Dossier

---

### Phase 6: Final Deduction + Case Resolution
**Goal:** Full deduction submission screen and case resolution reveal with validation against hardcoded truth.

**Mode:** mvp

**Requirements:** GAME-009a–e, GAME-010a–d

**Success Criteria:**
1. Player can select WHO / HOW / WHY and supporting evidence
2. Correct deduction (James / Duplicate Key / Debt) → "CASE CLOSED" cinematic reveal
3. Incorrect deduction → "INSUFFICIENT EVIDENCE" feedback with partial hints
4. Case summary displays full truth with evidence walkthrough

---

### Phase 7: Polish, Animations & Responsive
**Goal:** Micro-animations, film grain overlays, rain SVG animations, responsive mobile layout (card-stack mode), keyboard navigation.

**Mode:** mvp

**Requirements:** GAME-001f (keyboard shortcuts complete), all responsive behavior

**Success Criteria:**
1. All screens pass visual comparison against Stitch screen.png files
2. Keyboard shortcuts (E, TAB, N, SPACE, D, ESC) all function
3. Mobile layout (< 768px) uses card-stack mode
4. No console errors on any screen
5. Film grain + vignette overlays present on scene screens
6. Rain animation present on atmospheric screens

---

### Phase 8: Integration Testing & Final QA
**Goal:** Full end-to-end gameplay test. Verify state persistence across all screens. Fix any broken navigation, dead links, or state resets.

**Mode:** mvp

**Requirements:** All v1 requirements verified

**Success Criteria:**
1. Full investigation flow works: Intro → Scene → Inspect → Collect → Vault → Board → Dossier → Interrogation → Deduction → Resolution
2. Evidence state persists correctly through all navigation
3. No dead buttons or broken navigation
4. All 7 Stitch screens have implemented counterparts
5. Zero console errors in complete game run-through

---

## Milestone

**Milestone 1:** Digital Detective — Case #001 Complete (Phases 1–8)

---
*Created: 2026-09-20 — Digital Detective v1*
