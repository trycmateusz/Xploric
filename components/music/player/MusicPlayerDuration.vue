<template>
  <div class="text-xl ">
    <span>
      {{ currentAudioStore.getCurrentListenedDurationText }}
    </span>
    /
    <span>
      {{ currentAudioStore.getCurrentFullDurationText }}
    </span>
  </div>
</template>

<script setup lang="ts">
const currentAudioStore = useCurrentAudioStore()
</script>

<style scoped>

</style>
