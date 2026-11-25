import { readFile, writeFile } from 'node:fs/promises';
import { createElement as element } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { about } from '../src/data/about.js';
import { profile } from '../src/data/profile.js';
import { projects } from '../src/data/projects.js';

const index = new URL('../build/index.html', import.meta.url);
const html = await readFile(index, 'utf8');
const emptyRoot = '<div id="root"></div>';

if (!html.includes(emptyRoot)) {
  throw new Error('Unable to find the portfolio root in build/index.html.');
}

const projectCards = projects.map(({ id, title, description, tags, liveUrl, repoUrl }) =>
  element('article', { key: id },
    element('h3', null, title),
    element('p', null, description),
    element('p', null, tags.join(' · ')),
    element('p', null,
      liveUrl && element('a', { href: liveUrl }, `${title} live demo`),
      liveUrl && repoUrl && ' · ',
      repoUrl && element('a', { href: repoUrl }, `${title} source code`)
    )
  )
);

const content = renderToStaticMarkup(
  element('main', { id: 'main', className: 'container section' },
    element('h1', null, profile.name),
    element('p', null, `${profile.roles[0]} · ${profile.location}`),
    element('p', null, about.paragraphs[0]),
    element('section', { id: 'projects', 'aria-labelledby': 'static-projects-title' },
      element('h2', { id: 'static-projects-title' }, 'Featured projects'),
      projectCards
    ),
    element('p', null,
      element('a', { href: profile.socials.linkedin }, 'LinkedIn'), ' · ',
      element('a', { href: profile.socials.github }, 'GitHub'), ' · ',
      element('a', { href: profile.resumeUrl }, 'Resume')
    )
  )
);

// React replaces this snapshot with the interactive portfolio when JavaScript loads.
await writeFile(index, html.replace(emptyRoot, () => `<div id="root">${content}</div>`));
