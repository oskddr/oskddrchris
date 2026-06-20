import { createRouter, createWebHistory } from 'vue-router';

import { finishNavigation, setNavigationStep, startNavigation } from '../lib/navigationLoader';

const HomePage = () => import('../pages/HomePage.vue');
const DevelopersPage = () => import('../pages/DevelopersPage.vue');
const DeveloperProfilePage = () => import('../pages/DeveloperProfilePage.vue');
const NotFoundPage = () => import('../pages/NotFoundPage.vue');
const AssetPage = () => import('../pages/AssetPage.vue');
const OpenSourcePage = () => import('../pages/OpenSourcePage.vue');
const LinksPage = () => import('../pages/LinksPage.vue');
const TestimonialsPage = () => import('../pages/TestimonialsPage.vue');

const HISTORY_KEY = 'zantixHistory';

const addHistoryEntry = (path, label) => {
  if (typeof window === 'undefined') return;
  try {
    const parsed = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
    const filtered = parsed.filter((item) => item.path !== path);
    filtered.unshift({ path, label });
    const trimmed = filtered.slice(0, 3);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(trimmed));
  } catch (err) {
    console.warn('Unable to record history', err);
  }
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
      meta: { label: 'Home' },
    },
    {
      path: '/Team',
      name: 'developers',
      component: DevelopersPage,
      meta: { label: 'Developers' },
    },
    {
      path: '/opensource',
      name: 'open-source',
      component: OpenSourcePage,
      meta: { label: 'Open Source' },
    },
    {
      path: '/links',
      name: 'links',
      component: LinksPage,
      meta: { label: 'Links' },
    },
    {
      path: '/testimonials',
      name: 'testimonials',
      component: TestimonialsPage,
      meta: { label: 'Testimonials' },
    },
    {
      path: '/Team/:group/:slug',
      name: 'developer-profile',
      component: DeveloperProfilePage,
      meta: { label: 'Profile' },
    },
    {
      path: '/Assets/:assetSlug',
      name: 'asset',
      component: AssetPage,
      meta: { label: 'Asset' },
    },
    {
      path: '/Assets/:assetSlug/L:licenseSlug',
      name: 'asset-license',
      component: AssetPage,
      meta: { label: 'Asset' },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundPage,
      meta: { label: 'Not Found' },
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition;
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' };
    }
    return { top: 0 };
  },
});

router.beforeEach((to, from, next) => {
  startNavigation(to.meta?.label || (typeof to.name === 'string' ? to.name : 'Page'));
  if (from && from.path) {
    const label =
      (from.meta && from.meta.label) ||
      (typeof from.name === 'string' ? from.name : from.fullPath) ||
      from.fullPath;
    addHistoryEntry(from.fullPath, label);
  }
  next();
});

router.beforeResolve(() => {
  setNavigationStep(1);
});

router.afterEach(() => {
  setNavigationStep(2);
  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => {
      finishNavigation();
    });
  });
});

router.onError(() => {
  finishNavigation();
});

export default router;
