<template>
  <div id="topbarMain" :data-ready="topbarVisible">
    <h3>ZANTIX</h3>

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
      <RouterLink to="/" role="menuitem" data-cursor-hover @click="closeMenu">{{ t('topAbout') }}</RouterLink>
      <RouterLink to="/opensource" role="menuitem" data-cursor-hover @click="closeMenu">{{ t('topAssets') }}</RouterLink>
      <RouterLink to="/Team" role="menuitem" data-cursor-hover @click="closeMenu">{{ t('topDevelopers') }}</RouterLink>
      <RouterLink to="/links" role="menuitem" data-cursor-hover @click="closeMenu">{{ t('pageLinks') }}</RouterLink>
      <RouterLink to="/testimonials" role="menuitem" data-cursor-hover @click="closeMenu">Testimonials</RouterLink>
      <RouterLink :to="{ path: '/', hash: '#tos' }" role="menuitem" data-cursor-hover @click="closeMenu">{{ t('topTOS') }}</RouterLink>
    </div>
  </div>

  <div class="profile-page">
    <template v-if="profile">
      <section class="hero-row reveal" style="--delay: 0s">
        <div id="chosImgC" :style="imgBoxStyle">
          <img
            v-if="showImage"
            :src="profileImageSrc"
            :alt="`${profileName} profile image`"
            @error="onImageError"
          >
          <div v-else class="image-fallback">
            <span class="image-fallback__initial">{{ profileInitial }}</span>
            <p class="image-fallback__label">{{ placeholderLabel }}</p>
          </div>
        </div>

        <aside class="hero-copy" ref="heroCopyRef">
          <div class="hero-top-row">
            <h1 class="developer-title">{{ profileTitle }}</h1>
            <button class="back-btn" type="button" @click="router.back()">{{ backButtonLabel }}</button>
          </div>

          <ul class="quick-facts">
            <li v-for="entry in quickInfoItemsWithExtra" :key="`${entry.label}-${entry.value}`">
              <span>{{ translateLabel(displayLabel(entry.label)) }}</span>
              <strong :data-label="displayLabel(entry.label)">{{ translateUnits(entry.value) }}</strong>
            </li>
          </ul>
        </aside>
      </section>

      <section class="content-grid reveal" style="--delay: 0.06s">
        <article v-if="detailInfoItems.length" class="meta-card reveal" style="--delay: 0.1s">
          <div class="card-head">
            <p class="card-eyebrow">{{ t('infoTitle') }}</p>
          </div>
          <div class="meta-list">
            <div
              class="meta-row"
              v-for="entry in detailInfoItems"
              :key="`${entry.label}-${entry.value}`"
              :style="{ '--accent': accentColor }"
            >
              <span class="meta-label" :data-label="entry.label">{{ translateLabel(displayLabel(entry.label)) }}</span>
              <span class="meta-dots" aria-hidden="true"></span>
              <span class="meta-value" :data-label="entry.label">{{ translateUnits(entry.value) }}</span>
            </div>
          </div>
        </article>

        <article v-if="roleItems.length" class="meta-card reveal" style="--delay: 0.14s">
          <div class="card-head">
            <p class="card-eyebrow">{{ t('rolesTitle') }}</p>
          </div>
          <ul class="role-list">
            <li v-for="role in roleItems" :key="role">
              <span class="role-icon" :data-kind="roleKind(role)" aria-hidden="true">
                <svg
                  v-if="roleKind(role) === 'building'"
                  viewBox="0 0 56 56"
                  role="presentation"
                  focusable="false"
                >
                  <path d="M 39.4615 8.1276 C 33.7743 2.4840 22.1821 1.8521 15.5362 8.5416 C 14.4467 9.6093 14.6428 10.8295 15.3836 11.5704 C 15.9066 12.1151 16.7346 12.3548 17.5191 12.1151 C 22.1603 10.6552 26.4529 10.5245 29.8739 13.0521 L 28.0436 17.9330 C 27.3463 19.8288 27.7167 21.1579 28.9587 22.4217 L 33.9922 27.4770 C 34.9945 28.5011 36.1059 28.8062 37.5658 28.4575 L 41.0959 27.6513 L 42.7953 29.3510 L 42.5119 31.8350 C 42.3597 32.8591 42.4905 33.4910 43.3839 34.3844 L 45.0832 36.0187 C 46.0204 36.9556 47.2186 37.0428 48.1120 36.1494 L 55.1066 29.1984 C 56 28.3050 55.8692 27.1066 54.9540 26.1478 L 53.2765 24.4700 C 52.4264 23.5984 51.7512 23.4241 50.7703 23.5766 L 48.2646 23.8817 L 46.5434 22.2257 L 47.5889 18.4778 C 47.9161 17.2576 47.5019 16.1245 46.1944 14.8389 Z M 2.2225 44.8000 C .1089 46.6739 0 48.6350 1.9611 50.6179 L 5.4257 54.0607 C 7.3650 56 9.3914 55.8910 11.2436 53.7992 L 32.2273 30.2443 L 25.7774 23.8163 Z"/>
                </svg>
                <svg
                  v-else-if="roleKind(role) === 'terrain'"
                  viewBox="0 0 24 24"
                  role="presentation"
                  focusable="false"
                >
                  <path d="M8 10L3 18H13L8 10Z"/>
                  <path d="M10.5286 10.7543L13.5 6L21 18H15.0572L10.5286 10.7543Z"/>
                </svg>
                <svg
                  v-else-if="roleKind(role) === 'modeling'"
                  viewBox="0 0 1024 1024"
                  role="presentation"
                  focusable="false"
                >
                  <path d="M904.630857 240.054857c0.950857-9.435429-7.021714-19.382857-16.676571-24.283428L461.531429 2.633143a24.137143 24.137143 0 0 0-21.796572 0L13.531429 215.771429c-15.872 10.386286-13.385143 33.426286-13.385143 35.84V706.56c0 8.411429 4.388571 16.310857 11.702857 20.772571 0 0 417.060571 252.050286 424.228571 255.268572 14.628571 7.241143 23.844571 5.266286 30.72 1.755428L605.622857 904.045714c11.849143-6.948571 12.8-17.481143 11.264-35.693714-1.536-18.139429-17.408-28.013714-29.037714-21.284571-11.702857 6.656-103.497143 61.952-103.497143 61.952V493.568L852.114286 279.405714l38.692571-23.405714c7.68-4.973714 12.726857-11.337143 13.750857-15.945143z m-486.4 663.917714L63.780571 687.908571V290.230857L418.157714 493.714286v410.185143z m32.402286-476.525714L113.517714 236.324571 450.633143 67.876571l337.042286 168.448-337.042286 191.122286z m554.276571 335.872l-189.44 113.737143c-10.605714 7.387429-21.796571-0.877714-21.796571-0.877714-1.024-0.219429-188.635429-112.859429-188.635429-112.859429a18.139429 18.139429 0 0 1-8.850285-15.579428v-203.337143c0-6.582857 3.364571-18.066286 16.822857-23.259429l183.808-101.668571a18.870857 18.870857 0 0 1 16.091428 0l184.027429 101.668571h-1.462857c0.512 0 1.243429 0 1.755428 0.292572l4.754286 2.413714c5.997714 2.852571 11.556571 8.045714 11.556571 15.36v208.457143a18.432 18.432 0 0 1-8.630857 15.652571zM667.209143 540.818286l136.630857 76.726857 138.605714-76.726857L803.84 464.457143 667.209143 540.818286z m163.84 277.942857l139.702857-84.260572V582.802286l-139.702857 79.213714v156.672z m-49.517714-2.486857V662.747429l-136.996572-77.531429v148.48l136.996572 82.651429z"/>
                </svg>
                <svg
                  v-else-if="roleKind(role) === 'scripting'"
                  viewBox="0 0 24 24"
                  role="presentation"
                  focusable="false"
                >
                  <path d="M14.9615 5.27473C15.1132 4.7437 14.8058 4.19021 14.2747 4.03849C13.7437 3.88677 13.1902 4.19426 13.0385 4.72529L9.03847 18.7253C8.88675 19.2563 9.19424 19.8098 9.72528 19.9615C10.2563 20.1133 10.8098 19.8058 10.9615 19.2747L14.9615 5.27473Z" fill="currentColor"/>
                  <path d="M5.7991 7.39879C6.13114 7.84012 6.04255 8.46705 5.60123 8.7991L2.40894 11.2009C1.87724 11.601 1.87723 12.399 2.40894 12.7991L5.60123 15.2009C6.04255 15.533 6.13114 16.1599 5.7991 16.6012C5.46705 17.0426 4.84012 17.1311 4.39879 16.7991L1.20651 14.3973C-0.388615 13.1971 -0.388621 10.8029 1.2065 9.60276L4.39879 7.20093C4.84012 6.86889 5.46705 6.95747 5.7991 7.39879Z" fill="currentColor"/>
                  <path d="M18.2009 16.6012C17.8689 16.1599 17.9575 15.533 18.3988 15.2009L21.5911 12.7991C22.1228 12.399 22.1228 11.601 21.5911 11.2009L18.3988 8.7991C17.9575 8.46705 17.8689 7.84012 18.2009 7.39879C18.533 6.95747 19.1599 6.86889 19.6012 7.20093L22.7935 9.60276C24.3886 10.8029 24.3886 13.1971 22.7935 14.3973L19.6012 16.7991C19.1599 17.1311 18.533 17.0426 18.2009 16.6012Z" fill="currentColor"/>
                </svg>
                <svg
                  v-else-if="roleKind(role) === 'uiux'"
                  viewBox="0 0 72 72"
                  role="presentation"
                  focusable="false"
                  fill="currentColor"
                >
                  <path d="M67.5,27.568c0,3.828-3.104,6.932-6.932,6.932H10.432c-3.828,0-6.932-3.104-6.932-6.932V10.432 C3.5,6.604,6.604,3.5,10.432,3.5h50.137c3.828,0,6.932,3.104,6.932,6.932V27.568z M63.5,10.432c0-1.619-1.313-2.932-2.932-2.932 H10.432C8.813,7.5,7.5,8.813,7.5,10.432v17.137c0,1.619,1.313,2.932,2.932,2.932h50.137c1.619,0,2.932-1.313,2.932-2.932 V10.432z"/>
                  <path d="M11.5,19.5c-0.553,0-1-0.447-1-1v-1.802c0-2.556,1.246-5.198,3.96-5.198h6.664c0.553,0,1,0.447,1,1 s-0.447,1-1,1H14.46c-1.462,0-1.96,1.626-1.96,3.198V18.5C12.5,19.053,12.052,19.5,11.5,19.5z"/>
                  <path d="M10.694,22.93c-0.26,0-0.521-0.11-0.71-0.29c-0.19-0.189-0.29-0.45-0.29-0.71s0.1-0.52,0.29-0.71 c0.38-0.38,1.04-0.37,1.41,0c0.189,0.19,0.3,0.45,0.3,0.71s-0.11,0.521-0.29,0.7C11.204,22.819,10.954,22.93,10.694,22.93z"/>
                  <path d="M46.5,61.568c0,3.828-3.104,6.932-6.932,6.932H10.432c-3.828,0-6.932-3.104-6.932-6.932V44.432 c0-3.828,3.104-6.932,6.932-6.932h29.137c3.828,0,6.932,3.104,6.932,6.932V61.568z M42.5,44.432c0-1.619-1.313-2.932-2.932-2.932 H10.432c-1.619,0-2.932,1.313-2.932,2.932v17.137c0,1.619,1.313,2.932,2.932,2.932h29.137c1.619,0,2.932-1.313,2.932-2.932 V44.432z"/>
                  <path d="M68.5,61.568c0,3.828-3.104,6.932-6.932,6.932h-5.137c-3.828,0-6.932-3.104-6.932-6.932V44.432 c0-3.828,3.104-6.932,6.932-6.932h5.137c3.828,0,6.932,3.104,6.932,6.932V61.568z M64.5,44.432c0-1.619-1.313-2.932-2.932-2.932 h-5.137c-1.619,0-2.932,1.313-2.932,2.932v17.137c0,1.619,1.313,2.932,2.932,2.932h5.137c1.619,0,2.932-1.313,2.932-2.932 V44.432z"/>
                </svg>
                <svg
                  v-else-if="roleKind(role) === 'website'"
                  viewBox="0 0 24 24"
                  role="presentation"
                  focusable="false"
                >
                  <rect x="3.5" y="4.5" width="17" height="15" rx="2" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M3.5 8.5h17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <circle cx="6.5" cy="6.5" r=".9" fill="currentColor"/>
                  <circle cx="9.3" cy="6.5" r=".9" fill="currentColor"/>
                  <circle cx="12.1" cy="6.5" r=".9" fill="currentColor"/>
                  <path d="M7.5 12h9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M7.5 15h9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <svg
                  v-else-if="roleKind(role) === 'animation'"
                  viewBox="0 0 32 32"
                  role="presentation"
                  focusable="false"
                >
                  <path d="m12 0c5.4151823 0 9.9925965 3.58691186 11.4859504 8.51444349 4.9271377 1.49296001 8.5140496 6.07037421 8.5140496 11.48555651 0 6.627417-5.372583 12-12 12-5.4151823 0-9.9925965-3.5869119-11.4859504-8.5144435-4.92713774-1.49296-8.5140496-6.0703742-8.5140496-11.4855565 0-6.627417 5.372583-12 12-12zm11.9402563 10.8062169.0258149.2845646c.0224842.30013.0339288.6033377.0339288.9092185 0 6.627417-5.372583 12-12 12-.402726 0-.8008184-.0198387-1.1933532-.0585922 1.5288963 3.5625361 5.0696322 6.0585922 9.1933532 6.0585922 5.5228475 0 10-4.4771525 10-10 0-4.123721-2.4960561-7.6644569-6.0597437-9.1937831zm-3.9402563-.8062169c-5.5228475 0-10 4.4771525-10 10 0 .6258035.0574846 1.2381808.1674616 1.8321394.5943576.110376 1.2067349.1678606 1.8325384.1678606 5.5228475 0 10-4.4771525 10-10 0-.6258035-.0574846-1.2381808-.1674616-1.8321394-.5943576-.110376-1.2067349-.1678606-1.8325384-.1678606zm-8-8c-5.5228475 0-10 4.4771525-10 10 0 4.123721 2.49605607 7.6644569 6.05974369 9.1937831-.03990496-.3929647-.05974369-.7910571-.05974369-1.1937831 0-6.627417 5.372583-12 12-12 .402726 0 .8008184.01983873 1.1933532.05859222-1.5288963-3.56253615-5.0696322-6.05859222-9.1933532-6.05859222z" fill="currentColor"/>
                </svg>
                <svg
                  v-else-if="roleKind(role) === 'vfx'"
                  viewBox="0 0 512 512"
                  role="presentation"
                  focusable="false"
                >
                  <path d="M20.916 15.648c147.945 202 202.556 312.645-3.146 252.438 201.76 82.926 225.515 176.51 49.13 180.76 190.922 51.156 315.057 60.258 377.16 10.43 67.76-54.368 62.6-177.648 13.31-361.6-.002 179.943-88.34 149.935-171.18-39.96 60.246 191.39-81.408 116.353-265.274-42.068zM457.37 97.676v-.008.008zm-79.792 150.84c5.457.054 10.994.79 16.508 2.267 3.763 1.01 7.352 2.34 10.77 3.924-.053-.058-.102-.12-.155-.178 51.248 21.08 79.986 77.264 65.253 132.25-16.008 59.742-77.174 95.054-136.914 79.046-59.29-15.886-94.507-76.24-79.395-135.547 1.144 7.843 3.71 15.465 7.808 22.564 15.038 26.045 46.48 37.745 78.735 32.334 8.387-.382 17.33-2.932 25.75-7.793 22.18-12.807 32.317-36.774 22.642-53.53-9.676-16.76-35.5-19.966-57.682-7.16-7.3 4.214-13.283 9.64-17.697 15.618-3.05-11-3.31-22.928-.14-34.75 7.978-29.778 35.053-49.34 64.518-49.047z" fill="currentColor"/>
                </svg>
                <span v-else class="role-dot">•</span>
              </span>
              <span class="role-label">{{ translateRole(role) }}</span>
            </li>
          </ul>
        </article>

        <article v-if="experienceItems.length" class="meta-card reveal" style="--delay: 0.18s">
          <div class="card-head">
            <p class="card-eyebrow">{{ t('experienceTitle') }}</p>
          </div>
          <div class="meta-list">
            <div
              class="meta-row experience-row"
              v-for="entry in experienceItems"
              :key="`${entry.label}-${entry.value}`"
              :style="{ '--accent': accentColor }"
            >
              <span class="meta-label" :data-label="entry.label">{{ translateLabel(displayLabel(entry.label)) }}</span>
              <span class="meta-dots" aria-hidden="true"></span>
              <span class="meta-value" :data-label="entry.label">{{ translateExperienceValue(entry.value) }}</span>
            </div>
          </div>
        </article>

        <article
          v-if="commissionItems.length"
          class="meta-card reveal"
          style="--delay: 0.22s"
          :data-com-state="commissionState"
        >
          <div class="card-head">
            <p class="card-eyebrow">{{ t('commissionsTitle') }}</p>
          </div>
          <div class="meta-list">
            <div
              class="meta-row"
              v-for="entry in commissionItems"
              :key="`${entry.label}-${entry.value}`"
              :style="{ '--accent': accentColor }"
            >
              <span class="meta-label" :data-label="entry.label">{{ translateLabel(displayLabel(entry.label)) }}</span>
              <span class="meta-dots" aria-hidden="true"></span>
              <span class="meta-value" :data-label="entry.label">{{ translateValueForLabel(entry.label, entry.value) }}</span>
            </div>
          </div>
        </article>
      </section>

      <section class="contacts-row reveal" style="--delay: 0.26s" v-if="contactItems.length || profileLinkItems.length">
        <article v-if="contactItems.length" class="meta-card reveal" style="--delay: 0.3s">
          <div class="card-head">
            <p class="card-eyebrow">{{ t('contactsTitle') }}</p>
          </div>
          <div class="meta-list">
            <div
              class="meta-row"
              v-for="entry in contactItems"
              :key="`${entry.label}-${entry.value}`"
              :style="{ '--accent': accentColor }"
            >
              <span class="meta-label" :data-label="entry.label">{{ translateLabel(displayLabel(entry.label)) }}</span>
              <span class="meta-dots" aria-hidden="true"></span>
              <span class="meta-value" :data-label="entry.label">
                <a v-if="entry.isEmail" :href="`mailto:${entry.value}`" data-cursor-hover>{{ entry.value }}</a>
                <span v-else>{{ entry.value }}</span>
              </span>
            </div>
          </div>
        </article>

        <article v-if="profileLinkItems.length" class="meta-card reveal" style="--delay: 0.34s">
          <div class="card-head">
            <p class="card-eyebrow">{{ t('profilesTitle') }}</p>
          </div>
          <ul class="link-list">
            <li v-for="entry in profileLinkItems" :key="`${entry.label}-${entry.href}`">
              <span class="meta-label">{{ translateLabel(displayLabel(entry.label)) }}</span>
              <a :href="entry.href" target="_blank" rel="noopener" data-cursor-hover>{{ entry.href }}</a>
            </li>
          </ul>
        </article>
      </section>

      <section
        v-if="profileGroup === 'dev' && otherDevs.length"
        class="more-devs reveal"
        style="--delay: 0.34s"
        :aria-label="t('moreDevsTitle')"
        :style="{ '--accent': accentColor }"
      >
        <div class="card-head more-devs__head">
          <p class="card-eyebrow">{{ t('moreDevsTitle') }}</p>
          <RouterLink to="/Team" class="more-devs__cta" data-cursor-hover>{{ t('viewAllDevelopers') }}</RouterLink>
        </div>
        <div class="more-devs__grid">
          <article
            v-for="dev in otherDevs"
            :key="dev.slug"
            class="more-dev-card"
            data-cursor-hover
            :style="{ '--accent': dev.accent || accentColor }"
            role="button"
            tabindex="0"
            @click="openDevProfile(dev.slug)"
            @keydown.enter.prevent="openDevProfile(dev.slug)"
            @keydown.space.prevent="openDevProfile(dev.slug)"
          >
            <div class="more-dev-body">
              <p class="more-dev-name">{{ dev.name }}</p>
              <p class="more-dev-role">{{ dev.title }}</p>
              <p class="more-dev-rank">{{ formatRankPreview(dev.rank) }}</p>
            </div>
          </article>
        </div>
      </section>

      <footer class="profile-footer reveal" style="--delay: 0.38s">
        <div class="footer-brand">
          <img src="@/assets/img/logo/Logo.png" alt="Zantix logo">
          <div>
            <p class="footer-eyebrow">Zantix</p>
            <p class="footer-note">Studios • Assets • Team</p>
          </div>
        </div>
        <div class="footer-bottom">
          <span>© Zantix Studio</span>
          <span class="footer-divider">•</span>
          <span>All rights reserved</span>
        </div>
      </footer>
    </template>

    <p v-else-if="isLoading" class="state-message">{{ t('loadingProfile') }}</p>
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
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch, nextTick, h } from "vue";
import { useRoute, useRouter } from "vue-router";
import SmoothCursor from "@/components/SmoothCursor.vue";
import { socialSearchPages } from "@/lib/socialSearchPages";
import { matchesSearch } from "@/lib/searchMatch";

type FieldValue = string | number | boolean | string[] | null | undefined;
type JsonLoader = () => Promise<unknown>;

interface ProfileData {
  Title?: string;
  Rank?: string;
  Accent?: string;
  Earned?: string;
  Contract?: string;
  Info?: Record<string, FieldValue>;
  Role?: string[];
  Experience?: Record<string, FieldValue>;
  Commissions?: Record<string, FieldValue>;
  Contact?: Record<string, FieldValue>;
  Profile?: Record<string, string>;
  Profiles?: Record<string, string>;
}

interface DisplayEntry {
  label: string;
  value: string;
}

interface ContactEntry extends DisplayEntry {
  isEmail: boolean;
}

interface LinkEntry {
  label: string;
  href: string;
}

interface ProfilePreview {
  slug: string;
  title: string;
  name: string;
  roles: string[];
  accent: string;
  rank: string;
}

const route = useRoute();
const router = useRouter();
const devFiles = import.meta.glob("../assets/json data/devs/*.json", { query: "?json" }) as Record<string, JsonLoader>;
const curatorFiles = import.meta.glob("../assets/json data/curators/*.json", { query: "?json" }) as Record<string, JsonLoader>;
const devImages = import.meta.glob("../assets/json data/devs/images/*.{png,jpg,jpeg,webp,avif}", {
  eager: true,
  import: "default",
}) as Record<string, string>;
const curatorImages = import.meta.glob("../assets/json data/curators/images/*.{png,jpg,jpeg,webp,avif}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const topbarVisible = ref(false);
const menuOpen = ref(false);
const topbarMenuRef = ref<HTMLElement | null>(null);
const hamburgerRef = ref<HTMLButtonElement | null>(null);
const searchInput = ref<HTMLInputElement | null>(null);
const modalSearchInput = ref<HTMLInputElement | null>(null);
const heroCopyRef = ref<HTMLElement | null>(null);
const boxHeight = ref<number | null>(null);
const backButtonLabel = "← Back";
const searchModalOpen = ref(false);
const searchQuery = ref("");
const previousOverflow = ref<string | null>(null);
const STORAGE_THEME_KEY = "zantixTheme";

const readStoredTheme = (): "dark" | "light" | "system" | null => {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem(STORAGE_THEME_KEY) ?? localStorage.getItem("zantix-theme");
  return stored === "dark" || stored === "light" || stored === "system" ? stored : null;
};


const prefersDark = typeof window !== "undefined"
  ? window.matchMedia("(prefers-color-scheme: dark)")
  : null;

const theme = ref<"dark" | "light" | "system">(readStoredTheme() ?? "system");
const themeOpen = ref(false);
const pagesOpen = ref(true);
const projectsOpen = ref(false);
const pages = [
  { slug: "home", label: "Home", href: "/" },
  { slug: "assets", label: "Open Source", href: "/opensource" },
  { slug: "developers", label: "Developers", href: "/Team" },
  { slug: "links", label: "Links", href: "/links" },
  { slug: "featured", label: "Featured Work", href: "/#A3" },
  { slug: "testimonials", label: "Testimonials", href: "/testimonials" },
  { slug: "contact", label: "Contact", href: "/#FooterMain" },
  { slug: "tos", label: "TOS", href: "/#tos" },
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
const translations: Record<string, string> = {
  searchPlaceholder: "Search",
  searchMain: "Search",
  searchLabel: "Search",
  menuLabel: "Menu",
  topAbout: "About Zantix",
  topAssets: "Open Source",
  topDevelopers: "Zantix Team",
  topTOS: "Zantix TOS",
  infoTitle: "Info",
  rolesTitle: "Roles",
  experienceTitle: "Experience",
  commissionsTitle: "Commissions",
  contactsTitle: "Contacts",
  profilesTitle: "Profiles",
  loadingProfile: "Loading profile...",
  notListed: "Not listed",
  themeLabel: "Theme",
  pagesLabel: "Pages",
  pageHome: "Home",
  pageAssets: "Open Source",
  pageDevelopers: "Developers",
  pageLinks: "Links",
  pageTOS: "TOS",
  moreDevsTitle: "More developers",
  viewAllDevelopers: "View all devs",
};
const t = (key: string) => translations[key] ?? key;
const normalizeToken = (value: string) =>
  value.trim().toLowerCase().replace(/\s+/g, " ");
const dictionaries = {
  en: {
    roles: {
      builder: "Builder",
      "terrain editor": "Terrain",
      modeling: "Modeling",
      "ui/ux": "UI/UX",
      "ui designer": "UI Designer",
      scripter: "Scripter",
      "modulescript scripter": "ModuleScript Scripter",
      "website creator": "Website Creator",
      "website development": "Website Development",
    },
    experience: {
      building: "Building",
      "terrain editor": "Terrain",
      modeling: "Modeling",
      "ui/ux": "UI/UX",
      "website development": "Website Development",
      luau: "Luau",
    },
    commissionState: {
      open: "Open",
      closed: "Closed",
    },
    commissions: {
      modulescripts: "ModuleScripts",
      "module scripts": "ModuleScripts",
      "client logic": "Client logic",
      "ui/ux": "UI/UX",
      paypal: "PayPal",
    },
    yn: {
      yes: "Yes",
      no: "No",
    },
    units: {
      year: "year",
      years: "years",
      month: "month",
      months: "months",
      day: "day",
      days: "days",
    },
    labels: {
      availability: "Availability",
      "not availability": "Not available",
      "not available": "Not available",
      timezone: "Timezone",
      origin: "Origin",
      contract: "Contract",
      earned: "Earned",
      rank: "Rank",
      name: "Name",
      state: "State",
      status: "Status",
      "commission state": "State",
      "preferred work": "Preferred work",
      "payment platform": "Payment platform",
      hourly: "Hourly",
      upfront: "Upfront",
      turnaround: "Turnaround",
      refunds: "Refunds",
      "discord username": "Discord username",
      "roblox username": "Roblox username",
      "email contact": "Email",
      email: "Email",
      contact: "Contact",
      phone: "Phone",
    },
  },
} as const;
const getDictionary = () => dictionaries.en;
const translateToken = (value: string, map: Record<string, string>) =>
  map[normalizeToken(value)] ?? value;
const translateUnits = (value: string) => {
  const dict = getDictionary();
  return value
    .replace(/\b(yes|no)\b/gi, (match) => dict.yn[normalizeToken(match)] ?? match)
    .replace(/\b(years?|months?|days?)\b/gi, (match) => dict.units[normalizeToken(match)] ?? match);
};
const translateExperienceValue = (value: string) => {
  if (!value) return t("notListed");
  const translated = translateToken(value, getDictionary().experience);
  return translateUnits(translated);
};
const translateCommissionState = (value: string) => {
  if (!value) return t("notListed");
  return translateToken(value, getDictionary().commissionState);
};
const translateCommaSeparated = (value: string, map: Record<string, string>) =>
  value
    .split(/\s*,\s*/)
    .map((token) => translateToken(token, map))
    .join(", ");
const translateCommissionValue = (label: string, value: string) => {
  const dict = getDictionary();
  const lowerLabel = label.toLowerCase();
  if (lowerLabel.includes("state") || lowerLabel.includes("status")) {
    return translateCommissionState(value);
  }
  return translateUnits(translateCommaSeparated(value, dict.commissions));
};
const translateRole = (value: string) => translateToken(value, getDictionary().roles);
const translateLabel = (value: string) => translateToken(value, getDictionary().labels);
const translateValueForLabel = (label: string, value: string) => {
  const lower = label.toLowerCase();
  if (lower.includes("state") || lower.includes("status")) return translateCommissionState(value);
  if (lower.includes("commission") || lower.includes("preferred") || lower.includes("work")) {
    return translateCommissionValue(label, value);
  }
  return translateUnits(value);
};
const profile = ref<ProfileData | null>(null);
const profileImageSrc = ref("");
const imageLoadFailed = ref(false);
const isLoading = ref(true);
const profileGroup = ref<"dev" | "curator">("dev");
const otherDevs = ref<ProfilePreview[]>([]);

let cachedDevPreviews: ProfilePreview[] | null = null;

let introTimerId = 0;

const closeMenu = () => {
  menuOpen.value = false;
};

const openSearchModal = () => {
  searchModalOpen.value = true;
  menuOpen.value = false;
  pagesOpen.value = true;
  projectsOpen.value = false;
  if (previousOverflow.value === null) {
    previousOverflow.value = document.documentElement.style.overflow || "";
    document.documentElement.style.overflow = "hidden";
  }
  requestAnimationFrame(() => {
    modalSearchInput.value?.focus();
  });
};

const closeSearchModal = () => {
  searchModalOpen.value = false;
  searchQuery.value = "";
  if (previousOverflow.value !== null) {
    document.documentElement.style.overflow = previousOverflow.value;
    previousOverflow.value = null;
  }
};

const filteredPages = computed(() => {
  const q = searchQuery.value.trim().toLowerCase();
  if (!q) return pages.filter((page) => !page.searchOnly);
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
const pagesShouldOpen = computed(
  () => pagesOpen.value || (searchQuery.value.trim() && filteredPages.value.length > 0),
);
const projectsShouldOpen = computed(
  () => projectsOpen.value || (searchQuery.value.trim() && filteredOpenSourceProjects.value.length > 0),
);
const togglePages = () => {
  pagesOpen.value = !pagesOpen.value;
};
const toggleProjects = () => {
  projectsOpen.value = !projectsOpen.value;
};
const selectPage = async (_slug: string, href: string) => {
  closeSearchModal();
  menuOpen.value = false;
  await router.push(href).catch(() => {});
};
const selectOpenSourceProject = async (slug: string) => {
  closeSearchModal();
  menuOpen.value = false;
  await router.push(`/opensource#${slug}`).catch(() => {});
};
const filteredThemes = computed(() => {
  const q = searchQuery.value.trim().toLowerCase();
  if (!q) return themeOptions;
  return themeOptions.filter(
    (opt) => opt.label.toLowerCase().includes(q) || opt.value.toLowerCase().includes(q),
  );
});
const extraQuickEntry = computed<DisplayEntry | null>(() => {
  const candidates = ["Languages", "Origin", "Contact", "Email"];
  return (
    orderedInfoItems.value.find((entry) =>
      candidates.some((label) => entry.label.toLowerCase() === label.toLowerCase()),
    ) ?? null
  );
});

const quickInfoItemsWithExtra = computed<DisplayEntry[]>(() => {
  const items: DisplayEntry[] = [];
  items.push({ label: "Name", value: profileName.value });
  if (profile.value?.Rank) items.push({ label: "Rank", value: displayRank.value });
  items.push({ label: "Earned", value: toText(profile.value?.Earned ?? "—") });
  items.push({ label: "Timezone", value: toText(profile.value?.Info?.Timezone ?? "") });
  return items.filter((entry) => entry.value !== "");
});

const detailInfoItems = computed(() => {
  const order = ["Availability", "Not Availability", "Origin", "Languages"];
  const byLabel = new Map(
    orderedInfoItems.value.map((entry) => [entry.label.toLowerCase(), entry]),
  );
  const out: DisplayEntry[] = [];
  for (const label of order) {
    const found = byLabel.get(label.toLowerCase());
    if (found && found.value) out.push(found);
  }
  if (profile.value?.Contract) {
    out.push({ label: "Contract", value: toText(profile.value.Contract) });
  }
  return out;
});

const roleItems = computed(() =>
  (profile.value?.Role ?? []).map((role) => role.trim()).filter((role) => role !== ""),
);
const roleKind = (role: string) => {
  const normalized = role.toLowerCase();
  const hasAny = (tokens: string[]) => tokens.some((token) => normalized.includes(token));
  if (normalized.includes("build")) return "building";
  if (normalized.includes("terrain")) return "terrain";
  if (normalized.includes("model")) return "modeling";
  if (hasAny(["script", "code", "program"])) return "scripting";
  if (hasAny(["ui/ux", "ui ux", "uiux", "ux/ui", "ux designer", "ui designer", "user interface"])) return "uiux";
  if (hasAny(["website", "web ", " web", "frontend", "front-end", "backend", "back-end", "fullstack", "full-stack"])) return "website";
  if (normalized.includes("anim")) return "animation";
  if (hasAny(["vfx", " fx", "effects"])) return "vfx";
  return "default";
};

const experienceItems = computed(() => entriesFromRecord(profile.value?.Experience));
const commissionItems = computed(() => entriesFromRecord(profile.value?.Commissions));
const commissionState = computed(() => {
  const state = toText(profile.value?.Commissions?.State ?? profile.value?.Commissions?.Status ?? "");
  const lower = state.toLowerCase();
  if (lower.includes("open")) return "open";
  if (lower.includes("closed")) return "closed";
  return "";
});
const imgBoxStyle = computed(() =>
  boxHeight.value
    ? {
        height: `${boxHeight.value}px`,
        minHeight: `${boxHeight.value}px`,
        maxHeight: `${boxHeight.value}px`,
      }
    : {},
);
const contactItems = computed<ContactEntry[]>(() =>
  entriesFromRecord(profile.value?.Contact).map((entry) => ({
    ...entry,
    isEmail: entry.label.toLowerCase().includes("email"),
  })),
);
const safeUrl = (href: string): string => {
  const trimmed = href.trim();
  if (trimmed.toLowerCase().startsWith("mailto:")) return trimmed;
  if (!/^https?:\/\//i.test(trimmed)) return "#";
  try {
    const parsed = new URL(trimmed);
    return parsed.href;
  } catch {
    return "#";
  }
};

const profileLinkItems = computed<LinkEntry[]>(() => {
  const source = profile.value?.Profile ?? profile.value?.Profiles ?? {};
  return Object.entries(source)
    .map(([label, href]) => ({ label, href: safeUrl(href) }))
    .filter((entry) => entry.href !== "#");
});

const loadDevPreviews = async (): Promise<ProfilePreview[]> => {
  if (cachedDevPreviews) return cachedDevPreviews;
  const entries = await Promise.all(
    Object.entries(devFiles).map(async ([path, loader]) => {
      try {
        const data = normalizeModule(await loader());
        const accent = accentToHex(toText(data.Accent ?? ""));
        const infoName = toText(data.Info?.Name);
        const rank = toText(data.Rank ?? "");
        return {
          slug: slugFromPath(path),
          title: data.Title || infoName || "Developer",
          name: infoName || data.Title || "Developer",
          roles: data.Role ?? [],
          accent,
          rank,
        } as ProfilePreview;
      } catch (err) {
        console.warn("Unable to load dev preview", err);
        return null;
      }
    }),
  );
  cachedDevPreviews = entries.filter((entry): entry is ProfilePreview => Boolean(entry));
  return cachedDevPreviews;
};

const refreshOtherDevs = async (currentSlug: string) => {
  const list = await loadDevPreviews();
  otherDevs.value = list.filter((dev) => dev.slug !== currentSlug).slice(0, 3);
};

const formatRolePreview = (roles: string[]) =>
  roles && roles.length
    ? roles.slice(0, 2).map((role) => translateRole(role)).join(" • ")
    : t("notListed");

const formatRankPreview = (rank: string) => {
  const upper = rank.toUpperCase();
  if (upper === "L") return "Lead Dev";
  if (upper === "H") return "High";
  if (upper) return upper;
  return "Developer";
};

const openDevProfile = (slug: string) => {
  router.push({ name: "developer-profile", params: { group: "dev", slug } }).catch(() => {});
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const syncHeights = () => {
  const heroCopy = heroCopyRef.value;
  const imgBox = document.getElementById("chosImgC");
  if (!heroCopy || !imgBox) return;
  const { top, bottom } = heroCopy.getBoundingClientRect();
  const height = Math.max(160, bottom - top);
  boxHeight.value = height;
};

const displayLabel = (label: string) => {
  const lower = label.toLowerCase();
  if (lower.includes("not availability") || lower.includes("not available")) return "Not Available";
  if (lower === "availability") return "Availability";
  if (lower === "avalibltiy") return "Availability";
  if (lower === "avaliblity") return "Availability";
  if (lower === "rank") return "Rank";
  return label;
};

const accentToHex = (raw: string) => {
  const lower = raw.toLowerCase();
  if (lower.includes("purple")) return "#b78cff";
  if (lower.includes("pink")) return "#ff8ad6";
  if (lower.includes("green")) return "#7fffb1";
  if (lower.includes("gold")) return "#f6c452";
  if (lower.includes("red")) return "#ff7373";
  return "#9fcbff";
};

const accentColor = computed(() => accentToHex(toText(profile.value?.Accent)));

const profileTitle = computed(() => profile.value?.Title || "Developer");
const profileName = computed(() => {
  const infoName = toText(profile.value?.Info?.Name);
  return infoName || profileTitle.value;
});
const displayRank = computed(() => {
  const raw = profile.value?.Rank?.toUpperCase() ?? "";
  if (raw === "L") return "Lead Dev";
  if (raw === "H") return "High";
  return raw || "Developer";
});
const profileRank = computed(() => (profile.value?.Rank ? displayRank.value : "Developer Profile"));
const profileInitial = computed(() => profileName.value.charAt(0).toUpperCase() || "?");
const showImage = computed(() => profileImageSrc.value !== "" && !imageLoadFailed.value);
const placeholderLabel = computed(() =>
  profileImageSrc.value === "" ? "No profile image uploaded" : "Image unavailable",
);

const findImageForSlug = (group: "dev" | "curator", slug: string) => {
  const images = group === "curator" ? curatorImages : devImages;
  const path = Object.keys(images).find((key) => slugFromPath(key) === slug);
  return path ? images[path] : "";
};

const onImageError = () => {
  imageLoadFailed.value = true;
};

const loadProfile = async () => {
  isLoading.value = true;
  profile.value = null;
  profileImageSrc.value = "";
  imageLoadFailed.value = false;

  const group = route.params.group === "curator" ? "curator" : "dev";
  profileGroup.value = group;
  const requestedSlug = typeof route.params.slug === "string"
    ? route.params.slug.toLowerCase()
    : "nikola";
  const files = group === "curator" ? curatorFiles : devFiles;
  const filePath = Object.keys(files).find((path) => slugFromPath(path) === requestedSlug);

  if (filePath) {
    try {
      const loaded = await files[filePath]();
      profile.value = normalizeModule(loaded);
    } catch (err) {
      console.warn("Unable to load profile", err);
    }
  }

  profileImageSrc.value = findImageForSlug(group, requestedSlug);
  if (group === "dev") {
    void refreshOtherDevs(requestedSlug);
  } else {
    otherDevs.value = [];
  }
  isLoading.value = false;
  if (!profile.value) {
    void router.replace({ name: "not-found", query: { from: route.fullPath } });
  }
  await nextTick();
  syncHeights();
};

const handleDocumentClick = (event: MouseEvent) => {
  if (!menuOpen.value) return;
  const target = event.target as Node | null;
  if (!target) return;
  if (topbarMenuRef.value?.contains(target)) return;
  if (hamburgerRef.value?.contains(target)) return;
  menuOpen.value = false;
};

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === "/" && !searchModalOpen.value) {
    event.preventDefault();
    openSearchModal();
    return;
  }
  if (event.key === "Escape" && searchModalOpen.value) {
    closeSearchModal();
    return;
  }
  if (event.key === "Enter" && searchModalOpen.value) {
    const first = filteredPages.value[0];
    if (first) {
      event.preventDefault();
      void selectPage(first.slug, first.href);
      return;
    }
    const project = filteredOpenSourceProjects.value[0];
    if (project) {
      event.preventDefault();
      void selectOpenSourceProject(project.slug);
    }
  }
};

watch(
  () => [route.params.group, route.params.slug],
  () => {
    void loadProfile();
  },
  { immediate: true },
);

watch(
  () => route.fullPath,
  () => {
    closeAllMenus();
  },
);

onMounted(() => {
  introTimerId = window.setTimeout(() => {
    topbarVisible.value = true;
  }, 120);
  applyTheme();
  document.documentElement.setAttribute("lang", "en");
  prefersDark?.addEventListener("change", () => {
    if (theme.value === "system") applyTheme();
  });
  document.addEventListener("click", handleDocumentClick);
  document.addEventListener("keydown", handleKeydown);
  window.addEventListener("resize", syncHeights);
  syncHeights();
});

onBeforeUnmount(() => {
  if (introTimerId) window.clearTimeout(introTimerId);
  document.removeEventListener("click", handleDocumentClick);
  document.removeEventListener("keydown", handleKeydown);
  window.removeEventListener("resize", syncHeights);
  if (searchModalOpen.value) closeSearchModal();
  document.documentElement.style.overflow = "";
  prefersDark?.removeEventListener("change", applyTheme);
});
</script>

<style scoped>
#topbarMain {
  position: fixed;
  top: 18px;
  left: 50%;
  transform: translate(-50%, -140%);
  width: min(92vw, 48rem);
  z-index: 1200;
  padding: 0.35rem 0.75rem;
  display: grid;
  grid-template-columns: auto 1fr auto auto;
  align-items: center;
  gap: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 1rem;
  background: rgba(9, 9, 9, 0.85);
  backdrop-filter: blur(10px) saturate(120%);
  -webkit-backdrop-filter: blur(10px) saturate(120%);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5);
  opacity: 0;
  transition:
    transform 820ms cubic-bezier(.17, .99, .42, 1.19),
    opacity 320ms ease;
}

#topbarMain[data-ready="true"] {
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
  margin: 0;
  font-family: Orbitron, "Space Grotesk", sans-serif;
  font-size: 1.08rem;
  letter-spacing: 0.14rem;
  color: rgba(255, 255, 255, 0.96);
}

.top-search {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 0.55rem;
  height: 42px;
  padding: 0.35rem 0.6rem 0.35rem 0.52rem;
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 12px;
  color: rgba(236, 241, 255, 0.9);
  text-decoration: none;
  transition: border-color 160ms ease, background-color 160ms ease, transform 160ms ease, box-shadow 160ms ease;
}

.top-search.is-cursor-hover {
  border-color: rgba(255, 255, 255, 0.34);
}

.top-search svg {
  width: 16px;
  height: 16px;
}

.top-search > span {
  font-size: 0.92rem;
  letter-spacing: 0.02em;
}

.kbd-hint {
  display: inline-flex;
}

.kbd {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  padding: 2px 6px;
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.05);
  font-size: 0.72rem;
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
  cursor: pointer;
}

#hamburger span {
  width: 100%;
  height: 2px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.95);
}

#topbarMenu {
  position: absolute;
  top: 110%;
  right: 12px;
  min-width: 180px;
  padding: 0.6rem;
  background: rgba(10, 10, 10, 0.94);
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 12px;
  backdrop-filter: blur(12px) saturate(130%);
  -webkit-backdrop-filter: blur(12px) saturate(130%);
  display: grid;
  gap: 0.25rem;
  opacity: 0;
  transform: translateY(-8px) scale(0.98);
  pointer-events: none;
  transition: opacity 200ms ease, transform 220ms ease;
  z-index: 1220;
}

#topbarMenu a {
  color: rgba(240, 244, 255, 0.94);
  text-decoration: none;
  padding: 0.45rem 0.55rem;
  border-radius: 10px;
  font-family: "Space Grotesk", system-ui, sans-serif;
  font-size: 0.95rem;
  transition: background-color 140ms ease, transform 140ms ease, box-shadow 140ms ease;
  display: block;
}

#topbarMenu a.is-cursor-hover {
  background: transparent;
}

#topbarMenu[data-open="true"] {
  opacity: 1;
  transform: translateY(0) scale(1);
  pointer-events: auto;
}

.profile-page {
  min-height: 100vh;
  padding: 108px 64px 56px;
  background: #000;
  color: rgba(244, 247, 252, 0.96);
  display: flex;
  flex-direction: column;
  gap: 34px;
  font-family: "Space Grotesk", "Inter", system-ui, -apple-system, sans-serif;
}

.hero-row {
  display: grid;
  grid-template-columns: minmax(280px, 520px) minmax(260px, 1fr);
  align-items: start;
  gap: 34px;
}

#chosImgC {
  position: relative;
  isolation: isolate;
  width: 100%;
  height: auto;
  max-height: 240px;
  min-height: 160px;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.16);
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(13px) saturate(125%);
  -webkit-backdrop-filter: blur(13px) saturate(125%);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 10px;
}

#chosImgC::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 0;
  background-image: radial-gradient(circle at 1px 1px, rgba(230, 235, 245, 0.22) 1px, transparent 1px);
  background-size: 16px 16px;
}

#chosImgC img {
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
  height: auto;
  object-fit: contain;
  object-position: center;
  display: block;
  border-radius: 16px;
}

.image-fallback {
  position: relative;
  z-index: 1;
  width: min(80%, 240px);
  aspect-ratio: 1 / 1;
  border-radius: 14px;
  border: 1px dashed rgba(255, 255, 255, 0.34);
  background: rgba(12, 12, 12, 0.45);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 16px;
  text-align: center;
}

.image-fallback__initial {
  font-size: clamp(2.2rem, 7vw, 3.8rem);
  font-weight: 700;
  line-height: 1;
}

.image-fallback__label {
  margin: 0;
  font-size: 0.84rem;
  color: rgba(235, 240, 248, 0.76);
}

.hero-copy {
  padding-top: 4px;
}

.rank-chip {
  margin: 0;
  display: inline-block;
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(224, 232, 246, 0.78);
}

.developer-title {
  margin: 10px 0 0;
  font-size: clamp(2rem, 3.5vw, 3rem);
  line-height: 1;
  letter-spacing: 0.01em;
  font-family: "Space Grotesk", "Inter", system-ui, -apple-system, sans-serif;
}

.quick-facts {
  margin: 20px 0 0;
  padding: 0;
  list-style: none;
  display: grid;
}

.quick-facts li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding: 10px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
}

.quick-facts li span {
  color: white;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  font-size: 0.75rem;
}

.quick-facts li strong {
  font-weight: 600;
  text-align: right;
  color: rgba(243, 246, 252, 0.95);
}

.quick-facts li strong[data-label="Timezone"],
.quick-facts li strong[data-label="Not Available"],
.quick-facts li strong[data-label="Not Availability"],
.quick-facts li strong[data-label="Availability"]{
  color: #ffffff;
}

.content-grid,
.contacts-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 16px 18px;
}

.meta-card {
  position: relative;
  padding: 10px 0 6px 12px;
  border: none;
  background: none;
  box-shadow: none;
  border-left: 1px solid rgba(255, 255, 255, 0.12);
}

.card-head{
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  padding-bottom: 6px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.14);
}

.card-eyebrow{
  margin: 0;
  font-size: 0.92rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.95);
  font-weight: 700;
}

.meta-list {
  margin: 0;
  display: grid;
  gap: 8px 12px;
}

.meta-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.meta-dots {
  flex: 1;
  height: 1px;
  background-image: repeating-linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.18) 0 8px,
    transparent 8px 14px
  );
  position: relative;
  overflow: hidden;
}

.meta-dots::after {
  content: "";
  position: absolute;
  inset: -4px;
  background: radial-gradient(circle at 20% 50%, color-mix(in srgb, var(--accent, #9fcbff) 85%, transparent), transparent 30%),
    radial-gradient(circle at 80% 50%, color-mix(in srgb, var(--accent, #9fcbff) 70%, transparent), transparent 30%);
  background-size: 160% 140%;
  filter: blur(6px);
  opacity: 0.9;
  animation: shimmer 2.2s ease-in-out infinite;
  mix-blend-mode: screen;
}

.meta-card[data-com-state="open"] .meta-dots::after {
  background: radial-gradient(circle at 20% 50%, rgba(102, 255, 170, 0.9), transparent 30%),
    radial-gradient(circle at 80% 50%, rgba(46, 204, 113, 0.8), transparent 30%);
}

.meta-card[data-com-state="closed"] .meta-dots::after {
  background: radial-gradient(circle at 20% 50%, rgba(255, 102, 122, 0.9), transparent 30%),
    radial-gradient(circle at 80% 50%, rgba(235, 87, 87, 0.8), transparent 30%);
}

@keyframes shimmer {
  0% { transform: translateX(-60%); opacity: 0; }
  20% { opacity: 0.95; }
  50% { opacity: 0.75; }
  100% { transform: translateX(60%); opacity: 0; }
}

.meta-label {
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  font-size: 0.78rem;
  white-space: nowrap;
}

.meta-value {
  margin: 0;
  color: rgba(243, 246, 252, 0.95);
  word-break: break-word;
  white-space: nowrap;
}

.reveal {
  opacity: 0;
  transform: translateY(16px);
  animation: fadeSlide 520ms ease forwards;
  animation-delay: var(--delay, 0s);
}

@keyframes fadeSlide {
  0% { opacity: 0; transform: translateY(16px); }
  60% { opacity: 1; transform: translateY(2px); }
  100% { opacity: 1; transform: translateY(0); }
}

.role-list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.role-list li {
  display: flex;
  align-items: center;
  gap: 10px;
}

.role-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  font-size: 1rem;
}

.role-icon svg {
  width: 20px;
  height: 20px;
  fill: currentColor;
}

.role-dot {
  font-size: 1.1rem;
  line-height: 1;
}

.role-label {
  color: rgba(240, 244, 255, 0.95);
  font-weight: 400;
}

.hero-top-row{
  display: flex;
  align-items: center;
  gap: 12px;
  justify-content: space-between;
}

.back-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  margin-bottom: 10px;
  background: rgba(255, 255, 255, 0.06);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
  letter-spacing: 0.01em;
}

.meta-label[data-label="Timezone"],
.meta-value[data-label="Timezone"]{
  color: #ffffff;
}

.link-list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 10px;
}

.link-list li {
  display: grid;
  gap: 2px;
}

a {
  color: #9fcbff;
  text-decoration: underline;
  transition: color 140ms ease;
  background-color: transparent;
}

a:hover {
  color: #d4e8ff;
  text-decoration: underline;
  background-color: transparent;
}

:global(a) {
  background-color: transparent !important;
}

:global(a:hover) {
  background-color: transparent !important;
}

.contacts-row {
  margin-top: auto;
  padding-top: 6px;
}

.search-modal{
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.65);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  display: grid;
  place-items: center;
  z-index: 1400;
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
  font-family: 'Space Grotesk', system-ui, sans-serif;
  font-size: 0.95rem;
  letter-spacing: 0.02em;
  color: var(--ui-text);
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
  font-family: 'Space Grotesk', system-ui, sans-serif;
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

.search-grid{
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 14px;
  margin-top: 14px;
}

.search-section{
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 12px;
  padding: 12px;
  background: rgba(255,255,255,0.03);
}

.search-title{
  margin: 0 0 8px;
  font-size: 0.86rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: rgba(220,228,240,0.78);
}

.search-results{
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 8px;
}

.search-results li{
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid rgba(255,255,255,0.08);
  background: rgba(255,255,255,0.04);
  cursor: pointer;
  transition: border-color 140ms ease, background-color 140ms ease;
}

.search-results li:hover{
  border-color: rgba(159, 203, 255, 0.4);
  background: rgba(255,255,255,0.08);
}

.result-label{
  font-weight: 600;
  color: rgba(243,246,252,0.96);
}

.result-href{
  color: rgba(210,220,238,0.72);
  font-size: 0.9rem;
}

.search-actions{
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 8px;
}

.search-actions li{
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid rgba(255,255,255,0.08);
  background: rgba(255,255,255,0.02);
  cursor: pointer;
  transition: border-color 140ms ease, background-color 140ms ease;
}

.search-actions li:hover{
  border-color: rgba(159, 203, 255, 0.35);
  background: rgba(255,255,255,0.06);
}

.search-placeholder{
  margin: 12px 0 0;
  color: rgba(220,228,240,0.76);
}

.search-close{
  margin-top: 12px;
  border: 1px solid rgba(255,255,255,0.16);
  background: rgba(255,255,255,0.06);
  color: rgba(240,244,255,0.95);
  border-radius: 10px;
  padding: 8px 14px;
  cursor: pointer;
}

.more-devs{
  margin-top: 18px;
  padding: 14px 12px 16px;
  border-left: 1px solid rgba(255,255,255,0.12);
  background: none;
}

.more-devs__head{
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 10px;
  padding-bottom: 6px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.14);
}

.more-devs__cta{
  color: #9fcbff;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.92rem;
  letter-spacing: 0.02em;
}

.more-devs__cta:hover{
  color: #c5e0ff;
  text-decoration: underline;
}

.more-devs__grid{
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 18px;
}

.more-dev-card{
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  border-radius: 12px;
  background: linear-gradient(
    135deg,
    color-mix(in srgb, var(--accent, #9fcbff) 22%, transparent) 0%,
    rgba(255,255,255,0.02) 45%,
    rgba(255,255,255,0.04) 100%
  );
  overflow: hidden;
  cursor: pointer;
  box-shadow:
    0 10px 28px rgba(0, 0, 0, 0.32),
    0 0 18px color-mix(in srgb, var(--accent, #9fcbff) 26%, transparent);
}

.more-dev-body{
  padding: 10px 12px 12px;
  display: grid;
  gap: 4px;
}

.more-dev-name{
  margin: 0;
  font-weight: 700;
  color: rgba(240,244,255,0.96);
  font-size: 1rem;
}

.more-dev-role{
  margin: 0;
  color: rgba(214,222,236,0.82);
  font-size: 0.94rem;
}

.more-dev-rank{
  margin: 0;
  color: rgba(190,204,224,0.85);
  font-size: 0.9rem;
  letter-spacing: 0.02em;
}

.profile-footer{
  margin-top: 18px;
  padding: 18px 0 6px;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  display: grid;
  gap: 12px;
}

.footer-brand{
  display: inline-flex;
  align-items: center;
  gap: 10px;
}

.footer-brand img{
  height: 42px;
  width: auto;
  filter: drop-shadow(0 6px 10px rgba(0,0,0,0.45));
}

.footer-eyebrow{
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 0.78rem;
  color: rgba(220, 230, 248, 0.8);
}

.footer-note{
  margin: 2px 0 0;
  color: rgba(216, 225, 241, 0.72);
  font-size: 0.95rem;
}

.footer-bottom{
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: rgba(220, 228, 240, 0.76);
  font-size: 0.9rem;
}

.footer-divider{
  opacity: 0.55;
}

.state-message {
  margin: auto 0;
  color: rgba(235, 240, 248, 0.72);
}

@media (max-width: 1060px) {
  .profile-page {
    padding: 100px 28px 34px;
    gap: 24px;
  }

  .hero-row {
    grid-template-columns: minmax(0, 1fr);
    gap: 20px;
  }

  #chosImgC {
    height: min(260px, 54vw);
    max-width: 560px;
  }

  .content-grid,
  .contacts-row {
    grid-template-columns: minmax(0, 1fr);
    gap: 22px;
  }
}

@media (max-width: 720px) {
  #topbarMain {
    width: min(94vw, 48rem);
    grid-template-columns: auto 1fr auto;
  }

  #topbarMain h3 {
    font-size: 0.9rem;
    letter-spacing: 0.1rem;
  }

  .top-search {
    height: 38px;
    padding: 0.25rem 0.5rem;
  }

  .top-search > span {
    font-size: 0.84rem;
  }

  .profile-page {
    padding: 92px 16px 26px;
  }

  .quick-facts li {
    flex-direction: column;
    align-items: flex-start;
    gap: 6px;
  }

  .quick-facts li strong {
    text-align: left;
  }

  .meta-list {
    grid-template-columns: 1fr;
    gap: 5px;
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
