<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import SmoothCursor from '@/components/SmoothCursor.vue';
import { matchesSearch } from '@/lib/searchMatch';
import { testimonials } from '@/data/testimonials';

const router = useRouter();
const topbarVisible = ref(false);
const menuOpen = ref(false);
const searchModalOpen = ref(false);
const searchQuery = ref('');
const modalSearchInput = ref(null);
const previousOverflow = ref(null);
const pagesOpen = ref(true);
const projectsOpen = ref(false);
const selectedReview = ref(null);
const reviewModalPreviousOverflow = ref(null);

const pages = [
  { slug: 'home', label: 'Home', href: '/' },
  { slug: 'open-source', label: 'Open Source', href: '/opensource' },
  { slug: 'developers', label: 'Developers', href: '/Team' },
  { slug: 'links', label: 'Links', href: '/links' },
  { slug: 'testimonials', label: 'Testimonials', href: '/testimonials' },
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

function openSearchModal() {
  menuOpen.value = false;
  searchModalOpen.value = true;
  previousOverflow.value = document.documentElement.style.overflow || '';
  document.documentElement.style.overflow = 'hidden';
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

function isLongReview(review) {
  return review.quote.length > 190;
}

function openReviewModal(review) {
  selectedReview.value = review;
  reviewModalPreviousOverflow.value = document.documentElement.style.overflow || '';
  document.documentElement.style.overflow = 'hidden';
}

function closeReviewModal() {
  selectedReview.value = null;
  if (reviewModalPreviousOverflow.value !== null) {
    document.documentElement.style.overflow = reviewModalPreviousOverflow.value;
    reviewModalPreviousOverflow.value = null;
  }
}

function handleKeydown(event) {
  if (event.key === '/' && !event.metaKey && !event.ctrlKey && !event.altKey) {
    const active = document.activeElement;
    if (active && ['INPUT', 'TEXTAREA'].includes(active.tagName)) return;
    event.preventDefault();
    openSearchModal();
  }
  if (event.key === 'Escape' && selectedReview.value) closeReviewModal();
  else if (event.key === 'Escape' && searchModalOpen.value) closeSearchModal();
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
  requestAnimationFrame(() => { topbarVisible.value = true; });
});

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown);
  if (searchModalOpen.value) closeSearchModal();
  if (selectedReview.value) closeReviewModal();
});
</script>

<template>
  <div id="topbarMain" :data-ready="topbarVisible">
    <img class="topbar-logo" src="@/assets/img/logo/Logo.png" alt="Zantix">
    <label class="top-search" aria-label="Search" @click.stop="openSearchModal">
      <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5" stroke="currentColor" stroke-width="2" fill="none"/><path d="M16.5 16.5 21 21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
      <input type="search" placeholder="Search" readonly @focus.prevent="openSearchModal" @mousedown.prevent="openSearchModal">
      <span class="kbd">/</span>
    </label>
    <button id="hamburger" type="button" aria-label="Menu" :aria-expanded="menuOpen" @click.stop="menuOpen = !menuOpen"><span></span><span></span><span></span></button>
    <div id="topbarMenu" :data-open="menuOpen">
      <RouterLink to="/" @click="menuOpen = false">About Zantix</RouterLink>
      <RouterLink to="/opensource" @click="menuOpen = false">Open Source</RouterLink>
      <RouterLink to="/Team" @click="menuOpen = false">Zantix Team</RouterLink>
      <RouterLink to="/links" @click="menuOpen = false">Links</RouterLink>
      <RouterLink to="/testimonials" @click="menuOpen = false">Testimonials</RouterLink>
    </div>
  </div>

  <main class="testimonials-page">
    <section class="reviews-hero">
      <div class="reviews-title">
        <span class="reviews-title__backdrop" aria-hidden="true">Client</span>
        <h1>Reviews</h1>
      </div>
    </section>

    <section class="reviews-content" aria-label="Client reviews">
      <figure
        v-for="(review, index) in testimonials"
        :key="review.id"
        class="review-card"
        :class="{ 'review-card--featured': index === 0 }"
      >
        <div class="review-card__top">
          <span class="stars" aria-label="5 out of 5 stars">★★★★★</span>
        </div>
        <blockquote>“{{ review.quote }}”</blockquote>
        <button
          v-if="isLongReview(review)"
          class="review-read-more"
          type="button"
          @click="openReviewModal(review)"
        >
          Read more
          <span aria-hidden="true">↗</span>
        </button>
        <figcaption>
          <span class="avatar">
            <span class="avatar-fallback">?</span>
            <img v-if="review.image" :src="review.image" alt="" @error="$event.currentTarget.remove()">
          </span>
          <span class="review-person"><strong>{{ review.name }}</strong><small>{{ review.role }}</small></span>
          <span class="review-index">#{{ String(index + 1).padStart(3, '0') }}</span>
        </figcaption>
      </figure>
    </section>
  </main>

  <teleport to="body">
    <transition name="fade">
      <div
        v-if="selectedReview"
        class="review-modal-backdrop"
        role="dialog"
        aria-modal="true"
        aria-labelledby="fullReviewTitle"
        @click.self="closeReviewModal"
      >
        <article class="review-modal">
          <button class="review-modal__close" type="button" aria-label="Close review" @click="closeReviewModal">×</button>
          <div class="review-modal__stars" aria-label="5 out of 5 stars">★★★★★</div>
          <blockquote>“{{ selectedReview.quote }}”</blockquote>
          <div class="review-modal__author">
            <span class="avatar">
              <span class="avatar-fallback">?</span>
              <img v-if="selectedReview.image" :src="selectedReview.image" alt="" @error="$event.currentTarget.remove()">
            </span>
            <span class="review-person">
              <strong id="fullReviewTitle">{{ selectedReview.name }}</strong>
              <small>{{ selectedReview.role }}</small>
            </span>
          </div>
        </article>
      </div>
    </transition>
  </teleport>

  <footer><RouterLink to="/">Zantix</RouterLink><span>Feedback from projects, products, and collaborations.</span><span>© 2026 Zantix</span></footer>

  <teleport to="body">
    <transition name="fade">
      <div v-if="searchModalOpen" class="search-modal" role="dialog" aria-modal="true" @click.self="closeSearchModal">
        <div class="search-card blank-card" @keydown.esc.prevent="closeSearchModal">
          <div class="search-card__input">
            <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5" stroke="currentColor" stroke-width="2" fill="none"/><path d="M16.5 16.5 21 21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
            <input ref="modalSearchInput" v-model="searchQuery" type="search" placeholder="Search" aria-label="Search" autocomplete="off" @keydown.enter.prevent="handleModalEnter">
            <span class="kbd-hint modal-kbd"><span class="kbd">/</span></span>
          </div>

          <div id="SAthing">
            <div v-if="filteredPages.length" id="Pages">
              <button class="picker-head" type="button" :data-open="pagesShouldOpen" :aria-expanded="pagesShouldOpen" aria-controls="pageList" @click="togglePages">
                <svg class="collapse-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M8.9 1.5 17 12 8.9 22.5" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                <span class="flag header-flag" aria-hidden="true"><svg class="pages-grid-icon" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.8"/><rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.8"/><rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.8"/><rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.8"/></svg></span>
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
                          <svg v-else-if="page.slug === 'testimonials'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 15a3 3 0 0 1-3 3H9l-5 3v-6a3 3 0 0 1-1-2.25V7a3 3 0 0 1 3-3h11a3 3 0 0 1 3 3Z"/><path d="M8 9h.01M12 9h.01M16 9h.01"/></svg>
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

            <div v-if="filteredOpenSourceProjects.length" id="Projects">
              <button class="picker-head" type="button" :data-open="projectsShouldOpen" :aria-expanded="projectsShouldOpen" aria-controls="projectList" @click="toggleProjects">
                <svg class="collapse-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M8.9 1.5 17 12 8.9 22.5" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                <span class="flag header-flag" aria-hidden="true"><span class="theme-emoji">⌘</span></span>
                <span class="lang-title">Open Source Projects</span>
              </button>
              <transition name="collapse">
                <transition-group v-if="projectsShouldOpen" id="projectList" class="page-list" role="listbox" aria-label="Open Source Projects" name="langitem" tag="ul">
                  <li v-for="(project, idx) in filteredOpenSourceProjects" :key="project.slug" :style="{ '--d': `${idx * 0.03}s` }">
                    <button type="button" class="page-option" role="option" data-cursor-hover @click="selectOpenSourceProject(project.slug)">
                      <span class="page-inner"><span class="page-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m8 9-4 4 4 4M16 9l4 4-4 4M14 5l-4 14"/></svg></span><span class="page-name">{{ project.title }}</span></span>
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
@import url('https://fonts.googleapis.com/css2?family=Allura&family=Orbitron:wght@400..900&family=Space+Grotesk:wght@300..700&display=swap');
:global(:root) { --ui-border: rgba(255,255,255,.12); --ui-text: rgba(255,255,255,.9); --card-bg: #000; --overlay-bg: rgba(0,0,0,.35); --kbd-border: rgba(255,255,255,.2); --kbd-bg: rgba(255,255,255,.05); --input-border: rgba(255,255,255,.14); }
:global(body) { background: #000; }
#topbarMain { position: fixed; top: 18px; left: 50%; z-index: 999; display: grid; grid-template-columns: auto 1fr auto; align-items: center; gap: .75rem; width: min(94vw,54rem); padding: .35rem .75rem; border: 1px solid rgba(255,255,255,.12); border-radius: 1rem; color: #fff; backdrop-filter: blur(12px) saturate(120%); box-shadow: 0 12px 44px rgba(0,0,0,.38); opacity: 0; transform: translate(-50%,-140%); transition: transform 820ms cubic-bezier(.17,.99,.42,1.19),opacity 320ms ease; }
#topbarMain[data-ready="true"] { opacity: 1; transform: translate(-50%,0); }
.topbar-logo { width: 42px; height: 42px; object-fit: contain; }
.top-search { display: grid; grid-template-columns: auto 1fr auto; align-items: center; gap: .5rem; height: 42px; padding: .35rem .6rem; border: 1px solid rgba(255,255,255,.12); border-radius: 12px; }
.top-search svg { width: 18px; }.top-search input { width: 100%; border: 0; outline: 0; color: #fff; background: transparent; font: .94rem "Space Grotesk",sans-serif; }.kbd-hint { display: inline-flex; gap: .2rem; }.kbd { display: inline-flex; min-width: 20px; align-items: center; justify-content: center; padding: 2px 6px; border: 1px solid var(--kbd-border); border-radius: 6px; background: var(--kbd-bg); font-size: .74rem; }.modal-kbd { margin-left: auto; }
#hamburger { display: grid; gap: 4px; width: 34px; padding: 7px 6px; border: 0; background: transparent; }#hamburger span { width: 100%; height: 2px; border-radius: 9px; background: #fff; }
#topbarMenu { position: absolute; top: 110%; right: 12px; display: grid; gap: .25rem; min-width: 190px; padding: .6rem; border: 1px solid rgba(255,255,255,.12); border-radius: 12px; background: rgba(8,10,16,.94); opacity: 0; transform: translateY(-8px); pointer-events: none; transition: 200ms ease; }#topbarMenu[data-open="true"] { opacity: 1; transform: none; pointer-events: auto; }#topbarMenu a { padding: .48rem .55rem; border-radius: 8px; color: #fff; }#topbarMenu a:hover { background: rgba(255,255,255,.07); }
.testimonials-page { position: relative; min-height: 100vh; padding: clamp(10rem,16vw,13rem) clamp(1.3rem,7vw,6rem) clamp(7rem,11vw,10rem); overflow: hidden; color: #fff; background: #000; font-family: "Space Grotesk",sans-serif; }
.testimonials-page::before { position: absolute; top: 3rem; left: 50%; z-index: 0; width: 125%; height: clamp(32rem,52vw,42rem); background-image: linear-gradient(rgba(255,255,255,.075) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.075) 1px,transparent 1px); background-size: 72px 54px; mask-image: linear-gradient(to bottom,#000 0,rgba(0,0,0,.7) 45%,transparent 88%),linear-gradient(to right,transparent,#000 16%,#000 84%,transparent); mask-composite: intersect; transform: translateX(-50%) perspective(650px) rotateX(58deg) scale(1.14); transform-origin: center top; pointer-events: none; content: ""; }
.testimonials-page::after { position: absolute; inset: 0; z-index: 0; background: linear-gradient(90deg,rgba(0,0,0,.62),transparent 18%,transparent 82%,rgba(0,0,0,.62)); pointer-events: none; content: ""; }
.reviews-hero,.reviews-content { position: relative; z-index: 2; max-width: 1160px; margin-inline: auto; }
.reviews-hero { display: grid; min-height: clamp(27rem,50vh,36rem); align-content: center; justify-items: center; text-align: center; }
.reviews-title { position: relative; display: grid; width: 100%; min-height: clamp(14rem,25vw,20rem); place-items: center; transform: translateY(clamp(-3rem,-3vw,-1.8rem)); }
.reviews-title__backdrop { color: transparent; font: 800 clamp(5.5rem,15vw,11.5rem)/.8 Orbitron,sans-serif; letter-spacing: -.055em; text-transform: uppercase; white-space: nowrap; background: linear-gradient(90deg,#fff 0%,#527df0 48%,#fff 100%); background-clip: text; -webkit-background-clip: text; filter: drop-shadow(0 0 28px rgba(18,72,210,.28)); }
.reviews-hero h1 { position: absolute; top: 58%; left: 50%; margin: 0; color: #fff; font: 400 clamp(4.5rem,11vw,8.5rem)/.75 Allura,cursive; text-shadow: 0 12px 34px rgba(0,0,0,.8),0 0 26px rgba(18,72,210,.3); transform: translate(-50%,-50%) rotate(-4deg); }
.reviews-content { display: grid; grid-template-columns: repeat(2,minmax(0,1fr)); gap: 1rem; }
.review-card { position: relative; display: flex; min-height: 280px; flex-direction: column; gap: 1.2rem; margin: 0; padding: clamp(1.4rem,3vw,2rem); overflow: hidden; border: 1px solid rgba(255,255,255,.12); border-radius: 12px; background: #030405; box-shadow: 0 18px 48px rgba(0,0,0,.32),inset 0 1px rgba(255,255,255,.025); transition: background-color 220ms ease,border-color 220ms ease,transform 220ms cubic-bezier(.22,.8,.36,1); }
.review-card::after { position: absolute; right: -45px; bottom: -65px; width: 170px; height: 170px; border: 1px solid rgba(90,136,255,.13); border-radius: 50%; box-shadow: 0 0 0 28px rgba(90,136,255,.025),0 0 0 58px rgba(90,136,255,.018); content: ""; pointer-events: none; }
.review-card--featured { grid-column: 1 / -1; min-height: 330px; }
.review-card:hover { border-color: rgba(115,153,255,.38); background: #06080d; transform: translateY(-4px); }
.review-card__top { position: relative; z-index: 1; display: flex; align-items: center; justify-content: space-between; }
.review-index { display: grid; min-width: 4.5rem; min-height: 42px; place-items: center; justify-self: end; align-self: end; color: #fff; font: 700 1rem Orbitron,sans-serif; letter-spacing: .08em; text-align: center; transform: translate(.65rem,.65rem); }
.stars { justify-self: end; color: #f4c84a; font-size: .72rem; letter-spacing: .1em; white-space: nowrap; }
.review-card blockquote { position: relative; z-index: 1; display: -webkit-box; max-width: 48ch; margin: auto 0; overflow: hidden; color: rgba(255,255,255,.88); font-size: clamp(1.2rem,2.25vw,1.75rem); line-height: 1.45; letter-spacing: -.025em; text-wrap: balance; -webkit-box-orient: vertical; -webkit-line-clamp: 5; }
.review-card--featured blockquote { max-width: 920px; font-size: clamp(1.7rem,3.5vw,3rem); line-height: 1.25; }
.review-read-more { position: relative; z-index: 2; display: inline-flex; width: fit-content; align-items: center; gap: .45rem; padding: .38rem 0; border: 0; color: #9bb4ff; background: transparent; font: 600 .72rem Orbitron,sans-serif; letter-spacing: .08em; text-transform: uppercase; transition: color 180ms ease,gap 180ms ease; }
.review-read-more:hover { gap: .7rem; color: #fff; }
.review-card figcaption { position: relative; z-index: 1; display: grid; grid-template-columns: auto 1fr auto; align-items: center; gap: .75rem; margin-top: auto; }
.avatar { display: grid; width: 42px; height: 42px; place-items: center; overflow: hidden; border: 1px solid rgba(255,255,255,.14); border-radius: 50%; color: #dce5ff; background: #12141a; font-weight: 700; }
.avatar > * { grid-area: 1 / 1; }
.avatar-fallback { color: #fff; }
.avatar img { position: relative; z-index: 1; width: 100%; height: 100%; object-fit: cover; }
.review-person { display: grid; gap: .12rem; }
.review-person strong { font-size: .9rem; }
.review-person small { color: rgba(255,255,255,.45); }
.review-modal-backdrop { position: fixed; inset: 0; z-index: 999999; display: grid; place-items: center; padding: 1.25rem; background: rgba(0,0,0,.72); backdrop-filter: blur(14px); }
.review-modal { position: relative; display: grid; gap: 1.5rem; width: min(720px,94vw); max-height: min(82vh,760px); padding: clamp(1.6rem,5vw,3.4rem); overflow: auto; border: 1px solid rgba(255,255,255,.14); border-radius: 16px; color: #fff; background: #050507; box-shadow: 0 34px 100px rgba(0,0,0,.7); }
.review-modal__close { position: absolute; top: 1rem; right: 1rem; display: grid; width: 38px; height: 38px; place-items: center; border: 1px solid rgba(255,255,255,.12); border-radius: 50%; color: #fff; background: rgba(255,255,255,.04); font-size: 1.4rem; line-height: 1; }
.review-modal__stars { padding-right: 3rem; color: #f4c84a; font-size: .85rem; letter-spacing: .12em; }
.review-modal blockquote { margin: 0; color: rgba(255,255,255,.92); font-size: clamp(1.35rem,3.5vw,2.25rem); line-height: 1.45; letter-spacing: -.035em; }
.review-modal__author { display: flex; align-items: center; gap: .8rem; padding-top: 1.25rem; border-top: 1px solid rgba(255,255,255,.1); }
footer { display: grid; grid-template-columns: 1fr 2fr 1fr; gap: 1rem; padding: 2.5rem 6vw; border-top: 1px solid rgba(255,255,255,.1); color: rgba(255,255,255,.45); background: #000; font: .8rem "Space Grotesk",sans-serif; }footer a { color: #fff; font: 700 1rem Orbitron,sans-serif; }footer span:last-child { text-align: right; }
.fade-enter-active,.fade-leave-active { transition: opacity 200ms ease; }.fade-enter-from,.fade-leave-to { opacity: 0; }
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
.pages-grid-icon { width: 16px; height: 16px; }
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
@media (max-width:800px) { .reviews-content { grid-template-columns: 1fr; }.review-card--featured { grid-column: auto; }.review-card,.review-card--featured { min-height: 270px; }.review-card--featured blockquote { font-size: clamp(1.4rem,5vw,2rem); } }
@media (max-width:700px) { .testimonials-page { padding: 9.5rem 1.35rem 7rem; }.testimonials-page::before { top: 5rem; width: 165%; height: 31rem; background-size: 52px 42px; }.reviews-hero { min-height: 27rem; }.reviews-title { min-height: 11rem; transform: translateY(-1.5rem); }.reviews-title__backdrop { font-size: clamp(3.8rem,19vw,5.5rem); }.reviews-hero h1 { font-size: clamp(4.2rem,24vw,6.2rem); }.review-card figcaption { grid-template-columns: auto minmax(0,1fr) auto; }footer { grid-template-columns: 1fr; text-align: center; }footer span:last-child { text-align: center; } }
</style>
