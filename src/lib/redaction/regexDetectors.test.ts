import { describe, expect, it } from 'vitest'
import {
  detectDates,
  detectEmails,
  detectIDs,
  detectMoney,
  detectPhones,
  detectURLs,
} from './regexDetectors'

describe('detectEmails', () => {
  it('finds a simple email', () => {
    const r = detectEmails('Contact maria@example.com for details.')
    expect(r).toHaveLength(1)
    expect(r[0].value).toBe('maria@example.com')
    expect(r[0].type).toBe('EMAIL')
  })

  it('finds multiple emails including dots and plus signs', () => {
    const text = 'a.b+test@sub.example.co and second@x.io'
    const r = detectEmails(text)
    expect(r.map((d) => d.value)).toEqual(['a.b+test@sub.example.co', 'second@x.io'])
  })

  it('records correct start/end offsets', () => {
    const text = 'Email: maria@example.com.'
    const r = detectEmails(text)
    expect(r[0].start).toBe(7)
    expect(r[0].end).toBe(7 + 'maria@example.com'.length)
  })
})

describe('detectPhones', () => {
  it('finds formatted international phone', () => {
    const r = detectPhones('Call +1 415 555 0132 tomorrow.')
    expect(r).toHaveLength(1)
    expect(r[0].value).toBe('+1 415 555 0132')
  })

  it('finds parenthesized US phone', () => {
    const r = detectPhones('Reach us at (415) 555-0132.')
    expect(r).toHaveLength(1)
    expect(r[0].value).toContain('555-0132')
  })

  it('finds Philippine phone with country code', () => {
    const r = detectPhones('Maria: +63 917 555 1234')
    expect(r).toHaveLength(1)
    expect(r[0].value).toBe('+63 917 555 1234')
  })
})

describe('detectURLs', () => {
  it('finds http URL', () => {
    const r = detectURLs('See https://example.com/path?q=1 for info.')
    expect(r).toHaveLength(1)
    expect(r[0].value).toBe('https://example.com/path?q=1')
  })

  it('finds www-prefixed URL', () => {
    const r = detectURLs('Visit www.acme-corp.co/about today.')
    expect(r).toHaveLength(1)
    expect(r[0].value).toBe('www.acme-corp.co/about')
  })

  it('finds multiple URLs', () => {
    const r = detectURLs('http://a.com and https://b.io/page')
    expect(r.map((d) => d.value)).toEqual(['http://a.com', 'https://b.io/page'])
  })
})

describe('detectMoney', () => {
  it('finds a dollar amount', () => {
    const r = detectMoney('Offer: $85,000 base.')
    expect(r).toHaveLength(1)
    expect(r[0].value).toBe('$85,000')
  })

  it('finds amount with currency code', () => {
    const r = detectMoney('Budget is 12500 PHP this month.')
    expect(r).toHaveLength(1)
    expect(r[0].value).toContain('12500')
    expect(r[0].value).toContain('PHP')
  })

  it('finds amount with leading currency code', () => {
    const r = detectMoney('Current salary: PHP 45,000/month.')
    expect(r).toHaveLength(1)
    expect(r[0].value).toBe('PHP 45,000')
  })

  it('finds euro amounts', () => {
    const r = detectMoney('Costs €1.299,99 per seat.')
    expect(r).toHaveLength(1)
    expect(r[0].value).toBe('€1.299,99')
  })
})

describe('detectDates', () => {
  it('finds ISO date', () => {
    const r = detectDates('Start date 2026-03-15 confirmed.')
    expect(r).toHaveLength(1)
    expect(r[0].value).toBe('2026-03-15')
  })

  it('finds US slash date', () => {
    const r = detectDates('Hired on 3/15/2024.')
    expect(r).toHaveLength(1)
    expect(r[0].value).toBe('3/15/2024')
  })

  it('finds month-name date', () => {
    const r = detectDates('Joined March 15, 2024 as engineer.')
    expect(r).toHaveLength(1)
    expect(r[0].value).toBe('March 15, 2024')
  })
})

describe('detectIDs', () => {
  it('finds prefixed alphanumeric ID', () => {
    const r = detectIDs('Ticket INV-12345 is overdue.')
    expect(r).toHaveLength(1)
    expect(r[0].value).toBe('INV-12345')
  })

  it('finds hash-prefixed ID', () => {
    const r = detectIDs('See #4823910 in the queue.')
    expect(r).toHaveLength(1)
    expect(r[0].value).toBe('#4823910')
  })

  it('finds multiple ID styles in one string', () => {
    const r = detectIDs('Refs: ORD-99021 and #2200145.')
    expect(r.map((d) => d.value)).toEqual(['ORD-99021', '#2200145'])
  })
})
