import { useState } from 'react'
import {
  BUDGET_RANGE_OPTIONS,
  COMPANY_SIZE_OPTIONS,
  COUNTRY_OPTIONS,
  CURRENT_PLATFORM_OPTIONS,
  DATA_VOLUME_OPTIONS,
  REFERRAL_SOURCE_OPTIONS,
  TIMELINE_OPTIONS,
  USE_CASE_OPTIONS,
  type RequestDemoFormData,
  type UseCase,
} from '../content/requestDemo'

const initialFormData: RequestDemoFormData = {
  fullName: '',
  workEmail: '',
  phone: '',
  companyName: '',
  jobTitle: '',
  country: '',
  companySize: '',
  currentPlatform: '',
  currentPlatformOther: '',
  dataVolume: '',
  useCases: [],
  timeline: '',
  budgetRange: '',
  preferredDemoAt: '',
  message: '',
  referralSource: '',
  marketingOptIn: false,
  consent: false,
}

const labelClass = 'block text-sm font-medium text-slate-700'
const inputClass =
  'mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-blue-600 focus:outline-none'
const checkboxClass = 'h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-600'
const fieldWrapperClass = 'flex flex-col'

export function RequestDemo() {
  const [formData, setFormData] = useState<RequestDemoFormData>(initialFormData)

  function updateField<K extends keyof RequestDemoFormData>(
    field: K,
    value: RequestDemoFormData[K],
  ) {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  function toggleUseCase(useCase: UseCase) {
    setFormData((prev) => ({
      ...prev,
      useCases: prev.useCases.includes(useCase)
        ? prev.useCases.filter((existing) => existing !== useCase)
        : [...prev.useCases, useCase],
    }))
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
  }

  return (
    <section id="request-demo" className="mx-auto max-w-3xl px-6 py-20">
      <h2 className="text-3xl font-semibold text-slate-900">Request a Demo</h2>
      <p className="mt-4 text-slate-600">
        Tell us about your database needs and a specialist will follow up to schedule your demo.
      </p>
      <form onSubmit={handleSubmit} className="mt-10 space-y-6" noValidate>
        <div className={fieldWrapperClass}>
          <label className={labelClass} htmlFor="fullName">
            Full Name
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            className={inputClass}
            value={formData.fullName}
            onChange={(event) => updateField('fullName', event.target.value)}
          />
        </div>

        <div className={fieldWrapperClass}>
          <label className={labelClass} htmlFor="workEmail">
            Work Email
          </label>
          <input
            id="workEmail"
            name="workEmail"
            type="email"
            className={inputClass}
            value={formData.workEmail}
            onChange={(event) => updateField('workEmail', event.target.value)}
          />
        </div>

        <div className={fieldWrapperClass}>
          <label className={labelClass} htmlFor="phone">
            Phone Number
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            className={inputClass}
            value={formData.phone}
            onChange={(event) => updateField('phone', event.target.value)}
          />
        </div>

        <div className={fieldWrapperClass}>
          <label className={labelClass} htmlFor="companyName">
            Company Name
          </label>
          <input
            id="companyName"
            name="companyName"
            type="text"
            className={inputClass}
            value={formData.companyName}
            onChange={(event) => updateField('companyName', event.target.value)}
          />
        </div>

        <div className={fieldWrapperClass}>
          <label className={labelClass} htmlFor="jobTitle">
            Job Title
          </label>
          <input
            id="jobTitle"
            name="jobTitle"
            type="text"
            className={inputClass}
            value={formData.jobTitle}
            onChange={(event) => updateField('jobTitle', event.target.value)}
          />
        </div>

        <div className={fieldWrapperClass}>
          <label className={labelClass} htmlFor="country">
            Country
          </label>
          <select
            id="country"
            name="country"
            className={inputClass}
            value={formData.country}
            onChange={(event) => updateField('country', event.target.value)}
          >
            <option value="">Select a country</option>
            {COUNTRY_OPTIONS.map((option) => (
              <option key={option.code} value={option.code}>
                {option.name}
              </option>
            ))}
          </select>
        </div>

        <div className={fieldWrapperClass}>
          <label className={labelClass} htmlFor="companySize">
            Company Size
          </label>
          <select
            id="companySize"
            name="companySize"
            className={inputClass}
            value={formData.companySize}
            onChange={(event) =>
              updateField('companySize', event.target.value as RequestDemoFormData['companySize'])
            }
          >
            <option value="">Select company size</option>
            {COMPANY_SIZE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className={fieldWrapperClass}>
          <label className={labelClass} htmlFor="currentPlatform">
            Current Database / Platform
          </label>
          <select
            id="currentPlatform"
            name="currentPlatform"
            className={inputClass}
            value={formData.currentPlatform}
            onChange={(event) =>
              updateField(
                'currentPlatform',
                event.target.value as RequestDemoFormData['currentPlatform'],
              )
            }
          >
            <option value="">Select current platform</option>
            {CURRENT_PLATFORM_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {formData.currentPlatform === 'Other' && (
            <input
              id="currentPlatformOther"
              name="currentPlatformOther"
              type="text"
              placeholder="Please specify"
              className={`${inputClass} mt-2`}
              value={formData.currentPlatformOther}
              onChange={(event) => updateField('currentPlatformOther', event.target.value)}
            />
          )}
        </div>

        <div className={fieldWrapperClass}>
          <label className={labelClass} htmlFor="dataVolume">
            Data Volume (approx.)
          </label>
          <select
            id="dataVolume"
            name="dataVolume"
            className={inputClass}
            value={formData.dataVolume}
            onChange={(event) =>
              updateField('dataVolume', event.target.value as RequestDemoFormData['dataVolume'])
            }
          >
            <option value="">Select data volume</option>
            {DATA_VOLUME_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <fieldset className={fieldWrapperClass}>
          <legend className={labelClass}>Primary Use Case / Interest</legend>
          <div className="mt-1 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {USE_CASE_OPTIONS.map((option) => (
              <label key={option} className="flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  className={checkboxClass}
                  checked={formData.useCases.includes(option)}
                  onChange={() => toggleUseCase(option)}
                />
                {option}
              </label>
            ))}
          </div>
        </fieldset>

        <div className={fieldWrapperClass}>
          <label className={labelClass} htmlFor="timeline">
            Project Timeline
          </label>
          <select
            id="timeline"
            name="timeline"
            className={inputClass}
            value={formData.timeline}
            onChange={(event) =>
              updateField('timeline', event.target.value as RequestDemoFormData['timeline'])
            }
          >
            <option value="">Select a timeline</option>
            {TIMELINE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
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

        <label className="flex items-start gap-2 text-sm text-slate-700">
          <input
            id="consent"
            name="consent"
            type="checkbox"
            className={`${checkboxClass} mt-0.5`}
            checked={formData.consent}
            onChange={(event) => updateField('consent', event.target.checked)}
          />
          I agree to the Privacy Policy and consent to being contacted about this request.
        </label>

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

        <button
          type="submit"
          className="rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Request Demo
        </button>
      </form>
    </section>
  )
}

