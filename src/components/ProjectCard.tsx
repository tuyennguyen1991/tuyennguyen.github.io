import type { Project } from '../content/projects'

export interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="rounded-2xl border border-slate-200 p-6 shadow-sm">
      <h3 className="text-xl font-semibold text-slate-900">{project.title}</h3>
      <p className="mt-2 text-slate-600">{project.summary}</p>
      <dl className="mt-4 space-y-2 text-sm">
        <div>
          <dt className="font-semibold text-slate-900">Business Impact</dt>
          <dd className="text-slate-600">{project.businessImpact}</dd>
        </div>
        <div>
          <dt className="font-semibold text-slate-900">Technical Complexity</dt>
          <dd className="text-slate-600">{project.technicalComplexity}</dd>
        </div>
        <div>
          <dt className="font-semibold text-slate-900">Leadership Contribution</dt>
          <dd className="text-slate-600">{project.leadershipNote}</dd>
        </div>
      </dl>
      <ul className="mt-4 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <li key={tech} className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700">
            {tech}
          </li>
        ))}
      </ul>
      {project.links && project.links.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-4">
          {project.links.map((link) => (
            <li key={link.url}>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </article>
  )
}
