<template>
  <div class="min-h-[100svh] bg-black-main overflow-hidden">
    <TheNavigation />
    <slot />
  </div>
</template>

<script setup lang="ts">
const userStore = useUserStore()
await userStore.fetchUser('user1')
userStore.setAuth(userStore.users[0])
</script>

<style scoped>

</style>
