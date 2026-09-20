import type { CaseTruth } from '../../state/types';
import type { CaseDeductionOptions } from '../types';

export const CASE_002_TRUTH: CaseTruth = {
  culpritId: 'dr-evelyn-reed',
  methodId: 'method-stamp-decoy',
  motiveId: 'motive-patent-theft',
  explanation:
    'Dr. Evelyn Reed plagiarized Professor Cole\'s alkaloid synthesis patent and secretly sold the rights to Apex Chemical Syndicate for £10,000. When Cole discovered the theft at 18:00 and threatened to notify the Royal Society at midnight, Reed acted. At 20:30, while alone in Cole\'s study under the pretense of returning a monograph, she coated the handle of his brass wax seal stamp with a fictional transdermal neurotoxin (EVD-204) and set up a calibrated tallow candle decoy (EVD-209) holding a 3.2 lb bronze sphinx paperweight (EVD-208).\n\nAt 21:03, Professor Cole locked himself inside his study to write his letter of exposure. Handling the stamp at 21:10 caused transdermal poisoning, leading to respiratory failure and collapse between 21:20 and 21:30 (~21:25). At 21:42, the candle burned through the catgut string, dropping the paperweight onto the hearth fender with a thud. This trick-created false timestamp established an airtight alibi for Dr. Reed, who was playing chess in the Drawing Room from 21:15 to 21:50.'
};

export const CASE_002_DEDUCTION_OPTIONS: CaseDeductionOptions = {
  culprits: [
    { id: 'dr-evelyn-reed', label: 'Dr. Evelyn Reed — Senior Research Associate & Former Protégé' },
    { id: 'julian-sterling', label: 'Julian Sterling — Disinherited Nephew & Heir' },
    { id: 'lady-margaret-cole', label: 'Lady Margaret Cole — Estranged Wife' },
    { id: 'arthur-vance', label: 'Arthur Vance — Head Butler' }
  ],
  methods: [
    {
      id: 'method-stamp-decoy',
      label: 'Contaminated wax seal stamp (EVD-204) causing delayed transdermal poisoning + candle-string sound decoy (EVD-209/208) establishing false 21:42 timestamp'
    },
    {
      id: 'method-terrace-breakin',
      label: 'Forced window entry from west terrace outside at 21:42 followed by direct physical attack'
    },
    {
      id: 'method-chloroform-keyhole',
      label: 'Chloroform gas sprayed through interior keyhole followed by forced entry'
    },
    {
      id: 'method-clock-tampering',
      label: 'Altered grandfather clock pendulum mechanism to fake the time of demise'
    }
  ],
  motives: [
    {
      id: 'motive-patent-theft',
      label: 'Prevention of exposure for £10,000 synthetic alkaloid patent theft and London Syndicate contract (EVD-203 / EVD-214)'
    },
    {
      id: 'motive-gambling-debts',
      label: 'Immediate inheritance to settle £4,000 London bookmaker gambling debts'
    },
    {
      id: 'motive-estate-sale',
      label: 'Liquidating Highland Manor to finance return to London society'
    }
  ]
};
