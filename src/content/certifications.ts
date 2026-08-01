export interface Certification {
  name: string
  issuer: string
  date: string
  credentialUrl?: string
}

export const certifications: Certification[] = [
  {
    name: 'AWS Certified Solutions Architect – Professional',
    issuer: 'Amazon Web Services',
    date: '2023',
  },
  {
    name: 'Certified Kubernetes Administrator (CKA)',
    issuer: 'Cloud Native Computing Foundation',
    date: '2022',
  },
]
