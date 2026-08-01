export interface ProjectLink {
  label: string
  url: string
}

export interface Project {
  id: string
  title: string
  category: 'architecture' | 'ai-automation'
  summary: string
  businessImpact: string
  technicalComplexity: string
  stack: string[]
  leadershipNote: string
  links?: ProjectLink[]
}

export const projects: Project[] = [
  {
    id: 'realtime-order-platform',
    title: 'Real-Time Order Processing Platform',
    category: 'architecture',
    summary:
      'Redesigned a monolithic order system into an event-driven microservices architecture.',
    businessImpact: 'Reduced order processing latency by 60% and cut infrastructure cost by 30%.',
    technicalComplexity: 'Kafka-based event sourcing, CQRS, multi-region failover.',
    stack: ['Kafka', 'Kubernetes', 'Go', 'PostgreSQL'],
    leadershipNote: 'Led a team of 8 engineers across 3 time zones through the migration.',
    links: [{ label: 'Case Study', url: 'https://example.com/case-study' }],
  },
  {
    id: 'multi-region-failover',
    title: 'Multi-Region Failover Architecture',
    category: 'architecture',
    summary: 'Designed active-active multi-region deployment for a customer-facing platform.',
    businessImpact: 'Achieved 99.99% uptime SLA, eliminating single-region outages.',
    technicalComplexity: 'Cross-region data replication, traffic shifting, chaos testing.',
    stack: ['AWS', 'Terraform', 'Envoy'],
    leadershipNote: 'Coordinated across 4 teams to align on a shared failover runbook.',
  },
  {
    id: 'internal-platform-sdk',
    title: 'Internal Platform SDK',
    category: 'architecture',
    summary: 'Built a shared SDK standardizing service scaffolding across 20+ teams.',
    businessImpact: 'Cut new-service bootstrap time from 2 weeks to 2 days.',
    technicalComplexity: 'Code generation, plugin architecture, semantic versioning strategy.',
    stack: ['TypeScript', 'Node.js'],
    leadershipNote: 'Drove adoption through internal workshops and RFC process.',
  },
  {
    id: 'ai-incident-triage',
    title: 'AI-Assisted Incident Triage',
    category: 'ai-automation',
    summary: 'Built an LLM-based system that classifies and routes production incidents.',
    businessImpact: 'Reduced mean time to acknowledge (MTTA) by 45%.',
    technicalComplexity: 'RAG pipeline over historical incident data, on-call integration.',
    stack: ['Python', 'LangChain', 'OpenAI API'],
    leadershipNote: 'Partnered with SRE leadership to define rollout and guardrails.',
  },
  {
    id: 'automated-code-review',
    title: 'Automated Architecture Review Bot',
    category: 'ai-automation',
    summary: 'Created an automation bot that flags architecture-pattern violations in PRs.',
    businessImpact: 'Cut architecture review cycle time by 35%.',
    technicalComplexity: 'Static analysis integrated with GitHub Actions and LLM review pass.',
    stack: ['TypeScript', 'GitHub Actions'],
    leadershipNote: 'Championed the tool org-wide, gathering feedback from 5 teams.',
  },
]
