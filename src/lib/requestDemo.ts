import {
  ACTIVE_SALES_TERRITORY_COUNTRIES,
  DECISION_MAKER_KEYWORDS,
  DEMO_REQUEST_SUBJECT,
  FREE_EMAIL_DOMAIN_BLOCKLIST,
  LEAD_GRADE_THRESHOLDS,
  LEAD_SCORE_WEIGHTS,
  TARGET_ACCOUNT_DOMAINS,
  type LeadGrade,
  type RequestDemoFormData,
  type RequestDemoPayload,
} from '../content/requestDemo'

export function getEmailDomain(email: string): string {
  const parts = email.trim().toLowerCase().split('@')
  return parts.length === 2 ? parts[1] : ''
}

export function isBlockedEmailDomain(email: string): boolean {
  const domain = getEmailDomain(email)
  return domain !== '' && FREE_EMAIL_DOMAIN_BLOCKLIST.includes(domain)
}

export function normalizePhone(phone: string): string | null {
  const digits = phone.replace(/[^\d+]/g, '')
  const digitCount = digits.replace(/^\+/, '').length
  if (digitCount < 8 || digitCount > 15) {
    return null
  }
  return digits.startsWith('+') ? digits : `+${digits}`
}

export function isValidPhone(phone: string): boolean {
  return normalizePhone(phone) !== null
}

function isDecisionMakerTitle(jobTitle: string): boolean {
  const lower = jobTitle.toLowerCase()
  return DECISION_MAKER_KEYWORDS.some((keyword) => lower.includes(keyword))
}

function isLargeCompanySize(companySize: string): boolean {
  return companySize === '201-1000' || companySize === '1000+'
}

function isUrgentTimeline(timeline: string): boolean {
  return timeline === 'immediate' || timeline === '1-3m'
}

function isBudgetProvidedAndAboveMin(budgetRange: string): boolean {
  return budgetRange !== '' && budgetRange !== 'Not disclosed' && budgetRange !== '<$10k'
}

function isActiveTerritory(country: string): boolean {
  return ACTIVE_SALES_TERRITORY_COUNTRIES.includes(country)
}

function isTargetAccountDomain(email: string): boolean {
  const domain = getEmailDomain(email)
  return domain !== '' && TARGET_ACCOUNT_DOMAINS.includes(domain)
}

export function calculateLeadScore(
  data: RequestDemoFormData,
  isRepeatRequest = false,
): number {
  let score = 0

  if (isTargetAccountDomain(data.workEmail)) {
    score += LEAD_SCORE_WEIGHTS.targetAccountDomain
  }
  if (isDecisionMakerTitle(data.jobTitle)) {
    score += LEAD_SCORE_WEIGHTS.decisionMakerTitle
  }
  if (isLargeCompanySize(data.companySize)) {
    score += LEAD_SCORE_WEIGHTS.largeCompanySize
  }
  if (isUrgentTimeline(data.timeline)) {
    score += LEAD_SCORE_WEIGHTS.urgentTimeline
  }
  if (isBudgetProvidedAndAboveMin(data.budgetRange)) {
    score += LEAD_SCORE_WEIGHTS.budgetProvided
  }
  if (isActiveTerritory(data.country)) {
    score += LEAD_SCORE_WEIGHTS.activeTerritory
  }
  if (data.preferredDemoAt !== '') {
    score += LEAD_SCORE_WEIGHTS.preferredDemoTimeProvided
  }
  if (isRepeatRequest) {
    score += LEAD_SCORE_WEIGHTS.repeatRequestBonus
  }

  return Math.min(score, 100)
}

export function gradeFromScore(score: number): LeadGrade {
  if (score >= LEAD_GRADE_THRESHOLDS.hot) {
    return 'hot'
  }
  if (score >= LEAD_GRADE_THRESHOLDS.warm) {
    return 'warm'
  }
  return 'cold'
}

export type RequestDemoFormErrors = Partial<Record<keyof RequestDemoFormData, string>>

export const REQUIRED_FIELD_ORDER: (keyof RequestDemoFormData)[] = [
  'fullName',
  'workEmail',
  'phone',
  'companyName',
  'jobTitle',
  'country',
  'companySize',
  'timeline',
  'consent',
]

const NAME_PATTERN = /^[A-Za-z\s-]{2,80}$/
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateRequestDemoForm(data: RequestDemoFormData): RequestDemoFormErrors {
  const errors: RequestDemoFormErrors = {}

  if (!NAME_PATTERN.test(data.fullName.trim())) {
    errors.fullName = 'Enter a name using 2-80 letters, spaces, or hyphens.'
  }

  const workEmail = data.workEmail.trim()
  if (workEmail === '') {
    errors.workEmail = 'Work email is required.'
  } else if (!EMAIL_PATTERN.test(workEmail)) {
    errors.workEmail = 'Enter a valid email address.'
  } else if (isBlockedEmailDomain(workEmail)) {
    errors.workEmail = 'Please use your company email address.'
  }

  if (!isValidPhone(data.phone)) {
    errors.phone = 'Enter a valid phone number (8-15 digits).'
  }

  const companyName = data.companyName.trim()
  if (companyName.length < 2 || companyName.length > 120) {
    errors.companyName = 'Company name must be 2-120 characters.'
  }

  const jobTitle = data.jobTitle.trim()
  if (jobTitle.length < 2 || jobTitle.length > 80) {
    errors.jobTitle = 'Job title must be 2-80 characters.'
  }

  if (data.country === '') {
    errors.country = 'Select a country.'
  }

  if (data.companySize === '') {
    errors.companySize = 'Select a company size.'
  }

  if (data.timeline === '') {
    errors.timeline = 'Select a project timeline.'
  }

  if (!data.consent) {
    errors.consent = 'You must agree before submitting.'
  }

  return errors
}

export function isRequestDemoFormValid(data: RequestDemoFormData): boolean {
  return Object.keys(validateRequestDemoForm(data)).length === 0
}

export function firstInvalidField(
  errors: RequestDemoFormErrors,
): keyof RequestDemoFormData | undefined {
  return REQUIRED_FIELD_ORDER.find((field) => errors[field] !== undefined)
}

export interface UtmParams {
  utm_source: string | null
  utm_medium: string | null
  utm_campaign: string | null
}

export function parseUtmParams(search: string): UtmParams {
  const params = new URLSearchParams(search)
  return {
    utm_source: params.get('utm_source'),
    utm_medium: params.get('utm_medium'),
    utm_campaign: params.get('utm_campaign'),
  }
}

export function buildRequestDemoPayload(
  data: RequestDemoFormData,
  utm: UtmParams,
  honeypot: string,
  isRepeatRequest = false,
): RequestDemoPayload {
  const leadScore = calculateLeadScore(data, isRepeatRequest)
  const leadGrade = gradeFromScore(leadScore)
  const resolvedCustomerIndustry =
    data.customerIndustry === 'Other' && data.customerIndustryOther.trim() !== ''
      ? data.customerIndustryOther.trim()
      : data.customerIndustry || null
  const resolvedSolutionType =
    data.solutionType === 'Other' && data.solutionTypeOther.trim() !== ''
      ? data.solutionTypeOther.trim()
      : data.solutionType || null
  const resolvedIntegrationsNeeded: string[] = data.integrationsNeeded.includes('Other')
    ? [
        ...data.integrationsNeeded.filter((item) => item !== 'Other'),
        ...(data.integrationsNeededOther.trim() !== '' ? [data.integrationsNeededOther.trim()] : []),
      ]
    : data.integrationsNeeded
  const resolvedSpecialRequirements: string[] = data.specialRequirements.includes('Other')
    ? [
        ...data.specialRequirements.filter((item) => item !== 'Other'),
        ...(data.specialRequirementsOther.trim() !== ''
          ? [data.specialRequirementsOther.trim()]
          : []),
      ]
    : data.specialRequirements

  return {
    fullName: data.fullName.trim(),
    workEmail: data.workEmail.trim(),
    phone: normalizePhone(data.phone) ?? data.phone.trim(),
    companyName: data.companyName.trim(),
    jobTitle: data.jobTitle.trim(),
    country: data.country,
    companySize: data.companySize,
    timeline: data.timeline,
    budgetRange: data.budgetRange || null,
    preferredDemoAt: data.preferredDemoAt || null,
    message: data.message.trim() === '' ? null : data.message.trim(),
    referralSource: data.referralSource || null,
    marketingOptIn: data.marketingOptIn,
    consent: data.consent,
    customerIndustry: resolvedCustomerIndustry,
    projectName: data.projectName.trim() === '' ? null : data.projectName.trim(),
    solutionType: resolvedSolutionType,
    currentSituation: data.currentSituation.trim() === '' ? null : data.currentSituation.trim(),
    businessChallenges:
      data.businessChallenges.trim() === '' ? null : data.businessChallenges.trim(),
    objectives: data.objectives.trim() === '' ? null : data.objectives.trim(),
    integrationsNeeded: resolvedIntegrationsNeeded,
    specialRequirements: resolvedSpecialRequirements,
    utm_source: utm.utm_source,
    utm_medium: utm.utm_medium,
    utm_campaign: utm.utm_campaign,
    leadScore,
    leadGrade,
    _subject: DEMO_REQUEST_SUBJECT,
    _gotcha: honeypot,
  }
}

