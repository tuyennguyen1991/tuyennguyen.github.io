import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { RequestDemo } from './RequestDemo'

function fillRequiredFields() {
  fireEvent.change(screen.getByLabelText('Full Name'), { target: { value: 'Jane Doe' } })
  fireEvent.change(screen.getByLabelText('Work Email'), { target: { value: 'jane@acme.com' } })
  fireEvent.change(screen.getByLabelText('Phone Number'), { target: { value: '+14155551234' } })
  fireEvent.change(screen.getByLabelText('Company Name'), { target: { value: 'Acme Corp' } })
  fireEvent.change(screen.getByLabelText('Job Title'), { target: { value: 'Engineer' } })
  fireEvent.change(screen.getByLabelText('Country'), { target: { value: 'US' } })
  fireEvent.change(screen.getByLabelText('Company Size'), { target: { value: '1-50' } })
  fireEvent.click(screen.getByRole('checkbox', { name: 'Data migration' }))
  fireEvent.change(screen.getByLabelText('Project Timeline'), { target: { value: 'researching' } })
  fireEvent.click(
    screen.getByRole('checkbox', {
      name: 'I agree to the Privacy Policy and consent to being contacted about this request.',
    }),
  )
}

function submitForm() {
  fireEvent.submit(screen.getByRole('button', { name: 'Request Demo' }).closest('form')!)
}

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

  it('renders the honeypot field empty and visually hidden', () => {
    const { container } = render(<RequestDemo />)
    const honeypot = container.querySelector<HTMLInputElement>('input[name="_gotcha"]')
    expect(honeypot).not.toBeNull()
    expect(honeypot).toHaveValue('')
    expect(honeypot?.parentElement).toHaveAttribute('aria-hidden', 'true')
  })

  it('renders the static _subject hidden field', () => {
    const { container } = render(<RequestDemo />)
    const subject = container.querySelector<HTMLInputElement>('input[name="_subject"]')
    expect(subject).toHaveValue('New Demo Request')
  })

  it('captures UTM parameters from the URL on mount', () => {
    window.history.pushState({}, '', '/?utm_source=google&utm_medium=cpc&utm_campaign=demo')
    const { container } = render(<RequestDemo />)
    expect(container.querySelector<HTMLInputElement>('input[name="utm_source"]')).toHaveValue(
      'google',
    )
    expect(container.querySelector<HTMLInputElement>('input[name="utm_medium"]')).toHaveValue(
      'cpc',
    )
    expect(container.querySelector<HTMLInputElement>('input[name="utm_campaign"]')).toHaveValue(
      'demo',
    )
    window.history.pushState({}, '', '/')
  })

  describe('submission', () => {
    afterEach(() => {
      vi.unstubAllGlobals()
    })

    it('POSTs to the Formspree endpoint with the computed lead score/grade and shows the confirmation on success', async () => {
      const fetchMock = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({ ok: true }),
      })
      vi.stubGlobal('fetch', fetchMock)

      render(<RequestDemo />)
      fillRequiredFields()
      submitForm()

      await waitFor(() =>
        expect(screen.getByText(/Your request has been received/)).toBeInTheDocument(),
      )

      expect(fetchMock).toHaveBeenCalledTimes(1)
      const [url, options] = fetchMock.mock.calls[0]
      expect(url).toBe('https://formspree.io/f/mlgqyaql')
      expect(options.headers).toMatchObject({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      })
      const body = JSON.parse(options.body)
      expect(body.leadScore).toBe(0)
      expect(body.leadGrade).toBe('cold')
      expect(body._gotcha).toBe('')
    })

    it('shows a loading state while the request is in flight', async () => {
      let resolveFetch!: (value: unknown) => void
      const fetchMock = vi.fn(
        () =>
          new Promise((resolve) => {
            resolveFetch = resolve
          }),
      )
      vi.stubGlobal('fetch', fetchMock)

      render(<RequestDemo />)
      fillRequiredFields()
      submitForm()

      expect(await screen.findByRole('button', { name: 'Sending...' })).toBeDisabled()

      resolveFetch({ ok: true, status: 200, json: async () => ({ ok: true }) })
      await waitFor(() =>
        expect(screen.getByText(/Your request has been received/)).toBeInTheDocument(),
      )
    })

    it('shows a non-blocking error banner and preserves entered data on a 422 response', async () => {
      const fetchMock = vi.fn().mockResolvedValue({
        ok: false,
        status: 422,
        json: async () => ({ errors: [{ field: 'workEmail', message: 'Invalid email address' }] }),
      })
      vi.stubGlobal('fetch', fetchMock)

      render(<RequestDemo />)
      fillRequiredFields()
      submitForm()

      expect(await screen.findByText('Invalid email address')).toBeInTheDocument()
      expect(screen.getByLabelText('Full Name')).toHaveValue('Jane Doe')
    })

    it('shows a retry-safe error banner with a fallback email on a network failure', async () => {
      const fetchMock = vi.fn().mockRejectedValue(new TypeError('Network request failed'))
      vi.stubGlobal('fetch', fetchMock)

      render(<RequestDemo />)
      fillRequiredFields()
      submitForm()

      expect(await screen.findByText(/couldn't reach our server/)).toBeInTheDocument()
      expect(screen.getByLabelText('Full Name')).toHaveValue('Jane Doe')
    })
  })
})

