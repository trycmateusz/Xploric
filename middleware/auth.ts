export default defineNuxtRouteMiddleware(async () => {
  const userStore = useUserStore()
  await userStore.fetchUser('user1')
  userStore.setAuth(userStore.users[0])
  if (!userStore.auth) {
    return navigateTo('/')
  }
})
