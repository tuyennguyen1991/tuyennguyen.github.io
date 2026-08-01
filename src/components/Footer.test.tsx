import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Footer } from './Footer'
import { profile } from '../content/profile'

describe('Footer', () => {
  it('renders every social link with correct target attributes', () => {
    render(<Footer />)
    profile.socials.forEach((social) => {
      const link = screen.getByRole('link', { name: social.label })
      expect(link).toHaveAttribute('href', social.url)
      if (social.external) {
        expect(link).toHaveAttribute('target', '_blank')
        expect(link).toHaveAttribute('rel', 'noopener noreferrer')
      } else {
        expect(link).not.toHaveAttribute('target')
      }
    })
  })

  it('renders a Resume link', () => {
    render(<Footer />)
    expect(screen.getByRole('link', { name: 'Resume' })).toHaveAttribute(
      'href',
      profile.resumeUrl,
    )
  })
})
