import { Link } from 'react-router-dom'
import { Footer } from '../components/Footer'
import { profile } from '../content/profile'
import { articles } from '../content/articles'
import { businessDomains } from '../content/businessDomains'

export function BlogPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-4 px-6 py-4">
          <Link to="/" className="font-semibold text-slate-900">
            {profile.name}
          </Link>
          <Link to="/" className="text-sm font-medium text-slate-600 hover:text-blue-600">
            ← Back to Home
          </Link>
        </div>
      </header>

      <main className="flex-1">
        <section className="mx-auto max-w-4xl px-6 py-20">
          <h1 className="text-3xl font-semibold text-slate-900">Technical Blog / Articles</h1>
          <ul className="mt-10 space-y-8">
            {articles.map((article) => {
              const domain = businessDomains.find((d) => d.id === article.domain)

              return (
                <li key={article.id} className="border-b border-slate-200 pb-8 last:border-none">
                  <div className="flex flex-wrap items-center gap-3">
                    <p className="text-sm text-slate-500">
                      {new Date(article.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                    {domain && (
                      <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">
                        {domain.name}
                      </span>
                    )}
                  </div>
                  <h2 className="mt-1 text-xl font-semibold text-slate-900">
                    <Link to={`/blog/${article.id}`} className="hover:text-blue-600">
                      {article.title}
                    </Link>
                  </h2>
                  <p className="mt-2 text-slate-600">{article.summary}</p>
                </li>
              )
            })}
          </ul>
        </section>
      </main>

      <Footer />
    </div>
  )
}
