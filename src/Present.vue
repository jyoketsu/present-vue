<template>
  <div class="present" :tabindex="-1" @keydown="handleKeyDown">
    <div class="present-item-container" :style="containerStyle">
      <div class="present-item pre-present">
        <slot name="previous">previous</slot>
      </div>
      <div :class="currentClasses" ref="currentPresentRef">
        <slot name="current">current</slot>
      </div>
      <div class="present-item next-present">
        <slot name="next">next</slot>
      </div>
    </div>
    <div
      class="present-process"
      :style="`grid-template-columns: repeat(${pageCount}, 1fr);`"
    >
      <div
        v-for="process in processArray"
        class="process-item"
        :key="process"
        :style="`background-color:${
          process === currentPage ? highlightProcessColor : processColor
        }`"
      ></div>
      <div class="pagination" v-if="!hidePaginationButton">
        <svg
          t="1688608584325"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="5138"
          width="40"
          height="40"
          @click="prevPage"
        >
          <path
            d="M719.165296 999.424L800.450704 918.124169 383.495211 501.183099 800.450704 84.242028 719.165296 2.95662 223.549296 501.183099z"
            fill="#2196F3"
            p-id="5139"
          ></path>
        </svg>
        <svg
          t="1688608759763"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="5282"
          width="40"
          height="40"
          @click="nextPage"
        >
          <path
            d="M304.834704 11.812056L223.549296 93.097465l416.955493 416.955493L223.549296 926.965183l81.285408 81.299831L800.450704 510.038535z"
            fill="#2196F3"
            p-id="5283"
          ></path>
        </svg>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from "vue";
import "./Present.css";

const props = withDefaults(
  defineProps<{
    currentPage: number;
    pageCount: number;
    processColor?: string;
    highlightProcessColor?: string;
    hidePaginationButton?: boolean;
    scrollStep?: number;
  }>(),
  { processColor: "#bcddff", highlightProcessColor: "#409eff", scrollStep: 200 }
);

const emit = defineEmits<{
  (e: "next", index: number): void;
  (e: "previous", index: number): void;
}>();

const translateY = ref(-100);
const transition = ref(true);
const shake = ref(false);
const controllable = ref(true);
const currentPresentRef = ref<HTMLDivElement | null>(null);
let scrollTop = 0;

const containerStyle = computed(() => ({
  transform: `translateY(${translateY.value}vh)`,
  transition: transition.value ? "transform 500ms" : "unset",
}));

const currentClasses = computed(() => ({
  "present-item": true,
  "current-present": true,
  shake: shake.value,
}));

const processArray = computed(() =>
  Array(props.pageCount)
    .fill(0)
    .map((_, index) => index)
);

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

const nextPage = () => {
  if (!controllable.value) {
    return;
  }

  scrollTop = 0;
  if (currentPresentRef.value) {
    currentPresentRef.value.scrollTop = 0;
  }

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
};

const prevPage = () => {
  if (!controllable.value) {
    return;
  }

  scrollTop = 0;
  if (currentPresentRef.value) {
    currentPresentRef.value.scrollTop = 0;
  }

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
};

const handleKeyDown = (e: KeyboardEvent) => {
  if (!controllable.value) {
    return;
  }
  switch (e.key) {
    case "ArrowRight":
      nextPage();
      break;
    case "ArrowLeft":
      prevPage();
      break;
    case "ArrowUp":
      if (currentPresentRef.value) {
        const isAtTop = currentPresentRef.value.scrollTop === 0;
        if (isAtTop) {
          scrollTop = 0;
          currentPresentRef.value.scrollTop = 0;
          prevPage();
        } else {
          if (scrollTop > 0) {
            scrollTop -= props.scrollStep;
            currentPresentRef.value.scrollTo({
              top: scrollTop,
              behavior: "smooth",
            });
          }
        }
      }

      break;
    case "ArrowDown":
      if (currentPresentRef.value) {
        const isAtBottom =
          currentPresentRef.value.scrollHeight -
            currentPresentRef.value.scrollTop <=
          currentPresentRef.value.clientHeight;

        if (isAtBottom) {
          scrollTop = 0;
          currentPresentRef.value.scrollTop = 0;
          nextPage();
        } else {
          scrollTop += props.scrollStep;
          currentPresentRef.value.scrollTo({
            top: scrollTop,
            behavior: "smooth",
          });
        }
      }
      break;
    default:
      break;
  }
};
</script>
