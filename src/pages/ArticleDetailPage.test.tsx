import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { ArticleDetailPage } from './ArticleDetailPage'
import { articles } from '../content/articles'
import { businessDomains } from '../content/businessDomains'

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/blog/:articleId" element={<ArticleDetailPage />} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('ArticleDetailPage', () => {
  it('renders the title, date, domain, tags, and rendered body for a valid article', () => {
    const article = articles[0]
    const domain = businessDomains.find((d) => d.id === article.domain)!

    renderAt(`/blog/${article.id}`)

    expect(screen.getByRole('heading', { name: article.title })).toBeInTheDocument()
    expect(screen.getByText(domain.name)).toBeInTheDocument()
    article.tags.forEach((tag) => {
      expect(screen.getByText(tag)).toBeInTheDocument()
    })
  })

  it('provides a link back to the blog list', () => {
    const article = articles[0]
    renderAt(`/blog/${article.id}`)

    expect(screen.getByRole('link', { name: /back to blog/i })).toHaveAttribute('href', '/blog')
  })

  it('shows a not-found message for an unknown article id', () => {
    renderAt('/blog/does-not-exist')

    expect(screen.getByText(/article not found/i)).toBeInTheDocument()
  })
})
