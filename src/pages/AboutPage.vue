<template>
  <div id="topbarMain" :data-ready="topbarVisible">
    <RouterLink class="topbar-logo-link" to="/" aria-label="Home" data-cursor-hover>
      <img class="topbar-logo" src="@/assets/img/logo/Logo.png" alt="Christopher Böhme">
    </RouterLink>
    <label class="top-search" aria-label="Search" @click.stop="openSearchModal">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="11" cy="11" r="6.5" stroke="currentColor" stroke-width="2" fill="none" />
        <path d="M16.5 16.5 21 21" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
      </svg>
      <input type="search" placeholder="Search" readonly @focus.prevent="openSearchModal" @mousedown.prevent="openSearchModal">
      <span class="kbd-hint"><span class="kbd">/</span></span>
    </label>
    <button
      id="hamburger"
      type="button"
      aria-label="Menu"
      :aria-expanded="menuOpen"
      :class="{ 'is-open': menuOpen }"
      @click.stop="toggleMenu"
    >
      <span id="bar1"></span>
      <span id="bar2"></span>
      <span id="bar3"></span>
    </button>
    <div id="topbarMenu" :data-open="menuOpen" @pointermove="keepMenuOpen" @focusin="keepMenuOpen" @keydown="keepMenuOpen">
      <RouterLink to="/about" role="menuitem" @click="closeMenu">About me</RouterLink>
      <RouterLink to="/Team" role="menuitem" @click="closeMenu">Works</RouterLink>
      <RouterLink to="/opensource" role="menuitem" @click="closeMenu">Open Source</RouterLink>
      <RouterLink to="/reviews/" role="menuitem" @click="closeMenu">Reviews</RouterLink>
      <RouterLink to="/links" role="menuitem" @click="closeMenu">Links</RouterLink>
      <RouterLink to="/credits/" role="menuitem" @click="closeMenu">Credits</RouterLink>
    </div>
  </div>

  <main class="about-page">
    <section class="chris-hero" data-reveal="fade-up">
      <div class="hero-name">
        <h1>Chris</h1>
      </div>
      <p class="hero-copy">
        I build clean interfaces, readable systems, and project details that feel fast, clear, and finished.
      </p>
      <RouterLink class="hero-status" to="/links" aria-label="Comissions Open" data-cursor-hover>
        <span></span>
        <p>Comissions Open</p>
        <svg class="hero-status__arrow" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M7 17 17 7M10 7h7v7" />
        </svg>
      </RouterLink>
    </section>

    <section class="build-focus" data-reveal="fade-up">
      <div>
        <p class="section-kicker">How I work</p>
        <h2>Functional first, polished after, never messy.</h2>
      </div>
      <p>
        I focus on the pieces that make a project feel complete: smooth page movement, reliable navigation, readable logic, and UI states that do not need explaining.
      </p>
    </section>

    <section class="focus-board" data-reveal-stagger="0.08" aria-label="Focus areas">
      <article v-for="item in focusItems" :key="item.title" data-reveal="fade-up">
        <span>{{ item.index }}</span>
        <div>
          <h2>{{ item.title }}</h2>
          <p>{{ item.text }}</p>
        </div>
      </article>
    </section>

    <section class="stack-track" data-reveal="fade-up" aria-label="Chris stack">
      <p>Comms Open</p>
      <p>Custom UI</p>
      <p>Roblox Systems</p>
      <p>Portfolio Pages</p>
      <p>Bug Fixes</p>
      <p>Polish Passes</p>
    </section>

    <section class="build-log" data-reveal="fade-up">
      <div class="log-heading">
        <p class="section-kicker">Timeline</p>
        <h2>Build log</h2>
      </div>
      <div class="log-list">
        <article v-for="item in timeline" :key="item.year" data-reveal="fade-up">
          <time>{{ item.year }}</time>
          <div>
            <h3>{{ item.title }}</h3>
            <p>{{ item.text }}</p>
          </div>
        </article>
      </div>
    </section>
  </main>

  <teleport to="body">
    <transition name="fade">
      <div v-if="searchModalOpen" class="search-modal" role="dialog" aria-modal="true" @click.self="closeSearchModal">
        <div class="search-card blank-card" @keydown.esc.prevent="closeSearchModal">
          <div class="search-card__input">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="11" cy="11" r="6.5" stroke="currentColor" stroke-width="2" fill="none" />
              <path d="M16.5 16.5 21 21" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
            </svg>
            <input
              ref="modalSearchInput"
              v-model="searchQuery"
              type="search"
              placeholder="Search"
              aria-label="Search"
              autocomplete="off"
              @keydown.enter.prevent="handleModalEnter"
            >
            <span class="kbd-hint modal-kbd"><span class="kbd">/</span></span>
          </div>

          <div id="SAthing">
            <div v-if="filteredPages.length" id="Pages">
              <button class="picker-head" type="button" :data-open="pagesShouldOpen" :aria-expanded="pagesShouldOpen" aria-controls="pageList" @click="togglePages">
                <svg class="collapse-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M8.9 1.5 17 12 8.9 22.5" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <span class="flag header-flag" aria-hidden="true">
                  <svg class="pages-grid-icon" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.8" />
                    <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.8" />
                    <rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.8" />
                    <rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.8" />
                  </svg>
                </span>
                <span class="lang-title">Pages</span>
              </button>
              <transition name="collapse">
                <transition-group v-if="pagesShouldOpen" id="pageList" class="page-list" role="listbox" aria-label="Pages" name="langitem" tag="ul">
                  <li v-for="(page, idx) in filteredPages" :key="page.slug" :style="{ '--d': `${idx * 0.03}s` }">
                    <button type="button" class="page-option" role="option" data-cursor-hover @click="selectPage(page.slug, page.href)">
                      <span class="page-inner">
                        <span class="page-icon" aria-hidden="true">
                          <svg v-if="page.slug === 'home'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10.5 12 3l9 7.5"/><path d="M5.5 9V21h13V9"/></svg>
                          <svg v-else-if="page.slug === 'open-source'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7h18"/><path d="m6 7 1-3h10l1 3"/><rect x="5" y="7" width="14" height="12" rx="2"/><path d="M9 11h6M9 15h6"/></svg>
                          <svg v-else-if="page.slug === 'developers'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m4 21 4-4M4 17l4 4"/><path d="M15.5 3.5a2.12 2.12 0 0 1 3 3L11 14l-4 1 1-4 7.5-7.5Z"/></svg>
                          <svg v-else-if="page.slug === 'links'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 1 0-7l1.5-1.5a5 5 0 0 1 7 7L17 13"/><path d="M14 11a5 5 0 0 1 0 7l-1.5 1.5a5 5 0 1 1-7-7L7 11"/></svg>
                          <svg v-else-if="page.slug === 'reviews'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 15a3 3 0 0 1-3 3H9l-5 3v-6a3 3 0 0 1-1-2.25V7a3 3 0 0 1 3-3h11a3 3 0 0 1 3 3Z"/><path d="M8 9h.01M12 9h.01M16 9h.01"/></svg>
                          <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2h9l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z"/><path d="M14 2v5h5M9 13h6M9 17h6"/></svg>
                        </span>
                        <span class="page-name">{{ page.label }}</span>
                      </span>
                    </button>
                  </li>
                </transition-group>
              </transition>
            </div>
          </div>
          <p class="search-command-hint">Fun fact: type <kbd>.all</kbd> to show everything</p>
        </div>
      </div>
    </transition>
  </teleport>

  <SmoothCursor />
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import SmoothCursor from '@/components/SmoothCursor.vue';
import { matchesSearch } from '@/lib/searchMatch';
import { useAutoCloseMenu } from '@/lib/useAutoCloseMenu';

const router = useRouter();
const topbarVisible = ref(false);
const menuOpen = ref(false);
const { closeMenu, keepMenuOpen, toggleMenu } = useAutoCloseMenu(menuOpen);
const searchModalOpen = ref(false);
const searchQuery = ref('');
const modalSearchInput = ref(null);
const previousOverflow = ref(null);
const pagesOpen = ref(true);

const pages = [
  { slug: 'home', label: 'Home', href: '/' },
  { slug: 'about', label: 'About me', href: '/about' },
  { slug: 'open-source', label: 'Open Source', href: '/opensource' },
  { slug: 'developers', label: 'Works', href: '/Team' },
  { slug: 'links', label: 'Links', href: '/links' },
  { slug: 'reviews', label: 'Reviews', href: '/reviews/' },
  { slug: 'credits', label: 'Credits', href: '/credits/' },
];

const filteredPages = computed(() => {
  const query = searchQuery.value.trim().toLowerCase();
  if (!query || query === '.all') return pages;
  return pages.filter((page) => matchesSearch(query, [page.label, page.slug, page.href]));
});

const pagesShouldOpen = computed(() => pagesOpen.value || Boolean(searchQuery.value.trim() && filteredPages.value.length));

const focusItems = [
  {
    index: '01',
    title: 'Clear UI',
    text: 'I make layouts, controls, and states easy to scan so the page feels usable without extra explanation.',
  },
  {
    index: '02',
    title: 'Readable Systems',
    text: 'I keep logic organized, named clearly, and practical to change later instead of turning it into a maze.',
  },
  {
    index: '03',
    title: 'Finish Work',
    text: 'I care about the last details: spacing, transitions, empty states, fallbacks, and the small things people notice.',
  },
];

const timeline = [
  {
    year: '2022',
    title: 'Started building systems',
    text: 'I started by learning how to structure project logic and keep client/server behavior understandable.',
  },
  {
    year: '2023',
    title: 'Moved deeper into UI',
    text: 'I began spending more time on cleaner layouts, better states, and smoother paths through each project.',
  },
  {
    year: '2024',
    title: 'Expanded the work',
    text: 'I started bringing the same product thinking into pages, portfolios, and more complete frontend builds.',
  },
  {
    year: 'Now',
    title: 'Commissions and polish',
    text: 'I am focused on useful commissions, strong presentation, and making projects feel finished instead of just functional.',
  },
];

function handleKeydown(event) {
  if (event.key === '/' && !event.metaKey && !event.ctrlKey && !event.altKey) {
    const active = document.activeElement;
    if (active && ['INPUT', 'TEXTAREA'].includes(active.tagName)) return;
    event.preventDefault();
    openSearchModal();
  }
  if (event.key === 'Escape' && searchModalOpen.value) closeSearchModal();
  if (event.key === 'Escape') menuOpen.value = false;
}

function openSearchModal() {
  menuOpen.value = false;
  searchModalOpen.value = true;
  previousOverflow.value = document.documentElement.style.overflow || '';
  document.documentElement.style.overflow = 'hidden';
  pagesOpen.value = true;
  nextTick(() => modalSearchInput.value?.focus());
}

function closeSearchModal() {
  searchModalOpen.value = false;
  searchQuery.value = '';
  if (previousOverflow.value !== null) {
    document.documentElement.style.overflow = previousOverflow.value;
    previousOverflow.value = null;
  }
}

function selectPage(slug, href) {
  closeSearchModal();
  router.push(href);
}

function handleModalEnter() {
  const page = filteredPages.value[0];
  if (page) selectPage(page.slug, page.href);
}

function togglePages() {
  pagesOpen.value = !pagesOpen.value;
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
  requestAnimationFrame(() => {
    topbarVisible.value = true;
  });
});

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown);
  if (searchModalOpen.value) closeSearchModal();
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Allura&family=Orbitron:wght@400..900&family=Space+Grotesk:wght@300..700&display=swap');

:global(body) {
  background: #000;
}

#topbarMain {
  position: fixed;
  top: 18px;
  left: 50%;
  z-index: 999;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: .75rem;
  width: min(94vw, 54rem);
  padding: .35rem .75rem;
  border: 1px solid rgba(255,255,255,.12);
  border-radius: 1rem;
  color: #fff;
  background: rgba(0,0,0,.2);
  backdrop-filter: blur(12px) saturate(120%);
  box-shadow: 0 12px 44px rgba(0,0,0,.38);
  opacity: 0;
  transform: translate(-50%, -140%);
  transition: transform 820ms cubic-bezier(.17,.99,.42,1.19), opacity 320ms ease;
}

#topbarMain[data-ready="true"] {
  opacity: 1;
  transform: translate(-50%,0);
}

.topbar-logo {
  width: 42px;
  height: 42px;
  object-fit: contain;
}

.top-search {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: .5rem;
  height: 42px;
  padding: .35rem .6rem;
  border: 1px solid rgba(255,255,255,.12);
  border-radius: 12px;
}

.top-search svg {
  width: 18px;
  height: 18px;
}

.top-search input {
  width: 100%;
  border: 0;
  outline: 0;
  color: #fff;
  background: transparent;
  font: .94rem "Space Grotesk", sans-serif;
}

.kbd-hint {
  display: inline-flex;
  gap: .2rem;
}

.kbd {
  display: inline-flex;
  min-width: 20px;
  align-items: center;
  justify-content: center;
  padding: 2px 6px;
  border: 1px solid rgba(255,255,255,.2);
  border-radius: 6px;
  background: rgba(255,255,255,.05);
  font-size: .74rem;
}

.modal-kbd {
  margin-left: auto;
}

#hamburger {
  display: grid;
  width: 38px;
  height: 38px;
  place-items: center;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: transparent;
}

#hamburger span {
  grid-area: 1 / 1;
  width: 20px;
  height: 2px;
  border-radius: 999px;
  background: #fff;
  transform-origin: center;
  transition: opacity 170ms ease, transform 260ms cubic-bezier(.22,.8,.36,1), width 220ms ease;
}

#hamburger #bar1 { transform: translateY(-6px); }
#hamburger #bar2 { width: 13px; transform: translateY(0); }
#hamburger #bar3 { transform: translateY(6px); }
#hamburger.is-open #bar1 { transform: rotate(45deg); }
#hamburger.is-open #bar2 { opacity: 0; transform: scaleX(.2); }
#hamburger.is-open #bar3 { transform: rotate(-45deg); }

.fade-enter-active,
.fade-leave-active {
  transition: opacity 200ms ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.search-modal {
  position: fixed;
  inset: 0;
  z-index: 999998;
  isolation: isolate;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(1.25rem,4vw,2.5rem);
  overflow: hidden;
  background: rgba(0,0,0,.35);
  backdrop-filter: blur(12px);
}

.search-card {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  width: min(620px,94vw);
  max-height: min(78vh,720px);
  padding: 1.4rem;
  overflow: auto;
  border: 1px solid rgba(255,255,255,.12);
  border-radius: 1rem;
  color: rgba(255,255,255,.9);
  background: #000;
  box-shadow: 0 28px 80px rgba(0,0,0,.48);
  font-family: "Space Grotesk", sans-serif;
}

.blank-card {
  align-items: stretch;
  justify-content: flex-start;
}

.search-card__input {
  display: grid;
  grid-template-columns: auto minmax(0,1fr) auto;
  align-items: center;
  gap: .55rem;
  width: 100%;
  padding-bottom: .7rem;
  border-bottom: 1px solid rgba(255,255,255,.14);
}

.search-card__input svg {
  width: 20px;
  height: 20px;
  opacity: .9;
}

.search-card__input input {
  min-width: 0;
  border: 0;
  outline: 0;
  color: rgba(255,255,255,.9);
  background: transparent;
  font: 1rem "Space Grotesk", sans-serif;
}

#SAthing,
#Pages {
  position: relative;
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
}

.picker-head {
  display: inline-flex;
  align-items: center;
  gap: .55rem;
  width: 100%;
  padding: .35rem 0;
  border: 0;
  color: inherit;
  background: none;
  font: inherit;
  text-align: left;
}

.collapse-icon {
  width: 16px;
  height: 16px;
  transform-origin: center;
  transition: transform 260ms cubic-bezier(.22,.8,.36,1);
}

.picker-head[data-open="true"] .collapse-icon {
  transform: rotate(90deg);
}

.header-flag,
.flag {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.pages-grid-icon {
  width: 16px;
  height: 16px;
}

.lang-title {
  color: rgba(255,255,255,.9);
  font: .95rem "Space Grotesk", sans-serif;
  letter-spacing: .02em;
}

.page-list {
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: .3rem;
  margin: .25rem 0 0;
  padding: 0 0 0 1rem;
  overflow: hidden;
  list-style: none;
}

.page-option {
  display: inline-flex;
  align-items: center;
  width: 100%;
  padding: .35rem .1rem .35rem .4rem;
  border: 0;
  border-bottom: 1px solid rgba(255,255,255,.16);
  color: rgba(255,255,255,.9);
  background: transparent;
  font: .95rem "Space Grotesk", sans-serif;
  text-align: left;
}

.page-inner {
  display: inline-flex;
  align-items: center;
  gap: .6rem;
  width: 100%;
  transform: translateX(0);
  transition: transform 200ms cubic-bezier(.22,.8,.36,1);
}

.page-option:hover .page-inner {
  transform: translateX(4px);
}

.page-icon {
  display: inline-flex;
  flex: 0 0 24px;
  width: 24px;
  height: 24px;
  align-items: center;
  justify-content: center;
  color: rgba(255,255,255,.9);
}

.page-icon svg {
  display: block;
  width: 20px;
  height: 20px;
}

.page-name {
  flex: 1;
}

.collapse-enter-active,
.collapse-leave-active {
  overflow: hidden;
  transition: max-height 320ms cubic-bezier(.22,.8,.36,1), opacity 260ms ease;
}

.collapse-enter-from,
.collapse-leave-to {
  max-height: 0;
  opacity: 0;
}

.collapse-enter-to,
.collapse-leave-from {
  max-height: 500px;
  opacity: 1;
}

.langitem-enter-active,
.langitem-leave-active {
  transition: opacity 320ms cubic-bezier(.22,.8,.36,1) calc(var(--d,0s) + .12s), transform 320ms cubic-bezier(.22,.8,.36,1) calc(var(--d,0s) + .12s);
}

.langitem-enter-from,
.langitem-leave-to {
  opacity: 0;
  transform: translateX(10px) scale(.98);
}

.about-page {
  position: relative;
  min-height: 100vh;
  padding: clamp(7rem, 10vw, 9.5rem) clamp(1.25rem, 7vw, 6rem) clamp(6rem, 10vw, 9rem);
  overflow: hidden;
  color: #fff;
  background:
    radial-gradient(circle at 72% 18%, rgba(70,110,255,.22), transparent 24rem),
    radial-gradient(circle at 10% 55%, rgba(255,255,255,.07), transparent 20rem),
    linear-gradient(180deg, #010103 0%, #000 44%, #020204 100%);
  font-family: "Space Grotesk", sans-serif;
}

.about-page::before {
  position: absolute;
  inset: 0;
  z-index: 0;
  background:
    linear-gradient(115deg, transparent 0 42%, rgba(255,255,255,.06) 42% 42.12%, transparent 42.12% 100%),
    repeating-linear-gradient(90deg, rgba(255,255,255,.028) 0 1px, transparent 1px 88px);
  mask-image: linear-gradient(to bottom, rgba(0,0,0,.9), transparent 78%);
  content: "";
  pointer-events: none;
}

.about-page::after {
  position: absolute;
  inset: 0;
  z-index: 0;
  background: linear-gradient(90deg, rgba(0,0,0,.72), transparent 26%, transparent 76%, rgba(0,0,0,.76));
  content: "";
  pointer-events: none;
}

.chris-hero,
.build-focus,
.focus-board,
.stack-track,
.build-log {
  position: relative;
  z-index: 2;
  max-width: 1160px;
  margin-inline: auto;
}

.section-kicker {
  margin: 0;
  color: rgba(255,255,255,.5);
  font: 700 .76rem Orbitron, sans-serif;
  letter-spacing: .24em;
  text-transform: uppercase;
}

.chris-hero {
  min-height: clamp(28rem, 58vh, 40rem);
  display: grid;
  align-content: end;
  gap: clamp(1rem, 2.5vw, 1.5rem);
  padding-bottom: clamp(1.1rem, 3.2vw, 2.8rem);
  border-bottom: 1px solid rgba(255,255,255,.1);
}

.hero-name {
  position: relative;
  display: grid;
  gap: .3rem;
}

.hero-name h1 {
  position: relative;
  z-index: 2;
  margin: 0;
  color: transparent;
  font: 900 clamp(5.6rem, 18vw, 14rem)/.74 Orbitron, sans-serif;
  letter-spacing: 0;
  text-transform: uppercase;
  background: linear-gradient(90deg, #fff 0%, #cbd8ff 38%, #7398ff 72%, rgba(255,255,255,.72) 100%);
  background-clip: text;
  -webkit-background-clip: text;
  filter: drop-shadow(0 0 30px rgba(92,128,255,.26));
}

.hero-copy {
  max-width: 760px;
  margin: 0;
  color: rgba(255,255,255,.78);
  font-size: clamp(1.15rem, 2.2vw, 1.55rem);
  line-height: 1.58;
}

.hero-status {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: .68rem;
  width: fit-content;
  margin-top: .35rem;
  padding: .62rem .15rem .62rem 0;
  border: 0;
  color: inherit;
  background: transparent;
  text-decoration: none;
}

.hero-status span {
  position: relative;
  width: .48rem;
  height: .48rem;
  border-radius: 999px;
  background: #22c55e;
  box-shadow: none;
}

.hero-status span::after {
  position: absolute;
  inset: -.42rem;
  border: 2px solid rgba(34,197,94,.58);
  border-radius: 999px;
  animation: statusPulse 1.35s ease-out infinite;
  content: "";
}

.hero-status p {
  margin: 0;
  color: rgba(255,255,255,.78);
  font: 700 .82rem "Space Grotesk", sans-serif;
}

.hero-status__arrow {
  width: .9rem;
  height: .9rem;
  color: rgba(255,255,255,.64);
  fill: none;
  stroke: currentColor;
  stroke-width: 2.2;
  stroke-linecap: round;
  stroke-linejoin: round;
  transform: translate(0, 0);
  transition: color 180ms ease, transform 180ms ease;
}

.hero-status:hover .hero-status__arrow,
.hero-status:focus-visible .hero-status__arrow {
  color: #fff;
  transform: translate(2px, -2px);
}

@keyframes statusPulse {
  0% {
    opacity: .9;
    transform: scale(.35);
  }
  80% {
    opacity: 0;
    transform: scale(1.8);
  }
  100% {
    opacity: 0;
    transform: scale(1.8);
  }
}

.build-focus {
  display: grid;
  grid-template-columns: minmax(260px, .82fr) minmax(0, 1fr);
  gap: clamp(1.5rem, 6vw, 5rem);
  padding-block: clamp(3.5rem, 8vw, 6rem);
}

.build-focus h2,
.focus-board h2,
.build-log h2,
.log-list h3 {
  margin: 0;
  color: #fff;
  font: 800 clamp(1.28rem, 2.8vw, 2.25rem)/1.15 Orbitron, sans-serif;
  letter-spacing: 0;
}

.build-focus > p,
.focus-board p,
.log-list p {
  margin: .85rem 0 0;
  color: rgba(255,255,255,.66);
  line-height: 1.68;
}

.focus-board {
  display: grid;
  gap: 0;
  border-top: 1px solid rgba(255,255,255,.1);
  border-bottom: 1px solid rgba(255,255,255,.1);
}

.focus-board article {
  position: relative;
  display: grid;
  grid-template-columns: minmax(74px, 120px) minmax(0, 1fr);
  gap: clamp(1rem, 5vw, 4rem);
  align-items: start;
  padding: clamp(1.35rem, 3.4vw, 2.2rem) 0;
  border-bottom: 1px solid rgba(255,255,255,.08);
  transition: padding-left 220ms ease, background 220ms ease;
}

.focus-board article:last-child {
  border-bottom: 0;
}

.focus-board article:hover {
  padding-left: .75rem;
  background: linear-gradient(90deg, rgba(143,178,255,.055), transparent 42%);
}

.focus-board article::before {
  position: absolute;
  top: 0;
  left: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(to bottom, transparent, rgba(143,178,255,.76), transparent);
  opacity: 0;
  transition: opacity 220ms ease;
  content: "";
}

.focus-board article:hover::before {
  opacity: 1;
}

.focus-board span {
  color: rgba(138,170,255,.82);
  font: 800 .78rem Orbitron, sans-serif;
  letter-spacing: .18em;
}

.focus-board div {
  display: grid;
  grid-template-columns: minmax(190px, 300px) minmax(0, 1fr);
  gap: clamp(1rem, 4vw, 3rem);
}

.stack-track {
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 1px;
  margin-top: clamp(2.2rem, 6vw, 4.5rem);
  background: rgba(255,255,255,.1);
}

.stack-track p {
  min-height: 4rem;
  display: grid;
  place-items: center;
  margin: 0;
  color: rgba(255,255,255,.7);
  background: #030305;
  font: 700 .84rem "Space Grotesk", sans-serif;
}

.build-log {
  display: grid;
  grid-template-columns: minmax(170px, 280px) minmax(0, 1fr);
  gap: clamp(1.8rem, 6vw, 5.5rem);
  padding-top: clamp(3.5rem, 8vw, 6.2rem);
}

.log-heading {
  position: sticky;
  top: 8rem;
  align-self: start;
  display: grid;
  gap: .7rem;
}

.log-heading::after {
  width: 4.5rem;
  height: 1px;
  margin-top: .6rem;
  background: linear-gradient(90deg, #8fb2ff, transparent);
  content: "";
}

.log-list {
  display: grid;
}

.log-list article {
  position: relative;
  display: grid;
  grid-template-columns: minmax(70px, 110px) minmax(0, 1fr);
  gap: clamp(1rem, 3vw, 2.4rem);
  padding: 0 0 clamp(1.9rem, 4vw, 3.1rem) clamp(1.2rem, 2.5vw, 2rem);
  border-left: 1px solid rgba(255,255,255,.12);
  transition: border-color 220ms ease;
}

.log-list article:hover {
  border-color: rgba(143,178,255,.38);
}

.log-list article + article {
  padding-top: clamp(1.9rem, 4vw, 3.1rem);
}

.log-list article::before {
  position: absolute;
  top: .28rem;
  left: -4px;
  width: 7px;
  height: 7px;
  border-radius: 999px;
  background: #8fb2ff;
  box-shadow: 0 0 0 5px rgba(143,178,255,.12), 0 0 18px rgba(143,178,255,.55);
  content: "";
}

.log-list time {
  padding-top: .22rem;
  color: rgba(255,255,255,.46);
  font: 800 .82rem Orbitron, sans-serif;
  letter-spacing: .12em;
}

.log-list h3 {
  font-size: clamp(1.05rem, 2vw, 1.45rem);
}

@media (max-width: 800px) {
  .build-focus,
  .focus-board article,
  .focus-board div,
  .stack-track,
  .build-log,
  .log-list article {
    grid-template-columns: 1fr;
  }

  .about-page {
    padding-top: 6.75rem;
  }

  .chris-hero {
    min-height: auto;
    padding-block: clamp(3rem, 12vw, 5.25rem) clamp(1.3rem, 5vw, 2.4rem);
  }

  .hero-status {
    align-items: flex-start;
    border-radius: 18px;
  }

  .stack-track {
    gap: 0;
    background: transparent;
  }

  .stack-track p {
    min-height: 3rem;
    place-items: start;
    padding-block: .75rem;
    border-top: 1px solid rgba(255,255,255,.08);
    background: transparent;
  }

  .log-heading {
    position: static;
  }
}
</style>
