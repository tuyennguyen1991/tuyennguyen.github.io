import { profile } from '../content/profile'

export function About() {
  return (
    <section id="about" className="mx-auto max-w-4xl px-6 py-20">
      <h2 className="text-3xl font-semibold text-slate-900">About Me</h2>
      <div className="mt-6 space-y-4">
        {profile.about.map((paragraph, index) => (
          <p key={index} className="text-slate-600">
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  )
}
