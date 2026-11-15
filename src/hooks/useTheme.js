import { useCallback, useEffect, useState } from 'react';
import { flushSync } from 'react-dom';

const STORAGE_KEY = 'portfolio-theme';
const LIGHT_QUERY = '(prefers-color-scheme: light)';

const readStored = () => {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value === 'light' || value === 'dark' ? value : null;
  } catch {
    return null;
  }
};

const writeStored = (theme) => {
  try {
    window.localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // Storage can be unavailable (privacy mode, blocked cookies); the theme still applies for this visit.
  }
};

const systemTheme = () => (window.matchMedia(LIGHT_QUERY).matches ? 'light' : 'dark');

const currentTheme = () => document.documentElement.dataset.theme || readStored() || systemTheme();

const getTransitionOrigin = (event) => {
  const target = event?.currentTarget;
  if (target && (!event.detail || event.clientX == null)) {
    const rect = target.getBoundingClientRect();
    return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
  }
  return { x: event?.clientX ?? window.innerWidth / 2, y: event?.clientY ?? 0 };
};

export default function useTheme() {
  const [theme, setTheme] = useState(currentTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    const media = window.matchMedia(LIGHT_QUERY);
    const onChange = () => {
      if (!readStored()) setTheme(systemTheme());
    };
    media.addEventListener?.('change', onChange);
    return () => media.removeEventListener?.('change', onChange);
  }, []);

  const toggleTheme = useCallback((event) => {
    const next = currentTheme() === 'dark' ? 'light' : 'dark';
    const root = document.documentElement;
    const apply = () => {
      root.dataset.theme = next;
      writeStored(next);
      flushSync(() => setTheme(next));
    };

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!document.startViewTransition || reduceMotion) {
      apply();
      return;
    }

    const { x, y } = getTransitionOrigin(event);
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));

    root.classList.add('theme-switching');
    const transition = document.startViewTransition(apply);

    transition.ready
      .then(() => {
        root.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
          {
            duration: 650,
            easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
            pseudoElement: '::view-transition-new(root)',
          }
        );
      })
      .catch(() => {});

    transition.finished.finally(() => root.classList.remove('theme-switching'));
  }, []);

  return { theme, toggleTheme };
}
