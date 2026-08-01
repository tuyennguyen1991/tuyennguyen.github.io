import { profile } from '../content/profile'

export function Hero() {
  return (
    <section
      id="hero"
      className="mx-auto flex min-h-[70vh] max-w-6xl flex-col items-center justify-center gap-6 px-6 py-24 text-center"
    >
      <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
        {profile.title}
      </p>
      <h1 className="text-4xl font-bold text-slate-900 sm:text-5xl">{profile.name}</h1>
      <p className="max-w-2xl text-lg text-slate-600">{profile.tagline}</p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <a
          href="#projects"
          className="rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700"
        >
          View Projects
        </a>
        <a
          href={profile.resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 hover:border-blue-600 hover:text-blue-600"
        >
          Download Resume
        </a>
        <a
          href="#contact"
          className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 hover:border-blue-600 hover:text-blue-600"
        >
          Contact
        </a>
      </div>
    </section>
  )
}
