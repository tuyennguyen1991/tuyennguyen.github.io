import {
  ACTIVE_SALES_TERRITORY_COUNTRIES,
  COMPETITOR_PLATFORMS,
  DECISION_MAKER_KEYWORDS,
  FREE_EMAIL_DOMAIN_BLOCKLIST,
  LEAD_GRADE_THRESHOLDS,
  LEAD_SCORE_WEIGHTS,
  TARGET_ACCOUNT_DOMAINS,
  type LeadGrade,
  type RequestDemoFormData,
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

function isHighDataVolume(dataVolume: string): boolean {
  return dataVolume === '1-10TB' || dataVolume === '>10TB'
}

function isUrgentTimeline(timeline: string): boolean {
  return timeline === 'immediate' || timeline === '1-3m'
}

function isBudgetProvidedAndAboveMin(budgetRange: string): boolean {
  return budgetRange !== '' && budgetRange !== 'Not disclosed' && budgetRange !== '<$10k'
}

function isCompetitorPlatform(currentPlatform: string): boolean {
  return COMPETITOR_PLATFORMS.includes(currentPlatform)
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
  if (isHighDataVolume(data.dataVolume)) {
    score += LEAD_SCORE_WEIGHTS.highDataVolume
  }
  if (isUrgentTimeline(data.timeline)) {
    score += LEAD_SCORE_WEIGHTS.urgentTimeline
  }
  if (isBudgetProvidedAndAboveMin(data.budgetRange)) {
    score += LEAD_SCORE_WEIGHTS.budgetProvided
  }
  if (isCompetitorPlatform(data.currentPlatform)) {
    score += LEAD_SCORE_WEIGHTS.competitorPlatform
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

