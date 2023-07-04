# present-vue

`present-vue` is a Vue component that allows you to present a collection of child components in a vertical scrolling view. It provides an intuitive way to showcase content in a slideshow-like manner.

## Installation

```bash
yarn add present-vue
```

or

```bash
npm install present-vue
```

## Props & Events

The `present-vue` component accepts the following props:

- `currentPage`: starting from zero
- `pageCount`: total number of child elements to be displayed

The `present-vue` component accepts the following events:

- `next`
- `previous`

Note: In the next or previous event, the user should place the current page in the "#current" slot.

## Usage
Use the left and right arrow keys on the keyboard for page navigation, and the up and down arrow keys for scrolling.

```vue
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
import Present from "./Present.vue";
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
.example-item > img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>
```

## License

This project is licensed under the MIT License.
