import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { InvestigationProvider } from './state/InvestigationContext';
import { GameHeader } from './components/game/GameHeader';
import { GameFooter } from './components/game/GameFooter';

import { CaseIntroductionPage } from './pages/CaseIntroduction/CaseIntroductionPage';
import { InvestigationScenePage } from './pages/InvestigationScene/InvestigationScenePage';
import { EvidenceInspectionPage } from './pages/EvidenceInspection/EvidenceInspectionPage';
import { EvidenceBoardPage } from './pages/EvidenceBoard/EvidenceBoardPage';
import { EvidenceVaultPage } from './pages/EvidenceVault/EvidenceVaultPage';
import { SuspectDossierPage } from './pages/SuspectDossier/SuspectDossierPage';
import { SuspectInterrogationPage } from './pages/SuspectInterrogation/SuspectInterrogationPage';
import { FinalDeductionPage } from './pages/FinalDeduction/FinalDeductionPage';
import { CaseResolutionPage } from './pages/CaseResolution/CaseResolutionPage';

import './styles/globals.css';

export const App: React.FC = () => {
  return (
    <InvestigationProvider>
      <BrowserRouter>
        <div className="game-app-shell">
          <div className="vignette-overlay" />
          <div className="scanline-overlay" />
          
          <GameHeader />

          <main className="game-content-viewport">
            <Routes>
              <Route path="/" element={<Navigate to="/intro" replace />} />
              <Route path="/intro" element={<CaseIntroductionPage />} />
              <Route path="/scene" element={<InvestigationScenePage />} />
              <Route path="/inspection" element={<EvidenceInspectionPage />} />
              <Route path="/evidence-board" element={<EvidenceBoardPage />} />
              <Route path="/vault" element={<EvidenceVaultPage />} />
              <Route path="/suspects" element={<SuspectDossierPage />} />
              <Route path="/interrogation" element={<SuspectInterrogationPage />} />
              <Route path="/deduction" element={<FinalDeductionPage />} />
              <Route path="/resolution" element={<CaseResolutionPage />} />
              <Route path="*" element={<Navigate to="/intro" replace />} />
            </Routes>
          </main>

          <GameFooter />
        </div>
      </BrowserRouter>
    </InvestigationProvider>
  );
};

export default App;
