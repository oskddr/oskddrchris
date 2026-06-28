<template>
  <div id="topbarMain" :data-ready="topbarVisible">
    <RouterLink class="topbar-logo-link" to="/" aria-label="Home" data-cursor-hover>
      <img class="topbar-logo" src="@/assets/img/logo/Logo.png" alt="Christopher Böhme">
    </RouterLink>
    <label class="top-search" aria-label="Search" @click.stop="openSearchModal">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="11" cy="11" r="6.5" stroke="currentColor" stroke-width="2" fill="none" />
        <path d="M16.5 16.5 L21 21" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
      </svg>
      <input
        ref="searchInput"
        type="search"
        placeholder="Search"
        readonly
        @focus.prevent="openSearchModal"
        @mousedown.prevent="openSearchModal"
      />
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

  <main class="opensource-page">
    <div id="mainhero" :style="dotPatternStyle">
      <section class="opensource-hero" aria-labelledby="opensourceTitle">
        <h1 id="opensourceTitle">
          <span class="orbitron-title">Open Source</span>
          <span class="allura-title">Items</span>
        </h1>
        <p>Made all by chris</p>
      </section>
      <div id="linesY"><div></div><div></div></div>
      <div id="linesX"><div></div><div></div></div>
      <div
        v-for="spot in crossoverSpots"
        :key="spot"
        class="crossover-dots"
        :class="spot"
        aria-hidden="true"
      ></div>
    </div>

    <section class="opensource-assets-section" :style="dotPatternStyle" aria-label="Open source asset samples">
      <div class="section-linesY" aria-hidden="true"><div></div><div></div></div>
      <div class="opensource-assets">
        <div class="project-filter-panel" aria-label="Filter open source projects">
          <label class="project-search" aria-label="Search open source projects">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="11" cy="11" r="6.5" stroke="currentColor" stroke-width="2" fill="none" />
              <path d="M16.5 16.5 L21 21" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
            </svg>
            <input
              v-model="projectSearchQuery"
              type="search"
              placeholder="Search projects"
              autocomplete="off"
            >
          </label>
          <div class="project-filter-tabs" role="tablist" aria-label="Project type filters">
            <button
              v-for="filter in projectFilters"
              :key="filter.value"
              type="button"
              class="project-filter-tab"
              :class="[`project-filter-tab--${filter.tone}`, { active: activeProjectFilter === filter.value }]"
              :aria-selected="activeProjectFilter === filter.value"
              role="tab"
              @click="activeProjectFilter = filter.value"
            >
              {{ filter.label }}
            </button>
          </div>
        </div>
        <article
          v-for="asset in filteredProjectAssets"
          :key="asset.code"
          :id="asset.slug"
          class="asset-sample"
          :class="[`asset-kind-${asset.scriptType}`, `mobile-view-${getAssetMobileView(asset.slug)}`]"
        >
          <div class="asset-mobile-tabs" role="tablist" :aria-label="`${asset.title} mobile view`">
            <button
              type="button"
              :class="{ active: getAssetMobileView(asset.slug) === 'preview' }"
              :aria-selected="getAssetMobileView(asset.slug) === 'preview'"
              role="tab"
              @click="setAssetMobileView(asset.slug, 'preview')"
            >
              Thumbnail
            </button>
            <button
              type="button"
              :class="{ active: getAssetMobileView(asset.slug) === 'code' }"
              :aria-selected="getAssetMobileView(asset.slug) === 'code'"
              role="tab"
              @click="setAssetMobileView(asset.slug, 'code')"
            >
              Code
            </button>
          </div>
          <div class="asset-preview">
            <div class="asset-picture" :class="asset.theme">
              <img :src="asset.image" :alt="`${asset.title} preview`">
            </div>
            <div class="asset-info">
              <h2>{{ asset.title }}</h2>
              <p>{{ asset.description }}</p>
              <div class="asset-meta" aria-label="Asset details">
                <span>{{ asset.language }}</span>
                <span>{{ asset.scriptLabel }}</span>
                <span>{{ asset.commentTag }}</span>
                <span>{{ asset.license }}</span>
              </div>
            </div>
          </div>
          <div class="asset-terminal" :style="{ '--terminal-delay': asset.delay }">
            <div class="terminal-topbar">
              <div class="terminal-file">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M6 2h8l4 4v16H6V2Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" />
                  <path d="M14 2v5h4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" />
                </svg>
                <span class="terminal-title">{{ asset.fileName }}</span>
              </div>
              <div class="terminal-switch" role="tablist" :aria-label="`${asset.title} terminal content`">
                <button
                  type="button"
                  :class="{ active: getAssetTerminalView(asset.slug) === 'code' }"
                  :aria-selected="getAssetTerminalView(asset.slug) === 'code'"
                  role="tab"
                  @click="setAssetTerminalView(asset.slug, 'code')"
                >
                  Code
                </button>
                <button
                  type="button"
                  :class="{ active: getAssetTerminalView(asset.slug) === 'setup' }"
                  :aria-selected="getAssetTerminalView(asset.slug) === 'setup'"
                  role="tab"
                  @click="setAssetTerminalView(asset.slug, 'setup')"
                >
                  Setup
                </button>
              </div>
              <button
                class="copy-code"
                type="button"
                :aria-label="`Copy ${asset.title} Luau code`"
                @click="copyAssetCode(asset)"
              >
                <svg v-if="copiedCode === asset.code" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20 6 9 17l-5-5" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <svg v-else viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="8" y="8" width="11" height="11" rx="2" fill="none" stroke="currentColor" stroke-width="1.9" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v1" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" />
                </svg>
              </button>
            </div>
            <div class="terminal-body" :class="`terminal-body--${getAssetTerminalView(asset.slug)}`">
              <transition
                name="terminal-swap"
                mode="out-in"
                @before-enter="beforeTerminalEnter"
                @enter="enterTerminalPanel"
                @after-enter="afterTerminalTransition"
                @before-leave="beforeTerminalLeave"
                @leave="leaveTerminalPanel"
                @after-leave="afterTerminalTransition"
              >
                <pre v-if="getAssetTerminalView(asset.slug) === 'code'" :key="`${asset.slug}-code`"><code>{{ asset.luau }}</code></pre>
                <div v-else :key="`${asset.slug}-setup`" class="setup-tree">
                  <div
                    class="setup-tree__details setup-tree__details--game"
                    :class="{ open: isSetupTreeOpen(asset.slug, 'game') }"
                  >
                    <button type="button" class="setup-tree__summary" @click="toggleSetupTree(asset.slug, 'game')">
                      <span class="setup-tree__chevron" aria-hidden="true"></span>
                      <span class="setup-tree__icon setup-tree__icon--game" aria-hidden="true"></span>
                      <span class="setup-tree__label setup-tree__label--game">Game</span>
                    </button>
                    <div class="setup-tree__children" :class="{ open: isSetupTreeOpen(asset.slug, 'game') }">
                      <div
                        class="setup-tree__details setup-tree__details--service"
                        :class="{ open: isSetupTreeOpen(asset.slug, 'service') }"
                      >
                        <button type="button" class="setup-tree__summary" @click="toggleSetupTree(asset.slug, 'service')">
                          <span class="setup-tree__chevron" aria-hidden="true"></span>
                          <span class="setup-tree__icon" :class="`setup-tree__icon--${asset.setupTree.serviceKind}`" aria-hidden="true"></span>
                          <span class="setup-tree__label" :class="`setup-tree__label--${asset.setupTree.serviceKind}`">{{ asset.setupTree.service }}</span>
                        </button>
                        <div class="setup-tree__children" :class="{ open: isSetupTreeOpen(asset.slug, 'service') }">
                          <div
                            v-for="folder in asset.setupTree.folders"
                            :key="folder.label"
                            class="setup-tree__details setup-tree__details--folder"
                            :class="{ open: isSetupTreeOpen(asset.slug, folder.label) }"
                          >
                            <button type="button" class="setup-tree__summary" @click="toggleSetupTree(asset.slug, folder.label)">
                              <span class="setup-tree__chevron" aria-hidden="true"></span>
                              <span class="setup-tree__icon setup-tree__icon--folder" aria-hidden="true"></span>
                              <span class="setup-tree__label setup-tree__label--folder">{{ folder.label }}</span>
                            </button>
                            <div class="setup-tree__children" :class="{ open: isSetupTreeOpen(asset.slug, folder.label) }">
                              <div class="setup-tree__file setup-tree__file--pop">
                                <span class="setup-tree__spacer" aria-hidden="true"></span>
                                <span class="setup-tree__icon" :class="`setup-tree__icon--${asset.setupTree.fileKind}`" aria-hidden="true"></span>
                                <span class="setup-tree__label" :class="`setup-tree__label--${asset.setupTree.fileKind}`">{{ asset.setupTree.file }}</span>
                              </div>
                            </div>
                          </div>
                          <div v-if="asset.setupTree.folders.length === 0" class="setup-tree__file setup-tree__file--pop">
                            <span class="setup-tree__spacer" aria-hidden="true"></span>
                            <span class="setup-tree__icon" :class="`setup-tree__icon--${asset.setupTree.fileKind}`" aria-hidden="true"></span>
                            <span class="setup-tree__label" :class="`setup-tree__label--${asset.setupTree.fileKind}`">{{ asset.setupTree.file }}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p class="setup-tree__note">{{ asset.setup }}</p>
                </div>
              </transition>
            </div>
          </div>
        </article>
        <p v-if="filteredProjectAssets.length === 0" class="project-empty">No projects match this filter.</p>
      </div>
    </section>
  </main>

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
              placeholder="Search"
              aria-label="Search"
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
                <span class="lang-title">Pages</span>
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
                  <li v-for="(page, idx) in filteredPages" :key="page.slug" :style="{ '--d': `${idx * 0.03}s` }">
                    <button
                      type="button"
                      class="page-option"
                      role="option"
                      @click="selectPage(page.slug, page.href)"
                    >
                      <span class="page-inner">
                        <span class="page-icon" aria-hidden="true">
                          <svg v-if="page.slug === 'home'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M3 10.5 12 3l9 7.5" />
                            <path d="M5.5 9V21h13V9" />
                          </svg>
                          <svg v-else-if="page.slug === 'open-source'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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
                          <svg v-else-if="page.slug === 'reviews'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 15a3 3 0 0 1-3 3H9l-5 3v-6a3 3 0 0 1-1-2.25V7a3 3 0 0 1 3-3h11a3 3 0 0 1 3 3Z"/><path d="M8 9h.01M12 9h.01M16 9h.01"/></svg>
                          <svg v-else-if="page.slug.startsWith('social-')" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 1 0-7l1.5-1.5a5 5 0 0 1 7 7L17 13"/><path d="M14 11a5 5 0 0 1 0 7l-1.5 1.5a5 5 0 1 1-7-7L7 11"/></svg>
                          <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M6 2h9l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z" />
                            <path d="M14 2v5h5" />
                            <path d="M9 13h6" />
                            <path d="M9 17h6" />
                          </svg>
                        </span>
                        <span class="page-name">{{ page.label }}</span>
                      </span>
                    </button>
                  </li>
                </transition-group>
              </transition>
            </div>
            <div id="Projects" v-if="filteredOpenSourceProjects.length">
              <button
                class="picker-head"
                type="button"
                :data-open="projectsShouldOpen"
                :aria-expanded="projectsShouldOpen"
                aria-controls="projectList"
                @click="toggleProjects"
              >
                <svg class="collapse-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.9 1.5 L17 12 L8.9 22.5" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <span class="flag header-flag" aria-hidden="true">
                  <span class="theme-emoji">⌘</span>
                </span>
                <span class="lang-title">Open Source Projects</span>
              </button>
              <transition name="collapse">
                <transition-group
                  v-if="projectsShouldOpen"
                  id="projectList"
                  class="page-list"
                  role="listbox"
                  aria-label="Open Source Projects"
                  name="langitem"
                  tag="ul"
                >
                  <li
                    v-for="(project, idx) in filteredOpenSourceProjects"
                    :key="project.slug"
                    :style="{ '--d': `${idx * 0.03}s` }"
                  >
                    <button
                      type="button"
                      class="page-option"
                      role="option"
                      @click="selectOpenSourceProject(project.slug)"
                    >
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

  <SmoothCursor />
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { RouterLink, useRouter } from "vue-router";
import SmoothCursor from "../components/SmoothCursor.vue";
import { matchesSearch } from "@/lib/searchMatch";
import logoImage from "@/assets/img/logo/Logo.png";
import { useAutoCloseMenu } from "@/lib/useAutoCloseMenu";

const router = useRouter();
const STORAGE_THEME_KEY = "zantixTheme";

const readStoredTheme = (): "system" | "light" | "dark" | null => {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem(STORAGE_THEME_KEY);
  if (stored === "system" || stored === "light" || stored === "dark") return stored;
  return null;
};

const topbarVisible = ref(false);
const menuOpen = ref(false);
const { closeMenu, keepMenuOpen, toggleMenu } = useAutoCloseMenu(menuOpen);
const searchInput = ref<HTMLInputElement | null>(null);
const modalSearchInput = ref<HTMLInputElement | null>(null);
const searchModalOpen = ref(false);
const searchQuery = ref("");
const previousOverflow = ref<string | null>(null);
const previousOverflowY = ref<string | null>(null);
const previousBodyOverflowY = ref<string | null>(null);
const previousBodyBackground = ref<string | null>(null);
const pagesOpen = ref(true);
const projectsOpen = ref(false);
const theme = ref<"dark" | "light" | "system">(readStoredTheme() ?? "system");
const copiedCode = ref<string | null>(null);
const projectSearchQuery = ref("");
const activeProjectFilter = ref<"all" | "server" | "local" | "module">("all");
const assetMobileViews = ref<Record<string, "preview" | "code">>({});
const assetTerminalViews = ref<Record<string, "code" | "setup">>({});
const setupTreeOpen = ref<Record<string, boolean>>({});

const pages = [
  { slug: "home", label: "Home", href: "/" },
  { slug: "about", label: "About me", href: "/about" },
  { slug: "open-source", label: "Open Source", href: "/opensource" },
  { slug: "developers", label: "Works", href: "/Team" },
  { slug: "links", label: "Links", href: "/links" },
  { slug: "reviews", label: "Reviews", href: "/reviews/" },
  { slug: "credits", label: "Credits", href: "/credits/" },
];

const crossoverSpots = ["top-left", "top-right", "bottom-left", "bottom-right"];
const projectFilters = [
  { value: "all", label: "All", tone: "all" },
  { value: "server", label: "ServerScript", tone: "server" },
  { value: "local", label: "LocalScript", tone: "local" },
  { value: "module", label: "ModuleScript", tone: "module" },
] as const;

const setupTrees = {
  dna: {
    service: "ServerScriptService",
    serviceKind: "serverService",
    folders: [],
    file: "DNA.luau",
    fileKind: "server",
  },
  imprint: {
    service: "ReplicatedStorage",
    serviceKind: "replicated",
    folders: [],
    file: "Imprint.luau",
    fileKind: "module",
  },
  orbitAura: {
    service: "StarterPlayer",
    serviceKind: "starterPlayer",
    folders: [{ label: "StarterPlayerScripts" }],
    file: "OrbitAura.client.luau",
    fileKind: "local",
  },
  gravityField: {
    service: "StarterPlayer",
    serviceKind: "starterPlayer",
    folders: [{ label: "StarterPlayerScripts" }],
    file: "GravityField.client.luau",
    fileKind: "local",
  },
  npcController: {
    service: "ReplicatedStorage",
    serviceKind: "replicated",
    folders: [],
    file: "NPCController.luau",
    fileKind: "module",
  },
};

const openSourceAssets = [
  {
    code: "ASSET-001",
    slug: "project-dna",
    title: "Double Helix DNA",
    fileName: "DNA.luau",
    description: "A math-driven Luau generator that uses sine, cosine, angle steps, and vector offsets to build a double helix DNA model in Roblox.",
    language: "Luau",
    scriptType: "server",
    scriptLabel: "Server Script",
    commentTag: "With comments",
    license: "MIT",
    image: logoImage,
    theme: "theme-blue",
    delay: "0s",
    setupTree: setupTrees.dna,
    setup: `1. Create a Script in ServerScriptService.
2. Paste this code into the Script.
3. Press Play in Roblox Studio.
4. The DNA model generates in Workspace inside a folder named "dna helix".`,
    luau: `--!strict
-- helix settings
local origin:Vector3 = Vector3.new(0, 0, 0);
local helixRadius:number = 8;
local helixHeight:number = 80;
local turns:number = 6;
local partsPerTurn:number = 20;
local rungEvery:number = 2;

-- part settings
local strandSize:Vector3 = Vector3.new(1.5, 1.5, 1.5);
local material:Enum.Material = Enum.Material.Neon;

-- colors for strands and rungs
local strandAColor:Color3 = Color3.fromRGB(255, 80, 80);
local rungAColor:Color3 = Color3.fromRGB(255, 200, 80);
local strandBColor:Color3 = Color3.fromRGB(80, 140, 255);
local rungBColor:Color3 = Color3.fromRGB(80, 255, 160);

-- derived values
local totalSteps:number = turns * partsPerTurn;
local heightStep:number = helixHeight / totalSteps;
local angleStep:number = ((math.pi * 2) / partsPerTurn);

-- container so everything stays grouped
local folder:Folder = Instance.new('Folder', workspace);
folder.Name = 'dna helix';

-- creates a generic part with shared defaults returns the part
local function createPart(size:Vector3, color:Color3, shape:Enum.PartType?):Part
\tlocal part = Instance.new('Part');
\tpart.Size = size; part.Color = color;
\tpart.Shape = shape or Enum.PartType.Ball;
\tpart.Material = material;
\tpart.Anchored = true; part.CanCollide = false;
\tpart.CastShadow = false;

\treturn part;
end

-- returns a position along the helix for a given angle plus height
local function getHelixPosition(angle:number, height:number):Vector3
\tlocal x:number = (origin.X + helixRadius * math.cos(angle));
\tlocal y:number = origin.Y + height;
\tlocal z:number = (origin.Z + helixRadius * math.sin(angle));

\treturn Vector3.new(x, y, z);
end

-- builds the connecting rung between the two strands
local function createRung(posA:Vector3, posB:Vector3):()
\tlocal offset:Vector3 = posB - posA;
    local distance:number = offset.Magnitude;
    if (distance == 0) then return; end;
\tlocal direction:Vector3 = offset.Unit;

\t-- split into two colored halves
\tlocal halves:{{pos:Vector3, color:Color3}} = {
\t\t{pos = posA + direction * (distance / 4), color = rungAColor};
\t\t{pos = posB - direction * (distance / 4), color = rungBColor}
\t};

\tfor _, data in ipairs(halves) do
\t\tlocal rung:Part = createPart(Vector3.new(0.8, 0.8, distance / 2), data.color, Enum.PartType.Block);

\t\trung.CFrame = CFrame.lookAt(data.pos, data.pos + direction);
\t\trung.Parent = folder;
\tend
end

-- places a single strand segment
local function createStrandPart(position:Vector3, color:Color3)
\tlocal part:Part = createPart(strandSize, color, Enum.PartType.Ball);
\tpart.Position = position;
\tpart.Parent = folder;
end

-- main generation loop
for step = 0, totalSteps - 1 do
\tlocal angle:number = step * angleStep;
\tlocal height:number = step * heightStep;

\t-- second strand is directly opposite (pi offset)
\tlocal posA:Vector3 = getHelixPosition(angle, height);
\tlocal posB:Vector3 = getHelixPosition(angle + math.pi, height);

\tcreateStrandPart(posA, strandAColor); createStrandPart(posB, strandBColor);

\t-- add rungs at intervals so it dont get too dense
\tif (step % rungEvery == 0) then createRung(posA, posB); end;
end

-- debug
warn(\`DNA (Double Helix) Generated With {totalSteps} Parts Per Strand\`);`,
  },
  {
    code: "ASSET-002",
    slug: "project-imprint",
    title: "Imprint Module",
    fileName: "Imprint.luau",
    description: "A strict Luau workspace snapshot module that clones, validates, stores, and reloads instance imprints with typed capture/load options.",
    language: "Luau",
    scriptType: "module",
    scriptLabel: "ModuleScript",
    commentTag: "Without comments",
    license: "MIT",
    image: logoImage,
    theme: "theme-blue",
    delay: "0.08s",
    setupTree: setupTrees.imprint,
    setup: `1. Create a ModuleScript in ReplicatedStorage or ServerScriptService.
2. Name it "Imprint".
3. Paste this module code inside it.
4. Require it from another script and call Imprint.CaptureWorkspace() or create an Imprint.new() controller.`,
    luau: `local HTTPS = game:GetService('HttpService');
local WS:Workspace = workspace;

local Imprint = {};
Imprint.__index = Imprint;

type InstancePredicate = (x:Instance)->boolean;

export type ImprintEntry = {
\tId:number;
\tName:string;
\tClassName:string;
\tData:Instance
};

export type ImprintSkipRecord = {
\tName:string;
\tClassName:string;
\tReason:string
};

export type ImprintSnapshot = {
\tSnapshotId:string;
\tRootName:string;
\tCapturedAt:number;
\tCount:number;
\tEntries:{ImprintEntry};
\tSkipped:{ImprintSkipRecord}
};

export type ImprintCaptureOptions = {
\tRoot:Instance?;
\tInclude:InstancePredicate?;
\tForceArchivable:boolean?
};

export type ImprintLoadOptions = {
\tSnapshot:ImprintSnapshot;
\tRoot:Instance?;
\tClear:boolean?;
\tInclude:InstancePredicate?;
\tClearPredicate:InstancePredicate?
};

type ImprintLocalLoadOptions = {
\tRoot:Instance?;
\tClear:boolean?;
\tInclude:InstancePredicate?;
\tClearPredicate:InstancePredicate?
};

export type ImprintOptions = {
\tRoot:Instance?;
\tForceArchivable:boolean?
};

export type ImprintController = {
\tCapture:(self:ImprintController, x:ImprintCaptureOptions?)->ImprintSnapshot;
\tLoad:(self:ImprintController, x:ImprintLocalLoadOptions?)->{Instance};
\tGetSnapshot:(self:ImprintController)->ImprintSnapshot?;
\tSetSnapshot:(self:ImprintController, x:ImprintSnapshot)->();
\tCloneCurrentSnapshot:(self:ImprintController)->ImprintSnapshot?;
\tHasSnapshot:(self:ImprintController)->boolean;
\tClearSnapshot:(self:ImprintController)->();
\tDestroy:(self:ImprintController)->()
};

type CloneResult = {
\tSuccess:boolean;
\tClone:Instance?;
\tReason:string?
};

type ImprintInternal = ImprintController & {
\t_root:Instance;
\t_forceArchivable:boolean;
\t_snapshot:ImprintSnapshot?;
\t_destroyed:boolean;
\t_assertAlive:(self:ImprintInternal)->()
};

local function now():number
\treturn time();
end;

local function _x1(x:Instance?):Instance
\tif (x == nil) then
\t\treturn WS;
\tend;

\tassert(typeof(x) == 'Instance', 'Imprint Root Must Be An Instance Or Nil');
\treturn x;
end;

local function _x2(x:{ImprintSkipRecord}, z:Instance, y:string):()
\tx[#x + 1] = {
\t\tName = z.Name;
\t\tClassName = z.ClassName;
\t\tReason = y
\t};
end;

local function _x3(x:Instance, z:boolean):CloneResult
\tlocal y:boolean = x.Archivable;
\tlocal v:{any};

\tassert(typeof(x) == 'Instance', 'Imprint Can Only Clone Instances');
\tassert(type(z) == 'boolean', 'Imprint ForceArchivable Must Be A Boolean');

\tif (z and (x.Archivable ~= true)) then
\t\tx.Archivable = true;
\tend;

\tv = table.pack(pcall(function():Instance
\t\tlocal c:Instance = x:Clone();
\t\tc.Parent = nil;
\t\treturn c;
\tend));

\tif (z and (x.Archivable ~= y)) then
\t\tx.Archivable = y;
\tend;

\tif ((v[1] == true) and (typeof(v[2]) == 'Instance')) then
\t\treturn {
\t\t\tSuccess = true;
\t\t\tClone = v[2];
\t\t\tReason = nil
\t\t};
\tend;

\tlocal c:string = 'CloneFailed';

\tif (type(v[2]) == 'string') then
\t\tc = v[2];
\tend;

\treturn {
\t\tSuccess = false;
\t\tClone = nil;
\t\tReason = c
\t};
end;

local function _x4(x:Instance, z:InstancePredicate?):boolean
\tassert(typeof(x) == 'Instance', 'Imprint Predicate Received A Non Instance');

\tif (z == nil) then
\t\treturn true;
\tend;

\tassert(type(z) == 'function', 'Imprint Predicate Must Be A Function Or Nil');
\treturn z(x) == true;
end;

local function _x5(x:Instance):boolean
\tassert(typeof(x) == 'Instance', 'Imprint Clear Predicate Received A Non Instance');
\treturn ((not x:IsA('Terrain')) and (not x:IsA('Camera')));
end;

local function _x6(x:{ImprintSkipRecord}):{ImprintSkipRecord}
\tlocal z:{ImprintSkipRecord} = {};
\tlocal y:number = 1;
\tlocal v:number = #x;
\tlocal c:ImprintSkipRecord;

\twhile (y <= v) do
\t\tc = x[y];

\t\tz[y] = {
\t\t\tName = c.Name;
\t\t\tClassName = c.ClassName;
\t\t\tReason = c.Reason
\t\t};

\t\ty += 1;
\tend;

\treturn z;
end;

local function _x7(x:ImprintSnapshot):()
\tlocal z:number = 1;
\tlocal y:number = 1;
\tlocal v:ImprintEntry;
\tlocal c:ImprintSkipRecord;

\tassert(type(x) == 'table', 'Imprint Snapshot Must Be A Table');
\tassert((type(x.SnapshotId) == 'string') and (x.SnapshotId ~= ''), 'Imprint SnapshotId Must Be A Non Empty String');
\tassert((type(x.RootName) == 'string') and (x.RootName ~= ''), 'Imprint RootName Must Be A Non Empty String');
\tassert(type(x.CapturedAt) == 'number', 'Imprint CapturedAt Must Be A Number');
\tassert(type(x.Count) == 'number', 'Imprint Count Must Be A Number');
\tassert(type(x.Entries) == 'table', 'Imprint Entries Must Be A Table');
\tassert(type(x.Skipped) == 'table', 'Imprint Skipped Must Be A Table');
\tassert(x.Count == #x.Entries, 'Imprint Snapshot Count Does Not Match Entry Count');

\twhile (z <= #x.Entries) do
\t\tv = x.Entries[z];
\t\tassert(type(v) == 'table', 'Imprint Snapshot Entry Must Be A Table');
\t\tassert(type(v.Id) == 'number', 'Imprint Entry Id Must Be A Number');
\t\tassert((type(v.Name) == 'string') and (v.Name ~= ''), 'Imprint Entry Name Must Be A Non Empty String');
\t\tassert((type(v.ClassName) == 'string') and (v.ClassName ~= ''), 'Imprint Entry ClassName Must Be A Non Empty String');
\t\tassert(typeof(v.Data) == 'Instance', 'Imprint Entry Data Must Be An Instance');
\t\tz += 1;
\tend;

\twhile (y <= #x.Skipped) do
\t\tc = x.Skipped[y];
\t\tassert(type(c) == 'table', 'Imprint Skip Record Must Be A Table');
\t\tassert((type(c.Name) == 'string') and (c.Name ~= ''), 'Imprint Skip Record Name Must Be A Non Empty String');
\t\tassert((type(c.ClassName) == 'string') and (c.ClassName ~= ''), 'Imprint Skip Record ClassName Must Be A Non Empty String');
\t\tassert(type(c.Reason) == 'string', 'Imprint Skip Record Reason Must Be A String');
\t\ty += 1;
\tend;
end;

local function _x8(x:ImprintSnapshot):ImprintSnapshot
\t_x7(x);

\tlocal z:{ImprintEntry} = {};
\tlocal y:{ImprintSkipRecord} = _x6(x.Skipped);
\tlocal v:number = 1;
\tlocal c:number = #x.Entries;
\tlocal b:ImprintEntry;
\tlocal n:CloneResult;
\tlocal m:Instance;

\twhile (v <= c) do
\t\tb = x.Entries[v];
\t\tn = _x3(b.Data, true);
\t\tassert((n.Success == true) and (n.Clone ~= nil), 'Imprint Could Not Clone Snapshot Entry: '..b.Name);
\t\tm = n.Clone;

\t\tz[v] = {
\t\t\tId = b.Id;
\t\t\tName = b.Name;
\t\t\tClassName = b.ClassName;
\t\t\tData = m
\t\t};

\t\tv += 1;
\tend;

\treturn {
\t\tSnapshotId = HTTPS:GenerateGUID(false);
\t\tRootName = x.RootName;
\t\tCapturedAt = x.CapturedAt;
\t\tCount = x.Count;
\t\tEntries = z;
\t\tSkipped = y
\t};
end;

local function _x9(x:ImprintCaptureOptions?):ImprintSnapshot
\tlocal z:Instance = WS;
\tlocal y:InstancePredicate? = nil;
\tlocal v:boolean = true;
\tlocal c:{Instance};
\tlocal b:{ImprintEntry} = {};
\tlocal n:{ImprintSkipRecord} = {};
\tlocal m:number = 1;
\tlocal a:number = 0;
\tlocal q:Instance;
\tlocal k:boolean;
\tlocal r:CloneResult;
\tlocal p:string;

\tif (x ~= nil) then
\t\tassert(type(x) == 'table', 'Imprint Capture Options Must Be A Table Or Nil');

\t\tif (x.Root ~= nil) then
\t\t\tz = _x1(x.Root);
\t\tend;

\t\tif (x.Include ~= nil) then
\t\t\tassert(type(x.Include) == 'function', 'Imprint Include Must Be A Function Or Nil');
\t\t\ty = x.Include;
\t\tend;

\t\tif (x.ForceArchivable ~= nil) then
\t\t\tassert(type(x.ForceArchivable) == 'boolean', 'Imprint ForceArchivable Must Be A Boolean Or Nil');
\t\t\tv = x.ForceArchivable;
\t\tend;
\tend;

\tc = z:GetChildren();

\twhile (m <= #c) do
\t\tq = c[m];
\t\tk = _x4(q, y);

\t\tif (k) then
\t\t\tr = _x3(q, v);

\t\t\tif ((r.Success == true) and (r.Clone ~= nil)) then
\t\t\t\ta += 1;

\t\t\t\tb[a] = {
\t\t\t\t\tId = a;
\t\t\t\t\tName = q.Name;
\t\t\t\t\tClassName = q.ClassName;
\t\t\t\t\tData = r.Clone
\t\t\t\t};
\t\t\telse
\t\t\t\tp = 'CloneFailed';

\t\t\t\tif (type(r.Reason) == 'string') then
\t\t\t\t\tp = r.Reason;
\t\t\t\tend;

\t\t\t\t_x2(n, q, p);
\t\t\tend;
\t\tend;

\t\tm += 1;
\tend;

\treturn {
\t\tSnapshotId = HTTPS:GenerateGUID(false);
\t\tRootName = z.Name;
\t\tCapturedAt = now();
\t\tCount = a;
\t\tEntries = b;
\t\tSkipped = n
\t};
end;

local function _x10(x:ImprintLoadOptions):{Instance}
\tlocal z:Instance = WS;
\tlocal y:boolean = false;
\tlocal v:InstancePredicate? = nil;
\tlocal c:InstancePredicate? = nil;
\tlocal b:{Instance} = {};
\tlocal n:{Instance};
\tlocal m:number = 1;
\tlocal a:number = 0;
\tlocal q:Instance;
\tlocal k:boolean;
\tlocal r:CloneResult;
\tlocal p:ImprintEntry;

\tassert(type(x) == 'table', 'Imprint Load Options Must Be A Table');
\t_x7(x.Snapshot);

\tif (x.Root ~= nil) then
\t\tz = _x1(x.Root);
\tend;

\tif (x.Clear ~= nil) then
\t\tassert(type(x.Clear) == 'boolean', 'Imprint Clear Must Be A Boolean Or Nil');
\t\ty = x.Clear;
\tend;

\tif (x.Include ~= nil) then
\t\tassert(type(x.Include) == 'function', 'Imprint Include Must Be A Function Or Nil');
\t\tv = x.Include;
\tend;

\tif (x.ClearPredicate ~= nil) then
\t\tassert(type(x.ClearPredicate) == 'function', 'Imprint ClearPredicate Must Be A Function Or Nil');
\t\tc = x.ClearPredicate;
\tend;

\tif (y) then
\t\tn = z:GetChildren();

\t\twhile (m <= #n) do
\t\t\tq = n[m];

\t\t\tif (c ~= nil) then
\t\t\t\tk = _x4(q, c);
\t\t\telse
\t\t\t\tk = _x5(q);
\t\t\tend;

\t\t\tif (k) then
\t\t\t\tq:Destroy();
\t\t\tend;

\t\t\tm += 1;
\t\tend;
\tend;

\tm = 1;

\twhile (m <= #x.Snapshot.Entries) do
\t\tp = x.Snapshot.Entries[m];

\t\tif (_x4(p.Data, v)) then
\t\t\tr = _x3(p.Data, true);

\t\t\tif ((r.Success == true) and (r.Clone ~= nil)) then
\t\t\t\ta += 1;
\t\t\t\tr.Clone.Parent = z;
\t\t\t\tb[a] = r.Clone;
\t\t\tend;
\t\tend;

\t\tm += 1;
\tend;

\treturn b;
end;

function Imprint:_assertAlive():()
\tassert(not self._destroyed, 'Imprint Was Destroyed And Can No Longer Be Used');
end;

function Imprint.new(x:ImprintOptions?):ImprintController
\tlocal z:Instance = WS;
\tlocal y:boolean = true;
\tlocal self:ImprintInternal;

\tif (x ~= nil) then
\t\tassert(type(x) == 'table', 'Imprint Options Must Be A Table Or Nil');

\t\tif (x.Root ~= nil) then
\t\t\tz = _x1(x.Root);
\t\tend;

\t\tif (x.ForceArchivable ~= nil) then
\t\t\tassert(type(x.ForceArchivable) == 'boolean', 'Imprint ForceArchivable Must Be A Boolean Or Nil');
\t\t\ty = x.ForceArchivable;
\t\tend;
\tend;

\tself = setmetatable({
\t\t_root = z;
\t\t_forceArchivable = y;
\t\t_snapshot = nil;
\t\t_destroyed = false
\t}, Imprint)::any;

\treturn self;
end;

function Imprint.CaptureWorkspace(x:ImprintCaptureOptions?):ImprintSnapshot
\treturn _x9(x);
end;

function Imprint.LoadWorkspace(x:ImprintLoadOptions):{Instance}
\tlocal z:boolean = true;

\tassert(type(x) == 'table', 'Imprint Load Options Must Be A Table');

\tif (x.Clear ~= nil) then
\t\tassert(type(x.Clear) == 'boolean', 'Imprint Clear Must Be A Boolean Or Nil');
\t\tz = x.Clear;
\tend;

\treturn _x10({
\t\tSnapshot = x.Snapshot;
\t\tRoot = x.Root;
\t\tClear = z;
\t\tInclude = x.Include;
\t\tClearPredicate = x.ClearPredicate
\t});
end;

function Imprint.CloneSnapshot(x:ImprintSnapshot):ImprintSnapshot
\treturn _x8(x);
end;

function Imprint:Capture(x:ImprintCaptureOptions?):ImprintSnapshot
\tself:_assertAlive();

\tlocal z:Instance = self._root;
\tlocal y:InstancePredicate? = nil;
\tlocal v:boolean = self._forceArchivable;

\tif (x ~= nil) then
\t\tassert(type(x) == 'table', 'Imprint Capture Options Must Be A Table Or Nil');

\t\tif (x.Root ~= nil) then
\t\t\tz = _x1(x.Root);
\t\tend;

\t\tif (x.Include ~= nil) then
\t\t\tassert(type(x.Include) == 'function', 'Imprint Include Must Be A Function Or Nil');
\t\t\ty = x.Include;
\t\tend;

\t\tif (x.ForceArchivable ~= nil) then
\t\t\tassert(type(x.ForceArchivable) == 'boolean', 'Imprint ForceArchivable Must Be A Boolean Or Nil');
\t\t\tv = x.ForceArchivable;
\t\tend;
\tend;

\tself._snapshot = _x9({
\t\tRoot = z;
\t\tInclude = y;
\t\tForceArchivable = v
\t});

\treturn self._snapshot;
end;

function Imprint:Load(x:ImprintLocalLoadOptions?):{Instance}
\tself:_assertAlive();

\tlocal z:ImprintSnapshot? = self._snapshot;
\tlocal y:Instance = self._root;
\tlocal v:boolean = false;
\tlocal c:InstancePredicate? = nil;
\tlocal b:InstancePredicate? = nil;
\tlocal n:ImprintSnapshot;

\tassert(z ~= nil, 'Imprint Does Not Have A Snapshot To Load');
\tn = z;

\tif (x ~= nil) then
\t\tassert(type(x) == 'table', 'Imprint Load Options Must Be A Table Or Nil');

\t\tif (x.Root ~= nil) then
\t\t\ty = _x1(x.Root);
\t\tend;

\t\tif (x.Clear ~= nil) then
\t\t\tassert(type(x.Clear) == 'boolean', 'Imprint Clear Must Be A Boolean Or Nil');
\t\t\tv = x.Clear;
\t\tend;

\t\tif (x.Include ~= nil) then
\t\t\tassert(type(x.Include) == 'function', 'Imprint Include Must Be A Function Or Nil');
\t\t\tc = x.Include;
\t\tend;

\t\tif (x.ClearPredicate ~= nil) then
\t\t\tassert(type(x.ClearPredicate) == 'function', 'Imprint ClearPredicate Must Be A Function Or Nil');
\t\t\tb = x.ClearPredicate;
\t\tend;
\tend;

\treturn _x10({
\t\tSnapshot = n;
\t\tRoot = y;
\t\tClear = v;
\t\tInclude = c;
\t\tClearPredicate = b
\t});
end;

function Imprint:GetSnapshot():ImprintSnapshot?
\tself:_assertAlive();
\treturn self._snapshot;
end;

function Imprint:SetSnapshot(x:ImprintSnapshot):()
\tself:_assertAlive();
\t_x7(x);
\tself._snapshot = _x8(x);
end;

function Imprint:CloneCurrentSnapshot():ImprintSnapshot?
\tself:_assertAlive();

\tlocal z:ImprintSnapshot? = self._snapshot;

\tif (z == nil) then
\t\treturn nil;
\tend;

\treturn _x8(z);
end;

function Imprint:HasSnapshot():boolean
\tself:_assertAlive();
\treturn self._snapshot ~= nil;
end;

function Imprint:ClearSnapshot():()
\tself:_assertAlive();
\tself._snapshot = nil;
end;

function Imprint:Destroy():()
\tif (self._destroyed) then
\t\treturn;
\tend;

\tself._destroyed = true;
\tself._snapshot = nil;
end;

return table.freeze(Imprint);`,
  },
  {
    code: "ASSET-003",
    slug: "project-orbit-aura",
    title: "Dynamic Orbit Aura",
    fileName: "OrbitAura.client.luau",
    description: "A LocalScript that creates neon orbs around the player and animates position, color, size, and light with RenderStepped.",
    language: "Luau",
    scriptType: "local",
    scriptLabel: "LocalScript",
    commentTag: "With comments",
    license: "MIT",
    image: logoImage,
    theme: "theme-blue",
    delay: "0.16s",
    setupTree: setupTrees.orbitAura,
    setup: `1. Create a LocalScript in StarterPlayerScripts.
2. Paste this code into the LocalScript.
3. Press Play.
4. The aura follows your character and animates every frame on the client.`,
    luau: `--!strict
local players = game:GetService('Players');
local runService = game:GetService('RunService');

local player:Player = players.LocalPlayer;
local character:Model = player.Character or player.CharacterAdded:Wait();
local root:BasePart = character:WaitForChild('HumanoidRootPart')::BasePart;

-- orbit settings
local orbCount:number = 10;
local orbitRadius:number = 6;
local orbitSpeed:number = 2.2;
local heightWave:number = 2;

-- visual settings
local baseSize:number = 1;
local sizePulse:number = 0.6;
local lightRange:number = 10;
local lightBrightness:number = 2;

-- container so everything stays grouped
local folder:Folder = Instance.new('Folder', workspace);
folder.Name = 'dynamic orbit aura';

local orbs:{Part} = {};

-- creates one glowing orb with a point light
local function createOrb(index:number):Part
    local orb:Part = Instance.new('Part');
    orb.Name = \`orb {index}\`; orb.Shape = Enum.PartType.Ball;
\torb.Material = Enum.Material.Neon;
\torb.Anchored = true; orb.CanCollide = false;
\torb.CastShadow = false;

\tlocal light:PointLight = Instance.new('PointLight', orb);
\tlight.Brightness = lightBrightness;
\tlight.Range = lightRange;

\torb.Parent = folder;
\treturn orb;
end

-- updates one orb position, color, size, and light
local function updateOrb(orb:Part, index:number, time:number):()
\tlocal offset:number = (index / orbCount);
    local angle:number = ((time * orbitSpeed) + (offset * math.pi * 2));
    local light:PointLight? = orb:FindFirstChildOfClass('PointLight');

\t-- adds a wave so the orbs dont look flat
\tlocal y:number = (math.sin((time * 3) + index) * heightWave);

\t-- small radius pulse makes it feel more alive
\tlocal radius:number = (orbitRadius + math.sin((time * 2) + index));

\tlocal x:number = (math.cos(angle) * radius);
\tlocal z:number = (math.sin(angle) * radius);

\torb.Position = root.Position + Vector3.new(x, y + 3, z);

\t-- rainbow color cycle
\tlocal hue:number = ((time * 0.15) + offset) % 1;
\tlocal color:Color3 = Color3.fromHSV(hue, 1, 1);
\torb.Color = color;

\t-- pulse the orb size
\tlocal scale:number = (baseSize + math.sin((time * 4) + index) * sizePulse);
\torb.Size = Vector3.new(scale, scale, scale);

    if (light) then
\t\tlight.Color = color;
\t\tlight.Brightness = lightBrightness + math.sin((time * 6) + index);
\tend;
end

-- creates all orbs once
for index = 1, orbCount do
\torbs[index] = createOrb(index);
end

-- main animation loop
runService.RenderStepped:Connect(function()
\tlocal time:number = os.clock();

\tfor index, orb in ipairs(orbs) do
\t\tupdateOrb(orb, index, time);
\tend;
end);

-- debug
warn(\`Dynamic Orbit Aura Generated With {orbCount} Orbs\`);`,
  },
  {
    code: "ASSET-004",
    slug: "project-gravity-field",
    title: "Interactive Gravity Field",
    fileName: "GravityField.client.luau",
    description: "A LocalScript showcase that creates a mouse-reactive neon gravity field with orbiting fragments and click burst motion.",
    language: "Luau",
    scriptType: "local",
    scriptLabel: "LocalScript",
    commentTag: "With comments",
    license: "MIT",
    image: logoImage,
    theme: "theme-blue",
    delay: "0.24s",
    setupTree: setupTrees.gravityField,
    setup: `1. Create a LocalScript in StarterPlayerScripts.
2. Paste this code into the LocalScript.
3. Press Play and move your mouse to pull the field.
4. Left click to trigger the expansion burst.`,
    luau: `--!strict
local players = game:GetService('Players');
local runService = game:GetService('RunService');
local userInputService = game:GetService('UserInputService');

local player:Player = players.LocalPlayer;
local mouse:Mouse = player:GetMouse();

local character:Model = player.Character or player.CharacterAdded:Wait();
local root:BasePart = character:WaitForChild('HumanoidRootPart')::BasePart;

-- gravity field settings
local fragmentCount:number = 36;
local baseOrbitRadius:number = 8;
local orbitSpeed:number = 1.35;
local verticalRange:number = 5;
local pullStrength:number = 1.8;

-- mouse control settings
local followSpeed:number = 0.12;
local mousePullDistance:number = 22;
local mousePullStrength:number = 0.35;
local clickBurstStrength:number = 5;
local clickBurstDecay:number = 3.5;

-- visual settings
local fragmentSize:Vector3 = Vector3.new(0.35, 0.35, 1.4);
local coreSize:Vector3 = Vector3.new(2.2, 2.2, 2.2);
local material:Enum.Material = Enum.Material.Neon;
local mainColor:Color3 = Color3.fromRGB(235, 235, 235);
local coreColor:Color3 = Color3.fromRGB(210, 210, 210);

-- container so everything stays grouped
local folder:Folder = Instance.new('Folder', workspace);
folder.Name = 'interactive gravity field showcase';

local fragments:{Part} = {};
local centerPosition:Vector3 = root.Position + Vector3.new(0, 3, 0);
local burst:number = 0;

-- creates a cleaner diamond style core instead of a ball
local function createCore():Part
\tlocal core:Part = Instance.new('Part');
\tcore.Name = 'gravity diamond';
\tcore.Shape = Enum.PartType.Block;
\tcore.Material = material;
\tcore.Color = coreColor;
\tcore.Size = coreSize;
\tcore.Anchored = true; core.CanCollide = false;
\tcore.CastShadow = false;
\tcore.Transparency = 0.1;
\tcore.Parent = folder;

\treturn core;
end

-- creates one orbiting fragment
local function createFragment(index:number):Part
    local fragment:Part = Instance.new('Part', folder);
    fragment.Name = \`fragment {index}\`;
\tfragment.Size = fragmentSize; fragment.Material = material;
\tfragment.Color = mainColor;
\tfragment.Anchored = true; fragment.CanCollide = false;
\tfragment.CastShadow = false;

\treturn fragment;
end

local core:Part = createCore();

-- returns the point the mouse is aiming at
local function getMousePosition():Vector3
\tlocal hit:CFrame = mouse.Hit;
\treturn hit.Position;
end

-- moves the gravity field between the player and mouse position
local function updateCenter():()
\tlocal playerCenter:Vector3 = (root.Position + Vector3.new(0, 3, 0));
\tlocal mousePosition:Vector3 = getMousePosition();

\tlocal offset:Vector3 = mousePosition - playerCenter;
\tlocal distance:number = math.min(offset.Magnitude, mousePullDistance);

\tif (offset.Magnitude > 0) then
\t\tlocal target:Vector3 = playerCenter + offset.Unit * distance * mousePullStrength;
\t\tcenterPosition = centerPosition:Lerp(target, followSpeed);
\telse
\t\tcenterPosition = centerPosition:Lerp(playerCenter, followSpeed);
\tend;
end

-- moves and rotates the middle diamond
local function updateCore(time:number):()
\tlocal pulse:number = math.sin(time * 3) * 0.18;
\tlocal size:Vector3 = coreSize + Vector3.new(pulse, pulse, pulse);

\tcore.Size = size;
\tcore.CFrame = (CFrame.new(centerPosition) * CFrame.Angles(time * 1.4, time * 1.9, time * 1.1));
\tcore.Transparency = (math.clamp(0.1 + math.sin(time * 4) * 0.05, 0.05, 0.18));
end

-- updates one fragment orbiting around the moving and tilted field
local function updateFragment(fragment:Part, index:number, time:number):()
\tlocal offset:number = index / fragmentCount;
\tlocal angle:number = (time * orbitSpeed) + (offset * math.pi * 2);

\tlocal burstPush:number = burst * clickBurstStrength;
\tlocal radius:number = baseOrbitRadius + burstPush + math.sin((time * pullStrength) + index) * 1.2;
\tlocal height:number = math.sin((time * 1.6) + (offset * math.pi * 2)) * verticalRange;
\tlocal localPosition:Vector3 = Vector3.new(math.cos(angle) * radius, height, math.sin(angle) * radius);
\t-- tilts the whole orbit path on all axis
\tlocal tilt:CFrame = CFrame.Angles(math.sin(time * 0.8) * 0.75, time * 0.35, math.cos(time * 0.7) * 0.75);

\tlocal worldPosition:Vector3 = centerPosition + tilt:VectorToWorldSpace(localPosition);

\tfragment.CFrame = CFrame.lookAt(worldPosition, centerPosition)
\t\t* CFrame.Angles(
\t\t\ttime + index,
\t\t\ttime * 0.7,
\t\t\ttime * 1.2
\t\t);

\tfragment.Transparency = math.clamp(0.1 + math.sin(time * 2 + index) * 0.15, 0.05, 0.35);
end

-- creates all fragments once
for index = 1, fragmentCount do
\tfragments[index] = createFragment(index);
end

-- left click creates a quick expansion burst
userInputService.InputBegan:Connect(function(input:InputObject, processed:boolean)
\tif (processed) then return; end;

\tif (input.UserInputType == Enum.UserInputType.MouseButton1) then
\t\tburst = 1;
\tend;
end);

-- main animation loop
runService.RenderStepped:Connect(function(deltaTime:number)
\tlocal time:number = os.clock();

\tburst = math.max(burst - deltaTime * clickBurstDecay, 0);

\tupdateCenter(); updateCore(time);

\tfor index, fragment in ipairs(fragments) do
\t\tupdateFragment(fragment, index, time);
\tend;
end);

-- debug
warn(\`Interactive Gravity Field Generated With {fragmentCount} Fragments\`);`,
  },
  {
    code: "ASSET-005",
    slug: "project-npc-controller",
    title: "NPC Path Controller",
    fileName: "NPCController.luau",
    description: "A strict ModuleScript controller for NPC patrol, chase, stuck recovery, and pathfinding state management.",
    language: "Luau",
    scriptType: "module",
    scriptLabel: "ModuleScript",
    commentTag: "Without comments",
    license: "MIT",
    image: logoImage,
    theme: "theme-blue",
    delay: "0.32s",
    setupTree: setupTrees.npcController,
    setup: `1. Create a ModuleScript in ReplicatedStorage.
2. Name it "NPCController".
3. Paste this module code inside it.
4. Require it from server-side NPC scripts and register NPC models with Controller:Add(model, options).`,
    luau: `--!strict
local PFS:PathfindingService = game:GetService('PathfindingService');
local RS:RunService = game:GetService('RunService');

local Controller = {};
Controller.__index = Controller;

export type NPCState = ('idle' | 'patrol' | 'chase' | 'stuck' | 'dead');

export type NPCEntry = {
\tModel:Model;
\tRoot:BasePart;
\tHumanoid:Humanoid;
\tWaypoints:{Vector3};
\tWaypointIndex:number;
\tState:NPCState;
\tTarget:BasePart?;
\tPath:Path?;
\tPathIndex:number;
\tLastPosition:Vector3;
\tLastMoveTime:number;
\tStuckThreshold:number;
\tChaseRange:number;
\tPatrolRange:number;
\tSpeed:number
};

export type ControllerOptions = {
\tWaypoints:{Vector3}?;
\tChaseRange:number?;
\tPatrolRange:number?;
\tStuckThreshold:number?;
\tSpeed:number?
};

export type NPCController = {
\tAdd:(self:NPCController, x:Model, z:ControllerOptions?)->();
\tRemove:(self:NPCController, x:Model)->();
\tSetTarget:(self:NPCController, x:Model, z:BasePart?)->();
\tSetState:(self:NPCController, x:Model, z:NPCState)->();
\tGetState:(self:NPCController, x:Model)->NPCState?;
\tGetAll:(self:NPCController)->{NPCEntry};
\tDestroy:(self:NPCController)->()
};

type ControllerInternal = NPCController & {
\t_npcs:{[Model]:NPCEntry};
\t_connection:RBXScriptConnection?;
\t_destroyed:boolean;
\t_assertAlive:(self:ControllerInternal)->()
};

local function _x1(x:Model):(BasePart?, Humanoid?)
\tlocal z:BasePart? = x:FindFirstChild('HumanoidRootPart')::BasePart?;
\tlocal y:Humanoid? = x:FindFirstChildOfClass('Humanoid')::Humanoid?;
\treturn z, y;
end;

local function _x2(x:Vector3, z:Vector3):number
\treturn(Vector3.new(x.X, 0, x.Z) - Vector3.new(z.X, 0, z.Z)).Magnitude;
end;

local function _x3(x:NPCEntry):boolean
\treturn(x.Humanoid.Health > 0 and x.Root.Parent ~= nil and x.Model.Parent ~= nil);
end;

local function _x4(x:NPCEntry, z:Vector3):()
\tlocal y:AgentParameters = {
\t\tAgentRadius = 2.5; AgentHeight = 5;
\t\tAgentCanJump = true; AgentCanClimb = true;
\t\tWaypointSpacing = 3;
\t}; local v:Path = PFS:CreatePath(y);

\tlocal c:boolean, b:string = pcall(function():()
\t\tv:ComputeAsync(x.Root.Position, z);
\tend);

\tif (not c) then x.State = 'stuck'; return; end;

\tif (v.Status ~= Enum.PathStatus.Success) then
\t\tx.State = 'stuck'; return;
\tend;

\tx.Path = v; x.PathIndex = 1;
\tx.State = (x.Target ~= nil and 'chase' or 'patrol');
end;

local function _x5(x:NPCEntry):()
\tlocal z:Path? = x.Path;
\tif (z == nil) then return; end;

\tlocal y:{PathWaypoint} = z:GetWaypoints();
\tlocal v:number = x.PathIndex;

\tif (v > #y) then
\t\tx.Path = nil; x.PathIndex = 1;
\t\tx.State = 'idle'; return;
\tend;

\tlocal c:PathWaypoint = y[v];

\tif (c.Action == Enum.PathWaypointAction.Jump) then
\t\tx.Humanoid.Jump = true;
\tend;

\tx.Humanoid:MoveTo(c.Position);
\tx.PathIndex = (v + 1);
end;

local function _x6(x:NPCEntry):()
    local y:{Vector3} = x.Waypoints;
    
    if (#y == 0) then
\t\tx.State = 'idle'; return;
\tend;
    
\tlocal z:number = x.WaypointIndex;
    local v:Vector3 = y[z];
\tlocal c:number = _x2(x.Root.Position, v);

\tif (c < 4) then
\t\tlocal b:number = (z % #y) + 1;
\t\tx.WaypointIndex = b;
\t\tv = y[b];
\tend;

\t_x4(x, v);
end;

local function _x7(x:NPCEntry, z:number):()
\tlocal y:Vector3 = x.Root.Position;
\tlocal v:number = _x2(y, x.LastPosition);

\tif (v < 1.2) then
\t\tlocal c:number = z - x.LastMoveTime;
\t\tif (c >= x.StuckThreshold) then
\t\t\tx.State = 'stuck'; return;
\t\tend;
\telse x.LastPosition = y; x.LastMoveTime = z;
\tend;
end;

local function _x8(x:NPCEntry):()
    local z:BasePart? = x.Target;
    
\tif (z == nil or z.Parent == nil) then
\t\tx.Target = nil; x.State = 'idle';
\t\treturn;
    end; local y:number = _x2(x.Root.Position, z.Position);
    
\tif (y > x.ChaseRange * 1.4) then
\t\tx.Target = nil; x.State = 'idle';
\t\treturn;
\tend;

\t_x4(x, z.Position);
end;

local function _x9(x:NPCEntry):()
\tlocal z:number = x.WaypointIndex;
\tlocal y:{Vector3} = x.Waypoints;
\tif (#y == 0) then return; end;
    local v:number = (z % #y) + 1;
    
\tx.WaypointIndex = v;
\t_x4(x, y[v]);
\tx.State = 'patrol';
end;

local function _x10(x:NPCEntry, z:number):()
\tif (not _x3(x)) then
\t\tx.State = 'dead'; return;
\tend; _x7(x, z);

\tlocal y:NPCState = x.State;
\tif (y == 'dead') then return; end;

\tif (y == 'idle') then
\t\tif (#x.Waypoints > 0) then _x6(x);
\t\tend; return;
\tend;

\tif (y == 'patrol') then
\t\tif (x.Path ~= nil) then _x5(x);
\t\telse _x6(x); end; return;
\tend;

\tif (y == 'chase') then
\t\tif (x.Path ~= nil) then _x5(x);
\t\tend; _x8(x); return;
\tend;

\tif (y == 'stuck') then _x9(x); return; end;
end;

function Controller:_assertAlive():()
\tassert(not self._destroyed, 'NPCController Was Destroyed And Can No Longer Be Used');
end;

function Controller.new():NPCController
\tlocal self:ControllerInternal;

\tself = setmetatable({
\t\t_npcs = {};
\t\t_connection = nil;
\t\t_destroyed = false;
\t}, Controller) :: any;

\tself._connection = RS.Heartbeat:Connect(function():()
\t\tlocal z:number = os.clock();
\t\tlocal y:{[Model]:NPCEntry} = self._npcs;

\t\tfor _, v:NPCEntry in pairs(y) do
\t\t\t_x10(v, z);
\t\tend;
\tend);

\treturn self;
end;

function Controller:Add(x:Model, z:ControllerOptions?):()
\tself:_assertAlive();
\tlocal y:BasePart?, v:Humanoid? = _x1(x);

\tassert(y ~= nil, 'NPCController Add: Model Missing HumanoidRootPart');
\tassert(v ~= nil, 'NPCController Add: Model Missing Humanoid');

\tlocal c:number = 3; local b:number = 24;
\tlocal n:number = 40; local m:number = 4;
\tlocal a:{Vector3} = {}; local q:number = 16;

\tif (z ~= nil) then
\t\tassert(type(z) == 'table', 'NPCController Add: Options Must Be A Table Or Nil');

\t\tif (z.StuckThreshold ~= nil) then
\t\t\tassert(type(z.StuckThreshold) == 'number', 'NPCController Add: StuckThreshold Must Be A Number');
\t\t\tc = z.StuckThreshold;
\t\tend;

\t\tif (z.ChaseRange ~= nil) then
\t\t\tassert(type(z.ChaseRange) == 'number', 'NPCController Add: ChaseRange Must Be A Number');
\t\t\tb = z.ChaseRange;
\t\tend;

\t\tif (z.PatrolRange ~= nil) then
\t\t\tassert(type(z.PatrolRange) == 'number', 'NPCController Add: PatrolRange Must Be A Number');
\t\t\tn = z.PatrolRange;
\t\tend;

\t\tif (z.Speed ~= nil) then
\t\t\tassert(type(z.Speed) == 'number', 'NPCController Add: Speed Must Be A Number');
\t\t\tm = z.Speed;
\t\tend;

\t\tif (z.Waypoints ~= nil) then
\t\t\tassert(type(z.Waypoints) == 'table', 'NPCController Add: Waypoints Must Be A Table');
\t\t\ta = z.Waypoints;
\t\tend;
\tend;

\tv.WalkSpeed = m;

\tlocal k:NPCEntry = {
\t\tModel = x; Root = y::BasePart; Humanoid = v::Humanoid;
\t\tWaypoints = a; WaypointIndex = 1; State = 'idle';
\t\tTarget = nil; Path = nil; PathIndex = 1;
\t\tLastPosition = y.Position::Vector3;
\t\tLastMoveTime = os.clock();
\t\tStuckThreshold = c; ChaseRange = b;
\t\tPatrolRange = n; Speed = m
\t};

\tself._npcs[x] = k;
end;

function Controller:Remove(x:Model):()
\tself:_assertAlive();
\tassert(type(x) == 'userdata', 'NPCController Remove: Expected A Model');

\tlocal z:NPCEntry? = self._npcs[x];
\tif (z == nil) then return; end;

\tif (z.Humanoid and z.Humanoid.Parent ~= nil) then
\t\tz.Humanoid:MoveTo(z.Root.Position);
\tend;

\tself._npcs[x] = nil;
end;

function Controller:SetTarget(x:Model, z:BasePart?):()
\tself:_assertAlive();

\tlocal y:NPCEntry? = self._npcs[x];
\tassert(y ~= nil, 'NPCController SetTarget: Model Not Registered');

\tif (z ~= nil) then
\t\tassert(typeof(z) == 'Instance', 'NPCController SetTarget: Target Must Be A BasePart Or Nil');
\tend;

\ty.Target = z;

\tif (z ~= nil) then y.State = 'chase'; _x4(y, z.Position);
\telse y.State = 'idle'; y.Path = nil; end;
end;

function Controller:SetState(x:Model, z:NPCState):()
\tself:_assertAlive();
    local y:NPCEntry? = self._npcs[x];
    
\tassert(y ~= nil, 'NPCController SetState: Model Not Registered');
\tassert(z == 'idle' or z == 'patrol' or z == 'chase' or z == 'stuck' or z == 'dead', 'NPCController SetState: Invalid State');
\ty.State = z;
end;

function Controller:GetState(x:Model):NPCState?
\tself:_assertAlive();
    local z:NPCEntry? = self._npcs[x];
\tif (z == nil) then return nil; end;

\treturn z.State;
end;

function Controller:GetAll():{NPCEntry}
\tself:_assertAlive();

\tlocal z:{NPCEntry} = {};
\tlocal y:number = 1;

\tfor _, v:NPCEntry in pairs(self._npcs) do
\t\tz[y] = v; y += 1;
\tend;

\treturn z;
end;

function Controller:Destroy():()
\tif (self._destroyed) then return; end;

\tself._destroyed = true;

\tif (self._connection ~= nil) then
\t\tself._connection:Disconnect();
\t\tself._connection = nil;
\tend;

\tself._npcs = {};
end;

return table.freeze(Controller);`,
  },
];

const dotPatternStyle = {
  "--bar-size": "2.5vw",
  "--dot-size": "1.5px",
  "--dot-gap": "14px",
  "--dot-opacity": "0.42",
  "--dot-color": "255, 255, 255",
  "--line-end-mask": "12vh",
  "--line-x-overflow": "8vw",
  "--line-y-overflow-top": "14vh",
  "--cross-left": "17.5%",
  "--cross-top": "17.5%",
  "--cross-span": "65%",
};

const scriptTypeOrder = { server: 0, local: 1, module: 2 } as const;
const sortedOpenSourceAssets = computed(() =>
  [...openSourceAssets].sort((a, b) => {
    const typeDelta = scriptTypeOrder[a.scriptType] - scriptTypeOrder[b.scriptType];
    if (typeDelta !== 0) return typeDelta;
    return a.title.localeCompare(b.title);
  }),
);

const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
const resolveTheme = () => (theme.value === "system" ? (prefersDark.matches ? "dark" : "light") : theme.value);
const applyTheme = () => {
  document.documentElement.setAttribute("data-theme", resolveTheme());
};
const handleSchemeChange = () => {
  if (theme.value === "system") applyTheme();
};

function openSearchModal() {
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
}

function closeSearchModal() {
  searchModalOpen.value = false;
  if (previousOverflow.value !== null) {
    document.documentElement.style.overflow = previousOverflow.value;
    previousOverflow.value = null;
  }
  searchQuery.value = "";
}

const togglePages = () => {
  pagesOpen.value = !pagesOpen.value;
};

const toggleProjects = () => {
  projectsOpen.value = !projectsOpen.value;
};

const selectPage = (slug: string, href: string) => {
  closeSearchModal();
  menuOpen.value = false;
  if (href.startsWith("#")) {
    window.location.hash = href.startsWith("#") ? href : `#${slug}`;
    return;
  }
  router.push(href).catch(() => {});
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

const selectOpenSourceProject = (slug: string) => {
  closeSearchModal();
  menuOpen.value = false;
  window.history.replaceState(null, "", `#${slug}`);
  scrollToProject(slug);
};

const scrollToProject = (slug: string) => {
  window.requestAnimationFrame(() => {
    document.getElementById(slug)?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  });
};

const getAssetMobileView = (slug: string) => assetMobileViews.value[slug] ?? "preview";
const setAssetMobileView = (slug: string, view: "preview" | "code") => {
  assetMobileViews.value = {
    ...assetMobileViews.value,
    [slug]: view,
  };
};
const getAssetTerminalView = (slug: string) => assetTerminalViews.value[slug] ?? "code";
const setAssetTerminalView = (slug: string, view: "code" | "setup") => {
  assetTerminalViews.value = {
    ...assetTerminalViews.value,
    [slug]: view,
  };
};
const getAssetTerminalText = (asset: { slug: string; luau: string; setup: string }) =>
  getAssetTerminalView(asset.slug) === "setup" ? asset.setup : asset.luau;

const setupTreeKey = (slug: string, node: string) => `${slug}:${node}`;
const isSetupTreeOpen = (slug: string, node: string) =>
  setupTreeOpen.value[setupTreeKey(slug, node)] ?? true;
const toggleSetupTree = (slug: string, node: string) => {
  const key = setupTreeKey(slug, node);
  setupTreeOpen.value = {
    ...setupTreeOpen.value,
    [key]: !(setupTreeOpen.value[key] ?? true),
  };
};

const terminalPanelTargetHeight = (el: Element) => {
  const maxHeight = window.matchMedia("(max-width: 760px)").matches
    ? Math.round(window.innerHeight * 0.54)
    : 430;
  return Math.min((el as HTMLElement).scrollHeight, maxHeight);
};

const beforeTerminalEnter = (el: Element) => {
  const node = el as HTMLElement;
  node.style.height = "0px";
  node.style.opacity = "0";
  node.style.transform = "translateY(10px)";
  node.style.overflow = "hidden";
};

const enterTerminalPanel = (el: Element, done: () => void) => {
  const node = el as HTMLElement;
  window.requestAnimationFrame(() => {
    node.style.transition =
      "height 360ms cubic-bezier(0.22, 0.8, 0.36, 1), opacity 220ms ease, transform 300ms cubic-bezier(0.22, 0.8, 0.36, 1)";
    node.style.height = `${terminalPanelTargetHeight(node)}px`;
    node.style.opacity = "1";
    node.style.transform = "translateY(0)";
  });
  window.setTimeout(done, 380);
};

const beforeTerminalLeave = (el: Element) => {
  const node = el as HTMLElement;
  node.style.height = `${node.getBoundingClientRect().height}px`;
  node.style.opacity = "1";
  node.style.transform = "translateY(0)";
  node.style.overflow = "hidden";
};

const leaveTerminalPanel = (el: Element, done: () => void) => {
  const node = el as HTMLElement;
  window.requestAnimationFrame(() => {
    node.style.transition =
      "height 280ms cubic-bezier(0.22, 0.8, 0.36, 1), opacity 180ms ease, transform 240ms cubic-bezier(0.22, 0.8, 0.36, 1)";
    node.style.height = "0px";
    node.style.opacity = "0";
    node.style.transform = "translateY(-8px)";
  });
  window.setTimeout(done, 300);
};

const afterTerminalTransition = (el: Element) => {
  const node = el as HTMLElement;
  node.style.height = "";
  node.style.opacity = "";
  node.style.transform = "";
  node.style.overflow = "";
  node.style.transition = "";
};

const copyAssetCode = async (asset: { code: string; slug: string; luau: string; setup: string }) => {
  try {
    await navigator.clipboard.writeText(getAssetTerminalText(asset));
    copiedCode.value = asset.code;
    window.setTimeout(() => {
      if (copiedCode.value === asset.code) copiedCode.value = null;
    }, 1400);
  } catch {
    copiedCode.value = null;
  }
};

const filteredPages = computed(() => {
  const q = searchQuery.value.trim().toLowerCase();
  if (!q || q === ".all") return pages.filter((page) => !page.searchOnly);
  const compactQ = q.replace(/[^a-z0-9]/g, "");
  const categoryQuery = ["page", "pages", "site", "navigation", "nav"].some(
    (term) => q && (q.includes(term) || term.includes(q)),
  );
  if (categoryQuery) return pages.filter((page) => !page.searchOnly);
  return pages.filter((page) => matchesSearch(q, [page.label, page.slug, page.href, page.keywords]));
});

const filteredOpenSourceProjects = computed(() => {
  const q = searchQuery.value.trim().toLowerCase();
  const assets = sortedOpenSourceAssets.value;
  if (!q || q === ".all") return assets;
  const compactQ = q.replace(/[^a-z0-9]/g, "");
  const categoryQuery = ["project", "projects", "open source", "opensource", "asset", "assets", "code"].some(
    (term) => q && (q.includes(term) || term.includes(q)),
  );
  if (categoryQuery) return assets;
  return assets.filter((asset) => {
    const values = [
      asset.title,
      asset.fileName,
      asset.description,
      asset.language,
      asset.scriptLabel,
      asset.commentTag,
      asset.license,
    ].map((value) => value.toLowerCase());
    return values.some(
      (value) =>
        value.includes(q) ||
        value.replace(/[^a-z0-9]/g, "").includes(compactQ),
    );
  });
});

const filteredProjectAssets = computed(() => {
  const q = projectSearchQuery.value.trim().toLowerCase();
  const compactQ = q.replace(/[^a-z0-9]/g, "");
  return sortedOpenSourceAssets.value.filter((asset) => {
    const matchesFilter =
      activeProjectFilter.value === "all" ||
      asset.scriptType === activeProjectFilter.value;
    if (!matchesFilter) return false;
    if (!q) return true;
    const values = [
      asset.title,
      asset.fileName,
      asset.description,
      asset.language,
      asset.scriptLabel,
      asset.commentTag,
      asset.license,
    ].map((value) => value.toLowerCase());
    return values.some(
      (value) =>
        value.includes(q) ||
        value.replace(/[^a-z0-9]/g, "").includes(compactQ),
    );
  });
});

const pagesShouldOpen = computed(
  () => pagesOpen.value || (searchQuery.value.trim() && filteredPages.value.length > 0),
);

const projectsShouldOpen = computed(
  () => projectsOpen.value || (searchQuery.value.trim() && filteredOpenSourceProjects.value.length > 0),
);

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === "/" && !e.metaKey && !e.ctrlKey && !e.altKey) {
    const active = document.activeElement as HTMLElement | null;
    if (active && ["INPUT", "TEXTAREA"].includes(active.tagName)) return;
    e.preventDefault();
    openSearchModal();
  }
  if (e.key === "Escape" && searchModalOpen.value) {
    e.preventDefault();
    closeSearchModal();
  }
};

onMounted(() => {
  previousOverflowY.value = document.documentElement.style.overflowY || "";
  previousBodyOverflowY.value = document.body.style.overflowY || "";
  previousBodyBackground.value = document.body.style.background || "";
  document.documentElement.style.overflowY = "auto";
  document.body.style.overflowY = "auto";
  document.body.style.background = "#000";
  applyTheme();
  prefersDark.addEventListener("change", handleSchemeChange);
  window.addEventListener("keydown", handleKeydown);
  window.requestAnimationFrame(() => {
    topbarVisible.value = true;
  });
  if (window.location.hash.startsWith("#project-")) {
    window.setTimeout(() => {
      scrollToProject(window.location.hash.slice(1));
    }, 280);
  }
});

watch(theme, (value) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_THEME_KEY, value);
  }
  applyTheme();
});

onBeforeUnmount(() => {
  prefersDark.removeEventListener("change", handleSchemeChange);
  window.removeEventListener("keydown", handleKeydown);
  if (searchModalOpen.value) closeSearchModal();
  if (previousOverflowY.value !== null) {
    document.documentElement.style.overflowY = previousOverflowY.value;
    previousOverflowY.value = null;
  }
  if (previousBodyOverflowY.value !== null) {
    document.body.style.overflowY = previousBodyOverflowY.value;
    previousBodyOverflowY.value = null;
  }
  if (previousBodyBackground.value !== null) {
    document.body.style.background = previousBodyBackground.value;
    previousBodyBackground.value = null;
  }
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Allura&family=Orbitron:wght@400..900&family=Space+Grotesk:wght@300..700&display=swap');

:global(:root){
  --ui-bg: rgba(255,255,255,0.85);
  --ui-border: rgba(0,0,0,0.12);
  --ui-text: #0f172a;
  --card-bg: #f8fafc;
  --overlay-bg: rgba(255,255,255,0.35);
  --kbd-border: rgba(15,23,42,0.2);
  --kbd-bg: rgba(15,23,42,0.05);
  --input-border: rgba(15,23,42,0.14);
}

:global([data-theme="dark"]){
  --ui-bg: rgba(255,255,255,0.05);
  --ui-border: rgba(255,255,255,0.12);
  --ui-text: rgba(255,255,255,0.9);
  --card-bg: #000;
  --overlay-bg: rgba(0,0,0,0.35);
  --kbd-border: rgba(255,255,255,0.2);
  --kbd-bg: rgba(255,255,255,0.05);
  --input-border: rgba(255,255,255,0.14);
}

:global(*), :global(*::before), :global(*::after){
  box-sizing: border-box;
  cursor: none !important;
}

:global(body){
  background: #000;
  overflow-y: auto;
}

:global(html){
  overflow-y: auto;
}

#topbarMain{
  position: fixed;
  top: 18px;
  left: 50%;
  transform: translate(-50%, -140%);
  width: min(94vw, 54rem);
  z-index: 999;
  padding: 0.35rem .75rem;
  display: grid;
  grid-template-columns: auto 1fr auto auto;
  align-items: center;
  gap: 0.75rem;
  border: 1px solid var(--ui-border);
  border-radius: 1rem;
  backdrop-filter: blur(10px) saturate(120%);
  overflow: visible;
  box-shadow: 0 12px 44px rgba(0, 0, 0, 0.38), 0 2px 0 rgba(255, 255, 255, 0.04) inset;
  opacity: 0;
  transition: transform 820ms cubic-bezier(.17, .99, .42, 1.19), opacity 320ms ease;
}

#topbarMain[data-ready="true"] {
  transform: translate(-50%, 0);
  opacity: 1;
}

#topbarMain .topbar-logo{
  width: 42px;
  height: 42px;
  object-fit: contain;
}

.top-search{
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 0.5rem;
  width: min(620px, 100%);
  height: 42px;
  padding: 0.35rem 0.6rem 0.35rem 0.52rem;
  border: 1px solid var(--ui-border);
  border-radius: 12px;
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
  outline: none;
  box-shadow: none;
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

#hamburger.is-open span{
  animation: none;
  opacity: 1;
}

#hamburger.is-open #bar1{
  transform: translateY(6px) rotate(45deg);
}

#hamburger.is-open #bar2{
  opacity: 0;
}

#hamburger.is-open #bar3{
  transform: translateY(-6px) rotate(-45deg);
}

@keyframes barSlideIn{
  0%{ opacity: 0; transform: translateX(8px); }
  100%{ opacity: 1; transform: translateX(0); }
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
  box-shadow: 0 16px 38px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.12);
  backdrop-filter: blur(12px) saturate(130%);
  -webkit-backdrop-filter: blur(12px) saturate(130%);
  display: grid;
  gap: 0.25rem;
  opacity: 0;
  transform: translateY(-8px) scale(0.98);
  pointer-events: none;
  transition: opacity 200ms ease, transform 220ms ease;
  z-index: 1200;
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

#topbarMenu[data-open="true"]{
  opacity: 1;
  transform: translateY(0) scale(1);
  pointer-events: auto;
}

/* The modal is teleported to body, so this page owns its complete visual shell. */
.fade-enter-active,
.fade-leave-active{
  transition: opacity 200ms ease;
}

.fade-enter-from,
.fade-leave-to{
  opacity: 0;
}

.search-modal{
  position: fixed;
  inset: 0;
  z-index: 999998;
  isolation: isolate;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(1.25rem, 4vw, 2.5rem);
  overflow: hidden;
  background: var(--overlay-bg);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.search-card{
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  width: min(620px, 94vw);
  max-height: min(78vh, 720px);
  padding: 1.4rem;
  overflow: auto;
  border: 1px solid var(--ui-border);
  border-radius: 1rem;
  background: var(--card-bg);
  box-shadow: 0 28px 80px rgba(0, 0, 0, 0.48);
  color: var(--ui-text);
  user-select: text;
  overscroll-behavior: contain;
}

.blank-card{
  align-items: stretch;
  justify-content: flex-start;
}

.search-card__input{
  position: sticky;
  top: -1.4rem;
  z-index: 2;
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: center;
  gap: 0.55rem;
  width: 100%;
  padding: 1.4rem 0 0.7rem;
  border-bottom: 1px solid var(--input-border);
  background: var(--card-bg);
}

.search-card__input svg{
  width: 20px;
  height: 20px;
  opacity: 0.9;
}

.search-card__input input{
  min-width: 0;
  border: 0;
  outline: 0;
  background: transparent;
  color: var(--ui-text);
  font-family: "Space Grotesk", system-ui, sans-serif;
  font-size: 1rem;
}

.opensource-page{
  min-height: 100vh;
  color: #f8fafc;
  background: #000;
  font-family: "Space Grotesk", system-ui, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  overflow-y: visible;
}

#mainhero{
  position: relative;
  min-height: 100vh;
  width: 100%;
  overflow: hidden;
  isolation: isolate;
}

.opensource-hero{
  position: absolute;
  inset: 17.5%;
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  pointer-events: none;
}

.opensource-hero h1{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.1rem;
  margin: 0;
  color: #fff;
  font-size: clamp(2.35rem, 6vw, 4.6rem);
  line-height: 0.92;
  text-wrap: balance;
  opacity: 0;
  transform: translateY(18px) scale(0.98);
  filter: blur(8px);
  animation: titleLoad 900ms cubic-bezier(0.19, 1, 0.22, 1) 520ms forwards;
}

.orbitron-title{
  font-family: "Orbitron", system-ui, sans-serif;
  font-weight: 800;
  letter-spacing: 0.2rem;
  text-transform: uppercase;
  background: linear-gradient(90deg, #ffffff 0%, #1248d2 48%, #ffffff 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: 0 0 24px rgba(18, 72, 210, 0.34);
}

.allura-title{
  display: inline-block;
  font-family: "Allura", cursive;
  font-size: clamp(3.3rem, 8vw, 5.9rem);
  font-weight: 400;
  color: #fff;
  text-shadow:
    0 0 18px rgba(255, 255, 255, 0.28),
    0 0 46px rgba(18, 72, 210, 0.28);
}

.opensource-hero p{
  margin: 0.85rem 0 0;
  color: rgba(255, 255, 255, 0.72);
  font-size: clamp(0.95rem, 1.7vw, 1.2rem);
  letter-spacing: 0.03em;
  opacity: 0;
  transform: translateY(12px);
  animation: subtitleLoad 720ms ease 900ms forwards;
}

.opensource-assets-section{
  position: relative;
  width: 100%;
  min-height: 68vh;
  overflow: hidden;
  isolation: isolate;
}

.opensource-assets{
  position: relative;
  z-index: 5;
  width: 65%;
  max-width: 1180px;
  margin: 0 auto;
  padding: clamp(2rem, 4vw, 3.4rem) clamp(1rem, 3.5vw, 3rem) clamp(4rem, 7vw, 7rem);
  display: grid;
  grid-template-columns: 1fr;
  gap: clamp(1.4rem, 2.6vw, 2.2rem);
}

.project-filter-panel{
  width: min(100%, 760px);
  justify-self: center;
  display: grid;
  gap: 0.85rem;
  margin-bottom: clamp(0.25rem, 1.2vw, 0.75rem);
}

.project-search{
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: 0.65rem;
  min-height: 48px;
  padding: 0.6rem 0.8rem;
  border: 1px solid rgba(255, 255, 255, 0.13);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.055);
  color: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(14px);
}

.project-search svg{
  width: 19px;
  height: 19px;
  color: rgba(255, 255, 255, 0.7);
}

.project-search input{
  min-width: 0;
  width: 100%;
  border: 0;
  outline: 0;
  background: transparent;
  color: #fff;
  font: inherit;
  font-size: 0.95rem;
  line-height: 1.2;
}

.project-search input::placeholder{
  color: rgba(255, 255, 255, 0.48);
}

.project-filter-tabs{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.45rem;
}

.project-filter-tab{
  min-height: 34px;
  padding: 0.42rem 0.72rem;
  border: 1px solid rgba(255, 255, 255, 0.13);
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.055);
  color: rgba(255, 255, 255, 0.72);
  font: inherit;
  font-size: 0.84rem;
  line-height: 1.1;
  transition: background-color 160ms ease, border-color 160ms ease, color 160ms ease, transform 160ms ease;
}

.project-filter-tab:hover{
  transform: translateY(-1px);
  border-color: rgba(255, 255, 255, 0.24);
  color: rgba(255, 255, 255, 0.9);
}

.project-filter-tab--all.active{
  border-color: rgba(96, 221, 142, 0.58);
  background: rgba(22, 163, 74, 0.26);
  color: #fff;
}

.project-filter-tab--server.active{
  border-color: rgba(203, 213, 225, 0.55);
  background: rgba(100, 116, 139, 0.28);
  color: #fff;
}

.project-filter-tab--local.active{
  border-color: rgba(118, 168, 255, 0.58);
  background: rgba(18, 72, 210, 0.28);
  color: #fff;
}

.project-filter-tab--module.active{
  border-color: rgba(196, 167, 255, 0.58);
  background: rgba(139, 92, 246, 0.28);
  color: #fff;
}

.asset-sample{
  position: relative;
  scroll-margin-top: 96px;
  --asset-accent: 118, 168, 255;
  --asset-accent-soft: 18, 72, 210;
  --asset-code-color: #d7fbe8;
  min-width: 0;
  display: grid;
  grid-template-columns: minmax(240px, 0.86fr) minmax(320px, 1.14fr);
  align-items: stretch;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.13);
  border-radius: 8px;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.075), rgba(255, 255, 255, 0.025)),
    rgba(0, 0, 0, 0.78);
  box-shadow: 0 22px 56px rgba(0, 0, 0, 0.34);
  backdrop-filter: blur(16px);
  opacity: 0;
  transform: translateY(18px);
  animation: assetRowIn 680ms cubic-bezier(0.19, 1, 0.22, 1) var(--terminal-delay, 0s) forwards;
}

.asset-mobile-tabs{
  display: none;
}

.asset-sample.asset-kind-module{
  --asset-accent: 196, 167, 255;
  --asset-accent-soft: 139, 92, 246;
  --asset-code-color: #eadcff;
  background:
    linear-gradient(180deg, rgba(139, 92, 246, 0.24), rgba(62, 28, 122, 0.1)),
    rgba(0, 0, 0, 0.78);
  border-color: rgba(168, 120, 255, 0.24);
}

.asset-sample.asset-kind-local{
  --asset-accent: 118, 168, 255;
  --asset-accent-soft: 18, 72, 210;
  --asset-code-color: #d7fbe8;
  background:
    linear-gradient(180deg, rgba(59, 130, 246, 0.24), rgba(12, 42, 96, 0.1)),
    rgba(0, 0, 0, 0.78);
  border-color: rgba(96, 165, 250, 0.24);
}

.asset-sample.asset-kind-server{
  --asset-accent: 203, 213, 225;
  --asset-accent-soft: 100, 116, 139;
  --asset-code-color: #e2e8f0;
  background:
    linear-gradient(180deg, rgba(148, 163, 184, 0.2), rgba(51, 65, 85, 0.1)),
    rgba(0, 0, 0, 0.78);
  border-color: rgba(148, 163, 184, 0.24);
}

.asset-sample.asset-kind-both{
  --asset-accent: 164, 172, 255;
  --asset-accent-soft: 96, 118, 228;
  --asset-code-color: #e3e8ff;
  background:
    linear-gradient(135deg, rgba(59, 130, 246, 0.22), rgba(139, 92, 246, 0.2) 48%, rgba(148, 163, 184, 0.12)),
    rgba(0, 0, 0, 0.78);
  border-color: rgba(141, 152, 232, 0.26);
}

.asset-sample:not(:last-child)::after{
  content: "";
  position: absolute;
  left: calc(clamp(1rem, 3.5vw, 3rem) * -1);
  right: calc(clamp(1rem, 3.5vw, 3rem) * -1);
  bottom: calc(clamp(1.4rem, 2.6vw, 2.2rem) * -0.5);
  height: 1px;
  pointer-events: none;
  background-image: radial-gradient(
    circle,
    rgba(var(--dot-color), 0.5) 0 var(--dot-size),
    transparent calc(var(--dot-size) + 0.5px)
  );
  background-size: var(--dot-gap) 1px;
  background-repeat: repeat-x;
  background-position: center;
  -webkit-mask-image: linear-gradient(to right, transparent 0, #000 10%, #000 90%, transparent 100%);
  mask-image: linear-gradient(to right, transparent 0, #000 10%, #000 90%, transparent 100%);
}

.asset-preview{
  min-width: 0;
  display: flex;
  flex-direction: column;
  border-right: 1px solid rgba(255, 255, 255, 0.12);
}

.project-empty{
  margin: 0;
  padding: 2rem 1rem 4rem;
  color: rgba(255, 255, 255, 0.62);
  text-align: center;
  font-size: 0.95rem;
}

.asset-picture{
  position: relative;
  display: grid;
  place-items: center;
  aspect-ratio: 16 / 10;
  min-height: 150px;
  overflow: hidden;
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
}

.asset-picture::before{
  content: "";
  position: absolute;
  inset: 0;
  background:
    linear-gradient(135deg, rgba(255, 255, 255, 0.12), transparent 34%),
    repeating-linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.08) 0 1px,
      transparent 1px 18px
    ),
    repeating-linear-gradient(
      0deg,
      rgba(255, 255, 255, 0.06) 0 1px,
      transparent 1px 18px
    );
  opacity: 0.72;
}

.asset-picture::after{
  content: "";
  position: absolute;
  inset: 16%;
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.26);
}

.asset-picture img{
  position: relative;
  z-index: 1;
  width: min(56%, 150px);
  max-height: 72%;
  object-fit: contain;
  filter: drop-shadow(0 18px 34px rgba(0, 0, 0, 0.56));
}

.asset-sample.asset-kind-module .asset-picture{
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.94), rgba(28, 12, 58, 0.98));
}

.asset-sample.asset-kind-local .asset-picture{
  background: linear-gradient(135deg, rgba(18, 72, 210, 0.92), rgba(1, 8, 24, 0.96));
}

.asset-sample.asset-kind-server .asset-picture{
  background: linear-gradient(135deg, rgba(148, 163, 184, 0.88), rgba(15, 23, 42, 0.98));
}

.asset-sample.asset-kind-both .asset-picture{
  background: linear-gradient(135deg, rgba(18, 72, 210, 0.9), rgba(139, 92, 246, 0.88) 50%, rgba(71, 85, 105, 0.96));
}

.asset-info{
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 0.7rem;
  padding: clamp(1rem, 1.8vw, 1.25rem);
}

.asset-info h2{
  margin: 0;
  color: #fff;
  font-family: "Space Grotesk", system-ui, sans-serif;
  font-size: clamp(1.05rem, 1.5vw, 1.35rem);
  line-height: 1.15;
  letter-spacing: 0;
}

.asset-info p{
  margin: 0;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.94rem;
  line-height: 1.5;
}

.asset-meta{
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: auto;
  padding-top: clamp(1rem, 2vw, 1.5rem);
}

.asset-meta span{
  min-width: 0;
  padding: 0.28rem 0.55rem;
  border-radius: 6px;
  color: rgba(255, 255, 255, 0.78);
  background: rgba(255, 255, 255, 0.08);
  font-size: 0.78rem;
  line-height: 1.2;
}

.asset-terminal{
  min-width: 0;
  display: flex;
  flex-direction: column;
  background:
    radial-gradient(circle at 14% 0%, rgba(var(--asset-accent-soft), 0.24), transparent 34%),
    linear-gradient(180deg, rgba(8, 12, 18, 0.98), rgba(2, 4, 8, 0.98));
  border-left: 1px solid rgba(var(--asset-accent), 0.14);
}

.terminal-topbar{
  min-height: 46px;
  display: grid;
  grid-template-columns: minmax(7rem, 1fr) minmax(8.5rem, auto) auto;
  align-items: center;
  gap: 0.55rem;
  padding: 0.56rem 0.68rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.11);
  background: rgba(255, 255, 255, 0.045);
}

.terminal-file{
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 0.55rem;
}

.terminal-file svg{
  flex: 0 0 auto;
  width: 18px;
  height: 18px;
  color: rgba(var(--asset-accent), 0.9);
}

.terminal-title{
  min-width: 0;
  color: rgba(255, 255, 255, 0.68);
  font-family: "Space Grotesk", system-ui, sans-serif;
  font-size: 0.82rem;
  line-height: 1.2;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.copy-code{
  width: 34px;
  height: 34px;
  display: inline-grid;
  place-items: center;
  padding: 0;
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 6px;
  color: rgba(255, 255, 255, 0.86);
  background: rgba(255, 255, 255, 0.07);
  transition: background-color 160ms ease, border-color 160ms ease, transform 160ms ease;
}

.copy-code svg{
  width: 18px;
  height: 18px;
  transition: transform 180ms ease;
}

.copy-code:hover{
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(var(--asset-accent), 0.38);
  transform: translateY(-1px);
}

.copy-code:hover svg{
  transform: scale(1.06);
}

.terminal-switch{
  display: flex;
  gap: 0.25rem;
  padding: 0.16rem;
  width: 100%;
  border: 1px solid rgba(255, 255, 255, 0.11);
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.045);
}

.terminal-switch button{
  flex: 1;
  min-height: 30px;
  padding: 0.28rem 0.48rem;
  border: 0;
  border-radius: 5px;
  background: transparent;
  color: rgba(255, 255, 255, 0.7);
  font: inherit;
  font-size: 0.76rem;
  line-height: 1.1;
  transition: background-color 160ms ease, border-color 160ms ease, color 160ms ease;
}

.terminal-switch button.active{
  background: rgba(var(--asset-accent-soft), 0.22);
  color: #fff;
}

.terminal-body{
  flex: 1;
  min-height: 250px;
  max-height: 430px;
  overflow: hidden;
  transition:
    min-height 420ms cubic-bezier(0.22, 0.8, 0.36, 1),
    max-height 420ms cubic-bezier(0.22, 0.8, 0.36, 1);
}

.terminal-body--setup{
  min-height: 320px;
}

.asset-terminal pre{
  position: relative;
  min-height: inherit;
  max-height: inherit;
  margin: 0;
  padding: clamp(1rem, 1.7vw, 1.25rem);
  overflow: auto;
  overscroll-behavior: contain;
  color: var(--asset-code-color);
  font-family: "SFMono-Regular", "Cascadia Code", "Roboto Mono", Consolas, monospace;
  font-size: clamp(0.78rem, 1vw, 0.9rem);
  line-height: 1.55;
  white-space: pre;
  -webkit-mask-image: linear-gradient(
    to bottom,
    transparent 0,
    #000 2.6rem,
    #000 calc(100% - 3rem),
    transparent 100%
  );
  mask-image: linear-gradient(
    to bottom,
    transparent 0,
    #000 2.6rem,
    #000 calc(100% - 3rem),
    transparent 100%
  );
}

.asset-terminal code{
  display: block;
  max-width: 100%;
  overflow: visible;
}

.setup-tree{
  min-height: inherit;
  max-height: inherit;
  padding: clamp(1rem, 1.7vw, 1.25rem);
  overflow: auto;
  color: rgba(255, 255, 255, 0.82);
  font-family: "SFMono-Regular", "Cascadia Code", "Roboto Mono", Consolas, monospace;
  font-size: clamp(0.78rem, 1vw, 0.9rem);
  line-height: 1.7;
}

.setup-tree__icon{
  width: 0.68rem;
  height: 0.68rem;
  border-radius: 3px;
  background: rgba(255, 255, 255, 0.26);
  box-shadow: 0 0 12px rgba(255, 255, 255, 0.12);
}

.setup-tree__icon--game{ background: linear-gradient(135deg, #8bd3ff, #d8f3ff); }
.setup-tree__icon--service,
.setup-tree__icon--serverService{ background: rgba(96, 221, 142, 0.95); }
.setup-tree__icon--replicated{ background: rgba(251, 146, 60, 0.95); }
.setup-tree__icon--starterPlayer{ background: rgba(251, 146, 60, 0.95); }
.setup-tree__icon--folder{ background: rgba(245, 158, 11, 0.9); }
.setup-tree__icon--module{ background: rgba(139, 92, 246, 0.95); }
.setup-tree__icon--local{ background: rgba(59, 130, 246, 0.95); }
.setup-tree__icon--server{ background: rgba(148, 163, 184, 0.95); }

.setup-tree__details{
  margin: 0.14rem 0;
}

.setup-tree__summary,
.setup-tree__file{
  display: grid;
  grid-template-columns: 0.78rem auto minmax(0, 1fr);
  align-items: center;
  gap: 0.44rem;
  width: 100%;
  min-height: 1.8rem;
  padding: 0;
  border: 0;
  background: transparent;
  color: rgba(255, 255, 255, 0.76);
  font: inherit;
  text-align: left;
  user-select: none;
  transform-origin: left center;
  animation: treeRowPop 240ms cubic-bezier(0.22, 0.8, 0.36, 1) both;
}

.setup-tree__details--game > .setup-tree__summary{
  color: #9fdcff;
  font-weight: 700;
}

.setup-tree__children{
  position: relative;
  margin-left: 1.07rem;
  padding-left: 1rem;
  overflow: hidden;
  max-height: 0;
  opacity: 0;
  transform: translateY(-4px);
  transition:
    max-height 360ms cubic-bezier(0.22, 0.8, 0.36, 1),
    opacity 220ms ease,
    transform 300ms cubic-bezier(0.22, 0.8, 0.36, 1);
}

.setup-tree__children.open{
  max-height: 16rem;
  opacity: 1;
  transform: translateY(0);
}

.setup-tree__children::before{
  content: "";
  position: absolute;
  top: 0.15rem;
  bottom: 0.35rem;
  left: 0.25rem;
  width: 1px;
  background: linear-gradient(to bottom, rgba(var(--asset-accent), 0.38), rgba(255,255,255,0.05));
}

.setup-tree__chevron{
  width: 0.55rem;
  height: 0.55rem;
  border-right: 1.5px solid rgba(255, 255, 255, 0.5);
  border-bottom: 1.5px solid rgba(255, 255, 255, 0.5);
  transform: rotate(-45deg);
  transition: transform 180ms ease;
}

.setup-tree__details.open > .setup-tree__summary .setup-tree__chevron{
  transform: rotate(45deg);
}

.setup-tree__spacer{
  width: 0.55rem;
}

.setup-tree__label{
  color: inherit;
}

.setup-tree__label--game{ color: #9fdcff; }
.setup-tree__label--service,
.setup-tree__label--serverService{ color: #60dd8e; }
.setup-tree__label--replicated{ color: #fb923c; }
.setup-tree__label--starterPlayer{ color: #fb923c; }
.setup-tree__label--folder{ color: #fbbf24; }
.setup-tree__label--module{ color: #c4a7ff; }
.setup-tree__label--local{ color: #76a8ff; }
.setup-tree__label--server{ color: #cbd5e1; }

.setup-tree__file--pop{
  animation-delay: 80ms;
}

.setup-tree__note{
  margin: 1rem 0 0;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.11);
  color: rgba(255, 255, 255, 0.62);
  white-space: pre-line;
  font-family: "Space Grotesk", system-ui, sans-serif;
  font-size: 0.86rem;
  line-height: 1.5;
}

.terminal-swap-enter-active,
.terminal-swap-leave-active{
  transition: opacity 180ms ease, transform 220ms cubic-bezier(0.22, 0.8, 0.36, 1);
}

.terminal-swap-enter-from{
  opacity: 0;
  transform: translateY(8px);
}

.terminal-swap-leave-to{
  opacity: 0;
  transform: translateY(-8px);
}

@keyframes treeRowPop{
  0%{ opacity: 0; transform: translateY(6px) scale(0.985); }
  100%{ opacity: 1; transform: translateY(0) scale(1); }
}

@keyframes assetRowIn{
  0%{ opacity: 0; transform: translateY(18px); }
  100%{ opacity: 1; transform: translateY(0); }
}

@keyframes titleLoad{
  0%{ opacity: 0; transform: translateY(18px) scale(0.98); filter: blur(8px); }
  100%{ opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
}

@keyframes subtitleLoad{
  0%{ opacity: 0; transform: translateY(12px); }
  100%{ opacity: 1; transform: translateY(0); }
}

#linesY,
.section-linesY{
  position: absolute;
  left: 50%; transform: translateX(-50%);
  width: 65%;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  pointer-events: none;
}

#linesY{
  top: calc(var(--line-y-overflow-top) * -1);
  height: calc(100% + var(--line-y-overflow-top));
}

.section-linesY{
  top: 0;
  height: 100%;
}

#linesY >*:is(div),
.section-linesY >*:is(div){
  position: relative;
  border: 1px solid var(--ui-border);
  width: var(--bar-size);
  height: 100%;
  overflow: hidden;
  opacity: 0;
  background-image: radial-gradient(
    circle,
    rgba(var(--dot-color), var(--dot-opacity)) 0 var(--dot-size),
    transparent calc(var(--dot-size) + 0.5px)
  );
  background-size: var(--dot-gap) var(--dot-gap);
  background-position: center top;
  animation: barDotsIn 900ms ease 220ms forwards;
}

#linesY >*:is(div){
  -webkit-mask-image: linear-gradient(
    to bottom,
    transparent 0,
    transparent var(--line-y-overflow-top),
    #000 calc(var(--line-y-overflow-top) + var(--line-end-mask)),
    #000 100%
  );
  mask-image: linear-gradient(
    to bottom,
    transparent 0,
    transparent var(--line-y-overflow-top),
    #000 calc(var(--line-y-overflow-top) + var(--line-end-mask)),
    #000 100%
  );
}

.section-linesY >*:is(div){
  -webkit-mask-image: linear-gradient(
    to bottom,
    #000 0,
    #000 calc(100% - var(--line-end-mask)),
    transparent 100%
  );
  mask-image: linear-gradient(
    to bottom,
    #000 0,
    #000 calc(100% - var(--line-end-mask)),
    transparent 100%
  );
}

#linesX{
  position: absolute;
  top: 50%;
  left: calc(var(--line-x-overflow) * -1);
  transform: translateY(-50%);
  height: 65%;
  width: calc(100% + (var(--line-x-overflow) * 2));
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
  pointer-events: none;
}

#linesX >*:is(div){
  position: relative;
  border: 1px solid var(--ui-border);
  height: var(--bar-size);
  width: 100%;
  overflow: hidden;
  opacity: 0;
  background-image: radial-gradient(
    circle,
    rgba(var(--dot-color), var(--dot-opacity)) 0 var(--dot-size),
    transparent calc(var(--dot-size) + 0.5px)
  );
  background-size: var(--dot-gap) var(--dot-gap);
  background-position: left center;
  -webkit-mask-image: linear-gradient(
    to right,
    transparent 0,
    transparent var(--line-x-overflow),
    #000 calc(var(--line-x-overflow) + var(--line-end-mask)),
    #000 calc(100% - var(--line-x-overflow) - var(--line-end-mask)),
    transparent calc(100% - var(--line-x-overflow)),
    transparent 100%
  );
  mask-image: linear-gradient(
    to right,
    transparent 0,
    transparent var(--line-x-overflow),
    #000 calc(var(--line-x-overflow) + var(--line-end-mask)),
    #000 calc(100% - var(--line-x-overflow) - var(--line-end-mask)),
    transparent calc(100% - var(--line-x-overflow)),
    transparent 100%
  );
  animation: barDotsIn 900ms ease 320ms forwards;
}

@keyframes barDotsIn{
  0%{ opacity: 0; filter: blur(5px); }
  100%{ opacity: 1; filter: blur(0); }
}

.crossover-dots{
  position: absolute;
  z-index: 4;
  width: calc(var(--dot-gap) * 3);
  height: calc(var(--dot-gap) * 3);
  pointer-events: none;
  isolation: isolate;
}

.crossover-dots::before{
  content: "";
  position: absolute;
  inset: calc(var(--dot-gap) * -1);
  z-index: -1;
  background: radial-gradient(
    circle,
    #000 0 48%,
    rgba(0, 0, 0, 0.9) 62%,
    rgba(0, 0, 0, 0.42) 78%,
    transparent 100%
  );
}

.crossover-dots::after{
  content: "";
  position: absolute;
  inset: 0;
  background-image:
    radial-gradient(
      circle,
      rgba(var(--dot-color), var(--dot-opacity)) 0 var(--dot-size),
      transparent calc(var(--dot-size) + 0.5px)
    );
  background-size: var(--dot-gap) var(--dot-gap);
  background-position: center;
  background-repeat: repeat;
}

.crossover-dots.top-left{
  left: calc(var(--cross-left) + (var(--bar-size) / 2) - (var(--dot-gap) * 1.5));
  top: calc(var(--cross-top) + (var(--bar-size) / 2) - (var(--dot-gap) * 1.5));
}

.crossover-dots.top-right{
  left: calc(var(--cross-left) + var(--cross-span) - (var(--bar-size) / 2) - (var(--dot-gap) * 1.5));
  top: calc(var(--cross-top) + (var(--bar-size) / 2) - (var(--dot-gap) * 1.5));
}

.crossover-dots.bottom-left{
  left: calc(var(--cross-left) + (var(--bar-size) / 2) - (var(--dot-gap) * 1.5));
  top: calc(var(--cross-top) + var(--cross-span) - (var(--bar-size) / 2) - (var(--dot-gap) * 1.5));
}

.crossover-dots.bottom-right{
  left: calc(var(--cross-left) + var(--cross-span) - (var(--bar-size) / 2) - (var(--dot-gap) * 1.5));
  top: calc(var(--cross-top) + var(--cross-span) - (var(--bar-size) / 2) - (var(--dot-gap) * 1.5));
}

#SAthing,
#Pages,
#Projects{
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
}

#SAthing{
  gap: 0.75rem;
}

.picker-head{
  position: relative;
  width: 100%;
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.35rem 0;
  background: none;
  border: none;
  color: inherit;
  font: inherit;
  text-align: left;
}

.collapse-icon{
  height: 16px;
  width: 16px;
  aspect-ratio: 1/1;
  display: inline-block;
  transform-origin: center center;
  transition: transform 260ms cubic-bezier(0.22, 0.8, 0.36, 1);
}

.picker-head[data-open="true"] .collapse-icon{
  transform: rotate(90deg);
}

.header-flag,
.flag{
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.lang-title{
  font-family: "Space Grotesk", system-ui, sans-serif;
  font-size: 0.95rem;
  letter-spacing: 0.02em;
  color: var(--ui-text);
}

.theme-emoji{
  line-height: 1;
}

.page-list{
  list-style: none;
  padding: 0 0 0 1rem;
  margin: 0.25rem 0 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
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
  transition: color 120ms ease, opacity 120ms ease;
}

.page-option:hover{
  border-bottom-color: rgba(255, 255, 255, 0.16);
}

.page-inner{
  width: 100%;
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  transform: translateX(0);
  transition: transform 200ms cubic-bezier(0.22, 0.8, 0.36, 1);
}

.page-option:hover .page-inner{
  transform: translateX(4px);
}

.page-icon{
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  color: var(--ui-text);
}

.page-icon svg{
  width: 20px;
  height: 20px;
}

.page-name{
  flex: 1;
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

@media (max-width: 760px) {
  #topbarMain{
    width: min(94vw, 38rem);
    grid-template-columns: auto 1fr auto;
    gap: 0.45rem;
    padding-inline: 0.55rem;
  }

  #mainhero{
    --bar-size: 4.5vw;
    --line-end-mask: 10vh;
    --line-x-overflow: 12vw;
    --line-y-overflow-top: 12vh;
  }

  #linesY,
  .section-linesY{
    display: none;
  }

  #linesX,
  .crossover-dots{
    display: none;
  }

  .opensource-hero{
    inset: 16% 8%;
  }

  .opensource-hero h1{
    font-size: clamp(2rem, 12vw, 3.4rem);
  }

  .allura-title{
    font-size: clamp(3rem, 16vw, 4.8rem);
  }

  .opensource-assets{
    width: min(92vw, 560px);
    grid-template-columns: 1fr;
    padding: 1.4rem 0 3.5rem;
    gap: 1.35rem;
  }

  .project-filter-panel{
    width: 100%;
    gap: 0.7rem;
  }

  .project-search{
    min-height: 44px;
    padding: 0.55rem 0.72rem;
  }

  .project-filter-tabs{
    justify-content: flex-start;
    flex-wrap: nowrap;
    overflow-x: auto;
    padding-bottom: 0.2rem;
    -webkit-overflow-scrolling: touch;
  }

  .project-filter-tab{
    flex: 0 0 auto;
    min-height: 32px;
    padding-inline: 0.62rem;
    font-size: 0.78rem;
  }

  .asset-sample{
    grid-template-columns: 1fr;
    border-radius: 8px;
    overflow: hidden;
  }

  .asset-mobile-tabs{
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.35rem;
    padding: 0.55rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.11);
    background: rgba(255, 255, 255, 0.045);
  }

  .asset-mobile-tabs button{
    min-width: 0;
    min-height: 34px;
    border: 1px solid rgba(255, 255, 255, 0.13);
    border-radius: 7px;
    background: rgba(255, 255, 255, 0.055);
    color: rgba(255, 255, 255, 0.72);
    font: inherit;
    font-size: 0.82rem;
    line-height: 1.1;
  }

  .asset-mobile-tabs button.active{
    border-color: rgba(var(--asset-accent), 0.48);
    background: rgba(var(--asset-accent-soft), 0.24);
    color: #fff;
  }

  .asset-preview{
    border-right: 0;
    border-bottom: 0;
    max-height: 540px;
    overflow: hidden;
    opacity: 1;
    transform: translateY(0);
    transition:
      max-height 360ms cubic-bezier(0.22, 0.8, 0.36, 1),
      opacity 220ms ease,
      transform 300ms cubic-bezier(0.22, 0.8, 0.36, 1);
  }

  .asset-picture{
    min-height: 132px;
    aspect-ratio: 16 / 9;
  }

  .asset-picture img{
    width: min(48%, 118px);
  }

  .asset-info{
    padding: 0.95rem;
  }

  .asset-info h2{
    font-size: 1.08rem;
  }

  .asset-info p{
    font-size: 0.88rem;
    line-height: 1.45;
  }

  .asset-meta{
    gap: 0.38rem;
    padding-top: 0.85rem;
  }

  .asset-meta span{
    font-size: 0.72rem;
    padding: 0.24rem 0.45rem;
  }

  .asset-sample.mobile-view-preview .asset-terminal{
    max-height: 0;
    opacity: 0;
    transform: translateY(8px);
    pointer-events: none;
  }

  .asset-sample.mobile-view-code .asset-preview{
    max-height: 0;
    opacity: 0;
    transform: translateY(-8px);
    pointer-events: none;
  }

  .asset-terminal{
    border-left: 0;
    max-height: 72vh;
    overflow: hidden;
    opacity: 1;
    transform: translateY(0);
    transition:
      max-height 420ms cubic-bezier(0.22, 0.8, 0.36, 1),
      opacity 220ms ease,
      transform 320ms cubic-bezier(0.22, 0.8, 0.36, 1);
  }

  .terminal-topbar{
    grid-template-columns: minmax(0, 1fr) minmax(6.8rem, auto) auto;
    gap: 0.38rem;
    padding: 0.48rem;
  }
  
  .terminal-switch{
    width: 100%;
    gap: 0.18rem;
  }

  .terminal-switch button{
    flex: 1;
    min-height: 30px;
    padding-inline: 0.34rem;
    font-size: 0.72rem;
  }

  .asset-terminal pre{
    font-size: 0.74rem;
    line-height: 1.48;
  }

  .terminal-body{
    min-height: 54vh;
    max-height: 54vh;
  }

  .terminal-body--setup{
    min-height: 46vh;
  }

  .setup-tree{
    font-size: 0.76rem;
  }

  .orbitron-title{
    letter-spacing: 0.14rem;
  }
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
