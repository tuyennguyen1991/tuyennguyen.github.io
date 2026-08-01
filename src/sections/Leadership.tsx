import { career } from '../content/career'

export function Leadership() {
  return (
    <section id="leadership" className="mx-auto max-w-4xl px-6 py-20">
      <h2 className="text-3xl font-semibold text-slate-900">Leadership &amp; Career Journey</h2>
      <ol className="mt-10 space-y-10 border-l border-slate-200 pl-6">
        {career.map((entry) => (
          <li key={`${entry.organization}-${entry.startDate}`}>
            <p className="text-sm font-medium text-blue-600">
              {entry.startDate} — {entry.endDate}
            </p>
            <h3 className="mt-1 text-xl font-semibold text-slate-900">{entry.role}</h3>
            <p className="text-slate-500">{entry.organization}</p>
            <p className="mt-2 text-slate-600">{entry.scope}</p>
            <ul className="mt-3 list-inside list-disc space-y-1 text-slate-600">
              {entry.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </section>
  )
}
