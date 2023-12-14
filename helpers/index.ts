export const convertToDate = (timestamp: number): string => {
  const date = new Date(timestamp)
  const day = date.getDate()
  const month = date.getMonth()
  const year = date.getFullYear()
  const hours = date.getHours()
  const minutes = date.getMinutes()
  return `${day}.${month}.${year} ${hours}:${minutes}`
}

export const getDurationSeconds = (duration: number): number => {
  return Math.floor(duration % 60)
}

export const getDurationMinutes = (duration: number): number => {
  return Math.floor(duration / 60)
}

export const getDurationMinutesAndSecondsInProperFormatFromSeconds = (duration: number): string => {
  return `${getDurationMinutes(duration)}:${getDurationSeconds(duration) < 10 ? '0' + getDurationSeconds(duration) : getDurationSeconds(duration)}`
}

export const generatePkceCodeVerifier = (length: number) => {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const values = crypto.getRandomValues(new Uint8Array(length))
  return values.reduce((acc, x) => acc + possible[x % possible.length], '')
}

export const hashUsingSha256 = async (plain: string): Promise<ArrayBuffer> => {
  const encoder = new TextEncoder()
  const data = encoder.encode(plain)
  return await window.crypto.subtle.digest('SHA-256', data)
}

export const encodeToBase64 = (input: ArrayBuffer) => {
  return btoa(String.fromCharCode(...new Uint8Array(input)))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
}
