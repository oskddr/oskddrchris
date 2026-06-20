<script setup>
import { computed } from 'vue';
import { navigationLoader } from '@/lib/navigationLoader';

const steps = computed(() => [
  { text: 'Finding destination', afterText: 'Destination found' },
  { text: 'Loading page', afterText: 'Page loaded' },
  { text: 'Preparing content', afterText: 'Content ready' },
  { text: `Opening ${navigationLoader.target}`, afterText: 'Ready' },
]);

</script>

<template>
  <Transition name="multi-step-fade">
    <div
      v-if="navigationLoader.active && steps.length"
      class="multi-step-loader"
      :class="{ 'is-revealing': navigationLoader.step >= 2 }"
      role="status"
      aria-live="polite"
    >
      <div class="multi-step-loader__viewport">
        <div class="multi-step-loader__list">
          <div v-for="(step, index) in steps" :key="step.text">
            <div
              class="multi-step-loader__step"
              :style="{
                opacity: Math.max(1 - Math.abs(index - navigationLoader.step) * 0.2, 0),
                transform: `translateY(-${navigationLoader.step * 40}px)`,
              }"
            >
              <svg
                v-if="index < navigationLoader.step || navigationLoader.step === steps.length - 1"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="multi-step-loader__icon multi-step-loader__icon--complete"
                aria-hidden="true"
              >
                <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clip-rule="evenodd" />
              </svg>
              <svg
                v-else-if="index === navigationLoader.step"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="multi-step-loader__icon multi-step-loader__icon--spin"
                aria-hidden="true"
              >
                <path fill-rule="evenodd" d="M4.755 10.059a7.5 7.5 0 0 1 12.548-3.364l1.903 1.903h-3.183a.75.75 0 1 0 0 1.5h4.992a.75.75 0 0 0 .75-.75V4.356a.75.75 0 0 0-1.5 0v3.18l-1.9-1.9A9 9 0 0 0 3.306 9.67a.75.75 0 1 0 1.45.388Zm15.408 3.352a.75.75 0 0 0-.919.53 7.5 7.5 0 0 1-12.548 3.364l-1.902-1.903h3.183a.75.75 0 0 0 0-1.5H2.984a.75.75 0 0 0-.75.75v4.992a.75.75 0 0 0 1.5 0v-3.18l1.9 1.9a9 9 0 0 0 15.059-4.035.75.75 0 0 0-.53-.918Z" clip-rule="evenodd" />
              </svg>
              <svg
                v-else
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                class="multi-step-loader__icon multi-step-loader__icon--pending"
                aria-hidden="true"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>

              <div class="multi-step-loader__copy">
                <span class="multi-step-loader__text" :class="{ 'is-pending': index > navigationLoader.step }">
                  {{ step.text }}
                </span>
                <Transition name="after-text">
                  <span
                    v-if="step.afterText && (index < navigationLoader.step || navigationLoader.step === steps.length - 1)"
                    class="multi-step-loader__after"
                  >
                    {{ step.afterText }}
                  </span>
                </Transition>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="multi-step-loader__background" aria-hidden="true"></div>
    </div>
  </Transition>
</template>

<style scoped>
.multi-step-loader { position: fixed; inset: 0; z-index: 10000; display: flex; width: 100%; height: 100%; align-items: center; justify-content: center; color: #fff; background: rgba(0,0,0,1); backdrop-filter: blur(28px); font-family: Inter,system-ui,sans-serif; transition: background-color 300ms cubic-bezier(.22,.8,.36,1); }
.multi-step-loader.is-revealing { background: rgba(0,0,0,.08); }
.multi-step-loader__viewport { position: relative; height: 24rem; }
.multi-step-loader__list { position: relative; display: flex; max-width: 36rem; flex-direction: column; justify-content: flex-start; margin: 10rem auto 0; }
.multi-step-loader__step { display: flex; align-items: center; gap: .5rem; margin-bottom: 1rem; text-align: left; transition: opacity 300ms ease, transform 300ms ease; }
.multi-step-loader__icon { width: 1.5rem; height: 1.5rem; flex: 0 0 1.5rem; }
.multi-step-loader__icon--complete, .multi-step-loader__icon--spin { color: #1248d2; }
.multi-step-loader__icon--pending { color: #fff; opacity: .5; }
.multi-step-loader__icon--spin { animation: multiStepSpin 1s linear infinite; }
.multi-step-loader__copy { display: flex; flex-direction: column; }
.multi-step-loader__text { color: #fff; font-size: 1.125rem; line-height: 1.75rem; }
.multi-step-loader__text.is-pending { opacity: .5; }
.multi-step-loader__after { margin-top: .25rem; color: #9ca3af; font-size: .875rem; line-height: 1.25rem; }
.multi-step-loader__background { position: absolute; inset: 0; z-index: -1; height: 100%; background: radial-gradient(circle at center,rgba(18,72,210,.1),transparent 48%); pointer-events: none; }
.multi-step-fade-enter-active, .multi-step-fade-leave-active { transition: opacity 300ms ease; }
.multi-step-fade-enter-from, .multi-step-fade-leave-to { opacity: 0; }
.after-text-enter-active, .after-text-leave-active { transition: opacity 300ms ease, transform 300ms ease; }
.after-text-enter-from, .after-text-leave-to { opacity: 0; transform: translateY(-.25rem); }
@keyframes multiStepSpin { to { transform: rotate(360deg); } }
@media (prefers-reduced-motion: reduce) { .multi-step-loader__step, .multi-step-loader__icon--spin { animation: none; transition: none; } }
</style>
