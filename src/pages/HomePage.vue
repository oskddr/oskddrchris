<template>
  <div id="topbarMain" :data-ready="topbarVisible">
    <img class="topbar-logo" src="@/assets/img/logo/Logo.png" :alt="t('heroTitle')">
    <label class="top-search" aria-label="Search" @click.stop="openSearchModal">
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
    <button id="hamburger" aria-label="Menu" @click="menuOpen = !menuOpen">
      <span id="bar1"></span>
      <span id="bar2"></span>
      <span id="bar3"></span>
    </button>
    <div id="topbarMenu" :data-open="menuOpen">
      <a href="#" role="menuitem">{{ t("topAbout") }}</a>
      <RouterLink to="/opensource" role="menuitem" @click="menuOpen = false">{{ t("topAssets") }}</RouterLink>
      <RouterLink to="/Team" role="menuitem" @click="menuOpen = false">
        {{ t("topDevelopers") }}
      </RouterLink>
      <RouterLink to="/links" role="menuitem" @click="menuOpen = false">{{ t("pageLinks") }}</RouterLink>
      <RouterLink to="/testimonials" role="menuitem" @click="menuOpen = false">Testimonials</RouterLink>
      <a href="#" role="menuitem">{{ t("topTOS") }}</a>
    </div>
  </div>

  <div id="A1">
    <div id="BGMSingularity_">
      <div id="singularityWrap">
        <canvas ref="canvasRef" id="singularityCanvas"></canvas>
      </div>
    </div>

    <div id="Bshader"></div>

    <div id="main" :data-ready="siteReady">
      <img class="hero-logo" src="@/assets/img/logo/Logo.png" alt="">
      <h1>{{ t("heroTitle") }}</h1>
      <h2>{{ t("heroSubtitle") }}</h2>
    </div>
  </div>

  <div id="A2">
    <section class="a2-wrap">
      <div class="a2-header">
        <p class="eyebrow">{{ t("builtTo") }}</p>
        <h3>
          {{ t("shipWith") }}
          <FlipWords
            :words="flipWords"
            :duration="3000"
            class="a2-flip"
          />
        </h3>
        <p class="lede">
          {{ t("heroSubtitle") }}
        </p>
      </div>

      <div class="feature-list">
        <div class="feature-list-item">
          <span class="dot" aria-hidden="true"></span>
          <div class="feature-text">
            <h4>{{ t("feature1Title") }}</h4>
            <p>{{ t("feature1Desc") }}</p>
          </div>
        </div>
        <div class="feature-divider"></div>
        <div class="feature-list-item">
          <span class="dot" aria-hidden="true"></span>
          <div class="feature-text">
            <h4>{{ t("feature2Title") }}</h4>
            <p>{{ t("feature2Desc") }}</p>
          </div>
        </div>
        <div class="feature-divider"></div>
        <div class="feature-list-item">
          <span class="dot" aria-hidden="true"></span>
          <div class="feature-text">
            <h4>{{ t("feature3Title") }}</h4>
            <p>{{ t("feature3Desc") }}</p>
          </div>
        </div>
        <div class="feature-divider"></div>
        <div class="feature-list-item">
          <span class="dot" aria-hidden="true"></span>
          <div class="feature-text">
            <h4>{{ t("feature4Title") }}</h4>
            <p>{{ t("feature4Desc") }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>

  <div id="A3">
    <section class="a2-wrap">
      <div class="a2-header">
        <p class="eyebrow">Here are some</p>
        <h3>
          Daily featured works
        </h3>
        <p class="lede">
          {{ t("heroSubtitle") }}
        </p>
      </div>

      <div class="a3-asset-grid" v-if="assetsRevealed">
        <article
          v-for="asset in featuredAssets"
          :key="asset.name"
          class="a3-asset-card"
          data-cursor-hover
          @click="openAssetModal(asset)"
        >
          <h4>{{ asset.name }}</h4>
          <p>{{ asset.desc }}</p>
        </article>
      </div>
    </section>
  </div>

  <teleport to="body">
    <transition name="fade">
      <div
        v-if="assetModalOpen"
        class="asset-modal-backdrop"
        @click.self="closeAssetModal"
      >
        <div class="asset-modal" role="dialog" aria-modal="true">
          <button class="asset-modal__close" type="button" @click="closeAssetModal" aria-label="Close">
            ✕
          </button>
          <h4 class="asset-modal__title">{{ selectedAsset?.name }}</h4>
          <p class="asset-modal__desc">{{ selectedAsset?.desc }}</p>
          <RouterLink
            v-if="selectedAsset?.href"
            :to="selectedAsset.href"
            class="asset-modal__link"
            data-cursor-hover
            @click="closeAssetModal"
          >
            View product
          </RouterLink>
        </div>
      </div>
    </transition>
  </teleport>

  <div id="A6">
    <section class="testimonials-wrap">
      <div class="section-head" data-reveal="fade-up">
        <p class="eyebrow">{{ t("testimonialsEyebrow") }}</p>
        <h3>{{ t("testimonialsTitle") }}</h3>
        <p class="lede">{{ t("testimonialsDescription") }}</p>
      </div>
      <div class="logo-row" data-reveal-stagger="0.05">
        <span class="logo-pill" v-for="logo in studioLogos" :key="logo" data-reveal="fade">
          <GlowBorder
            class="logo-pill__glow"
            :border-radius="999"
            :border-width="1"
            :duration="8"
            :color="[
              'rgba(18,72,210,0)',
              'rgba(18,72,210,0.9)',
              'rgba(255,255,255,0.55)',
              'rgba(18,72,210,0)'
            ]"
          />
          <span class="logo-pill__label">{{ t(logo) }}</span>
        </span>
      </div>
      <div class="testimonial-grid" data-reveal="fade-up">
        <figure
          class="testimonial-card"
          v-for="(quote, idx) in testimonials.slice(0, 3)"
          :key="`grid-${idx}`"
        >
          <div class="testimonial-stars" aria-label="5 out of 5 stars">★★★★★</div>
          <blockquote>{{ t(quote.quoteKey) }}</blockquote>
          <figcaption>
            <span
              class="testimonial-avatar"
              :data-img="quote.nameKey === 'testimonial1Name'"
              aria-hidden="true"
            >
              <img
                v-if="quote.nameKey === 'testimonial1Name'"
                src="https://cdn.discordapp.com/avatars/1234583019592089701/fe63c07e2f36f957a52fa3a0c082a423.webp?size=128"
                alt=""
              />
              <span v-else>{{ t(quote.nameKey).slice(0,1) }}</span>
            </span>
            <span class="testimonial-meta">
              <span class="name">{{ t(quote.nameKey) }}</span>
              <span class="role">{{ t(quote.roleKey) }}</span>
            </span>
          </figcaption>
        </figure>
      </div>
      <div class="testimonial-cta" data-reveal="fade-up">
        <!-- CTA removed per request -->
      </div>

    </section>
  </div>

  <footer id="FooterMain" data-reveal="fade-up">
    <div class="footer-wrap">
      <div class="footer-top" data-reveal-stagger="0.08">
        <div class="footer-brand" data-reveal="fade-up">
          <span class="footer-title">{{ t("footerBrand") }}</span>
          <span class="footer-meta">{{ t("footerTagline") }}</span>
        </div>
        <div class="footer-nav" data-reveal="fade-up">
          <span class="footer-label">{{ t("footerPagesLabel") }}</span>
          <div class="footer-links">
            <a href="/" data-cursor-hover @click.prevent="selectPage('home', '/')">{{ t("pageHome") }}</a>
            <a href="/opensource" data-cursor-hover @click.prevent="selectPage('assets', '/opensource')">Open Source</a>
            <a href="/Team" data-cursor-hover @click.prevent="selectPage('developers', '/Team')">{{ t("pageDevelopers") }}</a>
            <a href="/links" data-cursor-hover @click.prevent="selectPage('links', '/links')">{{ t("pageLinks") }}</a>
            <a href="#tos" data-cursor-hover @click.prevent="selectPage('tos', '#tos')">{{ t("pageTOS") }}</a>
          </div>
        </div>
        <div class="footer-contact" data-reveal="fade-up">
          <span class="footer-label">{{ t("footerContactsLabel") }}</span>
          <div class="footer-links">
            <a :href="t('footerDiscordLink')" data-cursor-hover target="_blank" rel="noopener">{{ t("footerDiscordLabel") }}</a>
            <a :href="t('footerXLink')" data-cursor-hover target="_blank" rel="noopener">{{ t("footerXLabel") }}</a>
            <a href="mailto:contact@zantix.studio" data-cursor-hover>{{ t("footerEmailLabel") }}</a>
          </div>
        </div>
        <div class="footer-info" data-reveal="fade-up">
          <span class="footer-label">{{ t("footerInfoLabel") }}</span>
          <ul class="footer-info-list">
            <li>{{ t("footerInfo1") }}</li>
            <li>{{ t("footerInfo2") }}</li>
            <li>{{ t("footerInfo3") }}</li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom" data-reveal="fade">
        <span>{{ t("footerCopyright") }}</span>
        <span class="footer-divider">•</span>
        <span>{{ t("footerRights") }}</span>
      </div>
    </div>
  </footer>

  <div
    id="bottomArrow"
    v-if="!hasReachedBottom"
    :data-ready="siteReady"
    :data-hide="hasReachedBottom"
    :data-blur="searchModalOpen"
    aria-hidden="true"
  >
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.9 1.5 L17 12 L8.9 22.5" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  </div>

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
              :aria-label="t('searchPlaceholder')"
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
                <span class="lang-title">{{ t("pagesLabel") }}</span>
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
                  <li v-for="(project, idx) in filteredOpenSourceProjects" :key="project.slug" :style="{ '--d': `${idx * 0.03}s` }">
                    <button type="button" class="page-option" role="option" @click="selectOpenSourceProject(project.slug)">
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
        </div>
      </div>
    </transition>
  </teleport>

  <SmoothCursor />
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400..900&family=Space+Grotesk:wght@300..700&display=swap');

:root{
  --ui-bg: rgba(255,255,255,0.85);
  --ui-border: rgba(0,0,0,0.12);
  --ui-text: #0f172a;
  --card-bg: #f8fafc;
  --overlay-bg: rgba(255,255,255,0.35);
  --kbd-border: rgba(15,23,42,0.2);
  --kbd-bg: rgba(15,23,42,0.05);
  --input-border: rgba(15,23,42,0.14);
}

[data-theme="dark"]{
  --ui-bg: rgba(255,255,255,0.05);
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
}

html{
  scrollbar-width: none;
}

body::-webkit-scrollbar,
html::-webkit-scrollbar{
  width: 0;
  height: 0;
}

body{
  -ms-overflow-style: none;
  scrollbar-width: none;
}

button, a, input, textarea, select, option, label {
  cursor: none !important;
}

h1,h2,h3,h4,h5,h6{
  margin: 0!important; padding: 0!important;
}

#Bshader{
  position: absolute;
  inset: 0;
  background: black;
  opacity: 0.25;
  pointer-events: none;
}

*:not(#BGMSingularity_){
  z-index: 2;
}

#A1{
  position: relative;
  width: 100%;
  min-height: 100vh;
  height: 100vh;
  overflow: hidden;
  z-index: 1;
}

#BGMSingularity_ {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  background: #000;
  z-index: 0;
}

#singularityWrap {
  position: relative;
  width: 100%;
  height: 100%;
}

#singularityCanvas {
  width: 100%;
  height: 100%;
  display: block;
}

#A1::before{
  content: "";
  position: absolute;
  inset: -4%;
  background: radial-gradient(120% 120% at 0% 100%, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 62%);
  pointer-events: none;
  z-index: 1;
}

#A1::after{
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: -1px;
  height: 22vh;
  background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7) 38%, #000 100%);
  pointer-events: none;
  z-index: 5;
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
  box-shadow:
      0 12px 44px rgba(0, 0, 0, 0.38),
      0 2px 0 rgba(255, 255, 255, 0.04) inset;

  opacity: 0;
  transition:
      transform 820ms cubic-bezier(.17, .99, .42, 1.19),
      opacity 320ms ease;
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
  box-shadow:
      0 16px 38px rgba(0,0,0,0.12),
      inset 0 1px 0 rgba(255,255,255,0.12);
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

#topbarMain .topbar-logo{
  width: 42px;
  height: 42px;
  object-fit: contain;
}

.theme-toggle{
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  border-radius: 10px;
  border: 1px solid var(--ui-border);
  background: transparent;
  color: var(--ui-text);
  transition: background-color 180ms ease, border-color 180ms ease, transform 160ms ease;
}

.theme-toggle:hover{
  background: var(--ui-bg);
  transform: translateY(-1px);
}

.topbar-spacer{
  width: 100%;
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

#main{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) translateY(16px);
  opacity: 0;
  height: auto;
  width: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  transition: opacity 620ms ease, transform 660ms ease;
}

#main[data-ready="true"]{
  opacity: 1;
  transform: translate(-50%, -50%) translateY(0);
}

#main img{
  width: 150px;
  height: auto;
  opacity: 0;
  transform: translateY(12px);
  animation: fadeUp 640ms ease forwards;
  animation-delay: 120ms;
}

#main .hero-logo{
  filter: invert(1);
}

#main h1{
  color: white;
  font-family: Orbitron, Space Grotesk, -apple-system, sans-serif;
  font-weight: 800;
  font-size: 45px;
  opacity: 0;
  transform: translateY(14px);
  animation: fadeUp 640ms ease forwards;
  animation-delay: 240ms;
}

#main h2{
  color: white;
  font-family: Orbitron, Space Grotesk, -apple-system, sans-serif;
  font-weight: 600;
  text-align: center;
  font-size: 20px;
  opacity: 0;
  transform: translateY(16px);
  animation: fadeUp 640ms ease forwards;
  animation-delay: 360ms;
}

#main #bsect{
  position: relative;
  margin-top: 7px;
  width: auto;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
}

#main #bsect button{
  color: white;
  height: auto;
  width: 140px;
  padding: 0.35rem .2rem;
  font-size: 1rem;
  font-weight: 500;
  font-family: Orbitron, Space Grotesk, -apple-system, sans-serif;
  background: rgba(255, 255, 255, 0);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(2.6px);
  -webkit-backdrop-filter: blur(2.6px);
  border: 1px solid rgba(255, 255, 255, 0.32);
  opacity: 0;
  animation: fadeUp 620ms ease forwards;
}

#main #bsect[data-ready="true"] button:nth-child(1){
  animation-delay: 480ms;
}
#main #bsect[data-ready="true"] button:nth-child(2){
  animation-delay: 560ms;
}

#bottomArrow{
  position: fixed;
  left: 50%;
  bottom: 5px;
  transform: translateX(-50%) translateY(10px);
  color: white;
  z-index: 900;
  pointer-events: none;
  animation: arrowBob 1.6s ease-in-out infinite;
  opacity: 0;
  transition: opacity 580ms ease, transform 620ms ease;
}

#bottomArrow[data-ready="true"]{
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}

#bottomArrow svg{
  display: block;
  transform: rotate(90deg);
}

@keyframes arrowBob{
  0%, 100% { transform: translateX(-50%) translateY(0); }
  50% { transform: translateX(-50%) translateY(-8px); }
}

#bottomArrow[data-ready="true"]{
  pointer-events: auto;
}
#bottomArrow[data-hide="true"]{
  opacity: 0;
  transform: translateX(-50%) translateY(18px);
}

#bottomArrow[data-blur="true"]{
  filter: drop-shadow(0 0 10px rgba(255,255,255,0.4)) blur(0.6px);
  backdrop-filter: blur(2px);
}

#A2,
#A3{
  position: relative;
  width: 100%;
  height: 100%;
  padding: clamp(4rem, 10vw, 7rem) clamp(1.25rem, 6vw, 4rem);
  background: black;
  color: white;
  overflow: hidden;
  z-index: auto;
}

#A4,
#A6{
  position: relative;
  width: 100%;
  color: white;
  padding: clamp(3rem, 8vw, 5.5rem) clamp(1.25rem, 6vw, 4rem);
}

#A4{
  background: #000;
  border-top: 1px solid rgba(255,255,255,0.06);
}

#A6{
  background: #000;
  padding-bottom: clamp(4rem, 10vw, 6rem);
}

.collection-wrap{
  max-width: 1120px;
  margin: 0 auto;
  display: grid;
  gap: clamp(1rem, 2.4vw, 1.6rem);
}

.testimonials-wrap{
  max-width: 1120px;
  margin: 0 auto;
  display: grid;
  gap: clamp(1rem, 2.4vw, 1.6rem);
}

.section-head h3{
  font-size: clamp(1.8rem, 3.6vw, 2.6rem);
  font-weight: 800;
  letter-spacing: 0.04em;
  font-family: Orbitron, "Space Grotesk", system-ui, sans-serif;
  text-wrap: balance;
}

.section-head{
  display: grid;
  gap: 0.55rem;
}

.section-head .eyebrow{
  text-transform: uppercase;
  letter-spacing: 0.26em;
  font-size: 0.78rem;
  color: rgba(255,255,255,0.62);
  font-family: Orbitron, "Space Grotesk", system-ui, sans-serif;
}

.section-head .lede{
  max-width: 720px;
  font-size: 1.05rem;
  line-height: 1.6;
  color: rgba(255,255,255,0.75);
}

.section-actions{
  display: flex;
  gap: 0.75rem;
  margin-top: 0.35rem;
}

.ghost-link{
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.85rem;
  border-radius: 999px;
  border: 1px solid rgba(255,255,255,0.16);
  color: #e6edff;
  text-decoration: none;
  background: rgba(255,255,255,0.04);
  font-size: 0.9rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  transition: border-color 160ms ease, background 160ms ease, transform 160ms ease, box-shadow 180ms ease;
}

.ghost-link:hover{
  transform: translateY(-1px);
  border-color: rgba(255,255,255,0.3);
  background: rgba(255,255,255,0.08);
  box-shadow: 0 10px 22px rgba(0,0,0,0.3);
}

.testimonial-cta{
  margin-top: 0.8rem;
}

.ghost-link--primary{
  border-color: rgba(74,149,255,0.36);
  background: linear-gradient(120deg, rgba(74,149,255,0.18), rgba(12,18,32,0.9));
  color: #d9e6ff;
  box-shadow: 0 10px 28px rgba(0,0,0,0.32), inset 0 0 0 1px rgba(74,149,255,0.32);
}

.ghost-link--primary:hover{
  border-color: rgba(122,179,255,0.55);
  background: linear-gradient(120deg, rgba(122,179,255,0.26), rgba(14,22,36,0.95));
  box-shadow: 0 14px 32px rgba(0,0,0,0.36), inset 0 0 0 1px rgba(122,179,255,0.42);
}

.collection-grid{
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
}

.collection-card{
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 18px;
  padding: 1.15rem 1.1rem;
  background: linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02));
  box-shadow: 0 20px 45px rgba(0,0,0,0.35);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1.1rem;
}

.collection-card h4{
  font-size: 1.05rem;
  font-family: Orbitron, "Space Grotesk", system-ui, sans-serif;
  letter-spacing: 0.04em;
  text-wrap: balance;
}

.collection-card p{
  color: rgba(255,255,255,0.75);
  line-height: 1.5;
  font-size: 0.95rem;
}

.collection-cta{
  align-self: flex-start;
  border: 1px solid rgba(255,255,255,0.2);
  background: rgba(255,255,255,0.08);
  color: #fff;
  padding: 0.5rem 0.85rem;
  border-radius: 10px;
  font-family: "Space Grotesk", system-ui, sans-serif;
  transition: transform 160ms ease, border-color 160ms ease, background 160ms ease;
}

.collection-cta:hover{
  transform: translateY(-1px);
  border-color: rgba(255,255,255,0.5);
  background: rgba(255,255,255,0.14);
}

.logo-row{
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-top: 0.1rem;
  margin-bottom: 0.5rem;
}

.logo-pill{
  position: relative;
  display: inline-flex;
  align-items: center;
  padding: 0.45rem 0.9rem;
  border-radius: 999px;
  border: 1px solid transparent;
  background: rgba(255,255,255,0.04);
  font-size: 0.78rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.85);
  text-decoration: none;
  overflow: hidden;
  isolation: isolate;
  box-shadow: inset 0 0 0 1px rgba(18,72,210,0.16);
  transition: background 200ms ease, box-shadow 220ms ease, transform 200ms ease, filter 220ms ease;
}

.logo-pill::before{
  content: "";
  position: absolute;
  inset: -35%;
  background: radial-gradient(circle at 30% 40%, rgba(26,84,196,0.22), rgba(4,8,16,0.82));
  opacity: 0;
  transition: opacity 200ms ease;
  z-index: 0;
}

.logo-pill:hover{
  background: rgba(14,26,48,0.65);
  box-shadow: inset 0 0 0 1px rgba(46,118,214,0.3), 0 10px 22px -12px rgba(24,82,180,0.52);
  filter: saturate(0.9);
}

.logo-pill:hover::before{
  opacity: 1;
}

.logo-pill__label{
  position: relative;
  z-index: 1;
}

.logo-pill__glow{
  opacity: 0.72;
}

.testimonial-grid{
  display: grid;
  gap: 0.75rem;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  margin-top: 1.1rem;
  align-items: stretch;
}

.testimonial-card{
  position: relative;
  border-radius: 14px;
  padding: 1rem 1.05rem;
  background: linear-gradient(180deg, rgba(4,4,6,0.95), rgba(6,6,8,0.88));
  box-shadow: 0 14px 38px rgba(0,0,0,0.4), inset 0 0 0 1px rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.12);
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  min-height: 165px;
  max-width: 410px;
  width: 100%;
  margin: 0 auto;
  transition: transform 200ms ease, box-shadow 220ms ease, border-color 220ms ease;
}

.testimonial-card:hover{
  transform: translateY(-4px);
  border-color: rgba(255,255,255,0.18);
  box-shadow: 0 18px 44px rgba(0,0,0,0.46), inset 0 0 0 1px rgba(255,255,255,0.12);
}

.testimonial-stars{
  color: #f4c84a;
  letter-spacing: 0.08em;
  font-size: 0.9rem;
  text-shadow: 0 2px 6px rgba(0,0,0,0.4);
}

.testimonial-card blockquote{
  font-size: 0.94rem;
  line-height: 1.45;
  color: rgba(245,247,255,0.88);
  text-wrap: balance;
  max-width: 44ch;
  margin: 0;
}

.testimonial-card figcaption{
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: auto;
}

.testimonial-avatar{
  width: 34px;
  height: 34px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.16), rgba(50,50,60,0.8));
  color: #0b1224;
  font-weight: 800;
  letter-spacing: 0.02em;
}

.testimonial-avatar[data-img="true"]{
  padding: 0;
  background: none;
  overflow: hidden;
}

.testimonial-avatar img{
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  display: block;
}

.testimonial-meta{
  display: flex;
  flex-direction: column;
  gap: 0.05rem;
}

.testimonial-meta .name{
  font-weight: 700;
  color: #f5f7ff;
  font-size: 0.88rem;
}

.testimonial-meta .role{
  color: rgba(255,255,255,0.68);
  font-size: 0.8rem;
}

.dot-sep{
  opacity: 0.5;
}

#FooterMain{
  background: #000;
  border-top: 1px solid rgba(255,255,255,0.08);
  padding: clamp(2.5rem, 6vw, 4rem) clamp(1.25rem, 6vw, 4rem);
}

.footer-wrap{
  max-width: 1120px;
  margin: 0 auto;
  display: grid;
  gap: 2rem;
}

.footer-top{
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.footer-brand{
  display: grid;
  gap: 0.5rem;
}

.footer-title{
  font-family: Orbitron, "Space Grotesk", system-ui, sans-serif;
  font-weight: 800;
  letter-spacing: 0.08em;
  font-size: 1rem;
}

.footer-meta{
  color: rgba(255,255,255,0.65);
  line-height: 1.5;
  font-size: 0.95rem;
  max-width: 260px;
  text-wrap: balance;
}

.footer-label{
  text-transform: uppercase;
  letter-spacing: 0.18em;
  font-size: 0.72rem;
  color: rgba(255,255,255,0.55);
  font-family: Orbitron, "Space Grotesk", system-ui, sans-serif;
}

.footer-links{
  display: grid;
  gap: 0.45rem;
  margin-top: 0.7rem;
}

.footer-links a{
  text-decoration: none;
  color: rgba(255,255,255,0.82);
  font-size: 0.92rem;
  padding: 0.35rem 0.5rem;
  border-radius: 10px;
  background: transparent;
  transition: color 150ms ease, transform 150ms ease, background 160ms ease, box-shadow 160ms ease;
  position: relative;
  overflow: hidden;
  isolation: isolate;
}

.footer-nav .footer-links a{
  border-radius: 0;
}

.footer-contact .footer-links a{
  border-radius: 0;
}

.footer-nav .footer-links a:hover,
.footer-nav .footer-links a.is-cursor-hover{
  color: #fff;
  transform: translateX(2px);
  background: rgba(18, 72, 210, 0.22);
  box-shadow: 0 10px 18px rgba(0,0,0,0.25);
}

.footer-nav .footer-links a::before,
.footer-contact .footer-links a::before{
  content: "";
  position: absolute;
  inset: -40%;
  opacity: 0;
  transition: opacity 180ms ease;
  z-index: 0;
}

.footer-nav .footer-links a::before{
  background: radial-gradient(circle at 35% 40%, rgba(26,84,196,0.42), rgba(6,10,20,0.92));
}

.footer-contact .footer-links a::before{
  background: radial-gradient(circle at 35% 40%, rgba(204,62,34,0.52), rgba(24,4,2,0.92));
}

.footer-nav .footer-links a:hover::before,
.footer-nav .footer-links a.is-cursor-hover::before,
.footer-contact .footer-links a:hover::before,
.footer-contact .footer-links a.is-cursor-hover::before{
  opacity: 1;
}

.footer-contact .footer-links a:hover,
.footer-contact .footer-links a.is-cursor-hover{
  color: #fff;
  transform: translateX(2px);
  background: rgba(204, 62, 34, 0.24);
  box-shadow: 0 10px 18px rgba(0,0,0,0.25);
}

.footer-info-list{
  list-style: none;
  padding: 0;
  margin: 0.7rem 0 0;
  display: grid;
  gap: 0.4rem;
  color: rgba(255,255,255,0.7);
  font-size: 0.9rem;
}

.footer-bottom{
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255,255,255,0.08);
  color: rgba(255,255,255,0.55);
  font-size: 0.85rem;
  letter-spacing: 0.02em;
}

.footer-divider{
  opacity: 0.6;
}

.a3-asset-grid{
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.a3-asset-card{
  position: relative;
  padding: 0.65rem 0.25rem 0.75rem;
  border-radius: 8px;
  border: none;
  border-bottom: 1px solid rgba(255,255,255,0.16);
  background: none;
  box-shadow: none;
}

.a3-asset-card h4{
  margin: 0;
  font-family: Orbitron, "Space Grotesk", system-ui, sans-serif;
  color: white;
  letter-spacing: 0.04em;
  font-size: 1.02rem;
  font-weight: bold;
}


.a3-asset-card p{
  margin: 0;
  color: rgba(210,218,233,0.82);
  line-height: 1.5;
}


.a3-reveal-btn{
  display: none;
}

.asset-modal-backdrop{
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.6);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  display: grid;
  place-items: center;
  z-index: 2000;
  padding: 1.5rem;
}

.asset-modal{
  position: relative;
  max-width: 520px;
  width: min(520px, 94vw);
  padding: 1.4rem 1.6rem 1.6rem;
  border-radius: 16px;
  background: rgba(8,10,16,0.92);
  border: 1px solid rgba(255,255,255,0.12);
  box-shadow: 0 18px 48px rgba(0,0,0,0.45);
  display: grid;
  gap: 0.65rem;
}

.asset-modal__close{
  position: absolute;
  top: 10px;
  right: 10px;
  border: 1px solid rgba(255,255,255,0.25);
  background: rgba(255,255,255,0.08);
  color: #fff;
  border-radius: 999px;
  width: 28px;
  height: 28px;
  cursor: pointer;
}

.asset-modal__title{
  margin: 0;
  font-family: Orbitron, "Space Grotesk", system-ui, sans-serif;
  font-size: 1.2rem;
  letter-spacing: 0.04em;
}

.asset-modal__desc{
  margin: 0;
  color: rgba(210,218,233,0.85);
  line-height: 1.55;
}

.asset-modal__link{
  color: #9fcbff;
  text-decoration: none;
  font-weight: 600;
}

.asset-modal__link:hover{
  text-decoration: underline;
}

.fade-enter-active, .fade-leave-active{
  transition: opacity 160ms ease;
}
.fade-enter-from, .fade-leave-to{
  opacity: 0;
}

.reveal-on-scroll{
  opacity: 0;
  transform: translateY(14px);
  filter: blur(6px);
  transition:
    opacity 700ms cubic-bezier(0.22, 0.8, 0.36, 1) var(--reveal-delay, 0s),
    transform 700ms cubic-bezier(0.22, 0.8, 0.36, 1) var(--reveal-delay, 0s),
    filter 700ms ease var(--reveal-delay, 0s);
  will-change: transform, opacity, filter;
}

.reveal-on-scroll.is-visible{
  opacity: 1;
  transform: translateY(0);
  filter: blur(0);
}

[data-reveal="fade"]{
  transform: none;
}

@media (prefers-reduced-motion: reduce){
  .reveal-on-scroll{
    opacity: 1;
    transform: none;
    filter: none;
    transition: none;
  }
}

.assets-page{
  position: relative;
  width: 100%;
  padding: clamp(3rem, 8vw, 4rem) clamp(1.25rem, 6vw, 4rem) clamp(4rem, 10vw, 5rem);
  background: #05080f;
  color: white;
  display: grid;
  gap: clamp(1.5rem, 4vw, 2.5rem);
}

.assets-topbar{
  position: sticky;
  top: 14px;
  z-index: 50;
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: 1rem;
  padding: 0.9rem 1rem;
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 16px;
  background: rgba(10,12,18,0.9);
  backdrop-filter: blur(10px) saturate(120%);
  -webkit-backdrop-filter: blur(10px) saturate(120%);
  box-shadow: 0 18px 40px rgba(0,0,0,0.35);
}

.assets-title{
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  font-family: Orbitron, "Space Grotesk", system-ui, sans-serif;
  font-weight: 800;
  letter-spacing: 0.08em;
  font-size: 1rem;
}

.assets-title img{
  width: 36px;
  height: auto;
  filter: drop-shadow(0 8px 16px rgba(0,0,0,0.45));
}

.assets-nav{
  display: inline-flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.6rem;
  flex-wrap: wrap;
}

.assets-nav a{
  text-decoration: none;
  color: white;
  padding: 0.45rem 0.7rem;
  border-radius: 10px;
  border: 1px solid rgba(255,255,255,0.1);
  background: linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02));
  font-family: "Space Grotesk", system-ui, sans-serif;
  font-size: 0.92rem;
  letter-spacing: 0.01em;
  transition: transform 140ms ease, border-color 140ms ease, background 140ms ease, opacity 140ms ease;
  opacity: 0.92;
}

.assets-nav a:hover{
  transform: translateY(-1px);
  border-color: rgba(255,255,255,0.4);
  opacity: 1;
}

.assets-grid{
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
}

.asset-card{
  padding: 1.15rem 1.05rem;
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 14px;
  background: linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02));
  box-shadow: 0 16px 38px rgba(0,0,0,0.35);
  display: grid;
  gap: 0.35rem;
}

.asset-card h4{
  font-family: Orbitron, "Space Grotesk", system-ui, sans-serif;
  font-size: 1rem;
  letter-spacing: 0.04em;
  color: #fff;
}

.asset-card p{
  color: rgba(255,255,255,0.75);
  line-height: 1.5;
  font-size: 0.95rem;
}

.links-page{
  position: relative;
  width: 100%;
  overflow: hidden;
  background: #02050b;
  color: white;
  padding: clamp(4rem, 10vw, 6rem) clamp(1.25rem, 6vw, 4rem);
}

.links-bg{
  position: absolute;
  inset: -10%;
  background:
    radial-gradient(32% 32% at 40% 48%, rgba(29,134,255,0.3), transparent 60%),
    radial-gradient(28% 28% at 68% 38%, rgba(81,208,255,0.22), transparent 64%),
    radial-gradient(50% 60% at 50% 80%, rgba(10,15,30,0.9), #02050b 70%),
    linear-gradient(180deg, rgba(0,0,0,0.35), rgba(0,0,0,0.9));
  filter: blur(20px) saturate(120%);
  z-index: 0;
}

.links-wrap{
  position: relative;
  z-index: 1;
  display: grid;
  gap: clamp(1.5rem, 4vw, 2.5rem);
  max-width: 1080px;
  margin: 0 auto;
}

.links-header{
  display: grid;
  gap: 0.6rem;
}

.links-title{
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: Orbitron, "Space Grotesk", system-ui, sans-serif;
  letter-spacing: 0.06em;
  font-size: 1.1rem;
}

.links-dot{
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: radial-gradient(circle, #4fd1ff 0%, #1e63ff 60%, #0a1733 100%);
  box-shadow: 0 0 28px rgba(79,209,255,0.8);
}

.links-lede{
  max-width: 640px;
  color: rgba(255,255,255,0.78);
  line-height: 1.6;
  font-size: 1rem;
}

.links-grid{
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 0.85rem;
}

.link-card{
  position: relative;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.55rem;
  align-items: center;
  padding: 0.85rem 0.95rem;
  border-radius: 14px;
  border: 1px solid rgba(255,255,255,0.08);
  background: rgba(255,255,255,0.04);
  text-decoration: none;
  color: white;
  transition: transform 150ms ease, border-color 150ms ease, background 150ms ease;
}

.link-card:hover{
  transform: translateY(-2px);
  border-color: rgba(79,209,255,0.6);
  background: rgba(255,255,255,0.07);
}

.link-icon{
  width: 32px;
  height: 32px;
  display: grid;
  place-items: center;
  border-radius: 10px;
  background: linear-gradient(135deg, #4fd1ff, #1e63ff);
  color: #051022;
  font-size: 0.95rem;
  font-weight: 800;
  box-shadow: 0 10px 28px rgba(79,209,255,0.38);
}

.link-kicker{
  font-family: Orbitron, "Space Grotesk", system-ui, sans-serif;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  font-size: 0.78rem;
  color: rgba(255,255,255,0.82);
}

.link-desc{
  margin-top: 0.15rem;
  color: rgba(255,255,255,0.72);
  font-size: 0.93rem;
  line-height: 1.45;
}

.a2-wrap{
  max-width: 1120px;
  margin: 0 auto;
  display: grid;
  gap: clamp(2rem, 6vw, 3rem);
  position: relative;
  z-index: 10;
}

.a2-header{
  display: grid;
  gap: 0.65rem;
}

.promo-banner{
  display: inline-flex;
  align-items: center;
  gap: 0.7rem;
  padding: 0.6rem 1.1rem;
  border-radius: 999px;
  border: 1px solid rgba(255,255,255,0.2);
  background: rgba(255,255,255,0.08);
  box-shadow: 0 18px 35px rgba(0,0,0,0.4);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-family: Orbitron, "Space Grotesk", system-ui, sans-serif;
  font-size: 0.75rem;
  color: rgba(255,255,255,0.92);
  width: fit-content;
}

.promo-dot{
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255,255,255,0.85);
  box-shadow: 0 0 12px rgba(255,255,255,0.5);
}

.promo-text{
  text-wrap: balance;
}

.a2-header .eyebrow{
  text-transform: uppercase;
  letter-spacing: 0.26em;
  font-size: 0.78rem;
  color: rgba(255,255,255,0.62);
  font-family: Orbitron, "Space Grotesk", system-ui, sans-serif;
}

.a2-header h3{
  font-size: clamp(2rem, 4vw, 2.8rem);
  font-weight: 800;
  letter-spacing: 0.04em;
  font-family: Orbitron, "Space Grotesk", system-ui, sans-serif;
  color: #fff;
}

.a2-flip{
  display: inline-block;
  font: inherit;
  color: inherit;
  font-weight: 800;
}

.a2-header .flip-word,
.a2-header .flip-word__word,
.a2-header .flip-word__letter{
  font-weight: 800;
}

.a2-header .lede{
  max-width: 720px;
  font-size: 1.05rem;
  line-height: 1.6;
  color: rgba(255,255,255,0.75);
}

.feature-list{
  display: grid;
  gap: 0.5rem;
  padding: 0.4rem 0;
  max-width: 740px;
}

.feature-list-item{
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: flex-start;
  gap: 0.55rem;
  padding: 0.35rem 0.2rem;
}

.feature-list-item .dot{
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-top: 0.36rem;
  background: linear-gradient(135deg, #ff7b3d, #ff4d2f);
  box-shadow: 0 0 16px rgba(255, 94, 47, 0.55);
}

.feature-text h4{
  font-size: 1.04rem;
  font-weight: 700;
  font-family: "Space Grotesk", system-ui, sans-serif;
}

.feature-text p{
  margin-top: 0.2rem;
  color: rgba(255,255,255,0.76);
  line-height: 1.5;
  font-size: 0.95rem;
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
  cursor: pointer;
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

.theme-list{
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  padding-left: 1rem;
}

.theme-option{
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

.theme-option:hover{
  border-color: var(--ui-border);
}

.theme-option[data-selected="true"]{
  border-color: var(--ui-text);
  color: var(--ui-text);
  font-weight: 700;
}

#Pages{
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.page-list{
  list-style: none;
  padding: 0;
  margin: 0.2rem 0 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  padding-left: 1rem;
}

.page-option{
  width: 100%;
  display: inline-flex;
  align-items: center;
  padding: 0.35rem 0.1rem 0.35rem 0.4rem;
  background: transparent;
  border: none;
  border-bottom: 1px solid var(--ui-border);
  color: var(--ui-text);
  font-family: "Space Grotesk", system-ui, sans-serif;
  font-size: 0.95rem;
  text-align: left;
  cursor: pointer;
  transition: color 120ms ease, opacity 120ms ease;
  width: 100%;
  opacity: 1;
}

.page-option:hover{
  border-bottom-color: rgba(255, 255, 255, 0.16);
  opacity: 1;
}

.page-inner{
  width: 100%;
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
}

.page-icon{
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  opacity: 0.9;
}

.page-icon svg{
  width: 100%;
  height: 100%;
}

.page-name{
  flex: 1;
  letter-spacing: 0.01em;
}

.theme-flag{
  width: 18px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: transform 200ms cubic-bezier(0.22, 0.8, 0.36, 1), filter 200ms ease;
}

.theme-option:hover .theme-flag{
  transform: translateX(2px) scale(1.05);
}

.feature-divider{
  height: 1px;
  width: 100%;
  background: linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.14), rgba(255,255,255,0));
}

.beam-wrap{
  position: relative;
  margin-top: 1.2rem;
  padding: 1.1rem 0.4rem 0.4rem;
  border-radius: 18px;
}

.beam-title{
  text-transform: uppercase;
  letter-spacing: 0.14em;
  font-size: 0.85rem;
  color: rgba(255,255,255,0.7);
  font-family: Orbitron, "Space Grotesk", system-ui, sans-serif;
  margin-bottom: 0.8rem;
}

.beam-grid{
  position: relative;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.8rem 1rem;
  align-items: center;
  justify-items: center;
  padding: 0.6rem;
}

.beam-node{
  min-width: 120px;
  min-height: 52px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 0.75rem;
  border-radius: 999px;
  background: linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03));
  border: 1px solid rgba(255,255,255,0.1);
  font-family: "Space Grotesk", system-ui, sans-serif;
  color: rgba(255,255,255,0.92);
  text-align: center;
  backdrop-filter: blur(10px);
  box-shadow: 0 12px 30px rgba(0,0,0,0.28);
}

.beam-center{
  grid-column: 2 / 3;
  background: linear-gradient(135deg, #ff7b3d, #9c40ff);
  color: #0c101a;
  font-weight: 800;
}

.beam-center img{
  width: 44px;
  height: auto;
  margin-right: 0.4rem;
}
.systems{
  margin-top: 1.4rem;
  display: grid;
  gap: 0.5rem;
}

.systems-title{
  text-transform: uppercase;
  letter-spacing: 0.16em;
  font-size: 0.82rem;
  color: rgba(255,255,255,0.62);
  font-family: Orbitron, "Space Grotesk", system-ui, sans-serif;
}

.systems-pills{
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
}

.pill{
  display: inline-flex;
  align-items: center;
  padding: 0.4rem 0.65rem;
  border-radius: 999px;
  border: 1px solid rgba(255,255,255,0.14);
  background: linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04));
  font-family: "Space Grotesk", system-ui, sans-serif;
  font-size: 0.9rem;
  color: var(--ui-text);
}

.pill-logo{
  background: linear-gradient(135deg, #ff7b3d, #ff4d2f);
  color: #0c101a;
  font-weight: 700;
  border: none;
}

@keyframes fadeUp{
  0% { opacity: 0; transform: translateY(16px); filter: blur(4px); }
  100% { opacity: 1; transform: translateY(0); filter: blur(0); }
}

@media (max-width: 640px){
  #topbarMain{
    width: min(94vw, 22rem);
    padding: 0.28rem 0.65rem;
    gap: 0.5rem;
  }
  #hamburger{
    width: 32px;
    height: 32px;
    padding: 7px 6px;
    gap: 3px;
  }
  #hamburger span{
    height: 2px;
    transform: translateX(5px);
  }
  #main{
    top: 48%;
  }
  #bottomArrow{
    bottom: 12px;
  }
}

@media (max-width: 900px){
  .testimonial-grid{
    grid-template-columns: 1fr;
  }

  .testimonial-card{
    max-width: none;
    margin: 0;
  }

  .testimonial-card blockquote{
    max-width: none;
    text-wrap: pretty;
  }

  .a2-stats div:last-child{
    flex-basis: 100%;
  }
}

@keyframes barSlideIn{
  0%{ opacity: 0; transform: translateX(8px); }
  100%{ opacity: 1; transform: translateX(0); }
}

/* Search modal */
.fade-enter-active, .fade-leave-active{
  transition: opacity 200ms ease;
}
.fade-enter-from, .fade-leave-to{
  opacity: 0;
}

.search-modal{
  position: fixed;
  inset: 0;
  /* Keep overlay just beneath custom cursor (z-index 999999 in SmoothCursor) */
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

#Langs{
  position: relative;
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 0.35rem;
}

#ThemeRow{
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.theme-label{
  font-family: "Space Grotesk", system-ui, sans-serif;
  color: var(--ui-text);
  font-size: 0.95rem;
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
  cursor: pointer;
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

.theme-list{
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  padding-left: 1rem;
}

.theme-option{
  width: 100%;
  display: inline-flex;
  align-items: center;
  padding: 0.35rem 0.1rem 0.35rem 0.4rem;
  background: transparent;
  border: none;
  border-bottom: 1px solid var(--ui-border);
  color: var(--ui-text);
  font-family: "Space Grotesk", system-ui, sans-serif;
  font-size: 0.95rem;
  text-align: left;
  cursor: pointer;
  transition: border-color 120ms ease, color 120ms ease, transform 120ms ease;
}

.theme-option:hover{
  border-color: var(--ui-border);
}

.theme-option[data-selected="true"]{
  border-color: var(--ui-text);
  color: var(--ui-text);
  font-weight: 700;
}

.theme-flag{
  width: 18px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

#TTtop{
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

#collapseT{
  height: 16px;
  width: 16px;
  aspect-ratio: 1/1;
  display: inline-block;
  transform-origin: center center;
  transition: transform 260ms cubic-bezier(0.22, 0.8, 0.36, 1);
}

#TTtop[data-open="true"] #collapseT{
  transform: rotate(90deg);
}

.header-flag{
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.header-flag-icon{
  transition: opacity 200ms ease;
}

.lang-title{
  font-family: "Space Grotesk", system-ui, sans-serif;
  font-size: 0.95rem;
  letter-spacing: 0.02em;
  color: var(--ui-text);
}

.lang-list{
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

.lang-option{
  width: 100%;
  display: inline-flex;
  align-items: center;
  padding: 0.35rem 0.1rem 0.35rem 0.4rem;
  background: transparent;
  border: none;
  border-bottom: 1px solid var(--ui-border);
  color: var(--ui-text);
  font-family: "Space Grotesk", system-ui, sans-serif;
  font-size: 0.95rem;
  text-align: left;
  cursor: pointer;
  transition: border-color 120ms ease, color 120ms ease, transform 120ms ease;
  width: 100%;
}

.lang-option:hover{
  border-color: var(--ui-border);
}

.lang-option[data-selected="true"]{
  border-color: var(--ui-border);
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
.theme-option:hover .lang-inner{
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

.dev-head{
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  margin: 0.4rem 0 0.2rem;
  color: var(--ui-text);
  font-family: "Space Grotesk", system-ui, sans-serif;
}

.dev-title{
  font-size: 0.95rem;
  letter-spacing: 0.01em;
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

<script lang="ts" setup>
import { computed, onBeforeUnmount, onMounted, ref, watch, nextTick } from "vue";
import type { HTMLAttributes } from "vue";
import { useRouter } from "vue-router";
import SmoothCursor from "../components/SmoothCursor.vue";
import { socialSearchPages } from "@/lib/socialSearchPages";
import { matchesSearch } from "@/lib/searchMatch";
import FlipWords from "../components/FlipWords.vue";
import GlowBorder from "../components/ui/glow-border/GlowBorder.vue";
import { RouterLink } from "vue-router";

interface Props {
  class?: HTMLAttributes["class"];
  hue?: number;
  saturation?: number;
  brightness?: number;
  speed?: number;
  mouseSensitivity?: number;
  damping?: number;
  tilt?: number;
  noise?: {
    opacity: number;
    scale: number;
  };
}

const props = withDefaults(defineProps<Props>(), {
  hue: 0,
  saturation: 1,
  brightness: 1,
  speed: 1,
  mouseSensitivity: 0.5,
  damping: 1,
  tilt: 0.007,
});

const router = useRouter();
const STORAGE_THEME_KEY = "zantixTheme";

const readStoredTheme = (): "system" | "light" | "dark" | null => {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem(STORAGE_THEME_KEY);
  if (stored === "system" || stored === "light" || stored === "dark") return stored;
  return null;
};

const tilt = computed(() => props.tilt ?? 0.007);

const shaderSource = computed(() => `
// ShaderToy URL: https://www.shadertoy.com/view/3csSWB

/*
    "Singularity" by @XorDev

    A whirling blackhole.
    Feel free to code golf!

    FabriceNeyret2: -19
    dean_the_coder: -12
    iq: -4
*/
void mainImage(out vec4 O, vec2 F)
{
  //Iterator and attenuation (distance-squared)
  float i = .2, a;
    //Resolution for scaling and centering
    vec2 r = iResolution.xy,
    //Centered ratio-corrected coordinates with clockwise tilt
    p = mat2(
      cos(${tilt.value}), -sin(${tilt.value}),
      sin(${tilt.value}),  cos(${tilt.value})
    ) * ((F + F - r) / r.y / .7),
    //Diagonal vector for skewing
    d = vec2(-1, 1),
    //Blackhole center
    b = p - i * d,
    //Rotate and apply perspective
    c = p * mat2(1, 1, d / (.1 + i / dot(b, b))),
    //Rotate into spiraling coordinates
    v = c * mat2(cos(.5 * log(a = dot(c, c)) + iTime * i + vec4(0, 33, 11, 0))) / i,
    //Waves cumulative total for coloring
    w = vec2(0.);

  //Loop through waves (integer loop for GLES compatibility)
  for (int k = 0; k < 9; k++) {
    i += 1.;
    //Distort coordinates
    v += .7 * sin(v.yx * i + iTime) / i + .5;
    //Accumulate waves
    w += 1. + sin(v);
  }
  //Acretion disk radius
  i = length(sin(v / .3) * .4 + c * (3. + d));
  //Red/blue gradient
  O = 1. - exp(-exp(c.x * vec4(.6, -.4, -1, 0))
    //Wave coloring
    / w.xyyx
    //Acretion disk brightness
    / (2. + i * i / 4. - i)
    //Center darkness
    / (.5 + 1. / a)
    //Rim highlight
    / (.03 + abs(length(p) - .7))
  );
}
`);

const canvasRef = ref<HTMLCanvasElement | null>(null);
const error = ref<string | null>(null);
const ready = ref(false);
const pageLoaded = ref(false);
const siteReady = computed(() => ready.value && pageLoaded.value);
const topbarVisible = ref(false);
const menuOpen = ref(false);
const hasReachedBottom = ref(false);
const searchInput = ref<HTMLInputElement | null>(null);
const searchModalOpen = ref(false);
const previousOverflow = ref<string | null>(null);
const themeOpen = ref(false);
const pagesOpen = ref(true);
const projectsOpen = ref(false);
const theme = ref<"dark" | "light" | "system">(readStoredTheme() ?? "system");
const searchQuery = ref("");
const modalSearchInput = ref<HTMLInputElement | null>(null);
const pages = [
  { slug: "home", label: "Home", href: "/" },
  { slug: "assets", label: "Open Source", href: "/opensource" },
  { slug: "developers", label: "Developers", href: "/Team" },
  { slug: "links", label: "Links", href: "/links" },
  { slug: "featured", label: "Featured Work", href: "/#A3" },
  { slug: "testimonials", label: "Testimonials", href: "/testimonials" },
  { slug: "contact", label: "Contact", href: "/#FooterMain" },
  { slug: "tos", label: "TOS", href: "#tos" },
  ...socialSearchPages,
];
const openSourceProjects = [
  { slug: "project-dna", title: "Double Helix DNA" },
  { slug: "project-orbit-aura", title: "Dynamic Orbit Aura" },
  { slug: "project-gravity-field", title: "Interactive Gravity Field" },
  { slug: "project-imprint", title: "Imprint Module" },
  { slug: "project-npc-controller", title: "NPC Path Controller" },
];
const themeOptions = [
  { value: "system", label: "System" },
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
] as const;
const translations: Record<string, Record<string, string>> = {
  en: {
    topAbout: "About Zantix",
    topAssets: "Open Source",
    topDevelopers: "Zantix Team",
    topTOS: "Zantix TOS",
    searchPlaceholder: "Search",
    searchMain: "Search",
    heroTitle: "oskddrchris",
    heroSubtitle: "Design And code in synergy",
    heroBtnAssets: "Assets",
    heroBtnDevelopers: "Team",
    promoDiscount: "Launch Offer — 50% off all sales",
    builtTo: "Quick Info",
    shipWith: "Experience In",
    feature1Title: "Roblox Studio Scripting",
    feature1Desc: "4 years of scripting experience in Roblox Studio.",
    feature2Title: "UI/UX Design",
    feature2Desc: "2 years of UI and UX experience.",
    feature3Title: "Web Development",
    feature3Desc: "2 years of web developing experience.",
    feature4Title: "iOS Swift & SwiftUI",
    feature4Desc: "Half a year of iOS development with Swift and SwiftUI.",
    collectionsEyebrow: "Curated collections",
    collectionsTitle: "Start with a pack",
    collectionsDescription: "Pick a themed set assembled by the Zantix team.",
    collectionsCta: "View collection",
    collection1Title: "UI Kit Essentials",
    collection1Desc: "Buttons, inputs, modals, and layout pieces.",
    collection2Title: "Building Starter Pack",
    collection2Desc: "Environment prefabs and terrain helpers.",
    collection3Title: "Animation Toolkit",
    collection3Desc: "Loops, transitions, and motion polish.",
    collection4Title: "Gameplay Scripts",
    collection4Desc: "Core systems to kickstart development.",
    testimonialsEyebrow: "Client reviews",
    testimonialsTitle: "Reviews From Clients",
    testimonialsDescription: "Reviews from developers and clients experienced in scripting, UI/UX, web, and iOS.",
    testimonialsCta: "View product options",
    testimonialsCardCta: "View option",
    studioProfilesEyebrow: "Studio profiles",
    studioProfilesTitle: "Meet the teams",
    studioProfilesDescription: "Tap a studio badge to jump to their profile with owners, leads, and focus.",
    logoStudio1: "Scripting",
    logoStudio2: "UI/UX",
    logoStudio3: "Web",
    logoStudio4: "iOS",
    logoStudio5: "Frontend",
    logoStudio6: "Product",
    studio1Focus: "Worlds & environments",
    studio1Desc: "World-building and environment systems for large-scale simulations.",
    studio1Owners: "Owners: A. Ramirez, K. Cho",
    studio1Leads: "Leads: L. Park (Creative), I. Patel (Tech)",
    studio1Location: "Location: Los Angeles, CA",
    studio2Focus: "Characters & animation",
    studio2Desc: "Character rigs, motion systems, and combat animation pipelines.",
    studio2Owners: "Owners: D. Fischer, M. Alvarez",
    studio2Leads: "Leads: M. Alvarez (Art), J. Reed (Engineering)",
    studio2Location: "Location: Berlin, DE",
    studio3Focus: "UI & multiplayer",
    studio3Desc: "UX toolkits and multiplayer UI frameworks for live games.",
    studio3Owners: "Owners: S. Ito, R. Quinn",
    studio3Leads: "Leads: R. Quinn (Design), T. Brooks (Systems)",
    studio3Location: "Location: Tokyo, JP",
    studio4Focus: "Rendering & lighting",
    studio4Desc: "Shaders, lighting stacks, and performance optimization for dark worlds.",
    studio4Owners: "Owners: N. Morgan, P. Singh",
    studio4Leads: "Leads: P. Singh (Rendering), J. Cole (Perf)",
    studio4Location: "Location: Vancouver, CA",
    studio5Focus: "Gameplay systems",
    studio5Desc: "Progression, economy, and live-ops tooling to scale launches.",
    studio5Owners: "Owners: L. Nguyen, H. Carter",
    studio5Leads: "Leads: H. Carter (Systems), F. Rossi (Live Ops)",
    studio5Location: "Location: Austin, TX",
    studio6Focus: "Audio & VFX",
    studio6Desc: "Soundscapes, VFX, and immersion tools for cinematic play.",
    studio6Owners: "Owners: A. Dubois, J. Silva",
    studio6Leads: "Leads: J. Silva (Audio), A. Dubois (FX)",
    studio6Location: "Location: Montréal, CA",
    testimonial1Quote: "Chris is a perfect scripter and made everything very clear to work with, with no bugs found.",
    testimonial1Name: "dali123049",
    testimonial1Role: "UI Designer & Custom Icons",
    testimonial2Quote: "The UI/UX direction made the product feel cleaner and easier for users to understand.",
    testimonial2Name: "UI/UX",
    testimonial2Role: "Client Review",
    testimonial3Quote: "The web implementation was responsive, fast, and practical to maintain.",
    testimonial3Name: "Web Development",
    testimonial3Role: "Frontend",
    testimonial4Quote: "Creates focused mobile experiences with clear navigation and native-feeling interactions.",
    testimonial4Name: "iOS Development",
    testimonial4Role: "Mobile",
    testimonial5Quote: "Connects visual direction, implementation, and product thinking in one portfolio.",
    testimonial5Name: "Portfolio",
    testimonial5Role: "Personal Work",
    testimonial6Quote: "The assets are organized well, so onboarding new teammates is easy.",
    testimonial6Name: "Tech Lead",
    testimonial6Role: "Pipeline",
    testimonial7Quote: "Even as a solo creator, I can ship updates with studio-level quality.",
    testimonial7Name: "Solo Creator",
    testimonial7Role: "Indie Project",
    testimonial8Quote: "Support replies fast and the docs are clear enough to unblock us quickly.",
    testimonial8Name: "Project Manager",
    testimonial8Role: "Production",
    footerBrand: "Zantix",
    footerTagline: "A personal portfolio for design, scripting, web, and iOS work.",
    footerPagesLabel: "Pages",
    footerContactsLabel: "Contacts",
    footerInfoLabel: "Profile",
    footerInfo1: "Available in German and English.",
    footerInfo2: "Focused on single-person portfolio work.",
    footerInfo3: "Projects highlight design and development.",
    footerDiscordLabel: "Discord Server",
    footerXLabel: "X Account",
    footerEmailLabel: "Email",
    footerDiscordLink: "#",
    footerXLink: "#",
    footerCopyright: "© 2026 Zantix",
    footerRights: "All rights reserved.",
    themeLabel: "Theme",
    pagesLabel: "Pages",
    pageHome: "Home",
    pageAssets: "Open Source",
    pageDevelopers: "Team",
    pageLinks: "Links",
    pageTOS: "TOS",
    confidence: "Scripting",
    precision: "UI/UX",
    consistency: "Web Developing",
    stability: "iOS Developing",
  },
};

const t = (key: string) => translations.en[key] ?? key;
const flipWords = computed(() => [
  t("confidence") ?? "confidence",
  t("precision") ?? "precision",
  t("consistency") ?? "consistency",
  t("stability") ?? "stability",
]);

type FeaturedAsset = { name: string; desc: string; href: string };

const toAssetPath = (slug: string, license?: string) => `/Assets/${slug}${license ? `/L${license}` : ""}`;

const allFeaturedAssets: FeaturedAsset[] = [
  { name: "Kern", desc: "Safer RBXScriptSignal handling and automatic connection hygiene.", href: toAssetPath("Kern") },
  { name: "Arc", desc: "Lightweight input/ability controller ready for multiplayer.", href: toAssetPath("Arc") },
  { name: "Feather", desc: "Cinematic camera presets with smooth damping controls.", href: toAssetPath("Feather", "MIT") },
  { name: "Template", desc: "Starter scaffolding with MIT + commercial-friendly variants.", href: toAssetPath("template", "MIT") },
];

const assetModalOpen = ref(false);
const selectedAsset = ref<FeaturedAsset | null>(null);
const assetPrevOverflow = ref<string | null>(null);
const assetsRevealed = ref(true);
const featuredAssets = ref<FeaturedAsset[]>(allFeaturedAssets.slice(0, 3));

const revealObserver = ref<IntersectionObserver | null>(null);
let revealRaf = 0;

const applyScrollAnimations = () => {
  if (typeof window === "undefined") return;
  const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
  if (!elements.length) {
    revealObserver.value?.disconnect();
    revealObserver.value = null;
    return;
  }

  elements.forEach((el) => el.classList.add("reveal-on-scroll"));

  const setDelay = (el: HTMLElement, delay: number) => {
    if (Number.isNaN(delay)) return;
    if (el.style.getPropertyValue("--reveal-delay")) return;
    el.style.setProperty("--reveal-delay", `${delay}s`);
  };

  document.querySelectorAll<HTMLElement>("[data-reveal-stagger]").forEach((parent) => {
    const step = Number.parseFloat(parent.dataset.revealStagger || "0.06");
    if (Number.isNaN(step)) return;
    const kids = Array.from(parent.querySelectorAll<HTMLElement>("[data-reveal]"));
    kids.forEach((kid, idx) => {
      setDelay(kid, idx * step);
    });
  });

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion || !("IntersectionObserver" in window)) {
    elements.forEach((el) => el.classList.add("is-visible"));
    revealObserver.value?.disconnect();
    revealObserver.value = null;
    return;
  }

  revealObserver.value?.disconnect();
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target as HTMLElement;
        el.classList.add("is-visible");
        if (el.dataset.revealOnce !== "false") {
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.18, rootMargin: "0px 0px -12% 0px" },
  );
  revealObserver.value = observer;
  elements.forEach((el) => observer.observe(el));
};

const refreshScrollAnimations = () => {
  if (typeof window === "undefined") return;
  if (revealRaf) cancelAnimationFrame(revealRaf);
  revealRaf = requestAnimationFrame(() => {
    revealRaf = 0;
    applyScrollAnimations();
  });
};

const studioLogos = [
  "logoStudio1",
  "logoStudio2",
  "logoStudio3",
  "logoStudio4",
];

const testimonials = [
  { quoteKey: "testimonial1Quote", nameKey: "testimonial1Name", roleKey: "testimonial1Role" }, // keep Someone/dev review
  { quoteKey: "testimonial2Quote", nameKey: "testimonial2Name", roleKey: "testimonial2Role" },
  { quoteKey: "testimonial3Quote", nameKey: "testimonial3Name", roleKey: "testimonial3Role" },
  { quoteKey: "testimonial4Quote", nameKey: "testimonial4Name", roleKey: "testimonial4Role" },
  { quoteKey: "testimonial5Quote", nameKey: "testimonial5Name", roleKey: "testimonial5Role" },
];

let gl: WebGLRenderingContext | null = null;
let program: WebGLProgram | null = null;
let buffer: WebGLBuffer | null = null;
let frameId = 0;
let startTime = 0;
let introTimeoutId: number | null = null;
const createProgram = (shaderCode: string) => {
  if (!gl) return null;

  const vertexSource = `
attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

  const fragmentSource = `
#ifdef GL_ES
precision highp float;
#endif

uniform vec3 iResolution;
uniform float iTime;

${shaderCode}

void main() {
  vec4 color;
  mainImage(color, gl_FragCoord.xy);
  gl_FragColor = color;
}
`;

  const compile = (type: number, source: string) => {
    const shader = gl!.createShader(type);
    if (!shader) return null;
    gl!.shaderSource(shader, source);
    gl!.compileShader(shader);
    if (!gl!.getShaderParameter(shader, gl!.COMPILE_STATUS)) {
      const info = gl!.getShaderInfoLog(shader) ?? "Shader compile error";
      console.error(info);
      error.value = info;
      gl!.deleteShader(shader);
      return null;
    }
    return shader;
  };

  const vert = compile(gl.VERTEX_SHADER, vertexSource);
  const frag = compile(gl.FRAGMENT_SHADER, fragmentSource);
  if (!vert || !frag) return null;

  const prog = gl.createProgram();
  if (!prog) return null;

  gl.attachShader(prog, vert);
  gl.attachShader(prog, frag);
  gl.linkProgram(prog);

  gl.deleteShader(vert);
  gl.deleteShader(frag);

  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    const info = gl.getProgramInfoLog(prog) ?? "Program link error";
    console.error(info);
    error.value = info;
    gl.deleteProgram(prog);
    return null;
  }

  return prog;
};

const resize = () => {
  if (!gl || !canvasRef.value) return;
  const canvas = canvasRef.value;
  const dpr = window.devicePixelRatio || 1;
  const width = Math.max(1, Math.floor(canvas.clientWidth * dpr));
  const height = Math.max(1, Math.floor(canvas.clientHeight * dpr));
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
    gl.viewport(0, 0, width, height);
  }
};

const render = () => {
  if (!gl || !program || !canvasRef.value) return;
  resize();

  const resolutionLoc = gl.getUniformLocation(program, "iResolution");
  const timeLoc = gl.getUniformLocation(program, "iTime");

  gl.useProgram(program);

  if (resolutionLoc) {
    gl.uniform3f(resolutionLoc, canvasRef.value.width, canvasRef.value.height, 1);
  }
  if (timeLoc) {
    const elapsed = (performance.now() - startTime) / 1000;
    gl.uniform1f(timeLoc, elapsed);
  }

  gl.drawArrays(gl.TRIANGLES, 0, 3);
  frameId = requestAnimationFrame(render);
};

const handleScroll = () => {
  if (hasReachedBottom.value) return;
  const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 4;
  if (nearBottom) {
    hasReachedBottom.value = true;
  }
};

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
   if (e.key === "Escape" && assetModalOpen.value) {
    e.preventDefault();
    closeAssetModal();
  }
};

const pickFeaturedAssets = () => {
  // rotation disabled per request
  featuredAssets.value = allFeaturedAssets.slice(0, 3);
  assetsRevealed.value = true;
};

const openAssetModal = (asset: FeaturedAsset) => {
  selectedAsset.value = asset;
  assetModalOpen.value = true;
  if (assetPrevOverflow.value === null) {
    assetPrevOverflow.value = document.documentElement.style.overflow || "";
    document.documentElement.style.overflow = "hidden";
  }
};

const closeAssetModal = () => {
  assetModalOpen.value = false;
  selectedAsset.value = null;
  if (assetPrevOverflow.value !== null) {
    document.documentElement.style.overflow = assetPrevOverflow.value;
    assetPrevOverflow.value = null;
  }
};

function openSearchModal() {
  searchModalOpen.value = true;
  if (previousOverflow.value === null) {
    previousOverflow.value = document.documentElement.style.overflow || "";
    document.documentElement.style.overflow = "hidden";
  }
  themeOpen.value = false;
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

const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
const resolveTheme = () => (theme.value === "system" ? (prefersDark.matches ? "dark" : "light") : theme.value);
const handleSchemeChange = () => {
  if (theme.value === "system") applyTheme();
};

const applyTheme = () => {
  document.documentElement.setAttribute("data-theme", resolveTheme());
};

const toggleThemeList = () => {
  themeOpen.value = !themeOpen.value;
};

const togglePages = () => {
  pagesOpen.value = !pagesOpen.value;
};

const toggleProjects = () => {
  projectsOpen.value = !projectsOpen.value;
};

const selectTheme = (value: "light" | "dark" | "system") => {
  theme.value = value;
  applyTheme();
};

const selectPage = (slug: string, href: string) => {
  closeSearchModal();
  menuOpen.value = false;
  if (href === "/" && router.currentRoute.value.path === "/") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  if (href.startsWith("#")) {
    window.location.hash = href.startsWith("#") ? href : `#${slug}`;
    return;
  }
  if (href.startsWith("/Assets")) {
    router.push(href).catch(() => {});
    return;
  }
  router.push(href).catch(() => {});
};

const selectOpenSourceProject = (slug: string) => {
  searchModalOpen.value = false;
  menuOpen.value = false;
  router.push(`/opensource#${slug}`).catch(() => {});
};

const handleModalEnter = () => {
  if (filteredThemes.value.length === 1) {
    selectTheme(filteredThemes.value[0].value);
    return;
  }
  const page = filteredPages.value[0];
  if (page) {
    selectPage(page.slug, page.href);
    return;
  }
  const project = filteredOpenSourceProjects.value[0];
  if (project) selectOpenSourceProject(project.slug);
};

const filteredThemes = computed(() => {
  const q = searchQuery.value.trim().toLowerCase();
  const categoryQuery = ["theme", "themes", "appearance", "mode", "modes", "category", "categories", "catagory", "catagories"].some(
    (term) => q && (q.includes(term) || term.includes(q)),
  );
  if (!q) return themeOptions;
  if (categoryQuery) return themeOptions;
  return themeOptions.filter(
    (opt) =>
      opt.label.toLowerCase().includes(q) ||
      opt.value.toLowerCase().includes(q)
  );
});

const filteredPages = computed(() => {
  const q = searchQuery.value.trim().toLowerCase();
  if (!q) return pages.filter((page) => !page.searchOnly);
  const compactQ = q.replace(/[^a-z0-9]/g, "");
  const categoryQuery = ["page", "pages", "site", "navigation", "nav"].some(
    (term) => q && (q.includes(term) || term.includes(q)),
  );
  if (categoryQuery) return pages.filter((page) => !page.searchOnly);
  return pages.filter((page) => matchesSearch(q, [page.label, page.slug, page.href, page.keywords]));
});

const filteredOpenSourceProjects = computed(() => {
  const q = searchQuery.value.trim().toLowerCase();
  if (!q) return openSourceProjects;
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

const themeShouldOpen = computed(
  () => themeOpen.value || (searchQuery.value.trim() && filteredThemes.value.length > 0),
);
const pagesShouldOpen = computed(
  () => pagesOpen.value || (searchQuery.value.trim() && filteredPages.value.length > 0),
);
const projectsShouldOpen = computed(
  () => projectsOpen.value || (searchQuery.value.trim() && filteredOpenSourceProjects.value.length > 0),
);

onMounted(() => {
  const canvas = canvasRef.value;
  if (!canvas) return;

  gl = canvas.getContext("webgl");
  if (!gl) {
    const msg = "WebGL not supported in this browser";
    console.error(msg);
    error.value = msg;
    return;
  }

  program = createProgram(shaderSource.value);
  if (!program) {
    if (!error.value) {
      error.value = "Failed to create shader program";
    }
    console.error(error.value);
    return;
  }

  buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW,
  );

  const positionLoc = gl.getAttribLocation(program, "a_position");
  gl.enableVertexAttribArray(positionLoc);
  gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

  startTime = performance.now();
  ready.value = true;
  frameId = requestAnimationFrame(render);
  window.addEventListener("resize", resize);
  window.addEventListener("scroll", handleScroll, { passive: true });
  window.addEventListener("keydown", handleKeydown);
});

onMounted(() => {
  const handleLoad = () => {
    pageLoaded.value = true;
  };

  if (document.readyState === "complete") {
    handleLoad();
  } else {
    window.addEventListener("load", handleLoad, { once: true });
  }

  applyTheme();
  document.documentElement.setAttribute("lang", "en");
  prefersDark.addEventListener("change", handleSchemeChange);
  refreshScrollAnimations();
});

watch(siteReady, (isReady) => {
  if (isReady) {
    introTimeoutId = window.setTimeout(() => {
      topbarVisible.value = true;
    }, 180);
    pickFeaturedAssets();
  }
});

watch(theme, (value) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_THEME_KEY, value);
  }
  applyTheme();
});

onBeforeUnmount(() => {
  if (frameId) cancelAnimationFrame(frameId);
  if (introTimeoutId) window.clearTimeout(introTimeoutId);
  window.removeEventListener("resize", resize);
  window.removeEventListener("scroll", handleScroll);
  window.removeEventListener("keydown", handleKeydown);
  prefersDark.removeEventListener("change", handleSchemeChange);
  if (searchModalOpen.value) {
    closeSearchModal();
  }
  revealObserver.value?.disconnect();
  revealObserver.value = null;
  if (revealRaf) cancelAnimationFrame(revealRaf);
  if (gl && program) {
    gl.deleteProgram(program);
  }
  if (gl && buffer) {
    gl.deleteBuffer(buffer);
  }
  gl = null;
  program = null;
  buffer = null;
});
</script>
