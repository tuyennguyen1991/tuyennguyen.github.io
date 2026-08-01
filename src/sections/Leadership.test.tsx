import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Leadership } from './Leadership'
import { career } from '../content/career'

describe('career data', () => {
  it('has non-empty required fields for every entry', () => {
    career.forEach((entry) => {
      expect(entry.role).not.toBe('')
      expect(entry.organization).not.toBe('')
      expect(entry.startDate).not.toBe('')
      expect(entry.endDate).not.toBe('')
      expect(entry.scope).not.toBe('')
      expect(entry.highlights.length).toBeGreaterThan(0)
    })
  })
})

describe('Leadership', () => {
  it('renders every career entry with role, organization, and scope', () => {
    render(<Leadership />)
    career.forEach((entry) => {
      expect(screen.getByRole('heading', { name: entry.role })).toBeInTheDocument()
      expect(screen.getByText(entry.organization)).toBeInTheDocument()
      expect(screen.getByText(entry.scope)).toBeInTheDocument()
    })
  })

  it('renders entries in reverse-chronological order', () => {
    render(<Leadership />)
    const headings = screen.getAllByRole('heading', { level: 3 }).map((el) => el.textContent)
    expect(headings).toEqual(career.map((entry) => entry.role))
  })
})
