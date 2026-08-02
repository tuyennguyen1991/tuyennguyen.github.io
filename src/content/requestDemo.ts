export const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mlgqyaql'

export const DEMO_REQUEST_SUBJECT = 'New Demo Request'

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

export const CUSTOMER_INDUSTRY_OPTIONS = [
  'Manufacturing',
  'Automotive',
  'Trading & Logistics',
  'Retail',
  'Technology',
  'Financial Services',
  'Healthcare',
  'Other',
] as const
export type CustomerIndustry = (typeof CUSTOMER_INDUSTRY_OPTIONS)[number]

export const SOLUTION_TYPE_OPTIONS = [
  'Custom Software Development',
  'Logistics Management',
  'Bidding/Procurement Management',
  'Workflow/Approval Automation',
  'Database Solution',
  'Other',
] as const
export type SolutionType = (typeof SOLUTION_TYPE_OPTIONS)[number]

export const INTEGRATIONS_NEEDED_OPTIONS = [
  'SharePoint',
  'SSO',
  'MFA',
  'ERP',
  'WMS',
  'Existing internal approval systems',
  'Other',
] as const
export type IntegrationNeeded = (typeof INTEGRATIONS_NEEDED_OPTIONS)[number]

export const SPECIAL_REQUIREMENTS_OPTIONS = [
  'Document centralization',
  'Vendor/external portal access',
  'Quote encryption & secure bidding',
  'Dashboard/KPI reporting',
  'Audit logging & security monitoring',
  'Role-based access control',
  'SSO/MFA authentication',
  'Multi-language (EN/VI) support',
  'Other',
] as const
export type SpecialRequirement = (typeof SPECIAL_REQUIREMENTS_OPTIONS)[number]

export const LEAD_SCORE_WEIGHTS = {
  targetAccountDomain: 20,
  decisionMakerTitle: 15,
  largeCompanySize: 10,
  urgentTimeline: 20,
  budgetProvided: 15,
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
  timeline: Timeline | ''
  budgetRange: BudgetRange | ''
  preferredDemoAt: string
  message: string
  referralSource: ReferralSource | ''
  marketingOptIn: boolean
  consent: boolean
  customerIndustry: CustomerIndustry | ''
  customerIndustryOther: string
  projectName: string
  solutionType: SolutionType | ''
  solutionTypeOther: string
  currentSituation: string
  businessChallenges: string
  objectives: string
  integrationsNeeded: IntegrationNeeded[]
  integrationsNeededOther: string
  specialRequirements: SpecialRequirement[]
  specialRequirementsOther: string
}

export interface RequestDemoPayload {
  fullName: string
  workEmail: string
  phone: string
  companyName: string
  jobTitle: string
  country: string
  companySize: string
  timeline: string
  budgetRange: string | null
  preferredDemoAt: string | null
  message: string | null
  referralSource: string | null
  marketingOptIn: boolean
  consent: boolean
  customerIndustry: string | null
  projectName: string | null
  solutionType: string | null
  currentSituation: string | null
  businessChallenges: string | null
  objectives: string | null
  integrationsNeeded: string[]
  specialRequirements: string[]
  utm_source: string | null
  utm_medium: string | null
  utm_campaign: string | null
  leadScore: number
  leadGrade: LeadGrade
  _subject: string
  _gotcha: string
}

