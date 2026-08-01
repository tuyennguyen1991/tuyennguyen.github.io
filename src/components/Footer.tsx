import { profile } from '../content/profile'

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 py-10 text-center">
        <p className="text-sm text-slate-500">
          © {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>
        <ul className="flex flex-wrap items-center justify-center gap-6">
          {profile.socials.map((social) => (
            <li key={social.label}>
              <a
                href={social.url}
                {...(social.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="text-sm font-medium text-slate-600 hover:text-blue-600"
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
              className="text-sm font-medium text-slate-600 hover:text-blue-600"
            >
              Resume
            </a>
          </li>
        </ul>
      </div>
    </footer>
  )
}
