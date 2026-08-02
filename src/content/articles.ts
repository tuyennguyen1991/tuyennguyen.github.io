import { parseFrontmatter, renderMarkdown } from '../lib/markdown'

export interface Article {
  id: string
  title: string
  date: string
  summary: string
  domain: string
  tags: string[]
  contentHtml: string
}

const articleModules = import.meta.glob('./articles/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

function toArticle(raw: string): Article {
  const { data, content } = parseFrontmatter(raw)

  return {
    id: data.id as string,
    title: data.title as string,
    date: data.date as string,
    summary: data.summary as string,
    domain: data.domain as string,
    tags: (data.tags as string[]) ?? [],
    contentHtml: renderMarkdown(content),
  }
}

export const articles: Article[] = Object.values(articleModules)
  .map(toArticle)
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
