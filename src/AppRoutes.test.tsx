import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { AppRoutes } from './AppRoutes'

describe('AppRoutes', () => {
  it('renders the homepage sections at "/"', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <AppRoutes />
      </MemoryRouter>,
    )
    expect(document.getElementById('hero')).toBeInTheDocument()
    expect(document.getElementById('blog')).toBeInTheDocument()
  })

  it('renders an article detail page at "/blog/:articleId"', () => {
    render(
      <MemoryRouter initialEntries={['/blog/scaling-event-driven-systems']}>
        <AppRoutes />
      </MemoryRouter>,
    )
    expect(
      screen.getByRole('heading', { name: 'Scaling Event-Driven Systems: Lessons from Production' }),
    ).toBeInTheDocument()
  })

  it('renders a not-found page for unknown routes', () => {
    render(
      <MemoryRouter initialEntries={['/nope']}>
        <AppRoutes />
      </MemoryRouter>,
    )
    expect(screen.getByText(/page not found/i)).toBeInTheDocument()
  })
})
