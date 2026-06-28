<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import SmoothCursor from '@/components/SmoothCursor.vue';
import { matchesSearch } from '@/lib/searchMatch';
import { useAutoCloseMenu } from '@/lib/useAutoCloseMenu';

const router = useRouter();
const route = useRoute();
const topbarVisible = ref(false);
const menuOpen = ref(false);
const searchInput = ref(null);
const modalSearchInput = ref(null);
const searchModalOpen = ref(false);
const searchQuery = ref('');
const previousOverflow = ref(null);
const pagesOpen = ref(true);
const projectsOpen = ref(false);
const highlightedSocial = ref('');
const { closeMenu, keepMenuOpen, toggleMenu } = useAutoCloseMenu(menuOpen);
let highlightTimer;

function applyStoredTheme() {
  const stored = localStorage.getItem('zantixTheme') || 'system';
  const resolved = stored === 'system'
    ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    : stored;
  document.documentElement.setAttribute('data-theme', resolved);
}

const pages = [
  { slug: 'home', label: 'Home', href: '/' },
  { slug: 'about', label: 'About me', href: '/about' },
  { slug: 'open-source', label: 'Open Source', href: '/opensource' },
  { slug: 'developers', label: 'Works', href: '/Team' },
  { slug: 'links', label: 'Links', href: '/links' },
  { slug: 'reviews', label: 'Reviews', href: '/reviews/' },
  { slug: 'credits', label: 'Credits', href: '/credits/' },
];

const openSourceProjects = [
  { slug: 'project-dna', title: 'Double Helix DNA', keywords: 'server luau generator' },
  { slug: 'project-imprint', title: 'Imprint Module', keywords: 'module luau workspace' },
  { slug: 'project-orbit-aura', title: 'Dynamic Orbit Aura', keywords: 'local script visual' },
  { slug: 'project-gravity-field', title: 'Interactive Gravity Field', keywords: 'local script interactive' },
  { slug: 'project-npc-controller', title: 'NPC Path Controller', keywords: 'module pathfinding npc' },
];

const filteredPages = computed(() => {
  const query = searchQuery.value.trim().toLowerCase();
  if (!query || query === '.all') return pages.filter((page) => !page.searchOnly);
  return pages.filter((page) => matchesSearch(query, [page.label, page.slug, page.href, page.keywords]));
});

const filteredOpenSourceProjects = computed(() => {
  const query = searchQuery.value.trim().toLowerCase();
  if (!query || query === '.all') return openSourceProjects;
  const categoryMatch = ['project', 'projects', 'open source', 'opensource', 'asset', 'assets', 'code']
    .some((term) => term.includes(query) || query.includes(term));
  if (categoryMatch) return openSourceProjects;
  return openSourceProjects.filter((project) =>
    `${project.title} ${project.slug} ${project.keywords}`.toLowerCase().includes(query),
  );
});

const pagesShouldOpen = computed(() => pagesOpen.value || Boolean(searchQuery.value.trim() && filteredPages.value.length));
const projectsShouldOpen = computed(() => projectsOpen.value || Boolean(searchQuery.value.trim() && filteredOpenSourceProjects.value.length));

const socialLinks = [
  { name: 'Roblox', url: 'https://www.roblox.com/search/users?keyword=oskddrchris', icon: 'roblox', gradient: '#00a2ff' },
  { name: 'YouTube', url: 'https://www.youtube.com/@oskddrchris', icon: 'youtube', gradient: '#ff0000' },
  { name: 'Discord', url: 'https://discord.com/app', icon: 'discord', gradient: '#5865f2' },
  { name: 'Steam', url: 'https://steamcommunity.com/id/oskddrchris', icon: 'steam', gradient: 'linear-gradient(135deg,#66c0f4,#1b2838)' },
  { name: 'X', url: 'https://x.com/oskddrchris', icon: 'x', gradient: '#000000', featured: true },
];

function openSearchModal() {
  menuOpen.value = false;
  searchModalOpen.value = true;
  if (previousOverflow.value === null) {
    previousOverflow.value = document.documentElement.style.overflow || '';
    document.documentElement.style.overflow = 'hidden';
  }
  pagesOpen.value = true;
  projectsOpen.value = false;
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
  if (href.startsWith('#')) {
    router.push({ path: '/', hash: href });
    return;
  }
  router.push(href);
}

function handleModalEnter() {
  const page = filteredPages.value[0];
  if (page) {
    selectPage(page.slug, page.href);
    return;
  }
  const project = filteredOpenSourceProjects.value[0];
  if (project) selectOpenSourceProject(project.slug);
}

function togglePages() {
  pagesOpen.value = !pagesOpen.value;
}

function toggleProjects() {
  projectsOpen.value = !projectsOpen.value;
}

function selectOpenSourceProject(slug) {
  closeSearchModal();
  router.push(`/opensource#${slug}`);
}

function handleKeydown(event) {
  if (event.key === '/' && !event.metaKey && !event.ctrlKey && !event.altKey) {
    const active = document.activeElement;
    if (active && ['INPUT', 'TEXTAREA'].includes(active.tagName)) return;
    event.preventDefault();
    openSearchModal();
  }
  if (event.key === 'Escape' && searchModalOpen.value) {
    event.preventDefault();
    closeSearchModal();
  }
}

function revealSocialFromHash(hash = route.hash) {
  const id = hash.replace(/^#/, '');
  if (!id.startsWith('social-')) return;

  window.clearTimeout(highlightTimer);
  highlightedSocial.value = id;
  nextTick(() => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
  highlightTimer = window.setTimeout(() => {
    highlightedSocial.value = '';
  }, 2200);
}

onMounted(() => {
  if (document.documentElement.style.overflow === 'hidden') {
    document.documentElement.style.overflow = '';
  }
  applyStoredTheme();
  window.addEventListener('keydown', handleKeydown);
  window.requestAnimationFrame(() => {
    topbarVisible.value = true;
  });
  revealSocialFromHash();
});

watch(() => route.hash, (hash) => revealSocialFromHash(hash));

onBeforeUnmount(() => {
  window.clearTimeout(highlightTimer);
  window.removeEventListener('keydown', handleKeydown);
  if (searchModalOpen.value) closeSearchModal();
});
</script>

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
      <input ref="searchInput" type="search" placeholder="Search" readonly @focus.prevent="openSearchModal" @mousedown.prevent="openSearchModal">
      <span class="kbd-hint"><span class="kbd">/</span></span>
    </label>
    <button id="hamburger" type="button" aria-label="Menu" :aria-expanded="menuOpen" :class="{ 'is-open': menuOpen }" @click.stop="toggleMenu">
      <span id="bar1"></span><span id="bar2"></span><span id="bar3"></span>
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

  <main class="links-page">
    <div class="links-bg" aria-hidden="true"></div>
    <div class="links-wrap">
      <header class="links-header">
        <h1 class="links-title">
          <span class="title-line">Let's connect</span>
          <span class="title-line title-line--accent">online</span>
        </h1>
        <p class="links-lede">Find my work, updates, and communities across the platforms I use most.</p>
      </header>

      <div class="links-grid">
        <a
          v-for="link in socialLinks"
          :key="link.name"
          :id="`social-${link.name.toLowerCase()}`"
          :href="link.url"
          target="_blank"
          rel="noopener noreferrer"
          class="link-card"
          :class="{ 'link-card--featured': link.featured, 'is-search-target': highlightedSocial === `social-${link.name.toLowerCase()}` }"
          data-cursor-hover
        >
          <span class="link-icon" aria-hidden="true">
            <svg v-if="link.icon === 'roblox'" viewBox="0 0 24 24"><path d="m7.2 2-5 14.8 14.8 5 5-14.8L7.2 2Zm3.1 7.2 4.5 1.5-1.5 4.5-4.5-1.5 1.5-4.5Z" fill="currentColor"/></svg>
            <svg v-else-if="link.icon === 'youtube'" viewBox="0 0 24 24"><path d="M21.4 6.2a2.5 2.5 0 0 0-1.8-1.8C18 4 12 4 12 4s-6 0-7.6.4a2.5 2.5 0 0 0-1.8 1.8C2.2 7.8 2.2 12 2.2 12s0 4.2.4 5.8a2.5 2.5 0 0 0 1.8 1.8C6 20 12 20 12 20s6 0 7.6-.4a2.5 2.5 0 0 0 1.8-1.8c.4-1.6.4-5.8.4-5.8s0-4.2-.4-5.8ZM10 15.5v-7l6 3.5-6 3.5Z" fill="currentColor"/></svg>
            <svg v-else-if="link.icon === 'discord'" viewBox="0 0 24 24"><path d="M19.5 5.3A16.3 16.3 0 0 0 15.4 4l-.5 1a15.2 15.2 0 0 0-5.8 0l-.5-1a16.4 16.4 0 0 0-4.1 1.3C1.9 9.2 1.2 13 1.6 16.8a16.6 16.6 0 0 0 5 2.5l1.2-1.7c-.7-.3-1.3-.6-1.9-1l.5-.4a11.8 11.8 0 0 0 11.2 0l.5.4c-.6.4-1.2.7-1.9 1l1.2 1.7a16.6 16.6 0 0 0 5-2.5c.5-4.4-.8-8.1-2.9-11.5ZM8.8 14.5c-1 0-1.9-1-1.9-2.2s.8-2.2 1.9-2.2c1 0 1.9 1 1.9 2.2s-.9 2.2-1.9 2.2Zm6.4 0c-1 0-1.9-1-1.9-2.2s.8-2.2 1.9-2.2c1 0 1.9 1 1.9 2.2s-.9 2.2-1.9 2.2Z" fill="currentColor"/></svg>
            <svg v-else-if="link.icon === 'steam'" viewBox="0 0 24 24"><path d="M12 2a10 10 0 0 0-9.8 8.1l5.3 2.2a2.9 2.9 0 0 1 1.7-.6l2.3-3.4A3.8 3.8 0 1 1 15.3 12l-3.4 2.4a2.9 2.9 0 1 1-5.5.8L1.3 13A10 10 0 1 0 12 2Zm0 12.6-1.2-.5a2.1 2.1 0 0 0-2.8-.9l1.8.7a1.5 1.5 0 1 1-1.2 2.8l-1.7-.7a2.1 2.1 0 0 0 4-.1l1.1-1.3Zm3.3-4a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Zm0-.7a1.8 1.8 0 1 1 0-3.6 1.8 1.8 0 0 1 0 3.6Z" fill="currentColor"/></svg>
            <svg v-else viewBox="0 0 24 24"><path d="M18.9 2H22l-6.8 7.8L23.2 22H17l-4.8-6.3L6.7 22H3.6l7.1-8.1L3 2h6.3l4.4 5.8L18.9 2Zm-1.1 17.9h1.7L8.4 4H6.6l11.2 15.9Z" fill="currentColor"/></svg>
          </span>
          <span class="link-copy">
            <span class="link-desc">{{ link.name }}</span>
          </span>
          <svg class="link-arrow" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M7 17 17 7M9 7h8v8" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </a>
      </div>
    </div>
  </main>

  <footer id="FooterMain">
    <div class="footer-wrap">
      <div class="footer-brand">
        <span class="footer-title">Christopher Böhme</span>
        <span class="footer-meta">A personal portfolio for web development, Luau scripting, and UI/UX work.</span>
      </div>
      <div class="footer-links">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/opensource">Open Source</RouterLink>
        <RouterLink to="/Team">Works</RouterLink>
      </div>
      <span class="footer-copy">© 2026 Christopher Böhme</span>
    </div>
  </footer>

  <teleport to="body">
    <transition name="fade">
      <div v-if="searchModalOpen" class="search-modal" role="dialog" aria-modal="true" @click.self="closeSearchModal">
        <div class="search-card blank-card" @keydown.esc.prevent="closeSearchModal">
          <div class="search-card__input">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="11" cy="11" r="6.5" stroke="currentColor" stroke-width="2" fill="none" />
              <path d="M16.5 16.5 21 21" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
            </svg>
            <input ref="modalSearchInput" v-model="searchQuery" type="search" placeholder="Search" aria-label="Search" autocomplete="off" @keydown.enter.prevent="handleModalEnter">
            <span class="kbd-hint modal-kbd"><span class="kbd">/</span></span>
          </div>

          <div id="SAthing">
            <div id="Pages" v-if="filteredPages.length">
              <button class="picker-head" type="button" :data-open="pagesShouldOpen" :aria-expanded="pagesShouldOpen" aria-controls="pageList" @click="togglePages">
                <svg class="collapse-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.9 1.5 L17 12 L8.9 22.5" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <span class="flag header-flag" aria-hidden="true">
                  <svg class="pages-grid-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.8"/><rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.8"/><rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.8"/><rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.8"/></svg>
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
                          <svg v-else-if="page.slug.startsWith('social-')" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 1 0-7l1.5-1.5a5 5 0 0 1 7 7L17 13"/><path d="M14 11a5 5 0 0 1 0 7l-1.5 1.5a5 5 0 1 1-7-7L7 11"/></svg>
                          <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2h9l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z"/><path d="M14 2v5h5M9 13h6M9 17h6"/></svg>
                        </span>
                        <span class="page-name">{{ page.label }}</span>
                      </span>
                    </button>
                  </li>
                </transition-group>
              </transition>
            </div>

            <div id="Projects" v-if="filteredOpenSourceProjects.length">
              <button class="picker-head" type="button" :data-open="projectsShouldOpen" :aria-expanded="projectsShouldOpen" aria-controls="projectList" @click="toggleProjects">
                <svg class="collapse-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M8.9 1.5 17 12 8.9 22.5" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" /></svg>
                <span class="flag header-flag" aria-hidden="true"><span class="theme-emoji">⌘</span></span>
                <span class="lang-title">Open Source Projects</span>
              </button>
              <transition name="collapse">
                <transition-group v-if="projectsShouldOpen" id="projectList" class="page-list" role="listbox" aria-label="Open Source Projects" name="langitem" tag="ul">
                  <li v-for="(project, idx) in filteredOpenSourceProjects" :key="project.slug" :style="{ '--d': `${idx * 0.03}s` }">
                    <button type="button" class="page-option" role="option" data-cursor-hover @click="selectOpenSourceProject(project.slug)">
                      <span class="page-inner">
                        <span class="page-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m8 9-4 4 4 4M16 9l4 4-4 4M14 5l-4 14"/></svg></span>
                        <span class="page-name">{{ project.title }}</span>
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

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400..900&family=Space+Grotesk:wght@300..700&display=swap');
:global(:root) { --ui-bg: rgba(255,255,255,.85); --ui-border: rgba(0,0,0,.12); --ui-text: #0f172a; --card-bg: #f8fafc; --overlay-bg: rgba(255,255,255,.35); --kbd-border: rgba(15,23,42,.2); --kbd-bg: rgba(15,23,42,.05); --input-border: rgba(15,23,42,.14); }
:global([data-theme="dark"]) { --ui-bg: rgba(255,255,255,.05); --ui-border: rgba(255,255,255,.12); --ui-text: rgba(255,255,255,.9); --card-bg: #000; --overlay-bg: rgba(0,0,0,.35); --kbd-border: rgba(255,255,255,.2); --kbd-bg: rgba(255,255,255,.05); --input-border: rgba(255,255,255,.14); }
:global(body) { background: #000; }
#topbarMain { position: fixed; top: 18px; left: 50%; z-index: 999; display: grid; grid-template-columns: auto 1fr auto auto; align-items: center; gap: .75rem; width: min(94vw,54rem); padding: .35rem .75rem; overflow: visible; border: 1px solid var(--ui-border); border-radius: 1rem; box-shadow: 0 12px 44px rgba(0,0,0,.38),inset 0 2px 0 rgba(255,255,255,.04); backdrop-filter: blur(10px) saturate(120%); opacity: 0; transform: translate(-50%,-140%); transition: transform 820ms cubic-bezier(.17,.99,.42,1.19),opacity 320ms ease; }
#topbarMain[data-ready="true"] { transform: translate(-50%,0); opacity: 1; }
.topbar-logo { width: 42px; height: 42px; object-fit: contain; }
.top-search { display: grid; grid-template-columns: auto 1fr auto; align-items: center; justify-self: center; gap: .5rem; width: min(620px,100%); height: 42px; padding: .35rem .6rem .35rem .52rem; border: 1px solid var(--ui-border); border-radius: 12px; color: var(--ui-text); background: transparent; }
.top-search svg { width: 18px; height: 18px; opacity: .9; }
.top-search input { width: 100%; height: 100%; border: 0; outline: 0; color: var(--ui-text); background: transparent; font: .94rem "Space Grotesk",sans-serif; }
.kbd-hint { display: inline-flex; gap: .2rem; }
.kbd { display: inline-flex; min-width: 20px; align-items: center; justify-content: center; padding: 2px 6px; border: 1px solid var(--kbd-border); border-radius: 6px; background: var(--kbd-bg); font-size: .74rem; }
.modal-kbd { margin-left: auto; }
#hamburger { position: relative; display: grid; grid-template-rows: repeat(3,1fr); align-items: center; justify-self: end; gap: 4px; width: 34px; aspect-ratio: 1; padding: 7px 6px; border: 0; border-radius: 10px; appearance: none; outline: 0; box-shadow: none; background: transparent; transform: translateX(6px); }
#hamburger span { width: 100%; height: 2px; margin: 0; border-radius: 999px; background: rgba(255,255,255,.95); opacity: 1; transform-origin: left center; transition: width 180ms ease,transform 160ms ease,opacity 160ms ease; }
#hamburger.is-open #bar1 { transform: translateY(6px) rotate(45deg); }
#hamburger.is-open #bar2 { opacity: 0; }
#hamburger.is-open #bar3 { transform: translateY(-6px) rotate(-45deg); }
#topbarMenu { position: absolute; top: 110%; right: 12px; z-index: 1200; display: grid; gap: .25rem; min-width: 180px; padding: .6rem; border: 1px solid var(--ui-border); border-radius: 12px; background: var(--ui-bg); box-shadow: 0 16px 38px rgba(0,0,0,.12),inset 0 1px rgba(255,255,255,.12); backdrop-filter: blur(12px) saturate(130%); opacity: 0; transform: translateY(-8px) scale(.98); pointer-events: none; transition: opacity 200ms ease,transform 220ms ease; }
#topbarMenu[data-open="true"] { opacity: 1; transform: translateY(0) scale(1); pointer-events: auto; }
#topbarMenu a { padding: .45rem .55rem; border-radius: 10px; color: var(--ui-text); background: none; font: .95rem "Space Grotesk",sans-serif; transition: background-color 140ms ease,transform 140ms ease; }
#topbarMenu a:hover { background: rgba(255,255,255,.08); transform: translateX(2px); }
.links-page { position: relative; min-height: 82vh; width: 100%; overflow: hidden; padding: clamp(10rem,16vw,13rem) clamp(1.5rem,7vw,5.5rem) clamp(7rem,11vw,10rem); color: #fff; background: radial-gradient(ellipse 78% 38% at 48% -8%,rgba(242,247,255,.3),transparent 68%),radial-gradient(circle at 78% 14%,rgba(104,150,255,.18),transparent 22rem),linear-gradient(180deg,#0b0e17 0%,#05070d 48%,#010102 100%); font-family: "Space Grotesk",sans-serif; }
.links-page::before { content: ''; position: absolute; inset: 0 0 auto; z-index: 0; height: min(68vh,680px); background-image: repeating-linear-gradient(to bottom,transparent 0,transparent 75px,rgba(218,230,255,.16) 76px,transparent 77px); mask-image: linear-gradient(to right,transparent 0,#000 7%,#000 93%,transparent 100%),linear-gradient(to bottom,#000 0,#000 82%,transparent 100%); mask-composite: intersect; pointer-events: none; }
.links-page::after { content: ''; position: absolute; inset: 0; z-index: 0; background: linear-gradient(90deg,rgba(0,0,0,.46),transparent 18%,transparent 82%,rgba(0,0,0,.46)),linear-gradient(180deg,rgba(210,225,255,.08),transparent 34%,rgba(0,0,0,.38) 72%); pointer-events: none; }
.links-bg { position: absolute; top: 5.5rem; left: 50%; z-index: 0; display: block; width: min(78vw,980px); height: 1px; background: linear-gradient(90deg,transparent,rgba(232,240,255,.72),transparent); box-shadow: 0 0 54px 16px rgba(111,155,255,.12); transform: translateX(-50%); pointer-events: none; }
.links-wrap { position: relative; z-index: 1; display: grid; gap: clamp(3.5rem,7vw,5.5rem); max-width: 1160px; margin: 0 auto; }
.links-header { display: grid; align-content: start; min-height: clamp(23rem,40vh,28rem); max-width: 800px; gap: 1rem; padding-inline: clamp(0rem,1.5vw,1rem); }
.links-title { display: flex; flex-direction: column; gap: .06em; width: min(100%, 760px); margin: 0; color: #fff; font: 750 clamp(2.65rem,7vw,5.7rem)/.96 Orbitron,sans-serif; letter-spacing: -.045em; text-transform: uppercase; text-wrap: balance; }
.title-line { position: relative; display: block; width: fit-content; color: #f8fbff; text-shadow: 0 0 28px rgba(220,232,255,.18); }
.title-line--accent { align-self: flex-start; margin-left: 0; background: linear-gradient(90deg,#eef5ff 0%,#8fb2ff 46%,#f8fbff 100%); color: transparent; background-clip: text; -webkit-background-clip: text; filter: drop-shadow(0 0 22px rgba(143,178,255,.2)); transform: none; }
.links-lede { max-width: 580px; margin: .45rem 0 0; color: rgba(235,242,255,.68); font-size: clamp(.95rem,1.8vw,1.08rem); line-height: 1.7; }
.links-grid { display: grid; grid-template-columns: repeat(2,minmax(0,1fr)); gap: 1.25rem; padding: clamp(.25rem,1vw,.75rem); }
.link-card { position: relative; display: grid; grid-template-columns: 1fr auto; grid-template-rows: auto 1fr; gap: 1.25rem; min-height: 190px; padding: 1.55rem 1.65rem; overflow: hidden; border: 1px solid rgba(255,255,255,.12); border-radius: 12px; color: #fff; background: #030405; box-shadow: 0 18px 48px rgba(0,0,0,.32),inset 0 1px rgba(255,255,255,.025); transition: background-color 220ms ease,border-color 220ms ease,transform 220ms cubic-bezier(.22,.8,.36,1); }
.link-card--featured { grid-column: 1 / -1; min-height: 142px; grid-template-columns: auto 1fr auto; grid-template-rows: 1fr; align-items: center; }
.link-card:focus { outline: none; }
.link-card:focus-visible { outline: 2px solid rgba(255,255,255,.72); outline-offset: 4px; }
.link-card.is-search-target { border-color: #22c55e; box-shadow: 0 18px 48px rgba(0,0,0,.32),0 0 0 2px rgba(34,197,94,.72); }
.link-icon { position: relative; z-index: 1; display: grid; grid-column: 1; grid-row: 1; width: 48px; height: 48px; place-items: center; border: 1px solid rgba(255,255,255,.14); border-radius: 10px; color: #fff; background: #000; box-shadow: inset 0 1px rgba(255,255,255,.1),0 10px 28px rgba(0,0,0,.35); }
.link-icon svg { width: 25px; height: 25px; }
.link-copy { position: relative; z-index: 1; grid-column: 1 / -1; grid-row: 2; align-self: end; }
.link-card--featured .link-icon { grid-column: 1; grid-row: 1; }
.link-card--featured .link-copy { grid-column: 2; grid-row: 1; align-self: center; }
.link-desc { display: block; color: #fff; font: 650 clamp(1.2rem,2vw,1.5rem) "Space Grotesk",sans-serif; letter-spacing: -.02em; }
.link-arrow { position: relative; z-index: 1; grid-column: 2; grid-row: 1; width: 24px; color: rgba(255,255,255,.34); transition: color 180ms ease,transform 220ms ease; }
.link-card--featured .link-arrow { grid-column: 3; grid-row: 1; }
.fade-enter-active,.fade-leave-active { transition: opacity 200ms ease; }
.fade-enter-from,.fade-leave-to { opacity: 0; }
.search-modal { position: fixed; inset: 0; z-index: 999998; isolation: isolate; display: flex; align-items: center; justify-content: center; padding: clamp(1.25rem,4vw,2.5rem); overflow: hidden; background: var(--overlay-bg); backdrop-filter: blur(12px); }
.search-card { display: flex; flex-direction: column; gap: 1.25rem; width: min(620px,94vw); max-height: min(78vh,720px); padding: 1.4rem; overflow: auto; border: 1px solid var(--ui-border); border-radius: 1rem; color: var(--ui-text); background: var(--card-bg); box-shadow: 0 28px 80px rgba(0,0,0,.48); font-family: "Space Grotesk",sans-serif; }
.blank-card { align-items: stretch; justify-content: flex-start; }
.search-card__input { display: grid; grid-template-columns: auto minmax(0,1fr) auto; align-items: center; gap: .55rem; width: 100%; padding-bottom: .7rem; border-bottom: 1px solid var(--input-border); }
.search-card__input svg { width: 20px; height: 20px; opacity: .9; }
.search-card__input input { min-width: 0; border: 0; outline: 0; color: var(--ui-text); background: transparent; font: 1rem "Space Grotesk",sans-serif; }
#SAthing,#Pages,#Projects { position: relative; display: flex; width: 100%; flex-direction: column; align-items: flex-start; }
#SAthing { gap: .75rem; }
.picker-head { display: inline-flex; align-items: center; gap: .55rem; width: 100%; padding: .35rem 0; border: 0; color: inherit; background: none; font: inherit; text-align: left; }
.collapse-icon { width: 16px; height: 16px; transform-origin: center; transition: transform 260ms cubic-bezier(.22,.8,.36,1); }
.picker-head[data-open="true"] .collapse-icon { transform: rotate(90deg); }
.header-flag,.flag { display: inline-flex; align-items: center; justify-content: center; }
.theme-emoji { line-height: 1; }
.lang-title { color: var(--ui-text); font: .95rem "Space Grotesk",sans-serif; letter-spacing: .02em; }
.page-list { display: flex; width: 100%; flex-direction: column; gap: .3rem; margin: .25rem 0 0; padding: 0 0 0 1rem; overflow: hidden; list-style: none; }
.page-option { display: inline-flex; align-items: center; width: 100%; padding: .35rem .1rem .35rem .4rem; border: 0; border-bottom: 1px solid rgba(255,255,255,.16); color: var(--ui-text); background: transparent; font: .95rem "Space Grotesk",sans-serif; text-align: left; }
.page-inner { display: inline-flex; align-items: center; gap: .6rem; width: 100%; transform: translateX(0); transition: transform 200ms cubic-bezier(.22,.8,.36,1); }
.page-option:hover .page-inner { transform: translateX(4px); }
.page-icon { display: inline-flex; flex: 0 0 24px; width: 24px; height: 24px; align-items: center; justify-content: center; color: var(--ui-text); }
.page-icon svg { display: block; width: 20px; height: 20px; }
.page-name { flex: 1; }
.collapse-enter-active,.collapse-leave-active { overflow: hidden; transition: max-height 320ms cubic-bezier(.22,.8,.36,1),opacity 260ms ease; }
.collapse-enter-from,.collapse-leave-to { max-height: 0; opacity: 0; }
.collapse-enter-to,.collapse-leave-from { max-height: 500px; opacity: 1; }
.langitem-enter-active,.langitem-leave-active { transition: opacity 320ms cubic-bezier(.22,.8,.36,1) calc(var(--d,0s) + .12s),transform 320ms cubic-bezier(.22,.8,.36,1) calc(var(--d,0s) + .12s); }
.langitem-enter-from,.langitem-leave-to { opacity: 0; transform: translateX(10px) scale(.98); }
#FooterMain { padding: 2.5rem 5vw; border-top: 1px solid rgba(255,255,255,.1); color: rgba(255,255,255,.5); background: #000; font-family: "Space Grotesk",sans-serif; }
.footer-wrap { display: grid; grid-template-columns: 1fr auto auto; align-items: center; gap: 2rem; max-width: 1120px; margin: auto; }
.footer-brand { display: grid; }
.footer-title { color: #fff; font: 700 1rem Orbitron,sans-serif; }
.footer-meta,.footer-copy { font-size: .78rem; }
.footer-links { display: flex; gap: .8rem; }
.footer-links a { padding: 0; color: rgba(255,255,255,.65); background: none; font-size: .8rem; }
@media (max-width:700px) { #topbarMain { grid-template-columns: auto 1fr auto; gap: .45rem; padding-inline: .55rem; } .links-page { min-height: 82vh; padding: 9.5rem 1.35rem 7rem; } .links-page::before { height: 60vh; background-size: 100% 62px; } .links-header { min-height: 22rem; } .links-title { letter-spacing: -.03em; } .links-grid { grid-template-columns: 1fr; padding: 0; } .link-card,.link-card--featured { grid-column: auto; min-height: 150px; grid-template-columns: 1fr auto; grid-template-rows: auto 1fr; padding: 1.3rem 1.25rem; } .link-card--featured .link-icon { grid-column: 1; grid-row: 1; } .link-card--featured .link-copy { grid-column: 1 / -1; grid-row: 2; align-self: end; } .link-card--featured .link-arrow { grid-column: 2; grid-row: 1; } .footer-wrap { grid-template-columns: 1fr; text-align: center; } .footer-links { justify-content: center; } }
</style>
