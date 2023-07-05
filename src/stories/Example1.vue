<template>
  <present
    :current-page="page"
    :page-count="data.length"
    @next="handleNext"
    @previous="handlePrevious"
  >
    <template #previous>
      <div class="example-item">
        {{ data[page - 1] }}
      </div>
    </template>

    <template #current>
      <div class="example-item">
        {{ data[page] }}
      </div>
    </template>

    <template #next>
      <div class="example-item">{{ data[page + 1] }}</div>
    </template>
  </present>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import Present from "../Present.vue";

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const page = ref(0);

const handleNext = () => {
  page.value += 1;
};

const handlePrevious = () => {
  page.value -= 1;
};
</script>
<style>
.example-item {
  font-size: 32px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
