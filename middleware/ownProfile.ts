export default defineNuxtRouteMiddleware(async (to) => {
  const userStore = useUserStore()
  const userId = to.params.id.toString()
  await userStore.fetchUser('user1')
  userStore.setAuth(userStore.users[0])
  if (userId && userStore.auth) {
    if (userId === userStore.auth.id) {
      return navigateTo('/my-profile')
    }
  }
})
