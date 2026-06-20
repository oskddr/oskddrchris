<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";

interface Props {
  words: string[];
  duration?: number;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  duration: 3000,
  class: "",
});

defineEmits(["animationStart", "animationComplete"]);

const currentWord = ref(props.words[0]);
const isVisible = ref(true);
const timeoutId = ref<number | null>(null);

function startAnimation() {
  isVisible.value = false;

  window.setTimeout(() => {
    const currentIndex = props.words.indexOf(currentWord.value);
    const nextWord = props.words[currentIndex + 1] || props.words[0];
    currentWord.value = nextWord;
    isVisible.value = true;
  }, 600);
}

const splitWords = computed(() => {
  return currentWord.value.split(" ").map((word) => ({
    word,
    letters: word.split(""),
  }));
});

function startTimeout() {
  timeoutId.value = window.setTimeout(() => {
    startAnimation();
  }, props.duration);
}

onMounted(() => {
  startTimeout();
});

onBeforeUnmount(() => {
  if (timeoutId.value) {
    clearTimeout(timeoutId.value);
  }
});

watch(isVisible, (newValue) => {
  if (newValue) {
    startTimeout();
  }
});
</script>

<template>
  <div class="flip-root">
    <Transition
      name="flip"
      @after-enter="$emit('animationStart')"
      @after-leave="$emit('animationComplete')"
    >
      <div
        v-show="isVisible"
        class="flip-word"
        :class="[props.class]"
      >
        <template
          v-for="(wordObj, wordIndex) in splitWords"
          :key="wordObj.word + wordIndex"
        >
          <span
            class="flip-word__word"
            :style="{
              animation: `flipFadeInWord 0.3s ease forwards`,
              animationDelay: `${wordIndex * 0.3}s`,
            }"
          >
            <span
              v-for="(letter, letterIndex) in wordObj.letters"
              :key="wordObj.word + letterIndex"
              class="flip-word__letter"
              :style="{
                animation: `flipFadeInLetter 0.2s ease forwards`,
                animationDelay: `${wordIndex * 0.3 + letterIndex * 0.05}s`,
              }"
            >
              {{ letter }}
            </span>
            <span class="flip-word__space">&nbsp;</span>
          </span>
        </template>
      </div>
    </Transition>
  </div>
</template>

<style>
.flip-root{
  position: relative;
  display: inline-block;
}

.flip-word{
  position: relative;
  display: inline-block;
  color: inherit;
  font: inherit;
}

.flip-word__word{
  display: inline-block;
  white-space: nowrap;
  opacity: 0;
}

.flip-word__letter{
  display: inline-block;
  opacity: 0;
}

.flip-word__space{
  display: inline-block;
}

.flip-enter-active{
  animation: flipEnterWord 0.6s ease-in-out forwards;
}

.flip-leave-active{
  animation: flipLeaveWord 0.6s ease-in-out forwards;
}

@keyframes flipFadeInWord {
  0% {
    opacity: 0;
    transform: translateY(10px);
    filter: blur(8px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0);
  }
}

@keyframes flipFadeInLetter {
  0% {
    opacity: 0;
    transform: translateY(10px);
    filter: blur(8px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0);
  }
}

@keyframes flipEnterWord {
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes flipLeaveWord {
  0% {
    opacity: 1;
    transform: scale(1);
    filter: blur(0);
  }
  100% {
    opacity: 0;
    transform: scale(2);
    filter: blur(8px);
  }
}
</style>
