<script setup lang="ts">
import { onMounted } from 'vue';
import { PhaserController } from '../world/index';

const windowWidth = window.innerWidth;

onMounted(async () => {
  const phaserController = await PhaserController.getInstance();
  const container = document.getElementById('phaser-container');
  if (!container) {
    throw new Error('not correct get container HTMLElement');
  }
  phaserController.startWorld(container);
});

window.onresize = function () {
  const newWidth = window.innerWidth;
  const phaserDom = document.getElementById('phaser-container');
  const canvasDom = document.getElementsByTagName('canvas')[0];
  if (!phaserDom) return;
  (phaserDom.style as any).zoom = newWidth / windowWidth;
};
</script>

<template>
  <div id="phaser-container"></div>
</template>

<style lang="scss">
#phaser-container {
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: -1;
  transform: translate(-50%, -50%) rotate(0);
  height: auto;

  canvas {
    display: block;
  }
}
</style>
