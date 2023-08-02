<script setup lang="ts">
import { onMounted } from 'vue';
import { PhaserController } from '../world/index';

onMounted(async () => {
  const phaserController = await PhaserController.getInstance();
  const container = document.getElementById('phaser-container');
  if (!container) {
    throw new Error('not correct get container HTMLElement');
  }
  phaserController.startWorld(container);
});
</script>

<template>
  <div id="phaser-container"></div>
</template>
