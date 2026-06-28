# First Outreach Validation Sprint

## Goal

Validate whether Trizla solves a real workflow pain before adding more product features.

Live demo:

```text
https://trizla.ivanliao41.workers.dev/
```

## Sprint Batch

Contact 15 people manually:

- 5 recruiters or talent sourcers.
- 5 virtual assistants or agency operators.
- 5 freelancers or consultants who use AI with client text.

Do not add backend, analytics, login, database, payments, storage, or AI APIs during this sprint.

## Coworker Ownership

### Growth/validation coworker

- Find contacts who likely use AI with real work text.
- Send direct manual messages.
- Add every contact to `14_FIRST_OUTREACH_TRACKER.md`.
- Capture exact quotes in the notes column.
- Mark pain level only from what the person says, not from assumptions.

### QA coworker

- Reproduce every reported bug on the live URL.
- Confirm whether the issue is product behavior, user confusion, or unrelated browser/account behavior.
- Do not mark a bug as real until it is reproduced.

### Frontend coworker

- Only act if at least two testers hit the same UI confusion or layout issue.
- Keep fixes scoped to copy, layout, or workflow clarity.

### Redaction Engine coworker

- Only act on repeated detection, sanitization, or restore failures from real tester examples.
- Preserve local-only behavior.

### Backend/database coworkers

- No work in this sprint.

## Outreach Message

Use this as the default first message:

```text
When you use ChatGPT or Claude for real work text, do you manually remove names, emails, company details, or client info first?

I built Trizla to do that locally before pasting into AI:
https://trizla.ivanliao41.workers.dev/

Could you try it and tell me what breaks or feels useful? Not selling anything yet, just validating whether this workflow is real.
```

## Segment Variants

### Recruiter / talent sourcer

```text
When you use ChatGPT or Claude for resumes, candidate notes, interview summaries, or hiring-manager briefs, do you manually remove names, emails, phone numbers, salary, or company details first?

I built Trizla to redact that locally before pasting into AI:
https://trizla.ivanliao41.workers.dev/

Could you try it with fake or non-sensitive candidate text and tell me what breaks or feels useful?
```

### VA / agency operator

```text
When you use ChatGPT or Claude for client notes, customer messages, reports, or internal docs, do you manually remove names, emails, client details, or company info first?

I built Trizla to redact that locally before pasting into AI:
https://trizla.ivanliao41.workers.dev/

Could you try it with fake or non-sensitive text and tell me whether this would save time?
```

### Freelancer / consultant

```text
When you use ChatGPT or Claude with client briefs, testimonials, meeting notes, or survey responses, do you manually clean out names, emails, or company details first?

I built Trizla to redact that locally before pasting into AI:
https://trizla.ivanliao41.workers.dev/

Could you try it with fake or non-sensitive text and tell me if it fits your workflow?
```

## Follow-Ups

Follow up once after 2-3 days:

```text
Quick bump. Even a "no, I would not use this" helps. I am trying to learn whether manual cleanup before AI is a real enough problem.
```

Final follow-up after 5-7 days:

```text
Last note from me. If you already have a good workflow for sanitizing text before AI, I would love to hear what you use.
```

## Discovery Questions

Ask these after someone replies:

1. What AI tools do you use for work?
2. What kind of real text do you paste into them?
3. What sensitive information do you remove first?
4. How do you remove it today?
5. How often does this happen?
6. What happens if you forget to remove something?
7. Would a local redaction tool help?
8. What would make you distrust it?
9. Would you pay $29 once if it worked?
10. Can I watch you try the prototype or get your notes after testing?

## Success Criteria

First batch passes if:

- 15 targeted contacts sent.
- 5 replies.
- 3 people try the live app.
- 2 people say they currently do manual cleanup or avoid using AI because of sensitive text.
- At least 3 exact quotes are captured.

Do not build new features until the tracker shows repeated evidence.
