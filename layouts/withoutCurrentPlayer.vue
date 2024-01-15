<template>
  <div class="min-h-[100svh] bg-black-main">
    <TheNavigation />
    <ThePopupNotificationList />
    <slot />
  </div>
</template>

<script setup lang="ts">
const userStore = useUserStore()
await userStore.fetchUser('0')
userStore.setAuth(userStore.users[0])
</script>

<style scoped>

</style>
