import { describe, expect, it } from 'vitest'
import { parseFrontmatter, renderMarkdown } from './markdown'

describe('parseFrontmatter', () => {
  it('extracts scalar frontmatter fields and the remaining body', () => {
    const raw = `---
id: sample-post
title: Sample Post
date: 2024-01-15
domain: architecture
summary: A short summary.
---

# Heading

Body text.
`

    const { data, content } = parseFrontmatter(raw)

    expect(data.id).toBe('sample-post')
    expect(data.title).toBe('Sample Post')
    expect(data.date).toBe('2024-01-15')
    expect(data.domain).toBe('architecture')
    expect(data.summary).toBe('A short summary.')
    expect(content.trim()).toBe('# Heading\n\nBody text.')
  })

  it('parses inline array fields into string arrays', () => {
    const raw = `---
id: sample-post
tags: [Architecture, Kafka, Event-Driven]
---
Body.
`

    const { data } = parseFrontmatter(raw)

    expect(data.tags).toEqual(['Architecture', 'Kafka', 'Event-Driven'])
  })

  it('throws a descriptive error when frontmatter delimiters are missing', () => {
    expect(() => parseFrontmatter('# No frontmatter here')).toThrow(/frontmatter/i)
  })
})

describe('renderMarkdown', () => {
  it('renders a level-2 heading', () => {
    const html = renderMarkdown('## Section Title')
    expect(html).toContain('<h2')
    expect(html).toContain('Section Title')
  })

  it('renders a paragraph with bold text', () => {
    const html = renderMarkdown('This is **important** text.')
    expect(html).toContain('<strong>important</strong>')
  })

  it('renders an unordered list', () => {
    const html = renderMarkdown('- one\n- two')
    expect(html).toContain('<ul>')
    expect(html).toContain('<li>one</li>')
  })
})
