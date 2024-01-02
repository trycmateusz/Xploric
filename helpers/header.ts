import { getCookieValue } from '~/helpers/cookie'

export const getHeaderWithAuthorization = () => {
  const accessToken = getCookieValue('access_token')
  const headers = new Headers()
  headers.append('Authorization', `Bearer ${accessToken}`)
  return headers
}
