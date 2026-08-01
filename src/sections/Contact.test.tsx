import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Contact } from './Contact'
import { profile } from '../content/profile'

describe('Contact', () => {
  it('renders every professional link with correct href behavior', () => {
    render(<Contact />)
    profile.socials.forEach((social) => {
      const link = screen.getByRole('link', { name: social.label })
      expect(link).toHaveAttribute('href', social.url)
      if (social.external) {
        expect(link).toHaveAttribute('target', '_blank')
      } else {
        expect(link).not.toHaveAttribute('target')
      }
    })
  })

  it('makes the resume reachable from this section', () => {
    render(<Contact />)
    expect(screen.getByRole('link', { name: 'Resume' })).toHaveAttribute(
      'href',
      profile.resumeUrl,
    )
  })
})
