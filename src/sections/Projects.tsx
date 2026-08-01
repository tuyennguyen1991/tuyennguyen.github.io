import { projects } from '../content/projects'
import { ProjectCard } from '../components/ProjectCard'

export function Projects() {
  const architectureProjects = projects.filter((project) => project.category === 'architecture')

  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-20">
      <h2 className="text-3xl font-semibold text-slate-900">System Architecture Projects</h2>
      <div className="mt-10 grid gap-8 md:grid-cols-2">
        {architectureProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  )
}
