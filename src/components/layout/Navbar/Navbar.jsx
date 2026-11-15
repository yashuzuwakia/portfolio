import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { navLinks, profile } from 'data';
import { useScrollSpy } from 'hooks';
import { lockScroll } from 'lib/smoothScroll';
import { MoonIcon, SunIcon } from 'components/ui';
import styles from './Navbar.module.css';

const sectionIds = navLinks.map((link) => link.id);
const NAV_ID = 'primary-nav';
const DESKTOP_QUERY = '(min-width: 901px)';

export default function Navbar({ theme, onToggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [indicator, setIndicator] = useState({ left: 0, width: 0, visible: false });
  const activeId = useScrollSpy(sectionIds);
  const linkRefs = useRef({});
  const navRef = useRef(null);
  const burgerRef = useRef(null);
  const activeIdRef = useRef(activeId);
  activeIdRef.current = activeId;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const desktop = window.matchMedia(DESKTOP_QUERY);
    const onChange = (event) => {
      if (event.matches) setMenuOpen(false);
    };
    desktop.addEventListener?.('change', onChange);
    return () => desktop.removeEventListener?.('change', onChange);
  }, []);

  useEffect(() => {
    if (!menuOpen) return undefined;

    const background = [document.getElementById('main'), document.querySelector('footer')].filter(Boolean);
    lockScroll(true);
    background.forEach((el) => {
      el.inert = true;
    });
    navRef.current?.querySelector('a')?.focus();

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        burgerRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);

    return () => {
      lockScroll(false);
      background.forEach((el) => {
        el.inert = false;
      });
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen]);

  const measure = useCallback(() => {
    const el = linkRefs.current[activeIdRef.current];
    if (el) setIndicator({ left: el.offsetLeft, width: el.offsetWidth, visible: true });
  }, []);

  useLayoutEffect(measure, [activeId, measure]);

  useEffect(() => {
    let cancelled = false;
    document.fonts?.ready.then(() => {
      if (!cancelled) measure();
    });

    const nav = navRef.current;
    if (!nav || typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', measure);
      return () => {
        cancelled = true;
        window.removeEventListener('resize', measure);
      };
    }

    const observer = new ResizeObserver(measure);
    observer.observe(nav);
    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, [measure]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.inner}`}>
        <a href="#home" className={styles.logo} onClick={closeMenu} aria-label={`${profile.name}, home`}>
          <span className={styles.logoMark}>{profile.initials}</span>
          <span className={styles.logoText}>{profile.name}</span>
        </a>

        <nav
          id={NAV_ID}
          ref={navRef}
          className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`}
          aria-label="Primary"
        >
          <span
            className={styles.indicator}
            style={{
              transform: `translateX(${indicator.left}px)`,
              width: indicator.width,
              opacity: indicator.visible ? 1 : 0,
            }}
            aria-hidden="true"
          />
          {navLinks.map(({ id, label }) => (
            <a
              key={id}
              ref={(el) => {
                linkRefs.current[id] = el;
              }}
              href={`#${id}`}
              className={`${styles.link} ${activeId === id ? styles.active : ''}`}
              aria-current={activeId === id ? 'true' : undefined}
              onClick={closeMenu}
            >
              {label}
            </a>
          ))}
        </nav>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.themeToggle}
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          >
            <span key={theme} className={styles.themeIcon}>
              {theme === 'dark' ? <SunIcon size={18} /> : <MoonIcon size={18} />}
            </span>
          </button>
          <button
            ref={burgerRef}
            type="button"
            className={`${styles.burger} ${menuOpen ? styles.burgerOpen : ''}`}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-controls={NAV_ID}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}
