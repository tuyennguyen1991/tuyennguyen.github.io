export const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mlgqyaql'

export const FREE_EMAIL_DOMAIN_BLOCKLIST = [
  'gmail.com',
  'yahoo.com',
  'hotmail.com',
  'outlook.com',
  'icloud.com',
]

export const DECISION_MAKER_KEYWORDS = [
  'director',
  'vp',
  'vice president',
  'head',
  'cto',
  'cio',
  'manager',
  'owner',
  'founder',
]

export const TARGET_ACCOUNT_DOMAINS: string[] = []

export const COMPETITOR_PLATFORMS = [
  'Oracle',
  'SQL Server',
  'MySQL/PostgreSQL',
  'MongoDB',
  'Legacy/On-prem',
]

export const ACTIVE_SALES_TERRITORY_COUNTRIES: string[] = []

export const COUNTRY_OPTIONS = [
  { code: 'US', name: 'United States' },
  { code: 'CA', name: 'Canada' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'AU', name: 'Australia' },
  { code: 'DE', name: 'Germany' },
  { code: 'FR', name: 'France' },
  { code: 'NL', name: 'Netherlands' },
  { code: 'SE', name: 'Sweden' },
  { code: 'IE', name: 'Ireland' },
  { code: 'ES', name: 'Spain' },
  { code: 'IT', name: 'Italy' },
  { code: 'IN', name: 'India' },
  { code: 'SG', name: 'Singapore' },
  { code: 'JP', name: 'Japan' },
  { code: 'KR', name: 'South Korea' },
  { code: 'CN', name: 'China' },
  { code: 'VN', name: 'Vietnam' },
  { code: 'TH', name: 'Thailand' },
  { code: 'MY', name: 'Malaysia' },
  { code: 'PH', name: 'Philippines' },
  { code: 'ID', name: 'Indonesia' },
  { code: 'AE', name: 'United Arab Emirates' },
  { code: 'BR', name: 'Brazil' },
  { code: 'MX', name: 'Mexico' },
  { code: 'ZA', name: 'South Africa' },
  { code: 'OTHER', name: 'Other' },
] as const
export type CountryCode = (typeof COUNTRY_OPTIONS)[number]['code']

export const COMPANY_SIZE_OPTIONS = ['1-50', '51-200', '201-1000', '1000+'] as const
export type CompanySize = (typeof COMPANY_SIZE_OPTIONS)[number]

export const DATA_VOLUME_OPTIONS = ['<100GB', '100GB-1TB', '1-10TB', '>10TB', 'Not sure'] as const
export type DataVolume = (typeof DATA_VOLUME_OPTIONS)[number]

export const CURRENT_PLATFORM_OPTIONS = [
  'Oracle',
  'SQL Server',
  'MySQL/PostgreSQL',
  'MongoDB',
  'Legacy/On-prem',
  'None/Greenfield',
  'Other',
] as const
export type CurrentPlatform = (typeof CURRENT_PLATFORM_OPTIONS)[number]

export const USE_CASE_OPTIONS = [
  'Data migration',
  'Performance tuning',
  'Cloud migration',
  'HA/DR',
  'New system build',
  'Other',
] as const
export type UseCase = (typeof USE_CASE_OPTIONS)[number]

export const TIMELINE_OPTIONS = [
  { value: 'immediate', label: 'Immediate (0-1 month)' },
  { value: '1-3m', label: '1-3 months' },
  { value: '3-6m', label: '3-6 months' },
  { value: '6m+', label: '6+ months' },
  { value: 'researching', label: 'Just researching' },
] as const
export type Timeline = (typeof TIMELINE_OPTIONS)[number]['value']

export const BUDGET_RANGE_OPTIONS = [
  '<$10k',
  '$10k-$50k',
  '$50k-$200k',
  '>$200k',
  'Not disclosed',
] as const
export type BudgetRange = (typeof BUDGET_RANGE_OPTIONS)[number]

export const REFERRAL_SOURCE_OPTIONS = ['Search', 'Referral', 'Event', 'Social', 'Ad', 'Other'] as const
export type ReferralSource = (typeof REFERRAL_SOURCE_OPTIONS)[number]

export const LEAD_SCORE_WEIGHTS = {
  targetAccountDomain: 20,
  decisionMakerTitle: 15,
  largeCompanySize: 10,
  highDataVolume: 10,
  urgentTimeline: 20,
  budgetProvided: 15,
  competitorPlatform: 10,
  activeTerritory: 5,
  preferredDemoTimeProvided: 5,
  repeatRequestBonus: 10,
} as const

export const LEAD_GRADE_THRESHOLDS = {
  hot: 70,
  warm: 40,
} as const

export type LeadGrade = 'hot' | 'warm' | 'cold'

export interface RequestDemoFormData {
  fullName: string
  workEmail: string
  phone: string
  companyName: string
  jobTitle: string
  country: string
  companySize: CompanySize | ''
  currentPlatform: CurrentPlatform | ''
  currentPlatformOther: string
  dataVolume: DataVolume | ''
  useCases: UseCase[]
  timeline: Timeline | ''
  budgetRange: BudgetRange | ''
  preferredDemoAt: string
  message: string
  referralSource: ReferralSource | ''
  marketingOptIn: boolean
  consent: boolean
}

export interface RequestDemoPayload {
  fullName: string
  workEmail: string
  phone: string
  companyName: string
  jobTitle: string
  country: string
  companySize: string
  currentPlatform: string | null
  dataVolume: string | null
  useCases: string[]
  timeline: string
  budgetRange: string | null
  preferredDemoAt: string | null
  message: string | null
  referralSource: string | null
  marketingOptIn: boolean
  consent: boolean
  utm_source: string | null
  utm_medium: string | null
  utm_campaign: string | null
  leadScore: number
  leadGrade: LeadGrade
  _subject: string
  _gotcha: string
}

