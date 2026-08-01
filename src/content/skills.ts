export interface SkillCategory {
  category: string
  skills: string[]
}

export const skillCategories: SkillCategory[] = [
  {
    category: 'Architecture',
    skills: ['Microservices', 'Event-Driven Design', 'CQRS', 'Domain-Driven Design'],
  },
  {
    category: 'Cloud & Infrastructure',
    skills: ['AWS', 'Kubernetes', 'Terraform', 'Docker'],
  },
  {
    category: 'Languages',
    skills: ['TypeScript', 'Go', 'Python', 'Java'],
  },
  {
    category: 'Leadership',
    skills: ['Team Mentoring', 'Technical Roadmapping', 'Cross-Team Facilitation'],
  },
]
