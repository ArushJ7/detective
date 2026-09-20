import type { CaseTruth } from '../../state/types';
import type { CaseDeductionOptions } from '../types';

export const CASE_003_TRUTH: CaseTruth = {
  culpritId: 'julian-vance',
  methodId: 'method-blackout-velvet-cylinder',
  motiveId: 'motive-blackwood-debts',
  explanation:
    'Senior Curator Julian Vance accumulated £12,000 in illicit gambling debts to the Blackwood Syndicate, with a fatal deadline set for midnight on April 14th (EVD-308). To settle his debt, Vance agreed to steal "The Astronomical Quadrant of Tycho Brahe" for an overseas buyer offering £15,000.\n\nAt 21:15 GMT, Vance pre-loosened the rear turn-screws of frame EVD-301 and unhooked the emergency gong pull-wire (EVD-303). At 21:17 GMT, he slipped down to the Sub-Basement Electrical Room and used graphite pliers to short the main DC dynamo switch (EVD-302), triggering a 12-minute blackout at 21:18 GMT. Wearing soft felt restoration slippers (EVD-304), Vance unmounted the canvas, inserted a dark velvet backing into the frame to hide the theft in ambient gas footlight glow, rolled the original canvas in oiled silk, and concealed it inside hollow brass storage cylinder EVD-306 in his private restoration alcove.\n\nAt 21:28 GMT, Vance locked himself inside the Restoration Room to fabricate an alibi. He claimed he heard the 21:24 GMT emergency gong chime twice from inside. However, acoustic door test EVD-305 proves the padded door is 100% soundproof, and gong wire inspection EVD-303 proves the gong was disengaged and never chimed at all.'
};

export const CASE_003_DEDUCTION_OPTIONS: CaseDeductionOptions = {
  culprits: [
    { id: 'julian-vance', label: 'Julian Vance — Senior Curator & Master Art Restorer' },
    { id: 'lady-beatrice-ravenscroft', label: 'Lady Beatrice Ravenscroft — Wealthy Patron & Benefactor\'s Widow' },
    { id: 'marcus-sterling', label: 'Marcus Sterling — Private Art Broker & Collector\'s Agent' },
    { id: 'arthur-pendelton', label: 'Arthur Pendelton — Head Security Guard' }
  ],
  methods: [
    {
      id: 'method-blackout-velvet-cylinder',
      label: 'Short-circuited sub-basement dynamo breaker (EVD-302) to disable arc lights & alarm circuit + unmounted pre-loosened canvas using felt slippers (EVD-304) + inserted black velvet blank into frame (EVD-301) + hid canvas in hollow brass cylinder (EVD-306)'
    },
    {
      id: 'method-loading-bay-escape',
      label: 'Excised canvas during blackout and fled through rear Loading Bay exit doors (EVD-309)'
    },
    {
      id: 'method-private-vault-breach',
      label: 'Used wire lockpicks (EVD-311) to breach Private Collection vault and slip canvas out terrace window'
    },
    {
      id: 'method-accidental-power-overload',
      label: 'Exploited accidental thermal power blowout to stash canvas in Curator\'s Office wall safe'
    }
  ],
  motives: [
    {
      id: 'motive-blackwood-debts',
      label: 'Desperate £12,000 gambling debt owed to Blackwood Syndicate due at midnight (EVD-308) + private overseas buyer purchase (£15,000)'
    },
    {
      id: 'motive-bequest-revertment',
      label: 'Reclaiming family masterpiece due to resentment over late husband\'s public gallery bequest (EVD-310)'
    },
    {
      id: 'motive-private-syndicate-resale',
      label: 'Acquiring uncataloged masterworks for private black-market art syndicate resale'
    }
  ]
};
