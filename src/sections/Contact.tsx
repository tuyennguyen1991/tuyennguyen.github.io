import { profile } from '../content/profile'

export function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-3xl px-6 py-20 text-center">
      <h2 className="text-3xl font-semibold text-slate-900">Contact &amp; Professional Links</h2>
      <p className="mt-4 text-slate-600">
        Open to conversations about system design, engineering leadership, and collaboration.
      </p>
      <ul className="mt-8 flex flex-wrap items-center justify-center gap-4">
        {profile.socials.map((social) => (
          <li key={social.label}>
            <a
              href={social.url}
              {...(social.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="rounded-full border border-slate-300 px-5 py-2 text-sm font-semibold text-slate-700 hover:border-blue-600 hover:text-blue-600"
            >
              {social.label}
            </a>
          </li>
        ))}
        <li>
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Resume
          </a>
        </li>
      </ul>
    </section>
  )
}
