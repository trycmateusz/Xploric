export default defineNuxtRouteMiddleware(() => {
  const userStore = useUserStore()
  if(userStore.auth){
    return navigateTo('/')
  }
})