import { articles } from '../content/articles'

export function Blog() {
  return (
    <section id="blog" className="mx-auto max-w-4xl px-6 py-20">
      <h2 className="text-3xl font-semibold text-slate-900">Technical Blog / Articles</h2>
      <ul className="mt-10 space-y-8">
        {articles.map((article) => (
          <li key={article.id} className="border-b border-slate-200 pb-8 last:border-none">
            <p className="text-sm text-slate-500">
              {new Date(article.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
            <h3 className="mt-1 text-xl font-semibold text-slate-900">
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600"
              >
                {article.title}
              </a>
            </h3>
            <p className="mt-2 text-slate-600">{article.summary}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
