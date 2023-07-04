<template>
  <div class="present" :tabindex="-1" @keydown="handleKeyDown">
    <div class="present-item-container" :style="containerStyle">
      <div class="present-item pre-present">
        <slot name="previous">previous</slot>
      </div>
      <div :class="currentClasses">
        <slot name="current">current</slot>
      </div>
      <div class="present-item next-present">
        <slot name="next">next</slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from "vue";

const props = withDefaults(
  defineProps<{
    currentPage: number;
    pageCount: number;
  }>(),
  {}
);

const emit = defineEmits<{
  (e: "next", index: number): void;
  (e: "previous", index: number): void;
}>();

const translateY = ref(-100);
const transition = ref(true);
const shake = ref(false);
const controllable = ref(true);

const containerStyle = computed(() => ({
  transform: `translateY(${translateY.value}vh)`,
  transition: transition.value ? "transform 500ms" : "unset",
}));

const currentClasses = computed(() => ({
  "present-item": true,
  "current-present": true,
  shake: shake.value,
}));

watch(
  () => props.currentPage,
  () => {
    transition.value = false;
  }
);

watch(transition, (newVal) => {
  if (newVal === false) {
    translateY.value = -100;
  }
});

watch(translateY, (newVal) => {
  if (newVal === -100) {
    setTimeout(() => {
      transition.value = true;
      controllable.value = true;
    }, 200);
  }
});

const handleKeyDown = (e: KeyboardEvent) => {
  if (!controllable.value) {
    return;
  }
  switch (e.key) {
    case "ArrowRight":
      if (props.currentPage + 1 === props.pageCount) {
        shake.value = true;
        setTimeout(() => {
          shake.value = false;
        }, 600);
        return;
      }
      translateY.value -= 100;
      controllable.value = false;
      setTimeout(() => {
        emit("next", 1);
      }, 500);

      break;
    case "ArrowLeft":
      if (props.currentPage === 0) {
        shake.value = true;
        setTimeout(() => {
          shake.value = false;
        }, 600);
        return;
      }
      translateY.value += 100;
      controllable.value = false;
      setTimeout(() => {
        emit("previous", 1);
      }, 500);
      break;
    default:
      break;
  }
};
</script>
<style scoped>
.present {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  outline: none;
}

.present-item {
  width: 100vw;
  height: 100vh;
}

.current-present.shake {
  animation: shake 0.5s infinite;
}

@keyframes shake {
  0% {
    transform: translate(0);
  }
  25% {
    transform: translate(-5px, -5px) rotate(-5deg);
  }
  50% {
    transform: translate(5px, 5px) rotate(5deg);
  }
  75% {
    transform: translate(-5px, -5px) rotate(-5deg);
  }
  100% {
    transform: translate(0);
  }
}
</style>
