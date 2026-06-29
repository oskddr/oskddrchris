<template>
  <div id="topbarMain" :data-ready="topbarVisible">
    <RouterLink class="topbar-logo-link" to="/" aria-label="Home" data-cursor-hover>
      <img class="topbar-logo" src="@/assets/img/logo/Logo.png" alt="Christopher Böhme">
    </RouterLink>
    <label class="top-search" aria-label="Search" @click.stop="openSearchModal">
      <Search aria-hidden="true" />
      <input type="search" placeholder="Search" readonly @focus.prevent="openSearchModal" @mousedown.prevent="openSearchModal">
      <span class="kbd-hint"><span class="kbd">/</span></span>
    </label>
    <button id="hamburger" type="button" aria-label="Menu" :aria-expanded="menuOpen" :class="{ 'is-open': menuOpen }" @click.stop="toggleMenu">
      <span id="bar1"></span>
      <span id="bar2"></span>
      <span id="bar3"></span>
    </button>
    <div id="topbarMenu" :data-open="menuOpen" @pointermove="keepMenuOpen" @focusin="keepMenuOpen" @keydown="keepMenuOpen">
      <RouterLink to="/about" role="menuitem" @click="closeMenu">About me</RouterLink>
      <RouterLink to="/Team" role="menuitem" @click="closeMenu">Team</RouterLink>
      <RouterLink to="/opensource" role="menuitem" @click="closeMenu">Open Source</RouterLink>
      <RouterLink to="/reviews/" role="menuitem" @click="closeMenu">Reviews</RouterLink>
      <RouterLink to="/links" role="menuitem" @click="closeMenu">Links</RouterLink>
      <RouterLink to="/credits/" role="menuitem" @click="closeMenu">Credits</RouterLink>
    </div>
  </div>

  <main class="credits-page">
    <section class="credits-hero" data-reveal="fade-up">
      <p class="section-kicker">Things used</p>
      <h1>Credits</h1>
      <p>
        A short list of external icon and UI resources used in this site.
      </p>
    </section>

    <section class="credits-grid" aria-label="Credits">
      <article v-for="section in creditSections" :key="section.title" class="credit-section" data-reveal="fade-up">
        <div class="credit-section__head">
          <p>{{ section.kicker }}</p>
          <h2>{{ section.title }}</h2>
        </div>
        <ul class="credit-list">
          <li v-for="item in section.items" :key="item.name">
            <div>
              <h3>{{ item.name }}</h3>
              <p>{{ item.note }}</p>
            </div>
            <a class="credit-link" :href="item.href" target="_blank" rel="noopener noreferrer" data-cursor-hover>
              <span>Go to website</span>
              <ArrowUpRight aria-hidden="true" />
            </a>
          </li>
        </ul>
      </article>
    </section>

  </main>

  <footer class="credits-footer">
    <RouterLink to="/">Christopher Böhme</RouterLink>
    <RouterLink to="/credits/">Things used</RouterLink>
  </footer>

  <teleport to="body">
    <transition name="fade">
      <div v-if="searchModalOpen" class="search-modal" role="dialog" aria-modal="true" @click.self="closeSearchModal">
        <div class="search-card blank-card" @keydown.esc.prevent="closeSearchModal">
          <div class="search-card__input">
            <Search aria-hidden="true" />
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
                <ChevronRight class="collapse-icon" aria-hidden="true" />
                <span class="flag header-flag" aria-hidden="true">
                  <Grid2X2 class="pages-grid-icon" />
                </span>
                <span class="lang-title">Pages</span>
              </button>
              <transition name="collapse">
                <transition-group v-if="pagesShouldOpen" id="pageList" class="page-list" role="listbox" aria-label="Pages" name="langitem" tag="ul">
                  <li v-for="(page, idx) in filteredPages" :key="page.slug" :style="{ '--d': `${idx * 0.03}s` }">
                    <button type="button" class="page-option" role="option" data-cursor-hover @click="selectPage(page.href)">
                      <span class="page-inner">
                        <span class="page-icon" aria-hidden="true">
                          <component :is="page.icon" />
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
import {
  ArrowUpRight,
  Boxes,
  ChevronRight,
  FileText,
  Grid2X2,
  Home,
  Link2,
  MessageSquareText,
  Search,
  UsersRound,
} from 'lucide-vue-next';
import { RouterLink, useRouter } from 'vue-router';
import SmoothCursor from '@/components/SmoothCursor.vue';
import { matchesSearch } from '@/lib/searchMatch';
import { useAutoCloseMenu } from '@/lib/useAutoCloseMenu';

const router = useRouter();
const topbarVisible = ref(false);
const menuOpen = ref(false);
const searchModalOpen = ref(false);
const searchQuery = ref('');
const modalSearchInput = ref(null);
const previousOverflow = ref(null);
const pagesOpen = ref(true);
const { closeMenu, keepMenuOpen, toggleMenu } = useAutoCloseMenu(menuOpen);

const pages = [
  { slug: 'home', label: 'Home', href: '/', icon: Home },
  { slug: 'about', label: 'About me', href: '/about', icon: UsersRound },
  { slug: 'open-source', label: 'Open Source', href: '/opensource', icon: Boxes },
  { slug: 'developers', label: 'Team', href: '/Team', icon: UsersRound },
  { slug: 'links', label: 'Links', href: '/links', icon: Link2 },
  { slug: 'reviews', label: 'Reviews', href: '/reviews/', icon: MessageSquareText },
  { slug: 'credits', label: 'Credits', href: '/credits/', icon: FileText },
];

const creditSections = [
  {
    kicker: 'Credits',
    title: 'Things used',
    items: [
      {
        name: 'Lucide icons',
        note: 'Icons used across the interface for search, page links, and actions.',
        href: 'https://lucide.dev/',
      },
      {
        name: 'Inspira UI Pattern Background',
        note: 'The subtle moving grid background used in the portfolio shell.',
        href: 'https://inspira-ui.com/',
      },
      {
        name: 'Lenis',
        note: 'The smooth scrolling engine used to create the fluid page transitions across the site.',
        href: 'https://www.lenis.dev/',
      },
    ],
  },
];

const filteredPages = computed(() => {
  const query = searchQuery.value.trim().toLowerCase();
  if (!query || query === '.all') return pages;
  return pages.filter((page) => matchesSearch(query, [page.label, page.slug, page.href]));
});

const pagesShouldOpen = computed(() => pagesOpen.value || Boolean(searchQuery.value.trim() && filteredPages.value.length));

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

function selectPage(href) {
  closeSearchModal();
  router.push(href);
}

function handleModalEnter() {
  const page = filteredPages.value[0];
  if (page) selectPage(page.href);
}

function togglePages() {
  pagesOpen.value = !pagesOpen.value;
}

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

onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
  window.requestAnimationFrame(() => {
    topbarVisible.value = true;
  });
});

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown);
  if (searchModalOpen.value) closeSearchModal();
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Allura&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Orbitron:wght@400..900&family=Space+Grotesk:wght@300..700&display=swap');

:global(body) {
  background: #000;
}

:global(:root) {
  --ui-bg: rgba(255, 255, 255, 0.05);
  --ui-border: rgba(255, 255, 255, 0.12);
  --ui-text: rgba(255, 255, 255, 0.9);
  --card-bg: #000;
  --overlay-bg: rgba(0, 0, 0, 0.35);
  --kbd-border: rgba(255, 255, 255, 0.2);
  --kbd-bg: rgba(255, 255, 255, 0.05);
  --input-border: rgba(255, 255, 255, 0.14);
}

#topbarMain {
  position: fixed;
  top: 18px;
  left: 50%;
  z-index: 999;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 0.75rem;
  width: min(94vw, 54rem);
  padding: 0.35rem 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 1rem;
  color: #fff;
  background: rgba(8, 10, 16, 0.48);
  box-shadow: 0 12px 44px rgba(0, 0, 0, 0.38);
  backdrop-filter: blur(12px) saturate(120%);
  opacity: 0;
  transform: translate(-50%, -140%);
  transition: transform 820ms cubic-bezier(0.17, 0.99, 0.42, 1.19), opacity 320ms ease;
}

#topbarMain[data-ready="true"] {
  opacity: 1;
  transform: translate(-50%, 0);
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
  justify-self: center;
  gap: 0.5rem;
  width: min(620px, 100%);
  height: 42px;
  padding: 0.35rem 0.6rem 0.35rem 0.52rem;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 12px;
  color: rgba(255, 255, 255, 0.9);
  background: transparent;
}

.top-search svg {
  width: 18px;
  height: 18px;
  opacity: 0.9;
}

.top-search input {
  width: 100%;
  height: 100%;
  border: 0;
  outline: 0;
  color: #fff;
  background: transparent;
  font: 0.94rem "Space Grotesk", sans-serif;
}

.kbd-hint {
  display: inline-flex;
  gap: 0.2rem;
}

.kbd {
  display: inline-flex;
  min-width: 20px;
  align-items: center;
  justify-content: center;
  padding: 2px 6px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.05);
  font-size: 0.74rem;
}

#hamburger {
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  align-items: center;
  gap: 4px;
  width: 34px;
  aspect-ratio: 1;
  padding: 7px 6px;
  border: 0;
  border-radius: 10px;
  background: transparent;
}

#hamburger span {
  width: 100%;
  height: 2px;
  border-radius: 999px;
  background: #fff;
}

.credits-page {
  position: relative;
  min-height: 100vh;
  padding: clamp(8.5rem, 14vw, 12rem) clamp(1.35rem, 5vw, 5rem) 5rem;
  overflow: hidden;
  color: #fff;
  background:
    linear-gradient(rgba(255, 255, 255, 0.055) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.055) 1px, transparent 1px),
    linear-gradient(180deg, #090b10 0%, #020203 56%, #000 100%);
  background-size: 72px 72px, 72px 72px, auto;
  font-family: "Space Grotesk", "Inter", system-ui, sans-serif;
}

.credits-page::before {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, rgba(0, 0, 0, 0.82), transparent 22%, transparent 78%, rgba(0, 0, 0, 0.82));
  pointer-events: none;
  content: "";
}

.credits-hero,
.credits-grid {
  position: relative;
  z-index: 1;
  width: min(900px, 100%);
  margin: 0 auto;
}

.credits-hero {
  display: grid;
  gap: 0.85rem;
  margin-bottom: clamp(1.75rem, 4vw, 3rem);
}

.section-kicker,
.credit-section__head p {
  margin: 0;
  color: rgba(255, 255, 255, 0.55);
  font: 700 0.78rem/1 "Space Grotesk", sans-serif;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.credits-hero h1 {
  margin: 0;
  color: #fff;
  font: 800 clamp(2.6rem, 7vw, 5rem)/0.95 "Orbitron", sans-serif;
  text-transform: uppercase;
}

.credits-hero p:last-child {
  max-width: 760px;
  margin: 0;
  color: rgba(255, 255, 255, 0.68);
  font-size: clamp(1rem, 2vw, 1.12rem);
  line-height: 1.75;
}

.credits-grid {
  display: grid;
  gap: 1rem;
}

.credit-section {
  display: grid;
  grid-template-columns: minmax(10rem, 0.28fr) minmax(0, 1fr);
  gap: clamp(0.9rem, 2.5vw, 1.5rem);
  padding: clamp(1rem, 2.5vw, 1.35rem) 0;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
}

.credit-section__head {
  display: grid;
  align-content: start;
  gap: 0.45rem;
}

.credit-section__head h2 {
  margin: 0;
  color: #fff;
  font: 720 clamp(1.35rem, 3vw, 2rem)/1.05 "Space Grotesk", sans-serif;
  letter-spacing: 0;
}

.credit-list {
  display: grid;
  gap: 0.75rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.credit-list li {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 1rem;
  align-items: center;
  min-height: 4.75rem;
  padding: 0.95rem 1rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  background: #000;
}

.credit-list h3 {
  margin: 0 0 0.2rem;
  color: #fff;
  font-size: 1rem;
  line-height: 1.2;
}

.credit-list p {
  margin: 0;
  color: rgba(255, 255, 255, 0.58);
  font-size: 0.9rem;
  line-height: 1.5;
}

.credit-list a {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  min-width: 8rem;
  padding: 0.58rem 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 8px;
  color: #fff;
  background: rgba(255, 255, 255, 0.04);
  font: 700 0.82rem/1 "Space Grotesk", sans-serif;
  text-decoration: none;
  white-space: nowrap;
  transition: border-color 160ms ease, background-color 160ms ease;
}

.credit-list a svg {
  width: 15px;
  height: 15px;
}

.credit-list a:hover,
.credit-list a:focus-visible {
  border-color: rgba(255, 255, 255, 0.42);
  background: rgba(255, 255, 255, 0.08);
}

.credits-footer {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding: 2rem 5vw;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.58);
  background: #000;
  font: 0.85rem "Space Grotesk", sans-serif;
}

.credits-footer a {
  color: #fff;
  text-decoration: none;
}

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
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(1.25rem, 4vw, 2.5rem);
  overflow: hidden;
  background: rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(12px);
}

.search-card {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  width: min(620px, 94vw);
  max-height: min(78vh, 720px);
  padding: 1.4rem;
  overflow: auto;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 1rem;
  color: rgba(255, 255, 255, 0.9);
  background: #000;
  box-shadow: 0 28px 80px rgba(0, 0, 0, 0.48);
  font-family: "Space Grotesk", sans-serif;
}

.blank-card {
  align-items: stretch;
  justify-content: flex-start;
}

.search-card__input {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: center;
  gap: 0.55rem;
  width: 100%;
  padding-bottom: 0.7rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.14);
}

.search-card__input svg {
  width: 20px;
  height: 20px;
}

.search-card__input input {
  min-width: 0;
  border: 0;
  outline: 0;
  color: #fff;
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
  gap: 0.55rem;
  width: 100%;
  padding: 0.35rem 0;
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
  transition: transform 260ms cubic-bezier(0.22, 0.8, 0.36, 1);
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
  width: 18px;
  height: 18px;
}

.lang-title {
  font: 0.95rem "Space Grotesk", sans-serif;
}

.page-list {
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 0.3rem;
  margin: 0.25rem 0 0;
  padding: 0 0 0 1rem;
  overflow: hidden;
  list-style: none;
}

.page-option {
  display: inline-flex;
  align-items: center;
  width: 100%;
  padding: 0.35rem 0.1rem 0.35rem 0.4rem;
  border: 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.16);
  color: #fff;
  background: transparent;
  font: 0.95rem "Space Grotesk", sans-serif;
  text-align: left;
}

.page-inner {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  width: 100%;
  transition: transform 200ms cubic-bezier(0.22, 0.8, 0.36, 1);
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
}

.page-icon svg {
  display: block;
  width: 20px;
  height: 20px;
}

.search-command-hint {
  margin: 0;
  color: rgba(255, 255, 255, 0.46);
  font-size: 0.82rem;
}

.collapse-enter-active,
.collapse-leave-active {
  overflow: hidden;
  transition: max-height 320ms cubic-bezier(0.22, 0.8, 0.36, 1), opacity 260ms ease;
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
  transition: opacity 320ms cubic-bezier(0.22, 0.8, 0.36, 1) calc(var(--d, 0s) + 0.12s), transform 320ms cubic-bezier(0.22, 0.8, 0.36, 1) calc(var(--d, 0s) + 0.12s);
}

.langitem-enter-from,
.langitem-leave-to {
  opacity: 0;
  transform: translateX(10px) scale(0.98);
}

@media (max-width: 760px) {
  #topbarMain {
    grid-template-columns: auto 1fr auto;
    gap: 0.45rem;
    padding-inline: 0.55rem;
  }

  .credits-page {
    padding-inline: 1.2rem;
  }

  .credit-section,
  .credit-list li {
    grid-template-columns: 1fr;
  }

  .credit-list a {
    justify-content: center;
    width: 100%;
  }

  .credits-footer {
    flex-direction: column;
  }
}
</style>
