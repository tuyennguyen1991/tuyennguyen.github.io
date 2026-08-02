import { describe, expect, it } from 'vitest'
import { articles } from './articles'
import { businessDomains } from './businessDomains'

describe('articles', () => {
  it('loads one article per markdown file under content/articles', () => {
    expect(articles.length).toBe(28)
  })

  it('gives every article the required fields sourced from its markdown frontmatter', () => {
    articles.forEach((article) => {
      expect(article.id.length).toBeGreaterThan(0)
      expect(article.title.length).toBeGreaterThan(0)
      expect(article.date.length).toBeGreaterThan(0)
      expect(article.summary.length).toBeGreaterThan(0)
      expect(Array.isArray(article.tags)).toBe(true)
      expect(article.tags.length).toBeGreaterThan(0)
      expect(article.contentHtml.length).toBeGreaterThan(0)
    })
  })

  it('assigns every article a domain that matches a real business domain id', () => {
    const domainIds = businessDomains.map((domain) => domain.id)
    articles.forEach((article) => {
      expect(domainIds).toContain(article.domain)
    })
  })

  it('renders the markdown body to HTML for each article', () => {
    articles.forEach((article) => {
      expect(article.contentHtml).toMatch(/<h2|<p/)
    })
  })

  it('sorts articles by date, newest first', () => {
    for (let i = 0; i < articles.length - 1; i++) {
      const current = new Date(articles[i].date).getTime()
      const next = new Date(articles[i + 1].date).getTime()
      expect(current).toBeGreaterThanOrEqual(next)
    }
  })

  it('has unique ids matching each markdown file slug', () => {
    const ids = articles.map((article) => article.id)
    expect(new Set(ids).size).toBe(ids.length)
  })
})
