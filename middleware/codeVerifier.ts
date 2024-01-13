import { generatePkceCodeVerifier, sha256, base64UrlEncode } from '~/helpers/crypto'
import { getCookie } from '~/helpers/cookie'

export default defineNuxtRouteMiddleware(async (to) => {
  const runtimeConfig = useRuntimeConfig()
  const { redirectUri } = useRedirectUri()
  const accessTokenCookie = getCookie('access_token')
  if (!accessTokenCookie) {
    const urlParams = new URLSearchParams(window.location.search)
    const responseError = urlParams.get('error')
    if (responseError) {
      return navigateTo('/')
    } else {
      const codeVerifier = generatePkceCodeVerifier(64)
      const hashed = await sha256(codeVerifier)
      const codeChallenge = base64UrlEncode(hashed)
      document.cookie = `code_verifier=${codeVerifier}`
      const redirectParams = {
        response_type: 'code',
        client_id: runtimeConfig.public.spotifyClientId,
        code_challenge_method: 'S256',
        code_challenge: codeChallenge,
        redirect_uri: redirectUri.value
      }
      const authUrl = new URL('https://accounts.spotify.com/authorize')
      authUrl.search = new URLSearchParams(redirectParams).toString()
      console.log(codeVerifier)
      const userAccepted = confirm('This website use\'s Spotify\'s Api to fetch songs, albums, artists etc. Do you understand?')
      if (userAccepted) {
        document.cookie = `redirect=${to.path}`
        window.location.href = authUrl.toString()
      } else {
        return abortNavigation()
      }
    }
  }
})
