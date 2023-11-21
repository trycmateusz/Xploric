export const useAuthStore = defineStore('AuthStore', () => {
  const auth = ref<string | null>(null)
  return {
    auth
  }
})
