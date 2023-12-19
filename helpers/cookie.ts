export const getCookie = (cookie: string) => {
  return document.cookie.split(';').find(row => row.startsWith(cookie))
}
export const getCookieValue = (cookie: string) => {
  return getCookie(cookie)?.split('=')[1]
}
