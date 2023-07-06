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
      <div class="example-item">
        {{ data[page + 1] }}
      </div>
    </template>
  </present>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import Present from "../Present.vue";

const data = [
  generateRandomChineseCharacters(),
  generateRandomChineseCharacters(),
  generateRandomChineseCharacters(),
  generateRandomChineseCharacters(),
  generateRandomChineseCharacters(),
  generateRandomChineseCharacters(),
  generateRandomChineseCharacters(),
  generateRandomChineseCharacters(),
  generateRandomChineseCharacters(),
  generateRandomChineseCharacters(),
];
const page = ref(0);

const handleNext = () => {
  page.value += 1;
};

const handlePrevious = () => {
  page.value -= 1;
};

function generateRandomChineseCharacters() {
  const start = 0x4e00; // 繁体字 Unicode 起始码点
  const end = 0x9fff; // 繁体字 Unicode 结束码点

  let characters = "";
  for (let i = 0; i < 1000; i++) {
    const codePoint = Math.floor(Math.random() * (end - start + 1)) + start;
    const character = String.fromCodePoint(codePoint);
    characters += character;
  }

  return characters;
}
</script>
<style scoped>
.example-item {
  font-size: 32px;
  width: 100%;
  padding: 15px;
  box-sizing: border-box;
}
</style>
