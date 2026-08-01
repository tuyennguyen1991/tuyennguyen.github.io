import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Nav } from './Nav'
import { navItems } from '../content/navigation'

describe('Nav', () => {
  it('renders a link for every core section', () => {
    render(<Nav />)
    navItems.forEach((item) => {
      expect(screen.getByRole('link', { name: item.label })).toHaveAttribute(
        'href',
        `#${item.id}`,
      )
    })
  })

  it('renders a Resume CTA that opens in a new tab', () => {
    render(<Nav />)
    const resumeLink = screen.getByRole('link', { name: /resume/i })
    expect(resumeLink).toHaveAttribute('target', '_blank')
    expect(resumeLink).toHaveAttribute('rel', 'noopener noreferrer')
  })
})
