<template>
  <PatternBackground
    class="dev-shell-pattern"
    :variant="PATTERN_BACKGROUND_VARIANT.Grid"
    size="lg"
    :direction="PATTERN_BACKGROUND_DIRECTION.Bottom"
    :speed="PATTERN_BACKGROUND_SPEED.Slow"
    mask="ellipse-center"
    :style="{
      '--pattern-line-color': 'rgba(255, 255, 255, 0.3)',
      '--pattern-grid-size': '34px',
      '--pattern-mask-position': 'center center'
    }"
  >
    <div class="dev-shell">
      
      <section class="hero-heading" :aria-label="t('heroAriaLabel')">
        <div class="hero-heading__inner" data-reveal="fade-up">
          <h1>
            <span class="orbitron-title">{{ t('heroTitleLead') }}</span>
            <span class="allura-title">{{ t('heroTitleName') }}</span>
          </h1>
          <p>{{ t('heroDescription') }}</p>
        </div>
      </section>

    </div>
  </PatternBackground>

  <div class="A2B">
    <section class="a2b-hero" :aria-label="t('teamSectionLabel')" data-reveal="fade-up">
      <h1>
        <span class="orbitron-title">Christopher Böhme</span>
        <span class="allura-title">{{ t('teamLabel') }}</span>
      </h1>
      <p class="a2b-description" data-reveal="fade" data-reveal-delay="0.08">{{ t('developersSubtitle') }}</p>
    </section>
    
    <div class="developer-controls" data-reveal="fade-up" data-reveal-delay="0.12">
      <button type="button" class="rainbow-button" data-cursor-hover @click="toggleFilterPanel">{{ t('filtersLabel') }}</button>
    </div>

    <transition-group id="deva" name="dev-card" tag="div" data-reveal-stagger="0.06">
      <article
        v-for="profile in filteredDevProfiles"
        :key="profile.__slug ?? `${profile.Info?.Name ?? profile.Title ?? 'dev'}-${profile.Rank ?? 'rank'}`"
        class="deva-card is-clickable"
        role="button"
        tabindex="0"
        :aria-label="t('openProfileLabel')"
        @click="openProfile(profile, 'dev')"
        @keydown.enter.prevent="openProfile(profile, 'dev')"
        @keydown.space.prevent="openProfile(profile, 'dev')"
        data-reveal="card"
        data-cursor-hover
      >
        <header class="deva-card__header">
          <p class="deva-title">
            {{ profile.Title ?? profile.Info?.Name ?? 'Unknown' }}
          </p>
        </header>

        <section v-if="experienceEntries(profile.Experience).length" class="deva-card__section">
          <p class="deva-key">{{ t('experienceLabel') }}</p>
          <p class="deva-text">
            <span
              v-for="([key, value], idx) in firstExperienceEntries(profile)"
              :key="`${profile.Info?.Name ?? profile.Title}-exp-${key}`"
            >
              {{ formatExperience(key, value) }}
              <span v-if="idx < firstExperienceEntries(profile).length - 1">
                &nbsp;|&nbsp;
              </span>
            </span>

              <span v-if="extraExperienceCount(profile)">
                &nbsp;|&nbsp;
              <span class="deva-more-inline">
                +{{ extraExperienceCount(profile) }} {{ t('moreLabel') }}
              </span>
            </span>
          </p>
        </section>


        <section v-if="profile.Commissions?.State" class="deva-card__section">
          <p class="deva-key">{{ t('commissionStateLabel') }}</p>
          <p class="deva-text">{{ translateCommissionState(profile.Commissions.State) }}</p>
        </section>
      </article>
    </transition-group>
    <p v-if="!devProfiles.length" class="placeholder" data-reveal="fade">{{ t('loadingDevelopers') }}</p>
    <p v-else-if="!filteredDevProfiles.length" class="placeholder" data-reveal="fade">{{ t('noDevelopersMatch') }}</p>
  </div>

  <div class="A2B">
    <section class="a2b-hero" :aria-label="t('curatorsSectionLabel')" data-reveal="fade-up">
      <h1>
        <span class="orbitron-title">Christopher Böhme</span>
        <span class="allura-title">{{ t('curatorsTitle') }}</span>
      </h1>
      <p class="a2b-description" data-reveal="fade" data-reveal-delay="0.08">
        {{ t('curatorsSubtitle') }}
      </p>
    </section>

    <div class="developer-controls" data-reveal="fade-up" data-reveal-delay="0.12">
      <button type="button" class="rainbow-button" data-cursor-hover @click="toggleCuratorFilterPanel">{{ t('filtersLabel') }}</button>
    </div>

    <transition-group id="curators" name="dev-card" tag="div" data-reveal-stagger="0.06">
      <article
        v-for="profile in filteredCuratorProfiles"
        :key="profile.__slug ?? `curator-${profile.Info?.Name ?? profile.Title ?? 'curator'}-${profile.Rank ?? 'rank'}`"
        class="deva-card is-clickable"
        role="button"
        tabindex="0"
        :aria-label="t('openProfileLabel')"
        @click="openProfile(profile, 'curator')"
        @keydown.enter.prevent="openProfile(profile, 'curator')"
        @keydown.space.prevent="openProfile(profile, 'curator')"
        data-reveal="card"
        data-cursor-hover
      >
        <header class="deva-card__header">
          <p class="deva-title">
            {{ profile.Title ?? profile.Info?.Name ?? 'Unknown' }}
          </p>
        </header>

        <section class="deva-card__section roles-section">
          <p class="deva-key">{{ t('rolesLabel') }}</p>
          <p class="deva-text">
            {{ translateRoleList(profile.Role) }}
          </p>
        </section>

        <section v-if="experienceEntries(profile.Experience).length" class="deva-card__section">
          <p class="deva-key">{{ t('experienceLabel') }}</p>
          <p class="deva-text">
            <span
              v-for="([key, value], idx) in firstExperienceEntries(profile)"
              :key="`${profile.Info?.Name ?? profile.Title}-exp-${key}`"
            >
              {{ formatExperience(key, value) }}
              <span v-if="idx < firstExperienceEntries(profile).length - 1">
                &nbsp;|&nbsp;
              </span>
            </span>

            <span v-if="extraExperienceCount(profile)">
              &nbsp;|&nbsp;
              <span class="deva-more-inline">
                +{{ extraExperienceCount(profile) }} {{ t('moreLabel') }}
              </span>
            </span>
          </p>
        </section>

        <section class="deva-card__section">
          <p class="deva-key">{{ t('discordRoleLabel') }}</p>
          <p class="deva-text">
            {{ translateRoleList(profile.Role) }}
          </p>
        </section>

        <section v-if="profile.Commissions?.State" class="deva-card__section">
          <p class="deva-key">{{ t('commissionStateLabel') }}</p>
          <p class="deva-text">{{ translateCommissionState(profile.Commissions.State) }}</p>
        </section>
      </article>
    </transition-group>
    <p v-if="!curatorProfiles.length" class="placeholder" data-reveal="fade">{{ t('loadingCurators') }}</p>
    <p v-else-if="!filteredCuratorProfiles.length" class="placeholder" data-reveal="fade">{{ t('noCuratorsMatch') }}</p>
  </div>

  <footer class="dev-footer" data-reveal="fade-up">
    <span>{{ t('footerCopyright') }}</span>
  </footer>

  <div
    class="filter-panel-backdrop"
    :data-open="filterPanelOpen"
    @click="closeFilterPanel"
  >
    <aside class="filter-panel" @click.stop>
      <header class="filter-panel__header">
        <div class="filter-panel__title">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M3 5h18M6 12h12M10 19h4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
          <span>{{ t('filtersLabel') }}</span>
        </div>
        <div class="filter-panel__meta">
          <span
            class="filter-panel__count"
            :data-state="filteredDevProfiles.length ? 'has' : 'empty'"
          >
            {{ filteredDevProfiles.length }} {{ formatResultsLabel(filteredDevProfiles.length) }}
          </span>
          <button type="button" class="panel-close" @click="closeFilterPanel" :aria-label="t('closeFiltersLabel')">×</button>
        </div>
      </header>
      <div class="filter-panel__search">
        <label>
          <span>{{ t('searchDevelopersLabel') }}</span>
          <input
            v-model="filterSearch"
            type="search"
            :placeholder="t('searchNameRole')"
            autocomplete="off"
            @keydown.stop
          />
        </label>
      </div>
      <div class="filter-panel__section">
        <p class="panel-section-title">{{ t('rankLabel') }}</p>
        <div class="panel-option-group">
          <button
            v-for="option in filterOptions"
            :key="option.value"
            type="button"
            class="panel-option"
            :aria-pressed="activeFilter === option.value"
            @click="selectFilter(option.value)"
          >
            {{ t(option.labelKey) }}
          </button>
        </div>
      </div>
      <div class="filter-panel__section">
        <p class="panel-section-title">{{ t('studioAspectLabel') }}</p>
        <div class="panel-option-group">
          <button
            v-for="aspect in aspectOptions"
            :key="aspect.value"
            type="button"
            class="panel-option"
            :data-state="activeAspects.includes(aspect.value) ? (filteredDevProfiles.length ? 'has' : 'empty') : ''"
            :aria-pressed="activeAspects.includes(aspect.value)"
            @click="selectAspect(aspect.value)"
          >
            {{ t(aspect.labelKey) }}
          </button>
        </div>
      </div>
    </aside>
  </div>

  <div
    class="filter-panel-backdrop"
    :data-open="curatorFilterPanelOpen"
    @click="closeCuratorFilterPanel"
  >
    <aside class="filter-panel" @click.stop>
      <header class="filter-panel__header">
        <div class="filter-panel__title">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M3 5h18M6 12h12M10 19h4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
          <span>{{ t('curatorFiltersLabel') }}</span>
        </div>
        <div class="filter-panel__meta">
          <span
            class="filter-panel__count"
            :data-state="filteredCuratorProfiles.length ? 'has' : 'empty'"
          >
            {{ filteredCuratorProfiles.length }} {{ formatResultsLabel(filteredCuratorProfiles.length) }}
          </span>
          <button type="button" class="panel-close" @click="closeCuratorFilterPanel" :aria-label="t('closeFiltersLabel')">×</button>
        </div>
      </header>
      <div class="filter-panel__search">
        <label>
          <span>{{ t('searchCuratorsLabel') }}</span>
          <input
            v-model="curatorFilterSearch"
            type="search"
            :placeholder="t('searchNameRole')"
            autocomplete="off"
            @keydown.stop
          />
        </label>
      </div>
      <div class="filter-panel__section">
        <p class="panel-section-title">{{ t('rankLabel') }}</p>
        <div class="panel-option-group">
          <button
            v-for="option in curatorFilterOptions"
            :key="option.value"
            type="button"
            class="panel-option"
            :aria-pressed="curatorActiveFilter === option.value"
            @click="selectCuratorFilter(option.value)"
          >
            {{ t(option.labelKey) }}
          </button>
        </div>
      </div>
      <div class="filter-panel__section">
        <p class="panel-section-title">{{ t('discordRoleLabel') }}</p>
        <div class="panel-option-group">
          <button
            v-for="role in curatorRoleOptions"
            :key="role.value"
            type="button"
            class="panel-option"
            :data-state="curatorActiveRoles.includes(role.value) ? (filteredCuratorProfiles.length ? 'has' : 'empty') : ''"
            :aria-pressed="curatorActiveRoles.includes(role.value)"
            @click="selectCuratorRole(role.value)"
          >
            {{ t(role.labelKey) }}
          </button>
        </div>
      </div>
    </aside>
  </div>

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

  <div
    id="topbarMain"
    v-if="!filtersLocked"
    :data-ready="topbarVisible"
    :data-locked="filtersLocked"
  >
      <h3>{{ t('heroTitle') }}</h3>
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
      <button id="hamburger" :aria-label="t('menuLabel')" :aria-expanded="menuOpen" :class="{ 'is-open': menuOpen }" @click.stop="toggleMenu">
        <span id="bar1"></span>
        <span id="bar2"></span>
        <span id="bar3"></span>
      </button>
      <div id="topbarMenu" :data-open="menuOpen" @pointermove="keepMenuOpen" @focusin="keepMenuOpen" @keydown="keepMenuOpen">
        <RouterLink to="/about" role="menuitem" data-cursor-hover @click="closeMenu">{{ t('topAbout') }}</RouterLink>
        <RouterLink to="/Team" role="menuitem" data-cursor-hover @click="closeMenu">Works</RouterLink>
        <RouterLink to="/opensource" role="menuitem" data-cursor-hover @click="closeMenu">{{ t('topAssets') }}</RouterLink>
        <RouterLink to="/reviews/" role="menuitem" data-cursor-hover @click="closeMenu">Reviews</RouterLink>
        <RouterLink to="/links" role="menuitem" data-cursor-hover @click="closeMenu">{{ t('pageLinks') }}</RouterLink>
        <RouterLink to="/credits/" role="menuitem" data-cursor-hover @click="closeMenu">Credits</RouterLink>
      </div>
    </div>

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
                            <svg v-else-if="page.slug === 'reviews'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 15a3 3 0 0 1-3 3H9l-5 3v-6a3 3 0 0 1-1-2.25V7a3 3 0 0 1 3-3h11a3 3 0 0 1 3 3Z"/><path d="M8 9h.01M12 9h.01M16 9h.01"/></svg>
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

<style>
@import url('https://fonts.googleapis.com/css2?family=Allura&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Orbitron:wght@400..900&family=Space+Grotesk:wght@300..700&display=swap');

.rainbow-button {
  --rb-1: hsl(0 100% 63%);
  --rb-2: hsl(270 100% 63%);
  --rb-3: hsl(210 100% 63%);
  --rb-4: hsl(195 100% 63%);
  --rb-5: hsl(90 100% 63%);
  --rb-speed: 2s;
  position: relative;
  isolation: isolate;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  height: 100%;
  min-height: 46px;
  padding: 0.7rem 1.9rem;
  min-width: 180px;
  border-radius: 0.95rem;
  border: 2px solid rgba(255, 255, 255, 0.08);
  font-weight: 500;
  font-size: 1.02rem;
  letter-spacing: 0.01em;
  color: #f8fafc;
  background: #030303;
  box-shadow:
    0 10px 28px rgba(0, 0, 0, 0.45);
  text-decoration: none;
  cursor: pointer;
  transition: transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease;
}

.rainbow-button::after {
  display: none;
}

.rainbow-button::before {
  content: none;
}

.rainbow-button.is-cursor-hover {
  transform: translateY(-1px) scale(1.01);
  box-shadow:
    0 12px 32px rgba(0, 0, 0, 0.6);
  border-color: rgba(255, 255, 255, 0.2);
}

.rainbow-button:active {
  transform: translateY(0) scale(1);
  box-shadow:
    0 8px 24px rgba(0, 0, 0, 0.5);
}

.rainbow-button:focus-visible {
  outline: 2px solid rgba(255, 255, 255, 0.35);
  outline-offset: 4px;
}

.rainbow-button:disabled {
  opacity: 0.55;
  cursor: not-allowed;
  transform: none;
  box-shadow:
    0 8px 20px rgba(0, 0, 0, 0.38),
    0 1px 0 rgba(255, 255, 255, 0.04) inset;
}

@keyframes rainbow {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 200% 0;
  }
}

#deva,
#curators{
  position: relative;
  width: min(92vw, 1200px);
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  padding: clamp(1rem, 3vw, 2.5rem) 0 clamp(2rem, 4vw, 3.5rem);
}

.dev-card-enter-from,
.dev-card-leave-to {
  opacity: 0;
  transform: translateY(16px);
}

.dev-card-enter-active,
.dev-card-leave-active {
  transition: opacity 280ms ease, transform 280ms ease;
}

.dev-card-move {
  transition: transform 280ms ease;
}

.deva-card {
  position: relative;
  overflow: hidden;
  height: auto;
  background: #000;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 1.25rem;
  box-shadow: 0 16px 45px rgba(0, 0, 0, 0.45);
  padding: clamp(1.1rem, 3vw, 1.6rem);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  flex: 1 1 260px;
  min-height: 300px;
  max-width: 100%;
  overflow: hidden;
  isolation: isolate;
  transition:
    transform 220ms ease,
    border-color 220ms ease,
    box-shadow 220ms ease,
    flex-basis 240ms ease,
    width 240ms ease;
}

.deva-card.is-clickable{
  cursor: pointer;
}

.deva-card.is-clickable:focus-visible{
  outline: 2px solid rgba(255, 255, 255, 0.6);
  outline-offset: 3px;
}

.deva-card::after {
  content: '';
  position: absolute;
  inset: -2px;
  background: radial-gradient(circle at 50% -20%, rgba(255, 255, 255, 0.15), transparent 60%);
  opacity: 0.35;
  pointer-events: none;
  z-index: 0!important;
  transition: opacity 220ms ease;
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.18),
    0 0 48px rgba(255, 255, 255, 0.28),
    0 0 96px rgba(255, 255, 255, 0.18),
    inset 0 0 0 1px rgba(255, 255, 255, 0.14);
}
.deva-card > * {
  position: relative;
  z-index: 1;
}



.deva-more-inline {
  color: rgba(255, 255, 255, 0.55);
  position: relative;
  cursor: default;
  white-space: nowrap;
}

.deva-more-inline::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: -2px;
  width: 100%;
  height: 1px;
  background: rgba(255, 255, 255, 0.45);
  transform: translateX(-50%) scaleX(0);
  transform-origin: center;
  transition: transform 260ms cubic-bezier(0.22, 0.8, 0.36, 1);
}

.deva-card.is-cursor-hover .deva-more-inline::after {
  transform: translateX(-50%) scaleX(1);
}

.deva-card.is-cursor-hover .deva-more-inline {
  color: rgba(255, 255, 255, 0.75);
}

.deva-card.is-cursor-hover {
  border-color: rgba(255, 255, 255, 0.55);
  transform: translateY(-5px);
}

.deva-card.is-cursor-hover::after {
  opacity: 0.35;
}

.deva-card__header,
.deva-card__section {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.roles-section {
  margin-top: 0.5rem;
}

.deva-key {
  margin: 0;
  font-size: 0.65rem;
  color: rgba(255, 255, 255, 0.65);
}

.deva-title {
  margin: 0;
  font-size: clamp(1.9rem, 4vw, 2.3rem);
  font-weight: 700;
  letter-spacing: 0;
  text-transform: none;
  color: #fff;
  font-family: 'Allura', cursive;
  position: relative;
}

.deva-title::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 14px;
  width: 99%;
  height: 1.5px;
  border-radius: 50px;
  background: linear-gradient(90deg, rgba(255,255,255,0.95), rgba(255,255,255,0.2));
  opacity: 0.9;
}

.deva-rank {
  margin: 0;
  font-size: 0.75rem;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.6);
}

.deva-text {
  margin: 0;
  font-size: 0.95rem;
  color: #fff;
  line-height: 1.4;
}

.deva-experience {
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.9rem;
  font-size: 0.95rem;
  color: #fff;
  line-height: 1.4;
}

.deva-experience-item {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
}

.deva-exp-comma {
  margin-left: 0.1rem;
  margin-right: 0.1rem;
  color: rgba(255, 255, 255, 0.8);
}

.deva-experience-separator {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #fff;
  opacity: 0.8;
  display: inline-block;
}

.deva-experience > span {
  white-space: nowrap;
}

.deva-more {
  margin-top: 0.1rem;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.45);
  align-self: flex-start;
  padding-left: 0.1rem;
  text-decoration: none;
  position: relative;
}

.deva-more::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -1px;
  width: 70px;
  height: 1px;
  background: #fff;
  opacity: 0.4;
}

body{
  overflow: hidden scroll;
}

.A2B{
  position: relative;
  width: 100%;
  background-color: #000;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: clamp(1rem, 3vw, 2.5rem);
}

.dev-footer{
  width: 100%;
  background: #000;
  display: flex;
  justify-content: center;
  padding: clamp(1.5rem, 4vw, 2.5rem) 1.5rem clamp(2.5rem, 6vw, 3.5rem);
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.85rem;
  letter-spacing: 0.02em;
}


.a2b-hero {
  display: flex;
  flex-direction: column;
  text-align: center;
  color: #fff;
}

.a2b-hero h1 {
  display: inline-flex;
  align-items: baseline;
  gap: 0.35rem clamp(1rem, 2.4vw, 1.8rem);
  flex-wrap: wrap;
  justify-content: center;
  text-align: center;
  text-wrap: balance;
  font-size: clamp(2.5rem, 6vw, 4rem);
  margin: 0!important; padding: 0!important;
}

.a2b-description {
  transform: translateY(-20px)!important;
  max-width: min(90vw, 760px);
  text-align: center;
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.85);
}

.developer-controls {
  width: min(92vw, 1200px);
  display: flex;
  justify-content: center;
  padding: 0 clamp(2rem, 5vw, 3rem);
  margin-top: 0;
  position: relative; /* lift above the floating topbar when they cross paths */
  z-index: 10;
}

.filter-panel-trigger {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.55rem 1.2rem;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.35);
  background: #030303;
  color: #fff;
  font-family: 'Space Grotesk', system-ui, sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  cursor: pointer;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.45);
  transition: border-color 200ms ease, transform 220ms ease;
}

.filter-panel-trigger svg {
  width: 18px;
  height: 18px;
}

.filter-panel-trigger.is-cursor-hover {
  border-color: rgba(255, 255, 255, 0.7);
  transform: translateY(-1px);
}

.filter-panel-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  opacity: 0;
  pointer-events: none;
  transition: opacity 200ms ease;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  z-index: 999;
}

.filter-panel-backdrop[data-open='true'] {
  opacity: 1;
  pointer-events: auto;
}

.filter-panel {
  position: fixed;
  top: 0;
  left: 0;
  width: min(360px, 84vw);
  height: 100vh;
  background: linear-gradient(180deg, rgba(8, 8, 9, 0.98) 0%, rgba(5, 5, 6, 0.96) 40%, rgba(3, 3, 4, 0.94) 100%);
  border-right: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 0;
  padding: calc(1.2rem + env(safe-area-inset-top)) calc(1.5rem + env(safe-area-inset-right)) clamp(1.2rem, 3vw, 1.6rem) calc(1.5rem + env(safe-area-inset-left));
  overflow-y: auto;
  overscroll-behavior: contain;
  box-shadow: 0 28px 60px rgba(0, 0, 0, 0.65);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  animation: slideIn 260ms ease;
  z-index: 4100;
}

.filter-panel header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.filter-panel__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}

.filter-panel__title {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.05rem;
  font-weight: 700;
  letter-spacing: 0.01em;
  text-transform: none;
  color: #fff;
}

.filter-panel__title svg {
  width: 18px;
  height: 18px;
  color: #fff;
}

.filter-panel__meta {
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
}

.panel-close {
  background: transparent;
  border: none;
  color: #fff;
  font-size: 1.5rem;
  cursor: pointer;
}

.filter-panel__search label {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  font-size: 0.72rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.7);
}

.filter-panel__count {
  margin: 0.6rem 0 0;
  font-size: 0.9rem;
  color: #fff;
  letter-spacing: 0.015em;
}

.filter-panel__search input {
  width: 100%;
  padding: 0.45rem 0.6rem;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
  font-family: 'Space Grotesk', system-ui, sans-serif;
  outline: none;
  box-shadow: none;
}

.filter-panel__section {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.panel-section-title {
  margin: 0;
  font-size: 0.65rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.7);
}

.panel-option-group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.panel-option {
  width: 100%;
  padding: 0.7rem 1rem;
  border-radius: 13px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.02);
  color: #fff;
  font-family: 'Space Grotesk', system-ui, sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  text-align: left;
  cursor: pointer;
  transition: transform 220ms ease, border-color 240ms ease, color 240ms ease, background-position 2.2s ease;
  background-size: 200%;
}

.panel-option[aria-pressed='true'] {
  border-color: rgba(255, 255, 255, 0.5);
  background: rgba(255, 255, 255, 0.1);
}

.panel-option[data-state='has'][aria-pressed='true'] {
  border-color: rgba(52, 211, 153, 0.7);
  color: #d1fae5;
  background: linear-gradient(120deg, rgba(16, 185, 129, 0.32), rgba(16, 185, 129, 0.12));
  animation: thinkingGreen 2.4s ease-in-out infinite;
  background-size: 200%;
}

.panel-option[data-state='empty'][aria-pressed='true'] {
  border-color: rgba(239, 68, 68, 0.7);
  color: #fecdd3;
  background: linear-gradient(120deg, rgba(248, 113, 113, 0.28), rgba(248, 113, 113, 0.12));
  animation: thinkingRed 2.4s ease-in-out infinite;
  background-size: 200%;
}

.filter-panel__count[data-state='has'] {
  color: #a7f3d0;
}

.filter-panel__count[data-state='empty'] {
  color: #fecdd3;
}

@keyframes thinkingGreen {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes thinkingRed {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.filter-panel-backdrop:not([data-open='true']) .filter-panel {
  pointer-events: none;
}

@keyframes slideIn {
  from {
    transform: translateX(-20px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
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

.dev-shell {
  position: relative;
  min-height: 100vh;
  padding: 6rem clamp(1rem, 3vw, 2rem) 3rem;
  color: #e2e8f0;
  background: transparent;
  z-index: 1;
}

.dev-shell::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: min(220px, 30vh);
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.35) 40%,
    rgba(0, 0, 0, 0.75) 70%,
    rgba(0, 0, 0, 0.95) 100%
  );
  pointer-events: none;
  z-index: 0;
}

.hero-heading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  z-index: 1;
  pointer-events: none;
  width: 100%;
}

.hero-heading h1 {
  display: inline-flex;
  align-items: baseline;
  gap: 0.35rem clamp(0.9rem, 2vw, 1.4rem);
  flex-wrap: wrap;
  justify-content: center;
  text-align: center;
  text-wrap: balance;
  font-size: clamp(2.5rem, 6vw, 4rem);
  margin: 0;
}

.orbitron-title {
  font-family: 'Orbitron', sans-serif;
  font-weight: 800;
  letter-spacing: 0.35rem;
  text-transform: uppercase;
}

.allura-title {
  font-family: 'Allura', cursive;
  font-size: clamp(2.7rem, 6vw, 4.5rem);
  font-weight: 400;
  margin-left: 0;
  display: inline-block;
  text-wrap: balance;
}

.hero-heading__inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
}

.hero-heading__inner p {
  color: rgba(255, 255, 255, 0.75);
  font-size: clamp(1rem, 2vw, 1.2rem);
  max-width: 520px;
  margin: 0;
  line-height: 1.6;
  pointer-events: none;
}

.developer-panel {
  margin-top: 6rem;
  padding: 0 1rem 3rem;
  width: 100%;
  position: relative;
  z-index: 1;
}

.developer-panel header {
  text-align: center;
  margin-bottom: 2rem;
  color: rgba(255, 255, 255, 0.78);
}

.developer-panel h2 {
  font-size: clamp(1.8rem, 4vw, 2.4rem);
  margin-bottom: 0.35rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

.developer-panel p {
  margin: 0 auto;
  max-width: 620px;
  font-size: 1rem;
}

.developer-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
}

.developer-card {
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 16px;
  padding: 1rem;
  background: rgba(2, 5, 11, 0.7);
  box-shadow: 0 25px 45px rgba(0, 0, 0, 0.35);
}

.developer-card__header {
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
  align-items: baseline;
}

.developer-card__title {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 700;
}

.developer-card__rank {
  margin: 0;
  letter-spacing: 0.2em;
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.4);
  text-transform: uppercase;
}

.developer-card__roles {
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.6);
}

.developer-card__meta {
  margin: 1rem 0 0;
}

.developer-card__meta-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  padding: 0.2rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.developer-card__meta-row:last-child {
  border-bottom: none;
}

.developer-card__meta-row dt {
  font-weight: 600;
  color: rgba(255, 255, 255, 0.7);
}

.developer-card__meta-row dd {
  margin: 0;
  text-align: right;
}

.developer-card__section {
  margin-top: 1rem;
}

.section-label {
  font-size: 0.7rem;
  letter-spacing: 0.4em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.4);
  margin-bottom: 0.4rem;
}

.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.tag {
  padding: 0.3rem 0.6rem;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
}

.developer-card__section ul {
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: 0.85rem;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.developer-card__section li {
  display: flex;
  gap: 0.4rem;
  align-items: center;
}

.meta-key {
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.6);
}

.dev-shell-pattern {
  width: 100%;
  min-height: 100vh;
  --pattern-line-color: rgba(255, 255, 255, 0.065);
  --pattern-grid-size: 32px;
  --pattern-mask-position: 50% 50%;
}

:global(:root) {
  --ui-bg: rgba(255, 255, 255, 0.85);
  --ui-border: rgba(0, 0, 0, 0.12);
  --ui-text: #0f172a;
  --card-bg: #f8fafc;
  --overlay-bg: rgba(255, 255, 255, 0.35);
  --kbd-border: rgba(15, 23, 42, 0.2);
  --kbd-bg: rgba(15, 23, 42, 0.05);
  --input-border: rgba(15, 23, 42, 0.14);
}

:global([data-theme='dark']) {
  --ui-bg: rgba(255, 255, 255, 0.07);
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
  transform: translate(-50%, -140%);
  width: min(92vw, 48rem);
  z-index: 900; /* sit behind the filters bar */
  padding: 0.35rem 0.75rem;

  display: grid;
  grid-template-columns: auto 1fr auto auto;
  align-items: center;
  gap: 0.75rem;
  border: 1px solid var(--ui-border);
  border-radius: 1rem;
  background-color: var(--ui-bg);
  backdrop-filter: blur(6px) saturate(120%);
  overflow: visible;
  box-shadow:
    0 12px 44px rgba(0, 0, 0, 0.38),
    0 2px 0 rgba(255, 255, 255, 0.04) inset;

  opacity: 0;
  transition:
    transform 820ms cubic-bezier(.17, .99, .42, 1.19),
    opacity 320ms ease;
}

#topbarMain[data-locked='true'] {
  pointer-events: none;
  filter: blur(3px);
  opacity: 0;
  transform: translate(-50%, -24px) scale(0.98);
}

#topbarMenu {
  position: absolute;
  top: 110%;
  right: 12px;
  min-width: 180px;
  padding: 0.6rem;
  background: var(--ui-bg);
  border: 1px solid var(--ui-border);
  border-radius: 12px;
  box-shadow:
    0 16px 38px rgba(0, 0, 0, 0.12),
    inset 0 1px 0 rgba(255, 255, 255, 0.12);
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

#topbarMenu a {
  color: var(--ui-text);
  text-decoration: none;
  padding: 0.45rem 0.55rem;
  border-radius: 10px;
  font-family: 'Space Grotesk', system-ui, sans-serif;
  font-size: 0.95rem;
  transition: background-color 140ms ease, transform 140ms ease;
}

#topbarMenu a.is-cursor-hover {
  background: rgba(255, 255, 255, 0.08);
  transform: translateX(2px);
}

#topbarMenu[data-open='true'] {
  opacity: 1;
  transform: translateY(0) scale(1);
  pointer-events: auto;
}

#topbarMain[data-ready='true'] {
  transform: translate(-50%, 0);
  opacity: 1;
  animation: dropIn 780ms cubic-bezier(.21, 1.01, .32, 1.02);
}

@keyframes dropIn {
  0% {
    transform: translate(-50%, -140%) scale(0.96);
    filter: blur(3px);
  }
  62% {
    transform: translate(-50%, 6%) scale(1.02);
  }
  84% {
    transform: translate(-50%, -2%) scale(0.998);
  }
  100% {
    transform: translate(-50%, 0) scale(1);
    filter: blur(0);
  }
}

#topbarMain h3 {
  font-family: Orbitron, Space Grotesk, -apple-system, sans-serif;
  font-weight: 800;
  font-size: 1.1rem;
  letter-spacing: 0.14rem;
  color: var(--ui-text);
}

.top-search {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 0.5rem;
  width: min(520px, 100%);
  height: 42px;
  padding: 0.35rem 0.6rem 0.35rem 0.52rem;
  border: 1px solid var(--ui-border);
  border-radius: 12px;
  background: transparent;
  color: var(--ui-text);
  justify-self: center;
}

.top-search svg {
  width: 18px;
  height: 18px;
  opacity: 0.9;
  align-self: center;
}

.top-search input {
  height: 100%;
  width: 100%;
  background: transparent;
  border: none;
  outline: none;
  color: var(--ui-text);
  font-family: 'Space Grotesk', system-ui, sans-serif;
  font-size: 0.94rem;
  line-height: 1.2;
  caret-color: var(--ui-text);
}

.kbd-hint {
  display: inline-flex;
  gap: 0.2rem;
  align-self: center;
}

.kbd {
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

#hamburger {
  position: relative;
  justify-self: end;
  width: 34px;
  aspect-ratio: 1 / 1;
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

#hamburger span {
  width: 100%;
  height: 2px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.95);
  opacity: 0;
  animation: barSlideIn 520ms ease forwards;
  margin-left: 0;
  transform-origin: left center;
  transition: width 180ms ease, transform 160ms ease, opacity 160ms ease;
}

#bar1 {
  animation-delay: 0ms;
}

#bar2 {
  animation-delay: 140ms;
}

#bar3 {
  animation-delay: 280ms;
}

@keyframes barSlideIn {
  0% {
    opacity: 0;
    transform: translateX(8px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

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
  z-index: 99950;
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
  font-family: 'Space Grotesk', system-ui, sans-serif;
  font-size: 1rem;
}

.modal-kbd{
  margin-left: auto;
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

.theme-option.is-cursor-hover{
  border-color: var(--ui-border);
}

.theme-option[data-selected="true"]{
  border-color: var(--ui-text);
  color: var(--ui-text);
  font-weight: 700;
}

#Pages,
#Projects{
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
  opacity: 1;
}

.page-option.is-cursor-hover{
  border-bottom-color: rgba(255, 255, 255, 0.16);
  opacity: 1;
}

.page-inner{
  width: 100%;
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  transform: translateX(0);
  transition: transform 200ms cubic-bezier(0.22, 0.8, 0.36, 1);
}

.page-option.is-cursor-hover .page-inner,
.page-option:hover .page-inner{
  transform: translateX(4px);
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
}

.lang-option.is-cursor-hover{
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

.lang-option.is-cursor-hover .lang-inner,
.theme-option.is-cursor-hover .lang-inner{
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

.header-flag{
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.header-flag-icon{
  transition: opacity 200ms ease;
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

.theme-flag{
  width: 18px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: transform 200ms cubic-bezier(0.22, 0.8, 0.36, 1), filter 200ms ease;
}

.theme-option.is-cursor-hover .theme-flag{
  transform: translateX(2px) scale(1.05);
}

.lang-list,
.theme-list,
.page-list{
  overflow: hidden;
}

.backstack {
  margin: 1rem 0 2rem;
  padding: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 1rem;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(8px);
}

.back-links {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-top: 0.5rem;
}

.back-link {
  padding: 0.5rem 0.85rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: #e2e8f0;
  font-weight: 600;
}

.placeholder {
  padding: 2rem 1rem;
  border-radius: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.02);
  text-align: left;
}

.placeholder h1 {
  margin-bottom: 0.5rem;
}

.eyebrow {
  font-size: 0.8rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #22d3ee;
}

.history-list {
  margin-top: 1rem;
  display: grid;
  gap: 0.5rem;
}

.history-title {
  font-weight: 700;
  color: #e2e8f0;
}

.history-item {
  text-align: left;
  padding: 0.65rem 0.75rem;
  border-radius: 0.8rem;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.04);
  color: #e2e8f0;
  cursor: pointer;
}

.muted {
  color: #94a3b8;
}

.reveal-on-scroll {
  opacity: 0;
  transform: translateY(16px);
  filter: blur(6px);
  transition:
    opacity 700ms cubic-bezier(0.22, 0.8, 0.36, 1) var(--reveal-delay, 0s),
    transform 700ms cubic-bezier(0.22, 0.8, 0.36, 1) var(--reveal-delay, 0s),
    filter 700ms ease var(--reveal-delay, 0s),
    border-color 220ms ease,
    box-shadow 220ms ease;
  will-change: transform, opacity, filter;
}

.reveal-on-scroll.is-visible {
  opacity: 1;
  transform: translateY(0);
  filter: blur(0);
}

[data-reveal='fade'] {
  transform: none;
}

[data-reveal='slide-left'] {
  transform: translateX(-26px);
}

[data-reveal='slide-right'] {
  transform: translateX(26px);
}

[data-reveal='scale'] {
  transform: scale(0.965);
}

[data-reveal='card'] {
  transform: translateY(16px);
  filter: blur(8px);
}

@media (prefers-reduced-motion: reduce) {
  .reveal-on-scroll {
    opacity: 1;
    transform: none;
    filter: none;
    transition: none;
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

<script lang="ts" setup>
import { computed, h, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import SmoothCursor from '../components/SmoothCursor.vue';
import { matchesSearch } from '@/lib/searchMatch';
import { useAutoCloseMenu } from '@/lib/useAutoCloseMenu';
import PatternBackground from '../components/ui/pattern-background/PatternBackground.vue';
import {
  PATTERN_BACKGROUND_DIRECTION,
  PATTERN_BACKGROUND_SPEED,
  PATTERN_BACKGROUND_VARIANT,
} from '../components/ui/pattern-background';

const devFiles = import.meta.glob('../assets/json data/devs/*.json', { query: '?json' });
const curatorFiles = import.meta.glob('../assets/json data/curators/*.json', { query: '?json' });

const HISTORY_KEY = 'zantixHistory';
const STORAGE_THEME_KEY = 'zantixTheme';
interface HistoryEntry {
  path: string;
  label: string;
}

type InfoValue = string | string[] | null | undefined;

interface DevProfile {
  Title?: string;
  Rank?: string;
  Info?: {
    Name?: string;
  };
  Role?: string[];
  Experience?: Record<string, InfoValue>;
  Commissions?: {
    State?: string;
  };
  __slug?: string;
  __group?: 'dev' | 'curator';
}

const readStoredTheme = (): 'system' | 'light' | 'dark' | null => {
  if (typeof window === 'undefined') return null;
  const stored = localStorage.getItem(STORAGE_THEME_KEY) ?? localStorage.getItem('zantix-theme');
  if (stored === 'system' || stored === 'light' || stored === 'dark') return stored;
  return null;
};



const pages = [
  { slug: "home", label: "Home", href: "/" },
  { slug: "about", label: "About me", href: "/about" },
  { slug: "assets", label: "Open Source", href: "/opensource" },
  { slug: "developers", label: "Works", href: "/Team" },
  { slug: "links", label: "Links", href: "/links" },
  { slug: "reviews", label: "Reviews", href: "/reviews/" },
  { slug: "credits", label: "Credits", href: "/credits/" },
];

const themeOptions = [
  { value: 'system', label: 'System' },
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
] as const;

const translations: Record<string, Record<string, string>> = {
  en: {
    topAbout: 'About me',
    topAssets: 'Open Source',
    topDevelopers: 'Works',
    topTOS: 'TOS',
    searchPlaceholder: "Search",
    searchMain: "Search",
    searchLabel: 'Search',
    menuLabel: 'Menu',
    heroTitle: 'Christopher Böhme',
    heroSubtitle: 'Power your studio with pro assets',
    heroTitleLead: 'Meet the',
    heroTitleName: 'Team',
    teamLabel: 'Team',
    heroAriaLabel: 'Meet the team',
    teamSectionLabel: 'Team',
    curatorsSectionLabel: 'Curators',
    heroDescription: 'Scripts, UI, animation, models, and curation by Christopher Böhme.',
    heroBtnAssets: 'Assets',
    heroBtnDevelopers: 'Works',
    shipWith: 'Publish with',
    feature1Title: 'Drop-in Ready',
    feature1Desc: 'Designed to work out of the box with minimal setup or adjustment',
    feature2Title: 'Ongoing Releases',
    feature2Desc: 'New assets and templates are added regularly as the library grows over time',
    feature3Title: 'Real-Time Support',
    feature3Desc: 'Support for your questions or setup',
    themeLabel: 'Theme',
    pagesLabel: 'Pages',
    pageHome: 'Home',
    pageAssets: "Open Source",
    pageDevelopers: 'Works',
    pageLinks: 'Links',
    pageTOS: 'TOS',
    confidence: 'confidence',
    precision: 'precision',
    consistency: 'consistency',
    stability: 'stability',
    historyTitle: 'Recent pages',
    historySearchTitle: 'History matches',
    developersTitle: 'Team',
    footerCopyright: '© 2026 Christopher Böhme',
    developersSubtitle: 'Scripts, UI, animation, models, curation—this crew builds it all.',
    curatorsTitle: 'Curators',
    curatorsSubtitle: 'Quality, style, and consistency—this team curates the library.',
    filtersLabel: 'Filters',
    openProfileLabel: 'Open profile',
    curatorFiltersLabel: 'Curator Filters',
    searchDevelopersLabel: 'Search developers',
    searchCuratorsLabel: 'Search curators',
    searchNameRole: 'Name or role',
    rankLabel: 'Rank',
    studioAspectLabel: 'Studio Aspect',
    discordRoleLabel: 'Discord Role',
    rolesLabel: 'Roles',
    commissionStateLabel: 'Commission State',
    notListed: 'Not listed',
    moreLabel: 'more',
    loadingDevelopers: 'Loading developer info…',
    noDevelopersMatch: 'No developers match this filter.',
    loadingCurators: 'Loading curator info…',
    noCuratorsMatch: 'No curators match this filter.',
    resultSingle: 'result',
    resultPlural: 'results',
    filterAllDevelopers: 'All developers',
    filterHighRank: 'High rank',
    filterLowRank: 'Low rank',
    filterAllCurators: 'All curators',
    rankOptionA: 'Rank A',
    rankOptionB: 'Rank B',
    rankOptionC: 'Rank C',
    rankOptionD: 'Rank D',
    rankOptionE: 'Rank E',
    aspectAll: 'All aspects',
    aspectUI: 'UI',
    aspectBuilding: 'Building',
    aspectScripting: 'Scripting',
    aspectOther: 'Other',
    roleAll: 'All roles',
    roleDirector: 'Director',
    rolePlanner: 'Planner',
    roleLeadDeveloper: 'Lead Developer',
    roleAssetCreator: 'Asset Creator',
    roleAdmin: 'Admin',
    roleHelper: 'Helper',
    roleContributor: 'Contributor',
    closeFiltersLabel: 'Close filters',
    experienceLabel: 'Experience',
    contactLabel: 'Contact',
  },
};

const t = (key: string) => translations.en[key] ?? key;

type TranslationDictionary = {
  roles: Record<string, string>;
  experience: Record<string, string>;
  commissionState: Record<string, string>;
  units: Record<string, string>;
};

const dictionaries: Record<string, TranslationDictionary> = {
  en: {
    roles: {},
    experience: {
      role: 'Role',
    },
    commissionState: {
      open: 'Open',
      closed: 'Closed',
    },
    units: {
      year: 'year',
      years: 'years',
      month: 'month',
      months: 'months',
      day: 'day',
      days: 'days',
    },
  },
  de: {
    roles: {
      builder: 'Builder',
      'terrain editor': 'Terrain-Editor',
      'robloxstudio modeling': 'RobloxStudio-Modellierung',
      'roblox studio modeling': 'RobloxStudio-Modellierung',
      modeling: 'Modellierung',
      ui: 'UI',
      scripting: 'Scripting',
      director: 'Direktor',
      planner: 'Planer',
      'lead developer': 'Lead Developer',
      'asset creator': 'Asset Creator',
      admin: 'Admin',
      helper: 'Helfer',
      contributor: 'Mitwirkender',
    },
    experience: {
      building: 'Bau',
      'terrain editor': 'Terrain-Editor',
      'robloxstudio modeling': 'RobloxStudio-Modellierung',
      'roblox studio modeling': 'RobloxStudio-Modellierung',
      modeling: 'Modellierung',
      ui: 'UI',
      scripting: 'Scripting',
      role: 'Rolle',
    },
    commissionState: {
      open: 'Offen',
      closed: 'Geschlossen',
    },
    units: {
      year: 'Jahr',
      years: 'Jahre',
      month: 'Monat',
      months: 'Monate',
      day: 'Tag',
      days: 'Tage',
    },
  },
  fr: {
    roles: {
      builder: 'Constructeur',
      'terrain editor': 'Éditeur de terrain',
      'robloxstudio modeling': 'Modélisation RobloxStudio',
      'roblox studio modeling': 'Modélisation RobloxStudio',
      modeling: 'Modélisation',
      ui: 'Interface',
      scripting: 'Script',
      director: 'Directeur',
      planner: 'Planificateur',
      'lead developer': 'Lead Developer',
      'asset creator': "Créateur d'assets",
      admin: 'Admin',
      helper: 'Assistant',
      contributor: 'Contributeur',
    },
    experience: {
      building: 'Construction',
      'terrain editor': 'Éditeur de terrain',
      'robloxstudio modeling': 'Modélisation RobloxStudio',
      'roblox studio modeling': 'Modélisation RobloxStudio',
      modeling: 'Modélisation',
      ui: 'Interface',
      scripting: 'Script',
      role: 'Rôle',
    },
    commissionState: {
      open: 'Ouvert',
      closed: 'Fermé',
    },
    units: {
      year: 'an',
      years: 'ans',
      month: 'mois',
      months: 'mois',
      day: 'jour',
      days: 'jours',
    },
  },
  bg: {
    roles: {
      builder: 'Строител',
      'terrain editor': 'Теренен редактор',
      'robloxstudio modeling': 'Моделиране в RobloxStudio',
      'roblox studio modeling': 'Моделиране в RobloxStudio',
      modeling: 'Моделиране',
      ui: 'Интерфейс',
      scripting: 'Скриптиране',
      director: 'Директор',
      planner: 'Планьор',
      'lead developer': 'Водещ разработчик',
      'asset creator': 'Създател на ресурси',
      admin: 'Админ',
      helper: 'Помощник',
      contributor: 'Сътрудник',
    },
    experience: {
      building: 'Строителство',
      'terrain editor': 'Теренен редактор',
      'robloxstudio modeling': 'Моделиране в RobloxStudio',
      'roblox studio modeling': 'Моделиране в RobloxStudio',
      modeling: 'Моделиране',
      ui: 'Интерфейс',
      scripting: 'Скриптиране',
      role: 'Роля',
    },
    commissionState: {
      open: 'Отворено',
      closed: 'Затворено',
    },
    units: {
      year: 'година',
      years: 'години',
      month: 'месец',
      months: 'месеца',
      day: 'ден',
      days: 'дни',
    },
  },
  zh: {
    roles: {
      builder: '建造',
      'terrain editor': '地形编辑',
      'robloxstudio modeling': 'RobloxStudio 建模',
      'roblox studio modeling': 'RobloxStudio 建模',
      modeling: '建模',
      ui: '界面',
      scripting: '脚本',
      director: '主管',
      planner: '策划',
      'lead developer': '首席开发',
      'asset creator': '资产创作者',
      admin: '管理员',
      helper: '助手',
      contributor: '贡献者',
    },
    experience: {
      building: '建造',
      'terrain editor': '地形编辑',
      'robloxstudio modeling': 'RobloxStudio 建模',
      'roblox studio modeling': 'RobloxStudio 建模',
      modeling: '建模',
      ui: '界面',
      scripting: '脚本',
      role: '角色',
    },
    commissionState: {
      open: '开放',
      closed: '关闭',
    },
    units: {
      year: '年',
      years: '年',
      month: '个月',
      months: '个月',
      day: '天',
      days: '天',
    },
  },
  nl: {
    roles: {
      builder: 'Bouwer',
      'terrain editor': 'Terreineditor',
      'robloxstudio modeling': 'RobloxStudio-modellering',
      'roblox studio modeling': 'RobloxStudio-modellering',
      modeling: 'Modellering',
      ui: 'UI',
      scripting: 'Scripting',
      director: 'Directeur',
      planner: 'Planner',
      'lead developer': 'Lead Developer',
      'asset creator': 'Asset-maker',
      admin: 'Admin',
      helper: 'Helper',
      contributor: 'Bijdrager',
    },
    experience: {
      building: 'Bouw',
      'terrain editor': 'Terreineditor',
      'robloxstudio modeling': 'RobloxStudio-modellering',
      'roblox studio modeling': 'RobloxStudio-modellering',
      modeling: 'Modellering',
      ui: 'UI',
      scripting: 'Scripting',
      role: 'Rol',
    },
    commissionState: {
      open: 'Open',
      closed: 'Gesloten',
    },
    units: {
      year: 'jaar',
      years: 'jaar',
      month: 'maand',
      months: 'maanden',
      day: 'dag',
      days: 'dagen',
    },
  },
};

const normalizeToken = (value: string) =>
  value.trim().toLowerCase().replace(/\s+/g, ' ');
const getDictionary = () => dictionaries.en;
const translateToken = (value: string, map: Record<string, string>) =>
  map[normalizeToken(value)] ?? value;

const translateUnits = (value: string) => {
  const dict = getDictionary();
  return value.replace(/\b(years?|months?|days?)\b/gi, (match) => {
    const replacement = dict.units[normalizeToken(match)];
    return replacement ?? match;
  });
};

const translateExperienceValue = (value: InfoValue) => {
  if (!value) return t('notListed');
  const dict = getDictionary();
  if (Array.isArray(value)) {
    if (!value.length) return t('notListed');
    return value
      .map((entry) => translateToken(entry, dict.experience))
      .map((entry) => translateUnits(entry))
      .join(', ');
  }
  if (typeof value === 'string') {
    if (normalizeToken(value) === 'n/a') return t('notListed');
    const translated = translateToken(value, dict.experience);
    return translateUnits(translated);
  }
  return String(value);
};

const translateRoleList = (roles?: string[]) => {
  if (!roles?.length) return t('notListed');
  const dict = getDictionary();
  return roles.map((role) => translateToken(role, dict.roles)).join(', ');
};

const translateCommissionState = (state?: string) => {
  if (!state) return t('notListed');
  const dict = getDictionary();
  return translateToken(state, dict.commissionState);
};

const formatResultsLabel = (count: number) =>
  count === 1 ? t('resultSingle') : t('resultPlural');


const formatExperience = (key: string, value: InfoValue) => {
  const label = translateToken(key, getDictionary().experience);
  return `${label} · ${translateExperienceValue(value)}`;
};

const route = useRoute();
const router = useRouter();

const topbarVisible = ref(false);
const menuOpen = ref(false);
const { closeMenu, keepMenuOpen, toggleMenu } = useAutoCloseMenu(menuOpen);
const searchModalOpen = ref(false);
const searchQuery = ref('');
const historyList = ref<HistoryEntry[]>([]);
const searchInput = ref<HTMLInputElement | null>(null);
const modalSearchInput = ref<HTMLInputElement | null>(null);
const devProfiles = ref<DevProfile[]>([]);
const curatorProfiles = ref<DevProfile[]>([]);
const siteReady = ref(false);
const hasReachedBottom = ref(false);
const revealObserver = ref<IntersectionObserver | null>(null);
let revealRaf = 0;

const applyScrollAnimations = () => {
  if (typeof window === 'undefined') return;
  const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
  if (!elements.length) {
    revealObserver.value?.disconnect();
    revealObserver.value = null;
    return;
  }

  elements.forEach((el) => {
    el.classList.add('reveal-on-scroll');
  });

  const setDelay = (el: HTMLElement, delay: number) => {
    if (Number.isNaN(delay)) return;
    if (el.style.getPropertyValue('--reveal-delay')) return;
    el.style.setProperty('--reveal-delay', `${delay}s`);
  };

  elements.forEach((el) => {
    const delayValue = el.dataset.revealDelay;
    if (!delayValue) return;
    const delay = Number.parseFloat(delayValue);
    if (!Number.isNaN(delay)) {
      setDelay(el, delay);
    }
  });

  document.querySelectorAll<HTMLElement>('[data-reveal-stagger]').forEach((parent) => {
    const step = Number.parseFloat(parent.dataset.revealStagger || '0.06');
    if (Number.isNaN(step)) return;
    const kids = Array.from(parent.querySelectorAll<HTMLElement>('[data-reveal]'));
    kids.forEach((kid, idx) => {
      if (kid.dataset.revealDelay) return;
      setDelay(kid, idx * step);
    });
  });

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion || !('IntersectionObserver' in window)) {
    elements.forEach((el) => el.classList.add('is-visible'));
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
        el.classList.add('is-visible');
        if (el.dataset.revealOnce !== 'false') {
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.01, rootMargin: '0px 0px 0px 0px' },
  );
  revealObserver.value = observer;
  elements.forEach((el) => observer.observe(el));
};

const refreshScrollAnimations = () => {
  if (typeof window === 'undefined') return;
  if (revealRaf) cancelAnimationFrame(revealRaf);
  revealRaf = requestAnimationFrame(() => {
    revealRaf = 0;
    applyScrollAnimations();
  });
};
const experienceEntries = (experience?: Record<string, InfoValue>) =>
  experience ? Object.entries(experience) : [];
const filterOptions = [
  { value: 'all', labelKey: 'filterAllDevelopers' },
  { value: 'H', labelKey: 'filterHighRank' },
  { value: 'L', labelKey: 'filterLowRank' },
] as const;
type FilterValue = (typeof filterOptions)[number]['value'];
const activeFilter = ref<FilterValue>('all');

const curatorFilterOptions = [
  { value: 'all', labelKey: 'filterAllCurators' },
  { value: 'A', labelKey: 'rankOptionA' },
  { value: 'B', labelKey: 'rankOptionB' },
  { value: 'C', labelKey: 'rankOptionC' },
  { value: 'D', labelKey: 'rankOptionD' },
  { value: 'E', labelKey: 'rankOptionE' },
] as const;
type CuratorFilterValue = (typeof curatorFilterOptions)[number]['value'];
const curatorActiveFilter = ref<CuratorFilterValue>('all');

const aspectOptions = [
  { value: 'all', labelKey: 'aspectAll' },
  { value: 'ui', labelKey: 'aspectUI' },
  { value: 'building', labelKey: 'aspectBuilding' },
  { value: 'scripting', labelKey: 'aspectScripting' },
  { value: 'other', labelKey: 'aspectOther' },
] as const;
type AspectValue = (typeof aspectOptions)[number]['value'];
const activeAspects = ref<AspectValue[]>(['all']);

const curatorRoleOptions = [
  { value: 'all', labelKey: 'roleAll' },
  { value: 'director', labelKey: 'roleDirector' },
  { value: 'planner', labelKey: 'rolePlanner' },
  { value: 'lead', labelKey: 'roleLeadDeveloper' },
  { value: 'asset', labelKey: 'roleAssetCreator' },
  { value: 'admin', labelKey: 'roleAdmin' },
  { value: 'helper', labelKey: 'roleHelper' },
  { value: 'contributor', labelKey: 'roleContributor' },
] as const;
type CuratorRoleValue = (typeof curatorRoleOptions)[number]['value'];
const curatorActiveRoles = ref<CuratorRoleValue[]>(['all']);

const buildingKeywords = ['building', 'terrain', 'modelling', 'modeling'];
const uiKeywords = ['ui', 'interface', 'design'];
const scriptingKeywords = ['scripting', 'script', 'programming', 'code'];
const curatorRoleKeywords: Record<Exclude<CuratorRoleValue, 'all'>, string[]> = {
  director: ['director'],
  planner: ['planner'],
  lead: ['lead developer', 'lead dev', 'lead'],
  asset: ['asset creator', 'asset', 'creator'],
  admin: ['admin', 'administrator'],
  helper: ['helper', 'support'],
  contributor: ['contributor', 'contrib'],
};

const filterPanelOpen = ref(false);
const filterSearch = ref('');
const curatorFilterPanelOpen = ref(false);
const curatorFilterSearch = ref('');
const filteredDevProfiles = computed(() => {
  const searchTerm = filterSearch.value.trim().toLowerCase();
  const desiredRankFromSearch = inferRankFromSearch(searchTerm);
  return devProfiles.value.filter((profile) => {
    const rankMatches =
      activeFilter.value === 'all' || profile.Rank === activeFilter.value;
    const aspectMatches = matchesAspect(profile, activeAspects.value);
    if (!rankMatches) return false;
    if (!aspectMatches) return false;
    if (desiredRankFromSearch && profile.Rank !== desiredRankFromSearch) return false;
    if (!searchTerm) return true;
    const haystack = [
      profile.Title,
      profile.Info?.Name,
      profile.Role?.join(' '),
      translateRoleList(profile.Role),
      rankLabel(profile.Rank),
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();
    return haystack.includes(searchTerm);
  });
});
const filteredCuratorProfiles = computed(() => {
  const searchTerm = curatorFilterSearch.value.trim().toLowerCase();
  const desiredRankFromSearch = inferCuratorRankFromSearch(searchTerm);
  return curatorProfiles.value.filter((profile) => {
    const rankMatches =
      curatorActiveFilter.value === 'all' || profile.Rank === curatorActiveFilter.value;
    const roleMatches = matchesCuratorRole(profile);
    if (!rankMatches) return false;
    if (!roleMatches) return false;
    if (desiredRankFromSearch && profile.Rank !== desiredRankFromSearch) return false;
    if (!searchTerm) return true;
    const haystack = [
      profile.Title,
      profile.Info?.Name,
      profile.Role?.join(' '),
      translateRoleList(profile.Role),
      curatorRankLabel(profile.Rank),
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();
    return haystack.includes(searchTerm);
  });
});
const matchesAspect = (profile: DevProfile, aspects: AspectValue[]) => {
  if (aspects.includes('all')) return true;
  const roles = (profile.Role ?? []).map((r) => r.toLowerCase());
  const hasKeyword = (keywords: string[]) =>
    roles.some((role) => keywords.some((k) => role.includes(k)));
  const wants = new Set(aspects);
  let matched = false;
  if (wants.has('building')) matched ||= hasKeyword(buildingKeywords);
  if (wants.has('ui')) matched ||= hasKeyword(uiKeywords);
  if (wants.has('scripting')) matched ||= hasKeyword(scriptingKeywords);
  if (wants.has('other')) {
    matched ||= roles.length > 0 &&
      !hasKeyword(buildingKeywords) &&
      !hasKeyword(uiKeywords) &&
      !hasKeyword(scriptingKeywords);
  }
  return matched;
};
const matchesCuratorRole = (profile: DevProfile) => {
  if (curatorActiveRoles.value.includes('all')) return true;
  const roles = (profile.Role ?? []).map((r) => r.toLowerCase());
  const wants = new Set(curatorActiveRoles.value.filter((v) => v !== 'all'));
  return Array.from(wants).some((role) =>
    curatorRoleKeywords[role].some((keyword) =>
      roles.some((entry) => entry.includes(keyword)),
    ),
  );
};
const firstExperienceEntries = (profile: DevProfile) =>
  experienceEntries(profile.Experience).slice(0, 2);
const extraExperienceCount = (profile: DevProfile) =>
  Math.max(0, experienceEntries(profile.Experience).length - 2);
const previousOverflow = ref<string | null>(null);
const theme = ref<'system' | 'light' | 'dark'>(readStoredTheme() ?? 'system');
const themeOpen = ref(false);
const pagesOpen = ref(true);
const projectsOpen = ref(false);
const openSourceProjects = [
  { slug: 'project-dna', title: 'Double Helix DNA' },
  { slug: 'project-orbit-aura', title: 'Dynamic Orbit Aura' },
  { slug: 'project-gravity-field', title: 'Interactive Gravity Field' },
  { slug: 'project-imprint', title: 'Imprint Module' },
  { slug: 'project-npc-controller', title: 'NPC Path Controller' },
];

const readHistory = (): HistoryEntry[] => {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
  } catch (err) {
    console.warn('Unable to read history', err);
    return [];
  }
};

const writeHistory = (entries: HistoryEntry[]) => {
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(entries.slice(0, 3)));
  } catch (err) {
    console.warn('Unable to write history', err);
  }
};

const addHistoryEntry = (path: string, label: string) => {
  const current = readHistory().filter((item) => item.path !== path);
  current.unshift({ path, label });
  writeHistory(current);
  historyList.value = current.slice(0, 3);
};

const labelFromPath = (path: string) => {
  if (path === '/') return 'Home';
  if (path.startsWith('/Team')) return 'Developers';
  if (path.toLowerCase().startsWith('/assets')) return 'Assets';
  return path || 'Page';
};

const syncReferrer = () => {
  try {
    const ref = document.referrer;
    if (!ref) return;
    const refUrl = new URL(ref);
    if (refUrl.origin !== window.location.origin) return;
    const refPath = refUrl.pathname + refUrl.search + refUrl.hash;
    if (refPath === route.fullPath) return;
    addHistoryEntry(refPath, labelFromPath(refPath));
  } catch (err) {
    console.warn('Unable to parse referrer', err);
  }
};

const refreshHistory = () => {
  historyList.value = readHistory();
};

const filteredThemes = computed(() => {
  const q = searchQuery.value.trim().toLowerCase();
  const categoryQuery = [
    'theme',
    'themes',
    'appearance',
    'mode',
    'modes',
    'category',
    'categories',
    'catagory',
    'catagories',
  ].some((term) => q && (q.includes(term) || term.includes(q)));
  if (!q) return themeOptions;
  if (categoryQuery) return themeOptions;
  return themeOptions.filter(
    (opt) =>
      opt.label.toLowerCase().includes(q) || opt.value.toLowerCase().includes(q),
  );
});

const filteredPages = computed(() => {
  const q = searchQuery.value.trim().toLowerCase();
  if (!q || q === '.all') return pages.filter((page) => !page.searchOnly);
  const compactQ = q.replace(/[^a-z0-9]/g, "");
  const categoryQuery = [
    'page',
    'pages',
    'site',
    'navigation',
    'nav',
  ].some((term) => q && (q.includes(term) || term.includes(q)));
  if (categoryQuery) return pages.filter((page) => !page.searchOnly);
  return pages.filter((page) => matchesSearch(q, [page.label, page.slug, page.href, page.keywords]));
});

const filteredOpenSourceProjects = computed(() => {
  const q = searchQuery.value.trim().toLowerCase();
  if (!q || q === '.all') return openSourceProjects;
  const compactQ = q.replace(/[^a-z0-9]/g, '');
  const categoryQuery = ['project', 'projects', 'open source', 'opensource', 'asset', 'assets', 'code'].some(
    (term) => q && (q.includes(term) || term.includes(q)),
  );
  if (categoryQuery) return openSourceProjects;
  return openSourceProjects.filter((project) => {
    const values = [project.title, project.slug].map((value) => value.toLowerCase());
    return values.some(
      (value) =>
        value.includes(q) ||
        value.replace(/[^a-z0-9]/g, '').includes(compactQ),
    );
  });
});

const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
const resolveTheme = () =>
  theme.value === 'system'
    ? prefersDark.matches
      ? 'dark'
      : 'light'
    : theme.value;
const applyTheme = () => {
  document.documentElement.setAttribute('data-theme', resolveTheme());
};
const handleSchemeChange = () => {
  if (theme.value === 'system') applyTheme();
};

const themeShouldOpen = computed(
  () => themeOpen.value || (searchQuery.value.trim() && filteredThemes.value.length > 0),
);
const pagesShouldOpen = computed(
  () => pagesOpen.value || (searchQuery.value.trim() && filteredPages.value.length > 0),
);
const projectsShouldOpen = computed(
  () => projectsOpen.value || (searchQuery.value.trim() && filteredOpenSourceProjects.value.length > 0),
);

const filtersLocked = computed(
  () => filterPanelOpen.value || curatorFilterPanelOpen.value,
);

const openSearchModal = () => {
  searchModalOpen.value = true;
  menuOpen.value = false;
  themeOpen.value = false;
  pagesOpen.value = true;
  projectsOpen.value = false;
  if (previousOverflow.value === null) {
    previousOverflow.value =
      document.documentElement.style.overflow || '';
    document.documentElement.style.overflow = 'hidden';
  }
  nextTick(() => modalSearchInput.value?.focus());
};

const closeSearchModal = () => {
  searchModalOpen.value = false;
  searchQuery.value = '';
  if (previousOverflow.value !== null) {
    document.documentElement.style.overflow = previousOverflow.value;
    previousOverflow.value = null;
  }
};

const handleBottomScroll = () => {
  if (typeof window === 'undefined') return;
  if (hasReachedBottom.value) return;
  const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 4;
  if (nearBottom) {
    hasReachedBottom.value = true;
  }
};

const slugFromPath = (path: string) => {
  const file = path.split('/').pop() || '';
  return file.replace('.json', '').trim();
};

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .trim() || 'profile';

const openProfile = (profile: DevProfile, group: 'dev' | 'curator') => {
  const fallback = profile.Info?.Name ?? profile.Title ?? 'profile';
  const slug = profile.__slug || slugify(fallback);
  router.push({ name: 'developer-profile', params: { group, slug } });
};

const loadDevProfiles = async () => {
  try {
    const entries = await Promise.all(
      Object.entries(devFiles).map(async ([path, loader]) => ({
        path,
        data: await loader(),
      })),
    );
    const rankOrder: Record<string, number> = { L: 0, H: 1 };
    devProfiles.value = entries
      .map((entry) => {
        const profile = entry.data as DevProfile;
        return {
          ...profile,
          __slug: slugFromPath(entry.path),
          __group: 'dev',
        };
      })
      .sort((a, b) => {
        const rankA = rankOrder[a.Rank ?? ''] ?? 999;
        const rankB = rankOrder[b.Rank ?? ''] ?? 999;
        if (rankA !== rankB) return rankA - rankB;
        return (a.Title ?? '').localeCompare(b.Title ?? '');
      });
    await nextTick();
    refreshScrollAnimations();
  } catch (err) {
    console.warn('Unable to load developer profiles', err);
  }
};

const loadCuratorProfiles = async () => {
  try {
    const entries = await Promise.all(
      Object.entries(curatorFiles).map(async ([path, loader]) => ({
        path,
        data: await loader(),
      })),
    );
    const rankOrder: Record<string, number> = { A: 0, B: 1, C: 2, D: 3, E: 4 };
    curatorProfiles.value = entries
      .map((entry) => {
        const profile = entry.data as DevProfile;
        return {
          ...profile,
          __slug: slugFromPath(entry.path),
          __group: 'curator',
        };
      })
      .sort((a, b) => {
        const rankA = rankOrder[a.Rank ?? ''] ?? 999;
        const rankB = rankOrder[b.Rank ?? ''] ?? 999;
        if (rankA !== rankB) return rankA - rankB;
        return (a.Title ?? '').localeCompare(b.Title ?? '');
      });
    await nextTick();
    refreshScrollAnimations();
  } catch (err) {
    console.warn('Unable to load curator profiles', err);
  }
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

const selectTheme = (value: 'light' | 'dark' | 'system') => {
  theme.value = value;
  applyTheme();
};

const toggleFilterPanel = () => {
  filterPanelOpen.value = !filterPanelOpen.value;
  if (filterPanelOpen.value) {
    curatorFilterPanelOpen.value = false;
  }
};

const selectFilter = (value: FilterValue) => {
  activeFilter.value = value;
};

const closeFilterPanel = () => {
  filterPanelOpen.value = false;
};

const toggleCuratorFilterPanel = () => {
  curatorFilterPanelOpen.value = !curatorFilterPanelOpen.value;
  if (curatorFilterPanelOpen.value) {
    filterPanelOpen.value = false;
  }
};

const selectCuratorFilter = (value: CuratorFilterValue) => {
  curatorActiveFilter.value = value;
};

const closeCuratorFilterPanel = () => {
  curatorFilterPanelOpen.value = false;
};

const selectAspect = (value: AspectValue) => {
  if (value === 'all') {
    activeAspects.value = ['all'];
    return;
  }
  const current = new Set(activeAspects.value.filter((v) => v !== 'all'));
  if (current.has(value)) {
    current.delete(value);
  } else {
    current.add(value);
  }
  if (!current.size) {
    activeAspects.value = ['all'];
  } else {
    activeAspects.value = Array.from(current);
  }
};

const selectCuratorRole = (value: CuratorRoleValue) => {
  if (value === 'all') {
    curatorActiveRoles.value = ['all'];
    return;
  }
  const current = new Set(curatorActiveRoles.value.filter((v) => v !== 'all'));
  if (current.has(value)) {
    current.delete(value);
  } else {
    current.add(value);
  }
  if (!current.size) {
    curatorActiveRoles.value = ['all'];
  } else {
    curatorActiveRoles.value = Array.from(current);
  }
};

const rankLabel = (rank?: string) => {
  if (rank === 'H') return 'high rank';
  if (rank === 'L') return 'low rank';
  return '';
};

const curatorRankLabel = (rank?: string) => {
  if (rank === 'A') return 'rank a';
  if (rank === 'B') return 'rank b';
  if (rank === 'C') return 'rank c';
  if (rank === 'D') return 'rank d';
  if (rank === 'E') return 'rank e';
  return '';
};

const inferRankFromSearch = (term: string) => {
  if (!term) return null;
  if (term.includes('high rank') || term === 'high') return 'H';
  if (term.includes('low rank') || term === 'low') return 'L';
  return null;
};

const inferCuratorRankFromSearch = (term: string) => {
  if (!term) return null;
  if (term.includes('rank a') || term.includes('tier a')) return 'A';
  if (term.includes('rank b') || term.includes('tier b')) return 'B';
  if (term.includes('rank c') || term.includes('tier c')) return 'C';
  if (term.includes('rank d') || term.includes('tier d')) return 'D';
  if (term.includes('rank e') || term.includes('tier e')) return 'E';
  return null;
};


const selectPage = (slug: string, href: string) => {
  closeSearchModal();
  menuOpen.value = false;
  if (href.startsWith('#')) {
    window.location.hash = href.startsWith('#') ? href : `#${slug}`;
    return;
  }
  router.push(href).catch(() => {});
};

const selectOpenSourceProject = (slug: string) => {
  closeSearchModal();
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

const goTo = (path: string) => {
  closeSearchModal();
  router.push(path).catch(() => {});
};

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === '/' && !searchModalOpen.value) {
    event.preventDefault();
    openSearchModal();
  }
  if (event.key === 'Escape' && searchModalOpen.value) {
    event.preventDefault();
    closeSearchModal();
  }
};

onMounted(() => {
  topbarVisible.value = true;
  refreshHistory();
  syncReferrer();
  window.addEventListener('storage', refreshHistory);
  window.addEventListener('keydown', handleKeydown);
  applyTheme();
  document.documentElement.setAttribute("lang", "en");
  // ensure scrolling is re-enabled when arriving from other pages
  document.documentElement.style.overflow = previousOverflow.value ?? '';
  previousOverflow.value = null;
  prefersDark.addEventListener('change', handleSchemeChange);
  loadDevProfiles();
  loadCuratorProfiles();
  siteReady.value = true;
  refreshScrollAnimations();
  handleBottomScroll();
  window.addEventListener('scroll', handleBottomScroll, { passive: true });
});

onBeforeUnmount(() => {
  window.removeEventListener('storage', refreshHistory);
  window.removeEventListener('keydown', handleKeydown);
  prefersDark.removeEventListener('change', handleSchemeChange);
  window.removeEventListener('scroll', handleBottomScroll);
  if (searchModalOpen.value) {
    closeSearchModal();
  }
  revealObserver.value?.disconnect();
  revealObserver.value = null;
  if (revealRaf) cancelAnimationFrame(revealRaf);
});

watch(
  () => route.fullPath,
  () => {
    refreshHistory();
    if (searchModalOpen.value) closeSearchModal();
    menuOpen.value = false;
  },
);

watch(
  filteredDevProfiles,
  () => {
    refreshScrollAnimations();
  },
  { flush: 'post' },
);

watch(
  filteredCuratorProfiles,
  () => {
    refreshScrollAnimations();
  },
  { flush: 'post' },
);

watch(filterSearch, (value) => {
  const term = value.trim().toLowerCase();
  const inferred = inferRankFromSearch(term);
  if (inferred) {
    activeFilter.value = inferred;
  } else if (!term && activeFilter.value !== 'all') {
    activeFilter.value = 'all';
  }
});

watch(curatorFilterSearch, (value) => {
  const term = value.trim().toLowerCase();
  const inferred = inferCuratorRankFromSearch(term);
  if (inferred) {
    curatorActiveFilter.value = inferred;
  } else if (!term && curatorActiveFilter.value !== 'all') {
    curatorActiveFilter.value = 'all';
  }
});

watch(theme, (value) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_THEME_KEY, value);
  }
  applyTheme();
});

</script>
