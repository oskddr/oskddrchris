<template>
  <RouteLoader />
  <main class="route-shell">
    <RouterView v-slot="{ Component, route }">
      <Transition name="page-load">
        <component :is="Component" :key="route.fullPath" class="route-view" />
      </Transition>
    </RouterView>
  </main>
</template>

<script setup>
import { nextTick, onBeforeUnmount, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import RouteLoader from '@/components/RouteLoader.vue';

const route = useRoute();
let revealObserver = null;
let revealFrame = 0;

function applyRevealAnimations() {
  if (typeof window === 'undefined') return;
  const elements = Array.from(document.querySelectorAll('[data-reveal]'));

  revealObserver?.disconnect();

  if (!elements.length) {
    revealObserver = null;
    return;
  }

  const setDelay = (el, delay) => {
    if (Number.isNaN(delay) || el.style.getPropertyValue('--reveal-delay')) return;
    el.style.setProperty('--reveal-delay', `${delay}s`);
  };

  elements.forEach((el) => {
    el.classList.add('reveal-on-scroll');
    const delay = Number.parseFloat(el.dataset.revealDelay || '');
    if (!Number.isNaN(delay)) setDelay(el, delay);
  });

  document.querySelectorAll('[data-reveal-stagger]').forEach((parent) => {
    const step = Number.parseFloat(parent.dataset.revealStagger || '0.06');
    if (Number.isNaN(step)) return;
    Array.from(parent.querySelectorAll('[data-reveal]')).forEach((child, index) => {
      if (!child.dataset.revealDelay) setDelay(child, index * step);
    });
  });

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion || !('IntersectionObserver' in window)) {
    elements.forEach((el) => el.classList.add('is-visible'));
    revealObserver = null;
    return;
  }

  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        el.classList.add('is-visible');
        if (el.dataset.revealOnce !== 'false') revealObserver?.unobserve(el);
      });
    },
    { threshold: 0.01, rootMargin: '0px 0px 0px 0px' },
  );

  elements.forEach((el) => {
    revealObserver.observe(el);
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.classList.add('is-visible');
      if (el.dataset.revealOnce !== 'false') revealObserver.unobserve(el);
    }
  });
}

function refreshRevealAnimations() {
  if (revealFrame) cancelAnimationFrame(revealFrame);
  revealFrame = requestAnimationFrame(() => {
    revealFrame = 0;
    applyRevealAnimations();
  });
}

function refreshRevealAfterPaint() {
  nextTick(() => {
    refreshRevealAnimations();
    window.setTimeout(refreshRevealAnimations, 460);
  });
}

onMounted(() => {
  refreshRevealAfterPaint();
});

watch(
  () => route.fullPath,
  refreshRevealAfterPaint,
);

onBeforeUnmount(() => {
  if (revealFrame) cancelAnimationFrame(revealFrame);
  revealObserver?.disconnect();
});
</script>
