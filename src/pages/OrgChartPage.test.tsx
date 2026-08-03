import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { OrgChartPage } from './OrgChartPage'
import { company, departments } from '../content/orgChart'

function renderPage() {
  return render(<OrgChartPage />, { wrapper: MemoryRouter })
}

describe('OrgChartPage', () => {
  it('renders the company node and every department name', () => {
    renderPage()
    expect(screen.getByText(company.name)).toBeInTheDocument()
    departments.forEach((dept) => {
      expect(screen.getAllByText(dept.name).length).toBeGreaterThan(0)
      expect(screen.getByText(dept.headTitle)).toBeInTheDocument()
    })
  })

  it('includes the SMART Objective text for the company hover panel', () => {
    renderPage()
    expect(screen.getByText(company.smartObjective)).toBeInTheDocument()
  })

  it('includes each department\'s key results and value stream for its hover panel, without expanding it', () => {
    const { container } = renderPage()
    departments.forEach((dept) => {
      dept.keyResults.forEach((kr) => {
        expect(container.textContent).toContain(kr.title)
      })
      expect(screen.getByText(dept.valueStream.join(' → '))).toBeInTheDocument()
    })
  })

  it('provides a link back to the homepage', () => {
    renderPage()
    expect(screen.getByRole('link', { name: /back to home/i })).toHaveAttribute('href', '/')
  })

  it('starts every department collapsed, with a "+" toggle and no employee/role cards visible', () => {
    renderPage()
    expect(screen.queryByText('Solution Architect / Delivery Lead')).not.toBeInTheDocument()
    expect(screen.queryByText('Automation Engineer')).not.toBeInTheDocument()
    expect(screen.queryByText('R&D Engineer / AI Specialist')).not.toBeInTheDocument()

    departments.forEach((dept) => {
      const toggle = screen.getByRole('button', { name: `Expand ${dept.name} department` })
      expect(toggle).toHaveAttribute('aria-expanded', 'false')
      expect(toggle).toHaveTextContent('+')
    })
  })

  it('expands a department to reveal only its employees, including nested sub-roles, and updates the toggle', () => {
    renderPage()

    const deliveryToggle = screen.getByRole('button', { name: 'Expand Delivery / Kỹ thuật department' })
    fireEvent.click(deliveryToggle)

    expect(deliveryToggle).toHaveAttribute('aria-expanded', 'true')
    expect(deliveryToggle).toHaveTextContent('−')
    expect(
      screen.getByRole('button', { name: 'Collapse Delivery / Kỹ thuật department' }),
    ).toBeInTheDocument()

    expect(screen.getByText('Delivery Manager')).toBeInTheDocument()
    expect(screen.getByText('Solution Architect / Delivery Lead')).toBeInTheDocument()
    expect(screen.getByText('Automation Engineer')).toBeInTheDocument()

    expect(screen.queryByText('R&D Engineer / AI Specialist')).not.toBeInTheDocument()
    expect(screen.queryByText('HR Business Partner')).not.toBeInTheDocument()

    const rdToggle = screen.getByRole('button', { name: 'Expand R&D / Đổi mới sáng tạo department' })
    expect(rdToggle).toHaveAttribute('aria-expanded', 'false')
  })

  it('collapses an expanded department back down, hiding its employees and reverting the toggle', () => {
    renderPage()

    const toggle = screen.getByRole('button', { name: 'Expand BD / Kinh doanh department' })
    fireEvent.click(toggle)
    expect(screen.getByText('BD Executive – Trong nước')).toBeInTheDocument()

    const collapseToggle = screen.getByRole('button', { name: 'Collapse BD / Kinh doanh department' })
    fireEvent.click(collapseToggle)

    expect(screen.queryByText('BD Executive – Trong nước')).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Expand BD / Kinh doanh department' })).toHaveAttribute(
      'aria-expanded',
      'false',
    )
  })

  it('keeps the hover panel content available for a department that stays collapsed', () => {
    const { container } = renderPage()
    const esg = departments.find((d) => d.id === 'esg')!

    expect(
      screen.getByRole('button', { name: 'Expand ESG / Vận hành Xanh department' }),
    ).toHaveAttribute('aria-expanded', 'false')
    esg.keyResults.forEach((kr) => {
      expect(container.textContent).toContain(kr.title)
    })
    expect(screen.getByText(esg.valueStream.join(' → '))).toBeInTheDocument()
  })
})
