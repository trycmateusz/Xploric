export default defineNuxtRouteMiddleware(() => {
  const userAccepted = confirm('This website use\'s Deezer\'s Api to fetch songs, albums, artists etc. If you don\'t want to login, please use these provided credentials')
  if (userAccepted) {
    return navigateTo('https://developers.deezer.com/api/oauth', {
      external: true
    })
  } else {
    return navigateTo('/')
  }
})
