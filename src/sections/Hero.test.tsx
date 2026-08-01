import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Hero } from './Hero'
import { profile } from '../content/profile'

describe('Hero', () => {
  it('renders name, title, and tagline above the fold', () => {
    render(<Hero />)
    expect(screen.getByRole('heading', { name: profile.name })).toBeInTheDocument()
    expect(screen.getByText(profile.title)).toBeInTheDocument()
    expect(screen.getByText(profile.tagline)).toBeInTheDocument()
  })

  it('renders the primary CTAs', () => {
    render(<Hero />)
    expect(screen.getByRole('link', { name: /view projects/i })).toHaveAttribute(
      'href',
      '#projects',
    )
    expect(screen.getByRole('link', { name: /download resume/i })).toHaveAttribute(
      'href',
      profile.resumeUrl,
    )
    expect(screen.getByRole('link', { name: /contact/i })).toHaveAttribute('href', '#contact')
  })
})
