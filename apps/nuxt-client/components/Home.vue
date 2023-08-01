<script setup lang="ts">
import { ref } from 'vue';
import Tutorial from './Tutorial.vue';

const greeting = ref('Hello from parent');
const childMsg = ref('No child msg yet');

const slotMsg = ref('from parent');
</script>

<template>
  <h1>Parent</h1>
  <Tutorial :msg="greeting" @response="(msg) => (childMsg = msg)">Message:{{ slotMsg }}</Tutorial>
  <p>{{ childMsg }}</p>
  <h1>Home by Mokel</h1>
</template>
