<template>
  <div />
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['auth', 'redirect-and-get-spotify-token']
})
</script>

<style scoped>

</style>
