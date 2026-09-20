import React from 'react';
import { useInvestigation } from '../../state/InvestigationContext';
import { Clock, Info, ShieldAlert, Sparkles } from 'lucide-react';
import './GameFooter.css';

export const GameFooter: React.FC = () => {
  const { state } = useInvestigation();

  return (
    <footer className="game-footer">
      <div className="footer-left">
        <div className="footer-item font-mono">
          <Clock size={14} className="footer-icon" />
          <span>CRIME DISCOVERED: <strong>21:24 GMT</strong></span>
        </div>
        <div className="footer-divider"></div>
        <div className="footer-item font-mono">
          <ShieldAlert size={14} className="footer-icon text-amber" />
          <span>LOCATION: <strong>BLACKWOOD MANOR — WEST WING</strong></span>
        </div>
      </div>

      <div className="footer-center">
        {state.uvModeActive ? (
          <div className="hint-ticker uv-ticker font-mono">
            <Sparkles size={14} />
            <span>UV TORCH ACTIVE — Inspect vitrines, paraffin residue & footprints for fluorescent traces.</span>
          </div>
        ) : (
          <div className="hint-ticker font-mono">
            <Info size={14} />
            <span>INVESTIGATION TIP: Connect clue pairs on the Evidence Board to form deductive leads.</span>
          </div>
        )}
      </div>

      <div className="footer-right font-mono">
        <span className="confidential-stamp">TOP SECRET // LE-0098</span>
      </div>
    </footer>
  );
};
