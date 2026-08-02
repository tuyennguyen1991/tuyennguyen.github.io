import { Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { ArticleDetailPage } from './pages/ArticleDetailPage'
import { NotFoundPage } from './pages/NotFoundPage'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/blog/:articleId" element={<ArticleDetailPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
