<template>
  <div>
    <TheNavigationBack />
    <main class="wrapper p-4 text-white-main min-h-[Calc(100svh_-_var(--nav-height))]">
      <SongList
        v-if="songStore.lastTenListenedTo.length > 0"
        :songs="songStore.getTenLatest.reverse()"
      />
      <div v-else class="flex flex-col items-center gap-4">
        <span class="text-lg">
          You did not listen to anything during this session yet.
        </span>
        <AppLink to="/xplore" styling="primary" text="Xplore" />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['code-verifier']
})
const songStore = useSongStore()
</script>

<style scoped>

</style>
