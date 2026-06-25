import { getContent } from '@/lib/content'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Projects from '@/components/Projects'
import Skills from '@/components/Skills'
import Contact from '@/components/Contact'
// import GitHubActivity from '@/components/GitHubActivity'
import Resume from '@/components/Resume'

export default function Home() {
  const content = getContent()
  const githubUrl =
    content.hero.socialLinks?.find(l => l.platform === 'github')?.url || '#'

  return (
    <>
      <Hero content={content.hero} />
      <About content={content.about} />
      <Projects content={content.projects} githubUrl={githubUrl} />
      <Resume content={content.resume} />
      <Skills content={content.skills} />

      {/*
      <GitHubActivity
        projects={content.projects}
        githubUrl={githubUrl}
      />
      */}

      <Contact content={content.contact} />
    </>
  )
}