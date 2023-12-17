import type { SpotifyApiAccessToken } from '~/types/Spotify'
import { generatePkceCodeVerifier, sha256, base64UrlEncode } from '~/helpers'

export default defineNuxtRouteMiddleware(async () => {
  const runtimeConfig = useRuntimeConfig()
  const redirectUriToVerify = 'http://localhost:3000/xplore'
  let redirectUri: string
  if (process.env.NODE_ENV === 'development') {
    redirectUri = 'http://localhost:3000/xplore'
  } else {
    redirectUri = 'https://xploric.vercel.app/xplore'
  }
  const accessTokenCookie = document.cookie.split(';').find(row => row.startsWith('access_token'))
  console.log(accessTokenCookie)
  if (!accessTokenCookie) {
    const urlParams = new URLSearchParams(window.location.search)
    const responseCode = urlParams.get('code')
    if (!responseCode) {
      const codeVerifier = generatePkceCodeVerifier(64)
      const hashed = await sha256(codeVerifier)
      const codeChallenge = base64UrlEncode(hashed)
      document.cookie = `code_verifier=${codeVerifier}`
      const redirectParams = {
        response_type: 'code',
        scope: 'user-read-private user-read-email',
        client_id: runtimeConfig.public.spotifyClientId,
        code_challenge_method: 'S256',
        code_challenge: codeChallenge,
        redirect_uri: redirectUriToVerify
      }
      const authUrl = new URL('https://accounts.spotify.com/authorize')
      authUrl.search = new URLSearchParams(redirectParams).toString()
      const userAccepted = confirm('This website use\'s Spotify\'s Api to fetch songs, albums, artists etc. Do you understand?')
      if (userAccepted) {
        window.location.href = authUrl.toString()
      } else {
        return abortNavigation()
      }
    } else {
      const codeVerifier = document.cookie.split(';').find(row => row.startsWith('code_verifier'))?.split('=')[1]
      if (responseCode && codeVerifier) {
        const token = await useFetch<SpotifyApiAccessToken>('https://accounts.spotify.com/api/token', {
          method: 'post',
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
        if (token.error.value) {
          console.log('Error when fetching access token', token.error.value)
        }
        if (token.data.value) {
          console.log(+token.data.value.expires_in * 1000)
          document.cookie = `access_token=${token.data.value.access_token};expires=${+token.data.value.expires_in * 1000}`
        }
      }
    }
  }
})
