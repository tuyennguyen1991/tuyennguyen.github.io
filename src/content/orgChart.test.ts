import { describe, expect, it } from 'vitest'
import { company, departments } from './orgChart'

describe('orgChart company', () => {
  it('has a non-empty SMART Objective and headcount summary', () => {
    expect(company.smartObjective.length).toBeGreaterThan(0)
    expect(company.name.length).toBeGreaterThan(0)
    expect(company.totalHeadcount.length).toBeGreaterThan(0)
  })
})

describe('orgChart departments', () => {
  it('has exactly 5 departments with unique ids', () => {
    expect(departments.length).toBe(5)
    const ids = departments.map((d) => d.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('has a mission, at least one key result, and a multi-stage value stream for every department', () => {
    departments.forEach((dept) => {
      expect(dept.mission.length).toBeGreaterThan(0)
      expect(dept.keyResults.length).toBeGreaterThan(0)
      expect(dept.valueStream.length).toBeGreaterThan(1)
    })
  })

  it('has a positive total headcount and at least one direct-report role for every department', () => {
    departments.forEach((dept) => {
      expect(dept.totalHeadcount).toBeGreaterThan(0)
      expect(dept.roles.length).toBeGreaterThan(0)
    })
  })

  it('has non-empty title, positive headcount, and kpi text for every role and nested sub-role', () => {
    function checkRole(role: (typeof departments)[number]['roles'][number]) {
      expect(role.title.length).toBeGreaterThan(0)
      expect(role.headcount).toBeGreaterThan(0)
      expect(role.kpi.length).toBeGreaterThan(0)
      role.children?.forEach(checkRole)
    }

    departments.forEach((dept) => dept.roles.forEach(checkRole))
  })

  it('sums department headcounts (recommended) to 41, matching the enterprise overview total', () => {
    const total = departments.reduce((sum, dept) => sum + dept.totalHeadcount, 0)
    expect(total).toBe(41)
  })
})
