export interface Article {
  id: string
  title: string
  date: string
  summary: string
  url: string
  tags: string[]
}

export const articles: Article[] = [
  {
    id: 'scaling-event-driven-systems',
    title: 'Scaling Event-Driven Systems: Lessons from Production',
    date: '2024-03-12',
    summary: 'What we learned migrating a monolith to an event-driven architecture at scale.',
    url: 'https://medium.com/@tuyennguyen1991/scaling-event-driven-systems',
    tags: ['Architecture', 'Kafka'],
  },
  {
    id: 'leading-distributed-teams',
    title: 'Leading Distributed Engineering Teams Through Ambiguity',
    date: '2023-11-02',
    summary: 'Practical lessons on leading globally distributed teams through major migrations.',
    url: 'https://dev.to/tuyennguyen1991/leading-distributed-teams',
    tags: ['Leadership'],
  },
  {
    id: 'ai-in-incident-response',
    title: 'Bringing AI into Incident Response Without Losing Trust',
    date: '2024-06-20',
    summary: 'How we rolled out AI-assisted triage while keeping engineers in the loop.',
    url: 'https://medium.com/@tuyennguyen1991/ai-in-incident-response',
    tags: ['AI', 'SRE'],
  },
]
