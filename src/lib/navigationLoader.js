import { reactive } from 'vue';

export const navigationLoader = reactive({
  active: true,
  step: 0,
  target: 'Home',
});

let finishTimer;
let startedAt = 0;

const MIN_VISIBLE_TIME = 260;
const READY_HOLD_TIME = 300;

export function startNavigation(target) {
  window.clearTimeout(finishTimer);
  startedAt = performance.now();
  navigationLoader.target = target || 'Page';
  navigationLoader.step = 0;
  navigationLoader.active = true;
}

export function setNavigationStep(step) {
  navigationLoader.step = Math.max(navigationLoader.step, step);
}

export function finishNavigation() {
  setNavigationStep(3);
  const elapsed = performance.now() - startedAt;
  const remainingMinimum = Math.max(0, MIN_VISIBLE_TIME - elapsed);

  finishTimer = window.setTimeout(() => {
    navigationLoader.active = false;
  }, Math.max(READY_HOLD_TIME, remainingMinimum));
}
