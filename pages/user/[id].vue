<template>
  <main>
    <ProfilePage
      v-if="user"
      :user="user"
      :own-profile="false"
    />
  </main>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['auth', 'own-profile']
})
const userStore = useUserStore()
const route = useRoute()
const userId = route.params.id.toString()
const user = computed(() => {
  return userStore.getUser(userId)
})
await userStore.fetchUser(userId)
</script>

<style scoped>

</style>
