import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Blog } from './Blog'
import { articles } from '../content/articles'

describe('Blog', () => {
  it('renders every article with title, date, and summary', () => {
    render(<Blog />)
    articles.forEach((article) => {
      expect(screen.getByRole('link', { name: article.title })).toBeInTheDocument()
      expect(screen.getByText(article.summary)).toBeInTheDocument()
    })
  })

  it('opens article links in a new tab', () => {
    render(<Blog />)
    articles.forEach((article) => {
      const link = screen.getByRole('link', { name: article.title })
      expect(link).toHaveAttribute('href', article.url)
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    })
  })
})
