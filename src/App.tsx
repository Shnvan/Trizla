import { useEffect, useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import './App.css'
import { detectSensitiveInfo } from './lib/redaction/detectSensitiveInfo'
import { restoreText } from './lib/redaction/restoreText'
import { sanitizeText } from './lib/redaction/sanitizeText'
import type { CustomTerm, Detection, EntityType } from './lib/redaction/types'
import { SAMPLE_RECRUITER_TEXT } from './lib/sampleText'

const TRUST_STATEMENTS = [
  'Runs locally in your browser',
  'No upload by Trizla',
  'No account required',
  'Review before copy',
] as const

const CUSTOM_TERM_TYPES: EntityType[] = [
  'PERSON',
  'COMPANY',
  'CUSTOM',
  'ID',
  'EMAIL',
  'PHONE',
  'URL',
  'MONEY',
  'DATE',
]

type Theme = 'light' | 'dark'

function App() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof document !== 'undefined') {
      const current = document.documentElement.dataset.theme
      if (current === 'dark' || current === 'light') return current
    }
    return 'light'
  })

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  const toggleTheme = () =>
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'))

  useEffect(() => {
    const elements = document.querySelectorAll('.reveal')
    if (elements.length === 0) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 },
    )
    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const [originalText, setOriginalText] = useState('')
  const [detections, setDetections] = useState<Detection[]>([])
  const [hasDetected, setHasDetected] = useState(false)
  const [copied, setCopied] = useState(false)
  const [aiResponseText, setAiResponseText] = useState('')
  const [restoredText, setRestoredText] = useState('')
  const [restoredCopied, setRestoredCopied] = useState(false)
  const [customTerms, setCustomTerms] = useState<CustomTerm[]>([])
  const [termInput, setTermInput] = useState('')
  const [termType, setTermType] = useState<EntityType>('PERSON')
  const [termCaseSensitive, setTermCaseSensitive] = useState(false)

  const sanitizedText = useMemo(
    () => sanitizeText(originalText, detections),
    [originalText, detections],
  )

  const handleOriginalChange = (value: string) => {
    setOriginalText(value)
    if (hasDetected) {
      setDetections([])
      setHasDetected(false)
    }
  }

  const handleDetect = () => {
    setDetections(detectSensitiveInfo(originalText, customTerms))
    setHasDetected(true)
  }

  const handleAddTerm = (e: FormEvent) => {
    e.preventDefault()
    const value = termInput.trim()
    if (value.length === 0) return
    const id =
      typeof crypto !== 'undefined' && 'randomUUID' in crypto
        ? crypto.randomUUID()
        : `term-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
    setCustomTerms((prev) => [
      ...prev,
      { id, value, type: termType, caseSensitive: termCaseSensitive },
    ])
    setTermInput('')
  }

  const handleRemoveTerm = (id: string) => {
    setCustomTerms((prev) => prev.filter((t) => t.id !== id))
  }

  const toggleDetection = (id: string) => {
    setDetections((prev) =>
      prev.map((d) => (d.id === id ? { ...d, enabled: !d.enabled } : d)),
    )
  }

  const removeDetection = (id: string) => {
    setDetections((prev) => prev.filter((d) => d.id !== id))
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(sanitizedText)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  const handleRestore = () => {
    setRestoredText(restoreText(aiResponseText, detections))
  }

  const handleCopyRestored = async () => {
    try {
      await navigator.clipboard.writeText(restoredText)
      setRestoredCopied(true)
      window.setTimeout(() => setRestoredCopied(false), 2000)
    } catch {
      setRestoredCopied(false)
    }
  }

  const resetSessionOutputs = () => {
    setDetections([])
    setHasDetected(false)
    setAiResponseText('')
    setRestoredText('')
    setCopied(false)
    setRestoredCopied(false)
  }

  const handleUseSample = () => {
    setOriginalText(SAMPLE_RECRUITER_TEXT)
    resetSessionOutputs()
  }

  const handleClearAll = () => {
    setOriginalText('')
    resetSessionOutputs()
    setCustomTerms([])
    setTermInput('')
    setTermType('PERSON')
    setTermCaseSensitive(false)
  }

  const canDetect = originalText.trim().length > 0
  const enabledCount = detections.filter((d) => d.enabled).length
  const hasSanitizedOutput = sanitizedText.length > 0
  const canRestore = aiResponseText.trim().length > 0 && detections.length > 0
  const hasRestoredOutput = restoredText.length > 0

  return (
    <div className="app">
      <header className="header">
        <div className="header-inner">
          <span className="brand">Trizla</span>
          <span className="badge">Local only</span>
          <nav className="header-nav" aria-label="Primary">
            <a className="header-link" href="#how-it-works">
              How it works
            </a>
            <a className="header-link" href="#faq">
              FAQ
            </a>
            <button
              type="button"
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            >
              {theme === 'dark' ? 'Dark' : 'Light'}
            </button>
            <button
              type="button"
              className="secondary-button"
              onClick={handleClearAll}
            >
              Clear all
            </button>
          </nav>
        </div>
      </header>

      <main className="main">
        <section className="intro" aria-labelledby="intro-title">
          <h1 id="intro-title" className="intro-title">
            Sanitize sensitive text before pasting it into AI.
          </h1>
          <p className="intro-subtitle">
            Redact names, emails, phones, money, IDs, dates, and custom terms
            locally in your browser. Copy the sanitized version into ChatGPT,
            Claude, or any AI tool, then restore the placeholders after the
            response.
          </p>
          <ul className="trust-badges" role="list" aria-label="Privacy promises">
            {TRUST_STATEMENTS.map((statement) => (
              <li key={statement} className="trust-badge">
                <span className="trust-dot" aria-hidden="true" />
                {statement}
              </li>
            ))}
          </ul>
        </section>

        <section className="panel reveal" aria-labelledby="original-heading" id="demo">
          <h2 id="original-heading" className="panel-heading">
            <span className="step-chip" aria-hidden="true">1</span>
            <span>Original text</span>
          </h2>
          <p className="panel-hint">Paste the text you want to sanitize.</p>
          <textarea
            className="textarea"
            placeholder="Paste candidate notes, client emails, tickets…"
            rows={8}
            value={originalText}
            onChange={(e) => handleOriginalChange(e.target.value)}
          />
          <div className="panel-actions">
            <button
              type="button"
              className="secondary-button"
              onClick={handleUseSample}
            >
              Use sample text
            </button>
            <button
              type="button"
              className="primary-button"
              onClick={handleDetect}
              disabled={!canDetect}
            >
              Detect sensitive info
            </button>
          </div>
        </section>

        <section className="panel reveal" aria-labelledby="review-heading">
          <h2 id="review-heading" className="panel-heading">
            <span className="step-chip" aria-hidden="true">2</span>
            <span>Review detections</span>
          </h2>
          <p className="panel-hint">
            Uncheck false positives or remove items you don't want redacted.
            Placeholders use the format <code>[TYPE_N]</code>.
          </p>

          <CustomTermForm
            termInput={termInput}
            termType={termType}
            termCaseSensitive={termCaseSensitive}
            customTerms={customTerms}
            onTermInputChange={setTermInput}
            onTermTypeChange={setTermType}
            onTermCaseSensitiveChange={setTermCaseSensitive}
            onAdd={handleAddTerm}
            onRemove={handleRemoveTerm}
          />

          <ReviewPanel
            detections={detections}
            hasDetected={hasDetected}
            hasText={canDetect}
            onToggle={toggleDetection}
            onRemove={removeDetection}
          />
        </section>

        <section className="panel reveal" aria-labelledby="sanitized-heading">
          <h2 id="sanitized-heading" className="panel-heading">
            <span className="step-chip" aria-hidden="true">3</span>
            <span>Sanitized output</span>
          </h2>
          <p className="panel-hint">
            Enabled detections are replaced with stable placeholders like{' '}
            <code>[EMAIL_1]</code>. Always review before pasting into an AI tool.
          </p>
          <textarea
            className="textarea"
            placeholder="Sanitized text will appear here after you detect and review."
            rows={8}
            value={sanitizedText}
            readOnly
          />
          <div className="panel-actions">
            <span className="panel-status" aria-live="polite">
              {hasDetected
                ? `${enabledCount} of ${detections.length} detection${detections.length === 1 ? '' : 's'} enabled`
                : ''}
            </span>
            <button
              type="button"
              className={`primary-button${copied ? ' is-stamped' : ''}`}
              onClick={handleCopy}
              disabled={!hasSanitizedOutput}
            >
              {copied ? 'Copied' : 'Copy sanitized text'}
            </button>
          </div>
        </section>

        <section className="panel reveal" aria-labelledby="restore-heading">
          <h2 id="restore-heading" className="panel-heading">
            <span className="step-chip" aria-hidden="true">4</span>
            <span>Restore AI response</span>
          </h2>
          <p className="panel-hint">
            Paste the AI tool's response below. Known placeholders such as{' '}
            <code>[EMAIL_1]</code> will be swapped back to the original values
            from the review list above. Unknown placeholders are left as-is.
          </p>
          <textarea
            className="textarea"
            placeholder="Paste AI response containing placeholders."
            rows={8}
            value={aiResponseText}
            onChange={(e) => setAiResponseText(e.target.value)}
          />
          <div className="panel-actions">
            <button
              type="button"
              className="primary-button"
              onClick={handleRestore}
              disabled={!canRestore}
            >
              Restore placeholders
            </button>
          </div>
          <textarea
            className="textarea"
            placeholder="Restored text will appear here after you click Restore."
            rows={8}
            value={restoredText}
            readOnly
          />
          <div className="panel-actions">
            <button
              type="button"
              className={`primary-button${restoredCopied ? ' is-stamped' : ''}`}
              onClick={handleCopyRestored}
              disabled={!hasRestoredOutput}
            >
              {restoredCopied ? 'Copied' : 'Copy restored output'}
            </button>
          </div>
        </section>

        <HowItWorks />
        <Faq />
        <Cta />
      </main>

      <footer className="footer">
        <p>
          Trizla is not legal, compliance, or security certification
          software. It does not guarantee complete anonymization. Always review
          redactions before using sensitive text with third-party tools.
        </p>
      </footer>
    </div>
  )
}

interface ReviewPanelProps {
  detections: Detection[]
  hasDetected: boolean
  hasText: boolean
  onToggle: (id: string) => void
  onRemove: (id: string) => void
}

function ReviewPanel({
  detections,
  hasDetected,
  hasText,
  onToggle,
  onRemove,
}: ReviewPanelProps) {
  if (!hasDetected) {
    return (
      <div className="placeholder-box">
        {hasText
          ? 'Click "Detect sensitive info" to scan the text above.'
          : 'Paste text above to begin.'}
      </div>
    )
  }
  if (detections.length === 0) {
    return <div className="placeholder-box">No sensitive info detected.</div>
  }
  return (
    <ul className="review-list" role="list">
      {detections.map((d) => {
        const count = d.occurrences.length
        return (
          <li key={d.id} className={`review-item${d.enabled ? '' : ' is-disabled'}`}>
            <label className="review-toggle">
              <input
                type="checkbox"
                checked={d.enabled}
                onChange={() => onToggle(d.id)}
                aria-label={`Redact ${d.value}`}
              />
            </label>
            <span className={`type-tag type-${d.type.toLowerCase()}`}>
              {d.type}
            </span>
            <span className="review-value" title={d.value}>
              {d.value}
            </span>
            <span className="review-placeholder">{d.placeholder}</span>
            <span className="review-meta">
              {d.source} · {d.confidence}
              {count > 1 ? ` · ×${count}` : ''}
            </span>
            <button
              type="button"
              className="link-button"
              onClick={() => onRemove(d.id)}
              aria-label={`Remove ${d.value}`}
            >
              Remove
            </button>
          </li>
        )
      })}
    </ul>
  )
}

interface CustomTermFormProps {
  termInput: string
  termType: EntityType
  termCaseSensitive: boolean
  customTerms: CustomTerm[]
  onTermInputChange: (value: string) => void
  onTermTypeChange: (type: EntityType) => void
  onTermCaseSensitiveChange: (checked: boolean) => void
  onAdd: (e: FormEvent) => void
  onRemove: (id: string) => void
}

function CustomTermForm({
  termInput,
  termType,
  termCaseSensitive,
  customTerms,
  onTermInputChange,
  onTermTypeChange,
  onTermCaseSensitiveChange,
  onAdd,
  onRemove,
}: CustomTermFormProps) {
  return (
    <div className="custom-terms">
      <form className="custom-term-form" onSubmit={onAdd}>
        <input
          type="text"
          className="custom-term-input"
          placeholder="Add term (e.g. Acme Corp, John Smith)"
          value={termInput}
          onChange={(e) => onTermInputChange(e.target.value)}
          aria-label="Custom term"
        />
        <select
          className="custom-term-select"
          value={termType}
          onChange={(e) => onTermTypeChange(e.target.value as EntityType)}
          aria-label="Custom term type"
        >
          {CUSTOM_TERM_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        <label className="custom-term-checkbox">
          <input
            type="checkbox"
            checked={termCaseSensitive}
            onChange={(e) => onTermCaseSensitiveChange(e.target.checked)}
          />
          Case sensitive
        </label>
        <button
          type="submit"
          className="primary-button"
          disabled={termInput.trim().length === 0}
        >
          Add term
        </button>
      </form>
      {customTerms.length > 0 ? (
        <ul className="custom-term-list" role="list">
          {customTerms.map((term) => (
            <li key={term.id} className="custom-term-item">
              <span className={`type-tag type-${term.type.toLowerCase()}`}>
                {term.type}
              </span>
              <span className="review-value" title={term.value}>
                {term.value}
              </span>
              {term.caseSensitive ? (
                <span className="custom-term-flag" title="Case-sensitive match">
                  Aa
                </span>
              ) : (
                <span className="custom-term-flag-spacer" aria-hidden="true" />
              )}
              <button
                type="button"
                className="link-button"
                onClick={() => onRemove(term.id)}
                aria-label={`Remove custom term ${term.value}`}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      ) : null}
      <p className="custom-term-hint">
        Click <strong>Detect sensitive info</strong> again after adding or
        removing terms.
      </p>
    </div>
  )
}

const HOW_IT_WORKS_STEPS = [
  'Paste your text.',
  'Review detected sensitive info.',
  'Copy the sanitized version.',
  'Paste it into your AI tool.',
  'Paste the AI response back.',
  'Restore placeholders locally.',
] as const

function HowItWorks() {
  return (
    <section className="how-it-works reveal" id="how-it-works" aria-labelledby="how-it-works-title">
      <p className="section-eyebrow">How it works</p>
      <h2 className="section-title" id="how-it-works-title">
        Redact first. Prompt second. Restore after.
      </h2>
      <ol className="steps-list">
        {HOW_IT_WORKS_STEPS.map((step, index) => (
          <li key={step}>
            <span className="step-chip" aria-hidden="true">{index + 1}</span>
            <span>{step}</span>
          </li>
        ))}
      </ol>
    </section>
  )
}

const FAQ_ITEMS: ReadonlyArray<{ q: string; a: string }> = [
  {
    q: 'Does Trizla upload my text?',
    a: 'No. The MVP is designed to process text locally in your browser.',
  },
  {
    q: 'Does it replace ChatGPT or Claude?',
    a: 'No. It prepares text before you use those tools.',
  },
  {
    q: 'Can it miss sensitive information?',
    a: 'Yes. Trizla can miss information or flag false positives. Always review the redactions.',
  },
  {
    q: 'Is this legal or compliance software?',
    a: 'No. Trizla is a practical local helper, not a compliance guarantee.',
  },
  {
    q: 'Why not just manually find-and-replace?',
    a: 'You can. Trizla is for people who do that repeatedly and want a faster, more reviewable workflow.',
  },
  {
    q: 'Where are my custom terms stored?',
    a: "In your browser tab's memory only. Closing the tab or clicking Clear all removes them.",
  },
]

function Faq() {
  return (
    <section className="faq reveal" id="faq" aria-labelledby="faq-title">
      <p className="section-eyebrow">FAQ</p>
      <h2 className="section-title" id="faq-title">
        Common questions
      </h2>
      <div className="faq-list">
        {FAQ_ITEMS.map((item) => (
          <details className="faq-item" key={item.q}>
            <summary>{item.q}</summary>
            <p>{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  )
}

function Cta() {
  return (
    <section className="cta reveal" aria-labelledby="cta-title">
      <p className="section-eyebrow">Validation</p>
      <h2 className="section-title" id="cta-title">
        Ready to test Trizla on your workflow?
      </h2>
      <p className="cta-body">
        Try the local demo with fake or non-sensitive text, then tell us what
        it missed or saved you from manually replacing.
      </p>
      <div className="cta-actions">
        <a className="primary-button" href="#demo">
          Try the local demo
        </a>
        <a
          className="secondary-button"
          href="mailto:ivanliao41@gmail.com?subject=Trizla%20early%20access"
        >
          Join early access
        </a>
      </div>
    </section>
  )
}

export default App
