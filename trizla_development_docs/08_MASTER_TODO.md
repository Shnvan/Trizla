# Master TODO

## Milestone 1 - Project Scaffold

- [ ] Create React + TypeScript app.
- [ ] Add Tailwind or simple CSS.
- [ ] Create app layout.
- [ ] Add basic header and privacy banner.
- [ ] Add original text textarea.
- [ ] Add sanitized output textarea.
- [ ] Add restore textarea and output.

Done when:

- App runs locally.
- UI has the four main workflow sections.
- No redaction logic is required yet.

## Milestone 2 - Detection Engine

- [ ] Implement email detection.
- [ ] Implement URL detection.
- [ ] Implement phone detection.
- [ ] Implement money detection.
- [ ] Implement date detection.
- [ ] Implement long ID/order/ticket detection.
- [ ] Implement custom term detection.
- [ ] Optionally implement simple label-based person/company detection.

Done when:

- Detection functions return values and start/end indices.
- Detection logic is testable without UI.

## Milestone 3 - Merge and Placeholder Mapping

- [ ] Create overlapping detection merge logic.
- [ ] Create stable placeholder map.
- [ ] Ensure duplicate values map to the same placeholder.
- [ ] Sort detections by location.
- [ ] Generate placeholders per entity type.

Done when:

- Same value appears multiple times but gets one placeholder.
- Overlapping detections do not corrupt text.

## Milestone 4 - Review Panel

- [ ] Show detections in a table or list.
- [ ] Allow enable/disable.
- [ ] Allow deletion.
- [ ] Allow manual custom term entry.
- [ ] Allow custom term type selection.

Done when:

- User controls what gets redacted.

## Milestone 5 - Sanitization

- [ ] Replace enabled detections with placeholders.
- [ ] Preserve punctuation and line breaks.
- [ ] Add copy sanitized text button.
- [ ] Add copied success state.
- [ ] Add review-before-copy warning.

Done when:

- Core redaction flow works.

## Milestone 6 - Restore Flow

- [ ] Add AI response input.
- [ ] Restore placeholders with original values.
- [ ] Leave unknown placeholders unchanged.
- [ ] Add copy restored output button.

Done when:

- Full original -> sanitized -> restored loop works.

## Milestone 7 - Custom Terms

- [ ] Add custom term form.
- [ ] Add custom term list.
- [ ] Add term type.
- [ ] Add case-sensitive toggle.
- [ ] Include custom terms in detection.
- [ ] Consider saving custom terms only with explicit user action.

Done when:

- User can redact client, project, company, or other terms the app cannot infer.

## Milestone 8 - Privacy and Trust

- [ ] Add `Runs locally` badge.
- [ ] Add no-upload explanation.
- [ ] Add compliance disclaimer.
- [ ] Add clear/reset button.
- [ ] Add delete-local-data button if storage is used.
- [ ] Avoid analytics inside app.

Done when:

- User understands what the app does and does not promise.

## Milestone 9 - Tests

- [ ] Test email detection.
- [ ] Test phone detection.
- [ ] Test money detection.
- [ ] Test date detection.
- [ ] Test custom term detection.
- [ ] Test duplicate placeholder mapping.
- [ ] Test sanitization.
- [ ] Test restoration.
- [ ] Test unknown placeholder behavior.
- [ ] Test overlapping detections.

Done when:

- Core functions are covered by tests.

## Milestone 10 - Landing and Demo

- [ ] Add landing page or intro section.
- [ ] Add sample text button.
- [ ] Add `Try demo` CTA.
- [ ] Add basic FAQ.
- [ ] Add waitlist/payment placeholder only after core loop works.

Done when:

- Founder can share a link with prospects.
