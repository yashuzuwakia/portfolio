import Lenis from 'lenis';

let lenis = null;

export function initSmoothScroll() {
  if (lenis || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return () => {};
  }

  lenis = new Lenis({
    duration: 1.15,
    easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
    smoothWheel: true,
    autoRaf: true,
    anchors: { offset: -72 },
  });

  return () => {
    lenis.destroy();
    lenis = null;
  };
}

export function lockScroll(locked) {
  if (lenis) {
    if (locked) lenis.stop();
    else lenis.start();
  }
  document.body.style.overflow = locked ? 'hidden' : '';
}
