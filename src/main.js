import './assets/main.css';

import Lenis from 'lenis';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

const app = createApp(App);

let lenis = null;
let rafId = 0;

function setupSmoothScroll() {
  if (typeof window === 'undefined') return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return;

  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    touchMultiplier: 2,
    wheelMultiplier: 1,
    normalizeWheel: true,
  });

  const frame = (time) => {
    lenis?.raf(time);
    rafId = window.requestAnimationFrame(frame);
  };

  rafId = window.requestAnimationFrame(frame);

  const handleResize = () => lenis?.resize();
  const handleBeforeUnload = () => {
    if (rafId) {
      window.cancelAnimationFrame(rafId);
      rafId = 0;
    }
    lenis?.destroy();
    lenis = null;
  };

  window.addEventListener('resize', handleResize);
  window.addEventListener('beforeunload', handleBeforeUnload, { once: true });

  router.afterEach(() => {
    window.requestAnimationFrame(() => {
      lenis?.scrollTo(0, { immediate: true });
    });
  });
}

setupSmoothScroll();

app.use(router);
app.mount('#app');
