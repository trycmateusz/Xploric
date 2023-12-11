import type { SpotifyApiAccessToken } from '~/stores/types/Spotify'

export default defineNuxtRouteMiddleware(async (from) => {
  const runtimeConfig = useRuntimeConfig()
  let redirectUri: string
  if (process.env.NODE_ENV === 'development') {
    redirectUri = 'http://localhost:3000/xplore'
  } else {
    redirectUri = 'https://xploric.vercel.app/xplore'
  }
  if (from.query?.error === 'access_denied') {
    return navigateTo('/')
  } else {
    const accessTokenCookie = document.cookie.split(';').find(row => row.startsWith('access_token'))
    if (!accessTokenCookie) {
      const authCode = from.query.code
      if (authCode) {
        const ziutek = await $fetch<SpotifyApiAccessToken | undefined>('https://accounts.spotify.com/api/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: {
            code: authCode,
            redirect_uri: redirectUri,
            grant_type: 'authorization_code'
          }
        }).catch((error) => {
          console.log(error)
        })
        if (ziutek) {
          console.log('udalo sie!', ziutek)
        }
      } else {
        const spotifyAuthUrl = `https://accounts.spotify.com/authorize?client_id=${runtimeConfig.public.spotifyClientId}&redirect_uri=${redirectUri}&response_type=code`
        const userAccepted = confirm('This website use\'s Deezer\'s Api to fetch songs, albums, artists etc.')
        if (userAccepted) {
          return navigateTo(spotifyAuthUrl, {
            external: true
          })
        } else {
          return abortNavigation()
        }
      }
    }
  }
})
