import { describe, expect, it } from 'vitest'
import { businessDomains } from './businessDomains'
import { articles } from './articles'

describe('businessDomains', () => {
  it('has a non-empty id, name, and description for every domain', () => {
    businessDomains.forEach((domain) => {
      expect(domain.id.length).toBeGreaterThan(0)
      expect(domain.name.length).toBeGreaterThan(0)
      expect(domain.description.length).toBeGreaterThan(0)
    })
  })

  it('has unique ids', () => {
    const ids = businessDomains.map((domain) => domain.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('has unique names', () => {
    const names = businessDomains.map((domain) => domain.name)
    expect(new Set(names).size).toBe(names.length)
  })

  it('covers every domain referenced by an article', () => {
    const domainIds = new Set(businessDomains.map((domain) => domain.id))
    articles.forEach((article) => {
      expect(domainIds.has(article.domain)).toBe(true)
    })
  })

  it('has at least ten domains, reflecting the breadth of engagement types covered', () => {
    expect(businessDomains.length).toBeGreaterThanOrEqual(10)
  })
})
