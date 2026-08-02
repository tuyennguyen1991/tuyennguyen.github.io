export interface BusinessDomain {
  id: string
  name: string
  description: string
}

export const businessDomains: BusinessDomain[] = [
  {
    id: 'architecture',
    name: 'Architecture',
    description:
      'Microservices, event-driven design, CQRS, and domain-driven design for large-scale systems.',
  },
  {
    id: 'cloud-infrastructure',
    name: 'Cloud & Infrastructure',
    description: 'AWS, Kubernetes, Terraform, and Docker powering resilient, multi-region platforms.',
  },
  {
    id: 'ai-automation',
    name: 'AI & Automation',
    description: 'LLM-based automation, RAG pipelines, and AI-assisted engineering workflows.',
  },
  {
    id: 'leadership',
    name: 'Leadership',
    description: 'Team mentoring, technical roadmapping, and cross-team facilitation.',
  },
]
