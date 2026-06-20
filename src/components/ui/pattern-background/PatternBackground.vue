<script setup lang="ts">
import { computed } from 'vue';
import {
  BaseProps,
  PATTERN_BACKGROUND_DIRECTION,
  PATTERN_BACKGROUND_SPEED,
  PATTERN_BACKGROUND_VARIANT,
  patternBackgroundMaskVariants,
  patternBackgroundVariants,
} from './index';

const {
  animate = true,
  direction = PATTERN_BACKGROUND_DIRECTION.Bottom,
  variant = PATTERN_BACKGROUND_VARIANT.Grid,
  speed = PATTERN_BACKGROUND_SPEED.Default,
  size = undefined,
  mask = 'none',
  class: className,
} = defineProps<BaseProps>();

const durationFormSpeed = computed(() => `${speed}ms`);
</script>

<template>
  <div
    :class="[
      patternBackgroundVariants({ variant, size }),
      animate ? `move move-${direction}` : '',
      className,
    ]"
    :style="{ '--pattern-duration': durationFormSpeed }"
  >
    <div
      class="pattern-background__mask"
      :class="patternBackgroundMaskVariants({ mask })"
    ></div>
    <div class="pattern-background__content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.pattern-background {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background-color: #000;
  overflow: hidden;
}

.pattern-background::before {
  content: '';
  position: absolute;
  inset: 0;
  background-color: rgba(255, 255, 255, 0.02);
  opacity: 0;
}

.pattern-background__mask {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}

.pattern-background__content {
  position: relative;
  z-index: 1;
}

.pattern-background--grid {
  background-image:
    repeating-linear-gradient(
      0deg,
      var(--pattern-line-color, rgba(255, 255, 255, 0.04)) 0,
      var(--pattern-line-color, rgba(255, 255, 255, 0.04)) 1px,
      transparent 1px,
      transparent var(--pattern-grid-size, 40px)
    ),
    repeating-linear-gradient(
      90deg,
      var(--pattern-line-color, rgba(255, 255, 255, 0.04)) 0,
      var(--pattern-line-color, rgba(255, 255, 255, 0.04)) 1px,
      transparent 1px,
      transparent var(--pattern-grid-size, 40px)
    );
  background-size: var(--pattern-grid-size, 40px) var(--pattern-grid-size, 40px);
}

.pattern-background--size-sm {
  --pattern-grid-size: 24px;
}

.pattern-background--size-md {
  --pattern-grid-size: 32px;
}

.pattern-background--size-lg {
  --pattern-grid-size: 48px;
}

.pattern-background--mask-ellipse-top {
  background: radial-gradient(
    circle at var(--pattern-mask-position, center),
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.65) 45%,
    rgba(0, 0, 0, 0.85) 70%,
    rgba(0, 0, 0, 0.98) 90%
  );
  background-size: 125% 125%;
}

.pattern-background--mask-ellipse-center {
  background: radial-gradient(
    ellipse at var(--pattern-mask-position, center),
    rgba(0, 0, 0, 0) 20%,
    rgba(0, 0, 0, 0.35) 40%,
    rgba(0, 0, 0, 0.65) 65%,
    rgba(0, 0, 0, 0.9) 80%,
    rgba(0, 0, 0, 1) 95%
  );
  background-size: 110% 110%;
}

.move {
  animation-duration: var(--pattern-duration, 15000ms);
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

.move-top {
  animation-name: to-top;
}
.move-bottom {
  animation-name: to-bottom;
}
.move-right {
  animation-name: to-right;
}
.move-left {
  animation-name: to-left;
}
.move-top-right {
  animation-name: to-top-right;
}
.move-top-left {
  animation-name: to-top-left;
}
.move-bottom-right {
  animation-name: to-bottom-right;
}
.move-bottom-left {
  animation-name: to-bottom-left;
}

@keyframes to-top {
  0% {
    background-position: 0 100%;
  }
  100% {
    background-position: 0 0;
  }
}
@keyframes to-bottom {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 0 100%;
  }
}
@keyframes to-right {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 100% 0;
  }
}
@keyframes to-left {
  0% {
    background-position: 100% 0;
  }
  100% {
    background-position: 0 0;
  }
}
@keyframes to-top-right {
  0% {
    background-position: 0 100%;
  }
  100% {
    background-position: 100% 0;
  }
}
@keyframes to-top-left {
  0% {
    background-position: 100% 100%;
  }
  100% {
    background-position: 0 0;
  }
}
@keyframes to-bottom-right {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 100% 100%;
  }
}
@keyframes to-bottom-left {
  0% {
    background-position: 100% 0;
  }
  100% {
    background-position: 0 100%;
  }
}
</style>
