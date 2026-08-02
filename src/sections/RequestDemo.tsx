import { useState } from 'react'
import {
  BUDGET_RANGE_OPTIONS,
  COMPANY_SIZE_OPTIONS,
  COUNTRY_OPTIONS,
  CUSTOMER_INDUSTRY_OPTIONS,
  DEMO_REQUEST_SUBJECT,
  FORMSPREE_ENDPOINT,
  INTEGRATIONS_NEEDED_OPTIONS,
  REFERRAL_SOURCE_OPTIONS,
  SOLUTION_TYPE_OPTIONS,
  SPECIAL_REQUIREMENTS_OPTIONS,
  TIMELINE_OPTIONS,
  type IntegrationNeeded,
  type RequestDemoFormData,
  type SpecialRequirement,
} from '../content/requestDemo'
import {
  buildRequestDemoPayload,
  firstInvalidField,
  parseUtmParams,
  validateRequestDemoForm,
  type UtmParams,
} from '../lib/requestDemo'

const FALLBACK_CONTACT_EMAIL = 'tuyen.nguyen.engineer@gmail.com'

type SubmissionState = 'idle' | 'submitting' | 'success' | 'error'

const initialFormData: RequestDemoFormData = {
  fullName: '',
  workEmail: '',
  phone: '',
  companyName: '',
  jobTitle: '',
  country: '',
  companySize: '',
  timeline: '',
  budgetRange: '',
  preferredDemoAt: '',
  message: '',
  referralSource: '',
  marketingOptIn: false,
  consent: false,
  customerIndustry: '',
  customerIndustryOther: '',
  projectName: '',
  solutionType: '',
  solutionTypeOther: '',
  currentSituation: '',
  businessChallenges: '',
  objectives: '',
  integrationsNeeded: [],
  integrationsNeededOther: '',
  specialRequirements: [],
  specialRequirementsOther: '',
}

const labelClass = 'block text-sm font-medium text-slate-700'
const inputClass =
  'mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-blue-600 focus:outline-none'
const invalidInputClass = 'mt-1 w-full rounded-md border border-red-500 px-3 py-2 text-sm text-slate-900 focus:border-red-600 focus:outline-none'
const checkboxClass = 'h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-600'
const fieldWrapperClass = 'flex flex-col'
const errorTextClass = 'mt-1 text-sm text-red-600'

function fieldClass(hasError: boolean) {
  return hasError ? invalidInputClass : inputClass
}

export function RequestDemo() {
  const [formData, setFormData] = useState<RequestDemoFormData>(initialFormData)
  const [touched, setTouched] = useState<Partial<Record<keyof RequestDemoFormData, boolean>>>({})
  const [submitAttempted, setSubmitAttempted] = useState(false)
  const [honeypot, setHoneypot] = useState('')
  const [utm] = useState<UtmParams>(() => parseUtmParams(window.location.search))
  const [submissionState, setSubmissionState] = useState<SubmissionState>('idle')
  const [submissionError, setSubmissionError] = useState('')

  const errors = validateRequestDemoForm(formData)
  const isValid = Object.keys(errors).length === 0
  const isSubmitting = submissionState === 'submitting'

  function shouldShowError(field: keyof RequestDemoFormData) {
    return (touched[field] || submitAttempted) && errors[field] !== undefined
  }

  function updateField<K extends keyof RequestDemoFormData>(
    field: K,
    value: RequestDemoFormData[K],
  ) {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  function markTouched(field: keyof RequestDemoFormData) {
    setTouched((prev) => ({ ...prev, [field]: true }))
  }

  function toggleIntegrationNeeded(value: IntegrationNeeded) {
    setFormData((prev) => ({
      ...prev,
      integrationsNeeded: prev.integrationsNeeded.includes(value)
        ? prev.integrationsNeeded.filter((existing) => existing !== value)
        : [...prev.integrationsNeeded, value],
    }))
  }

  function toggleSpecialRequirement(value: SpecialRequirement) {
    setFormData((prev) => ({
      ...prev,
      specialRequirements: prev.specialRequirements.includes(value)
        ? prev.specialRequirements.filter((existing) => existing !== value)
        : [...prev.specialRequirements, value],
    }))
  }

  function focusField(field: keyof RequestDemoFormData) {
    document.getElementById(field)?.focus()
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitAttempted(true)

    const invalidField = firstInvalidField(errors)
    if (invalidField) {
      focusField(invalidField)
      return
    }

    setSubmissionState('submitting')
    setSubmissionError('')

    const payload = buildRequestDemoPayload(formData, utm, honeypot)

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (response.ok) {
        setSubmissionState('success')
        return
      }

      if (response.status === 422) {
        const data: { errors?: { field?: string; message?: string }[] } = await response
          .json()
          .catch(() => ({}))
        const message =
          data.errors?.map((error) => error.message).filter(Boolean).join(' ') ||
          'Some fields could not be validated. Please review your entries and try again.'
        setSubmissionError(message)
        setSubmissionState('error')
        return
      }

      setSubmissionError(
        `Something went wrong on our end. Please try again, or email us directly at ${FALLBACK_CONTACT_EMAIL}.`,
      )
      setSubmissionState('error')
    } catch {
      setSubmissionError(
        `We couldn't reach our server. Please check your connection and try again, or email us directly at ${FALLBACK_CONTACT_EMAIL}.`,
      )
      setSubmissionState('error')
    }
  }

  if (submissionState === 'success') {
    return (
      <section id="request-demo" className="mx-auto max-w-3xl px-6 py-20 text-center">
        <h2 className="text-3xl font-semibold text-slate-900">Request a Demo</h2>
        <p className="mt-4 text-slate-600">
          Thanks, {formData.fullName.split(' ')[0] || 'there'}! Your request has been received. A
          specialist will contact you within 1 business day to schedule your demo.
        </p>
        <a href="#hero" className="mt-6 inline-block text-sm font-semibold text-blue-600 hover:text-blue-700">
          Back to homepage
        </a>
      </section>
    )
  }

  return (
    <section id="request-demo" className="mx-auto max-w-3xl px-6 py-20">
      <h2 className="text-3xl font-semibold text-slate-900">Request a Demo</h2>
      <p className="mt-4 text-slate-600">
        Tell us about your database needs and a specialist will follow up to schedule your demo.
      </p>
      {submissionState === 'error' && (
        <p role="alert" className="mt-6 rounded-md border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
          {submissionError}
        </p>
      )}
      <form onSubmit={handleSubmit} className="mt-10 space-y-6" noValidate>
        <div className={fieldWrapperClass}>
          <label className={labelClass} htmlFor="fullName">
            Full Name <span aria-hidden="true">*</span>
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            className={fieldClass(shouldShowError('fullName'))}
            value={formData.fullName}
            onChange={(event) => updateField('fullName', event.target.value)}
            onBlur={() => markTouched('fullName')}
            aria-required="true"
            aria-invalid={shouldShowError('fullName')}
            aria-describedby={shouldShowError('fullName') ? 'fullName-error' : undefined}
          />
          {shouldShowError('fullName') && (
            <p id="fullName-error" className={errorTextClass} role="alert">
              {errors.fullName}
            </p>
          )}
        </div>

        <div className={fieldWrapperClass}>
          <label className={labelClass} htmlFor="workEmail">
            Work Email <span aria-hidden="true">*</span>
          </label>
          <input
            id="workEmail"
            name="workEmail"
            type="email"
            className={fieldClass(shouldShowError('workEmail'))}
            value={formData.workEmail}
            onChange={(event) => updateField('workEmail', event.target.value)}
            onBlur={() => markTouched('workEmail')}
            aria-required="true"
            aria-invalid={shouldShowError('workEmail')}
            aria-describedby={shouldShowError('workEmail') ? 'workEmail-error' : undefined}
          />
          {shouldShowError('workEmail') && (
            <p id="workEmail-error" className={errorTextClass} role="alert">
              {errors.workEmail}
            </p>
          )}
        </div>

        <div className={fieldWrapperClass}>
          <label className={labelClass} htmlFor="phone">
            Phone Number <span aria-hidden="true">*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            className={fieldClass(shouldShowError('phone'))}
            value={formData.phone}
            onChange={(event) => updateField('phone', event.target.value)}
            onBlur={() => markTouched('phone')}
            aria-required="true"
            aria-invalid={shouldShowError('phone')}
            aria-describedby={shouldShowError('phone') ? 'phone-error' : undefined}
          />
          {shouldShowError('phone') && (
            <p id="phone-error" className={errorTextClass} role="alert">
              {errors.phone}
            </p>
          )}
        </div>

        <div className={fieldWrapperClass}>
          <label className={labelClass} htmlFor="companyName">
            Company Name <span aria-hidden="true">*</span>
          </label>
          <input
            id="companyName"
            name="companyName"
            type="text"
            className={fieldClass(shouldShowError('companyName'))}
            value={formData.companyName}
            onChange={(event) => updateField('companyName', event.target.value)}
            onBlur={() => markTouched('companyName')}
            aria-required="true"
            aria-invalid={shouldShowError('companyName')}
            aria-describedby={shouldShowError('companyName') ? 'companyName-error' : undefined}
          />
          {shouldShowError('companyName') && (
            <p id="companyName-error" className={errorTextClass} role="alert">
              {errors.companyName}
            </p>
          )}
        </div>

        <div className={fieldWrapperClass}>
          <label className={labelClass} htmlFor="jobTitle">
            Job Title <span aria-hidden="true">*</span>
          </label>
          <input
            id="jobTitle"
            name="jobTitle"
            type="text"
            className={fieldClass(shouldShowError('jobTitle'))}
            value={formData.jobTitle}
            onChange={(event) => updateField('jobTitle', event.target.value)}
            onBlur={() => markTouched('jobTitle')}
            aria-required="true"
            aria-invalid={shouldShowError('jobTitle')}
            aria-describedby={shouldShowError('jobTitle') ? 'jobTitle-error' : undefined}
          />
          {shouldShowError('jobTitle') && (
            <p id="jobTitle-error" className={errorTextClass} role="alert">
              {errors.jobTitle}
            </p>
          )}
        </div>

        <div className={fieldWrapperClass}>
          <label className={labelClass} htmlFor="country">
            Country <span aria-hidden="true">*</span>
          </label>
          <select
            id="country"
            name="country"
            className={fieldClass(shouldShowError('country'))}
            value={formData.country}
            onChange={(event) => updateField('country', event.target.value)}
            onBlur={() => markTouched('country')}
            aria-required="true"
            aria-invalid={shouldShowError('country')}
            aria-describedby={shouldShowError('country') ? 'country-error' : undefined}
          >
            <option value="">Select a country</option>
            {COUNTRY_OPTIONS.map((option) => (
              <option key={option.code} value={option.code}>
                {option.name}
              </option>
            ))}
          </select>
          {shouldShowError('country') && (
            <p id="country-error" className={errorTextClass} role="alert">
              {errors.country}
            </p>
          )}
        </div>

        <div className={fieldWrapperClass}>
          <label className={labelClass} htmlFor="companySize">
            Company Size <span aria-hidden="true">*</span>
          </label>
          <select
            id="companySize"
            name="companySize"
            className={fieldClass(shouldShowError('companySize'))}
            value={formData.companySize}
            onChange={(event) =>
              updateField('companySize', event.target.value as RequestDemoFormData['companySize'])
            }
            onBlur={() => markTouched('companySize')}
            aria-required="true"
            aria-invalid={shouldShowError('companySize')}
            aria-describedby={shouldShowError('companySize') ? 'companySize-error' : undefined}
          >
            <option value="">Select company size</option>
            {COMPANY_SIZE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {shouldShowError('companySize') && (
            <p id="companySize-error" className={errorTextClass} role="alert">
              {errors.companySize}
            </p>
          )}
        </div>

        <div className={fieldWrapperClass}>
          <label className={labelClass} htmlFor="timeline">
            Project Timeline <span aria-hidden="true">*</span>
          </label>
          <select
            id="timeline"
            name="timeline"
            className={fieldClass(shouldShowError('timeline'))}
            value={formData.timeline}
            onChange={(event) =>
              updateField('timeline', event.target.value as RequestDemoFormData['timeline'])
            }
            onBlur={() => markTouched('timeline')}
            aria-required="true"
            aria-invalid={shouldShowError('timeline')}
            aria-describedby={shouldShowError('timeline') ? 'timeline-error' : undefined}
          >
            <option value="">Select a timeline</option>
            {TIMELINE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {shouldShowError('timeline') && (
            <p id="timeline-error" className={errorTextClass} role="alert">
              {errors.timeline}
            </p>
          )}
        </div>

        <div className={fieldWrapperClass}>
          <label className={labelClass} htmlFor="budgetRange">
            Budget Range
          </label>
          <select
            id="budgetRange"
            name="budgetRange"
            className={inputClass}
            value={formData.budgetRange}
            onChange={(event) =>
              updateField(
                'budgetRange',
                event.target.value as RequestDemoFormData['budgetRange'],
              )
            }
          >
            <option value="">Select a budget range</option>
            {BUDGET_RANGE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className={fieldWrapperClass}>
          <label className={labelClass} htmlFor="preferredDemoAt">
            Preferred Demo Date/Time
          </label>
          <input
            id="preferredDemoAt"
            name="preferredDemoAt"
            type="datetime-local"
            className={inputClass}
            value={formData.preferredDemoAt}
            onChange={(event) => updateField('preferredDemoAt', event.target.value)}
          />
        </div>

        <div className={fieldWrapperClass}>
          <label className={labelClass} htmlFor="message">
            Message / Requirements
          </label>
          <textarea
            id="message"
            name="message"
            maxLength={1000}
            rows={4}
            className={inputClass}
            value={formData.message}
            onChange={(event) => updateField('message', event.target.value)}
          />
        </div>

        <div className={fieldWrapperClass}>
          <label className={labelClass} htmlFor="referralSource">
            How did you hear about us?
          </label>
          <select
            id="referralSource"
            name="referralSource"
            className={inputClass}
            value={formData.referralSource}
            onChange={(event) =>
              updateField(
                'referralSource',
                event.target.value as RequestDemoFormData['referralSource'],
              )
            }
          >
            <option value="">Select an option</option>
            {REFERRAL_SOURCE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="flex items-start gap-2 text-sm text-slate-700">
            <input
              id="consent"
              name="consent"
              type="checkbox"
              className={`${checkboxClass} mt-0.5`}
              checked={formData.consent}
              onChange={(event) => updateField('consent', event.target.checked)}
              onBlur={() => markTouched('consent')}
              aria-required="true"
              aria-invalid={shouldShowError('consent')}
              aria-describedby={shouldShowError('consent') ? 'consent-error' : undefined}
            />
            I agree to the Privacy Policy and consent to being contacted about this request.{' '}
            <span aria-hidden="true">*</span>
          </label>
          {shouldShowError('consent') && (
            <p id="consent-error" className={errorTextClass} role="alert">
              {errors.consent}
            </p>
          )}
        </div>

        <label className="flex items-start gap-2 text-sm text-slate-700">
          <input
            id="marketingOptIn"
            name="marketingOptIn"
            type="checkbox"
            className={`${checkboxClass} mt-0.5`}
            checked={formData.marketingOptIn}
            onChange={(event) => updateField('marketingOptIn', event.target.checked)}
          />
          Keep me updated with product news and offers.
        </label>

        <div className={fieldWrapperClass}>
          <label className={labelClass} htmlFor="customerIndustry">
            Customer Industry
          </label>
          <select
            id="customerIndustry"
            name="customerIndustry"
            className={inputClass}
            value={formData.customerIndustry}
            onChange={(event) =>
              updateField(
                'customerIndustry',
                event.target.value as RequestDemoFormData['customerIndustry'],
              )
            }
          >
            <option value="">Select an industry</option>
            {CUSTOMER_INDUSTRY_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {formData.customerIndustry === 'Other' && (
            <input
              id="customerIndustryOther"
              name="customerIndustryOther"
              type="text"
              placeholder="Please specify"
              className={`${inputClass} mt-2`}
              value={formData.customerIndustryOther}
              onChange={(event) => updateField('customerIndustryOther', event.target.value)}
            />
          )}
        </div>

        <div className={fieldWrapperClass}>
          <label className={labelClass} htmlFor="projectName">
            Project Name
          </label>
          <input
            id="projectName"
            name="projectName"
            type="text"
            maxLength={120}
            className={inputClass}
            value={formData.projectName}
            onChange={(event) => updateField('projectName', event.target.value)}
          />
        </div>

        <div className={fieldWrapperClass}>
          <label className={labelClass} htmlFor="solutionType">
            Solution Type of Interest
          </label>
          <select
            id="solutionType"
            name="solutionType"
            className={inputClass}
            value={formData.solutionType}
            onChange={(event) =>
              updateField(
                'solutionType',
                event.target.value as RequestDemoFormData['solutionType'],
              )
            }
          >
            <option value="">Select a solution type</option>
            {SOLUTION_TYPE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {formData.solutionType === 'Other' && (
            <input
              id="solutionTypeOther"
              name="solutionTypeOther"
              type="text"
              placeholder="Please specify"
              className={`${inputClass} mt-2`}
              value={formData.solutionTypeOther}
              onChange={(event) => updateField('solutionTypeOther', event.target.value)}
            />
          )}
        </div>

        <div className={fieldWrapperClass}>
          <label className={labelClass} htmlFor="currentSituation">
            Current Situation
          </label>
          <textarea
            id="currentSituation"
            name="currentSituation"
            maxLength={2000}
            rows={4}
            className={inputClass}
            value={formData.currentSituation}
            onChange={(event) => updateField('currentSituation', event.target.value)}
          />
        </div>

        <div className={fieldWrapperClass}>
          <label className={labelClass} htmlFor="businessChallenges">
            Business Challenges
          </label>
          <textarea
            id="businessChallenges"
            name="businessChallenges"
            maxLength={2000}
            rows={4}
            className={inputClass}
            value={formData.businessChallenges}
            onChange={(event) => updateField('businessChallenges', event.target.value)}
          />
        </div>

        <div className={fieldWrapperClass}>
          <label className={labelClass} htmlFor="objectives">
            Objectives
          </label>
          <textarea
            id="objectives"
            name="objectives"
            maxLength={2000}
            rows={4}
            className={inputClass}
            value={formData.objectives}
            onChange={(event) => updateField('objectives', event.target.value)}
          />
        </div>

        <fieldset id="integrationsNeeded" className={fieldWrapperClass}>
          <legend className={labelClass}>Integrations Needed</legend>
          <div className="mt-1 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {INTEGRATIONS_NEEDED_OPTIONS.map((option) => (
              <label key={option} className="flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  className={checkboxClass}
                  checked={formData.integrationsNeeded.includes(option as IntegrationNeeded)}
                  onChange={() => toggleIntegrationNeeded(option as IntegrationNeeded)}
                />
                {option}
              </label>
            ))}
          </div>
          {formData.integrationsNeeded.includes('Other') && (
            <input
              id="integrationsNeededOther"
              name="integrationsNeededOther"
              type="text"
              placeholder="Please specify"
              className={`${inputClass} mt-2`}
              value={formData.integrationsNeededOther}
              onChange={(event) => updateField('integrationsNeededOther', event.target.value)}
            />
          )}
        </fieldset>

        <fieldset id="specialRequirements" className={fieldWrapperClass}>
          <legend className={labelClass}>Special Requirements</legend>
          <div className="mt-1 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {SPECIAL_REQUIREMENTS_OPTIONS.map((option) => (
              <label key={option} className="flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  className={checkboxClass}
                  checked={formData.specialRequirements.includes(option as SpecialRequirement)}
                  onChange={() => toggleSpecialRequirement(option as SpecialRequirement)}
                />
                {option}
              </label>
            ))}
          </div>
          {formData.specialRequirements.includes('Other') && (
            <input
              id="specialRequirementsOther"
              name="specialRequirementsOther"
              type="text"
              placeholder="Please specify"
              className={`${inputClass} mt-2`}
              value={formData.specialRequirementsOther}
              onChange={(event) => updateField('specialRequirementsOther', event.target.value)}
            />
          )}
        </fieldset>

        <div aria-hidden="true" className="absolute h-px w-px overflow-hidden opacity-0">
          <label htmlFor="_gotcha">Leave this field empty</label>
          <input
            id="_gotcha"
            name="_gotcha"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(event) => setHoneypot(event.target.value)}
          />
        </div>

        <input type="hidden" name="_subject" value={DEMO_REQUEST_SUBJECT} />
        <input type="hidden" name="utm_source" value={utm.utm_source ?? ''} />
        <input type="hidden" name="utm_medium" value={utm.utm_medium ?? ''} />
        <input type="hidden" name="utm_campaign" value={utm.utm_campaign ?? ''} />

        <button
          type="submit"
          aria-disabled={!isValid || isSubmitting}
          disabled={isSubmitting}
          className={
            isValid
              ? 'rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50'
              : 'rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white opacity-50'
          }
        >
          {isSubmitting ? 'Sending...' : 'Request Demo'}
        </button>
      </form>
    </section>
  )
}

