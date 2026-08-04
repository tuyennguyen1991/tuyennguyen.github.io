import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { BlogPage } from './BlogPage'
import { articles } from '../content/articles'
import { businessDomains } from '../content/businessDomains'

function renderPage() {
  return render(<BlogPage />, { wrapper: MemoryRouter })
}

describe('BlogPage', () => {
  it('renders every article with title, date, and summary', () => {
    renderPage()
    articles.forEach((article) => {
      expect(screen.getByRole('link', { name: article.title })).toBeInTheDocument()
      expect(screen.getByText(article.summary)).toBeInTheDocument()
    })
  })

  it('links each article title to its own internal blog detail route', () => {
    renderPage()
    articles.forEach((article) => {
      const link = screen.getByRole('link', { name: article.title })
      expect(link).toHaveAttribute('href', `/blog/${article.id}`)
    })
  })

  it('shows the business domain name for every article', () => {
    renderPage()
    articles.forEach((article) => {
      const domain = businessDomains.find((d) => d.id === article.domain)
      expect(domain).toBeDefined()
      expect(screen.getAllByText(domain!.name).length).toBeGreaterThan(0)
    })
  })

  it('provides a link back to the homepage', () => {
    renderPage()
    expect(screen.getByRole('link', { name: /back to home/i })).toHaveAttribute('href', '/')
  })
})
