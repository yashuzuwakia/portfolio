import { Footer, Navbar, ScrollProgress } from 'components/layout';
import { About, Contact, Experience, Hero, Projects, Skills } from 'sections';
import { useSmoothScroll, useTheme } from 'hooks';

export default function App() {
  const { theme, toggleTheme } = useTheme();
  useSmoothScroll();

  return (
    <>
      <ScrollProgress />
      <Navbar theme={theme} onToggleTheme={toggleTheme} />
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
