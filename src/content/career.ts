export interface CareerEntry {
  role: string
  organization: string
  startDate: string
  endDate: string
  scope: string
  highlights: string[]
}

export const career: CareerEntry[] = [
  {
    role: 'Senior Systems Design Team Lead',
    organization: 'Current Company',
    startDate: '2022',
    endDate: 'Present',
    scope: 'Leading a team of 8 engineers across distributed systems and platform architecture.',
    highlights: [
      'Own architecture direction for core platform services used by 20+ product teams.',
      'Mentor senior engineers into technical leadership roles.',
      'Drive cross-team design reviews and architecture decision records.',
    ],
  },
  {
    role: 'Staff Software Engineer',
    organization: 'Previous Company',
    startDate: '2019',
    endDate: '2022',
    scope: 'Technical lead for a 5-person team rebuilding a monolith into microservices.',
    highlights: [
      'Led migration reducing p99 latency by 60%.',
      'Introduced event-driven architecture using Kafka.',
    ],
  },
  {
    role: 'Software Engineer',
    organization: 'Earlier Company',
    startDate: '2015',
    endDate: '2019',
    scope: 'Individual contributor on backend infrastructure.',
    highlights: [
      'Built internal tooling adopted org-wide.',
      'Contributed to on-call reliability practices.',
    ],
  },
]
