<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { computed } from "vue";

interface Props {
  borderRadius?: number;
  color?: string | string[];
  borderWidth?: number;
  duration?: number;
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<Props>(), {
  borderRadius: 10,
  color: "#FFF",
  borderWidth: 2,
  duration: 10,
});

const colorStops = computed(() =>
  Array.isArray(props.color) ? props.color.join(",") : props.color,
);

const styles = computed(() => ({
  "--border-radius": `${props.borderRadius}px`,
  "--border-width": `${props.borderWidth}px`,
  "--duration": `${props.duration}s`,
  backgroundImage: `radial-gradient(transparent, transparent, ${colorStops.value}, transparent, transparent)`,
  backgroundSize: "300% 300%",
  mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
  WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
  WebkitMaskComposite: "xor",
  maskComposite: "exclude",
  padding: "var(--border-width)",
  borderRadius: "var(--border-radius)",
  boxSizing: "border-box",
}));
</script>

<template>
  <div
    :style="styles"
    class="glow-border"
    :class="[props.class]"
    aria-hidden="true"
  />
</template>

<style scoped>
.glow-border {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  border-radius: inherit;
  will-change: background-position;
}

@media (prefers-reduced-motion: no-preference) {
  .glow-border {
    animation: glow var(--duration) infinite ease-in-out;
  }
}
</style>
