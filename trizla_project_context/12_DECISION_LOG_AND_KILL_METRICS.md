# Decision Log and Kill Metrics

## Current decision

Build a validation MVP for Trizla.

## Chosen wedge

Primary wedge:

> Local redaction before using AI tools.

First segment:

> Recruiters and talent sourcers.

## Why this wedge

- The before/after demo is obvious.
- Sensitive text is common.
- AI usage is already happening.
- Manual redaction is annoying.
- Product can be built by one founder.
- No backend needed.
- No enterprise sales required.
- First buyers can be reached directly.

## Main risks

### Risk 1 — Users care in theory but do not use it

Signal:

- They say privacy is important but do not try the demo.

Mitigation:

- Force usage test with real-ish text.
- Measure repeat use.

### Risk 2 — Manual cleanup is good enough

Signal:

- Users say they already remove sensitive info quickly.

Mitigation:

- Target users with longer documents or repeated workflows.

### Risk 3 — Trust problem

Signal:

- Users refuse to paste sensitive text even into a local web tool.

Mitigation:

- Add downloadable offline version.
- Make code visible if useful.
- Explain no-upload architecture.

### Risk 4 — Detection quality is bad

Signal:

- Users spend more time fixing detections than doing manual redaction.

Mitigation:

- Add custom terms.
- Focus on high-confidence regex.
- Keep manual review fast.

### Risk 5 — Too many segments

Signal:

- Recruiters, agencies, VAs, researchers all want different features.

Mitigation:

- Pick one segment after 14 days.
- Build only that workflow.

## Kill metrics

Kill or pivot if any of these happen:

| Metric | Kill threshold | Decision |
|---|---:|---|
| Targeted DMs | 100 sent with fewer than 10 replies | Change segment or message |
| Discovery calls | Fewer than 5 calls from 100 DMs | Change segment |
| Prototype trials | Fewer than 5 trials from 15 interested people | Pain not urgent |
| Repeat usage | Fewer than 3 people use it 3 times in 14 days | Not recurring |
| Payment | Fewer than 2 paid/committed users by day 14 | Not valuable enough |
| Manual replacement | Fewer than 3 users say it replaces manual cleanup | Weak product |
| Detection quality | More than 50% of testers complain corrections take too long | Improve detection or kill |
| Trust | More than 50% refuse web version but accept offline | Build offline version |
| Segment clarity | No segment has higher pain than 3/5 | Reposition or kill |

## Continue metrics

Continue if:

- 2+ paid users by day 14.
- 3+ repeated users.
- At least one segment says “I would use this weekly.”
- Users ask for saved terms/profiles.
- Users use it on real workflows, not only sample text.

## Upgrade to paid product when

- 10 paid users.
- 5 weekly active users.
- 3 users ask for Pro features.
- Clear segment emerges.
- Support burden is manageable.

## Do not build deeper until

Do not build desktop app, browser extension, or subscriptions until:

- Users repeat the core workflow.
- Users pay for early access.
- Users say local browser version has a trust limitation.
- Users request offline/desktop specifically.

## 30-day decision

At day 30, choose one:

1. Continue Trizla for recruiters.
2. Continue Trizla for agencies/VAs.
3. Pivot to offline downloadable privacy utility.
4. Kill product and return to survivor list.
