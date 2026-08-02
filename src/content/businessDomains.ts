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
  {
    id: 'erp-enterprise-systems',
    name: 'ERP & Enterprise Systems',
    description:
      'ERP requirement definition, Fit/Gap analysis, and multi-country rollout programs (SAP, D365).',
  },
  {
    id: 'manufacturing',
    name: 'Manufacturing & Industry 4.0',
    description:
      'MES, APS, EHS compliance, and smart-factory digitization for discrete and process manufacturers.',
  },
  {
    id: 'financial-services',
    name: 'Financial Services & Payments',
    description:
      'Card-payment settlement, collections operations, and regulated financial-services platforms.',
  },
  {
    id: 'data-business-intelligence',
    name: 'Data & Business Intelligence',
    description:
      'Governed KPI platforms, medallion-architecture data warehouses, and enterprise BI/reporting.',
  },
  {
    id: 'government-public-sector',
    name: 'Government & Public Sector',
    description:
      'Large-scale regulatory administration systems and legacy government platform modernization.',
  },
  {
    id: 'retail-supply-chain',
    name: 'Retail & Supply Chain',
    description:
      'Warehouse management, tenant/mall operations, loyalty platforms, and logistics/procurement systems.',
  },
]
