export default defineNuxtRouteMiddleware(async () => {
  const userStore = useUserStore()
  if (!userStore.auth) {
    return navigateTo('/login')
  }
})
