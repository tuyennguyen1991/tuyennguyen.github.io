import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { AIInitiatives } from './AIInitiatives'
import { projects } from '../content/projects'

const aiProjects = projects.filter((project) => project.category === 'ai-automation')

describe('AIInitiatives', () => {
  it('renders at least 2 AI/automation projects', () => {
    expect(aiProjects.length).toBeGreaterThanOrEqual(2)
    render(<AIInitiatives />)
    aiProjects.forEach((project) => {
      expect(screen.getByRole('heading', { name: project.title })).toBeInTheDocument()
    })
  })

  it('has its own nav anchor distinct from Projects', () => {
    const { container } = render(<AIInitiatives />)
    expect(container.querySelector('#ai-initiatives')).toBeInTheDocument()
  })
})
