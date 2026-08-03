import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { Nav } from './Nav'
import { navItems } from '../content/navigation'

describe('Nav', () => {
  it('renders a link for every core section', () => {
    render(<Nav />, { wrapper: MemoryRouter })
    navItems.forEach((item) => {
      expect(screen.getByRole('link', { name: item.label })).toHaveAttribute(
        'href',
        `#${item.id}`,
      )
    })
  })

  it('renders a Resume CTA that opens in a new tab', () => {
    render(<Nav />, { wrapper: MemoryRouter })
    const resumeLink = screen.getByRole('link', { name: /resume/i })
    expect(resumeLink).toHaveAttribute('target', '_blank')
    expect(resumeLink).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('renders an Org Chart link', () => {
    render(<Nav />, { wrapper: MemoryRouter })
    expect(screen.getByRole('link', { name: 'Org Chart' })).toHaveAttribute('href', '/org-chart')
  })
})
