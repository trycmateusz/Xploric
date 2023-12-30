const redirectUri = ref('')

if (process.env.NODE_ENV === 'development') {
  redirectUri.value = 'http://localhost:3000/redirect'
} else {
  redirectUri.value = 'https://xploric.vercel.app/redirect'
}

export const useRedirectUri = () => {
  return {
    redirectUri
  }
}
