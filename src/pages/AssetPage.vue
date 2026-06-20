<template>
  <div id="topbarMain" :data-ready="topbarVisible">
    <h3>{{ t("heroTitle") }}</h3>

    <label class="top-search" :aria-label="t('searchLabel')" @click.stop="openSearchModal">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="11" cy="11" r="6.5" stroke="currentColor" stroke-width="2" fill="none" />
        <path d="M16.5 16.5 L21 21" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
      </svg>
      <input
        ref="searchInput"
        type="search"
        :placeholder="t('searchMain')"
        readonly
        @focus.prevent="openSearchModal"
        @mousedown.prevent="openSearchModal"
      />
      <span class="kbd-hint"><span class="kbd">/</span></span>
    </label>

    <button
      id="hamburger"
      ref="hamburgerRef"
      :aria-label="t('menuLabel')"
      @click.stop="menuOpen = !menuOpen"
    >
      <span id="bar1"></span>
      <span id="bar2"></span>
      <span id="bar3"></span>
    </button>

    <div id="topbarMenu" ref="topbarMenuRef" :data-open="menuOpen">
      <RouterLink to="/" role="menuitem" data-cursor-hover @click="closeMenu">{{ t("topAbout") }}</RouterLink>
      <RouterLink to="/opensource" role="menuitem" data-cursor-hover @click="closeMenu">
        {{ t("topAssets") }}
      </RouterLink>
      <RouterLink to="/Team" role="menuitem" data-cursor-hover @click="closeMenu">{{ t("topDevelopers") }}</RouterLink>
      <RouterLink to="/links" role="menuitem" data-cursor-hover @click="closeMenu">{{ t("pageLinks") }}</RouterLink>
      <RouterLink to="/testimonials" role="menuitem" data-cursor-hover @click="closeMenu">Testimonials</RouterLink>
      <RouterLink :to="{ path: '/', hash: '#tos' }" role="menuitem" data-cursor-hover @click="closeMenu">
        {{ t("topTOS") }}
      </RouterLink>
    </div>
  </div>

  <div class="blank"></div>

  <SmoothCursor />

  <teleport to="body">
    <transition name="fade">
      <div
        v-if="searchModalOpen"
        class="search-modal"
        role="dialog"
        aria-modal="true"
        @click.self="closeSearchModal"
      >
        <div class="search-card blank-card" @keydown.esc.prevent="closeSearchModal">
          <div class="search-card__input">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="11" cy="11" r="6.5" stroke="currentColor" stroke-width="2" fill="none" />
              <path d="M16.5 16.5 L21 21" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
            </svg>
            <input
              ref="modalSearchInput"
              v-model="searchQuery"
              type="search"
              :placeholder="t('searchPlaceholder')"
              autocomplete="off"
              @keydown.enter.prevent="handleModalEnter"
            />
            <span class="kbd-hint modal-kbd"><span class="kbd">/</span></span>
          </div>

          <div id="SAthing">
            <div id="Pages" v-if="filteredPages.length">
              <button
                class="picker-head"
                type="button"
                :data-open="pagesShouldOpen"
                :aria-expanded="pagesShouldOpen"
                aria-controls="pageList"
                @click="togglePages"
              >
                <svg class="collapse-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.9 1.5 L17 12 L8.9 22.5" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <span class="flag header-flag" aria-hidden="true">
                  <svg class="pages-grid-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.8"/><rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.8"/><rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.8"/><rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.8"/></svg>
                </span>
                <span class="lang-title">{{ t('pagesLabel') }}</span>
              </button>
              <transition name="collapse">
                <transition-group
                  v-if="pagesShouldOpen"
                  id="pageList"
                  class="page-list"
                  role="listbox"
                  aria-label="Pages"
                  name="langitem"
                  tag="ul"
                >
                  <li v-for="(page, idx) in filteredPages" :key="page.slug" :style="{ '--d': idx * 0.03 + 's' }">
                    <button
                      type="button"
                      class="page-option"
                      data-cursor-hover
                      role="option"
                      @click="selectPage(page.slug, page.href)"
                    >
                      <span class="page-inner">
                        <span class="page-icon" aria-hidden="true">
                          <svg v-if="page.slug === 'home'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M3 10.5 12 3l9 7.5" />
                            <path d="M5.5 9V21h13V9" />
                          </svg>
                          <svg v-else-if="page.slug === 'assets'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M3 7h18" />
                            <path d="M6 7l1-3h10l1 3" />
                            <rect x="5" y="7" width="14" height="12" rx="2" />
                            <path d="M9 11h6" />
                            <path d="M9 15h6" />
                          </svg>
                          <svg v-else-if="page.slug === 'developers'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M4 21l4-4" />
                            <path d="M4 17l4 4" />
                            <path d="M15.5 3.5a2.12 2.12 0 0 1 3 3L11 14l-4 1 1-4 7.5-7.5Z" />
                          </svg>
                        <svg v-else-if="page.slug === 'links'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M10 13a5 5 0 0 1 0-7l1.5-1.5a5 5 0 0 1 7 7L17 13" />
                            <path d="M14 11a5 5 0 0 1 0 7L12.5 19.5a5 5 0 1 1-7-7L7 11" />
                        </svg>
                        <svg v-else-if="page.slug === 'testimonials'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 15a3 3 0 0 1-3 3H9l-5 3v-6a3 3 0 0 1-1-2.25V7a3 3 0 0 1 3-3h11a3 3 0 0 1 3 3Z"/><path d="M8 9h.01M12 9h.01M16 9h.01"/></svg>
                        <svg v-else-if="page.slug.startsWith('social-')" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 1 0-7l1.5-1.5a5 5 0 0 1 7 7L17 13"/><path d="M14 11a5 5 0 0 1 0 7l-1.5 1.5a5 5 0 1 1-7-7L7 11"/></svg>
                        <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M6 2h9l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z" />
                            <path d="M14 2v5h5" />
                            <path d="M9 13h6" />
                            <path d="M9 17h6" />
                          </svg>
                        </span>
                        <span class="page-name">{{ t(`page${page.label.charAt(0).toUpperCase()}${page.label.slice(1)}`) ?? page.label }}</span>
                      </span>
                    </button>
                  </li>
                </transition-group>
              </transition>
            </div>
            <div id="Projects" v-if="filteredOpenSourceProjects.length">
              <button class="picker-head" type="button" :data-open="projectsShouldOpen" :aria-expanded="projectsShouldOpen" aria-controls="projectList" @click="toggleProjects">
                <svg class="collapse-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.9 1.5 L17 12 L8.9 22.5" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <span class="flag header-flag" aria-hidden="true"><span class="theme-emoji">⌘</span></span>
                <span class="lang-title">Open Source Projects</span>
              </button>
              <transition name="collapse">
                <transition-group v-if="projectsShouldOpen" id="projectList" class="page-list" role="listbox" aria-label="Open Source Projects" name="langitem" tag="ul">
                  <li v-for="(project, idx) in filteredOpenSourceProjects" :key="project.slug" :style="{ '--d': idx * 0.03 + 's' }">
                    <button type="button" class="page-option" data-cursor-hover role="option" @click="selectOpenSourceProject(project.slug)">
                      <span class="page-inner">
                        <span class="page-icon" aria-hidden="true">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M8 9 4 13l4 4" />
                            <path d="M16 9l4 4-4 4" />
                            <path d="M14 5 10 19" />
                          </svg>
                        </span>
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
</template>

<script setup lang="ts">
import { computed, h, nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { RouterLink, useRouter, useRoute } from "vue-router";
import SmoothCursor from "@/components/SmoothCursor.vue";
import { matchesSearch } from "@/lib/searchMatch";

const router = useRouter();
const route = useRoute();
const routeSlug = computed(() => (route.params.assetSlug as string || "").toLowerCase());

const topbarVisible = ref(false);
const menuOpen = ref(false);
const topbarMenuRef = ref<HTMLElement | null>(null);
const hamburgerRef = ref<HTMLButtonElement | null>(null);
const searchInput = ref<HTMLInputElement | null>(null);
const modalSearchInput = ref<HTMLInputElement | null>(null);
const searchModalOpen = ref(false);
const searchQuery = ref("");
const previousOverflow = ref<string | null>(null);
const asset = ref<AssetData | null>(null);
const isLoaded = ref(false);


const pages = [
  { slug: "home", label: "Home", href: "/" },
  { slug: "assets", label: "Open Source", href: "/opensource" },
  { slug: "developers", label: "Developers", href: "/Team" },
  { slug: "links", label: "Links", href: "/links" },
  { slug: "testimonials", label: "Testimonials", href: "/testimonials" },
];

const translations: Record<string, Record<string, string>> = {
  en: {
    heroTitle: "Zantix",
    searchLabel: "Search",
    searchPlaceholder: "Search",
    searchMain: "Search",
    menuLabel: "Menu",
    topAbout: "About Zantix",
    topAssets: "Open Source",
    topDevelopers: "Zantix Team",
    topTOS: "Zantix TOS",
    pagesLabel: "Pages",
    pageHome: "Home",
    pageAssets: "Open Source",
    pageDevelopers: "Developers",
    pageLinks: "Links",
    pageTOS: "TOS",
  },
};


const t = (key: string) => translations.en[key] ?? key;
const pagesOpen = ref(true);
const projectsOpen = ref(false);
const openSourceProjects = [
  { slug: "project-dna", title: "Double Helix DNA" },
  { slug: "project-orbit-aura", title: "Dynamic Orbit Aura" },
  { slug: "project-gravity-field", title: "Interactive Gravity Field" },
  { slug: "project-imprint", title: "Imprint Module" },
  { slug: "project-npc-controller", title: "NPC Path Controller" },
];
type JsonLoader = () => Promise<unknown>;

const filteredPages = computed(() => {
  const q = searchQuery.value.trim().toLowerCase();
  if (!q || q === ".all") return pages.filter((page) => !page.searchOnly);
  const compactQ = q.replace(/[^a-z0-9]/g, "");
  return pages.filter((page) => matchesSearch(q, [page.label, page.slug, page.href, page.keywords]));
});

const pagesShouldOpen = computed(
  () => pagesOpen.value || (searchQuery.value.trim() && filteredPages.value.length > 0),
);

const filteredOpenSourceProjects = computed(() => {
  const q = searchQuery.value.trim().toLowerCase();
  if (!q || q === ".all") return openSourceProjects;
  const compactQ = q.replace(/[^a-z0-9]/g, "");
  const categoryQuery = ["project", "projects", "open source", "opensource", "asset", "assets", "code"].some(
    (term) => q && (q.includes(term) || term.includes(q)),
  );
  if (categoryQuery) return openSourceProjects;
  return openSourceProjects.filter((project) => {
    const values = [project.title, project.slug].map((value) => value.toLowerCase());
    return values.some(
      (value) =>
        value.includes(q) ||
        value.replace(/[^a-z0-9]/g, "").includes(compactQ),
    );
  });
});

const projectsShouldOpen = computed(
  () => projectsOpen.value || (searchQuery.value.trim() && filteredOpenSourceProjects.value.length > 0),
);

const togglePages = () => {
  pagesOpen.value = !pagesOpen.value;
};

const toggleProjects = () => {
  projectsOpen.value = !projectsOpen.value;
};


const closeAllMenus = () => {
  menuOpen.value = false;
  searchModalOpen.value = false;
  if (previousOverflow.value !== null) {
    document.documentElement.style.overflow = previousOverflow.value;
    previousOverflow.value = null;
  }
};

const handleModalEnter = () => {
  const page = filteredPages.value[0];
  if (page) {
    selectPage(page.slug, page.href);
    return;
  }
  const project = filteredOpenSourceProjects.value[0];
  if (project) selectOpenSourceProject(project.slug);
};

const selectPage = (slug: string, href: string) => {
  closeAllMenus();
  if (href.includes("#")) {
    const [pathPart, hashPart] = href.split("#");
    const path = pathPart || "/";
    const hash = hashPart ? `#${hashPart}` : undefined;
    router.push({ path, hash }).catch(() => {});
    return;
  }
  router.push(href).catch(() => {});
};

const selectOpenSourceProject = (slug: string) => {
  closeAllMenus();
  router.push(`/opensource#${slug}`).catch(() => {});
};

const openSearchModal = () => {
  searchModalOpen.value = true;
  if (previousOverflow.value === null) {
    previousOverflow.value = document.documentElement.style.overflow || "";
    document.documentElement.style.overflow = "hidden";
  }
  pagesOpen.value = true;
  projectsOpen.value = false;
  nextTick(() => {
    modalSearchInput.value?.focus();
  });
};

const closeSearchModal = () => {
  searchModalOpen.value = false;
  if (previousOverflow.value !== null) {
    document.documentElement.style.overflow = previousOverflow.value;
    previousOverflow.value = null;
  }
  searchQuery.value = "";
};

const closeMenu = () => {
  menuOpen.value = false;
};


onMounted(() => {
  document.documentElement.setAttribute("lang", "en");
  window.setTimeout(() => {
    topbarVisible.value = true;
  }, 180);
});


onBeforeUnmount(() => {
  if (searchModalOpen.value) closeSearchModal();
});
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400..900&family=Space+Grotesk:wght@300..700&display=swap');

:root{
  --ui-bg: #0b0b0b;
  --ui-border: #333;
  --ui-text: #f6f6f6;
  --card-bg: #0b0b0b;
  --overlay-bg: rgba(0,0,0,0.65);
  --kbd-border: #444;
  --kbd-bg: #111;
  --input-border: #333;
}

[data-theme="dark"]{
  --ui-bg: rgba(255,255,255,0.07);
  --ui-border: rgba(255,255,255,0.12);
  --ui-text: rgba(255,255,255,0.9);
  --card-bg: #000;
  --overlay-bg: rgba(0,0,0,0.35);
  --kbd-border: rgba(255,255,255,0.2);
  --kbd-bg: rgba(255,255,255,0.05);
  --input-border: rgba(255,255,255,0.14);
}

*, *::before, *::after{
  box-sizing: border-box;
  margin: 0;
  user-select: none;
  cursor: none !important;
}

body{
  cursor: none!important;
  display: flex;
  flex-direction: column;
  overflow: auto;
  background: #000;
}

#topbarMain{
  position: fixed;
  top: 18px;
  left: 50%;
  transform: translate(-50%, -140%);
  width: min(92vw, 48rem);
  z-index: 999;
  padding: 0.35rem .75rem;
  display: grid;
  grid-template-columns: auto 1fr auto auto;
  align-items: center;
  gap: 0.75rem;
  border: 1px solid var(--ui-border);
  border-radius: 1rem;
  background-color: var(--ui-bg);
  backdrop-filter: none;
  overflow: visible;
  box-shadow: none;
  opacity: 0;
  transition: transform 820ms cubic-bezier(.17, .99, .42, 1.19), opacity 320ms ease;
}

#topbarMain[data-ready="true"] {
  transform: translate(-50%, 0);
  opacity: 1;
  animation: dropIn 780ms cubic-bezier(.21, 1.01, .32, 1.02);
}

@keyframes dropIn {
  0% { transform: translate(-50%, -140%) scale(0.96); filter: blur(3px); }
  62% { transform: translate(-50%, 6%) scale(1.02); }
  84% { transform: translate(-50%, -2%) scale(0.998); }
  100% { transform: translate(-50%, 0) scale(1); filter: blur(0); }
}

#topbarMain h3{
  font-family: Orbitron, Space Grotesk, -apple-system, sans-serif;
  font-weight: 800;
  font-size: 1.1rem;
  letter-spacing: 0.14rem;
  color: var(--ui-text);
}

#topbarMenu{
  position: absolute;
  top: 110%;
  right: 12px;
  min-width: 180px;
  padding: 0.6rem;
  background: var(--ui-bg);
  border: 1px solid var(--ui-border);
  border-radius: 12px;
  box-shadow: none;
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
  display: grid;
  gap: 0.25rem;
  opacity: 0;
  transform: translateY(-8px) scale(0.98);
  pointer-events: none;
  transition: opacity 200ms ease, transform 220ms ease;
  z-index: 1200;
}

#topbarMenu[data-open="true"]{
  opacity: 1;
  transform: translateY(0) scale(1);
  pointer-events: auto;
}

#topbarMenu a{
  color: var(--ui-text);
  text-decoration: none;
  padding: 0.45rem 0.55rem;
  border-radius: 10px;
  font-family: "Space Grotesk", system-ui, sans-serif;
  font-size: 0.95rem;
  transition: background-color 140ms ease, transform 140ms ease;
}

#topbarMenu a:hover{
  background: rgba(255,255,255,0.08);
  transform: translateX(2px);
}

.top-search{
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 0.5rem;
  width: min(520px, 100%);
  height: 42px;
  padding: 0.35rem 0.6rem 0.35rem 0.52rem;
  border: 1px solid var(--ui-border);
  border-radius: 10px;
  background: transparent;
  color: var(--ui-text);
  justify-self: center;
}

.top-search svg{
  width: 18px;
  height: 18px;
  opacity: 0.9;
  align-self: center;
}

.top-search input{
  height: 100%;
  width: 100%;
  background: transparent;
  border: none;
  outline: none;
  color: var(--ui-text);
  font-family: "Space Grotesk", system-ui, sans-serif;
  font-size: 0.94rem;
  line-height: 1.2;
  caret-color: var(--ui-text);
}

.kbd-hint{
  display: inline-flex;
  gap: 0.2rem;
  align-self: center;
}

.kbd{
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  padding: 2px 6px;
  border-radius: 6px;
  border: 1px solid var(--kbd-border);
  background: var(--kbd-bg);
  font-size: 0.74rem;
  letter-spacing: 0.02em;
}

.modal-kbd{
  margin-left: auto;
}

#hamburger{
  position: relative;
  justify-self: end;
  width: 34px;
  aspect-ratio: 1/1;
  transform: translateX(6px);
  padding: 7px 6px;
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  align-items: center;
  gap: 4px;
  border-radius: 10px;
  border: none;
  background: transparent;
  appearance: none;
  -webkit-appearance: none;
  outline: none;
  box-shadow: none;
  cursor: pointer;
  transition: transform 160ms ease, background-color 160ms ease, border-color 160ms ease;
}

#hamburger span{
  width: 100%;
  height: 2px;
  border-radius: 999px;
  background: rgba(255,255,255,0.95);
  opacity: 0;
  animation: barSlideIn 520ms ease forwards;
  margin-left: 0;
  transform-origin: left center;
  transition: width 180ms ease, transform 160ms ease, opacity 160ms ease;
}

#bar1{ animation-delay: 0ms; }
#bar2{ animation-delay: 140ms; }
#bar3{ animation-delay: 280ms; }

@keyframes barSlideIn{
  0%{ opacity: 0; transform: translateX(8px); }
  100%{ opacity: 1; transform: translateX(0); }
}

.fade-enter-active, .fade-leave-active{
  transition: opacity 200ms ease;
}
.fade-enter-from, .fade-leave-to{
  opacity: 0;
}

.search-modal{
  position: fixed;
  inset: 0;
  z-index: 999998;
  isolation: isolate;
  background: var(--overlay-bg);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: clamp(1.5rem, 4vw, 2.5rem);
  overflow: auto;
}

.search-card{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: min(620px, 94vw);
  background: var(--card-bg);
  border: 1px solid var(--ui-border);
  border-radius: 1rem;
  padding: 1.4rem;
  display: flex;
  flex-direction: column;
  gap: 20px;
  color: var(--ui-text);
  user-select: text;
}

.blank-card{
  display: flex;
  align-items: center;
  justify-content: center;
}

.search-card__input{
  width: 100%;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 0.55rem;
  padding-bottom: 0.4rem;
  border-bottom: 1px solid var(--input-border);
}

.search-card__input svg{
  width: 20px;
  height: 20px;
  opacity: 0.9;
}

.search-card__input input{
  background: transparent;
  border: none;
  outline: none;
  color: var(--ui-text);
  font-family: "Space Grotesk", system-ui, sans-serif;
  font-size: 1rem;
}

#SAthing{
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 0.75rem;
}

#Pages, #Themes, #Projects{
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

#TTtop, .picker-head{
  position: relative;
  width: 100%;
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  gap: 0.55rem;
  padding: 0.35rem 0;
  background: none;
  border: none;
  color: inherit;
  font: inherit;
  text-align: left;
  cursor: pointer;
}

.collapse-icon, #collapseT{
  height: 16px;
  width: 16px;
  aspect-ratio: 1/1;
  display: inline-block;
  transform-origin: center center;
  transition: transform 260ms cubic-bezier(0.22, 0.8, 0.36, 1);
}

.picker-head[data-open="true"] .collapse-icon,
#TTtop[data-open="true"] #collapseT{
  transform: rotate(90deg);
}

.lang-list, .page-list{
  list-style: none;
  padding: 0;
  margin: 0.25rem 0 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  padding-left: 1rem;
  overflow: hidden;
  opacity: 1;
}

.page-option{
  width: 100%;
  display: inline-flex;
  align-items: center;
  padding: 0.35rem 0.1rem 0.35rem 0.4rem;
  background: transparent;
  border: 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.16);
  color: var(--ui-text);
  font-family: "Space Grotesk", system-ui, sans-serif;
  font-size: 0.95rem;
  text-align: left;
  cursor: pointer;
  transition: border-color 120ms ease, color 120ms ease, transform 120ms ease;
}

.page-option:hover{
  border-bottom-color: rgba(255, 255, 255, 0.16);
}

.lang-option[data-selected="true"]{
  border-color: var(--ui-text);
  color: var(--ui-text);
  font-weight: 700;
}

.flag{
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.flag-icon{
  width: 22px;
  height: 16px;
  border-radius: 3px;
  box-shadow: 0 0 0 1px rgba(255,255,255,0.08);
  transition: transform 220ms cubic-bezier(0.22, 0.8, 0.36, 1), opacity 180ms ease;
}

.lang-inner{
  width: 100%;
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  transform: translateX(0);
  transition: transform 200ms cubic-bezier(0.22, 0.8, 0.36, 1);
}

.lang-option:hover .lang-inner,
.page-option:hover .lang-inner{
  transform: translateX(4px);
}

.lang-name{
  flex: 1;
}

.lang-check{
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--ui-text);
  opacity: 0.82;
}

.check-icon{
  width: 14px;
  height: 14px;
}

.page-inner{
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
}

.page-icon{
  width: 18px;
  height: 18px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.langitem-enter-active,
.langitem-leave-active{
  transition:
    opacity 320ms cubic-bezier(0.22, 0.8, 0.36, 1) calc(var(--d, 0s) + 0.12s),
    transform 320ms cubic-bezier(0.22, 0.8, 0.36, 1) calc(var(--d, 0s) + 0.12s);
}

.langitem-enter-from,
.langitem-leave-to{
  opacity: 0;
  transform: translateX(10px) scale(0.98);
}

.langitem-enter-to,
.langitem-leave-from{
  opacity: 1;
  transform: translateX(0) scale(1);
}

.collapse-enter-active,
.collapse-leave-active{
  transition:
    max-height 320ms cubic-bezier(0.22, 0.8, 0.36, 1),
    padding 320ms cubic-bezier(0.22, 0.8, 0.36, 1),
    opacity 260ms ease;
  overflow: hidden;
}

.collapse-enter-from,
.collapse-leave-to{
  max-height: 0;
  padding-top: 0;
  padding-bottom: 0;
  opacity: 0;
}

.collapse-enter-to,
.collapse-leave-from{
  max-height: 500px;
  padding-top: 0.1rem;
  padding-bottom: 0.25rem;
  opacity: 1;
}

.blank {
  min-height: 120vh;
  background: var(--bg);
}

.asset-shell{
  padding: clamp(2rem, 6vw, 3.5rem) clamp(1.25rem, 5vw, 2.5rem);
  color: var(--fg);
  display: grid;
  gap: 1.25rem;
  max-width: 900px;
  margin: 120px auto 80px;
}

.asset-hero{
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
}

.asset-title{
  font-size: clamp(1.6rem, 3vw, 2.2rem);
  letter-spacing: 0.06em;
}

.eyebrow{
  text-transform: uppercase;
  letter-spacing: 0.2em;
  font-size: 0.78rem;
  color: var(--muted);
}

.muted{
  color: var(--muted);
}

.tag-row{
  display: flex;
  gap: 0.4rem;
  align-items: center;
  flex-wrap: wrap;
}

.tag{
  padding: 0.25rem 0.55rem;
  border: 1px solid var(--border);
  border-radius: 999px;
  font-size: 0.85rem;
}

.asset-grid{
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

.asset-card{
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 1rem;
  background: var(--bg);
}

.asset-card h2{
  margin-bottom: 0.5rem;
  letter-spacing: 0.05em;
}

.kv-list{
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 0.35rem;
}

.kv-label{
  color: var(--muted);
  margin-right: 0.35rem;
}

.kv-list li{
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
  border-bottom: 1px dashed var(--border);
  padding-bottom: 0.25rem;
}

.bullet{
  margin: 0;
  padding-left: 1rem;
  color: var(--fg);
  display: grid;
  gap: 0.25rem;
}

.bullet.tight{
  gap: 0.15rem;
}

.license-grid{
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 0.75rem;
}

.license-card{
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 0.75rem;
  display: grid;
  gap: 0.4rem;
}

.subhead{
  font-size: 0.92rem;
  color: var(--muted);
  margin-bottom: 0.2rem;
}

.price{
  font-size: 1rem;
  font-weight: 700;
}


/* Stable search result dividers */
.search-card .page-option{
  border: 0 !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.16) !important;
  transform: none !important;
  opacity: 1 !important;
  transition: color 120ms ease, opacity 120ms ease !important;
}

.search-card .page-option:hover,
.search-card .page-option.is-cursor-hover{
  border-bottom-color: rgba(255, 255, 255, 0.16) !important;
  transform: none !important;
  opacity: 1 !important;
}

.search-card .page-inner{
  transform: translateX(0);
  transition: transform 200ms cubic-bezier(0.22, 0.8, 0.36, 1);
}

.search-card .page-option:hover .page-inner,
.search-card .page-option.is-cursor-hover .page-inner{
  transform: translateX(4px);
}
</style>
