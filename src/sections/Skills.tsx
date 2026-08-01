import { skillCategories } from '../content/skills'
import { certifications } from '../content/certifications'

export function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-5xl px-6 py-20">
      <h2 className="text-3xl font-semibold text-slate-900">Technical Skills &amp; Certifications</h2>
      <div className="mt-10 grid gap-8 md:grid-cols-2">
        {skillCategories.map((group) => (
          <div key={group.category}>
            <h3 className="text-lg font-semibold text-slate-900">{group.category}</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <li
                  key={skill}
                  className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <h3 className="mt-12 text-lg font-semibold text-slate-900">Certifications</h3>
      <ul className="mt-4 space-y-2">
        {certifications.map((cert) => (
          <li key={cert.name} className="text-slate-600">
            <span className="font-medium text-slate-900">{cert.name}</span> — {cert.issuer} (
            {cert.date})
          </li>
        ))}
      </ul>
    </section>
  )
}
