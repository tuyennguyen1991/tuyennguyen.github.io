import { projects } from '../content/projects'
import { ProjectCard } from '../components/ProjectCard'

export function AIInitiatives() {
  const aiProjects = projects.filter((project) => project.category === 'ai-automation')

  return (
    <section id="ai-initiatives" className="mx-auto max-w-6xl px-6 py-20">
      <h2 className="text-3xl font-semibold text-slate-900">AI &amp; Automation Initiatives</h2>
      <div className="mt-10 grid gap-8 md:grid-cols-2">
        {aiProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  )
}
