import { describe, expect, it } from 'vitest'
import { businessDomains } from './businessDomains'
import { skillCategories } from './skills'
import { projects } from './projects'

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

  it('is grounded in the real skill categories and project categories already published on the site', () => {
    const skillCategoryNames = skillCategories.map((category) => category.category)
    const projectCategoryIds = new Set(projects.map((project) => project.category))
    const realDomainNames = new Set([
      ...skillCategoryNames,
      ...(projectCategoryIds.has('ai-automation') ? ['AI & Automation'] : []),
    ])

    businessDomains.forEach((domain) => {
      expect(realDomainNames.has(domain.name)).toBe(true)
    })
  })
})
