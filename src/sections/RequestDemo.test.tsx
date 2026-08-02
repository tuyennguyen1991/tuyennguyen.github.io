import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { RequestDemo } from './RequestDemo'

describe('RequestDemo', () => {
  it('renders the section with heading', () => {
    render(<RequestDemo />)
    expect(screen.getByRole('heading', { name: 'Request a Demo' })).toBeInTheDocument()
  })

  it('renders every required text/email/tel field with a label', () => {
    render(<RequestDemo />)
    expect(screen.getByLabelText('Full Name')).toBeInTheDocument()
    expect(screen.getByLabelText('Work Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Phone Number')).toBeInTheDocument()
    expect(screen.getByLabelText('Company Name')).toBeInTheDocument()
    expect(screen.getByLabelText('Job Title')).toBeInTheDocument()
  })

  it('renders every select field with a label', () => {
    render(<RequestDemo />)
    expect(screen.getByLabelText('Country')).toBeInTheDocument()
    expect(screen.getByLabelText('Company Size')).toBeInTheDocument()
    expect(screen.getByLabelText('Current Database / Platform')).toBeInTheDocument()
    expect(screen.getByLabelText('Data Volume (approx.)')).toBeInTheDocument()
    expect(screen.getByLabelText('Project Timeline')).toBeInTheDocument()
    expect(screen.getByLabelText('Budget Range')).toBeInTheDocument()
    expect(screen.getByLabelText('How did you hear about us?')).toBeInTheDocument()
  })

  it('renders the use case checkbox group', () => {
    render(<RequestDemo />)
    expect(screen.getByText('Primary Use Case / Interest')).toBeInTheDocument()
    expect(screen.getByRole('checkbox', { name: 'Data migration' })).toBeInTheDocument()
  })

  it('renders remaining fields and checkboxes', () => {
    render(<RequestDemo />)
    expect(screen.getByLabelText('Preferred Demo Date/Time')).toBeInTheDocument()
    expect(screen.getByLabelText('Message / Requirements')).toBeInTheDocument()
    expect(
      screen.getByRole('checkbox', {
        name: 'I agree to the Privacy Policy and consent to being contacted about this request.',
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('checkbox', { name: 'Keep me updated with product news and offers.' }),
    ).toBeInTheDocument()
  })

  it('renders the submit button', () => {
    render(<RequestDemo />)
    expect(screen.getByRole('button', { name: 'Request Demo' })).toBeInTheDocument()
  })

  it('shows an inline error and focuses the first invalid field when submitted empty', () => {
    render(<RequestDemo />)
    fireEvent.submit(screen.getByRole('button', { name: 'Request Demo' }).closest('form')!)
    expect(screen.getByLabelText('Full Name')).toHaveFocus()
    expect(screen.getByLabelText('Full Name')).toHaveAttribute('aria-invalid', 'true')
  })

  it('shows the exact spec error message for a blocklisted free-email domain', () => {
    render(<RequestDemo />)
    const emailInput = screen.getByLabelText('Work Email')
    fireEvent.change(emailInput, { target: { value: 'jane@gmail.com' } })
    fireEvent.blur(emailInput)
    expect(screen.getByText('Please use your company email address.')).toBeInTheDocument()
  })

  it('blocks submit and shows an error when consent is unchecked', () => {
    render(<RequestDemo />)
    const consentCheckbox = screen.getByRole('checkbox', {
      name: 'I agree to the Privacy Policy and consent to being contacted about this request.',
    })
    expect(consentCheckbox).not.toBeChecked()
    fireEvent.submit(screen.getByRole('button', { name: 'Request Demo' }).closest('form')!)
    expect(screen.getByText('You must agree before submitting.')).toBeInTheDocument()
  })

  it('shows an error when zero use cases are selected on submit', () => {
    render(<RequestDemo />)
    fireEvent.submit(screen.getByRole('button', { name: 'Request Demo' }).closest('form')!)
    expect(screen.getByText('Select at least one use case.')).toBeInTheDocument()
  })
})

