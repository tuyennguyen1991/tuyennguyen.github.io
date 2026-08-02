import { marked } from 'marked'

export interface Frontmatter {
  [key: string]: string | string[]
}

export interface ParsedMarkdown {
  data: Frontmatter
  content: string
}

const FRONTMATTER_PATTERN = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/

function parseValue(rawValue: string): string | string[] {
  const trimmed = rawValue.trim()

  if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
    const inner = trimmed.slice(1, -1).trim()
    if (inner === '') return []
    return inner.split(',').map((item) => item.trim().replace(/^['"]|['"]$/g, ''))
  }

  return trimmed.replace(/^['"]|['"]$/g, '')
}

export function parseFrontmatter(raw: string): ParsedMarkdown {
  const match = FRONTMATTER_PATTERN.exec(raw)

  if (!match) {
    throw new Error('Invalid markdown file: missing frontmatter block delimited by "---" lines.')
  }

  const [, frontmatterBlock, content] = match
  const data: Frontmatter = {}

  for (const line of frontmatterBlock.split(/\r?\n/)) {
    if (line.trim() === '') continue
    const separatorIndex = line.indexOf(':')
    if (separatorIndex === -1) continue

    const key = line.slice(0, separatorIndex).trim()
    const value = line.slice(separatorIndex + 1)
    data[key] = parseValue(value)
  }

  return { data, content }
}

export function renderMarkdown(content: string): string {
  return marked.parse(content, { async: false }) as string
}
