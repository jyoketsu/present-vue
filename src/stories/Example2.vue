<template>
  <present
    :current-page="page"
    :page-count="data.length"
    @next="handleNext"
    @previous="handlePrevious"
  >
    <template #previous>
      <div class="example-item">
        <img :src="`https://psnine.com/Upload/bg/${data[page - 1]}.jpg`" />
      </div>
    </template>

    <template #current>
      <div class="example-item">
        <img :src="`https://psnine.com/Upload/bg/${data[page]}.jpg`" />
      </div>
    </template>

    <template #next>
      <div class="example-item">
        <img :src="`https://psnine.com/Upload/bg/${data[page + 1]}.jpg`" />
      </div>
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
<style scoped>
.example-item {
  font-size: 32px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.example-item > img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>
