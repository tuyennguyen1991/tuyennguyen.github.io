import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Projects } from './Projects'
import { projects } from '../content/projects'

const architectureProjects = projects.filter((project) => project.category === 'architecture')

describe('projects data', () => {
  it('has at least 3 architecture projects with required fields', () => {
    expect(architectureProjects.length).toBeGreaterThanOrEqual(3)
    architectureProjects.forEach((project) => {
      expect(project.businessImpact).not.toBe('')
      expect(project.technicalComplexity).not.toBe('')
      expect(project.leadershipNote).not.toBe('')
    })
  })
})

describe('Projects', () => {
  it('renders every architecture project with business impact, complexity, and leadership note', () => {
    render(<Projects />)
    architectureProjects.forEach((project) => {
      expect(screen.getByRole('heading', { name: project.title })).toBeInTheDocument()
      expect(screen.getByText(project.businessImpact)).toBeInTheDocument()
      expect(screen.getByText(project.technicalComplexity)).toBeInTheDocument()
      expect(screen.getByText(project.leadershipNote)).toBeInTheDocument()
    })
  })

  it('opens external project links in a new tab', () => {
    render(<Projects />)
    const linked = architectureProjects.find((project) => project.links?.length)
    if (linked?.links) {
      const link = screen.getByRole('link', { name: linked.links[0].label })
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    }
  })
})
