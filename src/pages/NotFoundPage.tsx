import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <h1 className="text-3xl font-semibold text-slate-900">404 — Page Not Found</h1>
      <p className="mt-4 text-slate-600">The page you are looking for does not exist.</p>
      <Link to="/" className="mt-6 inline-block text-blue-600 hover:underline">
        ← Back to Home
      </Link>
    </div>
  )
}
