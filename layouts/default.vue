<template>
  <div class="min-h-[100svh] bg-black-main">
    <TheNavigation />
    <ThePopupNotificationList />
    <slot />
    <TheCurrentPlayer
      v-if="currentAudioStore.current"
      :current="currentAudioStore.current"
    />
  </div>
</template>

<script setup lang="ts">
const userStore = useUserStore()
const currentAudioStore = useCurrentAudioStore()
await userStore.fetchUser('0')
userStore.setAuth(userStore.users[0])
</script>

<style scoped>

</style>
