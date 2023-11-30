<template>
  <div class="text-xl ">
    <span>
      {{ songStore.getCurrentListenedDurationText }}
    </span>
    /
    <span>
      {{ songStore.getCurrentFullDurationText }}
    </span>
  </div>
</template>

<script setup lang="ts">
const songStore = useSongStore()
</script>

<style scoped>

</style>
