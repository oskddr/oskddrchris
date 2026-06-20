<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import SmoothCursor from '@/components/SmoothCursor.vue';
import { socialSearchPages } from '@/lib/socialSearchPages';
import { matchesSearch } from '@/lib/searchMatch';

const router = useRouter();
const topbarVisible = ref(false);
const menuOpen = ref(false);
const searchModalOpen = ref(false);
const searchQuery = ref('');
const modalSearchInput = ref(null);
const previousOverflow = ref(null);

const pages = [
  { slug: 'home', label: 'Home', href: '/' },
  { slug: 'open-source', label: 'Open Source', href: '/opensource' },
  { slug: 'developers', label: 'Developers', href: '/Team' },
  { slug: 'links', label: 'Links', href: '/links' },
  { slug: 'featured', label: 'Featured Work', href: '/#A3' },
  { slug: 'testimonials', label: 'Testimonials', href: '/testimonials' },
  { slug: 'contact', label: 'Contact', href: '/#FooterMain' },
  ...socialSearchPages,
];

const testimonials = [
  { quote: 'Chris is a perfect scripter and made everything very clear to work with, with no bugs found.', name: 'dali123049', role: 'UI Designer & Custom Icons', image: 'https://cdn.discordapp.com/avatars/1234583019592089701/fe63c07e2f36f957a52fa3a0c082a423.webp?size=128' },
  { quote: 'The UI/UX direction made the product feel cleaner and easier for users to understand.', name: 'UI/UX', role: 'Client Review' },
  { quote: 'The web implementation was responsive, fast, and practical to maintain.', name: 'Web Development', role: 'Frontend' },
  { quote: 'Creates focused mobile experiences with clear navigation and native-feeling interactions.', name: 'iOS Development', role: 'Mobile' },
  { quote: 'Connects visual direction, implementation, and product thinking in one portfolio.', name: 'Portfolio', role: 'Personal Work' },
  { quote: 'The assets are organized well, so onboarding new teammates is easy.', name: 'Tech Lead', role: 'Pipeline' },
  { quote: 'Even as a solo creator, I can ship updates with studio-level quality.', name: 'Solo Creator', role: 'Indie Project' },
  { quote: 'Support replies fast and the docs are clear enough to unblock us quickly.', name: 'Project Manager', role: 'Production' },
];

const filteredPages = computed(() => {
  const query = searchQuery.value.trim();
  if (!query) return pages.filter((page) => !page.searchOnly);
  return pages.filter((page) => matchesSearch(query, [page.label, page.slug, page.href, page.keywords]));
});

function openSearchModal() {
  menuOpen.value = false;
  searchModalOpen.value = true;
  previousOverflow.value = document.documentElement.style.overflow || '';
  document.documentElement.style.overflow = 'hidden';
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

function selectPage(page) {
  closeSearchModal();
  router.push(page.href);
}

function handleKeydown(event) {
  if (event.key === '/' && !event.metaKey && !event.ctrlKey && !event.altKey) {
    const active = document.activeElement;
    if (active && ['INPUT', 'TEXTAREA'].includes(active.tagName)) return;
    event.preventDefault();
    openSearchModal();
  }
  if (event.key === 'Escape' && searchModalOpen.value) closeSearchModal();
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
  requestAnimationFrame(() => { topbarVisible.value = true; });
});

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown);
  if (searchModalOpen.value) closeSearchModal();
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
    <section class="testimonials-hero">
      <p>What people say</p>
      <h1>Client<br><span>stories.</span></h1>
      <div class="hero-rule" aria-hidden="true"></div>
    </section>

    <section class="reviews" aria-label="Testimonials">
      <figure v-for="(review, index) in testimonials" :key="review.name" class="review-card" :style="{ '--index': index }">
        <div class="review-number">{{ String(index + 1).padStart(2, '0') }}</div>
        <div class="stars" aria-label="5 out of 5 stars">★★★★★</div>
        <blockquote>{{ review.quote }}</blockquote>
        <figcaption>
          <span class="avatar"><img v-if="review.image" :src="review.image" alt=""><span v-else>{{ review.name.charAt(0) }}</span></span>
          <span><strong>{{ review.name }}</strong><small>{{ review.role }}</small></span>
        </figcaption>
      </figure>
    </section>
  </main>

  <footer><RouterLink to="/">Zantix</RouterLink><span>Feedback from projects, products, and collaborations.</span><span>© 2026 Zantix</span></footer>

  <teleport to="body">
    <transition name="fade">
      <div v-if="searchModalOpen" class="search-modal" @click.self="closeSearchModal">
        <div class="search-card">
          <div class="modal-input"><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="6.5" stroke="currentColor" stroke-width="2" fill="none"/><path d="M16.5 16.5 21 21" stroke="currentColor" stroke-width="2"/></svg><input ref="modalSearchInput" v-model="searchQuery" type="search" placeholder="Search" @keydown.enter.prevent="filteredPages[0] && selectPage(filteredPages[0])"><span class="kbd">/</span></div>
          <div class="page-heading"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg><span>Pages</span></div>
          <button v-for="page in filteredPages" :key="page.slug" class="page-result" type="button" @click="selectPage(page)"><svg v-if="page.slug.startsWith('social-')" viewBox="0 0 24 24"><path d="M10 13a5 5 0 0 1 0-7l1.5-1.5a5 5 0 0 1 7 7L17 13"/><path d="M14 11a5 5 0 0 1 0 7l-1.5 1.5a5 5 0 1 1-7-7L7 11"/></svg><svg v-else viewBox="0 0 24 24"><path d="M6 2h9l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z"/><path d="M14 2v5h5"/></svg><span>{{ page.label }}</span></button>
        </div>
      </div>
    </transition>
  </teleport>

  <SmoothCursor />
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400..900&family=Space+Grotesk:wght@300..700&display=swap');
:global(body) { background: #000; }
#topbarMain { position: fixed; top: 18px; left: 50%; z-index: 999; display: grid; grid-template-columns: auto 1fr auto; align-items: center; gap: .75rem; width: min(94vw,54rem); padding: .35rem .75rem; border: 1px solid rgba(255,255,255,.12); border-radius: 1rem; color: #fff; backdrop-filter: blur(12px) saturate(120%); box-shadow: 0 12px 44px rgba(0,0,0,.38); opacity: 0; transform: translate(-50%,-140%); transition: transform 820ms cubic-bezier(.17,.99,.42,1.19),opacity 320ms ease; }
#topbarMain[data-ready="true"] { opacity: 1; transform: translate(-50%,0); }
.topbar-logo { width: 42px; height: 42px; object-fit: contain; }
.top-search { display: grid; grid-template-columns: auto 1fr auto; align-items: center; gap: .5rem; height: 42px; padding: .35rem .6rem; border: 1px solid rgba(255,255,255,.12); border-radius: 12px; }
.top-search svg { width: 18px; }.top-search input,.modal-input input { width: 100%; border: 0; outline: 0; color: #fff; background: transparent; font: .94rem "Space Grotesk",sans-serif; }.kbd { padding: 2px 6px; border: 1px solid rgba(255,255,255,.2); border-radius: 6px; }
#hamburger { display: grid; gap: 4px; width: 34px; padding: 7px 6px; border: 0; background: transparent; }#hamburger span { width: 100%; height: 2px; border-radius: 9px; background: #fff; }
#topbarMenu { position: absolute; top: 110%; right: 12px; display: grid; gap: .25rem; min-width: 190px; padding: .6rem; border: 1px solid rgba(255,255,255,.12); border-radius: 12px; background: rgba(8,10,16,.94); opacity: 0; transform: translateY(-8px); pointer-events: none; transition: 200ms ease; }#topbarMenu[data-open="true"] { opacity: 1; transform: none; pointer-events: auto; }#topbarMenu a { padding: .48rem .55rem; border-radius: 8px; color: #fff; }#topbarMenu a:hover { background: rgba(255,255,255,.07); }
.testimonials-page { min-height: 100vh; padding: clamp(10rem,16vw,13rem) clamp(1.3rem,7vw,6rem) 8rem; color: #fff; background: radial-gradient(ellipse 72% 38% at 50% -8%,rgba(255,255,255,.12),transparent 70%),linear-gradient(#08090c,#010102); font-family: "Space Grotesk",sans-serif; }
.testimonials-hero { max-width: 1160px; margin: auto; padding-bottom: clamp(5rem,10vw,8rem); }.testimonials-hero p { margin: 0 0 1rem; color: rgba(255,255,255,.48); font: .72rem Orbitron,sans-serif; letter-spacing: .18em; text-transform: uppercase; }.testimonials-hero h1 { margin: 0; font: 750 clamp(3.2rem,9vw,7.2rem)/.88 Orbitron,sans-serif; letter-spacing: -.055em; text-transform: uppercase; }.testimonials-hero h1 span { color: transparent; background: linear-gradient(90deg,#5a88ff,#d8e2ff); background-clip: text; }.hero-rule { width: 100%; height: 1px; margin-top: 3rem; background: linear-gradient(90deg,rgba(255,255,255,.5),transparent); }
.reviews { display: grid; grid-template-columns: repeat(2,minmax(0,1fr)); gap: 1rem; max-width: 1160px; margin: auto; }.review-card { position: relative; display: flex; min-height: 260px; flex-direction: column; gap: 1rem; margin: 0; padding: 1.6rem; border: 1px solid rgba(255,255,255,.11); border-radius: 12px; background: #030405; box-shadow: 0 18px 48px rgba(0,0,0,.3); }.review-number { position: absolute; top: 1.5rem; right: 1.5rem; color: rgba(255,255,255,.2); font: .72rem Orbitron,sans-serif; }.stars { color: #f4c84a; letter-spacing: .08em; }.review-card blockquote { max-width: 44ch; margin: .4rem 0; color: rgba(255,255,255,.82); font-size: clamp(1rem,1.6vw,1.15rem); line-height: 1.65; }.review-card figcaption { display: flex; align-items: center; gap: .7rem; margin-top: auto; }.avatar { display: grid; width: 38px; height: 38px; place-items: center; overflow: hidden; border: 1px solid rgba(255,255,255,.12); border-radius: 50%; background: #111; }.avatar img { width: 100%; height: 100%; object-fit: cover; }.review-card figcaption > span:last-child { display: grid; }.review-card strong { font-size: .9rem; }.review-card small { color: rgba(255,255,255,.48); }
footer { display: grid; grid-template-columns: 1fr 2fr 1fr; gap: 1rem; padding: 2.5rem 6vw; border-top: 1px solid rgba(255,255,255,.1); color: rgba(255,255,255,.45); background: #000; font: .8rem "Space Grotesk",sans-serif; }footer a { color: #fff; font: 700 1rem Orbitron,sans-serif; }footer span:last-child { text-align: right; }
.search-modal { position: fixed; inset: 0; z-index: 999998; display: grid; place-items: center; padding: 1.5rem; background: rgba(0,0,0,.42); backdrop-filter: blur(12px); }.search-card { width: min(620px,94vw); max-height: 78vh; padding: 1.4rem; overflow: auto; border: 1px solid rgba(255,255,255,.12); border-radius: 1rem; color: #fff; background: #000; }.modal-input { display: grid; grid-template-columns: auto 1fr auto; align-items: center; gap: .55rem; padding-bottom: .7rem; border-bottom: 1px solid rgba(255,255,255,.14); }.modal-input svg,.page-result svg,.page-heading svg { width: 20px; height: 20px; fill: none; stroke: currentColor; stroke-width: 1.8; }.page-heading { display: flex; gap: .6rem; padding: 1.2rem 0 .4rem; }.page-result { display: flex; align-items: center; gap: .7rem; width: 100%; padding: .65rem .2rem; border: 0; border-bottom: 1px solid rgba(255,255,255,.12); color: #fff; background: transparent; text-align: left; }.fade-enter-active,.fade-leave-active { transition: opacity 200ms ease; }.fade-enter-from,.fade-leave-to { opacity: 0; }
@media (max-width:700px) { .reviews { grid-template-columns: 1fr; }.review-card { min-height: 230px; }footer { grid-template-columns: 1fr; text-align: center; }footer span:last-child { text-align: center; } }
</style>
