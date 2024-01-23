import type { SpotifyApiAccessToken } from '~/types/Spotify'
import { getCookieValue } from '~/helpers/cookie'

export default defineNuxtRouteMiddleware(async () => {
  const runtimeConfig = useRuntimeConfig()
  const { redirectUri } = useRedirectUri()
  const urlParams = new URLSearchParams(window.location.search)
  const responseTokenCode = urlParams.get('code')
  if (responseTokenCode) {
    const codeVerifier = getCookieValue('code_verifier')
    if (responseTokenCode && codeVerifier) {
      const { data, error } = await useFetch<SpotifyApiAccessToken>('https://accounts.spotify.com/api/token', {
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          client_id: runtimeConfig.public.spotifyClientId,
          grant_type: 'authorization_code',
          code: responseTokenCode,
          scope: 'user-read-private',
          redirect_uri: redirectUri.value,
          code_verifier: codeVerifier
        })
      })
      if (error.value) {
        console.log('Error when fetching access token', error.value)
        return abortNavigation()
      }
      if (data.value) {
        const expires = new Date(Date.now() + (+data.value.expires_in * 1000))
        document.cookie = `spotify_access_token=${data.value.access_token}; expires=${expires}; Max-Age=${expires}`
        const redirectPath = getCookieValue('redirect')
        if (redirectPath) {
          document.cookie = `redirect=;expires=${new Date().getTime()};Max-Age=0`
          document.cookie = `codeVerifier=;expires=${new Date().getTime()};Max-Age=0`
          return navigateTo(redirectPath)
        }
      }
    }
  }
  return navigateTo('/')
})
