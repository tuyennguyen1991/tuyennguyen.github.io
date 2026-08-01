export interface SocialLink {
  label: string
  url: string
  external: boolean
}

export interface Profile {
  name: string
  title: string
  tagline: string
  location: string
  resumeUrl: string
  about: string[]
  socials: SocialLink[]
}

export const profile: Profile = {
  name: 'Tuyen Nguyen',
  title: 'Senior Systems Design Team Lead',
  tagline:
    'I design resilient, large-scale systems and lead engineering teams that ship them.',
  location: 'Vietnam',
  resumeUrl: `${import.meta.env.BASE_URL}resume.pdf`,
  about: [
    'I am a Senior Systems Design Team Lead with a background spanning distributed systems, cloud infrastructure, and platform engineering.',
    'Over my career I have led cross-functional teams through large-scale architecture migrations, balancing technical depth with pragmatic delivery and mentorship.',
    'I am passionate about building systems that scale reliably and about growing engineers into confident technical leaders.',
  ],
  socials: [
    { label: 'GitHub', url: 'https://github.com/tuyennguyen1991', external: true },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/tuyen-nguyen-02a965199', external: true },
    { label: 'Email', url: 'mailto:tuyen.nguyen.engineer@gmail.com', external: false },
  ],
}
