import type { SpotifyApiAccessToken } from '~/types/Spotify'
import { generatePkceCodeVerifier, hashUsingSha256, encodeToBase64 } from '~/helpers'

export default defineNuxtRouteMiddleware(async () => {
  console.log(window.location)
  const runtimeConfig = useRuntimeConfig()
  let redirectUri: string
  if (process.env.NODE_ENV === 'development') {
    redirectUri = 'http://localhost:3000/xplore'
  } else {
    redirectUri = 'https://xploric.vercel.app/xplore'
  }
  const accessTokenCookie = document.cookie.split(';').find(row => row.startsWith('access_token'))
  if (!accessTokenCookie) {
    const urlParams = new URLSearchParams(window.location.search)
    const responseCode = urlParams.get('code')
    if (!responseCode) {
      const codeVerifier = generatePkceCodeVerifier(64)
      const hashed = await hashUsingSha256(codeVerifier)
      const codeChallenge = encodeToBase64(hashed)
      document.cookie = `code_verifier=${codeVerifier}`
      const redirectParams = {
        response_type: 'code',
        client_id: runtimeConfig.public.spotifyClientId,
        code_challenge_method: 'S256',
        code_challenge: codeChallenge,
        redirect_uri: redirectUri
      }
      const authUrl = new URL('https://accounts.spotify.com/authorize')
      authUrl.search = new URLSearchParams(redirectParams).toString()
      const userAccepted = confirm('This website use\'s Spotify\'s Api to fetch songs, albums, artists etc. Do you understand?')
      if (userAccepted) {
        return navigateTo(authUrl, {
          external: true
        })
      } else {
        return abortNavigation()
      }
    } else {
      const codeVerifier = document.cookie.split(';').find(row => row.startsWith('code_verifier'))
      if (responseCode && codeVerifier) {
        const tokenBody = await useFetch<SpotifyApiAccessToken>('https://accounts.spotify.com/api/token', {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: new URLSearchParams({
            client_id: runtimeConfig.public.spotifyClientId,
            grant_type: 'authorization_code',
            code: responseCode,
            redirect_uri: redirectUri,
            code_verifier: codeVerifier
          })
        })
        if (tokenBody) {
          console.log(tokenBody)
        }
      }
    }
  }
})
