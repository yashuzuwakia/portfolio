import { useEffect } from 'react';
import { initSmoothScroll } from 'lib/smoothScroll';

export default function useSmoothScroll() {
  useEffect(() => initSmoothScroll(), []);
}
