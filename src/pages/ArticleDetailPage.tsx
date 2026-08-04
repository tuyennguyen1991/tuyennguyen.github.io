import { Link, useParams } from 'react-router-dom'
import { articles } from '../content/articles'
import { businessDomains } from '../content/businessDomains'
import { Footer } from '../components/Footer'
import { profile } from '../content/profile'

export function ArticleDetailPage() {
  const { articleId } = useParams<{ articleId: string }>()
  const article = articles.find((a) => a.id === articleId)

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-4 px-6 py-4">
          <Link to="/" className="font-semibold text-slate-900">
            {profile.name}
          </Link>
          <Link to="/blog" className="text-sm font-medium text-slate-600 hover:text-blue-600">
            ← Back to Blog
          </Link>
        </div>
      </header>
      <main className="flex-1">
        {article ? (
          <article className="mx-auto max-w-3xl px-6 py-16">
            <p className="text-sm text-slate-500">
              {new Date(article.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900">{article.title}</h1>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {(() => {
                const domain = businessDomains.find((d) => d.id === article.domain)
                return domain ? (
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">
                    {domain.name}
                  </span>
                ) : null
              })()}
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div
              className="prose mt-10 max-w-none text-slate-700"
              dangerouslySetInnerHTML={{ __html: article.contentHtml }}
            />
          </article>
        ) : (
          <div className="mx-auto max-w-3xl px-6 py-24 text-center">
            <h1 className="text-2xl font-semibold text-slate-900">Article not found</h1>
            <p className="mt-4 text-slate-600">
              The article you are looking for does not exist or may have been moved.
            </p>
            <Link to="/blog" className="mt-6 inline-block text-blue-600 hover:underline">
              ← Back to Blog
            </Link>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
