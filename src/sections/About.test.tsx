import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { About } from './About'
import { profile } from '../content/profile'

describe('About', () => {
  it('renders a background summary of at least two paragraphs', () => {
    render(<About />)
    expect(profile.about.length).toBeGreaterThanOrEqual(2)
    profile.about.forEach((paragraph) => {
      expect(screen.getByText(paragraph)).toBeInTheDocument()
    })
  })

  it('has an id matching the nav anchor', () => {
    const { container } = render(<About />)
    expect(container.querySelector('#about')).toBeInTheDocument()
  })
})
