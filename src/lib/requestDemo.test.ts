import { describe, expect, it } from 'vitest'
import {
  buildRequestDemoPayload,
  calculateLeadScore,
  firstInvalidField,
  gradeFromScore,
  getEmailDomain,
  isBlockedEmailDomain,
  isRequestDemoFormValid,
  isValidPhone,
  normalizePhone,
  parseUtmParams,
  validateRequestDemoForm,
} from './requestDemo'
import type { RequestDemoFormData } from '../content/requestDemo'

function baseFormData(overrides: Partial<RequestDemoFormData> = {}): RequestDemoFormData {
  return {
    fullName: 'Jane Doe',
    workEmail: 'jane@acme.com',
    phone: '+14155551234',
    companyName: 'Acme Corp',
    jobTitle: 'Engineer',
    country: 'US',
    companySize: '1-50',
    currentPlatform: '',
    currentPlatformOther: '',
    dataVolume: '',
    useCases: ['Data migration'],
    timeline: 'researching',
    budgetRange: '',
    preferredDemoAt: '',
    message: '',
    referralSource: '',
    marketingOptIn: false,
    consent: true,
    ...overrides,
  }
}

describe('getEmailDomain', () => {
  it('extracts the domain from a valid email', () => {
    expect(getEmailDomain('user@example.com')).toBe('example.com')
  })

  it('returns empty string for a malformed email', () => {
    expect(getEmailDomain('not-an-email')).toBe('')
  })
})

describe('isBlockedEmailDomain', () => {
  it('blocks known free-email domains', () => {
    expect(isBlockedEmailDomain('someone@gmail.com')).toBe(true)
  })

  it('allows company domains', () => {
    expect(isBlockedEmailDomain('someone@acme.com')).toBe(false)
  })
})

describe('normalizePhone', () => {
  it('normalizes a valid phone number', () => {
    expect(normalizePhone('+1 (415) 555-1234')).toBe('+14155551234')
  })

  it('rejects a number that is too short', () => {
    expect(normalizePhone('12345')).toBeNull()
  })
})

describe('isValidPhone', () => {
  it('returns true for a valid number', () => {
    expect(isValidPhone('+14155551234')).toBe(true)
  })

  it('returns false for an invalid number', () => {
    expect(isValidPhone('abc')).toBe(false)
  })
})

describe('calculateLeadScore', () => {
  it('scores zero for a minimal, non-qualifying submission', () => {
    expect(calculateLeadScore(baseFormData())).toBe(0)
  })

  it('adds decision-maker and urgent-timeline points', () => {
    const data = baseFormData({ jobTitle: 'VP of Engineering', timeline: 'immediate' })
    expect(calculateLeadScore(data)).toBe(15 + 20)
  })

  it('adds the repeat-request bonus', () => {
    const data = baseFormData({ jobTitle: 'VP of Engineering', timeline: 'immediate' })
    expect(calculateLeadScore(data, true)).toBe(15 + 20 + 10)
  })

  it('sums every applicable scoring factor', () => {
    const data = baseFormData({
      workEmail: 'vp@acme.com',
      jobTitle: 'VP',
      companySize: '1000+',
      dataVolume: '>10TB',
      timeline: 'immediate',
      budgetRange: '>$200k',
      currentPlatform: 'Oracle',
      country: 'US',
      preferredDemoAt: '2026-01-01T10:00:00Z',
    })
    expect(calculateLeadScore(data, true)).toBe(95)
  })

  it('never exceeds 100', () => {
    const data = baseFormData({ jobTitle: 'VP', timeline: 'immediate', budgetRange: '>$200k' })
    expect(calculateLeadScore(data, true)).toBeLessThanOrEqual(100)
  })
})

describe('gradeFromScore', () => {
  it('grades hot at or above 70', () => {
    expect(gradeFromScore(70)).toBe('hot')
  })

  it('grades warm between 40 and 69', () => {
    expect(gradeFromScore(40)).toBe('warm')
    expect(gradeFromScore(69)).toBe('warm')
  })

  it('grades cold below 40', () => {
    expect(gradeFromScore(39)).toBe('cold')
  })
})

describe('validateRequestDemoForm', () => {
  it('returns no errors for a fully valid submission', () => {
    expect(validateRequestDemoForm(baseFormData())).toEqual({})
  })

  it('flags a blocklisted free-email domain with the exact spec message', () => {
    const errors = validateRequestDemoForm(baseFormData({ workEmail: 'jane@gmail.com' }))
    expect(errors.workEmail).toBe('Please use your company email address.')
  })

  it('flags a malformed email differently from a blocked domain', () => {
    const errors = validateRequestDemoForm(baseFormData({ workEmail: 'not-an-email' }))
    expect(errors.workEmail).toBe('Enter a valid email address.')
  })

  it('flags an empty required field', () => {
    const errors = validateRequestDemoForm(baseFormData({ country: '' }))
    expect(errors.country).toBeDefined()
  })

  it('flags an unchecked consent box', () => {
    const errors = validateRequestDemoForm(baseFormData({ consent: false }))
    expect(errors.consent).toBeDefined()
  })

  it('flags zero selected use cases', () => {
    const errors = validateRequestDemoForm(baseFormData({ useCases: [] }))
    expect(errors.useCases).toBeDefined()
  })
})

describe('isRequestDemoFormValid', () => {
  it('returns true when there are no errors', () => {
    expect(isRequestDemoFormValid(baseFormData())).toBe(true)
  })

  it('returns false when a required field is invalid', () => {
    expect(isRequestDemoFormValid(baseFormData({ fullName: '' }))).toBe(false)
  })
})

describe('firstInvalidField', () => {
  it('returns the first field in visual order that has an error', () => {
    const errors = validateRequestDemoForm(baseFormData({ fullName: '', country: '' }))
    expect(firstInvalidField(errors)).toBe('fullName')
  })

  it('returns undefined when there are no errors', () => {
    expect(firstInvalidField({})).toBeUndefined()
  })
})

describe('parseUtmParams', () => {
  it('extracts utm_source, utm_medium, and utm_campaign from a query string', () => {
    expect(parseUtmParams('?utm_source=google&utm_medium=cpc&utm_campaign=demo')).toEqual({
      utm_source: 'google',
      utm_medium: 'cpc',
      utm_campaign: 'demo',
    })
  })

  it('returns null for missing params', () => {
    expect(parseUtmParams('')).toEqual({
      utm_source: null,
      utm_medium: null,
      utm_campaign: null,
    })
  })
})

describe('buildRequestDemoPayload', () => {
  const noUtm = { utm_source: null, utm_medium: null, utm_campaign: null }

  it('builds a payload with trimmed fields, computed score/grade, and hidden fields', () => {
    const payload = buildRequestDemoPayload(baseFormData(), noUtm, '')
    expect(payload.fullName).toBe('Jane Doe')
    expect(payload.workEmail).toBe('jane@acme.com')
    expect(payload.phone).toBe('+14155551234')
    expect(payload.leadScore).toBe(0)
    expect(payload.leadGrade).toBe('cold')
    expect(payload._subject).toBe('New Demo Request')
    expect(payload._gotcha).toBe('')
  })

  it('resolves currentPlatform to the free-text value when "Other" is selected', () => {
    const payload = buildRequestDemoPayload(
      baseFormData({ currentPlatform: 'Other', currentPlatformOther: 'Custom DB' }),
      noUtm,
      '',
    )
    expect(payload.currentPlatform).toBe('Custom DB')
  })

  it('passes through UTM params and honeypot value', () => {
    const payload = buildRequestDemoPayload(
      baseFormData(),
      { utm_source: 'google', utm_medium: 'cpc', utm_campaign: 'demo' },
      'bot-filled',
    )
    expect(payload.utm_source).toBe('google')
    expect(payload.utm_medium).toBe('cpc')
    expect(payload.utm_campaign).toBe('demo')
    expect(payload._gotcha).toBe('bot-filled')
  })

  it('adds the repeat-request bonus to the computed score', () => {
    const payload = buildRequestDemoPayload(
      baseFormData({ jobTitle: 'VP', timeline: 'immediate' }),
      noUtm,
      '',
      true,
    )
    expect(payload.leadScore).toBe(15 + 20 + 10)
  })
})

