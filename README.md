# Yashwant Choudhary — Portfolio

Personal portfolio of **Yashwant Choudhary**, Full Stack Developer at Dassault Systèmes.
Live at [yashwantchoudhary.in](https://yashwantchoudhary.in/).

Built with React 18 (Create React App), CSS Modules and [Lenis](https://github.com/darkroomengineering/lenis) smooth scrolling. Features a light/dark theme, scroll-spy navigation, reveal animations, and full SEO metadata (Open Graph, JSON-LD, sitemap).

## Getting started

Use Node.js 22.12 or later.

```bash
npm install
npm start        # dev server on http://localhost:3000
npm run build    # production build in /build
npm run deploy   # build and publish to GitHub Pages
```

On Windows, if `npm` resolves to the wrong executable, use `npm.cmd` instead.

## Project structure

```
public/                 static assets: favicon, icons, og-image, robots.txt, sitemap.xml
scripts/
  generate-icons.ps1    renders favicon, app icons and og-image (npm run icons)
src/
  index.js              entry point (Create React App requires this exact name)
  App.jsx               page composition
  components/
    layout/             Navbar, Footer, ScrollProgress
    ui/                 Button, Reveal, SectionHeading, SocialLinks, Icons
  sections/             Hero, About, Skills, Projects, Experience, Contact
  data/                 all site content (profile, projects, skills, experience...)
  hooks/                useTheme, useScrollSpy, useInView, useSmoothScroll
  lib/                  framework-agnostic helpers (smooth scroll)
  styles/               tokens, themes, base and utility styles
```

Every component lives in its own folder with its `.jsx`, `.module.css` and an `index.js` re-export. Imports are absolute from `src` (see `jsconfig.json`), e.g. `import { Button } from 'components/ui'`.

## Editing content

All text, links and projects live in [`src/data`](src/data). Update those files; no component changes are needed.

| File | Contents |
| --- | --- |
| `profile.js` | Name, roles, tagline, email, resume and social links |
| `about.js` | About paragraphs and stats |
| `skills.js` | Skill groups |
| `projects.js` | Project cards |
| `experience.js` | Experience and education timeline |
| `navigation.js` | Navbar sections |

SEO tags (title, description, Open Graph, structured data) are in [`public/index.html`](public/index.html). The production build includes a static version of the profile and project list generated from the same data as the React page. After changing your name or colours, run `npm run icons` to regenerate the favicon and share image.
