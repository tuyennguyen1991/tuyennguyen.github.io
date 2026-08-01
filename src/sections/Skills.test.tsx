import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Skills } from './Skills'
import { skillCategories } from '../content/skills'
import { certifications } from '../content/certifications'

describe('Skills', () => {
  it('groups skills by category', () => {
    render(<Skills />)
    skillCategories.forEach((group) => {
      expect(screen.getByRole('heading', { name: group.category })).toBeInTheDocument()
      group.skills.forEach((skill) => {
        expect(screen.getByText(skill)).toBeInTheDocument()
      })
    })
  })

  it('shows certification name, issuer, and date', () => {
    render(<Skills />)
    certifications.forEach((cert) => {
      expect(screen.getByText(cert.name)).toBeInTheDocument()
      expect(screen.getByText(new RegExp(cert.issuer))).toBeInTheDocument()
    })
  })
})
