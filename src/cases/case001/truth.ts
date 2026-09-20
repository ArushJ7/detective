import type { CaseTruth } from '../../state/types';
import type { CaseDeductionOptions } from '../types';

export const CASE_001_TRUTH: CaseTruth = {
  culpritId: 'james-blackwood',
  methodId: 'wax-duplicate-fuse-trip',
  motiveId: 'gambling-debts-14200',
  explanation: `James Blackwood orchestrated the theft of Lady Blackwood's £1.2M Diamond Necklace to satisfy a mounting £14,200 debt owed to Syndicate bookmakers.

At 21:20, he surreptitiously tripped the main breaker fuse in the basement, plunging the mansion into darkness for 4 minutes. Using a wax-cast duplicate key crafted from Lord Blackwood's original ring set during his afternoon visit, he unlocked the glass vitrine without triggering the electronic alarm contacts.

His alibi—that he was smoking on the terrace continuously—was disproven by the UV forensic dust matching his shoe soles found inside the vitrine cabinet and near the fuse breaker panel.`
};

export const CASE_001_DEDUCTION_OPTIONS: CaseDeductionOptions = {
  culprits: [
    { id: 'james-blackwood', label: 'James Blackwood (Eldest Son / Heir)' },
    { id: 'martha-caldwell', label: 'Martha Caldwell (Estate Curator)' },
    { id: 'daniel-sterling', label: 'Daniel Sterling (Mayfair Financier)' },
    { id: 'eleanor-blackwood', label: 'Lady Eleanor Blackwood (Owner)' }
  ],
  methods: [
    { id: 'wax-duplicate-fuse-trip', label: 'Wax-cast duplicate key + manual fuse trip at 21:24' },
    { id: 'glass-cutter-alarm-bypass', label: 'Glass cutter diamond knife + internal alarm bypass' },
    { id: 'coerced-housekeeper-key', label: 'Coerced housekeeper into giving up master vitrine key' },
    { id: 'staged-break-in-terrace', label: 'Staged break-in from terrace window during blackout' }
  ],
  motives: [
    { id: 'gambling-debts-14200', label: '£14,200 mounting gambling debts to London Syndicate' },
    { id: 'disinheritance-fear', label: 'Fear of disinheritance in favor of charitable foundation' },
    { id: 'blackmail-settlement', label: 'Extortion blackmail payment required by midnight' },
    { id: 'insurance-fraud-split', label: 'Secret agreement to collect insurance payout' }
  ]
};
