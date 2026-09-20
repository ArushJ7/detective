import React, { useState } from 'react';
import { useInvestigation } from '../../state/InvestigationContext';
import { Lock, Unlock, Key, ShieldCheck, AlertCircle } from 'lucide-react';
import './EvidenceVaultPage.css';

export const EvidenceVaultPage: React.FC = () => {
  const { state, dispatch, vaultEvidence } = useInvestigation();
  const [passcode, setPasscode] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [selectedVaultItem, setSelectedVaultItem] = useState<string>('EVD-011');

  const activeItem = vaultEvidence.find(e => e.id === selectedVaultItem) || vaultEvidence[0];
  const isUnlocked = state.unlockedVaultItemIds.includes(activeItem.id);

  const handleUnlockAttempt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeItem.vaultCodeRequired) return;

    if (passcode.trim() === activeItem.vaultCodeRequired) {
      dispatch({ type: 'UNLOCK_VAULT_ITEM', payload: activeItem.id });
      setErrorMsg('');
      setPasscode('');
    } else {
      setErrorMsg('ACCESS DENIED // INVALID ENCRYPTION PASSCODE');
    }
  };

  return (
    <div className="vault-container animate-fade-in">
      <div className="vault-header">
        <div className="vault-title-group">
          <h2 className="vault-title"><Lock size={20} /> HIGH-SECURITY EVIDENCE VAULT</h2>
          <span className="vault-subtitle font-mono">FORENSIC SECURITY ARCHIVE — PASSCODE PROTECTION REQUIRED</span>
        </div>

        <div className="vault-status font-mono">
          UNLOCKED ITEMS: <strong>{state.unlockedVaultItemIds.length} / {vaultEvidence.length}</strong>
        </div>
      </div>

      <div className="vault-layout">
        {/* Vault Item Selection */}
        <aside className="vault-roster">
          <div className="roster-header font-mono">CLASSIFIED VAULT CONTAINERS</div>
          <div className="roster-list">
            {vaultEvidence.map(item => {
              const unlocked = state.unlockedVaultItemIds.includes(item.id);
              return (
                <div
                  key={item.id}
                  className={`vault-roster-item ${activeItem.id === item.id ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedVaultItem(item.id);
                    setErrorMsg('');
                    setPasscode('');
                  }}
                >
                  <div className="roster-item-icon">
                    {unlocked ? <Unlock size={16} className="text-green" /> : <Lock size={16} className="text-red" />}
                  </div>
                  <div className="roster-item-info">
                    <span className="font-mono item-id">{item.id}</span>
                    <span className="item-name">{item.title}</span>
                  </div>
                  <span className={`status-badge font-mono ${unlocked ? 'unlocked' : 'locked'}`}>
                    {unlocked ? 'UNLOCKED' : 'LOCKED'}
                  </span>
                </div>
              );
            })}
          </div>
        </aside>

        {/* Vault Keypad & Inspection Area */}
        <main className="vault-main-panel">
          <div className="vault-card">
            <div className="vault-card-header">
              <span className="label-stamp label-stamp-red font-mono">CONFIDENTIAL // SECURITY LEVEL 4</span>
              <h1 className="vault-item-title">{activeItem.title}</h1>
              <span className="font-mono vault-item-sub">{activeItem.subtitle}</span>
            </div>

            {isUnlocked ? (
              <div className="unlocked-view animate-fade-in">
                <div className="unlocked-banner">
                  <ShieldCheck size={24} />
                  <span className="font-mono">ENCRYPTION BYPASSED — EVIDENCE DECRYPTED & DISCOVERED</span>
                </div>

                <div className="unlocked-details">
                  <h3 className="font-headline">EVIDENCE BREAKDOWN</h3>
                  <p>{activeItem.description}</p>
                  <p className="font-mono detail-notes">{activeItem.detailedNotes}</p>
                </div>
              </div>
            ) : (
              <div className="keypad-lock-view">
                <div className="keypad-header">
                  <Lock size={32} className="lock-icon" />
                  <h3 className="font-headline">SECURITY LOCK MECHANISM</h3>
                  <p className="font-mono lock-hint">HINT: Case clues reveal vault passcode numbers.</p>
                </div>

                <form className="keypad-form" onSubmit={handleUnlockAttempt}>
                  <div className="passcode-input-wrapper">
                    <input
                      type="password"
                      maxLength={6}
                      placeholder="ENTER PASSCODE"
                      value={passcode}
                      onChange={e => setPasscode(e.target.value)}
                      className="font-mono passcode-input"
                    />
                    <button type="submit" className="btn-unlock font-mono">
                      <Key size={16} /> UNLOCK
                    </button>
                  </div>

                  {errorMsg && (
                    <div className="error-banner font-mono animate-flicker">
                      <AlertCircle size={14} /> {errorMsg}
                    </div>
                  )}
                </form>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};
