import { Nav } from '../components/Nav'
import { Footer } from '../components/Footer'
import { Hero } from '../sections/Hero'
import { About } from '../sections/About'
import { Leadership } from '../sections/Leadership'
import { Skills } from '../sections/Skills'
import { Projects } from '../sections/Projects'
import { AIInitiatives } from '../sections/AIInitiatives'
import { Blog } from '../sections/Blog'
import { Contact } from '../sections/Contact'
import { RequestDemo } from '../sections/RequestDemo'

export function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Nav />
      <main className="flex-1">
        <Hero />
        <About />
        <Leadership />
        <Skills />
        <Projects />
        <AIInitiatives />
        <Blog />
        <Contact />
        <RequestDemo />
      </main>
      <Footer />
    </div>
  )
}
