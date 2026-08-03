import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Footer } from '../components/Footer'
import { profile } from '../content/profile'
import { company, departments, type Department, type OrgRole } from '../content/orgChart'

function RoleCard({ role }: { role: OrgRole }) {
  return (
    <div className="flex min-w-[180px] flex-col items-center gap-1 rounded-xl border border-slate-200 bg-white px-4 py-3 text-center shadow-sm transition-shadow hover:shadow-md">
      <p className="text-sm font-semibold text-slate-900">{role.title}</p>
      <p className="text-xs text-slate-500">HC: {role.headcount}</p>
      <p className="text-xs text-slate-400">{role.kpi}</p>
    </div>
  )
}

function RoleNode({ role }: { role: OrgRole }) {
  return (
    <li>
      <RoleCard role={role} />
      {role.children && role.children.length > 0 && (
        <ul>
          {role.children.map((child) => (
            <RoleNode key={child.title} role={child} />
          ))}
        </ul>
      )}
    </li>
  )
}

function DepartmentCard({
  dept,
  expanded,
  onToggle,
}: {
  dept: Department
  expanded: boolean
  onToggle: () => void
}) {
  return (
    <div className="group relative">
      <div
        className="flex min-w-[210px] flex-col items-center gap-1 rounded-xl border border-slate-200 border-t-4 bg-white px-4 py-3 text-center shadow-sm transition-shadow hover:shadow-md"
        style={{ borderTopColor: dept.accentColor }}
      >
        <p className="text-sm font-semibold text-slate-900">{dept.headTitle}</p>
        <span
          className="rounded-full px-2 py-0.5 text-xs font-semibold text-white"
          style={{ backgroundColor: dept.accentColor }}
        >
          {dept.name}
        </span>
        <p className="text-xs text-slate-500">Total HC: {dept.totalHeadcount}</p>
        <p className="text-xs text-slate-400">{dept.headKpi}</p>
        <button
          type="button"
          aria-expanded={expanded}
          aria-label={`${expanded ? 'Collapse' : 'Expand'} ${dept.name} department`}
          onClick={onToggle}
          className="mt-1 flex h-6 w-6 items-center justify-center rounded-full border border-slate-300 text-sm font-semibold text-slate-600 hover:bg-slate-100"
        >
          {expanded ? '−' : '+'}
        </button>
      </div>

      <div className="pointer-events-none invisible absolute left-1/2 top-full z-50 mt-3 w-[22rem] -translate-x-1/2 rounded-xl border border-slate-200 bg-white p-4 text-left text-xs opacity-0 shadow-xl transition-all duration-150 group-hover:visible group-hover:pointer-events-auto group-hover:opacity-100">
        <p className="text-sm font-semibold" style={{ color: dept.accentColor }}>
          {dept.name}
        </p>
        <p className="mt-1 text-slate-500">{dept.mission}</p>

        <p className="mt-3 text-[11px] font-semibold uppercase tracking-wide text-slate-400">Key Results</p>
        <ul className="mt-1 space-y-1.5">
          {dept.keyResults.map((kr, index) => (
            <li key={`${kr.code}-${index}`} className="text-slate-600">
              <span className="font-semibold text-slate-900">{kr.code}</span> — {kr.title}{' '}
              <span className="text-slate-500">({kr.target})</span>
            </li>
          ))}
        </ul>

        <p className="mt-3 text-[11px] font-semibold uppercase tracking-wide text-slate-400">Value Stream</p>
        <p className="mt-1 leading-relaxed text-slate-600">{dept.valueStream.join(' → ')}</p>
      </div>
    </div>
  )
}

function DepartmentNode({ dept }: { dept: Department }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <li>
      <DepartmentCard dept={dept} expanded={expanded} onToggle={() => setExpanded((prev) => !prev)} />
      {dept.roles.length > 0 && expanded && (
        <ul>
          {dept.roles.map((role) => (
            <RoleNode key={role.title} role={role} />
          ))}
        </ul>
      )}
    </li>
  )
}

function CompanyCard() {
  return (
    <div className="group relative">
      <div className="flex min-w-[240px] flex-col items-center gap-1 rounded-xl bg-slate-900 px-6 py-4 text-center text-white shadow-md transition-shadow hover:shadow-lg">
        <p className="text-base font-semibold">{company.name}</p>
        <p className="text-sm text-slate-300">{company.ceoTitle}</p>
        <p className="text-xs text-slate-400">{company.period}</p>
      </div>

      <div className="pointer-events-none invisible absolute left-1/2 top-full z-50 mt-3 w-[24rem] -translate-x-1/2 rounded-xl border border-slate-200 bg-white p-4 text-left text-xs opacity-0 shadow-xl transition-all duration-150 group-hover:visible group-hover:pointer-events-auto group-hover:opacity-100">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">SMART Objective</p>
        <p className="mt-1 leading-relaxed text-slate-700">{company.smartObjective}</p>
        <p className="mt-3 text-[11px] font-semibold uppercase tracking-wide text-slate-400">Total Headcount</p>
        <p className="mt-1 text-slate-600">{company.totalHeadcount}</p>
      </div>
    </div>
  )
}

export function OrgChartPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
          <Link to="/" className="font-semibold text-slate-900">
            {profile.name}
          </Link>
          <Link to="/" className="text-sm font-medium text-slate-600 hover:text-blue-600">
            ← Back to Home
          </Link>
        </div>
      </header>

      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">Organization Design</p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-900">Enterprise Organization Chart</h1>
          <p className="mt-4 max-w-3xl text-slate-600">
            Cơ cấu tổ chức 5 phòng ban được thiết kế để đạt SMART Objective và 5 Key Result của doanh nghiệp giai
            đoạn {company.period.replace('Chiến lược ', '')}. Di chuột (hover) vào thẻ công ty để xem SMART
            Objective, và vào thẻ trưởng phòng để xem Key Result và Value Stream của từng phòng ban.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            {departments.map((dept) => (
              <span
                key={dept.id}
                className="flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-600"
              >
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: dept.accentColor }} />
                {dept.name} · {dept.totalHeadcount} HC
              </span>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto pb-16">
          <div className="org-tree mx-auto w-fit px-8">
            <ul>
              <li>
                <CompanyCard />
                <ul>
                  {departments.map((dept) => (
                    <DepartmentNode key={dept.id} dept={dept} />
                  ))}
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
