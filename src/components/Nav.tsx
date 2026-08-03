import { Link } from 'react-router-dom'
import { navItems } from '../content/navigation'
import { profile } from '../content/profile'
import { useScrollSpy } from '../hooks/useScrollSpy'

export function Nav() {
  const activeId = useScrollSpy(navItems.map((item) => item.id))

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4"
      >
        <a href="#hero" className="font-semibold text-slate-900">
          {profile.name}
        </a>
        <ul className="hidden flex-wrap items-center gap-6 md:flex">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={activeId === item.id ? 'true' : undefined}
                className={
                  activeId === item.id
                    ? 'text-sm font-medium text-blue-600'
                    : 'text-sm font-medium text-slate-600 hover:text-blue-600'
                }
              >
                {item.label}
              </a>
            </li>
          ))}
          <li>
            <Link to="/org-chart" className="text-sm font-medium text-slate-600 hover:text-blue-600">
              Org Chart
            </Link>
          </li>
        </ul>
        <a
          href={profile.resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Resume
        </a>
      </nav>
    </header>
  )
}
