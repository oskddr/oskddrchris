<template>
  <div class="nf-shell">
    <div class="nf-grid" aria-hidden="true"></div>
    <section class="nf-card">
      <h1 class="nf-title">404</h1>
      <p class="nf-sub">The page you were looking for slipped into the void.</p>
      <div class="nf-actions">
        <RouterLink to="/" class="nf-btn primary">Go home</RouterLink>
        <button type="button" class="nf-btn primary" @click="goBack">Back to last page</button>
      </div>
    </section>
    <SmoothCursor />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import SmoothCursor from "@/components/SmoothCursor.vue";

const router = useRouter();

const goBack = () => {
  if (window.history.length > 1) {
    router.back();
  } else {
    router.push("/").catch(() => {});
  }
};
</script>

<style scoped>
.nf-shell {
  position: relative;
  min-height: 100vh;
  background: #000;
  color: #ffffff;
  display: grid;
  place-items: center;
  overflow: hidden;
  padding: 24px;
}

.nf-grid {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle at 1px 1px, rgba(255,255,255,0.08) 1px, transparent 1px);
  background-size: 18px 18px;
  opacity: 0.18;
}

.nf-card {
  position: relative;
  z-index: 1;
  text-align: center;
  padding: 36px 28px;
  max-width: 520px;
  width: min(90vw, 520px);
  background: rgba(12, 12, 12, 0.78);
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 16px;
  box-shadow: 0 20px 48px rgba(0,0,0,0.45);
}

.nf-title {
  margin: 10px 0 6px;
  font-size: clamp(3.5rem, 10vw, 5rem);
  letter-spacing: 0.08em;
  font-weight: 800;
  color: #ffffff;
}

.nf-sub {
  margin: 0 0 20px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 1rem;
}

.nf-actions {
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
}

.nf-btn {
  border: 1px solid rgba(255, 255, 255, 0.7);
  background: #0a0a0a;
  color: #ffffff;
  padding: 12px 18px;
  border-radius: 14px;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  transition: transform 140ms ease, box-shadow 160ms ease, border-color 160ms ease;
  min-width: 180px;
}

.nf-btn.primary {
  border-color: rgba(255, 255, 255, 0.9);
}

.nf-btn.ghost {
  background: #0a0a0a;
}
</style>
